using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Reflection;

namespace JournalManager.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection RegisterDependencies(this IServiceCollection services)
        {
            Assembly dataAssembly = Assembly.Load(new AssemblyName("JournalManager.Data"));

            services.Scan(scan => scan.FromAssemblies(dataAssembly)
                .AddClasses(classes => classes.Where(c => c.Name.EndsWith("Repository")))
                .AsImplementedInterfaces()
                .WithScopedLifetime());

            return services;
        }
    }
}
