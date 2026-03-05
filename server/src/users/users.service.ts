import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq } from 'drizzle-orm';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.database
      .insert(schema.users)
      .values({ ...createUserDto, password: hashedPassword })
      .returning();
    return user[0];
  }

  async findAll() {
    return this.database.select().from(schema.users);
  }

  async findById(id: string) {
    const user = await this.database
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
    return user[0];
  }

  async findByEmail(email: string) {
    const user = await this.database
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
    return user[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUserDto = updateUserDto.password
      ? {
          ...updateUserDto,
          password: await bcrypt.hash(updateUserDto.password, 10),
        }
      : updateUserDto;
    const updatedUser = await this.database
      .update(schema.users)
      .set(updatedUserDto)
      .where(eq(schema.users.id, id))
      .returning();
    return updatedUser[0];
  }

  async remove(id: string) {
    await this.database.delete(schema.users).where(eq(schema.users.id, id));
  }
}
