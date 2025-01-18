using Microsoft.AspNetCore.SignalR;

namespace DateMe.Server.Chat
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            try
            {
                await Clients.All.SendAsync("ReceiveMessage", user, message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SendMessage: {ex.Message}");
                throw;
            }
        }

        public async Task Test()
        {
            try
            {
                Console.WriteLine("A hit");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in Test: {ex.Message}");
                throw;
            }
        }


        public override async Task OnConnectedAsync()
        {
            var clientName = Context.GetHttpContext()?.Request.Query["clientname"];

            if (!string.IsNullOrEmpty(clientName))
            {
                //UserConnections[Context.ConnectionId] = username;

                Console.WriteLine($"Client connected: {clientName}, ID = {Context.ConnectionId}");


            }
            else
            {
                Console.WriteLine($"Client connected: {Context.ConnectionId}");
            }


            await base.OnConnectedAsync();

            await Task.Delay(300);
            await Clients.All.SendAsync("ReceiveMessage", clientName, "Server confirms connecting.");
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {            
            Console.WriteLine($"Client disconnected: {Context.ConnectionId}");

            await base.OnDisconnectedAsync(exception);
        }
    }
}
