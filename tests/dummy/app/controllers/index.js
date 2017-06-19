import Ember from 'ember'

const {
  Controller,
  inject: { service }
} = Ember

export default Controller.extend({
  smartModel: service(),

  queryParams: ['delay'],

  actions: {
    updateName(widget, name) {
      widget.set('name', name)
    },

    resetName(widget) {
      widget.set('name', widget.get('id') === '1' ? 'sproing' : 'plammer')
    },

    remove(widget) {
      widget.deleteRecord()
    }
  }
})
