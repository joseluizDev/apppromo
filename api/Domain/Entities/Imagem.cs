using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BackAppPromo.Application.DTOs.OutputDto;
using BackAppPromo.Domain.Entities;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace BackAppPromo.Domain.Entities
{
    public class Imagem
    {
        [Key]
        public int Img_id { get; set; }
        [StringLength(999)]
        public string Img_url { get; set; }
        public int Pro_id { get; set; }
        [ForeignKey("Pro_id")]
        public Produto Produto { get; set; }
    }
}

public static class ImagemExtension
{
    public static ImageOuputDto MapImagem(this Imagem img)
    {
        return new ImageOuputDto
        {
            Id = img.Img_id,
            Url = img.Img_url,
        };
    }

    public static List<ImageOuputDto> MapImagem(this List<Imagem> img)
    {
        return img.Select(x => x.MapImagem()).ToList();
    }
}
