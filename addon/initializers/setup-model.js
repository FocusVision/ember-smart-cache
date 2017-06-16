import DS from 'ember-data'

export function initialize(application) {
  application.inject('route:application', 'smartModelUpdate', 'service:smart-model-update')

  DS.Model.reopen({
    set(key, value) {
      const result = this._super(key, value)
      const id = this.get('id')
      if (navigator.serviceWorker && navigator.serviceWorker.controller && id) {
        const data = this.serialize()
        data.id = id
        navigator.serviceWorker.controller.postMessage(data)
      }

      return result
    }
  })
}

export default {
  name: 'setup-model',
  initialize
};
