using Microsoft.AspNetCore.SignalR.Client;

Console.Title = "Client 2";

var connection = new HubConnectionBuilder()
    .WithUrl("http://localhost:5211/chat?clientname=Client2")
    .WithAutomaticReconnect()
    .WithKeepAliveInterval(TimeSpan.FromMinutes(5))
    .Build();

connection.On<string, string>("ReceiveMessage", (user, message) =>
{
    Console.WriteLine($"{user}: {message}");
});

try
{
    await connection.StartAsync();
    //await connection.InvokeAsync("Test");
    Console.WriteLine("Connected to chat server.");
}
catch (Exception ex)
{
    Console.WriteLine($"Connection error: {ex.Message}");
    return;
}

while (true)
{
    Console.Write("Enter your message: ");
    var message = Console.ReadLine();

    try
    {
        await connection.InvokeAsync("Test");
        //await connection.InvokeAsync("SendMessage", "Client 2", message);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error sending message: {ex.Message}");
    }
}
