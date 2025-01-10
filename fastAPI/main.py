# main.py
from fastapi import FastAPI, HTTPException, Depends
from db import execute_query
from datetime import datetime, timedelta, timezone
from interface import TstatusTicket
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# List of allowed origins
origins = [
    "http://localhost:3000", 
]
# Create a timezone with a +07:00 offset
timezone_offset = timezone(timedelta(hours=7))

class Body_Ticket_Post(BaseModel):
    title: str | None = None
    description: str | None = None
    contact: str | None = None
    status : TstatusTicket | None = None

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,  # Allow cookies and authentication headers
    allow_methods=["*"],     # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],     # Allow all headers
)

@app.get("/")
def healthCheck():
    return { "status" : "ok"}

@app.get("/tickets/")
def get_tickets():
    try:
        query = "SELECT * FROM ticket ORDER BY update_at DESC;"
        tickets = execute_query(query)
        return {"data": tickets}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/tickets/{ticket_id}")
def get_ticket_id(ticket_id: int):
    try:
        query = "SELECT * FROM ticket WHERE id = %s; "
        ticket = execute_query(query, (ticket_id,))
        if not ticket:
            raise HTTPException(status_code=404, detail="Ticket not found")
        return {"data": ticket[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/tickets/")
def create_ticket(ticket: Body_Ticket_Post):
    try:
        query = "INSERT INTO ticket (title, description, contact, status, create_at, update_at) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id;"
        result = execute_query(query, (ticket.title, ticket.description, ticket.contact, ticket.status, datetime.now(timezone_offset).isoformat(), datetime.now(timezone_offset).isoformat()))
        return {
            "message": "Ticket created",  
            "data": {
                "id" : result[0]["id"],
                "create_at" : datetime.now(timezone_offset).isoformat(),
                "update_at" : datetime.now(timezone_offset).isoformat(),
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.put("/tickets/{ticket_id}")
def update_ticket(ticket_id: int, ticket : Body_Ticket_Post):
    try:
        if(ticket.contact is not None):
            ticket.contact.replace("'", "'''")
        if(ticket.description is not None):
            ticket.description.replace("'", "''")
        print(f"${ticket} \n")
        prepare = ""
        for key, value in ticket:
            if(value is not None) : 
                if(ticket.contact is not None):
                    value = ticket.contact.replace("'", "''")
                if(ticket.description is not None):
                    value = ticket.description.replace("'", "''")
                prepare += f" {key} = '{value}',"
        query = f"UPDATE ticket SET {prepare} update_at = %s WHERE id = %s RETURNING id, title, description, contact, status, create_at, update_at;"
        print(query)
        result = execute_query(query, (datetime.now(timezone_offset).isoformat(), ticket_id))
        return {
            "message": "Ticket updated",  
            "data": {
                "id" : result[0]["id"],
                "title" : result[0]["title"], 
                "description" : result[0]["description"], 
                "contact" : result[0]["contact"], 
                "status" : result[0]["status"], 
                "create_at" : result[0]["create_at"], 
                "update_at" :  result[0]["update_at"],
            }
        }
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))