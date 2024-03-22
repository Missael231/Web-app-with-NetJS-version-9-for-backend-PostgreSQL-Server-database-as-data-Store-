import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Department, (department) => department.subordinateDepartments)
  @JoinColumn({ name: 'managingDepartmentId' })
  managingDepartment: Department | null;

  @Column({ nullable: true })
  managingDepartmentId: number | null;

  @OneToMany(() => Department, (department) => department.managingDepartment)
  subordinateDepartments: Department[];
}
