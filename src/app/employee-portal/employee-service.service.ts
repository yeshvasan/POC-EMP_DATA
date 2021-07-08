import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeData } from '../employee.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employeeData: EmployeeData[] = [];
  private employeeUpdated = new Subject<EmployeeData[]>();

  constructor(private http: HttpClient) {}

  getEmployee() {
    this.http
      .get<{ message: string; employee: EmployeeData[] }>(
        'http://localhost:3000/api/employee-list'
      )
      .pipe(
        map((empData) => {
          //   console.log(empData.employee,"dataaaaaa:")
          return empData.employee.map((em,id) => {
              console.log(id,"id:::")
            return {
              _id: id + 1,
              code: em.code,
              name: em.name,
              role: em.role,
              dob: em.dob,
            };
          });
        })
      )
      .subscribe((transformedData) => {
        this.employeeData = transformedData;
        this.employeeUpdated.next([...this.employeeData]);
      });
  }

  getEmployeeUpdateListener() {
    return this.employeeUpdated.asObservable();
  }

  addEmployee(code: string, name: string, role: string, dob: string) {
    const emp: EmployeeData = {
      name: name,
      code: code,
      role: role,
      dob: dob,
    };
    this.http
      .post<{ message: String }>('http://localhost:3000/api/employee-list', emp)
      .subscribe((responseData) => {
        console.log(this.employeeData, 'dddddd');
        this.employeeData.push(emp);
        console.log(this.employeeUpdated.next([...this.employeeData]));
        this.employeeUpdated.next([...this.employeeData]);
      });
  }
}
