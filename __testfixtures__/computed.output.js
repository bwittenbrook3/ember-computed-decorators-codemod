import Ember from 'ember';
import { computed } from '@ember-decorators/object';

const { Component } = Ember;

export default Component.extend({

  @computed('firstName', 'lastName')
  fullName(firstName, lastName) {
    return `${firstName} + ${lastName}`
  }
})