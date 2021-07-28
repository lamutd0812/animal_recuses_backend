import { AddAnimalDto } from './dto/add-animal.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Animal } from './animal.entity';

@EntityRepository(Animal)
export class AnimalRepository extends Repository<Animal> {
  async searchAnimals(): Promise<Animal[]> {
    const query = this.createQueryBuilder('animals');

    const animals = await query.getMany();
    return animals;
  }

  async addAnimal(addAnimalDto: AddAnimalDto, idUser: number): Promise<Animal> {
    const { name, hairColor, age, image, description } = addAnimalDto;

    const animal = new Animal();
    animal.name = name;
    animal.hair_color = hairColor;
    animal.age = age;
    animal.image = image || null;
    animal.description = description || null;
    animal.id_user = idUser;

    await animal.save();

    return animal;
  }
}
