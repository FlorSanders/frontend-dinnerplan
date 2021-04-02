import Model, {attr, belongsTo} from '@ember-data/model';

export default class InstructionModel extends Model {
    @attr('string') step;
    @belongsTo('recipe') recipe;
}
