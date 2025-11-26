# Ascend App

Ascend is a gamified personal development application designed to help users track their goals, build habits, and "level up" their lives. By combining productivity tools with RPG-like mechanics, Ascend makes self-improvement engaging and rewarding.

## 🎮 Features

- **Gamification System**: Earn Experience Points (XP), Coins, and Diamonds by completing tasks. Track your Level, Health Points (HP), and Stamina.
- **Ascensions (Tasks)**: Create and manage goals. Completing "Ascensions" rewards you with in-game currency and XP.
- **Journal**: A built-in journaling feature to record your daily thoughts and reflections.
- **Streak System**: Visual calendar to track your daily activity and consistency.
- **User Profile**: View detailed statistics and manage your account.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Authentication**: Secure email and password sign-in/sign-up.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite
- **Styling**: Tailwind CSS (v4)
- **Routing**: React Router DOM
- **Animations**: GSAP (GreenSock Animation Platform)
- **Backend & Database**: Supabase

## 🤖 AI Implementation Note

**Note:** The backend infrastructure, database schema design, and Supabase integration for this project were implemented with the assistance of Artificial Intelligence. This includes the authentication flows, database connection logic, and real-time data fetching strategies.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kparhar07-star/Ascend-App.git
   cd Ascend-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```
src/
├── assets/          # Images and static assets
├── Components/      # Reusable UI components (Navigation, JournalEntry, etc.)
├── Pages/           # Main application pages
│   ├── Ascensions/  # Task management page
│   ├── Auth/        # Login/Signup page
│   ├── Help/        # Help center and documentation
│   ├── Home/        # Dashboard with stats and calendar
│   ├── Journal/     # Journaling interface
│   └── Profile/     # User profile and settings
├── App.jsx          # Main application component and routing
├── main.jsx         # Entry point
├── index.css        # Global styles and Tailwind configuration
└── supabaseClient.js # Supabase configuration
```
