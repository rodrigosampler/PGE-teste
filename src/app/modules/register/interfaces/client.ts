export interface Client {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: Date;
  contacts: Contact[];
  country: string;
  state: string
}

export interface Contact {
  number: string;
  type: 'residencial' | 'celular' | 'whatsapp';
}
