import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';

@Controller('departments') //  URL prefix for this controller
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll(): Promise<Department[]> {
    return await this.departmentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Department> {
    const department = await this.departmentService.getDepartment(id);
    if (!department) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }
    return department;
  }

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentService.createDepartment(createDepartmentDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmentDto): Promise<Department | undefined> {
    return await this.departmentService.updateDepartment(id, updateDepartmentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.departmentService.deleteDepartment(id);
  }
}
