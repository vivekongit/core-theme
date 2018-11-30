define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", 'modules/mozu-grid/mozugrid-view', 'modules/mozu-grid/mozugrid-pagedCollection', "modules/views-paging", 'modules/editable-view', 'modules/models-customer', 'modules/models-orders', 'modules/models-cart'], function ($, api, _, Hypr, Backbone, HyprLiveContext, MozuGrid, MozuGridCollection, PagingViews, EditableView, CustomerModels, OrderModels, CartModels) {
  var OrdersView = Backbone.MozuView.extend({
      templateName: "modules/b2b-account/orders/orders",
      initialize: function(){
        Backbone.MozuView.prototype.initialize.apply(this, arguments);
      },
      render: function(){
          var self = this;
          Backbone.MozuView.prototype.render.apply(this, arguments);
          var orderHistory = CustomerModels.Customer.fromCurrent().get('orderHistory');
          var collection = new OrdersGridCollectionModel({});
          collection.set('items', orderHistory.items);
          this.initializeGrid(collection);
      },
      initializeGrid: function(collection){
          var self = this;
          $(document).ready( function () {
                var ordersGrid = new MozuGrid({
                    el: $('.mz-b2b-orders-grid'),
                    model: collection
                });
                ordersGrid.listenTo(ordersGrid.model, 'viewOrder', self.viewOrder.bind(self));
                ordersGrid.listenTo(ordersGrid.model, 'reorder', self.reorder.bind(self));
                ordersGrid.render();
                return;
          });
      },
      viewOrder: function(row){
          this.model.set('viewOrder', true);
          this.model.set('currentOrder', row.toJSON());
          this.render();
      },
      returnToGrid: function(){
          this.model.set('viewOrder', false);
          this.render();
      },
      reorder: function(e, row){
          var self = this;
          var order = row || new Backbone.MozuModel(self.model.get('currentOrder'));
          var cart = CartModels.Cart.fromCurrent();
          var products = order.get('items');
          cart.apiModel.addBulkProducts({ postdata: products}).then(function(){
              window.location = (HyprLiveContext.locals.siteContext.siteSubdirectory || '') + "/cart";
          });
      },
      viewAllOrders: function(){
          // Set loading
          // Make API call to get all orders for b2b account id
          // set it to orderHistory
      }
  });

  var OrdersGridCollectionModel = MozuGridCollection.extend({
      mozuType: 'orders',
      autoload: false,
      columns: [
          {
              index: 'orderNumber',
              displayName: 'Order Number',
              sortable: true
          },
          {
              index: 'submittedDate',
              displayName: 'Submitted Date',
              sortable: true,
              displayTemplate: function(value){
                var date = new Date(value);
                return date.toLocaleDateString();
              }
          },
          {
              index: 'fulfillmentInfo',
              displayName: 'Ship To',
              sortable: false,
              displayTemplate: function(fulfillmentInfo){
                // Form a readable address string
                if (fulfillmentInfo.fulfillmentContact){
                    var address = fulfillmentInfo.fulfillmentContact.address;
                    var firstLine = address.address1;
                    var tooltip = $('<span />').attr('class', 'tooltiptext').html('tooly');
                    var container = $('<div />').attr('class', 'tooltip').html(firstLine+tooltip.prop('outerHTML'));
                    var tooltipText = address.address1;
                    if (address.address2) tooltipText += '</br>' + address.address2;
                    if (address.address3) tooltipText += '</br>' + address.address3;
                    if (address.address4) tooltipText += '</br>' + address.address4;
                    tooltipText += '</br>' + (address.cityOrTown || '');
                    tooltipText += ', '+ (address.stateOrProvince || '') + ' ';
                    tooltipText += address.postalOrZipCode;
                    tooltipText += '</br>' + (address.countryCode || '');

                    return '<span class="grid-tooltip">'+firstLine+'<span class="tooltiptext">'+tooltipText+'</span></span>';
                }
                return "N/A";
              }
          },
          {
              index: 'createdBy',
              displayName: 'Created By',
              sortable: false,
              displayTemplate: function(createdBy){
                  // We'll need to do extra work to get this.
                  if (createdBy) return createdBy;
                  return "";
              }
          },
          {
              index: 'total',
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
              displayName: 'View',
              action: 'viewOrder'
          },
          {
              displayName: 'Reorder',
              action: 'reorder'
          }
      ],
      relations: {
          items: Backbone.Collection.extend({
              model: OrderModels.Order
          })
      },
      viewOrder: function(e, row){
          this.trigger('viewOrder', row);
      },
      reorder: function(e, row){
        this.trigger('reorder', e, row);
      },
      backToGrid: function(){
          this.set('viewOrder', false);
      }
  });

  return {
    'OrdersView': OrdersView
  };

});
