import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeData } from '../../employee.model';
import { EmployeeService } from '../employee-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  dataSource: EmployeeData[] = [];
  private employeeSub: Subscription;

  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployee();
    this.employeeSub = this.employeeService
      .getEmployeeUpdateListener()
      .subscribe((employeeData: EmployeeData[]) => {
        // console.log(employeeData, 'dataa::::');
        this.dataSource = employeeData;
        // console.log(this.dataSource, 'data');
      });
  }

  displayedColumns: string[] = ['id', 'code', 'name', 'role', 'dob'];
  // dataSource = this.employeeData;

  ngOnDestroy() {
    this.employeeSub.unsubscribe();
  }
}
