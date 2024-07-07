using Microsoft.EntityFrameworkCore;

namespace crud_dotNet.Models
{
    public class AddDbContext : DbContext
    {
        public AddDbContext(DbContextOptions<AddDbContext>options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }
    }
}
