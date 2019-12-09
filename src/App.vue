<template>
  <div id="app">
    <router-view/>
    <p>
      <a href="http://localhost:8080/#/homeadmin">homeadmin</a>
      
      <br>
      <a href="http://localhost:8080/#/home">home</a>
      <br>
      <a href="http://localhost:8080/#/login">login</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
</style>
