# Etapa 1: Imagem base para execução (ASP.NET Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Etapa 2: Imagem SDK para compilação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copiar o arquivo de projeto (.csproj) e restaurar pacotes
COPY [".api/BackAppPromo.csproj", "."]
RUN dotnet restore ".api/BackAppPromo.csproj"

# Copiar o restante do código-fonte da pasta API
COPY . .

# Compilar o projeto com configuração específica
RUN dotnet build ".api/BackAppPromo.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Etapa 3: Publicação da aplicação
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish ".api/BackAppPromo.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Etapa 4: Final - Preparar o ambiente para execução
FROM base AS final
WORKDIR /app

# Copiar os arquivos publicados da etapa anterior
COPY --from=publish /app/publish .

# Definir o ponto de entrada da aplicação
ENTRYPOINT ["dotnet", ".api/BackAppPromo.dll"]
