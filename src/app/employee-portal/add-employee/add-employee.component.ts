import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService, private route: Router) {}

  ngOnInit(): void {}

  //Add Employee//
  onAddEmployee(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.employeeService.addEmployee(
      form.value.code,
      form.value.name,
      form.value.role,
      form.value.dob
    );
    form.reset();
    this.route.navigate(['/employee-list']);
  }
}
