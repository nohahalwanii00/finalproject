const { getAllPatientsQuery } = require('../cqrs/patientQueries');
const { createPatientCommand, updatePatientCommand, deletePatientCommand } = require('../cqrs/patientCommands');
const AppError = require('../utils/AppError');

exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await getAllPatientsQuery();
    res.json(patients);
  } catch (error) {
    next(error);
  }
};

exports.createPatient = async (req, res, next) => {
  try {
    console.log('--- Creating New Patient (CQRS) ---');
    console.log('Data Received:', req.body);
    
    const patient = await createPatientCommand(req.body);
    
    console.log('Patient Created Successfully:', patient.toJSON());
    res.status(201).json(patient);
  } catch (error) {
    console.log('Error Creating Patient:', error.message);
    next(new AppError(error.message, 400));
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPatient = await updatePatientCommand(id, req.body);
    
    if (!updatedPatient) {
      return next(new AppError('Patient not found', 404));
    }
    
    res.json(updatedPatient);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deletePatientCommand(id);
    
    if (!deleted) {
      return next(new AppError('Patient not found', 404));
    }
    
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    next(error);
  }
};