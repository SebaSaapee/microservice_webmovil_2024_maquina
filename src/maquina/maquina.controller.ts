import { MaquinaService } from './maquina.service';
import { MachineDTO } from './dto/maquina.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MaquinaMsg } from 'src/common/constants';

@Controller()
export class MaquinaController {
  constructor(private readonly maquinaService: MaquinaService) {}

  @MessagePattern(MaquinaMsg.CREATE)
  async create(@Payload() machineDTO: MachineDTO) {
    try {
      return await this.maquinaService.create(machineDTO);
    } catch (error) {
      console.error(`Error creating machine: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern(MaquinaMsg.FIND_ALL)
  async findAll() {
    try {
      return await this.maquinaService.findAll();
    } catch (error) {
      console.error(`Error fetching all machines: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern(MaquinaMsg.FIND_ONE)
  async findOne(@Payload() id: string) {
    try {
      return await this.maquinaService.findOne(id);
    } catch (error) {
      console.error(`Error fetching machine with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern(MaquinaMsg.UPDATE)
  async update(@Payload() payload: { id: string; machineDTO: MachineDTO }) {
    const { id, machineDTO } = payload;
    try {
      return await this.maquinaService.update(id, machineDTO);
    } catch (error) {
      console.error(`Error updating machine with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern(MaquinaMsg.DELETE)
  async delete(@Payload() id: string) {
    try {
      return await this.maquinaService.delete(id);
    } catch (error) {
      console.error(`Error deleting machine with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern(MaquinaMsg.FIND_BY_AREA)
  async findByArea(@Payload() area: string) {
    try {
      return await this.maquinaService.findByArea(area);
    } catch (error) {
      console.error(`Error fetching machines for area ${area}: ${error.message}`);
      throw error;
    }
  }
}