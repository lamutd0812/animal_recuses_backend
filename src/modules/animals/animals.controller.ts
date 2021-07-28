import { User } from './../users/user.entity';
import { CommonResponseDto } from './../../common/dto/common-response.dto';
import { AnimalsService } from './animals.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddAnimalDto } from './dto/add-animal.dto';
import { ReqUser } from 'src/common/decorators/req-user.decorator';
import { Authorization, Roles } from 'src/common/decorators/auth.decorator';
import { ERole } from 'src/config/constants';

@Controller('animals')
@ApiTags('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Get()
  @ApiOperation({ summary: 'Search animals' })
  @ApiOkResponse({ type: CommonResponseDto })
  searchAnimals(): Promise<CommonResponseDto> {
    return this.animalsService.searchAnimals();
  }

  @Post()
  @Authorization()
  @Roles(ERole.ADMIN)
  @ApiOperation({ summary: 'Add new animal' })
  @ApiOkResponse({ type: CommonResponseDto })
  addAnimal(
    @Body() addAnimalDto: AddAnimalDto,
    @ReqUser() user: User,
  ): Promise<CommonResponseDto> {
    const { id_user: idUser } = user;
    return this.animalsService.addAnimal(addAnimalDto, idUser);
  }
}
