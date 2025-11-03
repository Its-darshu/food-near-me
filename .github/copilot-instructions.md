- [x] Verify that the copilot-instructions.md file in the .github directory is created. (File created and confirmed present.)

- [x] Clarify Project Requirements (PRD reviewed; stack confirmed React + Tailwind frontend, Node/Express backend.)

- [x] Scaffold the Project (Monorepo created with frontend, backend, and shared packages plus tooling configs.)

- [x] Customize the Project (Feature plan created from PRD and implemented core UI, API, and chat widget scaffolding.)

- [x] Install Required Extensions (No extensions requested for this project.)

- [x] Compile the Project (Dependencies installed and pnpm build completed successfully.)

- [x] Create and Run Task (Added VS Code tasks for frontend/backend dev servers and verified frontend task launch.)

- [x] Launch the Project (Backend and frontend dev servers started via VS Code tasks.)

- [x] Ensure Documentation is Complete (README refreshed and instructions cleaned of HTML comments.)

Execution Guidelines
- Track checklist progress step by step and update items after completion.
- Keep communication concise; avoid dumping full command outputs.
- Use the project root `.` as the working directory unless instructed otherwise.
- Do not add media or external links unless requested.
- Prefer placeholders only when actual assets are unavailable and call out the substitution.
- Use VS Code API tooling only for extension projects.
- Do not suggest reopening the project in Visual Studio once created.

Development Guidelines
- Follow any additional rules provided by project setup tools.
- Create directories and files within the current workspace; avoid extra folders unless required (aside from `.vscode`).
- Run commands with `.` when needed to ensure they target the current workspace.
- Skip extension installation unless explicitly required.
- Assume a "Hello World" baseline when project details are missing.
- Only include integrations or links when requirements specify them.
- Ensure new components serve a clear purpose that aligns with user requirements.
- Seek clarification before adding unconfirmed features.
- For VS Code extension work, consult the VS Code API tool for reference material.

Task Completion Criteria
- Project scaffolded and compiled without errors.
- `.github/copilot-instructions.md` present with up-to-date guidance.
- `README.md` present and current.
- User has clear instructions for launching or debugging the project.
