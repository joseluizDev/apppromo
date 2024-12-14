﻿// <auto-generated />
using System;
using BackAppPromo.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackAppPromo.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241205103735_NovasColunasProdutoeCategoria")]
    partial class NovasColunasProdutoeCategoria
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("BackAppPromo.Domain.Entities.Categoria", b =>
                {
                    b.Property<int>("Cat_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Cat_id"));

                    b.Property<string>("Cat_nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Cat_id");

                    b.ToTable("Categoria");
                });

            modelBuilder.Entity("BackAppPromo.Domain.Entities.Produto", b =>
                {
                    b.Property<int>("Pro_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Pro_id"));

                    b.Property<int>("Cat_id")
                        .HasColumnType("integer");

                    b.Property<DateOnly>("Pro_data_cadastrado")
                        .HasColumnType("date");

                    b.Property<string>("Pro_descricao")
                        .IsRequired()
                        .HasMaxLength(999)
                        .HasColumnType("character varying(999)");

                    b.Property<decimal>("Pro_preco")
                        .HasColumnType("decimal(15,2)");

                    b.Property<decimal>("Pro_preco_promocional")
                        .HasColumnType("decimal(15,2)");

                    b.Property<int>("Pro_quantidade")
                        .HasColumnType("integer");

                    b.Property<string>("Pro_titulo")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<int>("Usu_id")
                        .HasColumnType("integer");

                    b.HasKey("Pro_id");

                    b.HasIndex("Cat_id");

                    b.HasIndex("Usu_id");

                    b.ToTable("Produto");
                });

            modelBuilder.Entity("BackAppPromo.Domain.Entities.Usuario", b =>
                {
                    b.Property<int>("Usu_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Usu_id"));

                    b.Property<string>("Usu_email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Usu_senha")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Usu_id");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("BackAppPromo.Domain.Entities.Produto", b =>
                {
                    b.HasOne("BackAppPromo.Domain.Entities.Categoria", "Categoria")
                        .WithMany()
                        .HasForeignKey("Cat_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackAppPromo.Domain.Entities.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("Usu_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Categoria");

                    b.Navigation("Usuario");
                });
#pragma warning restore 612, 618
        }
    }
}
