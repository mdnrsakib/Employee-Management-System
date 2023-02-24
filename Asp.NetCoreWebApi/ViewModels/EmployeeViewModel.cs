using System.ComponentModel.DataAnnotations;

namespace Asp.NetCoreWebApi.ViewModels
{
    public enum Roles { Administrators = 1, Employees }
    public class EmployeeViewModel
    {
        public string Id { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;

        public string? Address { get; set; }
    
        public DateTime? JoinDate { get; set; }

        public string? Department { get; set; }

        public string? CurrentPostion { get; set; }
        [EnumDataType(typeof(Roles))]
        public string Roles { get; set; } = default!;
    }
}
