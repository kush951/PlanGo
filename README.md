# AI-Powered Trip Planner App

Welcome to the AI-Powered Trip Planner app! 🌍 This full-stack project combines cutting-edge technology and stylish design to create an intuitive, smart trip-planning solution. Whether you're a developer eager to enhance your skills or an adventurer looking for inspiration, this project is the perfect starting point. 🚀

## Features ✨

- **AI-Powered Recommendations**: Leverage the power of Gemini AI to generate personalized trip plans based on user preferences.
- **Seamless User Interface**: Built with React, offering a smooth and responsive experience.
- **Cloud Integration**: Data is securely stored and managed with Firebase.
- **Beautiful Design**: Crafted with TailwindCSS for a modern and stylish look.

## Technology Stack 🛠️

- **Frontend**: React
- **AI Integration**: Gemini AI
- **Backend & Database**: Firebase
- **Styling**: TailwindCSS

## Getting Started 🚀

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **Firebase Project**: Set up a Firebase project and obtain your configuration details.
- **Gemini AI Access**: Ensure you have access to Gemini AI's API.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ai-trip-planner.git
    cd ai-trip-planner
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure Firebase**:
    Add your Firebase configuration details in a `.env` file:
    ```env
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

4. **Configure Gemini AI**:
    Add your Gemini AI API key to the `.env` file:
    ```env
    REACT_APP_GEMINI_API_KEY=your_gemini_api_key
    ```

5. **Start the development server**:
    ```bash
    npm start
    ```

6. **Open your browser** and navigate to `http://localhost:3000`.

## Project Structure 📂

. ├── public ├── src │ ├── components │ │ └── ... (Reusable UI components) │ ├── pages │ │ └── ... (Different pages of the app) │ ├── styles │ │ └── ... (TailwindCSS customizations) │ ├── utils │ │ └── api.js (Gemini AI and Firebase API integrations) │ └── App.js (Main application file) ├── .env (Environment variables) ├── package.json └── README.md


## Contribution 🤝

Contributions are always welcome! Feel free to open an issue or submit a pull request.

## License 📜

This project is licensed under the MIT License. See the LICENSE file for details.

Explore the world of AI-powered trip planning with this smart and stylish app. Happy coding! ✈️🌟
