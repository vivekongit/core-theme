define(["modules/backbone-mozu"], function (Backbone) {

    var productPickerView = Backbone.MozuView.extend({
        templateName: 'modules/productPicker/productPicker'
    });
    return productPickerView;
});