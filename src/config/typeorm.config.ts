import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost', 
  port: 5432, // port (default)
  username: 'postgres', 
  password: 'your_password', 
  database: 'department_db', 
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
};
