import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = [];

  constructor() { }

  // Function to add a new employee to the employees array
  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  // Function to update an existing employee in the employees array
  updateEmployee(employeeId: string, updatedEmployee: Employee) {
    const index = this.employees.findIndex(emp => emp.employeeId === employeeId);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  // Function to get an employee by their ID
  getEmployeeById(employeeId: string): Employee | undefined {
    return this.employees.find(emp => emp.employeeId === employeeId);
  }
}
