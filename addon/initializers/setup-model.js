import DS from 'ember-data'

export function initialize(application) {
  application.inject('route:application', 'smartModel', 'service:smart-model')

  DS.Model.reopen({
    set(key, value) {
      const result = this._super(key, value)
      const id = this.get('id')
      if (navigator.serviceWorker && navigator.serviceWorker.controller && id) {
        const payload = this.serialize().data
        payload.id = id
        navigator.serviceWorker.controller.postMessage(payload)
      }

      return result
    }
  })
}

export default {
  name: 'setup-model',
  initialize
};
