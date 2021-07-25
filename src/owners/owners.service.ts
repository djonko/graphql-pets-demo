import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {

  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>)
  {}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner: Owner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
  }

  findAll(): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneOrFail(id);
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    const updatedOwner = this.ownersRepository.create(updateOwnerInput);
    await  this.ownersRepository.update(updatedOwner.id, updatedOwner);
    return await this.ownersRepository.findOneOrFail(updatedOwner.id)
  }

  remove(id: number) {
    return this.ownersRepository.delete(id);
  }
}
