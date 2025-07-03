import {inject, Injectable, signal} from '@angular/core';
import {Client} from '../interfaces/client';
import {GenericService} from '../../../shared/services/generic.service';

@Injectable({
  providedIn: 'root'
})
export class StateClientService {
  private service = inject(GenericService);
  private readonly _selectedClient = signal<Client | null>(null);

  readonly selectedClient = this._selectedClient.asReadonly();

  selectClient(client: Client) {
    const clientWithDate = {
      ...client,
      birthDate: new Date(client.birthDate)
    };
    this._selectedClient.set(clientWithDate);
  }

  clearClient() {
    this._selectedClient.set(null);
  }

  fallBack(id: string){
    this.service.findById<Client[]>('/clients', id).subscribe(resp => {
      this.selectClient(resp[0]);
    })
  }

}
