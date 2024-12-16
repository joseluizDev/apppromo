using System.Globalization;
using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.DTOs.OutputDto;
using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Exceptions;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Utils;

namespace BackAppPromo.Application.Service
{
    public class AuthService
    {
        private readonly UsuarioService _usuarioService;
        private readonly ISenhaHash _senhaHash;
        private readonly ValidadorUtils _validadorUtils;
        private readonly IJwtToken _jwtToken;

        public AuthService(UsuarioService usuarioService, ISenhaHash senhaHash, ValidadorUtils validadorUtils, IJwtToken jwtToken)
        {
            _usuarioService = usuarioService;
            _senhaHash = senhaHash;
            _validadorUtils = validadorUtils;
            _jwtToken = jwtToken;
        }

        public async Task<AuthOutputDto> Login(UsuarioInputDto usuario)
        {

            Usuario map = MapUsuario(usuario);
            Usuario obter = await _usuarioService.ObterUsuarioEmail(usuario.Email);

            bool validar = _senhaHash.VerificarSenha(obter.Usu_senha, usuario.Senha);
            if (!validar)
            {
                throw new SenhaInvalidaException("Email ou/e Senha inválido");
            }

            string token = _jwtToken.GerarToken(obter);

            return MapAuth(obter, token);
        }


        private AuthOutputDto MapAuth(Usuario usuario, string token)
        {
            return new AuthOutputDto
            {
                Token = token,
                Usuario = new UsuarioOutputDto
                {
                    Id = usuario.Usu_id,
                    Email = usuario.Usu_email
                }
            };
        }

        private Usuario MapUsuario(UsuarioInputDto usuario)
        {
            return new Usuario
            {
                Usu_email = usuario.Email,
                Usu_senha = usuario.Senha,
            };
        }
    }
}
