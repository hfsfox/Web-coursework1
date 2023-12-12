<template>
    <div class="tasks-container">
      <ul>
        <li v-for="(task,index) in filteredTasks" :key="index"> 
          <div class="task-string">
            <div class="task-n-check">
              <input type="checkbox" :id="'taskCheckbox' + task.id" class="task-checkbox" @click="completeTask(task)" :checked="(task.dateCompleted != null)">
              <input type="text" :id="'taskName' + task.id" :value="task.name" :readonly="!(editingTaskID == task.id)">
            </div>
            <div class="actions" v-if="!(editingTaskID == task.id)">
              <a class="edit action" @click="editTask(task.id)">✎</a>
              <a class="remove action" @click="deleteTask(task.id)">🗑</a>
            </div>
            <div class="actions" v-else>
              <select :id="'taskCategory' + task.id">
                <option v-for="category in categories"
                :key="category.id"
                :value="category.id"
                :selected="category.id === task.category">{{ category.name }}</option>
              </select>
              <a class="confirm action" @click="confirmEditingTask(task)">✓</a>
              <a class="cancel action" @click="cancelEditingTask()">✖</a>
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="creatingTask">
        <li>
          <div class="task-string creating-string">
            <input type="text" autofocus id="taskNameCreating">
            <div class="actions">
              <a class="confirm action" id="btn" @click="confirmCreatingTask()">✓</a>
              <a class="cancel action" @click="cancelCreatingTask()">✖</a>
            </div>
          </div>
        </li>
      </ul>
      <button @click="createTask()" class="btn">Create task</button>
    </div>
</template>
  
<script>

const today = new Date();

export default {
  name: 'TasksTab',
  computed: {
    tasks() {
      return this.$store.getters['getTasks']
    },
    currentCategory() {
      return this.$store.getters['currentCategory']
    },
    filteredTasks() {
      return this.$store.getters['filteredTasks'](this.currentCategory)
    },
    creatingTask() {
      return this.$store.getters['creatingTask'];
    },
    editingTaskID(){
      return this.$store.getters['editingTaskID']
    },
    categories(){
      return this.$store.getters['getCategories']
    }
  },
  methods: {
    createTask() {
      this.$store.dispatch('createTask')
    },
    deleteTask(taskID){
      this.$store.dispatch('deleteTask', taskID)
    },
    editTask(taskID){
      this.$store.dispatch('editTask', taskID)
    },
    completeTask(task){
      const taskCheckboxChecked = document.getElementById("taskCheckbox" + task.id).checked
      this.$store.dispatch('completeTask', { task, taskCheckboxChecked } )
    },
    confirmCreatingTask(){
      const taskName = document.getElementById("taskNameCreating").value
      if (taskName.length > 0){
        this.$store.dispatch('confirmCreatingTask', {
          name: taskName,
          id: Date.now().toString(),
          category: this.currentCategory,
          dateCreated: today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
          dateCompleted: null
        })
      }
      else{
        this.cancelCreatingTask();
      }
    },
    confirmEditingTask(task){
      const taskName = document.getElementById("taskName" + task.id).value
      const taskCategory = document.getElementById("taskCategory" + task.id).value
      if (taskName.length > 0){
        this.$store.dispatch('confirmEditingTask', {
          name: taskName,
          id: task.id,
          category: taskCategory,
          dateCreated: task.dateCreated,
          dateCompleted: task.dateCompleted
        })
      }
      else{
        this.cancelEditingTask();
      }
    },
    cancelEditingTask(task){
      this.$store.dispatch('cancelEditingTask', task)
    }
  }
}
</script>
