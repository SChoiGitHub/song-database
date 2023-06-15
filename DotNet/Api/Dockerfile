FROM mcr.microsoft.com/dotnet/sdk AS builder
WORKDIR /App

COPY Api.csproj ./Api.csproj
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet
WORKDIR /App
COPY --from=builder /App/out .
ENTRYPOINT ["dotnet", "Api.dll"]