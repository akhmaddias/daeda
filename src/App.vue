<template>
  <div id="app">
    <nav class="navbar is-light is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item logo" href="/">
          <img src="./assets/images/logo.png" width="56" height="56">
        </a>
        <a role="button" :class="{'navbar-burger': true, 'burger': true, 'is-active': isBurgerActive}"
           aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
           @click="toggleBurger()">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" :class="{'navbar-menu': true, 'is-active': isBurgerActive}">
        <div class="navbar-start">
          <a class="navbar-item" href="#/about" @click="toggleBurger()">
            О нас
          </a>
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">
                Меню
            </div>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="#/menu" @click="toggleBurger()">
                На сегодня
              </a>
              <a class="navbar-item" href="#/menu-week" @click="toggleBurger()">
                На неделю
              </a>
            </div>
          </div>
          <a class="navbar-item" href="#/delivery" @click="toggleBurger()">
            Доставка
          </a>
          <a class="navbar-item" href="#/contacts" @click="toggleBurger()">
            Контакты
          </a>
        </div>
        <div v-if="!isTablet" class="navbar-end" @click="toggleBurger()">
          <div class="navbar-item">
            <a class="has-text-primary" href="#/cart">
              <span style="font-size: 1.5rem; font-weight: bold">{{ totalPrice }}</span>
              <span class="icon is-large">
                <fa-icon :icon="['fas', 'cart-plus']" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <router-view style="margin-bottom: 48px"></router-view>
    <div v-if="isTablet" class="sticky-cart">
      <a href="#/cart">
        <span>
          Перейти в корзину
        </span>
        <span style="display: flex">
          {{ totalPrice }}
          <span class="icon">
            <fa-icon :icon="['fas', 'cart-plus']" />
          </span>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      isBurgerActive: false,
      window: {
        width: 0,
        height: 0
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapState('cart', ['totalPrice']),
    isTablet () {
      return this.window.width < 1024
    }
  },
  methods: {
    ...mapMutations('cart', ['setTotalPrice']),
    toggleBurger () {
      this.isBurgerActive = !this.isBurgerActive
    },
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.sticky-cart {
  background-color: orange;
  position: fixed;
  padding: 10px;
  width: 100%;
  bottom: 0;
}
.sticky-cart > a {
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
</style>
