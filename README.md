# Setup
1. console.firebase.google.com: create project, add a Web app, copy its config into .env.local (see .env.example).
2. Build > Authentication > enable Email/Password, then add yourself as a user.
3. Build > Firestore Database > create, then paste firestore.rules in Rules (replace YOUR_EMAIL_HERE with your email) and publish.
4. npm install && npm run dev. Open /admin, sign in, fill Site and links first.
5. Deploy: push to GitHub, import in Vercel, add the same 4 env vars.
Essay body: separate paragraphs with a blank line; start a line with "## " for a heading.
