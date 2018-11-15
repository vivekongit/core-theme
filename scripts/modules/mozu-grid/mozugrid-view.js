define(["modules/jquery-mozu", "underscore", "modules/backbone-mozu", "modules/views-paging"], function ($, _, Backbone, PagingViews) {

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
        registerRowActions: function(){
            var self = this;
            var rowActions = this.model.get('rowActions');
            _.each(rowActions, function(action){
                self[action.action] = function(e){
                    var rowNumber = $(e.target).parents('.mz-grid-row').data('mzRowIndex');
                    var row = self.model.get('items').at(rowNumber-1);
                    self.model[action.action](e, row);
                };
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
            self.registerRowActions();
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
            };

            _.invoke(views, 'render');
        }
    });
    return mozuGridView;
});