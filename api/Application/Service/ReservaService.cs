using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.DTOs.OutputDto;
using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Exceptions;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Infrastructure.Repositories;

namespace BackAppPromo.Application.Service
{
    public class ReservaService
    {
        private readonly IReservaRepository _reservaRepository;
        private readonly IProdutoRepository _produtoRepository;

        public ReservaService(IReservaRepository reservaRepository, IProdutoRepository produtoRepository)
        {
            _reservaRepository = reservaRepository;
            _produtoRepository = produtoRepository;
        }

        public async Task<List<ReservaOutputDto>> ObterReservas()
        {
            List<Reserva> reservas = await _reservaRepository.ObterReservas();
            return await ReservaDto(reservas);
        }

        public async Task<Reserva> ObterReservaPorId(int id)
        {
            return await _reservaRepository.ObterReservaPorId(id);
        }

        public async Task<ReservaOutputDto> AdicionarReserva(ReservaInputDto reserva)
        {
            Reserva map = MapReserva(reserva);

            Produto produto = await _produtoRepository.ObterProdutoPorId(map.Pro_id);

            if (reserva.Quantidade > produto.Pro_quantidade)
            {
                throw new ReservaInvalidoException("Quantidade solicitada excede o estoque disponível.");
            }

            map.Res_valor_total = (produto.Pro_preco_promocional > 0 ?
                                    produto.Pro_preco_promocional :
                                    produto.Pro_preco) * reserva.Quantidade;

            produto.Pro_quantidade -= reserva.Quantidade;

            Produto atualizado = await _produtoRepository.AtualizarProduto(produto);

            if (atualizado == null)
            {
                throw new ReservaInvalidoException("Erro ao atualizar o produto no banco de dados.");
            }

            Reserva retorno = await _reservaRepository.AdicionarReserva(map);
            return (await ReservaDto([retorno])).FirstOrDefault();
        }

        public async Task<Reserva> AtualizarReserva(ReservaInputDto reserva)
        {
            Reserva map = MapReserva(reserva);
            Produto produto = await _produtoRepository.ObterProdutoPorId(map.Pro_id);
            map.Res_valor_total = produto.Pro_preco * map.Res_quantidade;
            return await _reservaRepository.AtualizarReserva(map);
        }

        public async Task<bool> RemoverReserva(int id)
        {
            return await _reservaRepository.RemoverReserva(id);
        }

        private async Task<List<ReservaOutputDto>> ReservaDto(List<Reserva> reservas)
        {
            var reservaDtos = new List<ReservaOutputDto>();

            foreach (var reserva in reservas)
            {
                var produto = await _produtoRepository.ObterProdutoPorId(reserva.Pro_id);
                if (produto == null)
                {
                    throw new ProdutoNaoEncontradoException("Produto não encontrado.");
                }

                var reservaDto = new ReservaOutputDto
                {
                    Id = reserva.Res_id,
                    Nome = reserva.Res_nome,
                    Email = reserva.Res_email,
                    Instagram = reserva.Res_instagram,
                    Telefone = reserva.Res_telefone,
                    Endereco = reserva.Res_endereco,
                    Referencia = reserva.Res_referencia,
                    Entrega = reserva.Res_entrega,
                    Retirada = reserva.Res_retirada,
                    Quantidade = reserva.Res_quantidade,
                    ValorTotal = reserva.Res_valor_total,
                    Produto = new ProdutoOutputDto
                    {
                        Id = produto.Pro_id,
                        Titulo = produto.Pro_titulo,
                        Descricao = produto.Pro_descricao,
                        Preco = produto.Pro_preco,
                        PrecoPromocional = produto.Pro_preco_promocional,
                        Quantidade = produto.Pro_quantidade
                    }
                };

                reservaDtos.Add(reservaDto);
            }

            return reservaDtos;
        }

        private Reserva MapReserva(ReservaInputDto reserva)
        {
            return new Reserva
            {
                Res_id = reserva.Id,
                Res_nome = reserva.Nome,
                Res_email = reserva.Email,
                Res_instagram = reserva.Instagram,
                Res_telefone = reserva.Telefone,
                Res_endereco = reserva.Endereco,
                Res_referencia = reserva.Referencia,
                Res_entrega = reserva.Entrega,
                Res_retirada = reserva.Retirada,
                Res_quantidade = reserva.Quantidade,
                Pro_id = reserva.ProdutoId,
            };
        }
    }
}
