using crud_dotNet.Models;
using Microsoft.EntityFrameworkCore;

namespace crud_dotNet.Repository
{
    public class EmployeeRepository
    {
        private readonly AddDbContext _addDbContext;
        public EmployeeRepository(AddDbContext addDbContext) 
        {
            _addDbContext = addDbContext;
        }

        public async Task AddEmployee(Employee employee)
        {
            await _addDbContext.Set<Employee>().AddAsync(employee);
            await _addDbContext.SaveChangesAsync();
        }

        public async Task<List<Employee>> GetAllEmployee()
        {
            return await _addDbContext.Employees.ToListAsync();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            return await _addDbContext.Employees.FindAsync(id);
        }

        public async Task UpdateEmployee(int id, Employee model)
        {
            var employee = await _addDbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                throw new Exception("Employee not found");
            }
            employee.Name = model.Name;
            employee.Phone = model.Phone;
            employee.Age = model.Age;
            employee.Salary = model.Salary;
            await _addDbContext.SaveChangesAsync();    
        }

        public async Task DeleteEmployee(int id)
        {
            var employee = await _addDbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                throw new Exception("Employee not found");
            }
            _addDbContext.Employees.Remove(employee);
            await _addDbContext.SaveChangesAsync();
        }
    }
}
