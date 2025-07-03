import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UrlConstats} from '../constants/url.constats';

export interface Municipio {
  id: number;
  nome: string;
}

export interface Estado {
  id: number;
  nome: string;
  sigla: string;
}

export interface Country {
  id: CountryId;
  nome: string;
  'regiao-intermediaria': string | null;
  'sub-regiao': SubRegion;
}

export interface CountryId {
  M49: number;
  'ISO-ALPHA-2': string;
  'ISO-ALPHA-3': string;
}

export interface SubRegion {
  id: SubRegionId;
  nome: string;
  regiao: Region;
}

export interface SubRegionId {
  M49: number;
}

export interface Region {
  id: RegionId;
  nome: string;
}

export interface RegionId {
  M49: number;
}

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  constructor(private http: HttpClient) { }

  getPaises(): Observable<Country[]> {
    return this.http.get<Country[]>(`${UrlConstats.IBGE_LOCALIDADES}/paises`);
  }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${UrlConstats.IBGE_LOCALIDADES}/estados?orderBY=nome`);
  }

  getMunicipios(estado: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${UrlConstats.IBGE_LOCALIDADES}/estados/${estado}/municipios`);
  }
}
