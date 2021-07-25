import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOwnerInput {

  @Field(type => String, {description: "name of owner whos have a pet"})
  name: string;
}
