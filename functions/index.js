const functions = require('firebase-functions');

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(functions.config().sendgrid.key)
exports.genericEmail = functions.https.onCall(async (data, context) => {
  const { orderInfo, contactInfo, totalPrice } = data
  const msg = {
      to: ['info@daeda.kz', 'danik_94d@mail.ru', '2ahmad86@gmail.com'],
      from: 'info@daeda.kz',
      template_id: functions.config().sendgrid.template,
      dynamic_template_data: {
        orderInfo: orderInfo,
        contactInfo: contactInfo,
        totalPrice: totalPrice
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

