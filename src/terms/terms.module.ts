import { Module } from '@nestjs/common'
import { TermsService } from './terms.service'
import { TermsResolver } from './terms.resolver'
import { DateScalar } from '../common/scalars/date.scalar'

@Module({
  providers: [TermsResolver, TermsService, DateScalar],
})
export class TermsModule {}
