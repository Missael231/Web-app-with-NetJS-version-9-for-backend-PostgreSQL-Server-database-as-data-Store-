import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async createDepartment(department: Department): Promise<Department> {
    return await this.departmentRepository.save(department);
  }

  async getDepartment(id: number): Promise<Department | null> {
    return await this.departmentRepository.findOne({ where: { id } });
  }

  async getManagingDepartment(department: Department): Promise<Department | null> {
    if (!department.managingDepartmentId) {
      return null;
    }
    return await this.departmentRepository.findOne({ where: { id: department.managingDepartmentId } });
  }

  async getSubordinateDepartments(department: Department): Promise<Department[]> {
    return await this.departmentRepository.find({ where: { managingDepartmentId: department.id } });
  }

  async updateDepartment(id: number, department: Department): Promise<Department | null> {
    const existingDepartment = await this.departmentRepository.findOne({ where: { id } });
    if (!existingDepartment) {
      return null;
    }
    existingDepartment.name = department.name;
    existingDepartment.description = department.description;
    existingDepartment.managingDepartmentId = department.managingDepartmentId;
    return await this.departmentRepository.save(existingDepartment);
  }

  async deleteDepartment(id: number): Promise<void> {
    await this.departmentRepository.delete(id);
  }
}
