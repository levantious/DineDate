FROM mcr.microsoft.com/dotnet/sdk:9.0 AS restore


COPY ["src/server/services/chat/DateMe.Server.Chat/DateMe.Server.Chat.csproj", "src/server/services/chat/DateMe.Server.Chat/"]
COPY ["src/server/aspire/DateMe.Server.Aspire.ServiceDefaults/DateMe.Server.Aspire.ServiceDefaults.csproj", "src/server/aspire/DateMe.Server.Aspire.ServiceDefaults/"]

RUN dotnet restore "src/server/services/chat/DateMe.Server.Chat/DateMe.Server.Chat.csproj"

# ===============
FROM restore AS publish

COPY ["src/server/Directory.Packages.props", "Directory.Packages.props"]
COPY ["src/server/services/chat/DateMe.Server.Chat/", "src/server/services/chat/DateMe.Server.Chat/"]
COPY ["src/server/aspire/DateMe.Server.Aspire.ServiceDefaults/", "src/server/aspire/DateMe.Server.Aspire.ServiceDefaults/"]

ARG OUTPUT_DIR=/app/publish

ARG APP_VERSION=Unknown
ARG MAIN_PROJECT_PATH=src/server/services/chat/DateMe.Server.Chat
ARG BUILD_CONFIGURATION=Release

WORKDIR $MAIN_PROJECT_PATH

RUN dotnet publish "DateMe.Server.Chat.csproj" \
    -c $BUILD_CONFIGURATION \
    -p:InformationalVersion=$APP_VERSION \
    -p:Version=$APP_VERSION \
    -o $OUTPUT_DIR \
    -p:UseAppHost=false

# ===============
FROM mcr.microsoft.com/dotnet/aspnet:9.0-noble-chiseled AS final

ARG OUTPUT_DIR=/app/publish

WORKDIR /app

COPY --from=publish $OUTPUT_DIR .

EXPOSE 8080
EXPOSE 8081


ENTRYPOINT ["dotnet", "DateMe.Server.Chat.dll"]
