function getInitialState () {
  return {
    dayCount: window.location.host === 'menu.daeda.kz' ? 0 : 1
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