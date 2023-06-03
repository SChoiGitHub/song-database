using Api.Gateway;
using Microsoft.EntityFrameworkCore;

var CorsPolicy = "allowEverything";
var builder = WebApplication.CreateBuilder(args);
var Services = builder.Services;

Services.AddControllers();
Services.AddDbContext<MusicContext>(options =>
{
    options.UseInMemoryDatabase("MusicControllerTest_Tests");
});

Services.AddScoped<IMusicGateway, MusicGateway>();
Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy,
                          policy =>
                          {
                              policy.AllowAnyOrigin()
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();
                          });
});

Services.AddEndpointsApiExplorer();
Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors(CorsPolicy);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
