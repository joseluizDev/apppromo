namespace BackAppPromo.Application.DTOs.InputDto
{
    public class ProdutoInputDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public decimal PrecoPromocional { get; set; }
        public int Quantidade { get; set; }
        public List<IFormFile> Imagens { get; set; }
        public int CategoriaId { get; set; }
        public int UsuarioId { get; set; }
        public string Instagram { get; set; }
        public string Whats { get; set; }
    }
}
