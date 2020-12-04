import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Tareas';

  constructor(
    private firestore: AngularFirestore
  ) { }

  crear_tareas(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  leer_tareas() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  actualizar_tareas(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  borrar_tareas(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}