export type Customer = {
  id: string;
  fullName: string;
  taxCode: string;
  street: string;
  wardCode: string;
};

export type NewCustomer = {
  fullName: string;
  taxCode: string;
  street: string;
  wardCode: string;
};
