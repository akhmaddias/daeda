const functions = require('firebase-functions');

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(functions.config().sendgrid.key)
exports.genericEmail = functions.https.onCall(async (data, context) => {
  const { orderInfo, contactInfo, totalPrice, isSendCheck } = data
  const sendTo = isSendCheck ? ['info@daeda.kz', 'danik_94d@mail.ru', 'manager.daeda@mail.ru', contactInfo.email] :
  ['info@daeda.kz', 'danik_94d@mail.ru', 'manager.daeda@mail.ru', 'marat_940@mail.ru']
  const msg = {
      to: sendTo,
      from: 'info@daeda.kz',
      template_id: functions.config().sendgrid.template,
      dynamic_template_data: {
        orderInfo,
        contactInfo,
        totalPrice,
        text: 'Поступил новый заказ'
      }
  }

  await sgMail.send(msg).catch(error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  })

  // Response must be JSON serializable
  return { success: true }
})

