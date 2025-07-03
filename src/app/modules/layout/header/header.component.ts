import {Component, effect, inject, OnInit} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {MenuItem} from 'primeng/api';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {ConstsLoginRoutes} from '../../login/constants/ConstLoginRoutes';
import {ConstsRegisterRoutes} from '../../register/constants/ConstRegisterRoutes';
import {ConstsHomeRoutes} from '../../home/constants/ConstHomeRoutes';

@Component({
  selector: 'app-header',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  service = inject(AuthService);
  router = inject(Router);
  checked: boolean = false;
  isAuth: boolean | null = false;
  constructor() {

    effect(() => {
      if(this.service.isAuthenticated() != null){
        this.isAuth = this.service.isAuthenticated();

      }
      this.loadMenuItems();
    });
  }
  ngOnInit() {

  }

  loadMenuItems(){
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate([ConstsHomeRoutes.MODULE]);
        }
      },
      {
        label: 'Cadastros',
        items: [
          {
            label: 'Clientes',
            icon: 'pi pi-wallet',
            command: () => {
              this.router.navigate([`${ConstsRegisterRoutes.MODULE}/${ConstsRegisterRoutes.CLIENT_LIST}`]);
            }
          },
          {
            label: 'Usuários',
            icon: 'pi pi-users',
            command: () => {
              this.router.navigate([`${ConstsRegisterRoutes.MODULE}/${ConstsRegisterRoutes.USER}`]);
            }
          }
        ],
        icon: 'pi pi-folder',
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        visible: this.isAuth!,
        command: () => {
          this.service.logout();
        },
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        visible: !this.isAuth,
        command: () => {
          this.router.navigate([ConstsLoginRoutes.MODULE]);
        }
      }
    ];
  }
  eventDarkMode() {
    const element = document.querySelector('html');
    element != null ? element.classList.toggle('my-app-dark') : false;
  }
}
