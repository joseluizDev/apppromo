using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.DTOs.OutputDto;
using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Infrastructure.Repositories;

namespace BackAppPromo.Application.Service
{
    public class CategoriaSerivce
    {
        private readonly ICategoriaRepository _categoriaRepository;
        public CategoriaSerivce(ICategoriaRepository categoriaRepository)
        {
            _categoriaRepository = categoriaRepository;
        }

        public async Task<List<CategoriaOutputDto>> ObterCategorias()
        {
            var categorias = await _categoriaRepository.ObterCategorias();
            return await CategoriaDto(categorias, true);
        }

        public async Task<CategoriaOutputDto> ObterCategoriaPorId(int id)
        {
            var categorias = await _categoriaRepository.ObterCategoriaPorId(id);
            return await CategoriaDto(categorias, false);
        }

        public async Task<Categoria> AdicionarCategoria(CategoriaInputDto categoria)
        {
            Categoria map = MapCategoria(categoria);
            Categoria retorno = await _categoriaRepository.AdicionarCategoria(map);
            if (retorno != null)
            {
                return retorno;
            }

            return null;
        }

        public async Task<Categoria> AtualizarCategoria(CategoriaInputDto categoria)
        {
            Categoria map = MapCategoria(categoria);
            Categoria retorno = await _categoriaRepository.AtualizarCategoria(map);
            if (retorno != null)
            {
                return retorno;
            }

            return null;
        }

        public async Task<bool> DeletarCategoria(int id)
        {
            return await _categoriaRepository.RemoverCategoria(id);
        }

        private Categoria MapCategoria(CategoriaInputDto categoria)
        {
            return new Categoria
            {
                Cat_id = categoria.Id,
                Cat_nome = categoria.Nome
            };
        }

        private async Task<dynamic> CategoriaDto(dynamic categorias, bool lista = true)
        {
            var categoriaOutputDtos = new List<CategoriaOutputDto>();

            var listaCategorias = lista ? categorias : new List<Categoria> { categorias };

            foreach (var categoria in listaCategorias)
            {
                var categoariaOutpuDto = new CategoriaOutputDto
                {
                    Id = categoria.Cat_id,
                    Nome = categoria.Cat_nome
                };

                categoriaOutputDtos.Add(categoariaOutpuDto);
            }

            return lista ? categoriaOutputDtos : categoriaOutputDtos.FirstOrDefault();
        }
    }
}
