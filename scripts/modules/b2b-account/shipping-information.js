define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", "pages/myaccount", 'modules/models-customer'], function ($, api, _, Hypr, Backbone, HyprLiveContext, AccountViews, CustomerModels) {
  var AddressBookView = AccountViews.AddressBookView.extend({
      templateName: 'modules/b2b-account/shipping-information/shipping-information'
  });

  var AddressBookModel = CustomerModels.EditableCustomer.extend({
      helpers: ['canEditPrimary'],
      defaults: {
          userId: require.mozuData('user').userId
      },
      requiredBehaviors: [1002],
      canEditPrimary: function(){
          return this.hasRequiredBehavior(1008);
      }
  });

  return {
    'AddressBookView': AddressBookView,
    'AddressBookModel': AddressBookModel
  };
});
