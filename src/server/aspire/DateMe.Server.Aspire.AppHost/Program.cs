using dotenv.net;
using Projects;

var envVars = DotEnv
    .Fluent()
    .WithExceptions()
    .WithEnvFiles("../../.env")
    .WithTrimValues()
    .Read();

var builder = DistributedApplication.CreateBuilder(args);

var server = builder
    .AddProject<Projects.DateMe_Server_Chat>("server");

var client = builder
        .AddDockerfile("client", "../../../gui", "Dockerfile")
        .WithHttpEndpoint(port: 8082, targetPort:8081)
        .WithEnvironment("EXPO_PUBLIC_HUB_URL", $"{envVars["ASPNETCORE_URLS"]}/chat")
        .WithReference(server)
        .WaitFor(server);

builder.Build().Run();