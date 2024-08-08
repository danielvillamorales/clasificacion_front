import { Component } from '@angular/core';
import { Dotacion } from 'src/app/interfaces/dotacion.interface';
import { DotacionkaService } from 'src/app/services/dotacionka.service';

@Component({
  selector: 'app-dotacionka',
  templateUrl: './dotacionka.component.html',
  styleUrls: ['./dotacionka.component.css']
})
export class DotacionkaComponent {

  selectedFile: File | null = null;
  fileContent: string | null = null;
  dotaciones_entregadas: Dotacion[] = [];

  constructor(private service: DotacionkaService) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileContent = reader.result as string;
      };
      reader.readAsText(this.selectedFile);
    }
  }

  onUpload(): void {
    if (this.fileContent) {
      console.log(this.fileContent);
      const lines = this.fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      this.sendData(lines);
    } else {
      console.error('No file content to upload');
      alert('no hay contenido en el archivo');
    }
  }

  sendData(lines: string[]): void {
    console.log(lines);
    this.service.saveDotacion(lines).subscribe(
      response => {
        console.log(response);
        this.dotaciones_entregadas = response;
        if (this.dotaciones_entregadas.length > 0) {
          alert('Dotaciones guardadas correctamente');
        }
      },
    );
    const input = document.getElementById('archivo') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

}
