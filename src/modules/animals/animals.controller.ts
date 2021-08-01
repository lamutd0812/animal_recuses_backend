import { FilesUploadTool } from './../../common/tools/files-upload.tools';
import { ApiQueryGetMany } from './../../common/decorators/common-decorators';
import { PaginationQueryDto } from './../../common/dto/pagination-query-dto';
import { User } from './../users/user.entity';
import { CommonResponseDto } from './../../common/dto/common-response.dto';
import { AnimalsService } from './animals.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AddAnimalDto } from './dto/add-animal.dto';
import { ReqUser } from 'src/common/decorators/req-user.decorator';
import { Authorization, Roles } from 'src/common/decorators/auth.decorator';
import { ERole } from 'src/config/constants';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('animals')
@ApiTags('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Get()
  @ApiOperation({ summary: 'Search animals' })
  @ApiQueryGetMany(['name', 'age'])
  @ApiOkResponse({ type: CommonResponseDto })
  searchAnimals(
    @Query() query: PaginationQueryDto,
  ): Promise<CommonResponseDto> {
    return this.animalsService.searchAnimals(query);
  }

  @Post()
  @Authorization()
  @Roles(ERole.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', FilesUploadTool.uploadImages))
  @ApiOperation({ summary: 'Add new animal' })
  @ApiOkResponse({ type: CommonResponseDto })
  addAnimal(
    @UploadedFile() file: Express.Multer.File,
    @Body() addAnimalDto: AddAnimalDto,
    @ReqUser() user: User,
  ): Promise<CommonResponseDto> {
    const { id_user: idUser } = user;
    const { filename } = file;
    return this.animalsService.addAnimal(addAnimalDto, filename, idUser);
  }
}
