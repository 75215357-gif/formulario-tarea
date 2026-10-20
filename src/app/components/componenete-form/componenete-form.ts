import { Component, signal } from '@angular/core';
import { form, FormField, min, max } from '@angular/forms/signals';

interface DatosEstudiante {
  nombre: string;
  apellido: string;
  correo: string;
  carrera: string;
  ciclo: number;
}

interface Estudiante extends DatosEstudiante {
  id: number;
}

const FORMULARIO_VACIO: DatosEstudiante = {
  nombre: '',
  apellido: '',
  correo: '',
  carrera: '',
  ciclo: 1,
};

@Component({
  imports: [FormField],
  selector: 'app-componenete-form',
  styleUrl: './componenete-form.css',
  templateUrl: './componenete-form.html',
})
export class ComponeneteForm {

  modelo = signal<DatosEstudiante>({ ...FORMULARIO_VACIO });

  formulario = form(this.modelo, (campos) => {
    min(campos.ciclo, 1);
    max(campos.ciclo, 10);
  });

  estudiantes = signal<Estudiante[]>([]);

  editandoId = signal<number | null>(null);

  private siguienteId = 1;

  agregar(event: Event): void {
    event.preventDefault();

    const datos = this.modelo();

    if (
      !datos.nombre.trim() ||
      !datos.apellido.trim() ||
      !datos.correo.trim() ||
      !datos.carrera ||
      !Number.isInteger(datos.ciclo) ||
      datos.ciclo < 1 ||
      datos.ciclo > 10
    ) {
      alert('Completa todos los campos y coloca un ciclo del 1 al 10.');
      return;
    }

    const id = this.editandoId();

    if (id !== null) {
      this.estudiantes.update(lista =>
        lista.map(e => (e.id === id ? { id, ...datos } : e))
      );
    } else {
      this.estudiantes.update(lista => [
        ...lista,
        { id: this.siguienteId++, ...datos },
      ]);
    }

    this.cancelar();
  }

  editar(estudiante: Estudiante): void {
    const { id, ...datos } = estudiante;
    this.modelo.set(datos);
    this.editandoId.set(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminar(id: number): void {
    this.estudiantes.update(lista => lista.filter(e => e.id !== id));

    if (this.editandoId() === id) {
      this.cancelar();
    }
  }

  cancelar(): void {
    this.modelo.set({ ...FORMULARIO_VACIO });
    this.editandoId.set(null);
  }
}