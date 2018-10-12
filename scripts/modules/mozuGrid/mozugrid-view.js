define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", "modules/views-paging"], function ($, api, _, Hypr, Backbone, HyprLiveContext, PagingViews) {

    var mozuGridView = Backbone.MozuView.extend({
        templateName: 'modules/mozugrid/grid',
        initialize: function () {
            var self = this;
            self.model.lastRequest = {
                pageSize: 5,
                startIndex: 0
            };
            self.model.setIndex(0).then(function(data) {
                var asd = data;
                //self.render();
            });
        },
        sort: function (e) {
            e.preventDefault();
            var col = $(e.currentTarget).data('mzColIndex');
            return this.model.sort(col);
        },
        handlePageClick: function(e) {

        },
        handlePageSizeChange: function (e) {

        },
        handleSortClick: function (e) {

        },
        render: function () {
            var self = this;
            Backbone.MozuView.prototype.render.apply(this, arguments);

            var views = {
                mozuGridPagingControls: new PagingViews.PagingControls({
                    el: $('.dataGrid').find('[data-mz-pagingcontrols]'),
                    model: self.model
                }),
                mozuGridPageNumbers: new PagingViews.PageNumbers({
                    el: $('.dataGrid').find('[data-mz-pagenumbers]'),
                    model: self.model
                })
            }

            _.invoke(views, 'render');
        }
    });
    return mozuGridView;
});