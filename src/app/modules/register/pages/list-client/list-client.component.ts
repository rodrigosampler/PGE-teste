import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {GenericService} from '../../../../shared/services/generic.service';
import {Subscription} from 'rxjs';
import {Client} from '../../interfaces/client';
import {SharedModule} from '../../../../shared/shared.module';
import {ConstsRegisterRoutes} from '../../constants/ConstRegisterRoutes';
import {Router} from '@angular/router';
import {GenericModalService} from '../../../../shared/components/generic-modal/generic-modal.service';
import {MessagesConstats} from '../../../../shared/constants/messages.constats';
import {StateClientService} from '../../services/state-client.service';
import {LoadingService} from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-list-client',
  imports: [
    SharedModule
  ],
  standalone: true,
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.scss'
})
export class ListClientComponent implements OnInit, OnDestroy{

  service = inject(GenericService);
  router = inject(Router);
  dialogService = inject(GenericModalService);
  stateUser = inject(StateClientService);
  loadingService = inject(LoadingService);
  subs: Subscription[] = [];
  clients: any;
  totalRecords = 0;
  loading = false;

  page = 1;
  rows = 10;
  search = '';

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.loadingService.show();
    this.subs.push(
      this.service.findAllPagination<Client[]>(this.page, this.rows, this.search, '/clients').subscribe({
        next: ({ data, total }) => {
          this.clients = data;
          this.totalRecords = total;
          this.loading = false;
          this.loadingService.hide();
        }})
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s=>s?.unsubscribe && s.unsubscribe());
  }


  onPageChange(event: any) {
    this.page = (event.first / event.rows) + 1;
    this.rows = event.rows;
    this.getClients();
  }

  onSearch() {
    this.page = 1;
    this.getClients();
  }

  editClient(client: Client) {
    this.stateUser.selectClient(client);
    this.router.navigate([`${ConstsRegisterRoutes.MODULE}/${ConstsRegisterRoutes.CLIENT_REGISTER}/${client.id}`]);
  }

  removeClient(client: Client) {
    this.dialogService.openModal({titulo:'Atenção', descricao: MessagesConstats.ALERT_DELETE_ITEM}, ()=>this.deleteClient(client), ()=>{})
  }

  deleteClient(client: Client){
    this.service.delete(client.id, '/clients').subscribe(() => {
      this.getClients();
    });
  }

  navigateTo() {
    this.stateUser.clearClient();
    this.router.navigate([`${ConstsRegisterRoutes.MODULE}/${ConstsRegisterRoutes.CLIENT_REGISTER}`]);
  }
}
