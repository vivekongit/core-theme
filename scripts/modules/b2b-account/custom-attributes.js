define(["modules/jquery-mozu", 'modules/api', "underscore", "hyprlive", "modules/backbone-mozu", "hyprlivecontext", "modules/models-customer"], function ($, api, _, Hypr, Backbone, HyprLiveContext, CustomerModels) {

    var AccountAttributeDefs = Backbone.MozuModel.extend({
        mozuType: 'accountattributedefinitions'
    });

    var AttributesView = Backbone.MozuView.extend({
        templateName: "modules/b2b-account/custom-attributes",
        initialize: function () {
          var b2bAttributeDefs = new AccountAttributeDefs({});
          // TODO: there's gonna be some other way to get these.
          var b2bAttributes = self.model.get('attributes');
          // may not be necessary?
          var values = _.reduce(b2bAttributes, function (a, b) {
              a[b.fullyQualifiedName] = {
                  values: b.values,
                  attributeDefinitionId: b.attributeDefinitionId
              };
              return a;
          }, {});

          return b2bAttributeDefs.apiGet().then(function(defs){
              // Do some logic here to associate the definitions and attributes
              _.each(defs.data.items, function (def) {
                  var fqn = def.attributeFQN;

                  if (values[fqn]) {
                      def.values = values[fqn].values;
                      def.attributeDefinitionId = values[fqn].attributeDefinitionId;
                  }
              });
              // sort attributes, putting checkboxes first
              defs.data.items.sort(function (a, b) {
                  if (a.inputType === 'YesNo') return -1;
                  else if (b.inputType === 'YesNo') return 1;
                  else return 0;
              });
              // write fully-hydrated attributes to the model
              self.model.set('b2bAttributes', defs.data.items);
              self.trigger('sync');
              // Apply to the model
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
        },

        finishEdit: function () {
            var self = this;
            self.model.apiUpdate();
        }
    });

    return {
        'AttributesView': AttributesView
    };
});
