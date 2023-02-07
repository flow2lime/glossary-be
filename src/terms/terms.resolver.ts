import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql'
import { TermsService } from './terms.service'
import { Terminology } from './entities/term.model'
import {TermsArgs} from "./dto/terminology.args"
import {Logger, NotFoundException} from "@nestjs/common"
import {NewTermDto} from "./dto/new-term.dto"
import {PubSub} from "graphql-subscriptions"

const pubSub = new PubSub()
@Resolver(() => Terminology)
export class TermsResolver {
  constructor(private readonly termsService: TermsService) {}

 @Query(() => Terminology)
 async term(
   @Args('name') name: string
 ): Promise<Terminology> {
    const result = await this.termsService.findOneByName(name)
   Logger.debug(result, 'findOne result')

   if (!result) throw new NotFoundException(`Not Found: ${name}`)
    return result
 }

  @Query(() => [Terminology])
  terms(
    @Args() recipesArgs: TermsArgs
  ): Promise<Terminology[]> {
    return this.termsService.findAll()
  }

  @Mutation(() => Terminology)
  async addTerm(
    @Args('newTermData') data: NewTermDto,
  ): Promise<Terminology> {
    const term = await this.termsService.create(data)
    // pubSub.publish('termAdded', { termAdded: term })
    return term
  }

  // @Subscription((returns) => Terminology)
  // recipeAdded() {
  //   return pubSub.asyncIterator('termAdded')
  // }
}
