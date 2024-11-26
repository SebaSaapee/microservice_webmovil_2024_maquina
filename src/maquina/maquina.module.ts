import { Module } from '@nestjs/common';
import { MaquinaService } from './maquina.service';
import { MachineSchema } from './schema/maquina.schema';
import { MACHINE } from 'src/common/models/models';
import { MongooseModule } from '@nestjs/mongoose';
import { MaquinaController} from './maquina.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: MACHINE.name,
        useFactory: () => MachineSchema,
      },
    ]),
  ],
  controllers: [MaquinaController],
  providers: [MaquinaService],
})
export class MaquineModule {}
