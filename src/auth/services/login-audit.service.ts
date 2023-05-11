import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { LoginRecord } from '../entities';

@Injectable()
export class LoginAuditService {
  constructor(
    @InjectRepository(LoginRecord)
    private readonly loginRecordRepository: Repository<LoginRecord>,
  ) {}

  public async recordLogin(userId: number) {
    const loginEvent = this.loginRecordRepository.create();
    loginEvent.userId = userId;
    loginEvent.timestamp = moment()
      .valueOf()
      .toString();

    await this.loginRecordRepository.save(loginEvent);
  }
}
