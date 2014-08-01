Blog.HasManySerializerMixin = Ember.Mixin.extend({
    serializeHasMany: function(record, json, relationship) {
        var key = relationship.key;
        var json_key = key.singularize().decamelize() + '_ids';

        var relationshipType = DS.RelationshipChange.determineRelationshipType(
            record.constructor, relationship);

        if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne') {
            json[json_key] = Ember.get(record, key).mapBy('id');
        }
    }
});