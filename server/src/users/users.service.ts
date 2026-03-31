import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq } from 'drizzle-orm';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/common/constants/users.constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      SALT_ROUNDS,
    );
    const user = await this.database
      .insert(schema.users)
      .values({ ...createUserDto, password: hashedPassword })
      .returning();
    return user[0];
  }

  async findAll() {
    return this.database
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        avatar: schema.users.avatar,
        role: schema.users.role,
        createdAt: schema.users.createdAt,
        updatedAt: schema.users.updatedAt,
      })
      .from(schema.users);
  }

  async findMembers(currentUserId: string) {
    return this.database
      .select({
        id: schema.users.id,
        name: schema.users.name,
        avatar: schema.users.avatar,
      })
      .from(schema.users)
      .where(eq(schema.users.id, currentUserId));
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
          password: await bcrypt.hash(updateUserDto.password, SALT_ROUNDS),
        }
      : updateUserDto;
    const updatedUser = await this.database
      .update(schema.users)
      .set(updatedUserDto)
      .where(eq(schema.users.id, id))
      .returning();
    return updatedUser[0];
  }

  async updatePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.findById(id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }
    return this.update(id, { password: newPassword });
  }

  async deleteAccount(id: string, password: string) {
    const user = await this.findById(id);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password is incorrect');
    }
    return this.remove(id);
  }

  async remove(id: string) {
    await this.database.delete(schema.users).where(eq(schema.users.id, id));
  }
}
