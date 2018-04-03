using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Reflection;

namespace JournalManager.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection RegisterDependencies(this IServiceCollection services)
        {
            services.AddSingleton<Jwt>();
            return RegisterRepositories(services);
        }

        public static IServiceCollection RegisterConfigurations(this IServiceCollection services, IConfiguration configuration)
        {
            var configurationModels = Assembly.Load(new AssemblyName("JournalManager.Data"))
                                        .GetTypes()
                                        .Where(type => type.IsClass && type.Namespace != null && type.Namespace.Contains("Models.Configuration"));

            foreach (var cls in configurationModels)
            {
                var configInstance = Activator.CreateInstance(cls);
                configuration.GetSection(cls.Name).Bind(configInstance);
                services.AddSingleton(cls, configInstance);
            }

            return services;
        }

        private static IServiceCollection RegisterRepositories(IServiceCollection services)
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
