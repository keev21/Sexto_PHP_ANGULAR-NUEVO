import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStock } from '../Interfaces/istock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private urlBase: string =
  'http://localhost/Sexto_PHP_ANGULAR/Inventario/Controllers/Stock.Controller.php?op=';
constructor(private clientePhp: HttpClient) {}
todos(): Observable<IStock[]> {
  return this.clientePhp.get<IStock[]>(this.urlBase + 'todos');
}
}
