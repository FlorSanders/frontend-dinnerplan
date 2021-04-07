import Transform from '@ember-data/serializer/transform';
import {parse} from 'iso8601-duration';

export default class IsoDurationTransform extends Transform {
  deserialize(serialized) {
    let duration = parse(serialized);
    return duration;
  }

  serialize(deserialized) {
    let {years, months, days, hours, minutes, seconds} = deserialized;
    let ISO8601 = `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`;
    return ISO8601;
  }
}
