import Model, {attr, belongsTo} from '@ember-data/model';

export default class InstructionModel extends Model {
    @attr('json-list') step;
    @belongsTo('recipe') recipe;
}
