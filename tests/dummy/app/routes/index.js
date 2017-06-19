import Ember from 'ember'

const {
  $,
  Route
} = Ember

export default Route.extend({
  queryParams: {
    delay: {
      refreshModel: true
    }
  },

  model(params) {
    if (params.delay) {
      this.wait(parseInt(params.delay))
    }
    return $.ajax('/endpoint.json')
      .then(payload => this.store.push(payload))
  },

  wait(ms) {
    const start = new Date().getTime()
    let end = start
    while(end < start + ms) {
      end = new Date().getTime()
    }
  }
})
