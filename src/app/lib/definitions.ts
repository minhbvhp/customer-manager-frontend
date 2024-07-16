export type Contact = {
  name: string;
  phone: string;
};

export type Customer = {
  id: string;
  fullName: string;
  taxCode: string;
  urn: string;
  street: string;
  contacts: Contact[];
  wardCode: string;
  ward: any;
};

export type CustomerDataType = {
  key: string;
  customerId: string;
  fullName: string;
  taxCode: string;
  urn: string;
  address: string;
  contacts: Contact[];
};

export type NewCustomer = {
  fullName: string;
  taxCode: string;
  urn: string;
  street: string;
  contacts: Contact[];
  wardCode: string;
};

export type UpdateCustomer = {
  fullName: string;
  taxCode: string;
  urn: string;
  street: string;
  contacts: Contact[];
  wardCode: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type UserCredentials = {
  accessToken: string;
  refreshToken: string;
};

export type JwtDecodedPayload = {
  sub: string;
  email: string;
  role: string;
  name: string;
  iat: number;
  exp: number;
};
