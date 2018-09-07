import Ember from 'ember';
import DS from 'ember-data';
import {
  attr,
} from "ember-computed-decorators/ember-data";

import computed, { map, not } from 'ember-computed-decorators';

export default DS.Model.extend({

  @attr dealerReference,
  loadedStatuses: DS.attr("array"),
  @map("loadedStatuses", item => {
    return Ember.String.camelize(item);
  }) camelizedLoadedStatuses,
  @not("isFullyLoaded") isNotFullyLoaded,

});