using Asp.NetCoreWebApi.Models;
using Asp.NetCoreWebApi.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        
        private readonly EMSDbContext db;
        private readonly UserManager<Employee> userManager;

        public EmployeesController(EMSDbContext db, UserManager<Employee> userManager)
        {
            this.db = db;
            this.userManager = userManager;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {

            var data = await db.Users.Include(u => u.JobDetail).ToListAsync();
            return data;
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> GetEmployeeViewModels()
        {

            var data = await db.Users.Include(u => u.JobDetail).ToListAsync();
            List<EmployeeViewModel> dataVM = new List<EmployeeViewModel>();
            data.ForEach(u =>
            {
                var vm = new EmployeeViewModel
                {
                    Id = u.Id,
                    UserName = u.UserName ?? "",
                    Email = u.Email ?? "",
                    Address = u.Address ?? "",
                    JoinDate = u.JobDetail != null ? u.JobDetail.JoinDate : DateTime.Today,
                    Department = u.JobDetail != null ? u.JobDetail.Department : "",
                    CurrentPostion = u.JobDetail != null ? u.JobDetail.CurrentPostion : ""


                };
                var roles = userManager.GetRolesAsync(u);
                vm.Roles = string.Join(",", roles.Result.ToArray());
                dataVM.Add(vm);
            });
            return dataVM;
        }
        [HttpGet("VM/{username}")]
        public async Task<ActionResult<EmployeeViewModel>> GetEmployeeViewModel(string username)
        {
            var u = await db.Users.Include(x => x.JobDetail).Where(x => x.UserName == username).FirstOrDefaultAsync();
            var vm = new EmployeeViewModel
            {
                Id = u.Id,
                UserName = u.UserName ?? "",
                Email = u.Email ?? "",
                PhoneNumber = u.PhoneNumber ?? "",
                Address = u.Address ?? "",
                JoinDate = u.JobDetail != null ? u.JobDetail.JoinDate : DateTime.Today,
                Department = u.JobDetail != null ? u.JobDetail.Department : "",
                CurrentPostion = u.JobDetail != null ? u.JobDetail.CurrentPostion : ""


            };
            var roles = await userManager.GetRolesAsync(u);
            vm.Roles = string.Join(",", roles.ToArray());
            return vm;
        }
        [HttpPut]
        public async Task<ActionResult<EmployeeViewModel>> PutEmployee(EmployeeViewModel model)
        {
            var u = await db.Users.Include(x => x.JobDetail).Where(x => x.UserName == model.UserName).FirstOrDefaultAsync();
            if (u == null) return NotFound();
            u.Email = model.Email;
            u.PhoneNumber = model.PhoneNumber;
            u.Address = model.Address;
            u.JobDetail = u.JobDetail ?? new JobDetail();
            u.JobDetail.JoinDate = model.JoinDate;
            u.JobDetail.Department = model.Department;
            u.JobDetail.CurrentPostion = model.CurrentPostion;
            await db.SaveChangesAsync();
            model.Id = model.Id;
            return model;

        }
        [HttpPost]

        public async Task<ActionResult<EmployeeViewModel>> PostEmployee(EmployeeViewModel model)
        {
            var u = await db.Users.Include(x => x.JobDetail).FirstOrDefaultAsync();
            if (u == null) return NotFound();
            u.Email = model.Email;
            u.PhoneNumber = model.PhoneNumber;
            u.Address = model.Address;
            u.JobDetail = u.JobDetail ?? new JobDetail();
            u.JobDetail.JoinDate = model.JoinDate;
            u.JobDetail.Department = model.Department;
            u.JobDetail.CurrentPostion = model.CurrentPostion;
            await db.SaveChangesAsync();
            model.Id = model.Id;
            return model;

        }
    }
}
