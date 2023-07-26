<template>
  <div id="app">
    <nav class="navbar is-light is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item logo" href="/">
          <img src="./assets/images/logo.png" width="56" height="56">
        </a>
        <p class="navbar-item has-text-primary">Доставка обедов</p>
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
          <a class="navbar-item" href="#/menu" @click="toggleBurger()">
            Меню
          </a>
          <a class="navbar-item" href="#/delivery" @click="toggleBurger()">
            Доставка
          </a>
          <a class="navbar-item" href="#/contacts" @click="toggleBurger()">
            Контакты
          </a>
          <a class="navbar-item" href="#/menu-week" @click="toggleBurger()">
            Меню на неделю
          </a>
          <a class="navbar-item" href="#/korp-eda" @click="toggleBurger()">Корпоративным Клиентам</a>
          <div class="navbar-item">
            <a href="tel:+77085293662" style="display: flex">
              <span class="icon">
                <fa-icon :icon="['fas', 'phone']" />
              </span>
              <span>
                +7 708 529 3662
              </span>
            </a>
          </div>
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
    <div v-if="isTablet && currentRouteName !== 'Cart' && totalPrice > 0" class="sticky-cart">
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
    <!-- <div :class="{'modal':true, 'is-active': isModalActive}" v-if="deliveryTime">
      <div class="modal-background"></div>
        <div class="modal-card">
          <div class="modal-card-body">
            <p v-if="domain === 'menu.daeda.kz'" class="has-text-primary">Заказы на сегодня принимаются до {{ deliveryTime.setTime }}!</p>
            <p v-if="domain !== 'menu.daeda.kz'" class="has-text-primary">Оформление заказа до 19:00 текущего дня на следующий</p>
            <p v-if="domain !== 'menu.daeda.kz'" class="has-text-primary">Редактирование заказа допускается до 9:00 на день доставки</p>
            <p class="has-text-primary">Минимальная сумма заказа - 5000 тг</p>
            <p class="has-text-primary">Стоимость доставки смотрите в разделе "Доставка"</p>
            <p class="has-text-primary">Стоимость доставки при заказе от 10000 тг - БЕСПЛАТНО (в пределах 5 километров)</p>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="() => {isModalActive=false}"></button>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { deliveryTimeRef } from '@/firebase.js'

export default {
  name: 'App',
  data () {
    return {
      isBurgerActive: false,
      isModalActive: true,
      deliveryTime: null,
      window: {
        width: 0,
        height: 0
      }
    }
  },
  firebase: {
    deliveryTime: deliveryTimeRef
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
    },
    currentRouteName () {
        return this.$route.name;
    },
    domain () {
      return window.location.host
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
