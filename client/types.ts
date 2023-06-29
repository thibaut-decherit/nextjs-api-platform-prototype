export type ApiPlatformConstraintViolation = {
  code: string;
  message: string;
  propertyPath: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type FormErrors = {
  [key: string]: string[]
};
