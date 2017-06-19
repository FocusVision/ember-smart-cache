import DS from 'ember-data'

const {
  attr,
  Model
} = DS

export default Model.extend({
  size: attr('string'),
  name: attr('string'),
  price: attr('string')
})
