using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
public class Persistor : IPersistor
{
    const string _PATH = "./pilotenliste/";
    public IEnumerable<PilotModel> LoadPilots()
    {
        foreach (string file in Directory.EnumerateFiles(_PATH, "*profile.json"))//für jedes File im Ordner wird die Schleife durchlaufen
        {
            string contents = File.ReadAllText(file);//contentes ist der Inhalt des json files, welcher in der schleife durchlaufen wird
              var pilot = JsonSerializer.Deserialize<PilotModel>(contents);// Liest einen JSON-Wert (einschließlich Objekten oder Arrays) aus dem bereitgestellten Reader und
                                                                         // konvertiert ihn in einen instance eines angegebenen Typs.
            // pilot.PilotPic = this.GetFileByEmail(pilot.PilotEmail, pilot.PilotPicExt);
            yield return pilot;//gibt den Piloten zurück, als instance des PilotModels
        }
    }
  //es wird immer alles ausgelesen aus der json datei, auch wenn nur ein Wert geändert wird und gespeichert wird oder ein neuer Pilot hinzugefügt wird, welcher nicht alle Werte hat
    public void SavePilot(PilotModel pilot)
    {
        var fileName = _PATH + pilot.PilotEmail + ".profile.json";
        Console.WriteLine(pilot.ToString()); //gibt den Piloten als string zurück
        string jsonString = JsonSerializer.Serialize(pilot); //Serialisiert das angegebene Objekt in eine JSON-Zeichenfolge.
        File.WriteAllText(fileName, jsonString); //Schreibt den Inhalt der JSON-Zeichenfolge in das json file
        Console.WriteLine(File.ReadAllText(fileName)); //gibt den Inhalt des json files zurück
    }

    public async Task SaveFile(IFormFile file, string email)
    {
        string extension = Path.GetExtension(file.FileName).ToLower();//extension ist die extension des Bildes, welches hochgeladen wird, in kleingeschriebenen Buchstaben
        var fileName = _PATH + email + extension; //fileName ist der Pfad zum Bild, welcher aus dem email und der extension besteht
        using var stream = File.OpenWrite(fileName); //öffnet das Bild zum schreiben.   
        await file.CopyToAsync(stream);
    }

    public byte[] GetFileByEmail(string email, string ext)//gibt das Bild des Piloten zurück
    {
        var path = _PATH + email + "." + ext; //path ist der Pfad zum Bild, welcher aus dem email und der extension (.jpg oder .png) besteht
        if (File.Exists(path))
        {
            return File.ReadAllBytes(path);
        }
        return Array.Empty<byte>(); //returns an empty array of bytes for the image
    }

    public PilotModel LoadPilot(string email)
    {
        var file = _PATH + email + ".profile.json";//file ist der Pfad zum json file
        string contents = File.ReadAllText(file); //contents ist der Inhalt des json files
        return JsonSerializer.Deserialize<PilotModel>(contents); //gibt den Inhalt des json files als instance des PilotModels zurück

    }

    public IEnumerable<string> GetEmails()
    {
        foreach (string file in Directory.EnumerateFiles(_PATH, "*profile.json"))//für jedes File im Ordner wird die Schleife durchlaufen wo die extension .profile.json ist
        {
            var result = Path.GetFileNameWithoutExtension(file); //gibt den Dateinamen ohne extension zurück
            result = result.Substring(0, result.LastIndexOf('.')); //gibt den Dateinamen zurück, ohne die extension .profile.json, also nur die email
            yield return result;
            //yield return JsonSerializer.Deserialize<PilotModel>(email);
        }
    }
}
