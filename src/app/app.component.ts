import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {SharedModule} from './shared/shared.module';
import {HeaderComponent} from './modules/layout/header/header.component';
import {LoadingService} from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  imports: [SharedModule, HeaderComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{
  title = 'PGE-teste';
  loadingservice = inject(LoadingService);
}
