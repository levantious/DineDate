using dotenv.net;
using Projects;

var envVars = DotEnv
    .Fluent()
    .WithExceptions()
    .WithEnvFiles("../../../../.env")
    .WithTrimValues()
    .Read();

var builder = DistributedApplication.CreateBuilder(args);

var server = builder
    .AddProject<Projects.DateMe_Server_Chat>("dateme-server-chat", project =>
    {
        project.ExcludeLaunchProfile = true;
    })
    .WithHttpEndpoint(port: int.Parse(envVars["SERVER_CHAT_PORT"]));

var client = builder
        .AddDockerfile("dateme-gui", "../../../../", "src/gui/Dockerfile")
        .WithHttpEndpoint(port: int.Parse(envVars["WEB_GUI_PORT"]), targetPort:8081)
        .WithEnvironment("EXPO_PUBLIC_HUB_URL", $"http://localhost:{envVars["SERVER_CHAT_PORT"]}/chat")
        .WithReference(server)
        .WaitFor(server);

builder.Build().Run();