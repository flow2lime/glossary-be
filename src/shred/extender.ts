import { Type } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

export abstract class BaseService<Entity> {
  constructor(
    protected readonly entity,
    public prisma?: PrismaService,
    public entityClass?: Type<Entity>,
  ) {}
}
