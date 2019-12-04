// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  let exist = false;
  var cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    if (cookie.indexOf("token") > 0) exist = true;
  });
  if (to.path != "/login" && to.path != "/register" && !exist) {
    next("/login");
  } else {
    next();
  }
}),

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
