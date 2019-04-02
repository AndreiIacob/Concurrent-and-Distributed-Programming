using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;

namespace MultiplayerPacman.Utils
{
    public class PacmanHub : Hub
    {
        const string curGameIdUrl = "https://pcdcosmosdbfunctionapp.azurewebsites.net/api/currentgame?code=7jTKbyIUCp4olvkqDtdVj1ZFIYvpYyKaJPop/SUegDcIRK1qqSRtZA==";
        const string gameStateBaseUrl = "https://pcdcosmosdbfunctionapp.azurewebsites.net/api/game/{0}?code=feEiOhQ0dShBeveVPXFhvDVmZUk1qu86Kct4E2p263q0Ym7XGb0kSQ==";
        const string setGameStateUrl = "https://pcdcosmosdbfunctionapp.azurewebsites.net/api/SetGameState?code=W0aHwhC2mnLmDdGDisjjRCjRsdeU2BnAkQMlbxqFBhOjlUUTgzrM3Q==";
        const int maxPlayers = 8;

        public static void AddScore(string email, float score)
        {
            var url = $"https://pcdfunctionapp.azurewebsites.net/api/AddScore?code=TlOUboj3Cit4nii3c0G14UcEhrk4vQbuAaaiuK4dlEYhQauh2WQlkg==&email={email}&score={score}";


            string responseStr;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                responseStr = reader.ReadToEnd();
            }
        }

        public static string GetStringResponse(string url)
        {
            string responseStr;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                responseStr = reader.ReadToEnd();
            }
            return responseStr;
        }

        public static JObject GetJsonObjResponse(string url)
        {
           string responseStr = GetStringResponse(url);
            try
            {
                return JObject.Parse(responseStr);
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }
            return null;
        }

        public static JArray GetJsonArrResponse(string url)
        {
            string responseStr = GetStringResponse(url);
            try
            {
                return JArray.Parse(responseStr);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return null;
        }

        public static string PostJson(string url, string json)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            string result = null;
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }
            return result;
        }

        public override async Task OnConnectedAsync()
        {
            var jGameId = GetJsonObjResponse(curGameIdUrl);
            var gameId = jGameId["gameId"].ToString();
            var states = GetJsonArrResponse(String.Format(gameStateBaseUrl, gameId));

            if (states.Count > 0)
            {
                var state = states[0];
                var pos = state["PACMEN_POSITION_X"];
                if (state["PACMEN_POSITION_X"].Count() >= maxPlayers)
                    gameId = Guid.NewGuid().ToString();
                string json = "{\"id\":\"LastGameOpened\"," +
               "\"gameId\":\"" + gameId + "\"}";
                PostJson(setGameStateUrl, json);
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await base.OnConnectedAsync();

            try
            {
                await Clients.Caller.SendAsync("ReceiveGameId", gameId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            if (states.Count > 0)
            {
                JObject state = (JObject) states[0];
                await Clients.All.SendAsync("ReceiveState", state);
            }
            Console.WriteLine("Done");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendState(JObject state)
        {
            try
            {
                var json = state.ToString();
                var url = String.Format(gameStateBaseUrl, state["gameId"]);
                var states = GetJsonArrResponse(url);
                if (states.Count > 0)
                {
                    var gameState = states[0];
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            await Clients.All.SendAsync("ReceiveState", state);
        }
    }
}
