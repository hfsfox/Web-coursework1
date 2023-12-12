<template>
    <div class="category-container">
      <button @click="createCategory()" class="create-category">Create category</button>
      <ul>
        <li>
          <div class="category-string creating-string" :class="{'current-category' : (currentCategory == '0001')}">
            <input type="text" autofocus value="All" @click="chooseCategory('0001')" readonly>
          </div>
        </li>
        <li v-for="(category,index) in categories" :key="index">
          <div class="category-string" :class="{'current-category' : (currentCategory == category.id)}">
            <input type="text" autofocus :id="'categoryName' + category.id" :value="category.name" :readonly="!(editingCategoryID == category.id)" @click="chooseCategory(category.id)">
            <div class="actions" v-if="!(editingCategoryID == category.id)">
              <a class="edit action" @click="editCategory(category.id)">✎</a>
              <a class="remove action" @click="deleteCategory(category.id)">🗑</a>
            </div>
            <div class="actions" v-else>
              <a class="edit action" @click="confirmEditingCategory(category)">✓</a>
              <a class="remove action" @click="cancelEditingCategory()">✖</a>
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="creatingCategory">
        <li>
          <div class="category-string creating-string">
            <input type="text" id="categoryNameCreating" autofocus>
            <div class="actions">
              <a class="confirm action" @click="confirmCreatingCategory()">✓</a>
              <a class="cancel action" @click="cancelCreatingCategory()">🗑</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>
  
<script>

export default {
  name: 'CategoriesTab',
  data() {
    return {
    }
  },
  created() {
    if (this.$store.state.uid && this.$store.state.isLoggedIn){
      this.$store.dispatch('fetchBoard');
    }
  },
  computed: {
    categories() {
      return this.$store.getters['getCategories'];
    },
    creatingCategory() {
      return this.$store.getters['creatingCategory'];
    },
    currentCategory() {
      return this.$store.getters['currentCategory'];
    },
    editingCategoryID(){
      return this.$store.getters['editingCategoryID']
    },
  },
  methods: {
    createCategory(){
      this.$store.dispatch('createCategory')
    },
    deleteCategory(categoryID){
      this.$store.dispatch('deleteCategory', categoryID)
    },
    editCategory(category){
      this.$store.dispatch('editCategory', category)
    },
    chooseCategory(categoryID){
      this.$store.dispatch('chooseCategory', categoryID)
    },
    confirmEditingCategory(category){
      const categoryName = document.getElementById("categoryName" + category.id).value
      if (categoryName.length > 0){
        this.$store.dispatch('confirmEditingCategory', {
          name: categoryName,
          id: category.id
        })
      }
      else{
        this.cancelEditingCategory();
      }
    },
    cancelEditingCategory(){
      this.$store.dispatch('cancelEditingCategory')
    },
    confirmCreatingCategory(){
      const categoryName = document.getElementById("categoryNameCreating").value
      if (categoryName.length > 0){
        this.$store.dispatch('confirmCreatingCategory', {
          name: categoryName,
          id: Date.now().toString(),
        })
      }
      else{
        this.cancelCreatingCategory();
      }
    },
    cancelCreatingCategory(){
      this.$store.dispatch('cancelCreatingCategory')
    }
  }
}
</script>
