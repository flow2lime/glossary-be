import { DynamicModule, Global, Module, ValueProvider } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from './prisma.service'
import { PRISMA_LOG_LEVEL } from './prisma.constant'

const defaultPrismaLogLevel: Array<Prisma.LogLevel> = [
  'query',
  'info',
  'warn',
  'error',
]

export type PrismaModuleConfig = {
  logLevel?: Prisma.LogLevel[]
}

@Global()
@Module({})
export class PrismaModule {
  static forRoot(config?: PrismaModuleConfig): DynamicModule {
    return {
      module: PrismaModule,
      providers: [
        PrismaService,
        {
          provide: PRISMA_LOG_LEVEL,
          useValue: config?.logLevel || defaultPrismaLogLevel,
        } as ValueProvider<Prisma.LogLevel[]>,
      ],
      exports: [PrismaService],
      global: true,
    }
  }
}
