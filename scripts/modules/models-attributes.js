define(["underscore", "modules/backbone-mozu"], function (_, Backbone) {

    var customerAttritube = Backbone.MozuModel.extend({
        mozuType: 'customerattribute',
    });

    var customerAttritubes = Backbone.MozuModel.extend({
        mozuType: 'customerattributes',
        relations: {
            items: Backbone.Collection.extend({
                model: attritube
            })
        }
    });

    var b2bAccountAttritube = Backbone.MozuModel.extend({
        mozuType: 'accountattribute',
    });

    var b2bAccountAttritubes = Backbone.MozuModel.extend({
        mozuType: 'accountattributes',
        relations: {
            items: Backbone.Collection.extend({
                model: b2bAccountAttritube
            })
        }
    });

    var customerAttributeDefinition = Backbone.MozuModel.extend({
        mozuType: 'attributedefinition',
    }); 

    var b2bAccountAttributeDefinition = Backbone.MozuModel.extend({
        mozuType: 'accountattributedefinition',
    }); 

    return {
        'customerAttritube': customerAttritube,
        'customerAttritubes': customerAttritubes,
        'b2bAccountAttritube': b2bAccountAttritube,
        'b2bAccountAttritubes': b2bAccountAttritubes,
        'customerAttributeDefinition': customerAttributeDefinition,
        'customerAttributeDefinitions': customerAttributeDefinitions,
        'b2bAccountAttributeDefinition': b2bAccountAttributeDefinition,
        'b2bAccountAttributeDefinitions': b2bAccountAttributeDefinitions
    };
});
