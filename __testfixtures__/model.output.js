import DS from 'ember-data';
import { attr, belongsTo, hasMany } from '@ember-decorators/data';
import { DEFAULT_DEALER_ORDER_MARGIN } from 'product-management/utils/variables'

const DEFAULT_TAX_RATE = 7.0
const DEFAULT_DELIVERY_COST = 0.0
const DEFAULT_CHARGE_SALES_TAX = true

export default DS.Model.extend({

  @attr({ defaultValue: DEFAULT_CHARGE_SALES_TAX }) chargeSalesTax,
  @attr({ defaultValue: DEFAULT_TAX_RATE }) taxRate,
  @attr({ defaultValue: DEFAULT_DEALER_ORDER_MARGIN }) globalMargin,
  @attr('array-of-json') lineItemMargins,
  @attr({ defaultValue: DEFAULT_DELIVERY_COST }) deliveryCost,
  @belongsTo order,
  @hasMany({ async: false }) miscItems

})