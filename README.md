NestJS API project

## Getting Started

- Clone this repository.
- Execute `npm install` to install required dependence.
- Create database credentials. Execute `cp .env.example .env` and populate values for each key.
- Create a database named `orga_structure`.
- Execute `nest start`.
- Access and test your api via swagger <http://localhost:3000/doc>.

## Requirements

Build web application(API) for registering organization's employee hierarchy or structure.
Build a web application using NestJS ( version >= 9) for backend, PostgreSQL Server database as data Store)
Insert new structure/Department Every Department must contain minimum information like Name, Description, and Managing Department to whom the department Reports, etc.
Update previously saved structure/department.
Frontend (React with Next.js):
Display a single structure/Department and when requested display the immediate managing structure/ Department and structures/departments under its management. For example:
Department Name: CEO
Description: Chief Executive Officer
Click Here to display Managing Department: Managing Department-None
Click Here to display structures/departments under its management: CFO: CMO: CTO
Set up a Next.js project with Typescript.
Implement a dashboard page that displays a list of Departments fetched from the backend API. 
Include functionality to add, edit, and delete Departments.
Design the dashboard interface with responsiveness in mind.
Must use the Redux toolkit for state management and API Call
Use Mantine Ui component and Tailwind CSS for styling
Apply the DRY Principle for your Code


Backend

- [Nest (NestJS)](https://docs.nestjs.com/)
- [DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
- [Command Query Responsibility Segregation (CQRS) pattern](https://www.ibm.com/cloud/architecture/architectures/event-driven-cqrs-pattern/)
- [What is the CQRS pattern?](https://www.ibm.com/cloud/architecture/architectures/event-driven-cqrs-pattern/)

Database

- [PostgreSQL Documentation](https://www.postgresql.org/docs/9.6/postgres-fdw.html)
- [SQL Server](https://docs.microsoft.com/en-us/sql/sql-server/?view=sql-server-ver16)

