import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clasificacion } from '../interfaces/clasificacion.interface';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {

  private apiURl : string = 'http://jasperka.kostazul.com:8086/clasificacion'

  constructor(private http : HttpClient) { }


  getClasificacionByValor(valor: string)  {
    const params = new HttpParams()
    .set('valor', valor);
    return this.http.get<Clasificacion[]>(this.apiURl, {params})
    .pipe(
      catchError( err => {
        console.log(err);
        return of([]);
      }),
    );

  }

}
