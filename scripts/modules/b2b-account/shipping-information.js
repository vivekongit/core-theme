define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", "pages/myaccount", 'modules/models-customer'], function ($, api, _, Hypr, Backbone, HyprLiveContext, AccountViews, CustomerModels) {
  var AddressBookView = AccountViews.AddressBookView.extend({
      templateName: 'modules/b2b-account/shipping-information/shipping-information'
  });

  var AddressBookModel = CustomerModels.EditableCustomer.extend({
      helpers: ['isLimited'],
      defaults: {
          userId: require.mozuData('user')
      },
      requiredBehaviors: [1002],
      isLimited: function(){
          return !this.hasRequiredBehavior();
      }
  });

  return {
    'AddressBookView': AddressBookView,
    'AddressBookModel': AddressBookModel
  };
});
