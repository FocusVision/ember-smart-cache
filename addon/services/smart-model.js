import Ember from 'ember'

const {
  computed,
  inject: { service },
  Service
} = Ember

export default Service.extend({
  store: service(),

  loading: computed.gt('backgroundLoads', 0),
  backgroundLoads: 0,

  init() {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data.loading) {
        return this.incrementProperty('backgroundLoads')
      }

      if (event.data.fetchFailed) {
        return this.decrementProperty('backgroundLoads')
      }

      if (event.data.data) {
        this.get('store').push(event.data)
        return this.decrementProperty('backgroundLoads')
      }
    })
  }
})
