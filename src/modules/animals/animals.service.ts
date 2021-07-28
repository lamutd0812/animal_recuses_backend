import { CommonResponseDto } from './../../common/dto/common-response.dto';
import { AddAnimalDto } from './dto/add-animal.dto';
import { AnimalRepository } from './animal.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(AnimalRepository)
    private animalRepository: AnimalRepository,
  ) {}

  async searchAnimals(): Promise<CommonResponseDto> {
    const animals = await this.animalRepository.searchAnimals();
    return new CommonResponseDto(true, animals, 'Search animals successfully.');
  }

  async addAnimal(
    addAnimalDto: AddAnimalDto,
    idUser: number,
  ): Promise<CommonResponseDto> {
    const newAnimal = await this.animalRepository.addAnimal(
      addAnimalDto,
      idUser,
    );

    return new CommonResponseDto(
      true,
      newAnimal,
      'Add new animal successfully.',
    );
  }
}
