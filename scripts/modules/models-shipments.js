define([
    "modules/api",
    'underscore',
    "modules/backbone-mozu",
    "hyprlive",
    "modules/models-product",
    "modules/models-returns"
], function (api, _, Backbone, Hypr, ProductModels, ReturnModels) {

    var Shipment = Backbone.MozuModel.extend({
        relations: {
            items: Backbone.Collection.extend({
                model: ProductModels.Product
            })
        }
    }),
    ShipmentCollection = Backbone.MozuPagedCollection.extend({
        mozuType: 'shipments',
        defaults: {
            pageSize: 3
        },
        relations: {
            items: Backbone.Collection.extend({
                model: Shipment
            })
        },
        helpers: ['getMoreShipmentItems'],
        set: function(rawData, options, nonAggregateItems){
            if(!nonAggregateItems) {
                if(rawData.items && this.items) {
                    rawData.items = rawData.items.concat(this.items);
                }
            }
            return Backbone.MozuModel.prototype.set.call(this, rawData, options)
        },
        getMoreShipmentItems: function() {
            return this.nextPage();    
        }
    });

    return {
        ShipmentCollection: ShipmentCollection,
        Shipment: Shipment
    };

});