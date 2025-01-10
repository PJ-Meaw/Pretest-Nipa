## Technology Stack and Features

- **FastAPI** for the Python Backend API.
  - Supabase as Postgres database.
  - psycopg2 is adapter of PostgreSQL

- **Next.js 15** for Frondend
  - implement Typescript, hooks
  - Chakra UI v3 as CSS framework

- **Figma** design Tool
  - There are Design System (color, typography)
  - [URL](https://www.figma.com/design/ViCwSLVWCGSbesLDb4SuhX/HelpDesk-App?node-id=0-1&t=B4KuVFYNWTY9sN3K-1)

## Installation

### Next.js

First, run command to install package module
```console
npm install
```

Second, run development server
```console
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

### FastAPI

Create virtual environment
```console
python -m venv .venv
```

Activate virtual environment (Linux, macOS)
```console
source .venv/bin/activate
```
you can see more detail [URL](https://fastapi.tiangolo.com/virtual-environments/#install-packages-directly)

Install from `requirements.txt`
```console
pip install -r requirements.txt
```

Run Backend devlopment server
```console
fastapi dev main.py
```

- Server : [http://127.0.0.1:8000](http://127.0.0.1:8000)
- API docs : [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)