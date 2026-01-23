const { createPatientCommand, updatePatientCommand, deletePatientCommand } = require('../src/cqrs/patientCommands');
const Patient = require('../src/models/Patient');
const sequelize = require('../src/config/db');
const { invalidateCache } = require('../src/cqrs/patientQueries');

// Mock dependencies
jest.mock('../src/models/Patient');
jest.mock('../src/config/db', () => {
  const mSequelize = {
    transaction: jest.fn(),
    define: jest.fn().mockReturnValue({
      // Mock model methods that might be called if the real file is executed
      create: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };
  return mSequelize;
});
jest.mock('../src/cqrs/patientQueries', () => ({
  invalidateCache: jest.fn()
}));

describe('Patient Commands', () => {
  let mockTransaction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn()
    };
    sequelize.transaction.mockResolvedValue(mockTransaction);
  });

  describe('createPatientCommand', () => {
    it('should create a patient and invalidate cache', async () => {
      const patientData = { patient_name: 'John Doe' };
      const createdPatient = { ...patientData, id: 1 };
      
      Patient.create.mockResolvedValue(createdPatient);

      const result = await createPatientCommand(patientData);

      expect(sequelize.transaction).toHaveBeenCalled();
      expect(Patient.create).toHaveBeenCalledWith(patientData, { transaction: mockTransaction });
      expect(mockTransaction.commit).toHaveBeenCalled();
      expect(invalidateCache).toHaveBeenCalled();
      expect(result).toEqual(createdPatient);
    });

    it('should rollback transaction on error', async () => {
      const patientData = { patient_name: 'John Doe' };
      const error = new Error('Database error');
      
      Patient.create.mockRejectedValue(error);

      await expect(createPatientCommand(patientData)).rejects.toThrow('Database error');

      expect(sequelize.transaction).toHaveBeenCalled();
      expect(mockTransaction.rollback).toHaveBeenCalled();
      expect(mockTransaction.commit).not.toHaveBeenCalled();
    });
  });

  describe('updatePatientCommand', () => {
    it('should update a patient and invalidate cache if found', async () => {
      const id = 1;
      const patientData = { patient_name: 'Jane Doe' };
      const updatedPatient = { id, ...patientData };

      Patient.update.mockResolvedValue([1]); // 1 row updated
      Patient.findByPk.mockResolvedValue(updatedPatient);

      const result = await updatePatientCommand(id, patientData);

      expect(Patient.update).toHaveBeenCalledWith(patientData, { where: { id } });
      expect(Patient.findByPk).toHaveBeenCalledWith(id);
      expect(invalidateCache).toHaveBeenCalled();
      expect(result).toEqual(updatedPatient);
    });

    it('should return null if patient not found', async () => {
      const id = 999;
      const patientData = { patient_name: 'Jane Doe' };

      Patient.update.mockResolvedValue([0]); // 0 rows updated

      const result = await updatePatientCommand(id, patientData);

      expect(Patient.update).toHaveBeenCalledWith(patientData, { where: { id } });
      expect(invalidateCache).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('deletePatientCommand', () => {
    it('should delete a patient and invalidate cache if found', async () => {
      const id = 1;

      Patient.destroy.mockResolvedValue(1); // 1 row deleted

      const result = await deletePatientCommand(id);

      expect(Patient.destroy).toHaveBeenCalledWith({ where: { id } });
      expect(invalidateCache).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false if patient not found', async () => {
      const id = 999;

      Patient.destroy.mockResolvedValue(0); // 0 rows deleted

      const result = await deletePatientCommand(id);

      expect(Patient.destroy).toHaveBeenCalledWith({ where: { id } });
      expect(invalidateCache).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
