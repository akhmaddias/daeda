<template>
  <div class="container" style="display: flex">
    <section class="section is-medium">
      <div class="container">
        <h1 class="title">Свяжитесь с нами</h1>
        <h2 class="subtitle" style="width: 400px">Если у вас есть вопросы и предложения или вам нужна информация о нас, вы можете легко связаться с нами.</h2>
        <div class="contacts">
          <div style="display: flex">
            <span class="icon has-text-info">
              <fa-icon :icon="['fas', 'phone']" />
            </span>
            <span>+7(708)529-3662</span>
          </div>
          <div style="display: flex">
            <span class="icon has-text-info">
              <fa-icon :icon="['fas', 'phone']" />
            </span>
            <span>+7(727)220-6315</span>
          </div>
          <div style="display: flex">
            <span class="icon has-text-info">
              <fa-icon :icon="['fas', 'envelope']" />
            </span>
            <span>info@daeda.kz</span>
          </div>
          <div style="display: flex">
            <span class="icon has-text-info">
              <fa-icon :icon="['fab', 'instagram-square']" />
            </span>
            <a href="https://www.instagram.com/daeda.kz/">daeda.kz</a>
          </div>
          <div style="display: flex; margin-bottom: 10px">
            <span class="icon has-text-info">
              <fa-icon :icon="['fas', 'map-marker-alt']" />
            </span>
            <span>ул. Ауэзова, 37</span>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1453.1041694204027!2d76.90140085810515!3d43.24705524852309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883694767099875%3A0x50e3caa70518f6d8!2z0YPQu9C40YbQsCDQkNGD0Y3Qt9C-0LLQsCAzNywg0JDQu9C80LDRgtGLIDA1MDAwMA!5e0!3m2!1sru!2skz!4v1593433691563!5m2!1sru!2skz" width="400" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
      </div>
    </section>
    <section class="section is-medium">
      <div class="field">
        <label class="label">Имя</label>
        <div class="control">
          <input class="input" type="text" placeholder="Имя">
        </div>
        <label class="label">Фамилия</label>
        <div class="control">
          <input class="input" type="text" placeholder="Фамилия">
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email">
          <span class="icon is-small is-left">
            <fa-icon :icon="['fas', 'envelope']" />
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Сообщение</label>
        <div class="control">
          <textarea class="textarea" placeholder="Сообщение"></textarea>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Отправить</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contacts'
}
</script>

<style scoped>
 .contacts div {
   margin-top: 5px;
 }
 #map {
   width: 100%;
   height: 400px;
   background-color: grey;
 }
</style>