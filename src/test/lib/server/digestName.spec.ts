import digestName, { concatAllValues } from "../../../lib/server/digestName"
import * as assert from 'assert';

describe('digestName', function() {
  it('Takes all the values of a new snippet and creates a unique name', () => {
    const testObject = {
      a: "A",
      b: "B",
      C: "C",
    }

    assert.equal(digestName(testObject), "b187028184982b65f86db17d454eb45c4b0d243331b5189c44f182262e4f8fd5");
  })

})

describe('concatAllValues', function() {
  it('takes an object and returns a concated string containings its values', function() {
    const objectOne = {
      a: "A",
      b: "B",
      c: "C",
    }

    assert.equal(concatAllValues(objectOne), "ABC")
  })

  it('Replaces empty or undefined values with an empty string', function() {
    const oneValueMissing = {
      a: "A",
      b: "",
      c: "C",
    }

    assert.equal(concatAllValues(oneValueMissing), "AC")

    const oneValueUndefined = {
      a: "A",
      b: undefined,
      c: "C",
    }

    assert.equal(concatAllValues(oneValueUndefined), "AC")

    const allValuesMissing = {
      a: "",
      b: "",
      c: "",
    }

    assert.equal(concatAllValues(allValuesMissing), "")
  })

  it('does not care about the order of the keys', function() {
    const objectOne = {
      a: "A",
      b: "B",
      c: "C",
    }

    const objectTwo = {
      b: "B",
      a: "A",
      c: "C",
    }

    assert.equal(concatAllValues(objectOne), concatAllValues(objectTwo))
  })
})
