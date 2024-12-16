using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackAppPromo.Domain.Entities
{
    public class Produto
    {
        [Key]
        public int Pro_id { get; set; }
        [StringLength(100)]
        public string Pro_titulo { get; set; }
        [StringLength(999)]
        public string Pro_descricao { get; set; }
        [Column(TypeName = "decimal(15,2)")]
        public decimal Pro_preco { get; set; }
        [Column(TypeName = "decimal(15,2)")]
        public decimal Pro_preco_promocional { get; set; }
        public int Pro_quantidade { get; set; }
        public DateOnly Pro_data_cadastrado { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public int Cat_id { get; set; }
        [ForeignKey("Cat_id")]
        public Categoria Categoria { get; set; }
        public int Usu_id { get; set; }
        [ForeignKey("Usu_id")]
        public Usuario Usuario { get; set; }
        [StringLength(100)]
        public string Pro_instagram { get; set; }
        [StringLength(100)]
        public string Pro_whats { get; set; }
    }
}
