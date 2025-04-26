using DateMe.Server.Chat;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSignalR();

builder.AddServiceDefaults();

var webUIPort = builder.Configuration.GetValue(typeof(int), "WEB_GUI_PORT");
var webUIOrigin = builder.Configuration.GetValue(typeof(string), "WEB_UI_ORIGIN_URL");

Console.WriteLine($"CORS policy will be allowed for {webUIOrigin}:{webUIPort}.");

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins($"{webUIOrigin}:{webUIPort}")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors();

app.MapControllers();
app.MapHub<ChatHub>("/chat");

app.MapDefaultEndpoints();

// app.Run();

// Start the application without blocking.
app.Start();

Console.WriteLine("Listening on: " + string.Join(", ", app.Urls));

app.WaitForShutdown();

