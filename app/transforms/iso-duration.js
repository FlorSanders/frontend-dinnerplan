import Transform from '@ember-data/serializer/transform';
import {parse, end, toSeconds, pattern} from 'iso8601-duration';

export default class IsoDurationTransform extends Transform {
  deserialize(serialized) {
    let duration = parse(serialized);
    // console.log(`Duration: ${duration.hours} H ${duration.minutes} M`);
    return duration;
  }

  serialize(deserialized) {
    let {years, months, days, hours, minutes, seconds} = deserialized;
    let ISO8601 = `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`;
    console.log(`ISO8601: ${ISO8601}`)
    return ISO8601;
  }
}
