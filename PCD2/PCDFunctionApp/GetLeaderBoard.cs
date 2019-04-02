using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using PCDFunctionApp.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace PCDFunctionApp
{
    public static class GetLeaderBoard
    {
        [FunctionName("GetLeaderBoard")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            var rows = new List<Score>();
            // Get the connection string from app settings and use it to create a connection.
            var str = Environment.GetEnvironmentVariable("sqldb_connection");
            using (SqlConnection conn = new SqlConnection(str))
            {
                conn.Open();

                var text = "SELECT Email, ScoreValue, Date FROM Scores ORDER BY ScoreValue DESC";

                using (SqlCommand cmd = new SqlCommand(text, conn))
                {
                    // Execute the command and log the # rows affected.
                    SqlDataReader rdr = cmd.ExecuteReader();
                    if (rdr.HasRows)
                    {
                        while (rdr.Read())
                        {
                            var row = new Score()
                            {
                                Email = rdr.GetString(0),
                                ScoreValue = rdr.GetFloat(1),
                                Date = rdr.GetDateTime(2),
                            };
                            rows.Add(row);
                        }
                    }
                }
            }
            var jsonToReturn = JsonConvert.SerializeObject(rows);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(jsonToReturn, Encoding.UTF8, "application/json")
            };
        }
    }
}
