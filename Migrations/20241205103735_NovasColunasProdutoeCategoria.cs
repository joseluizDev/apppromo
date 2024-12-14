using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackAppPromo.Migrations
{
    /// <inheritdoc />
    public partial class NovasColunasProdutoeCategoria : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categoria",
                columns: table => new
                {
                    Cat_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Cat_nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categoria", x => x.Cat_id);
                });

            migrationBuilder.CreateTable(
                name: "Produto",
                columns: table => new
                {
                    Pro_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Pro_titulo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Pro_descricao = table.Column<string>(type: "character varying(999)", maxLength: 999, nullable: false),
                    Pro_preco = table.Column<decimal>(type: "numeric(15,2)", nullable: false),
                    Pro_preco_promocional = table.Column<decimal>(type: "numeric(15,2)", nullable: false),
                    Pro_quantidade = table.Column<int>(type: "integer", nullable: false),
                    Pro_data_cadastrado = table.Column<DateOnly>(type: "date", nullable: false),
                    Cat_id = table.Column<int>(type: "integer", nullable: false),
                    Usu_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produto", x => x.Pro_id);
                    table.ForeignKey(
                        name: "FK_Produto_Categoria_Cat_id",
                        column: x => x.Cat_id,
                        principalTable: "Categoria",
                        principalColumn: "Cat_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Produto_Usuario_Usu_id",
                        column: x => x.Usu_id,
                        principalTable: "Usuario",
                        principalColumn: "Usu_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Produto_Cat_id",
                table: "Produto",
                column: "Cat_id");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_Usu_id",
                table: "Produto",
                column: "Usu_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Produto");

            migrationBuilder.DropTable(
                name: "Categoria");
        }
    }
}
