import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDbService {
  private firestore: Firestore = inject(Firestore);
  getEmployee(): Observable<Employee[]> {
    const employees = collection(this.firestore, 'employees');
    return collectionData(employees, { idField: 'id' }) as Observable<
      Employee[]
    >;
  }
  createEmployee(employee: Employee) {
    const employees = collection(this.firestore, 'employees');
    return addDoc(employees, { ...employee });
  }
}
