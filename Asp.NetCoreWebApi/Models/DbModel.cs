using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Asp.NetCoreWebApi.Models
{
    public class Employee: IdentityUser
    {
        [StringLength(50)]
        public string? Name { get; set; } = default!;
        [StringLength(150)]
        public string? Address { get; set; } = default!;
        [Column(TypeName = "money")]
        public decimal? Salary { get; set; }
        public JobDetail? JobDetail { get; internal set; }
    }
    public class JobDetail
    {
        [Required, Key, ForeignKey("Employee"), StringLength(450)]
        public string Id { get; set; } = default!;
        [Column(TypeName = "date")]
        public DateTime? JoinDate { get; set; }
        [StringLength(40)]
        public string? Department { get; set; }
        [StringLength(30)]
        public string? CurrentPostion { get; set; }
        public virtual Employee? Employee { get; set; } = default!;
    }
    public class EMSDbContext : IdentityDbContext<Employee>
    {
        public EMSDbContext(DbContextOptions<EMSDbContext> options) : base(options) { }
        public DbSet<JobDetail> JobDetails { get; set; }

    }
}
