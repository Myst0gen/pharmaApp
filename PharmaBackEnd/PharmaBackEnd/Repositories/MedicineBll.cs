using PharmaBackEnd.DTO;
using PharmaBackEnd.Helpers;
using PharmaBackEnd.Interfaces;
using PharmaBackEnd.Models;

namespace PharmaBackEnd.Repositories
{
    public class MedicineBll(JsonHelper<Medicines> helper) : IMedicineBll
    {
        public int AddMedicine(Medicines medicine)
        {
            try
            {
                
                var existing = helper.ReadFromFile<Medicines>();
                medicine.Id = existing.Count > 0 ? existing.Max(m => m.Id) + 1 : 1;
                helper.AddToFile(medicine);
                return 1; // success
            }
            catch (Exception ex)
            {
                // Handle the exception (e.g., log it)
                Console.WriteLine($"An error occurred: {ex.Message}");
                return -1; // failure
            }
        }

        public List<MedicineDTO> GetAllMedicines()
        {
            try
            {
                var medicines = helper.ReadFromFile<Medicines>();
                return medicines.Select(m => new MedicineDTO
                {
                    Name = m.Name,
                    ExpiryDate = m.ExpiryDate,
                    Quantity = m.Quantity,
                    Price = m.Price,
                    Brand = m.Brand,
                    colorCode = m.ExpiryDate < DateTime.Now.AddMonths(1) ? "bg-red-500" : m.Quantity < 10 ? "bg-yellow-500" : "bg-green-500"
                }).ToList();
            }
            catch (Exception ex)
            {
                // Handle the exception (e.g., log it)
                Console.WriteLine($"An error occurred: {ex.Message}");
                return new List<MedicineDTO>(); // Return an empty list on failure
            }
        }
    }
}
