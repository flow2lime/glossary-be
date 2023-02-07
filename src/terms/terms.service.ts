import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { BaseService } from '../shred/extender'
import { Terminology } from './entities/term.model'
import {NewTermDto} from "./dto/new-term.dto"

@Injectable()
export class TermsService extends BaseService<Terminology> {
  constructor(public readonly prisma: PrismaService) {
    super(prisma.terminology, prisma, Terminology)
  }
  async findAll(): Promise<any> {
    const res = await this.prisma.terminology.findMany()
    return res
  }

  async findOneByName(name: string): Promise<any> {
    return this.prisma.terminology.findUnique({
      where: {
        name,
      }
    })
  }

  async create(data: NewTermDto): Promise<any> {
    return this.prisma.terminology.create({
      data,
    })
  }
}
