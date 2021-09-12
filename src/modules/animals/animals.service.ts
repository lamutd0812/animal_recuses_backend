import { PaginationQueryDto } from './../../common/dto/pagination-query-dto';
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

  async searchAnimals(query: PaginationQueryDto): Promise<CommonResponseDto> {
    const animals = await this.animalRepository.searchAnimals(query);
    return new CommonResponseDto(true, animals, 'Search animals successfully.');
  }

  async addAnimal(
    addAnimalDto: AddAnimalDto,
    filename: string,
    idUser: number,
  ): Promise<CommonResponseDto> {
    const newAnimal = await this.animalRepository.addAnimal(
      addAnimalDto,
      filename,
      idUser,
    );

    return new CommonResponseDto(
      true,
      newAnimal,
      'Add new animal successfully.',
    );
  }
}
