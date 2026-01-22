export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  salary: number;
  email?: string;
  phone?: string;
  hireDate?: Date;
  status?: 'Active' | 'Inactive';
}
