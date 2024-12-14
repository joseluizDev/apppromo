using System.ComponentModel.DataAnnotations;

namespace BackAppPromo.Domain.Entities
{
    public class Categoria
    {
        [Key]
        public int Cat_id { get; set; }
        [StringLength(100)]
        public string Cat_nome { get; set; }
    }
}
