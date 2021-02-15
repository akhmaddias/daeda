function getInitialState () {
  return {
    inCart: [],
    totalPrice: 0
  }
}
function calculateTotalPrice (items) {
  let price = 0
  let addonPrice = 0
  if (items && items.length > 0) {
    price = items.reduce((acc, i) => acc + i.price * i.quantity, 0)
    items.forEach(item => {
      addonPrice += item.selectedAddons.reduce((acc, i) => acc + i.price * i.quantity, 0)
    })
  }
  return price + addonPrice
}

export default {
  namespaced: true,
  state: getInitialState,
  mutations: {
    resetCart (state) {
      state.inCart = []
      state.totalPrice = calculateTotalPrice(state.inCart)
    },
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
    changeAddonQuantity (state, { item, addonPrice, addonName, isIncrease }) {
      let index = state.inCart.findIndex(i => i.name === item.name)
      let selectedAddons = state.inCart[index].selectedAddons
      let selectedAddonIndex = selectedAddons.findIndex(addon => addon.name === addonName)
      if (selectedAddonIndex !== -1) {
        if (isIncrease) {
          selectedAddons[selectedAddonIndex].quantity += 1
        } else {
          if (selectedAddons[selectedAddonIndex].quantity > 0) {
            selectedAddons[selectedAddonIndex].quantity -= 1
          }
        }
      } else if (isIncrease) {
        selectedAddons.push({
          name: addonName,
          quantity: 1,
          price: addonPrice
        })
      }
      state.totalPrice = calculateTotalPrice(state.inCart)
    },
    setTotalPrice (state, price) {
      state.totalPrice = price
      state.totalPrice = calculateTotalPrice(state.inCart)
    }
  }
}