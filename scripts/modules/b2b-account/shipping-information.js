define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", "pages/myaccount", 'modules/models-customer'], function ($, api, _, Hypr, Backbone, HyprLiveContext, AccountViews, CustomerModels) {
// TODO: Flesh this out to get 'soft' behaviors and make the isLimited helper function return accurately.
  var AddressBookView = AccountViews.AddressBookView.extend({
      templateName: 'modules/b2b-account/shipping-information/shipping-information'
  });

  var AddressBookModel = CustomerModels.EditableCustomer.extend({
      helpers: ['isLimited'],
      requiredBehaviors: [ 1002 ],
      isLimited: function(){
          return !this.hasRequiredBehavior();
      }
  });

  return {
    'AddressBookView': AddressBookView,
    'AddressBookModel': AddressBookModel
  };
});
