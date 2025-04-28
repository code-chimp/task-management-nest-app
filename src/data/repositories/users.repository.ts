import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { POSTGRES_CONFLICT_ERROR } from '../../constants';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';
import { UserEntity } from '../dao/user.entity';

/**
 * Repository for managing UserEntity persistence and registration logic.
 * Handles user creation with password hashing and unique username enforcement.
 */
@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  /**
   * Create a new user with a hashed password.
   * Throws ConflictException if the username already exists.
   * @param dto - User credentials
   */
  async createUser({ username, password }: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (e: unknown) {
      // console.error(e);
      if (
        e instanceof QueryFailedError &&
        (e as { code?: string }).code === POSTGRES_CONFLICT_ERROR
      ) {
        throw new ConflictException('Username already exists');
      }
      console.error(e);
      throw new InternalServerErrorException();
    }
    return;
  }
}
