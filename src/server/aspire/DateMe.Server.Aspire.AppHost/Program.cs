using Projects;

var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.DateMe_Server_Chat>("server");

var client = builder.AddDockerfile("client", "../../../gui", "Dockerfile")
                    .WithHttpEndpoint(port: 8082, targetPort:8081)
                    .WithReference(server)
                    .WaitFor(server);

builder.Build().Run();