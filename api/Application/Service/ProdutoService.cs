using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.DTOs.OutputDto;
using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Exceptions;
using BackAppPromo.Domain.Interfaces;

namespace BackAppPromo.Application.Service
{
    public class ProdutoService
    {
        private readonly IProdutoRepository _produtoRepository;
        private readonly IImagemRepository _imagemRepository;
        private readonly IMinioStorage _minioStorage;

        public ProdutoService(IProdutoRepository produtoRepository, IImagemRepository imagemRepository, IMinioStorage minioStorage)
        {
            _produtoRepository = produtoRepository;
            _imagemRepository = imagemRepository;
            _minioStorage = minioStorage;
        }

        public async Task<List<ProdutoOutputDto>> ObterProdutos()
        {
            var produtos = await _produtoRepository.ObterProdutos();
            return await ProdutoDto(produtos, true);
        }

        public async Task<ProdutoOutputDto> ObterProdutoPorId(int id)
        {
            var produtos = await _produtoRepository.ObterProdutoPorId(id);
            return await ProdutoDto(produtos, false);
        }

        public async Task<Produto> AdicionarProduto(ProdutoInputDto produto)
        {
            Produto map = MapProduto(produto);

            Produto retorno = await _produtoRepository.AdicionarProduto(map);

            if (retorno != null)
            {
                foreach (var imagemFile in produto.Imagens)
                {
                 
                    string bucketName = "apppromo";
                    string type = imagemFile.ContentType;
                    string typeImg = "webp";
                    string objectName = $"{Guid.NewGuid()}.{typeImg}";
                    string contentType = type.Split('/')[0] + "/" + typeImg;
                    using (var stream = imagemFile.OpenReadStream())
                    {
                        string url = await _minioStorage.UploadFileAsync(bucketName, objectName, stream, type);
                        Imagem imagem = MapImagem(retorno, url);

                        var img = await _imagemRepository.AdicionarImagem(imagem);

                        if (img == null)
                        {
                            throw new ImagemInvalidoException("Uma ou mais imagens não foram salvas");
                        }
                    }
                }

                return retorno;
            }
            else
            {
                return null;
            }
        }

        public async Task<List<ProdutoOutputDto>> ObterProdutosPorCategoria(int categoriaId)
        {
            var produtos = await _produtoRepository.ObterProdutosPorCategoria(categoriaId);
            return await ProdutoDto(produtos, true);
        }

        public async Task<Produto> AtualizarProduto(ProdutoInputDto produto)
        {
            Produto map = MapProduto(produto);
            Produto retorno = await _produtoRepository.AtualizarProduto(map);

            if (retorno != null)
            {
                // Se novas imagens foram enviadas, processe-as
                if (produto.Imagens != null && produto.Imagens.Any())
                {
                    foreach (var imagemFile in produto.Imagens)
                    {
                        string bucketName = "apppromo";
                        string type = imagemFile.ContentType;
                        string typeImg = type.Split('/')[1];
                        string objectName = $"{Guid.NewGuid()}.webp";

                        using (var stream = imagemFile.OpenReadStream())
                        {
                            // Faz o upload da nova imagem
                            string url = await _minioStorage.UploadFileAsync(bucketName, objectName, stream, type);
                            Imagem imagem = MapImagem(retorno, url);
                            var img = await _imagemRepository.AdicionarImagem(imagem);

                            if (img == null)
                            {
                                throw new ImagemInvalidoException("Uma ou mais imagens não foram salvas.");
                            }
                        }
                    }
                }
            }

            return retorno;
        }


        public async Task<bool> RemoverProduto(int id)
        {
            return await _produtoRepository.RemoverProduto(id);
        }

        private async Task<dynamic> ProdutoDto(dynamic produtos, bool lista = true)
        {
            var produtoOutputDtos = new List<ProdutoOutputDto>();

            var listaProdutos = lista ? produtos : new List<Produto> { produtos };

            foreach (var produto in listaProdutos)
            {
                List<Imagem> imagens = await _imagemRepository.ObterImagensPorId(produto.Pro_id);
                var imageOutputDtos = imagens.MapImagem();

                var produtoOutputDto = new ProdutoOutputDto
                {
                    Id = produto.Pro_id,
                    Titulo = produto.Pro_titulo,
                    Descricao = produto.Pro_descricao,
                    Preco = produto.Pro_preco,
                    PrecoPromocional = produto.Pro_preco_promocional,
                    Quantidade = produto.Pro_quantidade,
                    Imagens = imageOutputDtos,
                    Instagram = produto.Pro_instagram,
                    Whats = produto.Pro_whats
                };

                produtoOutputDtos.Add(produtoOutputDto);
            }

            return lista ? produtoOutputDtos : produtoOutputDtos.FirstOrDefault();
        }

        private List<ImageOuputDto> imageOuputDtos(List<Imagem> imagens)
        {
            var imageOutputDtos = new List<ImageOuputDto>();
            foreach (var imagem in imagens)
            {
                var imageOutputDto = new ImageOuputDto
                {
                    Id = imagem.Img_id,
                    Url = imagem.Img_url
                };
                imageOutputDtos.Add(imageOutputDto);
            }
            return imageOutputDtos;
        }

        private Produto MapProduto(ProdutoInputDto produto)
        {
            return new Produto
            {
                Pro_id = produto.Id,
                Pro_titulo = produto.Titulo,
                Pro_descricao = produto.Descricao,
                Pro_preco = produto.Preco,
                Pro_preco_promocional = produto.PrecoPromocional,
                Pro_quantidade = produto.Quantidade,
                Cat_id = produto.CategoriaId,
                Usu_id = produto.UsuarioId,
                Pro_instagram = produto.Instagram,
                Pro_whats = produto.Whats
            };
        }

        private Imagem MapImagem(Produto produto, string url)
        {
            return new Imagem
            {
                Img_url = url,
                Pro_id = produto.Pro_id
            };
        }
    }
}
