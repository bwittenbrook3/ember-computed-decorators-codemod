import Ember from 'ember';
import DS from 'ember-data';
import { attr } from '@ember-decorators/data';
import { computed } from '@ember-decorators/object';
import { map, not } from '@ember-decorators/object/computed';

export default DS.Model.extend({

  @attr dealerReference,
  loadedStatuses: DS.attr("array"),
  @map("loadedStatuses", item => {
    return Ember.String.camelize(item);
  }) camelizedLoadedStatuses,
  @not("isFullyLoaded") isNotFullyLoaded,

});