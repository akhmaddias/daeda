const functions = require('firebase-functions');

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(functions.config().sendgrid.key)
exports.genericEmail = functions.https.onCall(async (data, context) => {
  const { orderInfo, contactInfo, totalPrice } = data
  const msg = {
      to: 'info@daeda.kz',
      from: 'info@daeda.kz',
      cc: '2ahmad86@gmail.com',
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

