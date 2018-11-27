define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", 'modules/mozu-grid/mozugrid-view', 'modules/mozu-grid/mozugrid-pagedCollection', "modules/views-paging", "modules/models-product", "modules/models-wishlist", "modules/search-autocomplete", "modules/models-cart", "modules/product-picker/product-picker-view", "modules/backbone-pane-switcher"], function ($, api, _, Hypr, Backbone, HyprLiveContext, MozuGrid, MozuGridCollection, PagingViews, ProductModels, WishlistModels, SearchAutoComplete, CartModels, ProductPicker, PaneSwitcher) {
    
    // var UsersEditModel = Backbone.MozuModel.extend({
        
    // });

    // var UsersEditView = Backbone.MozuView.extend({
    //     templateName: "modules/users/edit"

    // });
    
    // var UsersModalView = ModalDialogView.extend({
    //     templateName: "modules/users/modal",
    //     handleDialogOpen: function () {
    //         this.model.trigger('dialogOpen');
    //         this.bootstrapInstance.show();
    //     },
    //     handleDialogCancel: function () {
    //         var self = this;
    //         this.bootstrapInstance.hide();
    //     },
    //     handleDialogSave: function () {
    //         var self = this;
    //         this.bootstrapInstance.hide();
    //     },
    //     setInit: function () {
    //         var self = this;
    //         self.loadUserEditView();
    //         self.handleDialogOpen();
    //     },
    //     loadUserEditView: function () {
    //         var self = this;

    //         var userEditView = new AddProductStepView({
    //             el: $(self.modalContentEl()),
    //             model: self.model.get('discount').get('products').at(0)
    //         });
    //         self._productStepView = addProductStepView;
    //         addProductStepView.render();
    //     },
    //     render: function () {
    //         var self = this;
    //         self.setInit();
    //     }
    // });

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