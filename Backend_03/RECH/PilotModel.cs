using System.Text.Json.Serialization;

public class PilotModel
{// hier wird die Klasse PilotModel deklariert

  [JsonPropertyName("PilotName")] //JsonPropertyName gibt den Namen des JSON-Objekts an, das serialisiert oder deserialisiert werden soll.
  public string PilotName { get; set; } //hier wird der Name des Piloten deklariert

  [JsonPropertyName("PilotEmail")]
  public string PilotEmail { get; set; }

  [JsonPropertyName("PilotPicExt")]
  public string PilotPicExt { get; set; }
  [JsonPropertyName("PilotPic")]
  public byte[] PilotPic { get; set; }



  [JsonPropertyName("WettbewerbthreeD")]
  public string WettbewerbthreeD { get; set; }
  [JsonPropertyName("WettbewerbScale")]
  public string WettbewerbScale { get; set; }
  [JsonPropertyName("WettbewerbSpeed")]
  public string WettbewerbSpeed { get; set; }
  // hier werden die Variablen deklariert

  public PilotModel()
  {
    PilotName = string.Empty;
    PilotEmail = string.Empty;
    PilotPicExt = string.Empty;   
    PilotPic = new byte[0];
    WettbewerbthreeD = bool.FalseString;
    WettbewerbScale = bool.FalseString;
    WettbewerbSpeed = bool.FalseString;
    // hier werden die Werte der Variablen initialisiert

  }
}
