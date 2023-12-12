import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { initializeApp } from 'firebase/app'
import {
  getDoc,
  doc, 
  getFirestore,
  setDoc,
} from 'firebase/firestore'

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const APP = initializeApp({
  apiKey: "AIzaSyDW8trWdYaoUN4xohu_f2sI-M9_ss8Wbyk",
  authDomain: "coursework1-99400.firebaseapp.com",
  projectId: "coursework1-99400",
  storageBucket: "coursework1-99400.appspot.com",
  messagingSenderId: "450357513124",
  appId: "1:450357513124:web:e976baac4cc81d3eb54f31"
});

const DB = getFirestore(APP)
const AUTH = getAuth(APP)

function getDocFromDB(c, d){
  return getDoc(doc(DB, c, d));
}

function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

const today = new Date();

import router from '@/router';

export default new Vuex.Store({
  state: {
    uid: null,
    board: { tasks: [], categories:[]},
    creatingCategory: false,
    creatingTask: false,
    currentCategory: '0001',
    editingTaskID: null,
    editingCategoryID: null,
  },
  getters: {
    getCategories(state){
      return state.board.categories;
    },
    getTasks(state){
      return state.board.tasks;
    },
    isLoggedIn(state){
      state.isLoggedIn = getLS('isLoggedIn');
      return state.isLoggedIn;
    },
    uid(state){
      state.uid = getLS('uid')
      return state.uid
    },
    creatingCategory(state){
      return state.creatingCategory;
    },
    creatingTask(state){
      return state.creatingTask;
    },
    currentCategory(state){
      return state.currentCategory;
    },
    editingTaskID(state){
      return state.editingTaskID;
    },
    editingCategoryID(state){
      return state.editingCategoryID;
    },
    filteredTasks: (state) => (currentCategory) => {
      return state.board.tasks.filter(task => {
        if (currentCategory == "0001"){
          return state.board.tasks;
        }
        return currentCategory.includes(String(task.category));
     })
    },
  },
  mutations: {
  },
  actions: {
    createCategory(context){
      context.state.creatingCategory = true;
    },
    editCategory(context, categoryID){
      context.state.editingCategoryID = categoryID;
    },
    deleteCategory(context, categoryID){
      if(categoryID == '0001'){
        console.log('Unable to delete this category.');
      }
      else{
        const categoryIndex = context.state.board.tasks.findIndex(task => task.category === categoryID)
        if (categoryIndex == '-1'){
          const categoryIndex = context.state.board.categories.findIndex(el => { return el.id === categoryID; })
          if (categoryID == context.state.currentCategory){
            context.state.currentCategory = '0001';
          }
          context.state.board.categories.splice(categoryIndex, 1);
          return context.dispatch('updateBoard')
        }
        else{
          console.log('Unable to delete this category due to containing tasks.');
        }
      }
    },
    confirmCreatingCategory(context,category){
      const categoryIndex = context.state.board.categories.findIndex(el => el.name === category.name)
      if (categoryIndex == '-1'){
        context.state.board.categories.push(category);
        context.state.creatingCategory = false;
        return context.dispatch('updateBoard')
      }
      else{
        console.log('Category with this name already exists.');
      }
    },
    cancelCreatingCategory(context){
      context.state.creatingCategory = false;
    },
    confirmEditingCategory(context, category){
      const categoryIndexOfID = context.state.board.categories.findIndex(el => el.id === category.id)
      const categoryIndexOfName = context.state.board.categories.findIndex(el => el.name === category.name)
      if (categoryIndexOfName == '-1'){
        context.state.board.categories.splice(categoryIndexOfID, 1, category);
        context.state.editingCategoryID = null;
        return context.dispatch('updateBoard')
      }
      else{
        console.log('Category with this name already exists.');
      }
    },
    cancelEditingCategory(context){
      context.state.editingCategoryID = null;
    },
    createTask(context){
      context.state.creatingTask = true;
    },
    editTask(context, taskID){
      context.state.editingTaskID = taskID;
    },
    completeTask(context, { task, taskCheckboxChecked }){
      let completedTask = task;
      const taskIndex = context.state.board.tasks.findIndex(el => { return el.id === task.id; })
      if (taskCheckboxChecked){
        completedTask.dateCompleted = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        context.state.board.tasks.splice(taskIndex, 1, completedTask);
        return context.dispatch('updateBoard')
      }
      else{
        completedTask.dateCompleted = null;
        context.state.board.tasks.splice(taskIndex, 1, completedTask);
        return context.dispatch('updateBoard')
      }
    },
    deleteTask(context, task){
      const taskIndex = context.state.board.tasks.findIndex(el => { return el.id === task.id; })
      context.state.board.tasks.splice(taskIndex, 1);
      return context.dispatch('updateBoard')
    },
    confirmCreatingTask(context,task){
      const taskIndex = context.state.board.categories.findIndex(el => el.name === task.name)
      if (taskIndex == '-1'){
        context.state.board.tasks.push(task);
        context.state.creatingTask = false;
        return context.dispatch('updateBoard')
      }
      else{
        console.log('Task with this name already exists.');
      }
    },
    cancelCreatingTask(context){
      context.state.creatingTask = false;
    },
    confirmEditingTask(context, editedTask){
      const taskIndexOfID = context.state.board.tasks.findIndex(el => { return el.id === editedTask.id; })
      const taskIndexOfName = context.state.board.tasks.findIndex(el => { return el.name === editedTask.name; })
      if (taskIndexOfName == '-1'){
        context.state.board.tasks.splice(taskIndexOfID, 1, editedTask);
        context.state.editingTaskID = null;
        return context.dispatch('updateBoard')
      }
      else{
        console.log('Task with this name already exists.');
      }
    },
    cancelEditingTask(context){
      context.state.editingTaskID = null;
    },
    chooseCategory(context, category){
      context.state.currentCategory = category
    },
    updateBoard(context){
      return setDoc(doc(DB, 'Accounts', context.state.uid), context.state.board)
    },
    fetchBoard(context) {
      context.state.board.categories = [];
      context.state.board.tasks = [];
      getDocFromDB('Accounts', context.state.uid)
        .then(response => {
          if (response.data()){
            context.state.board.categories = response.data().categories
            context.state.board.tasks = response.data().tasks
          }
      });
    },
    signIn(context, userCred){
      if (userCred.email.length && userCred.password.length) {
        signInWithEmailAndPassword(AUTH, userCred.email, userCred.password)
          .then((cred) => {
            context.state.isLoggedIn = true;
            setLS('isLoggedIn', true)
            context.state.uid = cred.user.uid;
            setLS('uid', cred.user.uid)
            router.push('/tasks')
            context.dispatch('fetchBoard')
          })
          .catch((error) => {
            console.log(error.code);
          })
      }
    },
    signUp(context, userCred){
      if (userCred.email.length && userCred.firstPassword.length) {
        createUserWithEmailAndPassword(AUTH, userCred.email, userCred.firstPassword)
          .then((cred) => {
            context.state.isLoggedIn = true;
            setLS('isLoggedIn', true)
            context.state.uid = cred.user.uid;
            setLS('uid', cred.user.uid)
            context.dispatch('fetchBoard')
            router.push('/tasks')
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
    signOut(context){
      if (context.state.isLoggedIn){
        context.state.isLoggedIn = false;
        context.state.uid = null;
        context.state.board.tasks = null;
        context.state.board.categories = null;
        localStorage.removeItem('uid')
        setLS('isLoggedIn', false)
      }
    },
    getDataFromLS(context){
      context.state.uid = getLS('uid')
      context.state.isLoggedIn = getLS('isLoggedIn')
    }
  }
})
