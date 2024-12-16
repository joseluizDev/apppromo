using BackAppPromo.Domain.Entities;

namespace BackAppPromo.Application.DTOs.OutputDto
{
    public class ReservaOutputDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Instagram { get; set; }
        public string Endereco { get; set; }
        public string? Referencia { get; set; }
        public bool Entrega { get; set; }
        public bool Retirada { get; set; }
        public int Quantidade { get; set; }
        public decimal ValorTotal { get; set; }
        public ProdutoOutputDto Produto { get; set; }
    }
}
