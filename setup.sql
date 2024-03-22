CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  managing_department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
  CONSTRAINT chk_self_reference CHECK (id != managing_department_id)
);
