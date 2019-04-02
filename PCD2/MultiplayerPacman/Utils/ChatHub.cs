using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultiplayerPacman.Utils
{
    public class ChatHub : Hub
    {

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            string user = Context.User.Identity.Name;
            if(user == null)
            {
                user = "Anonymous";
            }

            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
