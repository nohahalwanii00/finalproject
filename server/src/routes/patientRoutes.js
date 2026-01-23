const express = require('express');
const router = express.Router();
const { getAllPatients, createPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - patient_name
 *         - doctor_name
 *         - date
 *         - time
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the patient
 *         patient_name:
 *           type: string
 *           description: Name of the patient
 *         doctor_name:
 *           type: string
 *           description: Assigned doctor
 *         date:
 *           type: string
 *           format: date
 *           description: Appointment date (YYYY-MM-DD)
 *         time:
 *           type: string
 *           description: Appointment time (HH:MM:SS)
 *         status:
 *           type: string
 *           enum: [Pending, Completed, Cancelled]
 *           description: Status of the appointment
 *       example:
 *         patient_name: John Doe
 *         doctor_name: Dr. Smith
 *         date: 2026-01-25
 *         time: 14:30:00
 *         status: Pending
 */

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management API
 */

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Returns the list of all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: The list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */
router.get('/', getAllPatients);

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient appointment
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: The patient was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Bad request
 */
router.post('/', createPatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Update a patient appointment
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: The patient was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Patient not found
 */
router.put('/:id', roleMiddleware(['admin', 'user']), updatePatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete a patient appointment
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The patient id
 *     responses:
 *       200:
 *         description: The patient was deleted
 *       404:
 *         description: The patient was not found
 */
router.delete('/:id', roleMiddleware(['admin', 'user']), deletePatient);

module.exports = router;