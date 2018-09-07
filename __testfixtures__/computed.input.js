import Ember from 'ember';
import computed, { alias } from 'ember-computed-decorators';

const { Component } = Ember;

export default Component.extend({

  @alias('fullName') myFullName,
  @computed('firstName', 'lastName')
  fullName(firstName, lastName) {
    return `${firstName} + ${lastName}`
  }
})