import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { EmployeeDbService } from '../employees/firestore/employee-db.service';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private store: EmployeeDbService = inject(EmployeeDbService);

  constructor() {
    this.store.getEmployee().subscribe((data) => {
      console.log('');
      this.employees$.next(
        data.map((e) => {
          return {
            ...e,
            dateOfBirth:
              e.dateOfBirth instanceof Timestamp
                ? e.dateOfBirth.toDate()
                : new Date(e.dateOfBirth),
          } as Employee;
        })
      );
    });
  }

  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<
    readonly Employee[]
  >([]);

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }
}
