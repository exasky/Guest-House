export class UserModel {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;

  role: UserRoleModel;
}

export type UserRoleModel = 'ADMIN' | 'USER';
