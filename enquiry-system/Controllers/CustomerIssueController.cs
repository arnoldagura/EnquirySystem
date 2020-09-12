using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using EnquirySystem.Models;
using EnquirySystem.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace EnquirySystem.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerIssueController : ControllerBase
    {
        private CustomerIssueContext _customerIssueContext;
        public CustomerIssueController(CustomerIssueContext customerIssueContext)
        {
            _customerIssueContext = customerIssueContext;
        }

        [HttpGet("")]
        public ActionResult<List<CustomerIssue>> Getstrings()
        {
            return _customerIssueContext.CustomerIssues.OrderByDescending(x => x.Id).ToList();
        }

        [HttpGet("{email}")]
        public ActionResult<List<CustomerIssue>> GetstringByEmail(string email)
        {
            return _customerIssueContext.CustomerIssues.Where(issue => issue.Email == email).OrderByDescending(x => x.Id).ToList();
        }

        [HttpPost("")]
        public CustomerIssue Poststring(CustomerIssue issue)
        {
            
            issue.DateCreated = DateTimeOffset.Now;
            _customerIssueContext.CustomerIssues.Add(issue);
            _customerIssueContext.SaveChanges();
            return issue;
        }

        [HttpPut("{id}")]
        public ActionResult<CustomerIssue> Putstring(int id, CustomerIssue issue)
        {
            var oldIssue = _customerIssueContext.CustomerIssues.FirstOrDefault(CustomerIssue => CustomerIssue.Id == id);
            oldIssue.Category = issue.Category;
            oldIssue.Email = issue.Email;
            oldIssue.Description = issue.Description;
            oldIssue.DateCreated = DateTimeOffset.Now;
            _customerIssueContext.SaveChanges();
            return oldIssue;
        }

        [HttpDelete("{id}")]
        public ActionResult<int> DeletestringById(int id)
        {
            _customerIssueContext.CustomerIssues.Remove(_customerIssueContext.CustomerIssues.FirstOrDefault(CustomerIssue=> CustomerIssue.Id ==id));
            _customerIssueContext.SaveChanges();
            return id;
        }
    }
}
public class SqliteDateComparer : IComparer<string> {
  public int Compare(string s1, string s2) => DateTime.Compare(DateTime.Parse(s1), DateTime.Parse(s2));
}