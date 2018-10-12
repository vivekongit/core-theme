define(["jquery", "underscore", "hyprlive", "backbone", "vendor/backgrid/lib/backgrid", "vendor/backbone.paginator/lib/backbone.paginator"], function ($, _, Hypr, Backbone, Backgrid, BackGridPaginator) {

    Backbone.MozuBackGrid = Backgrid;
    

    // MozuBackGrid.Grid.extend({

    // });

    // Backbone.MozuBackGrid.Grid.prototype.initialize = function (options) {
    //     // Convert the list of column objects here first so the subviews don't have
    //     // to.
    //     if (!(options.columns instanceof Backbone.Collection)) {
    //         options.columns = new Backgrid.Columns(options.columns || this.columns);
    //     }
    //     this.columns = options.columns;

    //     this.caption = options.caption;

    //     var filteredOptions = _.omit(options, ["el", "id", "attributes",
    //         "className", "tagName", "events"]);

    //     // must construct body first so it listens to backgrid:sort first
    //     this.body = options.body || this.body;
    //     this.body = new this.body(filteredOptions);

    //     this.header = options.header || this.header;
    //     if (this.header) {
    //         this.header = new this.header(filteredOptions);
    //     }

    //     this.footer = options.footer || this.footer;
    //     if (this.footer) {
    //         this.footer = new this.footer(filteredOptions);
    //     }

    //     this.listenTo(this.columns, "reset", function () {
    //         if (this.header) {
    //             this.header = new (this.header.remove().constructor)(filteredOptions);
    //         }
    //         this.body = new (this.body.remove().constructor)(filteredOptions);
    //         if (this.footer) {
    //             this.footer = new (this.footer.remove().constructor)(filteredOptions);
    //         }
    //         this.render();
    //     });
    // };

    Backbone.MozuBackGrid.Body.prototype.initialize = function (options) {
            this.columns = options.columns;
            if (!(this.columns instanceof Backbone.Collection)) {
                this.columns = new Backgrid.Columns(this.columns);
            }

        this.row = options.row || this.row || Backgrid.Row;
            if (this.collection.map) {
                this.rows = this.collection.map(function (model) {
                    var row = new this.row({
                        columns: this.columns,
                        model: model
                    });

                    return row;
                }, this);
            } else {
                this.rows = this.collection.get('items').map(function (model) {
                    var row = new this.row({
                        columns: this.columns,
                        model: model
                    });

                    return row;
                }, this);
            }
            

            this.emptyText = options.emptyText;
            this._unshiftEmptyRowMayBe();

            var collection = this.collection;
            this.listenTo(collection, "add", this.insertRow);
            this.listenTo(collection, "remove", this.removeRow);
            this.listenTo(collection, "sort", this.refresh);
            this.listenTo(collection, "reset", this.refresh);
            this.listenTo(collection, "backgrid:sort", this.sort);
            this.listenTo(collection, "backgrid:edited", this.moveToNextCell);

            this.listenTo(this.columns, "add remove", this.updateEmptyRow);
        }



    return Backbone;
});
