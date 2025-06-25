# 🎨 Color Guessing Game

A fun and interactive color matching game built using traditional **HTML**, **CSS**, and **JavaScript** — no frameworks, no dependencies. Test your reflexes, challenge your memory, and aim for the highest score!

---

## 🚀 Features

- 🎮 **Start Game** — Kick off a new round of color matching fun!
- 🎯 **6 Color Buttons** — Choose the color that matches the target.
- 🔊 **Sound Toggle** — Turn background sounds on or off.
- 🏆 **High Score Tracker** — Your highest score is stored using localStorage.
- 🔁 **Reset Score** — Clear current and high scores with one click.
- 📜 **Game Rules** — Quickly view how the game works.
- ❌ **Exit Button** — Exit back to the main menu or quit gameplay.
- 💡 **Single Page Design** — Built with a single `index.html` using `visibility` toggles to switch between menus and game views.

---

## 🧠 How to Play

1. Click **Start Game**.
2. A random color will be shown.
3. Choose the correct matching color from the six buttons.
4. Get it right? ✅ +5 points!
5. Get it wrong? ❌ -5 points!
6. Keep playing to beat your high score.

---

## 🛠️ Built With

- **HTML** – structure and layout
- **CSS** – styling, transitions, and animations
- **JavaScript** – game logic, scoring, sound handling, and DOM manipulation
- **LocalStorage** – for saving scores between sessions

---

## 📁 File Structure

```script
project-folder/
│
├── index.html # The entire app lives in this one file
├── style.css # Styling and animations
└── script.js # Game logic and functionality
```

---

## How to play?

- [play game here](https://color-game-1nl8.onrender.com)

---

## 🧪 How It Works

- All game sections (menu, gameplay, rules) exist in a single HTML file.
- JavaScript dynamically shows/hides these sections using `element.style.visibility` and `display`.
- The high score is saved in the browser via `localStorage`.
- Sound is toggled using a mute/unmute flag handled in JS.

---

## 📦 Installation

Clone this repository:

```bash
git clone https://github.com/bigsam08/color-guessing-game.git
cd color-guessing-game
 start index.html

```

---

## 📄 License

This project is open source and free to use under the MIT License.

## 🙌 Acknowledgments

Vanilla JavaScript community for inspiration

Color theory for making things fun to match

You, the player 😄

## ✨ Future Improvements

Difficulty levels (easy, medium, hard)

Sound effects

Made with ❤️ by [Bigsam08]
