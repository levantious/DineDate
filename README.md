# Date ME
## PRs & Branches names:

Branches Naming: 

Feat,Bug,Chore/FE,BE,DO,Te/issue_id/description-of-the-changes (all lower case)

Example: feat/fe/11/integrate-chat-component

where:
- Feat = Feature.
- Chore = Some internal changes.
- FE, BE = front/back end.
- DO = DevOPS
- TE = Tests

and similarly, the PR's title:

Feat,Bug,Chore(FE,BE,DO,Te): Description of the changes [issue_id]

Example: feat(FE): Integrate chat component [11].

Also to link the issue with your PR, in the PR description, write something like "closes" and then hash # symbol, then you will get a list of all opened issues, write the issue_id above, and it will get filtered, or just write the number after the hash right away.


## Instal GUI locally

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```


## Spin up dockers locally

First install Aspire tools/workload (if < .Net 9 only), and templates, see [.NET Aspire setup and tooling](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/setup-tooling?tabs=linux&pivots=dotnet-cli.)

On Linux (unlike Win & Mac), .Net can't make its Aspire dev. certificates trusted, so it shall be trusted manually, the easiest way is to use [linux-dev-certs](https://github.com/tmds/linux-dev-certs).

Go to `src/server/aspire/DateMe.Server.Aspire.AppHost` and run `dotnet run`, this will run Aspire, and build/emulate docker containers.

It will also print out a link to Aspire dashboard with access token.

To access dockerized GUI go to `http://localhost:8082` (make sure that the docker container had been built in Aspire dashboard, it takes some time very first time only).
