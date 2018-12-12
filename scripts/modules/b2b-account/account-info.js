define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext"], function ($, api, _, Hypr, Backbone, HyprLiveContext) {

    var InfoView = Backbone.MozuView.extend({
        templateName: "modules/b2b-account/account-info",
        initialize: function () {
            Backbone.MozuView.prototype.initialize.apply(this, arguments);
        },
        render: function () {
            var self = this;
            Backbone.MozuView.prototype.render.apply(this, arguments);
           
        }
    });

    return {
        'InfoView': InfoView
    }
});
