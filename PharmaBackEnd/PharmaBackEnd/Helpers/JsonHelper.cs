using System.Text.Json;

namespace PharmaBackEnd.Helpers
{
    public class JsonHelper<T>
    {
        private readonly string _filePath;
        private readonly JsonSerializerOptions _options = new JsonSerializerOptions() { WriteIndented = true };

        public JsonHelper(string filePath)
        {
            _filePath = filePath;
        }

        //Read Data from JSON file and return a list
        public List<T> ReadFromFile<T>()
        {
            if (!File.Exists(_filePath))
            {
                return new List<T>();
            }
            var jsonData = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<T>>(jsonData, _options) ?? new List<T>();
        }

        //Write a list of data to JSON file
        public void WriteToFile<T>(List<T> data)
        {
            var jsonData = JsonSerializer.Serialize(data, _options);
            File.WriteAllText(_filePath, jsonData);
        }

        //Append a single item to the JSON file
        public void AddToFile<T>(T item)
        {
            var data = ReadFromFile<T>();
            data.Add(item);
            WriteToFile(data);
        }
    }
}
