using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace indecisive_decider.Migrations
{
    public partial class feedCommentsAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeedComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: true),
                    Comment = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    FeedItemId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeedComments_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FeedComments_FeedItems_FeedItemId",
                        column: x => x.FeedItemId,
                        principalTable: "FeedItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeedComments_FeedItemId",
                table: "FeedComments",
                column: "FeedItemId");

            migrationBuilder.CreateIndex(
                name: "IX_FeedComments_UserId",
                table: "FeedComments",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeedComments");
        }
    }
}
