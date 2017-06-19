import Ember from 'ember'

const {
  Controller,
  inject: { service }
} = Ember

export default Controller.extend({
  smartModel: service(),

  queryParams: ['delay'],

  actions: {
    updateName(widget) {
      widget.set('name', 'frank')
    }
  }
})
