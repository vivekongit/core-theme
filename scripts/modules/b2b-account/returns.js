define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", 'modules/mozu-grid/mozugrid-view', 'modules/mozu-grid/mozugrid-pagedCollection', "modules/views-paging", 'modules/editable-view', 'modules/models-customer', 'modules/models-returns'], function ($, api, _, Hypr, Backbone, HyprLiveContext, MozuGrid, MozuGridCollection, PagingViews, EditableView, CustomerModels, ReturnModels) {
  var ReturnsView = Backbone.MozuView.extend({
      templateName: "modules/b2b-account/returns/returns",
      initialize: function(){
        Backbone.MozuView.prototype.initialize.apply(this, arguments);
      },
      render: function(){
          var self = this;
          Backbone.MozuView.prototype.render.apply(this, arguments);
          var returnHistory = CustomerModels.Customer.fromCurrent().get('returnHistory');
          var collection = new ReturnsGridCollectionModel({});
          collection.set('items', returnHistory.items);
          window.console.log(collection);
          this.initializeGrid(collection);
      },
      initializeGrid: function(collection){
          var self = this;
          $(document).ready( function () {
                var returnsGrid = new MozuGrid({
                    el: $('.mz-b2b-returns-grid'),
                    model: collection
                });
                returnsGrid.listenTo(returnsGrid.model, 'viewReturn', self.viewReturn.bind(self));
                returnsGrid.render();
                return;
          });
      },
      viewReturn: function(row){
          this.model.set('viewReturn', true);
          this.model.set('currentReturn', row.toJSON());
          window.console.log(this.model.get('currentReturn'));
          this.render();
      },
      returnToGrid: function(){
          this.model.set('viewReturn', false);
          this.render();
      },
      viewAllReturns: function(){
          // Set loading
          // Make API call to get all orders for b2b account id
          // set it to orderHistory
      }
  });

  var ReturnsGridCollectionModel = MozuGridCollection.extend({
      mozuType: 'returns',
      autoload: false,
      columns: [
          {
              index: 'returnNumber',
              displayName: 'Return ID',
              sortable: true
          },
          {
              index: 'originalOrderNumber',
              displayName: 'Order ID',
              sortable: true
          },
          {
              index: 'auditInfo',
              displayName: 'Submitted Date',
              sortable: true,
              displayTemplate: function(auditInfo){
                  var date = new Date(auditInfo.createDate);
                  return date.toLocaleDateString();
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
              index: 'status',
              displayName: 'Return Status',
              sortable: false
          }
      ],
      rowActions: [
        {
            displayName: 'View',
            action: 'viewReturn'
        }
      ],
      relations: {
          items: Backbone.Collection.extend({})
      },
      viewReturn: function(e, row){
          this.trigger('viewReturn', row);
      },
      backToGrid: function(){
          this.set('viewReturn', false);
      }
  });

  return {
    'ReturnsView': ReturnsView
  };

});
