<template>
  <div class="container is-fluid">
    <aside class="menu">
      <p class="menu-label">
        Меню
      </p>
      <ul class="menu-list">
        <li>
          <a :class="{ 'is-active': isToDayOrWeekActive('today')}" @click="changeDayOrWeek('today')">Все</a>
          <ul v-if="isToDayOrWeekActive('today')">
            <li v-for="category in categories"
                :key="category"
                :value="category">
              <a :class="{ 'is-active': isCategoryActive(category) }" @click="changeCategory(category)">
                {{ category }}
              </a>
            </li>
          </ul>
          <a :class="{ 'is-active': isToDayOrWeekActive('week')}" @click="changeDayOrWeek('week')">На неделю</a>
          <ul v-if="isToDayOrWeekActive('week')">
            <li v-for="category in categories"
                :key="category"
                :value="category">
              <a :class="{ 'is-active': isCategoryActive(category) }" @click="changeCategory(category)">
                {{ category }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <button class="button is-success is-small" @click="dbSaveCategory()">
        Сохранить изменения
      </button>
    </aside>
    <table
      class="table is-striped is-bordered is-narrow is-hoverable"
      v-if="menu.length > 0 && isToDayOrWeekActive('today')">
      <thead>
        <tr><th>Название</th><th>Цена (тг)</th><th></th></tr>
      </thead>
      <tfoot>
        <tr>
          <th colspan="3"></th>
          <th style="text-align: center">
            <button class="button is-info is-small" @click="openModal(null)">
              Добавить новое блюдо
            </button>
          </th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="item in selectedMenu"
            :key="item.name"
            :value="item">
          <td>{{ item.name }}</td>
          <td>{{ displayPrice(item) }}</td>
          <td style="text-align: center">
            <div class="table-buttons">
              <button class="button is-info is-small" @click="openModal(item)">
                Изменить
              </button>
              <button class="button is-danger is-small" @click="deleteItem(item)">
                Удалить
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      class="table is-striped is-bordered is-narrow is-hoverable"
      v-else>
      <thead>
        <th>Название</th><th>День недели</th>
      </thead>
      <tbody>
        <tr v-for="item in selectedMenu"
            :key="item.name"
            :value="item">
          <td>{{ item.name }}</td>
          <td style="text-align: center">
            <label style="margin: 0 15px" class="checkbox">
              <input v-model="item.monday" type="checkbox" :name="item.name">
              Понедельник
            </label>
            <label style="margin: 0 15px" class="checkbox">
              <input v-model="item.tuesday" type="checkbox" :name="item.name">
              Вторник
            </label>
            <label style="margin: 0 15px" class="checkbox">
              <input v-model="item.wednesday" type="checkbox" :name="item.name">
              Среда
            </label>
            <label style="margin: 0 15px" class="checkbox">
              <input v-model="item.thursday" type="checkbox" :name="item.name">
              Четверг
            </label>
            <label style="margin: 0 15px" class="checkbox">
              <input v-model="item.friday" type="checkbox" :name="item.name">
              Пятница
            </label>
          </td>
        </tr>
      </tbody>
    </table>
    <div :class="{ 'modal': true, 'is-active': isModalActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ changingItem.name }}</p>
          <button class="delete" aria-label="close" @click="closeModal()"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Название</label>
            <div class="control">
              <input v-model="changingItem.name" class="input" type="text">
            </div>
          </div>
          <div class="field">
            <label class="label">Цена (полная порция)</label>
            <div class="control">
              <input class="input"
                type="text"
                v-model.number="changingItem.priceFull"
                @keypress="restrictChars($event)">
            </div>
          </div>
          <div class="field">
            <label class="label">Цена (половина порция)</label>
            <div class="control">
              <input class="input"
                type="text"
                v-model.number="changingItem.priceHalf"
                @keypress="restrictChars($event)">
            </div>
          </div>
          <div class="field file has-name">
            <label class="file-label">
              <input class="file-input"
                type="file"
                @change="onFileSelected($event)">
                <span class="file-cta">Выберите фотографию</span>
                <span v-if="fileName" class="file-name">{{ fileName }}</span>
            </label>
          </div>
          <div class="field">
            <label class="label">Доступен на недели</label>
            <div class="control">
              <label style="margin: 0 15px" class="checkbox">
                <input v-model="changingItem.monday" type="checkbox">
                Понедельник
              </label>
              <label style="margin: 0 15px" class="checkbox">
                <input v-model="changingItem.tuesday" type="checkbox">
                Вторник
              </label>
              <label style="margin: 0 15px" class="checkbox">
                <input v-model="changingItem.wednesday" type="checkbox">
                Среда
              </label>
              <label style="margin: 0 15px" class="checkbox">
                <input v-model="changingItem.thursday" type="checkbox">
                Четверг
              </label>
              <label style="margin: 0 15px" class="checkbox">
                <input v-model="changingItem.friday" type="checkbox">
                Пятница
              </label>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            :class="{'button': true, 'is-success': true, 'is-loading': isLoading}"
            :disabled="!changingItem.name" 
            @click="changeItem()">Сохранить</button>
          <button class="button is-danger" @click="closeModal()">Отменить</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { menuRef, storage, db } from '@/firebase.js'
import { mapGetters } from 'vuex'

function getChangingItemFields () {
  return {
    name: 'Новое блюдо',
    category: null,
    priceFull: 0,
    priceHalf: null,
    image: null,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true
  }
}

function getInitialData () {
  return {
    isLoading: false,
    fileName: null,
    todayOrWeek: 'today',
    activeCategory: 'Первые блюда',
    categories: ["Салаты и закуски", "Первые блюда", "Вторые блюда", "Гарниры", "Выпечка", "Напитки на разлив"],
    isModalActive: false,
    originalName: null,
    changingItem: getChangingItemFields(),
    changingMenu: [],
    menu: [],
  }
}

export default {
  name: 'Admin',
  data: getInitialData,
  firebase: {
    menu: menuRef
  },
  created () {
    if (!this.user.loggedIn) {
      this.$router.replace({ name: "Login" })
    }
  },
  watch: {
    menu () {
      this.changingMenu = [ ...this.menu ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'user'
    ]),
    selectedMenu () {
      return this.changingMenu.filter(i => i.category === this.activeCategory)
    }
  },
  methods: {
    restrictChars ($event) {
      if ($event.charCode === 0 || /\d/.test(String.fromCharCode($event.charCode))) {
          return true
      } else {
          $event.preventDefault();
      }
    },
    dbSaveCategory () {
      db.ref('menu')
        .set(this.changingMenu)
        .then(this.notifySuccess)
    },
    isToDayOrWeekActive (val) {
      return this.todayOrWeek === val
    },
    changeDayOrWeek (val) {
      this.todayOrWeek = val
    },
    isCategoryActive (val) {
      return this.activeCategory === val
    },
    changeCategory (val) {
      this.activeCategory = val
    },
    displayPrice (item) {
      if (item.priceHalf) {
        return `${item.priceFull}/${item.priceHalf}`
      }
      return item.priceFull
    },
    onFileSelected ($event) {
      this.isLoading = true
      this.fileName = $event.target.files[0].name
      // Create a reference to the file we want to download
      const pathReference = storage.ref(this.fileName);
      pathReference.put($event.target.files[0])
        .then(() => {
          pathReference.getDownloadURL().then(url => {
            // Insert url into an <img> tag to "download"
            this.changingItem.image = url
            this.isLoading = false
          })
        })
    },
    openModal (item) {
      this.isModalActive = true
      this.fileName = null
      if (item) {
        this.originalName = item.name
        this.changingItem = { ...item }
      }
    },
    closeModal () {
      this.originalName = null
      this.changingItem = getChangingItemFields()
      this.isModalActive = false
    },
    changeItem () {
      let index
      if (this.originalName) {
        index = this.changingMenu.findIndex(i => i.name === this.originalName)
        this.deleteItem({name: this.originalName})
      }
      index = this.changingMenu.findIndex(i => i.name === this.changingItem.name)
      this.changingItem.priceHalf = this.changingItem.priceHalf || null
      this.changingItem.category = this.activeCategory
      if (index > -1) {
        this.changingMenu.splice(index, 1, this.changingItem)
      } else {
        this.changingMenu.push(this.changingItem)
      }
      this.dbSaveCategory()
      this.closeModal()
    },
    deleteItem (item) {
      this.changingMenu = this.changingMenu.filter(i => i.name !== item.name)
    }
  }
}
</script>

<style scoped>
  .menu {
    padding-right: 2px;
    border-right: 2px solid #dbdbdb;
  }
  .container {
    display: flex;
    margin-top: 10px;
  }
  .table {
    margin-left: 10px;
  }
  .table-buttons button {
    margin: 0 5px;
  }
</style>