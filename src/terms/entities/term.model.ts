import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'terminology' })
export class Terminology {
  @Field(() => ID)
  id: number

  // @Directive('@upper')
  @Field()
  name: string

  @Field()
  description: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}