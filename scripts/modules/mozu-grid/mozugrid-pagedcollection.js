define(["underscore", "modules/backbone-mozu"], function ( _, Backbone) {
    
var MozuGridPagedCollection = Backbone.MozuPagedCollection.extend({
    mozuType: 'search',
    helpers: ['gridItems', 'columnNames'],
    //These are test columns and should be set when The collection is used
    columns: [
        {
            index: 'productCode',
            displayName: 'Product Code',
            sortable: true
        },
        {
            index: 'productName',
            displayName: 'Product Name',
            sortable: true
        },
        {
            index: 'price.price',
            displayName: 'Price',
            displayTemplate: function(price) {
                return '$' + price;
            },
            sortable: false
        }
    ],
    rowActions: [
        {
            displayName: 'Edit',
            action: 'someAction'
        }
    ],
    sort: function(index){
        var col = _.findWhere(this.get('columns'), {index: index});
        if (col && col.sortable) {
            var currentSort = this.currentSort();
            var sortDirection = "asc";
            if (currentSort) {
                var currentDirection = currentSort.split(" ")[1];
                if (currentDirection === "asc") {
                    sortDirection = "desc";
                }
            }
            this.sortBy(index + ' ' + sortDirection);
        }
    },
    gridItems: function(){
        var self = this;
        var items = [];
        if(self.columns && self.get('items').length) {
            self.get('items').each(function(item){
                var row = [];
                _.each(self.columns, function(col) {
                    var value = item.get(col.index);
                    if(col.displayTemplate){
                        value = col.displayTemplate(value);
                    }
                    row.push(value);
                });
                items.push(row);
            });
        }
        return items;
    },
    columnNames: function(){
        var self = this;
        var columns = [];
        if (self.columns){
            _.each(self.columns, function (col) {
                columns.push(col.displayName);
            });
        }
        return columns;
    },
    initialize: function () {
        var me = this;
        Backbone.MozuPagedCollection.prototype.initialize.apply(this, arguments);

        if (this.columns) {
            this.set('columns', this.columns);
            this.set('rowActions', this.rowActions);
        }
        // this.on('sync', function () {
        //     me.trigger('facetchange', me.getQueryString());
        // });
    }
});

return MozuGridPagedCollection;

});