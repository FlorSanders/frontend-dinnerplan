import Model, { attr, belongsTo } from '@ember-data/model';

export default class RecipeModel extends Model {
    @attr('string') title;
    @attr('string') description;
    @attr('iso-duration') duration;
    @attr('string') category;
    @attr('string') cuisine;
    @attr('string') ingredient;
    @attr('string') yield;
    @attr('schema-diet') diet;
    @belongsTo('user') creator;
    @belongsTo('instruction') instructions;
}
