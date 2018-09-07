import Ember from 'ember';
import { computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';

const { Component } = Ember;

export default Component.extend({

  @alias('fullName') myFullName,
  @computed('firstName', 'lastName')
  fullName(firstName, lastName) {
    return `${firstName} + ${lastName}`
  }
})