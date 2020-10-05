function getInitialState () {
  return {
    dayCount: 0
  }
}

export default {
  namespaced: true,
  state: getInitialState,
  mutations: {
    setDayCount (state, day) {
      state.dayCount = day
    }
  }
}