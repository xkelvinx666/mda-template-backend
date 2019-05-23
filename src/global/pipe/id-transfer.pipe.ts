import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { GlobalEntity } from '../global.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IdTransferPipe<GlobalEntityType extends GlobalEntity>
  implements PipeTransform<number, Promise<GlobalEntityType>> {
  constructor(protected entityRepository: Repository<GlobalEntityType>) {}

  async transform(
    id: number,
    metadata: ArgumentMetadata,
  ): Promise<GlobalEntityType> {
    return await this.entityRepository.findOneOrFail(id);
  }
}
