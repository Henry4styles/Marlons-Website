using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
                    policy =>
                    {
                      policy.WithOrigins("http://localhost:3000", "https://localhost:3000",
                        "http://192.168.1.45:3000", "https://192.168.1.45:3000",
                        "http://192.168.1.42:3000", "https://192.168.1.42:3000"
                        )
                                            .AllowAnyHeader()
                                            .AllowCredentials()
                                            .SetIsOriginAllowedToAllowWildcardSubdomains()
                                            .AllowAnyMethod();

                    });
  options.AddDefaultPolicy(builder =>
  {
    builder.WithOrigins("*")
        .AllowAnyHeader()
        .AllowAnyMethod();

  });
});


IPersistor persistor = new Persistor();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");





var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

//app.UseAuthentication();

app.UseHttpsRedirection();

// app.UseCors(MyAllowSpecificOrigins);
app.UseCors(option => option.WithOrigins("*").AllowAnyHeader().AllowAnyMethod());


app.MapGet("/getPilots", () =>
{   
  return persistor.LoadPilots();
})
.WithName("GetPilots")
.WithOpenApi();


app.MapGet("/getPilot", (string email) =>
{
  return persistor.LoadPilot(email);
})
.WithName("GetPilot")
.WithOpenApi();


app.MapPost("/addPilot", ([FromBody] PilotModel jsonPilot) =>
{
  persistor.SavePilot(jsonPilot);
  return jsonPilot;
})
.WithName("addPilot")
.WithOpenApi();

// Get token endpoint
// app.MapGet("antiforgery/token", (IAntiforgery forgeryService, HttpContext context) =>
// {
//     var tokens = forgeryService.GetAndStoreTokens(context);
//     context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken!,
//             new CookieOptions { HttpOnly = false });

//     return Results.Ok();
// });
//.RequireAuthorization(); // In a real world scenario, you'll only give this token to authorized users


app.MapPost("addPilotImage", async ([FromForm] IFormFile file, string email) =>
{
  await persistor.SaveFile(file, email);
})
.DisableAntiforgery()
.WithName("AddPilotImage")
.WithOpenApi()
// .WithOpenApi()
.Produces(200);

app.MapGet("getFile", async (string email, string ext) =>
{

  var binaryImage = persistor.GetFileByEmail(email, ext);
  if (binaryImage.Length > 0)
  {
    return Results.File(binaryImage, contentType: "image/jpeg");
  }
  else
  {
    return Results.NotFound();
  }
})
.DisableAntiforgery()
.WithName("getFile")
.WithOpenApi()
.Produces(200);


app.Run();

