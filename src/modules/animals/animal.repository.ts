import { getFileUrl } from './../../common/tools/files-upload.tools';
import { PaginationQueryDto } from './../../common/dto/pagination-query-dto';
import { AddAnimalDto } from './dto/add-animal.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { ESort, EStaticDirectory } from 'src/config/constants';

@EntityRepository(Animal)
export class AnimalRepository extends Repository<Animal> {
  async searchAnimals(queryParams: PaginationQueryDto): Promise<Animal[]> {
    const { search, page, limit, orderBy, sort } = queryParams;
    const query = this.createQueryBuilder('animals');

    if (search) {
      query.andWhere('animals.name ILIKE :search', { search: `${search}%` });
    }

    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(limit) || 10;
    const offset = (pageNumber - 1) * itemsPerPage;
    query.offset(offset);
    query.limit(itemsPerPage);

    if (orderBy && sort) {
      query.orderBy(orderBy, sort === ESort.ASC ? 'ASC' : 'DESC');
    }

    const animals = await query.getMany();
    return animals;
  }

  async addAnimal(
    addAnimalDto: AddAnimalDto,
    filename: string = null,
    idUser: number,
  ): Promise<Animal> {
    const { name, hairColor, age, description } = addAnimalDto;

    const animal = new Animal();
    animal.name = name;
    animal.hair_color = hairColor;
    animal.age = age;
    animal.image = filename
      ? getFileUrl(EStaticDirectory.IMAGES, filename)
      : null;
    animal.description = description || null;
    animal.id_user = idUser;

    await animal.save();

    return animal;
  }
}
