# Notely

A minimal, responsive notes app built with React and Tailwind CSS. Supports dark/light mode, full CRUD, and persistent storage via localStorage.

🔗 **Live Demo** → https://notes-app-black-alpha.vercel.app/

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Build Tool | Vite |
| Storage | localStorage |

---

## Features

- Create, edit, and delete notes
- Dark / Light mode toggle
- Auto date tracking per note
- Persistent storage — notes survive page refresh
- Fully responsive across mobile and desktop

## Testing

The app includes a small Vitest + React Testing Library suite that covers the key user flows:

- creating a note from the form
- editing and deleting an existing note
- keeping notes in `localStorage` after a refresh
- switching between dark and light mode

Run the tests with:

```bash
npm test
```

## Implementation Notes

- `App.jsx` owns the note state, edit mode, and localStorage persistence.
- `NoteForm.jsx` is a controlled form so the parent can reuse the same inputs for create and update.
- `NoteList.jsx` and `NoteCard.jsx` separate rendering concerns from the app state logic.
- The main buttons now include accessible labels so the UI is easier to test and use with assistive tools.

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── NoteForm.jsx
│   ├── NoteList.jsx
│   └── NoteCard.jsx
├── App.jsx
└── main.jsx
```

---

## Getting Started

```bash
git clone https://github.com/Ishant8287/Notes-App.git
cd Notes-App
npm install
npm run dev
```

---

## Screenshots

### Dark Mode
![Dark Mode](./screenshots/darkMode.png)

### Light Mode
![Light Mode](./screenshots/lightMode.png)

---

## License

MIT
