<template>
  <div>
    <section class="section info-section">
      <h1 class="title">Добро пожаловать на Daeda.kz</h1>
      <div class="info-section-body">
        💼 Если вы являетесь владельцем магазина, кофейни или супермаркета, мы будем рады сотрудничать с вами. Наша компания специализируется на предоставлении свежей выпечки высшего качества. Мы предлагаем гибкий прайс-лист с привлекательными ценами, адаптированными под ваши потребности и бюджет. Наша продукция станет замечательным дополнением к вашему ассортименту, привлекая клиентов своим изысканным вкусом и ароматом.
        <br/>
        <br/>
        🍔 <strong>Ваши Идеальные Снеки На Каждый День!</strong> У нас вы найдете самые вкусные и свежие сэндвичи, ароматные хот-доги и непревзойденные мини-пиццы в городе! Наша еда - идеальный выбор для быстрого перекуса, сытного обеда или уютного вечера с друзьями. <br/>
        🥪 <strong>Сэндвичи</strong> Попробуйте наши сэндвичи, приготовленные из свежего хлеба, качественного мяса, свежих овощей и уникальных соусов. Идеально сбалансированы и невероятно вкусны! <br/>
        🌭 <strong>Хот-доги</strong> Наши хот-доги - это нечто большее, чем просто перекус. Мы используем только высококачественные сосиски и богатый выбор начинок, чтобы каждый укус был незабываемым. <br/>
        🍕 <strong>Мини-Пицца</strong> Маленькие, но мощные! Наши мини-пиццы приготовлены с любовью и особой заботой о вкусе. Идеально подходят как для легкого перекуса, так и для большой компании. <br/>
        🚚 <strong>Доставка и Самовывоз</strong> Голодны прямо сейчас? Закажите онлайн и получите вашу еду с доставкой прямо к двери! Или выберите опцию самовывоза из нашего удобно расположенного магазина. <br/>
        🎉 <strong>Корпоративные Заказы</strong> Планируете мероприятие или встречу? Мы предлагаем специальные условия для корпоративных клиентов. Свяжитесь с нами для подробной информации. <br/>
        <br/>
        📱 Подписывайтесь на нашу страницу <a class="has-text-info" href="https://www.instagram.com/daeda.kz/">Instagram</a> и не пропустите ни одного обновления! Мы регулярно предлагаем акции, скидки и специальные предложения, чтобы сделать ваш обед еще более приятным. <br/>
        📞 Заказывайте прямо сейчас и наслаждайтесь вкусом удобства! Нажмите на ссылку в профиле, чтобы узнать больше и сделать свой первый заказ. <br/>
      </div>
      <div style="display:flex;align-items: center;">
        <span>Свяжитесь с нами:</span>
        <div>
          <a class="custom-icon icon has-text-info" href="tel:+77085293662">
            <fa-icon :icon="['fas', 'phone']"></fa-icon>
          </a>
          <a style="color: lightgreen;" class="custom-icon icon has-text-info" href="https://wa.me/77085293662?text=Здравствуйте,%20интересует%20доставка%20обедов%20в%20офис!">
            <fa-icon :icon="['fab', 'whatsapp']"></fa-icon>
          </a>
          <a class="custom-icon icon has-text-info" href="https://www.instagram.com/daeda.kz/">
            <fa-icon :icon="['fab', 'instagram']"></fa-icon>
          </a>
        </div>
      </div>
    </section>
    <div class="sticky-icons">
      <a class="custom-icon icon has-text-info" href="tel:+7(727)220-6315">
        <fa-icon :icon="['fas', 'phone']"></fa-icon>
      </a>
      <a class="custom-icon icon has-text-info" href="https://wa.me/77085293662?text=Здравствуйте,%20интересует%20доставка%20обедов%20в%20офис!">
        <fa-icon :icon="['fab', 'whatsapp']"></fa-icon>
      </a>
      <a class="custom-icon icon has-text-info" href="https://www.instagram.com/daeda.kz/">
        <fa-icon :icon="['fab', 'instagram']"></fa-icon>
      </a>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .call-button {
    display: flex;
    align-items: center;
  }
  .info-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    max-width: 1000px;
  }
  .custom-icon {
    font-size: x-large;
    margin: 5px;
  }
  .sticky-icons {
    position: sticky;
    bottom: 20px;
    right:10px;
    margin-left:auto;
    width: 70px;
    display: flex;
    flex-direction: column;
  }
</style>

