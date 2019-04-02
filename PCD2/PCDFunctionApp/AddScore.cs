using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace PCDFunctionApp
{
    public static class AddScore
    {
        [FunctionName("AddScore")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            // parse query parameter
            string email = req.GetQueryNameValuePairs()
                .FirstOrDefault(q => string.Compare(q.Key, "email", true) == 0)
                .Value;

            string scoreStr = req.GetQueryNameValuePairs()
                .FirstOrDefault(q => string.Compare(q.Key, "score", true) == 0)
                .Value;

            if (email == null || scoreStr == null)
            {
                // Get request body
                dynamic data = await req.Content.ReadAsAsync<object>();
                email = data?.email;
                scoreStr = data?.score;
            }

            if (email == null || scoreStr == null)
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, "Please pass an email and score on the query string or in the request body");
            }

            if (!Double.TryParse(scoreStr, out double score))
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, "Please pass a numer as the score on the query string or in the request body");
            }

            // Get the connection string from app settings and use it to create a connection.
            var str = Environment.GetEnvironmentVariable("sqldb_connection");
            using (SqlConnection conn = new SqlConnection(str))
            {
                conn.Open();
                SqlCommand command = new SqlCommand(null, conn);
                // Create and prepare an SQL statement.
                command.CommandText =
                            "INSERT INTO Scores (Email, ScoreValue, Date) " +
                            "VALUES (@email, @score, @date)";

                SqlParameter emailParam = new SqlParameter("email", SqlDbType.VarChar, 100);
                SqlParameter scoreParam = new SqlParameter("score", SqlDbType.Float, 4);
                SqlParameter dateParam = new SqlParameter("date", SqlDbType.Date);

                emailParam.Value = email;
                scoreParam.Value = score;
                dateParam.Value = DateTime.Now;

                command.Parameters.Add(emailParam);
                command.Parameters.Add(scoreParam);
                command.Parameters.Add(dateParam);

                // Call Prepare after setting the Commandtext and Parameters.
                command.Prepare();
                
                command.ExecuteNonQuery();
            }

                return req.CreateResponse(HttpStatusCode.OK, "Score Added to Leaderboard");
        }
    }
}
