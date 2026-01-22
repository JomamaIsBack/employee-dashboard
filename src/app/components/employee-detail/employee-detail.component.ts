import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {
  employeeForm!: FormGroup;
  employee: Employee | null = null;
  isEditMode = false;
  isLoading = false;
  employeeId: number | null = null;

  departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];
  statuses = ['Active', 'Inactive'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.employeeId = Number(params['id']);
        this.loadEmployee(this.employeeId);
        this.isEditMode = true;
      }
    });

    // Also check if employee was selected from the list
    if (!this.employeeId) {
      this.employeeService.getSelectedEmployee().subscribe(employee => {
        if (employee) {
          this.employee = employee;
          this.populateForm(employee);
          this.isEditMode = true;
        }
      });
    }
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required, Validators.minLength(2)]],
      department: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      hireDate: ['', Validators.required],
      status: ['Active', Validators.required]
    });
  }

  loadEmployee(id: number): void {
    this.isLoading = true;
    this.employeeService.getEmployeeById(id).subscribe(
      (employee: Employee | undefined) => {
        if (employee) {
          this.employee = employee;
          this.populateForm(employee);
        }
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        console.error('Error loading employee');
      }
    );
  }

  populateForm(employee: Employee): void {
    this.employeeForm.patchValue({
      name: employee.name,
      role: employee.role,
      department: employee.department,
      salary: employee.salary,
      email: employee.email || '',
      phone: employee.phone || '',
      hireDate: employee.hireDate ? new Date(employee.hireDate) : null,
      status: employee.status || 'Active'
    });
  }

  onSave(): void {
    if (this.employeeForm.valid) {
      this.isLoading = true;
      const formValue = {
        ...this.employeeForm.value,
        hireDate: new Date(this.employeeForm.value.hireDate)
      };
      
      if (this.employee) {
        // Update existing employee
        this.employeeService.updateEmployee(this.employee.id, formValue);
        this.snackBar.open('✓ Employee updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      } else {
        // Add new employee
        this.employeeService.addEmployee(formValue);
        this.snackBar.open('✓ Employee added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
      
      setTimeout(() => {
        this.router.navigate(['/employees']);
      }, 500);
    } else {
      this.snackBar.open('⚠ Please fill in all required fields correctly.', 'Close', {
        duration: 4000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.employeeForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (field?.hasError('minLength')) {
      return `${fieldName} must be at least ${field.getError('minLength').requiredLength} characters`;
    }
    if (field?.hasError('email')) {
      return 'Invalid email format';
    }
    if (field?.hasError('min')) {
      return `${fieldName} must be greater than 0`;
    }
    return '';
  }
}
