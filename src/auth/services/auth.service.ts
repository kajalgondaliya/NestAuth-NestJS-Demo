import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AccountWasDeletedError } from '../errors';
import { AuthenticatedUser } from '../interfaces';
import { LoginAuditService } from './login-audit.service';
import { SignupDTO, LoginDTO } from '../dtos';
import { UsersService, User, AccountStates } from '../../users';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly loginAuditService: LoginAuditService,
  ) {}

  public async signUp(signupDTO: SignupDTO): Promise<AuthenticatedUser> {

    const user = await this.usersService.createUser(signupDTO);
    return {
      id: user.id,
      email: user.email,
      name: user.name,    
      accessToken: sign(user.id.toString(), "test"),
    };
  }

  public async logIn(loginDTO: LoginDTO): Promise<AuthenticatedUser> {
    const user = await this.usersService.findByEmailAndPassword(loginDTO);

    const canLogIn =
      user.accountState === AccountStates.ACTIVE ||
      user.accountState === AccountStates.INACTIVE;

    if (canLogIn) {
      return await this._proceedWithLogIn(user);
    } else if (user.accountState === AccountStates.DELETED) {
      throw new AccountWasDeletedError();
    }
  }

  private async _proceedWithLogIn(user: User): Promise<AuthenticatedUser> {
    await this.loginAuditService.recordLogin(user.id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken: sign(user.id.toString(),"test"),
    };
  }
}
