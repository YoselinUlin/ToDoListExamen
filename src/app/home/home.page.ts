// home.pDuracion.ts
import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface tareasData {
  Nombre: string;
  Duracion: number;
  Comentario: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tareasListado = [];
  tareasData: tareasData;
  tareasForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.tareasData = {} as tareasData;
  }

  ngOnInit() {

    this.tareasForm = this.fb.group({
      Nombre: ['', [Validators.required]],
      Duracion: ['', [Validators.required]],
      Comentario: ['', [Validators.required]]
    })

    this.firebaseService.leer_tareas().subscribe(data => {

      this.tareasListado = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Nombre: e.payload.doc.data()['Nombre'],
          Duracion: e.payload.doc.data()['Duracion'],
          Comentario: e.payload.doc.data()['Comentario'],
        };
      })
    });
  }

  CreateRecord() {
    console.log(this.tareasForm.value);
    this.firebaseService.crear_tareas(this.tareasForm.value).then(resp => {
      this.tareasForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.borrar_tareas(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Nombre;
    record.EditDuracion = record.Duracion;
    record.EditComentario = record.Comentario;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Nombre'] = recordRow.EditName;
    record['Duracion'] = recordRow.EditDuracion;
    record['Comentario'] = recordRow.EditComentario;
    this.firebaseService.actualizar_tareas(recordRow.id, record);
    recordRow.isEdit = false;
  }

}