namespace Asp.NetCoreWebApi.HostedServices
{
    public class IdentityDbSeederHostedService:IHostedService
    {
        private readonly IServiceProvider serviceProvider;
        public IdentityDbSeederHostedService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = serviceProvider.CreateScope();
            var seeder = scope.ServiceProvider.GetRequiredService<IdentityDbSeeder>();
            await seeder.SeedAsync();

        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}