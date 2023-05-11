import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users';
import { AuthModule } from './auth';
import { LoginRecord } from './auth'
import { User } from './users'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test',
    entities: [LoginRecord,User],
    synchronize: true,
  }), UsersModule, AuthModule],
})
export class AppModule {}
