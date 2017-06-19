import DS from 'ember-data'
import Ember from 'ember'

const {
  addObserver
} = Ember

export function initialize(application) {
  application.inject('route:application', 'smartModel', 'service:smart-model')

  DS.Model.reopen({
    eswUpdateCache() {
      const id = this.get('id')

      if (navigator.serviceWorker && navigator.serviceWorker.controller && id) {
        const data = this.serialize()
        data.id = id
        navigator.serviceWorker.controller.postMessage(data)
      }
    },

    didDelete() {
      const id = this.get('id')

      if (navigator.serviceWorker && navigator.serviceWorker.controller && id) {
        navigator.serviceWorker.controller.postMessage({ type: 'delete', id })
      }
    },

    init(...args) {
      this._super(...args)

      this.eachAttribute(key =>
        addObserver(this, key, this, 'eswUpdateCache')
      )
      this.eachRelationship(key =>
        addObserver(this, key, this, 'eswUpdateCache')
      )
    }
  })
}

export default {
  name: 'setup-model',
  initialize
}
