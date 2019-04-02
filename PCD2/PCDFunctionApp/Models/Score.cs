using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PCDFunctionApp.Models
{
    public class Score
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "Player Email")]
        public string Email { get; set; }
        [JsonProperty(PropertyName = "Score")]
        public float ScoreValue { get; set; }
        [JsonProperty(PropertyName = "Date")]
        public DateTime Date { get; set; }
    }
}
