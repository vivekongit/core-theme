define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", 'modules/mozuGrid/mozugrid-view', 'modules/mozuGrid/mozugrid-pagedCollection', "modules/views-paging", "modules/models-product"], function ($, api, _, Hypr, Backbone, HyprLiveContext, MozuGrid, MozuGridCollection, PagingViews, ProductModels) {


    var mozuGridCollection = MozuGridCollection.extend({
        mozuType: 'search',
        relations: {
            items: Backbone.Collection.extend({
                model: ProductModels.Product
            })
        }
    })


    $(document).ready(function () {
        // var product = ProductModels.Product.fromCurrent();

        // product.on('addedtocart', function (cartitem) {
        //     if (cartitem && cartitem.prop('id')) {
        //         product.isLoading(true);
        //         CartMonitor.addToCount(product.get('quantity'));
        //         window.location.href = (HyprLiveContext.locals.pageContext.secureHost || HyprLiveContext.locals.siteContext.siteSubdirectory) + "/cart";
        //     } else {
        //         product.trigger("error", { message: Hypr.getLabel('unexpectedError') });
        //     }
        // });

        // product.on('addedtowishlist', function (cartitem) {
        //     $('#add-to-wishlist').prop('disabled', 'disabled').text(Hypr.getLabel('addedToWishlist'));
        // });

        // var productImagesView = new ProductImageViews.ProductPageImagesView({
        //     el: $('[data-mz-productimages]'),
        //     model: product
        // });
        var collaction = new mozuGridCollection();
        var views = {
            mozuGrid: new MozuGrid({
                el: $('.dataGrid'),
                model: collaction
            })
        }
        
        _.invoke(views, 'render');
        

        // window.gridView = gridView;

    });

    // var territories = new Territories();

    // // Fetch some countries from the url
    // territories.fetch();

    
    var territories = new Backbone.MozuPagedCollection({ items: new Backbone.Collection([{ "name": "Afghanistan", "url": "http://en.wikipedia.org/wiki/Afghanistan", "pop": 25500100, "date": "2013-01-01", "percentage": 0.36, "id": 1 }, { "name": "Albania", "url": "http://en.wikipedia.org/wiki/Albania", "pop": 2831741, "date": "2011-10-01", "percentage": 0.04, "id": 2 }, { "name": "Algeria", "url": "http://en.wikipedia.org/wiki/Algeria", "pop": 37100000, "date": "2012-01-01", "percentage": 0.53, "id": 3 }, { "name": "American Samoa (USA)", "url": "http://en.wikipedia.org/wiki/American_Samoa", "pop": 55519, "date": "2010-04-01", "percentage": 0.00079, "id": 4 }, { "name": "Andorra", "url": "http://en.wikipedia.org/wiki/Andorra", "pop": 78115, "date": "2011-07-01", "percentage": 0.0011, "id": 5 }, { "name": "Angola", "url": "http://en.wikipedia.org/wiki/Angola", "pop": 20609294, "date": "2012-07-01", "percentage": 0.29, "id": 6 }])});

    
    
    // Column definitions
    var columns = [{
        name: "productCode", // The key of the model attribute
        label: "Product Code", // The name to display in the header
        editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
        // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
        cell: "string"
    }, {
        name: "productName",
        label: "Name",
        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
        cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
    }];

    // var backGrid = Backbone.MozuView.extend(Backgrid.Grid);

    // // Initialize a new Grid instance
    // var gridView = backGrid.extend ({
    //     templateName: 'modules/gridview',
    //     el: $('.dataGrid'),
    //     columns: columns,
    // });

    // products = api.get('search', {
    //     filter: 'discountId eq ' + config.discountId,
    //     pageSize: (config.displayStyle === 'product' ? 1 : 20)
    // });

    // var DataCollection = Backbone.PageableCollection.extend({

    //     url: function(){
    //         var self =this;
    //         return "https://google.com"
    //     },

    //     // Initial pagination states
    //     state: {
    //         pageSize: 2,
    //         sortKey: "updated",
    //         order: 1,
    //         totalPages: 20,
    //         totalRecords: 40
    //     },

    //     // You can remap the query parameters from `state` keys from
    //     // the default to those your server supports
    //     queryParams: {
    //         totalPages: null,
    //         totalRecords: null,
    //         sortKey: "sort",
    //         q: "state:closed repo:jashkenas/backbone"
    //     },

    //     parseState: function (resp, queryParams, state, options) {
    //         return { totalRecords: resp.total_count };
    //     },

    //     parseRecords: function (resp, options) {
    //         return resp.items;
    //     },
         

    // });

    // var dataCollection = new DataCollection([{ 'name': 'asdf' }, { 'name': 'asdf' }, { 'name': 'asdf' }, { 'name': 'asdf' }, { 'name': 'asdf' }, { 'name': 'asdf' }]);
    // //Backgrid.Extension.Paginator = Paginator;
    // var paginator = new Backgrid.Extension.Paginator({

        // If you anticipate a large number of pages, you can adjust
        // the number of page handles to show. The sliding window
        // will automatically show the next set of page handles when
        // you click next at the end of a window.
    //     windowSize: 20, // Default is 10

    //     // Used to multiple windowSize to yield a number of pages to slide,
    //     // in the case the number is 5
    //     slideScale: 0.25, // Default is 0.5

    //     // Whether sorting should go back to the first page
    //     goBackFirstOnSort: false, // Default is true

    //     collection: dataCollection
    // });

    //$(".dataGrid").append(paginator.render().el);


    // api.get('search', { pageSize: 20 }).then(function (products) {
    //     // var mappedProducts = _.map(products, function(product){
    //     //     return product.data;
    //     // })
    //     //var productCollection = new Backbone.Collection(mappedProducts);
    //     var productCollection = new ProductModels.ProductCollection(products.data);
    //     var grid = new Backbone.MozuBackGrid.Grid({
    //         columns: columns,
    //         collection: productCollection
    //     });
    //     $(".dataGrid").append(grid.render().el);
    // });

    
    

    // Render the grid and attach the Grid's root to your HTML document
    
    

    $(document).ready(function () {
        // var product = ProductModels.Product.fromCurrent();

        // product.on('addedtocart', function (cartitem) {
        //     if (cartitem && cartitem.prop('id')) {
        //         product.isLoading(true);
        //         CartMonitor.addToCount(product.get('quantity'));
        //         window.location.href = (HyprLiveContext.locals.pageContext.secureHost || HyprLiveContext.locals.siteContext.siteSubdirectory) + "/cart";
        //     } else {
        //         product.trigger("error", { message: Hypr.getLabel('unexpectedError') });
        //     }
        // });

        // product.on('addedtowishlist', function (cartitem) {
        //     $('#add-to-wishlist').prop('disabled', 'disabled').text(Hypr.getLabel('addedToWishlist'));
        // });

        // var productImagesView = new ProductImageViews.ProductPageImagesView({
        //     el: $('[data-mz-productimages]'),
        //     model: product
        // });

        

        // window.gridView = gridView;

        // gridView.render();

    });

});
