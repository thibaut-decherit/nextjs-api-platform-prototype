export type UserFormApiErrors = {
  company: string[],
  email: string[],
  firstName: string[],
  lastName: string[]
}

export type UserFormUser = {
  email: string;
  firstName: string;
  lastName: string;
  [key: string]: unknown;
};

export type UserListUser = {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastModifiedAt: string;
  lastName: string;
  [key: string]: unknown;
};

