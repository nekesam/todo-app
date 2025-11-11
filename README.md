
# To-Do App

A small, responsive single-page To-Do application that demonstrates a clean UI, simple CRUD operations against a REST API, and a few UX improvements (custom confirm dialog, optimistic UI updates, and duplicate-submit protection).

This project is a minimal front-end app (HTML/CSS/vanilla JavaScript) intended as a learning/demo project or starting point for a lightweight task manager.

---

**Live preview (local)**

- Serve the project folder with any static server and open `index.html` in your browser.

---

## Features

- Add tasks with title, description and optional due date/time
- List tasks with overdue highlighting
- Mark tasks completed with immediate strikethrough UI (optimistic update)
- Delete tasks with a custom, non-blocking confirmation modal
- Prevent duplicate submissions (disable Save while request is pending)
- Simple, dependency-free front-end (no frameworks)

---

## Project Structure

- `index.html` — main HTML file
- `css/style.css` — styles for app and modals
- `js/api.js` — API functions (GET/POST/PUT/DELETE)
- `js/app.js` — application logic, UI behavior
- `assets/` — (optional) images or icons

---

## Prerequisites

- A modern browser (Chrome, Edge, Firefox, Safari)
- Optional: Node.js (for `http-server`) or Python (for `python -m http.server`) to serve files locally

---

## Running locally (quick)

Open a terminal in the project root (`c:\Users\Admin\Documents\todo-app`) and run one of the following:

PowerShell / Command Prompt (Python 3):
```
python -m http.server 8000
```

With Node (no install required if you have `npx`):
```
npx http-server -p 8000
```

Then open: `http://localhost:8000`

---

## API configuration

This app expects a REST API endpoint that supports basic CRUD for todos. By default the client points to a Xano demo endpoint in `js/api.js`:

```js
// js/api.js
const API_BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:5mJKaeI4/todo";
```

If you run your own backend, update `API_BASE_URL` in `js/api.js` to point to your server. The expected task object shape used by the UI is:

```json
{
	"id": "string or number",
	"title": "string",
	"description": "string or null",
	"due_date": "ISO datetime string or null",
	"completed": false
}
```

The client uses:
- `GET /todo` — list tasks
- `POST /todo` — create task (body: { title, description, due_date, completed })
- `PUT /todo/:id` — update task fields (used to toggle `completed`)
- `DELETE /todo/:id` — delete task

---

## UX & Implementation Notes

- Optimistic UI for completion: when you toggle the checkbox the item immediately shows a strikethrough for instant feedback. The app will revert the UI and inform you if the server update fails.
- Duplicate-submission protection: while creating a task the Save button is disabled and the app ignores additional submits until the request completes.
- Custom confirmation modal replaces the browser `confirm()` for a nicer, non-blocking dialog and consistent styling.

---

## Contributing

This project is intentionally small. If you want to contribute:

- Open an issue describing the change or improvement.
- Send a pull request with a clear description of the change.

Suggested improvements:
- Add edit task flow
- Add filters (today, overdue, completed)
- Add local caching (IndexedDB/localStorage) for offline capability
- Add tests (unit/E2E) and CI

---

## Troubleshooting

- If tasks appear duplicated after creation: check the network tab to ensure the client issues only one `POST` per save action. The front-end already disables double submits; if duplicates persist the backend may be creating multiple entries — check your API.
- If the app can't reach the API, open `js/api.js` and verify `API_BASE_URL` and that CORS is enabled on your backend.

---

## License

MIT — feel free to reuse and adapt.

---

