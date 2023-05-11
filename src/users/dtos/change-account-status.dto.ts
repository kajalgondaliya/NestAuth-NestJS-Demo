import { IsString } from 'class-validator';

export class ChangeAccountStatusDTO {
  @IsString()
  readonly password: string;
}
