import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { GlobalEntity } from './global.entity';
import { GlobalDto } from './global.dto';
import { GlobalParams } from './global.params';

interface IlistResult {
  data: object;
  total: number;
}

@Controller()
export abstract class CrudController<
  GlobalEntityType extends GlobalEntity,
  GlobalDtoType extends GlobalDto,
  GlobalParamsType extends GlobalParams
> {
  protected constructor(
    protected readonly entityRepository: Repository<GlobalEntityType>,
  ) {}

  @Get()
  async list(@Query() globalDto: GlobalDtoType): Promise<IlistResult> {
    const { skip, take, ...where } = globalDto;
    const [data, total] = await this.entityRepository.findAndCount({
      skip,
      take,
      where,
    });
    return {
      data,
      total,
    };
  }

  @Get(':id')
  async get(@Param() params: GlobalParamsType): Promise<GlobalEntityType> {
    return await this.entityRepository.findOneOrFail(params.id);
  }

  @Post()
  async create(@Body() globalDto: GlobalDtoType): Promise<GlobalEntityType> {
    // @ts-ignore
    return await this.entityRepository.save(globalDto);
  }

  @Put(':id')
  async update(
    @Param() params: GlobalParamsType,
    @Body() globalDto: GlobalDtoType,
  ): Promise<GlobalEntityType> {
    const entity = await this.entityRepository.findOneOrFail(params.id);
    return await this.entityRepository.save(
      // @ts-ignore
      Object.assign(entity, globalDto),
    );
  }

  @Delete(':id')
  async delete(@Param() params: GlobalParamsType): Promise<GlobalEntityType> {
    const property = await this.entityRepository.findOneOrFail(params.id);
    return await this.entityRepository.remove(property);
  }
}
