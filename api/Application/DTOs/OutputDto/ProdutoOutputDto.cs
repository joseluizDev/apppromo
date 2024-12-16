namespace BackAppPromo.Application.DTOs.OutputDto
{
    public class ProdutoOutputDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public decimal PrecoPromocional { get; set; }
        public int Quantidade { get; set; }
        public string Instagram { get; set; }
        public string Whats { get; set; }
        public List<ImageOuputDto> Imagens { get; set; }
    }
}
