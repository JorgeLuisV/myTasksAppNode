export interface CreateUser {
    email: string;
  }

export interface User extends CreateUser {
    id: string;
  }

export interface CreateTask {
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    userID: string;
  }

export interface UpdateTask {
    title?: string;
    description?: string;
    completed?: boolean;
  }

export interface Payload {
    sub: string;
    name: string;
    iat: number;
    exp: number;
  }

  interface FirebaseTimestamp {
    _seconds: number;
    _nanoseconds: number;
  }
