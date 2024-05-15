public interface IPersistor
{
    IEnumerable<PilotModel> LoadPilots();

    // IEnumerable<string> GetEmails();

    PilotModel LoadPilot(string email);

    void SavePilot(PilotModel pilot);
    Task SaveFile(IFormFile file, string email); 
    byte[] GetFileByEmail(string email, string ext);
    
}