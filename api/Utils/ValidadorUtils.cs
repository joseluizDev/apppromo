using System.Text.RegularExpressions;

namespace BackAppPromo.Utils
{
    public class ValidadorUtils
    {
        public bool ValidarEmail(string email)
        {
            Regex regex = new Regex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
            return regex.IsMatch(email);
        }
        public bool ValidarSenha(string senha)
        {
            Regex regex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");
            return regex.IsMatch(senha);
        }
        public bool ValidarString(string texto)
        {
            return !string.IsNullOrEmpty(texto);
        }
        public bool ValidarInt(int numero)
        {
            return numero > 0;
        }
        public bool ValidarDecimal(decimal numero)
        {
            return numero > 0;
        }
    }
}
