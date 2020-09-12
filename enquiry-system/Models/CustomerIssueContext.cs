using Microsoft.EntityFrameworkCore;

namespace EnquirySystem.Models {
    public class CustomerIssueContext : DbContext {
        public CustomerIssueContext (DbContextOptions<CustomerIssueContext> options) : base (options) { }
        public DbSet<CustomerIssue> CustomerIssues { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
