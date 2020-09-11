using System;
namespace EnquirySystem.Models
{
    public class CustomerIssue{
        public int Id { get; set; }
        public string Category { get; set; }
        public string Email { get; set; }
        public string Description { get; set;}
        public DateTimeOffset DateCreated { get; set; }
    }

}
