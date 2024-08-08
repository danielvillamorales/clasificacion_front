import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Dotacion } from '../interfaces/dotacion.interface';

@Injectable({
  providedIn: 'root'
})
export class DotacionkaService {


  private apiURl : string = 'http://jasperka.kostazul.com:8086/entrega-dotacion';

  constructor(private http : HttpClient) { }

  saveDotacion(dotacion: string[]): Observable<Dotacion[]> {
    return this.http.post<Dotacion[]>(this.apiURl, dotacion).pipe(
      catchError( err => {
        console.log(err);
        alert(`error: ${err.error.message}`);
        return of([]);
      }),
    );
  }
}
