using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.Logging;
using System;

Console.Title = "Client 1";

var connection = new HubConnectionBuilder()
    .WithUrl("http://localhost:7001/chat?clientname=Client1")
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
        await connection.InvokeAsync("SendMessage", "Client 1", message);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error sending message: {ex.Message}");
    }
}
