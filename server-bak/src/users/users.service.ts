import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.database.insert(schema.users).values(createUserDto);
  }

  async findAll() {
    return this.database.select().from(schema.users);
  }

  async findById(id: string) {
    return this.database
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
  }

  async findByEmail(email: string) {
    return this.database
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
  }
}
