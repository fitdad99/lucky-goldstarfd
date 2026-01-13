# Good Boy Star Tracker 🌟

A real-time, gamified tracker for your toddler's good behavior with an 8-bit Mario aesthetic.

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: NES.css (8-bit Nintendo UI)
- **Database**: Firebase Firestore (real-time sync)
- **Hosting**: Vercel
- **Audio**: Classic Super Mario sound effects

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable Firestore Database:
   - In Firebase console, go to **Firestore Database**
   - Click **Create Database**
   - Start in **Test Mode** (for now)
   - Choose a location close to you

4. Create the initial document:
   - In Firestore, create collection: `good_boy_tracker`
   - Add document with ID: `2026_01`
   - Add field: `count` (number) = `0`

5. Get your Firebase config:
   - Go to **Project Settings** (gear icon)
   - Scroll to "Your apps" section
   - Click the **</>** (web) icon to add a web app
   - Copy the `firebaseConfig` values

6. Add Firebase credentials:
   - Open `.env.local` in this project
   - Replace the placeholder values with your actual Firebase config values

### 2. Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the app.

### 3. Deploy to Vercel

1. Push this code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add Environment Variables in Vercel dashboard:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
5. Deploy!

## Features

- ✅ Real-time star count syncing across all devices
- ✅ 8-bit Nintendo aesthetic with NES.css
- ✅ Classic Mario coin sound on each star add
- ✅ Power-up sound at milestones (10, 50 stars)
- ✅ Visual progress bar
- ✅ Monthly tracking (January 2026: `2026_01`)

## Milestone System

- **10 Stars**: First milestone - power-up sound
- **50 Stars**: Monthly goal - power-up sound
- **100 Stars**: Progress bar fills up

## Monthly Rollover

To start a new month:
1. In Firestore, create a new document: `2026_02` (February)
2. Set `count: 0`
3. Update `App.jsx` to reference the new month document

## Future Enhancements

- [ ] Monthly archive view
- [ ] Reward claiming system
- [ ] Parent authentication
- [ ] Custom milestone goals
- [ ] More sound effects
- [ ] Animations on star add

