import TupleMap from '../index';

describe('TupleMap', () => {
  let cache;
  const obj = {'Carole Granade-Segers': 'Human unicorn'};
  const arr = ['Carole', 'Granade', 'Segers', 'we', 'love', 'you'];
  const fun = function() { return 'president forever'; };
  const res = ['♥'];

  beforeEach(() => {
    cache = new TupleMap();
  });

  describe('#_hash', () => {
    it('should create a hash for any number of args of any type', () => {
      const tuple = [obj, arr, '123', 123, false];
      const expectedHash = ['#0','#1','"123"','123','false'].join('/<[MI_SEP]>/');

      expect(cache._hash( tuple )).toEqual( expectedHash );
      expect(cache._lastTuple).toBe( tuple );
      expect(cache._lastHash).toEqual( expectedHash );
      // repeat that test to get 100% code coverage
      expect(cache._hash( tuple )).toEqual( expectedHash );
    });
  });

  describe('new TupleMap({ limit: 3 })', () => {
    it('should limit the size of the cache and keep Last Result Used', () => {
      cache = new TupleMap({ limit: 3 });

      cache.set([obj], 0);
      cache.set([arr], 1);
      cache.set([fun], 2);

      expect(cache.has([obj])).toEqual(true);
      expect(cache.has([arr])).toEqual(true);
      expect(cache.has([fun])).toEqual(true);

      // refresh the very first key of the map, to make sure it's not evicted
      cache.get([obj]);
      cache.set(['str'], 3);

      expect(cache._cache.size).toEqual(3);

      expect(cache.has([arr])).toEqual(false);
      expect(cache.has([fun])).toEqual(true);
      expect(cache.has([obj])).toEqual(true);
      expect(cache.has(['str'])).toEqual(true);
    });
  });

  describe('#set, #has and then #get', () => {
    it('should work with `({})`', () => {
      cache.set([obj], res);

      expect(cache.has([obj])).toEqual(true);
      expect(cache.has([arr])).toEqual(false);
      expect(cache.get([obj])).toBe(res);
      expect(cache.get([fun])).toEqual(undefined);
    });

    it('should work with ({}, "str")', () => {
      cache.set([obj, 'str'], res);

      expect(cache.has([obj, 'str'])).toEqual(true);
      expect(cache.get([obj, 'str'])).toBe(res);
    });

    it('should work with ({}, "str", arr)', () => {
      cache.set([obj, 'str', arr], res);

      expect(cache.has([obj, 'str', arr])).toEqual(true);
      expect(cache.get([obj, 'str', arr])).toBe(res);

      cache.set([obj, 'str', arr], fun);

      expect(cache.has([obj, 'str', arr])).toEqual(true);
      expect(cache.get([obj, 'str', arr])).toBe(fun);
    });
  });

  describe('.toString', () => {
    it('should return a special identifier', () => {
      expect(cache.toString()).toEqual('[object TupleMap]');
    });
  });
});
