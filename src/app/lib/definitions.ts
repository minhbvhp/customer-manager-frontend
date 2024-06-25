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

export type NewCustomer = {
  fullName: string;
  taxCode: string;
  urn: string;
  street: string;
  wardCode: string;
};
