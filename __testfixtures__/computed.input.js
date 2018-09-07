import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { Component } = Ember;

export default Component.extend({

  @computed('firstName', 'lastName')
  fullName(firstName, lastName) {
    firstName
  }
})