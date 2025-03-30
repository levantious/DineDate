# This is an official react native community docker image, it 
# enables web interface, as well as connecting to it via 
# android emulator/physical device (it contains android SDK)
# FROM reactnativecommunity/react-native-android:latest

# for faster build without android support
FROM node:alpine

WORKDIR /app

# Copy package files, and install modules
COPY src/gui/package.json src/gui/package-lock.json ./
RUN npm install

# Install the required tunnel dependency so that --tunnel works without prompts
RUN npm install @expo/ngrok@^4.1.0

COPY src/gui/ .

# expo ports
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# react native web ui
EXPOSE 8081


ENV EXPO_PUBLIC_HUB_URL=http://localhost:5211/chat

CMD ["npx", "expo", "start", "--tunnel"]