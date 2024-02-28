import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit  {
  faTrash = faTrash;
  employees: Employee[] = [];
  employeeForm!: FormGroup;
  isEdit: boolean = false;
  employeeId: string = '';

  constructor(private fb: FormBuilder, 
              private employeeService: EmployeeService, 
              private router: Router,
              private route: ActivatedRoute) {
    // Initialize the form group
    this.employeeForm = this.fb.group({
      employeeId: [''],
      name: [''],
      contactNumber: [''],
      email: [''],
      skills: this.fb.array([
          this.fb.group({
              skillName: [''],
              experience: ['']
          })
      ]),
      gender: [''] 
    });
  }

  ngOnInit(): void {
    // Fetch employee details if in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.employeeId = params['id'];
        const employee = this.employeeService.getEmployeeById(this.employeeId);
        if (employee) {
          this.populateForm(employee);
        }
        else {
          console.log('employee not found');
        }
      }
    });
  }

  // Populate the form with employee details
  populateForm(employee: Employee) {
    this.employeeForm.patchValue({
      employeeId: employee.employeeId,
      name: employee.name,
      contactNumber: employee.contactNumber,
      email: employee.email,
      gender: employee.gender
    });
    this.employeeForm.setControl('skills', this.fb.array([]));
    employee.skills.forEach(skill => {
      this.skillForms.push(this.fb.group({
        skillName: skill.skillName,
        experience: skill.experience
      }));
    });
  }

  // Getter for accessing form array of skills
  get skillForms() {
    return this.employeeForm.get('skills') as FormArray;
  }

  // Create a form group for a skill
  createSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }

  // Add a new skill form group
  AddSkill() {
    this.skillForms.push(this.createSkillFormGroup());
  }
 
  // Remove a skill form group
  RemoveSkill(index: number) {
    this.skillForms.removeAt(index);
  }

  // Handle form submission
  OnSubmit() {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = { 
        employeeId: this.employeeForm.value.employeeId,
        name: this.employeeForm.value.name,
        contactNumber: this.employeeForm.value.contactNumber,
        email: this.employeeForm.value.email,
        gender: this.employeeForm.value.gender,
        skills: this.employeeForm.value.skills
      };
      if (this.isEdit && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, newEmployee);
      }
      else {
        this.employeeService.addEmployee(newEmployee);
      }
      this.employeeForm.reset();
      this.router.navigate(['/']);
    }
  }
}
