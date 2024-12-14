namespace BackAppPromo.Domain.Exceptions
{
    public class EmailInvalidoException : Exception
    {
        public EmailInvalidoException(string message) : base(message) {}
    }
}
