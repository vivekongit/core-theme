define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", 'modules/mozu-grid/mozugrid-view', 'modules/mozu-grid/mozugrid-pagedCollection', "modules/views-paging", 'modules/editable-view', 'modules/models-customer', 'modules/models-orders'], function ($, api, _, Hypr, Backbone, HyprLiveContext, MozuGrid, MozuGridCollection, PagingViews, EditableView, CustomerModels, OrderModels) {
  var OrdersGridView = Backbone.MozuView.extend({
      templateName: "modules/b2b-account/orders/orders-grid",
      render: function(){
          var self = this;
          $(document).ready(function () {
              var collection = new OrdersGridCollectionModel(self.model);
              var ordersGrid = new MozuGrid({
                  el: $('.mz-b2b-orders-grid'),
                  model: collection
              });
              ordersGrid.render();
              return;
          });
      }
  });

  var OrdersGridCollectionModel = MozuGridCollection.extend({
      mozuType: 'orders',
      columns: [
          {
              index: 'id',
              displayName: 'Order ID',
              sortable: true
          },
          {
              index: 'date',
              displayName: 'Submitted Date',
              sortable: true,
              displayTemplate: function(date){
                return date;
                // Date renderer
              }
          },
          {
              index: 'fulfillmentLocation',
              displayName: 'Ship To',
              sortable: false,
              displayTemplate: function(location){
                // Form a readable address string
                return location;
              }
          },
          {
              index: 'createdBy',
              displayName: 'Created By',
              sortable: false,
              displayTemplate: function(createdBy){
                  // We'll need access to the full model most likely
                  return createdBy;
              }
          },
          {
              index: 'totalAmount',
              displayName: 'Order Total',
              sortable: false,
              displayTemplate: function (amount){
                  return '$'+amount.toFixed(2);
              }
          },
          {
              index: 'transactionDetails',
              displayName: 'Transaction Details',
              sortable: false
          },
          {
              index: 'status',
              displayName: 'Order Status',
              sortable: false
          }
      ],
      rowActions: [
          {
              displayName: 'edit',
              action: 'editWishlist'
          }
      ],
      relations: {
          items: OrderModels.OrderCollection
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
    'OrdersGridView': OrdersGridView
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
