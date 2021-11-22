import { Exclude } from 'class-transformer';

export class User {
  id: number;
  username: string;

  @Exclude({ toPlainOnly: true })
  password?: string;
}
