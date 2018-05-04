export class Account {

  id?: number;
  version?: number;
  email?: string;
  newEmail?: string;
  password?: string;
  activated?: boolean;
  registeredSince?: string;
  uniqueToken?: string;
  tokenAge?: string;
  lang?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  image?: number;
  role?: string;
  enabled?: boolean;
  operator?: number;

  constructor() { }

}