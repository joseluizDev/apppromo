using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Exceptions;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Utils;
using Microsoft.AspNetCore.Identity;

namespace BackAppPromo.Application.Service
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly ISenhaHash _senhaHash;
        private readonly ValidadorUtils _validadorUtils;

        public UsuarioService(IUsuarioRepository usuarioRepository, ISenhaHash senhaHash, ValidadorUtils validadorUtils)
        {
            _usuarioRepository = usuarioRepository;
            _senhaHash = senhaHash;
            _validadorUtils = validadorUtils;
        }

        public async Task<Usuario> AddUsuario(UsuarioInputDto usuario)
        {
            if (!ValidarUsuario(usuario))
            {
                throw new Exception("Usuário inválido");
            }

            Usuario map = MapUsuario(usuario);
            map.Usu_senha = _senhaHash.HashSenha(usuario.Senha);
            return await _usuarioRepository.AddUsuario(map);
        }

        public async Task<Usuario> ObterUsuarioEmail(string email)
        {
            if(!ValidarEmail(email))
            {
                throw new EmailInvalidoException("Email inválido");
            }
            return await _usuarioRepository.ObterUsuarioEmail(email);
        }

        private bool ValidarEmail(string email)
        {
            if (!_validadorUtils.ValidarEmail(email))
            {
                throw new EmailInvalidoException("Email inválido");
            }

            return true;
        }

        private bool ValidarUsuario(UsuarioInputDto usuario)
        {
            if(!_validadorUtils.ValidarEmail(usuario.Email))
            {
                throw new EmailInvalidoException("Email inválido");
            }
            if (!_validadorUtils.ValidarSenha(usuario.Senha))
            {
                throw new SenhaInvalidaException("Senha inválida");
            }
            return true;
        }

        private Usuario MapUsuario(UsuarioInputDto usuario)
        {
            return new Usuario
            {
                Usu_email = usuario.Email,
                Usu_senha = usuario.Senha
            };
        }
    }
}
