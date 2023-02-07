import { Inject } from '@nestjs/common'
import { PRISMA_LOG_LEVEL } from './prisma.constant'

export function InjectPrismaLogLevel() {
  return Inject(PRISMA_LOG_LEVEL)
}
