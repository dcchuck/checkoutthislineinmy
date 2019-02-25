import * as crypto from 'crypto';

interface IIndexedObject {
  [index: string]: string | undefined;
}

export function concatAllValues(toConcat: IIndexedObject) {
  function reducer (accumulator: string, objectKeyName: string) {
    const value = toConcat[objectKeyName];
    return `${accumulator}${typeof value !== "undefined" ? value : ""}`;
  }

  const sortedKeys = Object.keys(toConcat).sort();

  return sortedKeys.reduce(reducer, "");
}

function digestName(objectMessage: IIndexedObject) {
  const concatenatedValues = concatAllValues(objectMessage);
  const secret = "ham and beans.";
  // We are using this to just create names so the secret is mine!
  // [  ] Keep it Secret
  // [  ] Keep it Safe
  // [ x] Ham and beans
  return crypto.createHmac('sha256', secret)
    .update(concatenatedValues)
    .digest('hex');
}

export default digestName;
