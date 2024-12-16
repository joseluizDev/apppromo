using System.ComponentModel.DataAnnotations;

namespace BackAppPromo.Domain.Entities
{
    public class Usuario
    {
        [Key]
        public int Usu_id { get; set; }
        [StringLength(100)]
        public string Usu_email { get; set; }
        [StringLength(100)]
        public string Usu_senha { get; set; }
    }
}
