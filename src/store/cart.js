function getInitialState () {
  return {
    inCart: [],
    totalPrice: 0
  }
}
function calculateTotalPrice (items) {
  let price = 0
  if (items && items.length > 0) {
    price = items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  }
  return price
}

export default {
  namespaced: true,
  state: getInitialState,
  mutations: {
    addToCart (state, item) {
      state.inCart.push(item)
      state.totalPrice = calculateTotalPrice(state.inCart)
    },
    removeFromCart (state, item) {
      state.inCart = state.inCart.filter(i => i.name !== item.name)
      state.totalPrice = calculateTotalPrice(state.inCart)
    },
    changeItemQuantity (state, item) {
      let index = state.inCart.findIndex(i => i.name === item.name)
      state.inCart[index].quantity = item.quantity
      state.totalPrice = calculateTotalPrice(state.inCart)
    },
    setTotalPrice (state, price) {
      state.totalPrice = price
      state.totalPrice = calculateTotalPrice(state.inCart)
    }
  }
}