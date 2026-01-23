const { getAllPatientsQuery, invalidateCache } = require('../src/cqrs/patientQueries');
const Patient = require('../src/models/Patient');
const NodeCache = require('node-cache');

// Mock dependencies
jest.mock('../src/models/Patient');
jest.mock('node-cache');
jest.mock('../src/config/db', () => {
  return {
    define: jest.fn().mockReturnValue({
      findAll: jest.fn()
    })
  };
});

describe('Patient Queries', () => {
  let mockCache;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCache = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn()
    };
    NodeCache.mockImplementation(() => mockCache);
  });

  // Re-require to get fresh instance of cache if needed, 
  // but since the module is already loaded, we might need to rely on the mock setup.
  // However, NodeCache is instantiated at module level.
  // So we need to ensure the mock is in place before the module is required.
  // We can use jest.isolateModules or just rely on the fact that NodeCache is mocked.
  // But since getAllPatientsQuery uses the `cache` instance created at module scope,
  // we need to make sure that instance is our mock.
  
  // Actually, since `patientQueries.js` instantiates `new NodeCache()`, 
  // and we mocked `node-cache` class, the `cache` variable in `patientQueries.js` 
  // will be an instance of our mock.
  // Wait, `jest.mock` is hoisted, so `require('node-cache')` returns the mock constructor.
  // `new NodeCache()` returns the mock instance.
  // But we need to access that instance to assert on it.
  // `NodeCache.mock.instances[0]` should give us the instance.

  describe('getAllPatientsQuery', () => {
    it('should return cached patients if available', async () => {
      let getAllPatientsQuery;
      
      jest.isolateModules(() => {
        getAllPatientsQuery = require('../src/cqrs/patientQueries').getAllPatientsQuery;
      });

      const cachedPatients = [{ id: 1, name: 'Cached' }];
      mockCache.get.mockReturnValue(cachedPatients);

      const result = await getAllPatientsQuery();

      expect(mockCache.get).toHaveBeenCalledWith('allPatients');
      expect(result).toEqual(cachedPatients);
      // Patient.findAll should not be called
      const Patient = require('../src/models/Patient'); // This is the mocked Patient
      expect(Patient.findAll).not.toHaveBeenCalled();
    });

    it('should fetch from DB and cache if not in cache', async () => {
      let getAllPatientsQuery;
      
      jest.isolateModules(() => {
        getAllPatientsQuery = require('../src/cqrs/patientQueries').getAllPatientsQuery;
      });

      const Patient = require('../src/models/Patient');
      mockCache.get.mockReturnValue(undefined);
      const dbPatients = [{ id: 2, name: 'From DB' }];
      Patient.findAll.mockResolvedValue(dbPatients);

      jest.useFakeTimers();
      const promise = getAllPatientsQuery();
      jest.advanceTimersByTime(800);
      const result = await promise;
      jest.useRealTimers();

      expect(mockCache.get).toHaveBeenCalledWith('allPatients');
      expect(Patient.findAll).toHaveBeenCalled();
      expect(mockCache.set).toHaveBeenCalledWith('allPatients', dbPatients);
      expect(result).toEqual(dbPatients);
    });
  });

  describe('invalidateCache', () => {
    it('should delete allPatients key', () => {
      jest.isolateModules(() => {
        const { invalidateCache } = require('../src/cqrs/patientQueries');
        
        invalidateCache();

        expect(mockCache.del).toHaveBeenCalledWith('allPatients');
      });
    });
  });
});
