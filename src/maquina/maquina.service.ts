import { MachineDTO } from './dto/maquina.dto';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MACHINE } from 'src/common/models/models';
import { IMachine } from 'src/common/interfaces/maquina.interface';

@Injectable()
export class MaquinaService {
  constructor(@InjectModel(MACHINE.name) private readonly model: Model<IMachine>) {}

  // Crear una máquina
  async create(machineDTO: MachineDTO): Promise<IMachine> {
    try {
      const newMachine = new this.model(machineDTO);
      return await newMachine.save();
    } catch (error) {
      throw new Error(`Error creating machine: ${error.message}`);
    }
  }

  // Obtener todas las máquinas
  async findAll(): Promise<IMachine[]> {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(`Error fetching machines: ${error.message}`);
    }
  }

  // Obtener una máquina por ID
  async findOne(id: string): Promise<IMachine> {
    const machine = await this.model.findById(id);
    if (!machine) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }
    return machine;
  }

  // Actualizar una máquina por ID
  async update(id: string, machineDTO: MachineDTO): Promise<IMachine> {
    const updatedMachine = await this.model.findByIdAndUpdate(id, machineDTO, { new: true });
    if (!updatedMachine) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }
    return updatedMachine;
  }

  // Eliminar una máquina por ID
  async delete(id: string) {
    const deletedMachine = await this.model.findByIdAndDelete(id);
    if (!deletedMachine) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }
    return {
      status: HttpStatus.OK,
      msg: 'Machine deleted successfully',
    };
  }

  // Obtener máquinas por área
  async findByArea(area: string): Promise<IMachine[]> {
    try {
      const machines = await this.model.find({ area });
      if (!machines.length) {
        throw new NotFoundException(`No machines found for area ${area}`);
      }
      return machines;
    } catch (error) {
      throw new Error(`Error fetching machines for area ${area}: ${error.message}`);
    }
  }
}
