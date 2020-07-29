<template>
  <div :class="{'container': true, 'is-fluid': !isScreenWidthMobile}">
    <h1 style="width: 262px; margin: 2rem auto" class="title has-text-primary">Меню на сегодня</h1>
    <div v-if="menu" class="tabs is-boxed is-small">
      <ul>
        <li v-for="category in categories"
          :key="category"
          :class="{ 'is-active': isCategoryActive(category) }">
          <a @click="changeCategory(category)">{{ category }}</a>
        </li>
      </ul>
    </div>
    <div v-if="menu" class="columns is-multiline is-auto-tablet">
      <div v-for="item in availableItems"
            :key="item.name"
            :value="item"
            class="column is-auto">
        <div class="card">
          <div v-if="!isScreenWidthMobile" class="card-image">
            <figure class="image is-1by1">
              <img :src="item.image" alt="Фотографии нету">
            </figure>
          </div>
          <div v-if="!isScreenWidthMobile" class="card-content">
            <div class="content">
              <p class="title is-6">{{ item.name }}</p>
              <div v-if="item.priceHalf">
                <label class="radio">
                  <input v-model="item.isHalf" :value="false" type="radio" :name="item.name">
                  Полная
                </label>
                <label class="radio">
                  <input v-model="item.isHalf" :value="true" type="radio" :name="item.name">
                  Половина
                </label>
              </div>
            </div>
          </div>
          <div v-else class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-128x128">
                  <img :src="item.image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-6">{{ item.name }}</p>
                <div v-if="item.priceHalf" class="control">
                  <label class="radio">
                    <input v-model="item.isHalf" :value="false" type="radio" :name="item.name">
                    Полная
                  </label>
                  <label class="radio">
                    <input v-model="item.isHalf" :value="true" type="radio" :name="item.name">
                    Половина
                  </label>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              {{ displayPrice(item) }}
            </div>
            <p class="quantity card-footer-item">
              <span class="has-text-link">
                <a class="quantity-link" @click="decreaseQuantity(item)">-</a>
                {{ item.isHalf ? item.quantityHalf : item.quantity }}
                <a class="quantity-link" @click="increaseQuantity(item)">+</a>
              </span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { menuRef } from '@/firebase.js'
import { mapState, mapMutations } from 'vuex'

function getInitialData () {
  return {
    activeCategory: 'Салаты и закуски',
    categories: ["Салаты и закуски", "Первые блюда", "Вторые блюда", "Гарниры", "Выпечка", "Напитки на разлив"],
    menu: [],
    itemsOptions: [],
    selectedItems: [],
  }
}

export default {
  name: 'Menu',
  data: getInitialData,
  firebase: {
    menu: menuRef
  },
  watch: {
    menu () {
      this.itemsOptions = this.menu.map(item => (
        { 
          ...item,
          'quantity': 0,
          'quantityHalf': 0,
          'isHalf': false
        }))
    }
  },
  computed: {
    ...mapState('cart', [
      'inCart'
    ]),
    availableItems () {
      return this.itemsOptions.filter(i => i.isAvailableToday && i.category === this.activeCategory)
    },
    isScreenWidthMobile () {
      return window.screen.width < 768
    }
  },
  methods: {
    ...mapMutations('cart', [
      'addToCart',
      'removeFromCart',
      'changeItemQuantity'
    ]),
    isCategoryActive (val) {
      if (this.activeCategory === val) {
        return true
      }
      return false
    },
    isItemAdded (item) {
      let itemName = item.isHalf ? `${item.name} (Половина)` : item.name
      return this.inCart.findIndex(i => i.name === itemName) > -1
    },
    changeCategory (val) {
      this.activeCategory = val
    },
    displayPrice (item) {
      if (item.priceHalf) {
        return `${item.priceFull}/${item.priceHalf} тг.`
      }
      return `${item.priceFull} тг`
    },
    increaseQuantity (item) {
      let index = this.itemsOptions.findIndex(i => i.name === item.name)
      let quantity = item.isHalf ? this.itemsOptions[index].quantityHalf : this.itemsOptions[index].quantity
      if (quantity <= 100) {
        if (item.isHalf) {
          this.itemsOptions[index].quantityHalf += 1
        } else {
          this.itemsOptions[index].quantity += 1
        }
        this.itemForCart(this.itemsOptions[index])
      }
    },
    decreaseQuantity (item) {
      let index = this.itemsOptions.findIndex(i => i.name === item.name)
      let quantity = item.isHalf ? this.itemsOptions[index].quantityHalf : this.itemsOptions[index].quantity
      if (quantity > 0) {
        if (item.isHalf) {
          this.itemsOptions[index].quantityHalf -= 1
        } else {
          this.itemsOptions[index].quantity -= 1
        }
        this.itemForCart(this.itemsOptions[index])
      }
    },
    itemForCart (item) {
      let itemName = item.isHalf ? `${item.name} (Половина)` : item.name
      let isAdded = this.inCart.findIndex(i => ( i.name === itemName )) > -1
      let quantity = item.isHalf ? item.quantityHalf : item.quantity
      
      if (!isAdded) {
        let itemInfo = {
          isHalf: item.isHalf,
          name: itemName,
          price: item.isHalf ? item.priceHalf : item.priceFull,
          quantity: quantity
        }
        this.addToCart(itemInfo)
      } else {
        if (quantity !== 0) {
          this.changeItemQuantity({ name: itemName, quantity: quantity })
        } else {
          this.removeFromCart(item)
        }
      }
    }
  }
}
</script>

<style scoped>
  .container {
    margin-top: 10px;
  }
  .card {
    width: 256px;
    height: 435px;
    display: flex;
    flex-direction: column;
  }
  .media-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .media-content > div {
    margin: 0 10px;
  }
  @media only screen and (max-width: 768px) {
    .card {
      width: 100%;
      height: auto;
    }
  }
  .card-footer {
    margin: auto 0 5px 0;
  }
  .quantity {
    font-size: 20px;
    font-weight: 900;
  }
  .quantity-link {
    margin: 0 10px;
  }
</style>