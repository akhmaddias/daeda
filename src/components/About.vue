<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-auto left-column">
        <h1 class="title has-text-primary">
          О нас
        </h1>
        <h2 class="subtitle">
          Компания "Daeda" специализируется на доставке домашней еды приготовленной из свежих,
          натуральных и качественных продуктов питания.
        </h2>
        <h2 class="subtitle">
          Наша команда будет рада приготовить и доставить для вас вкуснейшую еду в самые короткие сроки.
        </h2>
      </div>
      <div class="column is-auto">
        <figure class="image">
          <img src="../assets/images/about_pic.png">
        </figure>
      </div>
    </div>
    <section class="section">
      <h1 style="width: 200px; margin: 10px auto;" class="title">Наши услуги</h1>
      <div class="columns">
        <div class="column">
          <span style="height: 156px" class="icon has-text-primary">
            <fa-icon style="width: 144px; height: 144px" :icon="['fas', 'truck']" />
          </span>
          <h5 class="title is-5">
            Доставка
          </h5>
          <p>Компания "DA EDA" обеспечит Вам доставку горячих блюд в офисы по предварительным заявкам исходя из нашего меню. Доставка бесплатна при заказе от 5 горячих блюд.</p>
        </div>
        <div class="column">
          <span style="height: 156px" class="icon has-text-primary">
            <fa-icon style="width: 144px; height: 144px" :icon="['fas', 'utensils']" />
          </span>
          <h5 class="title is-5">
            Столовая
          </h5>
          <p>Мы рады встретить наших посетителей в Столовой по адресу Ауэзова 37 (цокольный этаж). Приходите и отведайте наши вкусные блюда.</p>
        </div>
        <div class="column">
          <span style="height: 156px" class="icon has-text-primary">
            <fa-icon style="width: 144px; height: 144px" :icon="['fas', 'cheese']" />
          </span>
          <h5 class="title is-5">
            Свежая выпечка, десерты и закуски
          </h5>
          <p>Каждый день мы печем для вас хлебо-булочные и кондитерские изделия по эксклюзивному рецепту</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 10px;
  }
  .left-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center !important;
  }
  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>