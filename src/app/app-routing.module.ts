import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './employee-portal/add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-portal/employee-list/employee-list.component';

const routes: Routes = [
  {path: 'add-employee', component: AddEmployeeComponent},
  {path: 'employee-list', component:EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
