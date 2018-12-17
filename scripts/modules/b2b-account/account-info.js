define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext"], function ($, api, _, Hypr, Backbone, HyprLiveContext) {

    var InfoView = Backbone.MozuView.extend({
        templateName: "modules/b2b-account/account-info",
        autoUpdate: [
            'firstName',
            'lastName',
            'emailAddress',
            'acceptsMarketing'
        ],
        // initialize: function () {
        //     Backbone.MozuView.prototype.initialize.apply(this, arguments);
        //     // return this.model.getAttributes().then(function (customer) {
        //     //     customer.get('attributes').each(function (attribute) {
        //     //         attribute.set('attributeDefinitionId', attribute.get('id'));
        //     //     });
        //     //     return customer;
        //     // });
        // },
        updateAttribute: function (e) {
            var self = this;
            var attributeFQN = e.currentTarget.getAttribute('data-mz-attribute');
            var attribute = this.model.get('attributes').findWhere({
                attributeFQN: attributeFQN
            });
            var nextValue = attribute.get('inputType') === 'YesNo' ? $(e.currentTarget).prop('checked') : $(e.currentTarget).val();

            attribute.set('values', [nextValue]);
            attribute.validate('values', {
                valid: function (view, attr, error) {
                    self.$('[data-mz-attribute="' + attributeFQN + '"]').removeClass('is-invalid')
                        .next('[data-mz-validationmessage-for="' + attr + '"]').text('');
                },
                invalid: function (view, attr, error) {
                    self.$('[data-mz-attribute="' + attributeFQN + '"]').addClass('is-invalid')
                        .next('[data-mz-validationmessage-for="' + attr + '"]').text(error);
                }
            });
        },
       
        finishEdit: function () {
            var self = this;
            self.model.apiUpdate();
        }
    });

    return {
        'InfoView': InfoView
    }
});
