using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackAppPromo.Migrations
{
    /// <inheritdoc />
    public partial class NovasTabelasReserva : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reserva",
                columns: table => new
                {
                    Res_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Res_nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Res_email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Res_telefone = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Res_instagram = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Res_endereco = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Res_referencia = table.Column<string>(type: "text", nullable: false),
                    Res_entrega = table.Column<bool>(type: "boolean", nullable: false),
                    Res_retirada = table.Column<bool>(type: "boolean", nullable: false),
                    Res_quantidade = table.Column<int>(type: "integer", nullable: false),
                    Res_valor_total = table.Column<decimal>(type: "numeric", nullable: false),
                    Res_data_reserva = table.Column<DateOnly>(type: "date", nullable: false),
                    Pro_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reserva", x => x.Res_id);
                    table.ForeignKey(
                        name: "FK_Reserva_Produto_Pro_id",
                        column: x => x.Pro_id,
                        principalTable: "Produto",
                        principalColumn: "Pro_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reserva_Pro_id",
                table: "Reserva",
                column: "Pro_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reserva");
        }
    }
}
