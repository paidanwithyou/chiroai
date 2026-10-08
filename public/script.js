* {
  box-sizing: border-box;
}

:root {
  --bg: #050d1a;
  --bg-2: #101d32;
  --surface: rgba(15, 23, 42, 0.82);
  --surface-strong: rgba(15, 23, 42, 0.96);
  --surface-soft: rgba(17, 27, 45, 0.7);
  --border: rgba(148, 163, 184, 0.18);
  --text: #eaf2ff;
  --muted: #bfd0f2;
  --primary: #7c9cff;
  --secondary: #7ce7d8;
  --accent: #f7b768;
  --shadow: 0 18px 45px rgba(2, 6, 23, 0.45);
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at top left, rgba(124, 156, 255, 0.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(124, 232, 203, 0.10), transparent 28%),
    var(--bg);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button, input, select, textarea {
  font: inherit;
}

.page-shell {
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 40px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #081424;
}

.brand-name {
  font-weight: 800;
  letter-spacing: 0.06em;
}

.brand-tag {
  color: var(--muted);
  font-size: 0.75rem;
}

.dashboard {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 24px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
}

.left-panel {
  padding: 22px 20px;
}

.right-panel {
  padding: 20px;
}

.panel-title,
.panel-title-row {
  font-weight: 700;
  letter-spacing: 0.04em;
}

.panel-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

#promptForm {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 18px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
  font-size: 0.84rem;
}

input, select, textarea {
  width: 100%;
  background: rgba(9, 18, 32, 0.88);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 12px;
  padding: 0.85rem 0.9rem;
}

textarea {
  resize: vertical;
}

.button-row {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.primary-btn,
.secondary-btn,
.copy-btn,
.mini-copy {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.primary-btn {
  flex: 1;
  background: linear-gradient(135deg, var(--primary), #9d8dff);
  color: white;
  padding: 0.9rem 1rem;
  font-weight: 700;
}

.secondary-btn {
  background: rgba(124, 232, 203, 0.08);
  border: 1px solid rgba(124, 232, 203, 0.2);
  color: var(--text);
  padding: 0.9rem 1rem;
}

.secondary-btn.small {
  padding: 0.7rem 0.9rem;
}

.copy-btn,
.mini-copy {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.5rem 0.7rem;
}

.primary-btn:hover,
.secondary-btn:hover,
.copy-btn:hover,
.mini-copy:hover {
  transform: translateY(-1px);
  opacity: 0.96;
}

.prompt-groups {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.prompt-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.prompt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.final-card textarea {
  min-height: 140px;
}

.image-preview {
  margin-top: 22px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.preview-label {
  font-size: 0.78rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

#imagePreview {
  display: block;
  width: 100%;
  max-width: 680px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: rgba(9, 18, 32, 0.7);
  min-height: 220px;
  object-fit: cover;
}

.hidden {
  display: none;
}

@media (max-width: 980px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 540px) {
  .page-shell {
    width: min(100% - 18px, 1280px);
  }

  .button-row {
    flex-direction: column;
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }
}
