import * as mongoose from 'mongoose';

export const MachineSchema = new mongoose.Schema({
  patente: { type: String, required: true, unique: true },
  area: { type: String, enum: ['Administracion', 'Transporte', 'Reparto'], required: true },

});

