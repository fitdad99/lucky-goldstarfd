# Good Boy Tracker - Setup Instructions

## Firebase Authentication Setup

You need to create a shared email/password account in Firebase for the app to work.

### Steps:

1. Go to [Firebase Console](https://console.firebase.google.com/) → Your Project

2. Click **Authentication** in the left sidebar

3. Click **Get Started** (if first time) or go to the **Users** tab

4. Click **Add User** manually:
   - **Email**: `goodboy@tracker.app`
   - **Password**: Choose a strong password (you and your wife will use this)
   - Click **Add User**

5. Go to **Sign-in method** tab:
   - Make sure **Email/Password** is **Enabled**
   - If not, click on it → Toggle **Enable** → Save

6. Update Firestore Rules:
   - Go to **Firestore Database** → **Rules** tab
   - The rules in `firestore.rules` are already correct
   - Make sure they match and click **Publish**

### Using the App:

- First time on any device: Enter the password you set
- Password is remembered via Firebase Auth session
- Only people with the password can access the tracker
- If you clear browser data, you'll need to re-enter the password

### Security Note:

The email (`goodboy@tracker.app`) is hardcoded in the app. The security comes from the password being secret. Don't share the password publicly - only with people who should have access to the tracker.
