import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { MOCK_EMPLOYEES } from '../data/mock-employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees$ = new BehaviorSubject<Employee[]>(MOCK_EMPLOYEES);
  private selectedEmployee$ = new BehaviorSubject<Employee | null>(null);

  constructor() {}

  // Get all employees as observable
  getEmployees(): Observable<Employee[]> {
    return this.employees$.asObservable();
  }

  // Get employees synchronously (for quick access)
  getEmployeesSync(): Employee[] {
    return this.employees$.value;
  }

  // Get single employee by ID
  getEmployeeById(id: number): Observable<Employee | undefined> {
    return new Observable(observer => {
      const employee = this.employees$.value.find(emp => emp.id === id);
      observer.next(employee);
      observer.complete();
    });
  }

  // Set selected employee
  setSelectedEmployee(employee: Employee): void {
    this.selectedEmployee$.next(employee);
  }

  // Get selected employee
  getSelectedEmployee(): Observable<Employee | null> {
    return this.selectedEmployee$.asObservable();
  }

  // Add new employee
  addEmployee(employee: Omit<Employee, 'id'>): void {
    const newEmployee: Employee = {
      ...employee,
      id: Math.max(...this.employees$.value.map(e => e.id), 0) + 1
    };
    const currentEmployees = this.employees$.value;
    this.employees$.next([...currentEmployees, newEmployee]);
  }

  // Update employee
  updateEmployee(id: number, updates: Partial<Employee>): void {
    const currentEmployees = this.employees$.value;
    const index = currentEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      currentEmployees[index] = { ...currentEmployees[index], ...updates };
      this.employees$.next([...currentEmployees]);
    }
  }

  // Delete employee
  deleteEmployee(id: number): void {
    const currentEmployees = this.employees$.value;
    this.employees$.next(currentEmployees.filter(emp => emp.id !== id));
  }
}
