const Patient = require('../models/Patient');

exports.getAllPatients = async (req, res) => {
  try {
    // Simulate delay for loader spinner demo
    await new Promise(resolve => setTimeout(resolve, 800)); 
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Patient.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Patient not found' });
    const updatedPatient = await Patient.findByPk(id);
    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};