<template>
  <div class="container">
    <div v-if="inCart.length > 0" >
      <div class="table-container">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
              <th>Количество</th>
              <th></th>
              <th>Итого</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th colspan="4">
                <button class="button is-success is-small" @click="openModal()">
                  Подтвердить
                </button>
              </th>
              <th>{{ totalPrice }}</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="item in inCart"
                :key="item.name"
                :value="item">
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>
                <div class="quantity">
                  <span class="has-text-link">
                    {{ item.quantity }}
                    <a style="margin-left: 10px" @click="decreaseQuantity(item)">-</a>
                    <a style="margin-left: 10px" @click="increaseQuantity(item)">+</a>
                  </span>
                </div>
              </td>
              <td>
                <span @click="removeFromCart(item)" class="icon has-text-danger">
                  <fa-icon :icon="['fas', 'trash']" />
                </span>
              </td>
              <td>{{ item.price * item.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :class="{ 'modal': true, 'is-active': isModalActive }">
        <div class="modal-background"></div>
        <div v-if="isOrderPlaced" class="modal-content">
          <div class="notification is-success">
            <button @click="closeModal()" class="delete"></button>
            <h4 class="title is-4">Поздравляем!</h4>
            Ваш заказ успешно подтвержден. Дождитесь звонка от оператора.
          </div>
        </div>
        <div v-else class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Подтвердите заказ</p>
            <button class="delete" aria-label="close" @click="closeModal()"></button>
          </header>
          <section class="modal-card-body">
            <table class="table is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Цена</th>
                  <th>Количество</th>
                  <th>Итого</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th colspan="3">
                  </th>
                  <th>{{ totalPrice }}</th>
                </tr>
              </tfoot>
              <tbody>
                <tr v-for="item in inCart"
                    :key="item.name"
                    :value="item">
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.price * item.quantity }}</td>
                </tr>
              </tbody>
            </table>
            <div class="field">
              <label class="label">Имя</label>
              <div class="control">
                <input v-model="contactInfo.name" class="input" type="text" width="200" placeholder="Имя">
              </div>
            </div>
            <div class="field">
              <label class="label">Адрес доставки</label>
              <div class="control">
                <input v-model="contactInfo.address" class="input" type="text" width="200" placeholder="Адрес доставки">
              </div>
            </div>
            <div class="field">
              <label class="label">Телефон</label>
              <div class="control">
                <input v-model="contactInfo.telephone" class="input" type="text" width="200" placeholder="Телефон">
              </div>
            </div>
            <div class="field">
              <label class="label">Почта</label>
              <div class="control">
                <input v-model="contactInfo.email" class="input" type="text" width="200" placeholder="Почта">
              </div>
            </div>
            <div class="field">
              <label class="label">Дополнительная информация</label>
              <div class="control">
                <input v-model="contactInfo.extraInfo" class="input" type="text" width="200" placeholder="Дополнительная информация">
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button
              :class="{'button': true, 'is-success': true, 'is-loading': isLoading}"
              @click="placeOrder()">Заказать</button>
            <button class="button is-danger" @click="closeModal()">Отменить</button>
          </footer>
        </div>
      </div>
    </div>
    <div v-else>Корзина пуста</div>
  </div>  
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { firebaseFuncs } from '@/firebase.js'

export default {
  name: 'Cart',
  data () {
    return {
      isOrderPlaced: false,
      isModalActive: false,
      isLoading: false,
      contactInfo: {
        name: null,
        address: null,
        telephone: null,
        email: null,
        extraInfo: null
      }
    }
  },
  computed: {
    ...mapState('cart', [
      'inCart',
      'totalPrice'
    ])
  },
  methods: {
    ...mapMutations('cart', [
      'changeItemQuantity',
      'removeFromCart'
    ]),
    increaseQuantity (item) {
      let quantity = item.quantity + 1
      if (quantity <= 100) {
        this.changeItemQuantity({ name: item.name, quantity: quantity })
      }
    },
    decreaseQuantity (item) {
      let quantity = item.quantity - 1
      if (quantity > 0) {
        this.changeItemQuantity({ name: item.name, quantity: quantity })
      }
    },
    openModal () {
      this.isModalActive = true
    },
    closeModal () {
      this.isOrderPlaced = false
      this.isModalActive = false
    },
    placeOrder () {
      this.isLoading = true
      const callable = firebaseFuncs.httpsCallable('genericEmail')

      return callable({
        orderInfo: this.inCart,
        contactInfo: this.contactInfo,
        totalPrice: this.totalPrice
      }).then(result => {
        this.isLoading = false
        this.isOrderPlaced = true
        if (result.success) {
          true
        }
      })
    }
  }
}
</script>

<style scoped>
  .container {
    margin-top: 20px
  }
  .quantity {
    font-size: 20px;
    font-weight: 900;
  }
</style>