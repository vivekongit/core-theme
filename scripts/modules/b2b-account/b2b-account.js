define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", 'modules/mozu-grid/mozugrid-view', 'modules/mozu-grid/mozugrid-pagedCollection', "modules/views-paging", "modules/models-product", "modules/models-wishlist", "modules/search-autocomplete", "modules/models-cart", 'modules/models-customer', "modules/b2b-account/quotes", "modules/b2b-account/users", "modules/b2b-account/orders", "modules/b2b-account/returns", "modules/b2b-account/payment-information", "modules/backbone-pane-switcher"], function ($, api, _, Hypr, Backbone, HyprLiveContext, MozuGrid, MozuGridCollection, PagingViews, ProductModels, WishlistModels, SearchAutoComplete, CartModels, CustomerModels, Lists, Users, Orders, Returns, PaymentInformation, PaneSwitcher) {

    var paneSwitcherModel = new PaneSwitcher.PaneSwitcherModel({
        panes: [
            {
                name: 'Account Information'
            },
            {
                name: 'Orders',
                view: new Orders.OrdersView({
                    model: CustomerModels.EditableCustomer.fromCurrent()
                })
            },
            {
                name: 'Returns',
                view: new Returns.ReturnsView({
                    model: CustomerModels.EditableCustomer.fromCurrent()
                })
            },
            {
                name: 'Users',
                view: new Users.UsersView({
                    model: new Users.UsersModel({})
                })
            },
            {
                name: 'Lists',
                view: new Lists.QuotesView({
                    el: $('.mz-b2b-quote-wrapper'),
                    model: new Lists.QuotesModel({})
                })
            },
            {
                name: 'Shipping Information'
            },
            {
                name: 'Payment Information',
                view: new PaymentInformation.PaymentInformationView({
                    model: CustomerModels.EditableCustomer.fromCurrent()
                })
            },
            {
                name: 'Custom Attributes'
            }
        ]
    });

    $(document).ready(function () {

        var views = {
            paneSwitcherView: new PaneSwitcher.PaneSwitcherView({
                templateName: "modules/b2b-account/pane-switcher",
                el: $('.mz-b2b-pane-switcher'),
                model: paneSwitcherModel
            })
        };

        window.quoteViews = views;
        _.invoke(views, 'render');

    });
});
