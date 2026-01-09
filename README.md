# AtNDance 🎓

**AtNDance** is a modern, offline-first attendance tracking application designed for students who want to manage their attendance smartly. It helps you track classes, calculate attendance percentages, and decide when it's "safe to bunk" while maintaining your target attendance (e.g., 75%).

![AtNDance Banner](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop)

## 🚀 Features

### Core Features
*   **📊 Smart Dashboard**: View your daily schedule and mark attendance (Present, Absent, Cancelled) with a single tap.
*   **📅 Timetable Management**: Organize your weekly schedule with custom subjects, colors, and professor names.
*   **📉 Real-time Stats**: Instantly see your attendance percentage for every subject.
*   **🧠 "Safe to Bunk" Insights**: The app calculates exactly how many classes you can skip while staying above 75%.
*   **🎯 Semester Goals**: Set a total number of classes for the semester to get even more accurate predictions.

### Killer Features
*   **🎨 Theme Engine**: Choose your vibe! Includes **Cyberpunk**, **OLED Dark**, **Light**, and **Default** themes.
*   **🏆 Professor Awards**: Fun stats like "Chillest Prof" and "The Villain" based on your attendance.
*   **🔮 Bunk Simulator**: Simulate future scenarios—add "Attend" or "Skip" days to see how they affect your percentage.
*   **🔔 Smart Reminders**: Get browser notifications so you never forget to mark attendance.
*   **📄 PDF Export**: Download a professional attendance report to share or keep.

### Mobile Experience
*   **📱 Android App**: Native Android support via Capacitor.
*   **☁️ Cloud Build**: Automated APK generation using GitHub Actions.
*   **🔌 Offline First**: Works 100% offline using local storage.

## 🛠️ Tech Stack

*   **Frontend**: React 19, Vite
*   **Styling**: Tailwind CSS v4, Framer Motion
*   **Icons**: Lucide React
*   **Mobile**: Capacitor 8 (Android)
*   **CI/CD**: GitHub Actions

## 📦 Installation

### Web (Local Development)
1.  Clone the repo:
    ```bash
    git clone https://github.com/mizzrayush/AtNDance.git
    cd AtNDance
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the dev server:
    ```bash
    npm run dev
    ```

### Android (APK)
You don't need Android Studio!
1.  Go to the **[Actions](https://github.com/mizzrayush/AtNDance/actions)** tab in this repository.
2.  Click on the latest **"Build Android APK"** workflow run.
3.  Scroll down to **Artifacts** and download `app-debug.apk`.
4.  Install it on your Android device.

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License
MIT License
