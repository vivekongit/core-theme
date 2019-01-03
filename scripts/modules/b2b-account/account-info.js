define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", 'modules/editable-view', "modules/models-customer"], function ($, api, _, Hypr, Backbone, HyprLiveContext, EditableView, CustomerModels) {
    var InfoView = EditableView.extend({
        templateName: "modules/b2b-account/account-info",
        autoUpdate: [
            'firstName',
            'lastName',
            'emailAddress',
            'acceptsMarketing'
        ],
        initialize: function () {
          return this.model.getAttributes().then(function(customer) {
              customer.get('attributes').each(function(attribute) {
                  attribute.set('attributeDefinitionId', attribute.get('id'));
              });
              return customer;
          });
        },
        startEdit: function(e){
          e.preventDefault();
          this.model.set('editing', true);
          this.render();
        },
        cancelEdit: function() {
            this.model.set('editing', false);
            this.afterEdit();
        },
        finishEdit: function() {
            var self = this;

            this.doModelAction('apiUpdate').then(function() {
                self.model.set('editing', false);
            }).otherwise(function() {
                self.model.set('editing', true);
            }).ensure(function() {
                self.afterEdit();
            });
        },
        afterEdit: function() {
            var self = this;

            self.initialize().ensure(function() {
                self.render();
            });
        },
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
        }
    });

    return {
        'InfoView': InfoView
    };
});
