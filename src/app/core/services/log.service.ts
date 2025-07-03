import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {env} from '../../../environments/environment';
import { Error } from '../interfaces/error';
@Injectable({
  providedIn: 'root'
})
export class LogService {
  private http = inject(HttpClient);
  private endpoint = `${env.host}/errorlog`;

  log(error: Error): void {
    this.http.post(this.endpoint, error).subscribe();
  }
}
