# Commibuy

**Commibuy** is a mobile application designed to promote and support local businesses by enabling users to discover, buy, and connect with shops in their community. The app is built using **Expo** for the front-end and **Supabase** as the backend for authentication, database management, and real-time features.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Local Business Discovery**: Browse and find local businesses near you.
- **Support Local Businesses**: Buy and support stores in your community directly from the app.
- **Real-time Updates**: Receive real-time notifications on local deals and business updates.
- **Authentication**: Secure user authentication via Supabase.
- **Favorites**: Save your favorite shops and get updates from them.
- **Search and Filter**: Easily search for businesses based on categories, location, and preferences.

## Technologies Used

- **Expo**: For building the mobile app on both iOS and Android.
- **Supabase**: Backend services including authentication, real-time database, and storage.
- **React Native**: For building the user interface.
- **Node.js**: For running backend scripts and handling API interactions (if applicable).
- **PostgreSQL**: Supabase’s database layer for storing business and user information.

## Getting Started

### Prerequisites

To get started with Commibuy, ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)
- A Supabase account with a configured project.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/commibuy.git
    cd commibuy
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Install Expo CLI globally (if you don’t have it already):

    ```bash
    npm install -g expo-cli
    ```

### Running the App

1. Start the Expo server:

    ```bash
    expo start
    ```

2. Scan the QR code with the Expo Go app (available on iOS and Android) or run the app in an emulator.

## Project Structure

```bash
Commibuy/
├── assets/             # Images, icons, etc.
├── components/         # Reusable UI components
├── navigation/         # Navigation setup
├── screens/            # App screens (Home, Business details, etc.)
├── services/           # Supabase and API service configurations
├── App.js              # Root of the application
├── supabaseClient.js   # Supabase client setup
└── package.json        # Project metadata and dependencies
