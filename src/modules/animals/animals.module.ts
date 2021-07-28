import { AuthModule } from './../auth/auth.module';
import { AnimalRepository } from './animal.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalRepository]), AuthModule],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
