import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@Resolver(of => Pet)
export class PetsResolver {

    constructor(private petsService: PetsService) { }

    @Query(returns => Pet)
    getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
        return this.petsService.findOne(id);
    }

    @Query(returns => [Pet])
    pets(): Promise<Pet[]> {
        return this.petsService.findAll();
    }

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
        return this.petsService.createPet(createPetInput);
    }

    @ResolveField(() => Owner)
    owner(@Parent() pet: Pet): Promise<Owner> {
        const { ownerId } = pet;
        return this.petsService.getOwner(ownerId)

    }
}
