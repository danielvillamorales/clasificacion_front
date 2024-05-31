import { Component, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Clasificacion } from 'src/app/interfaces/clasificacion.interface';
import { ClasificacionService } from 'src/app/services/clasificacion.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit{

  private debouncer= new Subject<string>();
  private debouncerSubscription?: Subscription;
  @ViewChild('valor') valor: ElementRef = new ElementRef('');

  public clasificacion : Clasificacion[] = [];

  constructor(private clasificacionService :ClasificacionService) {
   }


  ngOnInit(): void {
    this.__initiateDebouncer();
  }

  private __initiateDebouncer() {
    this.debouncerSubscription = this.debouncer.pipe( debounceTime(1000))
    .subscribe( value => {
      this.searchToEnter(value);
    });
  }

  searchToEnter(valor: string) {
    console.log(valor);
    this.clasificacionService.getClasificacionByValor(valor).subscribe(
      clasificaciones => {
        if (clasificaciones.length === 0) {
          console.log('No se encontraron resultados');
          this.clasificacion = [];
          this.valor.nativeElement.value = '';
          return;
        }
        this.clasificacion = clasificaciones;
        this.valor.nativeElement.value = '';
        console.log(this.clasificacion);
        }
    );
  }

  onKeyPress(event: KeyboardEvent, eventValue: string) {
    if (event.key === 'Enter') {
      console.log('Enter');
      this.searchToEnter(eventValue);
      this.debouncerSubscription?.unsubscribe();// Desuscribirse del debouncer
      this.__initiateDebouncer();
    } else {
      console.log('Tecla presionada');
      this.debouncer.next(eventValue);
    }
     // Volver a suscribirse al debouncer
  }

  replaceCaracheres(valor:string | null):string{
    if (!valor) {
      return 'Sin Clasificar';
    }
    return valor.replace(/ /g, "_").replace(/%/g, "");
  }
}
