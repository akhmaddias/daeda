<template>
  <div class="container">
    <div class="columns">
      <div class="column is-auto left-column">
        <h1 class="title is-2 has-text-primary">Добро пожаловать!</h1>
        <div class="menu-links">
          <h2 class="title is-5 has-text-primary">Перейти к меню:</h2>
          <div>
            <router-link class="button is-rounded is-primary" to="/menu">
              На сегодня
            </router-link>
            <router-link class="button is-rounded is-primary" to="/menu-week">
              На неделю
            </router-link>
          </div>
        </div>
      </div>
      <div class="column is-auto">
        <figure class="image is-1by1">
          <img src="../assets/images/home_pic.png">
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
  .container {
    margin-top: 20px
  }
 .left-column {
   display: flex;
   flex-direction: column;
   justify-content: center;
 }
 .menu-links {
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 .menu-links a {
   margin: 5px;
 }
 h1 {
   text-align: center;
 }
</style>
