using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackAppPromo.Migrations
{
    /// <inheritdoc />
    public partial class AjusteTabelaProduto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Pro_instagram",
                table: "Produto",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Pro_whats",
                table: "Produto",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pro_instagram",
                table: "Produto");

            migrationBuilder.DropColumn(
                name: "Pro_whats",
                table: "Produto");
        }
    }
}
