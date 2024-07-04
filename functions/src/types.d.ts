// User types
export type CreateUser = {
  email: string;
}

export interface User extends CreateUser {
  id: string;
}

export type TokenResponse = {
  token: string;
}

export type UserGetParams = {
  email: string;
}

// Task types
export type CreateTask = {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  userID: string;
}

export interface Task extends CreateTask {
  id: string;
}

export type UpdateTask = {
  title?: string;
  description?: string;
  completed?: boolean;
}

export type Payload = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
