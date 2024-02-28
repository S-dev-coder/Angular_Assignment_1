import { Component, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  faPencilAlt = faPencilAlt; 
  faTrash = faTrash; 
  employee: Employee[] = []; 

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employee = this.employeeService.employees; 
  }

  // Method to add employee
  AddEmployee() {
    this.router.navigate(['/add-edit']); 
  }

  // Method to track index in ngFor
  trackByIndex(index: number, item: any) {
    return index;
  }
  
  // Method to edit employee
  editEmployee(employeeId: string) {
    this.router.navigate(['/edit', employeeId]);
  }

  // Method to delete employee
  DeleteEmployee(index: number) {
    const employeeToDelete = this.employee[index]; 
    const confirmation = this.confirmDeleteEmployee(employeeToDelete.name); 
    if (confirmation) {
      this.employee.splice(index, 1); 
      this.showSuccessMessage(`The employee ${employeeToDelete.name} has been  deleted.`); 
    }
  }

  // Method to confirm employee deletion
  confirmDeleteEmployee(employeeName: string): boolean {
    const confirmation = confirm(`Are you sure you want to delete ${employeeName}?`); 
    return confirmation;
  }

  // Method to show success message
  showSuccessMessage(message: string) {
    const successElement = this.getSuccessMessageElement(); 
    if (successElement) {
        this.displaySuccessMessage(successElement, message); 
    }
  }

  // Method to get success message element
  private getSuccessMessageElement(): HTMLElement | null {
    return document.getElementById('successMessage'); 
  }

  // Method to display success message
  private displaySuccessMessage(successElement: HTMLElement, message: string) {
    successElement.innerText = message; 
    const messageWidth = message.length * 8; 
    successElement.style.width = `${messageWidth}px`; 
    successElement.style.display = 'block';
    setTimeout(() => {
        successElement.style.display = 'none'; 
    }, 2000);
  }
}
