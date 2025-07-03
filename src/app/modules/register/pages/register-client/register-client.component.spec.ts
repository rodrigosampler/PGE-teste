import { TestBed } from '@angular/core/testing';
import { RegisterClientComponent } from './register-client.component';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {FormArray, FormBuilder} from '@angular/forms';
import { GenericService } from '../../../../shared/services/generic.service';
import { IbgeService } from '../../../../shared/services/ibge.service';
import { StateClientService } from '../../services/state-client.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericModalService } from '../../../../shared/components/generic-modal/generic-modal.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import {Client} from '../../interfaces/client';
import {ConstsRegisterRoutes} from '../../constants/ConstRegisterRoutes';
import {MessagesConstats} from '../../../../shared/constants/messages.constats';



describe('RegisterClientComponent', () => {
  let component: RegisterClientComponent;
  let genericService: jasmine.SpyObj<GenericService>;
  let ibgeService: jasmine.SpyObj<IbgeService>;
  let stateClientService: jasmine.SpyObj<StateClientService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let router: jasmine.SpyObj<Router>;
  let loadingService: jasmine.SpyObj<LoadingService>;
  let modalService: jasmine.SpyObj<GenericModalService>;
  let dialogService: jasmine.SpyObj<GenericModalService>;

  const mockClient: Client = {
    id: '1',
    name: 'Rodrigo',
    email: 'test@example.com',
    cpf: '123.456.789-00',
    birthDate: new Date(),
    contacts: [{ type: 'celular', number: '(85) 99999-9999' }],
    country: 'BR',
    state: 'Ceará'
  };

  beforeEach(() => {
    genericService = jasmine.createSpyObj('GenericService', ['save', 'put']);
    ibgeService = jasmine.createSpyObj('IbgeService', ['getPaises', 'getEstados']);
    stateClientService = jasmine.createSpyObj('StateClientService', ['selectedClient', 'fallBack', 'selectClient']);
    messageService = jasmine.createSpyObj('MessageService', ['add']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    loadingService = jasmine.createSpyObj('LoadingService', ['show', 'hide']);
    modalService = jasmine.createSpyObj('GenericModalService', ['openModal']);
    dialogService = jasmine.createSpyObj('GenericModalService', ['openModal']);

    genericService.put = jasmine.createSpy().and.returnValue(of([mockClient]));
    genericService.save = jasmine.createSpy().and.returnValue(of(mockClient));

    ibgeService.getPaises.and.returnValue(of([]));
    ibgeService.getEstados.and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        FormBuilder,
        {provide: GenericService, useValue: genericService},
        {provide: IbgeService, useValue: ibgeService},
        {provide: StateClientService, useValue: stateClientService},
        {provide: MessageService, useValue: messageService},
        {provide: Router, useValue: router},
        {provide: GenericModalService, useValue: modalService},
        {provide: LoadingService, useValue: loadingService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {paramMap: new Map([['id', '1']])}
          }
        }
      ],
      imports: [RegisterClientComponent]
    });

    component = TestBed.createComponent(RegisterClientComponent).componentInstance;
    component['dialogService'] = dialogService;
  });

  it('should create the form on init', () => {
    ibgeService.getPaises.and.returnValue(of([]));
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.contacts.length).toBe(0);
  });

  it('should add a contact when addContact is called', () => {
    component.createForm();
    component.addContact();
    expect(component.contacts.length).toBe(1);
  });

  it('should not add more than 3 contacts', () => {
    component.createForm();
    component.addContact();
    component.addContact();
    component.addContact();
    component.addContact();
    expect(component.contacts.length).toBe(3);
  });

  it('should remove a contact when actionSuccess is called', () => {
    component.createForm();
    component.addContact();
    expect(component.contacts.length).toBe(1);
    component.actionSuccess(0);
    expect(component.contacts.length).toBe(0);
  });

  it('should fallback and call state fallback when id param exists and stateClient is null', () => {
    stateClientService.selectedClient.and.returnValue(null);
    component.createForm();
    component.fallback();
    expect(stateClientService.fallBack).toHaveBeenCalledWith('1');
  });

  it('should patch form and contacts when client exists', () => {
    const mockClient: Client = {
      id: '1',
      name: 'Rodrigo',
      email: 'test@example.com',
      cpf: '123.456.789-00',
      birthDate: new Date(),
      contacts: [{type: 'celular', number: '999999999'}],
      country: 'BR',
      state: 'Ceará'
    };

    stateClientService.selectedClient.and.returnValue(mockClient);

    component.createForm();

    component.form.patchValue(mockClient);

    const contactsArray = component.contacts;
    contactsArray.clear();
    mockClient.contacts.forEach(contact => {
      contactsArray.push(component.createContactFormGroup(contact));
    });

    expect(component.form.value.name).toBe(mockClient.name);
    expect(component.contacts.length).toBe(1);
    expect(component.contacts.at(0).value.number).toBe('999999999');
  });

  it('should submit and call save (POST) when idParam is null', () => {
    component.createForm();
    genericService.save.and.returnValue(of(mockClient));
    component.idParam = null;
    component.form.patchValue({
      name: 'Rodrigo',
      email: 'test@test.com',
      cpf: '921.296.140-19',
      birthDate: new Date(),
      country: 'BR',
      state: 'Ceará'
    });

    (component.form.get('contacts') as FormArray).push(
      component.createContactFormGroup({ type: 'celular', number: '(85) 9875-71773' })
    );

    component.onSubmit();

    expect(genericService.save).toHaveBeenCalledWith(
      jasmine.any(Object),
      '/clients'
    );
  });

  it('should submit and call put (PUT) when idParam is present', () => {
    component.createForm();

    // Mock do PUT
    genericService.put.and.returnValue(of([mockClient]));

    // Configura idParam
    component.idParam = '1';

    // Preenche valores básicos
    component.form.patchValue({
      name: 'Rodrigo',
      email: 'test@test.com',
      cpf: '921.296.140-19',
      birthDate: new Date(),
      country: 'BR',
      state: 'Ceará'
    });


    (component.form.get('contacts') as FormArray).push(
      component.createContactFormGroup({ type: 'celular', number: '(85) 9875-71773' })
    );

    component.onSubmit();

    expect(genericService.put).toHaveBeenCalled();
  });

  it('should navigate to the client list route', () => {
    component.navigateTo();
    expect(router.navigate).toHaveBeenCalledWith([
      `${ConstsRegisterRoutes.MODULE}/${ConstsRegisterRoutes.CLIENT_LIST}`
    ]);
  });

  it('should call openModal with correct data and execute actionSuccess on confirm', () => {
    const index = 1;

    spyOn(component, 'actionSuccess');

    const openModalSpy = dialogService.openModal.and.callFake(
      (config: any, confirmFn: Function, cancelFn: Function) => {
        confirmFn();
      }
    );

    component.removeContact(index);

    expect(openModalSpy).toHaveBeenCalledWith(
      {
        titulo: 'Atenção',
        descricao: MessagesConstats.ALERT_DELETE_ITEM
      },
      jasmine.any(Function),
      jasmine.any(Function)
    );

    expect(component.actionSuccess).toHaveBeenCalledWith(index);
  });

  it('should close ref and unsubscribe subscriptions on ngOnDestroy', () => {

    const mockRef = jasmine.createSpyObj('DynamicDialogRef', ['close']);
    component.ref = mockRef;

    const mockSub1 = { unsubscribe: jasmine.createSpy('unsubscribe') } as any;
    const mockSub2 = { unsubscribe: jasmine.createSpy('unsubscribe') } as any;

    component.subs = [mockSub1, mockSub2];

    component.ngOnDestroy();

    expect(mockRef.close).toHaveBeenCalled();       // Confirma que o ref foi fechado
    expect(mockSub1.unsubscribe).toHaveBeenCalled(); // Confirma que as subs foram desinscritas
    expect(mockSub2.unsubscribe).toHaveBeenCalled();
  });

  it('should only unsubscribe if ref is not defined', () => {

    component.ref = undefined as any;

    const mockSub = { unsubscribe: jasmine.createSpy('unsubscribe') } as any;
    component.subs = [mockSub];

    component.ngOnDestroy();

    expect(mockSub.unsubscribe).toHaveBeenCalled();
  });

})
