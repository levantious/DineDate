using Projects;

var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.DateMe_Server_Chat>("SignalRServer");

builder.Build().Run();