define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", 'modules/mozu-grid/mozugrid-view', 'modules/mozu-grid/mozugrid-pagedCollection', "modules/views-paging", 'modules/editable-view', 'modules/models-customer'], function ($, api, _, Hypr, Backbone, HyprLiveContext, MozuGrid, MozuGridCollection, PagingViews, EditableView, CustomerModels) {
  var PaymentMethodsView = EditableView.extend({
      templateName: "modules/b2b-account/payment-information/payment-information",
      autoUpdate: [
          'editingCard.isDefaultPayMethod',
          'editingCard.paymentOrCardType',
          'editingCard.nameOnCard',
          'editingCard.cardNumberPartOrMask',
          'editingCard.expireMonth',
          'editingCard.expireYear',
          'editingCard.cvv',
          'editingCard.isCvvOptional',
          'editingCard.contactId',
          'editingContact.firstName',
          'editingContact.lastNameOrSurname',
          'editingContact.address.address1',
          'editingContact.address.address2',
          'editingContact.address.address3',
          'editingContact.address.cityOrTown',
          'editingContact.address.countryCode',
          'editingContact.address.stateOrProvince',
          'editingContact.address.postalOrZipCode',
          'editingContact.address.addressType',
          'editingContact.phoneNumbers.home',
          'editingContact.isBillingContact',
          'editingContact.isPrimaryBillingContact',
          'editingContact.isShippingContact',
          'editingContact.isPrimaryShippingContact'
      ],
      renderOnChange: [
          'editingCard.isDefaultPayMethod',
          'editingCard.contactId',
          'editingContact.address.countryCode'
      ],
      beginEditCard: function(e) {
          var id = this.editing.card = e.currentTarget.getAttribute('data-mz-card');
          this.model.beginEditCard(id);
          this.render();
      },
      finishEditCard: function() {
          var self = this;
          var operation = this.doModelAction('saveCard');
          if (operation) {
              operation.otherwise(function() {
                  self.editing.card = true;
              });
              this.editing.card = false;
          }
      },
      cancelEditCard: function() {
          this.editing.card = false;
          this.model.endEditCard();
          this.render();
      },
      beginDeleteCard: function(e) {
          var self = this,
              id = e.currentTarget.getAttribute('data-mz-card'),
              card = this.model.get('cards').get(id);
          if (window.confirm(Hypr.getLabel('confirmDeleteCard', card.get('cardNumberPart')))) {
              this.doModelAction('deleteCard', id);
          }
      },
      render: function(){
          Backbone.MozuView.prototype.render.apply(this, arguments);
          var self = this;
          $(document).ready(function () {
              var collection = new TransactionGridCollectionModel({id: self.model.get('id')});
              console.log(self.model);
              console.log(self.model.apiModel);
              var transactionsGrid = new MozuGrid({
                  el: self.el,
                  model: collection
              });
              transactionsGrid.render();
              return;
          });
      }
  });

  var TransactionGridCollectionModel = MozuGridCollection.extend({
      mozuType: 'customer',
      apiGridRead: function(){
          return this.apiGetPurchaseOrderTransactions();
      },
      columns: [
          {
              index: 'date',
              displayName: 'Date',
              sortable: true
          },
          {
              index: 'orderNumber',
              displayName: 'Order Number',
              sortable: true
          },
          {
              index: 'orderType',
              displayName: 'Order Type',
              sortable: false
          },
          {
              index: 'purchaseOrderNumber',
              displayName: 'PO#',
              sortable: false
          },
          {
              index: 'author',
              displayName: 'Author',
              sortable: false
          },
          {
              index: 'transactionDetails',
              displayName: 'Transaction Details',
              sortable: false
          },
          {
              index: 'amount',
              displayName: 'Amount',
              sortable: true,
              displayTemplate: function (amount){
                  if(amount){
                      return '$' + amount.toFixed(2);
                  }
                  return "";
              }
          }
      ],
      // rowActions: [
      //     {
      //         displayName: 'Edit',
      //         action: 'editWishlist'
      //     },
      //     {
      //         displayName: 'Delete',
      //         action: 'deleteWishlist'
      //     },
      //     {
      //         displayName: 'Copy',
      //         action: 'copyWishlist'
      //     },
      //     {
      //         displayName: 'Order',
      //         action: 'addWishlistToCart'
      //     }
      // ],
      relations: {
          items: Backbone.Collection.extend({})
      },
      deleteWishlist: function (e, row) {
          console.log('Remove Wishlist');
          //var rowIndex = $(e.target).parents('.mz-grid-row').data('mzRowIndex');
          //var wishlistId = e.target.data("mzQuoteId");
          //Confirmation Modal
          window.quoteViews.quotesView.removeQuote(row.get('id'));
      },
      editWishlist: function (e, row) {
          console.log('Edit Wishlist');
          //var rowIndex = $(e.target).parents('.mz-grid-row').data('mzRowIndex');

          window.quoteViews.quotesView.model.setQuote(row);
          window.quoteViews.quotesView.model.setEditMode(true);
          window.quoteViews.quotesView.render();
      },
      copyWishlist: function(e, row){
          var wishlistName = 'copy - ' + row.get('name');
          row.set('name', wishlistName);
          window.quoteViews.quotesView.copyQuote(row);
      }
  });

  return {
    'PaymentInformationView': PaymentMethodsView
  };

    // $(document).ready(function(){
    //       var accountModel = window.accountModel = CustomerModels.EditableCustomer.fromCurrent();
    //       var views = {
    //         paymentView: new PaymentMethodsView({
    //             el: $('mz-b2b-payment-wrapper'),
    //             model: accountModel
    //         })
    //       };
    //
    //       window.quoteViews = views;
    //       _.invoke(views, 'render');
    // });
});
