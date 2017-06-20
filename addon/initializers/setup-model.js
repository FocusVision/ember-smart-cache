import DS from 'ember-data'
import Ember from 'ember'

const {
  addObserver
} = Ember
const {
  serviceWorker
} = navigator

const sendMessage = (type, data) => {
  if (serviceWorker && serviceWorker.controller && data.id) {
    navigator.serviceWorker.controller.postMessage({ type, data })
  }
}

export function initialize(application) {
  application.inject('route:application', 'smartModel', 'service:smart-model')

  DS.Model.reopen({
    eswUpdateCache() {
      const id = this.get('id')
      const data = this.serialize()
      data.id = id

      sendMessage('update', data)
    },

    destroyRecord(...args) {
      const id = this.get('id')
      const type = this._internalModel.modelName

      this._super(...args)
      sendMessage('delete', { type, id })
    },

    deleteRecord(...args) {
      const id = this.get('id')
      const type = this._internalModel.modelName

      this._super(...args)
      sendMessage('delete', { type, id })
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
