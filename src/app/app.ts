import { Component, signal } from '@angular/core';
import { ComponeneteForm } from './components/componenete-form/componenete-form';

@Component({
  imports: [ComponeneteForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('formulario-tarea');
}