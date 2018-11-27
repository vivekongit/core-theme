define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", 'modules/mozu-grid/mozugrid-view', 'modules/mozu-grid/mozugrid-pagedCollection', "modules/views-paging", "modules/models-product", "modules/models-wishlist", "modules/search-autocomplete", "modules/models-cart", "modules/product-picker/product-picker-view", "modules/backbone-pane-switcher"], function ($, api, _, Hypr, Backbone, HyprLiveContext, MozuGrid, MozuGridCollection, PagingViews, ProductModels, WishlistModels, SearchAutoComplete, CartModels, ProductPicker, PaneSwitcher) {

    var UsersGridCollectionModel = MozuGridCollection.extend({
        mozuType: 'customers',
        columns: [
            {
                index: 'name',
                displayName: 'Name',
                sortable: true
            }
        ],
        rowActions: [
            {
                displayName: 'Edit',
                action: 'editUser'
            },
            {
                displayName: 'Delete',
                action: 'deleteUser'
            }
        ],
        relations: {
            items: Backbone.Collection.extend({})
        },
        deleteUser: function (e, row) {
        },
        editUser: function (e, row) {
            
        }
    });

    var UsersModel = Backbone.MozuModel.extend({

    });

    var UsersView = Backbone.MozuView.extend({
        templateName: "modules/b2b-account/users",
        render: function () {
            var self = this;
            var collection = new UsersGridCollectionModel({});

            var usersGrid = new MozuGrid({
                el: self.el,
                model: collection
            });

            usersGrid.render();
        }
    });

    return {
        'UsersView': UsersView,
        'UsersModel': UsersModel
    };
});