import { Employee } from '../models/employee.model';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Senior Developer',
    department: 'Engineering',
    salary: 95000,
    email: 'john.doe@company.com',
    phone: '(555) 123-4567',
    hireDate: new Date('2021-03-15'),
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Product Manager',
    department: 'Product',
    salary: 85000,
    email: 'jane.smith@company.com',
    phone: '(555) 123-4568',
    hireDate: new Date('2020-07-22'),
    status: 'Active'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    role: 'UX Designer',
    department: 'Design',
    salary: 75000,
    email: 'michael.johnson@company.com',
    phone: '(555) 123-4569',
    hireDate: new Date('2022-01-10'),
    status: 'Active'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    role: 'Junior Developer',
    department: 'Engineering',
    salary: 65000,
    email: 'sarah.williams@company.com',
    phone: '(555) 123-4570',
    hireDate: new Date('2023-06-01'),
    status: 'Active'
  },
  {
    id: 5,
    name: 'Robert Brown',
    role: 'DevOps Engineer',
    department: 'Engineering',
    salary: 88000,
    email: 'robert.brown@company.com',
    phone: '(555) 123-4571',
    hireDate: new Date('2021-09-15'),
    status: 'Active'
  },
  {
    id: 6,
    name: 'Emily Davis',
    role: 'Marketing Manager',
    department: 'Marketing',
    salary: 78000,
    email: 'emily.davis@company.com',
    phone: '(555) 123-4572',
    hireDate: new Date('2020-11-03'),
    status: 'Inactive'
  }
];
