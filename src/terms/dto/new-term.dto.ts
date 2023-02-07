import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, MaxLength } from 'class-validator'

@InputType()
export class NewTermDto {
  @Field()
  @MaxLength(100)
  name: string

  @Field({ nullable: true })
  @IsOptional()
  description: string
}
