import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { InjectPrismaLogLevel } from './prisma.injector'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(@InjectPrismaLogLevel() logLevel: Prisma.LogLevel[]) {
    super({ errorFormat: 'pretty', log: logLevel })
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      Logger.log('Terminate!')
      await app.close()
    })
  }
}
