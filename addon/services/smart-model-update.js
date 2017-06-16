import Ember from 'ember'

const {
  inject: { service },
  Service
} = Ember

export default Service.extend({
  store: service(),

  init() {
    navigator.serviceWorker.addEventListener('message', event => {
      this.store.push(event.data)
    })
  }
})
