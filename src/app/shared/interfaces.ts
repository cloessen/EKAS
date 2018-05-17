export interface Kamerad {
  lastName: string;
  firstName: string;
  anwesend: boolean;
  rfid: string;
  id?: string;
  check1?: boolean;
  check2?: boolean;
  funktionen?: {
    GF?: boolean,
    ZF?: boolean,
    CE?: boolean,
    PA?: boolean,
    saw?: boolean,
    gsg?: boolean,
    eva?: boolean,
    log?: boolean,
    RS?: boolean,
    NS?: boolean,
    owf?: boolean,
    gwf?: boolean
  };
}
export interface User {
  uid?: string;
  email: string;
  isAdmin: boolean;
  feuerwehr: string;
}

export class Overview {
  sum  = 0;
  PA   = 0;
  CE   = 0;
  saw  = 0;
  GF   = 0;
  ZF   = 0;
  gsg  = 0;
  eva  = 0;
  log  = 0;
  RS   = 0;
  NS   = 0;
  owf  = 0;
  gwf  = 0;
}
