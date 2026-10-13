export interface IAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressInput {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressesResponse {
  results?: number;
  status: string;
  message?: string;
  data: IAddress[];
}

export interface SingleAddressResponse {
  status: string;
  message?: string;
  data: IAddress | null;
}

export interface AddressMutationResponse {
  status: string;
  message: string;
  data: IAddress[];
}
