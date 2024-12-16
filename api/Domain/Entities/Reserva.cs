using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackAppPromo.Domain.Entities
{
    public class Reserva
    {
        [Key]
        public int Res_id { get; set; }
        [StringLength(100)]
        public string Res_nome { get; set; }
        [StringLength(100)]
        public string Res_email { get; set; }
        [StringLength(100)]
        public string Res_telefone { get; set; }
        [StringLength(100)]
        public string Res_instagram { get; set; }
        [StringLength(100)]
        public string Res_endereco { get; set; }
        public string Res_referencia { get; set; }
        public bool Res_entrega { get; set; }
        public bool Res_retirada { get; set; }
        public int Res_quantidade { get; set; }
        public decimal Res_valor_total { get; set; }
        public DateOnly Res_data_reserva { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public int Pro_id { get; set; }
        [ForeignKey("Pro_id")]
        public Produto Produto { get; set; }
    }
}
