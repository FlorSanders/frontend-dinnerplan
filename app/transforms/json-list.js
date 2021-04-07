import Transform from '@ember-data/serializer/transform';

export default class JsonListTransform extends Transform {
  deserialize(serialized) {
    let obj = [serialized]
    if(serialized[0] === '[') {
      obj = JSON.parse(serialized);
    }
    return obj;
  }

  serialize(deserialized) {
    let str = JSON.stringify(deserialized);
    console.log(str);
    return str;
  }
}
