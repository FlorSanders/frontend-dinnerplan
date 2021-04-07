import Transform from '@ember-data/serializer/transform';

const diets = {
  'diabetic': 'http://schema.org/DiabeticDiet',
  'gluten free': 'http://schema.org/GlutenFreeDiet',
  'halal': 'http://schema.org/HalalDiet',
  'hindu': 'http://schema.org/HinduDiet',
  'kosher': 'http://schema.org/KosherDiet',
  'low calorie': 'http://schema.org/LowCalorieDiet',
  'low fat': 'http://schema.org/LowFatDiet',
  'low lactose': 'http://schema.org/LowLactoseDiet',
  'low salt': 'http://schema.org/LowSaltDiet',
  'vegan': 'http://schema.org/VeganDiet',
  'vegetarian': 'http://schema.org/VegetarianDiet',
}

function getKeyForValue(object, value){
  return Object.keys(object).find(key => object[key] === value);
}

export default class SchemaDietTransform extends Transform {
  deserialize(serialized) {
    return getKeyForValue(diets, serialized) || null;
  }

  serialize(deserialized) {
    return diets[deserialized];
  }
}
