const Patient = require('../models/Patient');
const sequelize = require('../config/db');
const { invalidateCache } = require('./patientQueries');

exports.createPatientCommand = async (patientData) => {
  const t = await sequelize.transaction();
  try {
    const patient = await Patient.create(patientData, { transaction: t });
    await t.commit();
    invalidateCache();
    return patient;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

exports.updatePatientCommand = async (id, patientData) => {
  const t = await sequelize.transaction();
  try {
    const [updated] = await Patient.update(patientData, { where: { id }, transaction: t });
    
    if (!updated) {
      await t.rollback();
      return null;
    }
    
    const updatedPatient = await Patient.findByPk(id, { transaction: t });
    await t.commit();
    
    invalidateCache();
    return updatedPatient;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

exports.deletePatientCommand = async (id) => {
  const t = await sequelize.transaction();
  try {
    const deleted = await Patient.destroy({ where: { id }, transaction: t });
    
    if (!deleted) {
      await t.rollback();
      return false;
    }
    
    await t.commit();
    invalidateCache();
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
