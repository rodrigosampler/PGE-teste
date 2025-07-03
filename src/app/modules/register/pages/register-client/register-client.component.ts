import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {SharedModule} from '../../../../shared/shared.module';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenericService} from '../../../../shared/services/generic.service';
import {Estado, IbgeService} from '../../../../shared/services/ibge.service';
import {Subscription} from 'rxjs';
import {TelefonePipe} from '../../../../shared/directives/telefone.directive';
import {futureDateValidator} from '../../../../shared/validators/futureDateValidator';
import {cpfValidator} from '../../../../shared/validators/cpfValidator';
import {emailValidator} from '../../../../shared/validators/emailValidator';
import {MessageService} from 'primeng/api';
import {MessagesConstats} from '../../../../shared/constants/messages.constats';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ConstsRegisterRoutes} from '../../constants/ConstRegisterRoutes';
import {GenericModalService} from '../../../../shared/components/generic-modal/generic-modal.service';
import {StateClientService} from '../../services/state-client.service';
import {LoadingService} from '../../../../shared/services/loading.service';
import {Client, Contact} from '../../interfaces/client';

@Component({
  selector: 'app-register-client',
  imports: [SharedModule, TelefonePipe],
  standalone: true,
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.scss',

})
export class RegisterClientComponent implements OnInit, OnDestroy{

  fb = inject(FormBuilder);
  service = inject(GenericService);
  ibgeService = inject(IbgeService);
  messageService = inject(MessageService);
  dialogService = inject(GenericModalService);
  router = inject(Router)
  loadingService = inject(LoadingService)
  private clientState = inject(StateClientService);
  private activeRoute = inject(ActivatedRoute);

  subs: Subscription[] = [];
  form!: FormGroup;
  countries: {name:string, code:string}[] = [];
  states: Estado[] = [];
  ref!: DynamicDialogRef;

  today: Date = new Date();
  client: Client | null = this.clientState.selectedClient();
  idParam: string | null = null;

  constructor() {
    this.setupClientEffect()
  }

  ngOnInit() {
    this.createForm();
    this.getCountries();
    this.fallback();
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.subs.forEach(s=>s?.unsubscribe && s.unsubscribe());
  }

  setupClientEffect(){
    effect(() => {
      this.client = this.clientState.selectedClient();
      if (this.client != null) {
        this.form.patchValue(this.client);
        const contactsArray = this.form.get('contacts') as FormArray;
        contactsArray.clear();
        this.client?.contacts.forEach(contact => {
          contactsArray.push(this.createContactFormGroup(contact));
        });
      }
    });
  }

  fallback(){
    this.idParam = this.activeRoute.snapshot.paramMap.get('id');
    if (this.idParam && !this.clientState.selectedClient()) {
      this.clientState.fallBack(this.idParam);
    }
  }

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, emailValidator]],
      cpf: ['', [Validators.required, cpfValidator]],
      birthDate: [new Date(), [Validators.required, futureDateValidator]],
      contacts: this.fb.array([], [Validators.maxLength(3)]),
      country: ['', [Validators.required]],
      state: [{value:'', disabled: true}, [Validators.required]]
    });

    this.disableFieldStates();
  }

  createContactFormGroup(contact?: Contact): FormGroup {
    return this.fb.group({
      type: [contact?.type || '', Validators.required],
      number: [contact?.number || '', Validators.required],
    });
  }

  addContact(): void {
    if (this.contacts.length < 3) {
      this.contacts.push(this.createContactFormGroup());
    }
  }

  removeContact(index: number): void {
    this.dialogService.openModal({titulo:'Atenção', descricao: MessagesConstats.ALERT_DELETE_ITEM}, ()=>this.actionSuccess(index), ()=>{})
  }

  actionSuccess(data: any){
    this.contacts.removeAt(data);
  }

  disableFieldStates() {
    const paisControl = this.form.get('country');

    if (paisControl) {
      this.subs.push(
        paisControl.valueChanges.subscribe((countryCode) => {
          const isBR = countryCode === 'BR';

          if (isBR) {
            this.form.get('state')?.enable();
            this.form.get('cpf')?.enable();
            this.getStates();
          } else {
            this.form.get('state')?.disable();
            this.form.get('cpf')?.disable();
            this.cleanPayLoad();
          }
        })
      );
    }
  }

  cleanPayLoad(){
      this.form.get('state')?.reset();
      this.form.get('cpf')?.reset();
      this.form.get('state')?.disable();
      this.form.get('cpf')?.disable();
  }

  onSubmit() {
    if (this.form.valid) {
      this.subs.push(this.idParam ? this.putForm() : this.postForm());
    }
  }

  postForm(): Subscription{
    return this.service.save(this.form.getRawValue(), '/clients').subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: MessagesConstats.FORM_SEND_SUCCESS })
      this.form.reset();
      this.contacts.clear();
      this.addContact();
    })
  }

  putForm(): Subscription{
    return this.service.put(this.form.getRawValue(), `/clients/${this.idParam}`).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: MessagesConstats.FORM_SEND_SUCCESS })
      this.clientState.selectClient(this.form.getRawValue());
    })
  }

  getCountries(): void{
    this.loadingService.show();
    this.subs.push(
      this.ibgeService.getPaises().subscribe(resp => {
        this.countries = resp.map(({ nome, id }) => ({
          name: nome,
          code: id['ISO-ALPHA-2']
        }));
        this.loadingService.hide();
      })
    );
  }

  getStates(): void{
    this.loadingService.show();
    this.subs.push(
      this.ibgeService.getEstados().subscribe(resp => {
        this.states = resp
        this.loadingService.hide();
      })
    );
  }

  navigateTo() {
    this.router.navigate([`${ConstsRegisterRoutes.MODULE}/${ConstsRegisterRoutes.CLIENT_LIST}`])
  }
}
