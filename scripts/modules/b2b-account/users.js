define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", 'modules/mozu-grid/mozugrid-view', 'modules/mozu-grid/mozugrid-pagedCollection', "modules/views-paging", "modules/models-product", "modules/models-b2b-accounts", "modules/search-autocomplete", "modules/models-cart", "modules/product-picker/product-picker-view", "modules/backbone-pane-switcher", "modules/models-dialog", "modules/views-modal-dialog'"], function ($, api, _, Hypr, Backbone, HyprLiveContext, MozuGrid, MozuGridCollection, PagingViews, ProductModels, B2BAccountModels, SearchAutoComplete, CartModels, ProductPicker, PaneSwitcher, DialogModels, ModalDialogView) {

    var UsersEditModel = Backbone.MozuModel.extend({
        relations: {
            user: B2BAccountModels.b2bUser
        },
        defaults: {
            b2bAccountId: require.mozuData('user').accountId
        },
        saveUser: function(){
            if(this.get('id')) {
                return this.get('user').apiUpdate.then(function(){

                });
            }

            return this.get('user').apiCreate.then(function () {

            }); 
        },
        setUser: function(user){
            this.get('user').clear();
            this.set('user', user);

        },
        removeUser: function(){
            return this.get('user').apiDelete.then(function () {

            });  
        }
    });

    var UsersEditForm = Backbone.MozuView.extend({
        templateName: "modules/users/edit-users-form",
        autoUpdate: [
            'user.firstName',
            'user.lastName',
            'user.email',
            'user.isActive',
            'user.userRole'
        ]
    });

    var UserModalModel = DialogModels.extend({});

    var UsersModalView = ModalDialogView.extend({
        templateName: "modules/users/users-modal",
        handleDialogOpen: function () {
            this.model.trigger('dialogOpen');
            this.bootstrapInstance.show();
        },
        handleDialogCancel: function () {
            var self = this;
            this.bootstrapInstance.hide();
        },
        handleDialogSave: function () {
            var self = this;
            if (self._userForm ) {
                self.model.saveUser();
            }
            this.bootstrapInstance.hide();
        },
        setInit: function () {
            var self = this;
            self.loadUserEditView();
            self.handleDialogOpen();
        },
        loadUserEditView: function (user) {
            var self = this;
            user = user || {};
            var userEditForm = new UsersEditForm({
                el: self.$el.find('.mz-user-modal-content'),
                model: new UsersEditModel(user)
            });
            self._userForm = UsersEditForm;
            userEditForm.render();
        },
        render: function () {
            var self = this;
            self.setInit();
        }
    });

    var UsersGridCollectionModel = MozuGridCollection.extend({
        mozuType: 'b2baccount',
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
            var self = this;
            var user = B2BAccountModels.b2bUser(row);
            user.apiDelete().then(function(){
                self.refreshGrid();
            });
        },
        editUser: function (e, row) {
            var user = B2BAccountModels.b2bUser(row);
            window.userModalView.loadUserEditView(user);
            window.userModalView.handleDialogOpen();
        }
    });

    var UsersModel = Backbone.MozuModel.extend({

    });

    var UsersView = Backbone.MozuView.extend({
        templateName: "modules/b2b-account/users/users",
        render: function () {
            var self = this;
            var collection = new UsersGridCollectionModel({});

            var usersGrid = new MozuGrid({
                el: self.el.find('.mz-b2baccount-users'),
                model: collection
            });

            var usersModalView = new UsersModalView({
                el: self.el.find('.mz-b2baccount-users-modal'),
                model: new UserModalModel({})
            });

            window.userModalView = UsersModalView;

            usersGrid.render();
        }
    });

    return {
        'UsersView': UsersView,
        'UsersModel': UsersModel,
        'UsersModalView': UsersModalView
    };
});
