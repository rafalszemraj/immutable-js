///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/Immutable.d.ts'/>

jest.autoMockOff();

import jasmineCheck = require('jasmine-check');
jasmineCheck.install();

import I = require('immutable');
import Sequence = I.Sequence;
import Vector = I.Vector;

describe('splice', () => {

  it('splices a sequence only removing elements', () => {
    expect(Sequence(1,2,3).splice(0,1).toArray()).toEqual([2,3]);
    expect(Sequence(1,2,3).splice(1,1).toArray()).toEqual([1,3]);
    expect(Sequence(1,2,3).splice(2,1).toArray()).toEqual([1,2]);
    expect(Sequence(1,2,3).splice(3,1).toArray()).toEqual([1,2,3]);
  })

  it('splices a vector only removing elements', () => {
    expect(Vector(1,2,3).splice(0,1).toArray()).toEqual([2,3]);
    expect(Vector(1,2,3).splice(1,1).toArray()).toEqual([1,3]);
    expect(Vector(1,2,3).splice(2,1).toArray()).toEqual([1,2]);
    expect(Vector(1,2,3).splice(3,1).toArray()).toEqual([1,2,3]);
  })

  check.it('has the same behavior as array splice',
           [gen.array(gen.int), gen.array(gen.oneOf([gen.int, gen.undefined]))],
           (values, args) => {
    var v = Vector.from(values);
    var a = values.slice(); // clone
    var splicedV = v.splice.apply(v, args); // persistent
    a.splice.apply(a, args); // mutative
    expect(splicedV.toArray()).toEqual(a);
  })

})
