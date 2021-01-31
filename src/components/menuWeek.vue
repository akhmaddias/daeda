<template>
  <div class="container is-fluid">
    <h1 style="width: 262px; margin: 2rem auto" class="title has-text-primary">Меню на неделю</h1>
    <div class="main">
      <aside class="menu">
        <p class="menu-label">
          Меню
        </p>
        <ul class="menu-list">
          <li v-for="day in days"
              :key="day">
            <a :class="{ 'is-active': isDayActive(day)}" @click="changeDay(day)">
              {{ day }}
            </a>
            <ul v-if="isDayActive(day)">
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
      </aside>
      <table class="table is-striped is-bordered is-narrow is-hoverable is-fullwidth">
        <thead>
          <th>Название</th><th>Цена</th>
        </thead>
        <tbody>
          <tr v-for="item in selectedMenu"
              :key="item.name"
              :value="item">
            <td><div style="width: 200px">{{ item.name }}</div></td>
            <td><div style="width: 100px">{{ displayPrice(item) }}</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { menuRef } from '@/firebase.js'

function getInitialData () {
  return {
    days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'],
    categories: ["Салаты и закуски", "Первые блюда", "Вторые блюда", "Гарниры", "Выпечка", "Напитки на разлив", "Соусы"],
    activeDay: 'Понедельник',
    activeCategory: 'Салаты и закуски',
    menu: []
  }
}

export default {
  name: 'menuWeek',
  data: getInitialData,
  firebase: {
    menu: menuRef
  },
  computed: {
    selectedMenu () {
      return this.menu.filter(i => i.category === this.activeCategory && this.isItemActiveOnday(i))
    }
  },
  methods: {
    isItemActiveOnday (item) {
      let romanDay
      switch (this.activeDay) {
        case "Понедельник":
          romanDay = "monday"
          break
        case "Вторник":
          romanDay = "tuesday"
          break
        case "Среда":
          romanDay = "wednesday"
          break
        case "Четверг":
          romanDay = "thursday"
          break
        case "Пятница":
          romanDay = "friday"
          break
      }
      return item[romanDay]
    },
    isDayActive (val) {
      return this.activeDay === val
    },
    changeDay (val) {
      this.activeDay = val
    },
    isCategoryActive (val) {
      return this.activeCategory === val
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
  }
}
</script>
<style scoped>
  .menu {
    padding-right: 2px;
    border-right: 2px solid #dbdbdb;
  }
  .main {
    display: flex;
  }
  .table {
    margin-left: 10px;
  }
</style>
