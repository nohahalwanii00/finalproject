const Patient = require('../models/Patient');
const cache = require('../utils/cache');

exports.getAllPatientsQuery = async () => {
  const cacheKey = 'allPatients';
  const cachedPatients = cache.get(cacheKey);
  if (cachedPatients) {
    console.log('⚡ Cache HIT: Returning data from memory');
    return cachedPatients;
  }

  console.log('🐢 Cache MISS: Fetching from Database...');
  // Simulating delay
  await new Promise(resolve => setTimeout(resolve, 800)); 
  const patients = await Patient.findAll();
  
  cache.set(cacheKey, patients);
  return patients;
};

exports.invalidateCache = () => {
  console.log('🗑️ Cache INVALIDATED: Cleared allPatients');
  cache.del('allPatients');
};
