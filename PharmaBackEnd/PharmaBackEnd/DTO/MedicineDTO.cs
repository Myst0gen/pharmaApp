namespace PharmaBackEnd.DTO
{
    public class MedicineDTO
    {
        public string Name { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Brand { get; set; }
        public string colorCode { get; set; }
    }
}
