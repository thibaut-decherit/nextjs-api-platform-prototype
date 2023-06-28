export type ApiPlatformConstraintViolation = {
  code: string;
  message: string;
  propertyPath: string;
};

export type Credentials = {
  username: string;
  password: string;
};

export type FormErrors = {
  [key: string]: string[]
};
