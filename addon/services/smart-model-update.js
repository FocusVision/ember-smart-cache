import Ember from 'ember'

const {
  inject: { service },
  Service
} = Ember

export default Service.extend({
  store: service(),

  loading: computed.gt(backgroundLoads, 0),
  backgroundLoads: 0,

  init() {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data.loading) {
        return this.incrementProperty('backgroundLoads')
      }

      if (event.data.type && event.data.id) {
        this.store.push(event.data)
        this.decrementProperty('backgroundLoads')
      }
    })
  }
})
