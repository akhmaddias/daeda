<template>
  <div :class="{'container': true, 'is-fluid': !isScreenWidthMobile}">
    <div style="margin: 2rem auto">
      <a class="button is-small" :class="{'is-primary': dayCount === 0}" @click="handleDaySwitch(0)">На сегодня</a>
      <a class="button is-small" :class="{'is-primary': dayCount === 1}" @click="handleDaySwitch(1)">На завтра</a>
      </div>
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
        <div :class="cardClass(item)">
          <div v-if="!isScreenWidthMobile" class="card-image">
            <figure class="image is-1by1">
              <img :src="substituteImage(item.image)" alt="Фотографии нету">
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
              <div v-if="item.quantity > 0 && item.addons">
                <div
                  v-for="addon in item.addons"
                  :key="addon">
                  {{ addon }}
                  <span class="has-text-link">
                    <a class="quantity-link" @click="decreaseQuantityAddon(addon, item)">-</a>
                    {{ displayAddonQuantity(addon, item) }}
                    <a class="quantity-link" @click="increaseQuantityAddon(addon, item)">+</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="card-content" style="padding: 10px 0 0 0">
            <div class="media">
              <div class="media-left">
                <figure style="width:144px; height: 144px" class="image is-1by1">
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
                <div v-if="item.quantity > 0 && item.addons" style="font-size: 15px; margin-left: 0">
                  <div
                    v-for="addon in item.addons"
                    :key="addon">
                    {{ addon }}
                    <span style="float: right" class="has-text-link">
                      <a style="margin: 0 5px" class="quantity-link" @click="decreaseQuantityAddon(addon, item)">-</a>
                      {{ displayAddonQuantity(addon, item) }}
                      <a style="margin: 0 5px" class="quantity-link" @click="increaseQuantityAddon(addon, item)">+</a>
                    </span>
                  </div>
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
    categories: ["Салаты и закуски", "Первые блюда", "Вторые блюда", "Гарниры", "Выпечка", "Напитки на разлив", "Соусы"],
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
          'isHalf': false,
          'selectedAddons': []
        }))
    }
  },
  computed: {
    ...mapState('cart', [
      'inCart'
    ]),
    ...mapState('menu', [
      'dayCount'
    ]),
    availableItems () {
      return this.itemsOptions.filter(i => this.isItemAvailableToday(i) && i.category === this.activeCategory)
    },
    isScreenWidthMobile () {
      return window.screen.width < 768
    }
  },
  methods: {
    ...mapMutations('cart', [
      'addToCart',
      'removeFromCart',
      'changeItemQuantity',
      'changeAddonQuantity',
      'resetCart'
    ]),
    ...mapMutations('menu', [
      'setDayCount'
    ]),
    cardClass (item) {
      let q = item.isHalf ? item.quantityHalf : item.quantity
      return q > 0 ? { 'card': true, 'card-clicked': true } : { 'card': true, 'card-default': true }
    },
    displayAddonQuantity (addon, item) {
      let itemInCart = this.inCart.find(i => i.name === item.name)
      let selectedAddon = itemInCart.selectedAddons.find(i => i.name === addon)
      if (selectedAddon) {
        return selectedAddon.quantity
      }
      return 0
    },
    handleDaySwitch (day) {
      if (this.dayCount !== day) {
        this.resetCart()
        this.setDayCount(day)
      }
    },
    isItemAvailableToday (item) {
      let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      let now = new Date()
      let day = now.getDay()
      if (day > 5) {
        day = 5
      }
      return item[days[day - 1 + this.dayCount]]
    },
    substituteImage (link) {
      return link || 'https://firebasestorage.googleapis.com/v0/b/canteen-581c0.appspot.com/o/no%20img.jpg?alt=media&token=7b5ca53d-df3d-4318-881b-a5918c90e300'
    },
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
    increaseQuantityAddon (addonName, item) {
      let index = this.inCart.findIndex(i => i.name === item.name)
      let itemToCart = { ...this.inCart[index] }
      this.changeAddonQuantity({
        item: itemToCart,
        addonPrice: this.itemsOptions.find(item => item.name === addonName).priceFull,
        addonName,
        isIncrease: true
      })
    },
    decreaseQuantityAddon (addonName, item) {
      let index = this.inCart.findIndex(i => i.name === item.name)
      let itemToCart = { ...this.inCart[index] }
      this.changeAddonQuantity({
        item: itemToCart,
        addonPrice: this.itemsOptions.find(item => item.name === addonName).priceFull,
        addonName,
        isIncrease: false
      })
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
          quantity: quantity,
          selectedAddons: []
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
  .card-default {
    width: 256px;
    height: 435px;
    display: flex;
    flex-direction: column;
  }
  .card-clicked {
    width: 300px;
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