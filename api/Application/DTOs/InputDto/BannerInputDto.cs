namespace BackAppPromo.Application.DTOs.InputDto
{
    public class BannerInputDto
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public IFormFile? Imagem { get; set; }
        public int Temp { get; set; }
    }
}
