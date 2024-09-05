import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Clasificacion } from 'src/app/interfaces/clasificacion.interface';
import { ClasificacionService } from 'src/app/services/clasificacion.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css'],
})
export class ClasificacionComponent implements OnInit {
  private debouncer = new Subject<string>();
  private debouncerSubscription?: Subscription;
  @ViewChild('valor') valor: ElementRef = new ElementRef('');

  public clasificacion: Clasificacion[] = [];
  ruta_imagen: string = '';

  constructor(
    private clasificacionService: ClasificacionService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.__initiateDebouncer();
  }

  private __initiateDebouncer() {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.searchToEnter(value);
      });
  }

  searchToEnter(valor: string) {
    console.log(valor);
    this.clasificacionService
      .getClasificacionByValor(valor)
      .subscribe((clasificaciones) => {
        if (clasificaciones.length === 0) {
          console.log('No se encontraron resultados');
          this.clasificacion = [];
          this.valor.nativeElement.value = '';
          this.ruta_imagen = '';
          return;
        }
        this.clasificacion = clasificaciones;
        this.valor.nativeElement.value = '';
        this.serach_image(
          clasificaciones[0].referencia,
          clasificaciones[0].consecutivo,
          clasificaciones[0].codcolor
        );
        console.log(this.clasificacion);
      });
  }

  onKeyPress(event: KeyboardEvent, eventValue: string) {
    if (event.key === 'Enter') {
      console.log('Enter');
      this.searchToEnter(eventValue);
      this.debouncerSubscription?.unsubscribe(); // Desuscribirse del debouncer
      this.__initiateDebouncer();
    } else {
      console.log('Tecla presionada');
      this.debouncer.next(eventValue);
    }
    // Volver a suscribirse al debouncer
  }

  replaceCaracheres(valor: string | null): string {
    if (!valor) {
      return 'Sin Clasificar';
    }
    return valor.replace(/ /g, '_').replace(/%/g, '');
  }

  serach_image(
    referencia: string,
    consecutivo: number,
    codcolor: string | null
  ) {
    this.ruta_imagen = '';
    const imagen_a_consultar: string = `http://201.236.231.148/fotosVtex/todas/${referencia}${consecutivo}${codcolor}_a.jpg`;
    this.http
      .head(imagen_a_consultar, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.ruta_imagen = imagen_a_consultar;
        } else {
          this.ruta_imagen = '';
        }
        console.log(`la imagen es` + this.ruta_imagen);
      });
  }
}
