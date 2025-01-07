# main.py
from fastapi import FastAPI, HTTPException, Depends
from db import execute_query
from datetime import datetime
from interface import TstatusTicket
from pydantic import BaseModel

class Body_Ticket_Post(BaseModel):
    title: str | None = None
    description: str | None = None
    contact: str | None = None
    status : TstatusTicket | None = None

app = FastAPI()



@app.get("/tickets/")
def get_tickets():
    try:
        query = "SELECT * FROM ticket;"
        tickets = execute_query(query)
        return {"data": tickets}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/tickets/{ticket_id}")
def get_ticket_id(ticket_id: int):
    try:
        query = "SELECT * FROM ticket WHERE id = %s;"
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
        result = execute_query(query, (ticket.title, ticket.description, ticket.contact, ticket.status, datetime.now().isoformat(), datetime.now().isoformat()))
        return {"message": "Ticket created", "ticket_id": result[0]["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.put("/tickets/{ticket_id}")
def update_ticket(ticket_id: int, ticket : Body_Ticket_Post):
    try:
        prepare = ""
        for key, value in ticket:
            if(key is not None) : 
                prepare += f" {key} = '{value}',"
        query = f"UPDATE ticket SET {prepare} update_at = %s WHERE id = %s RETURNING id;"
        result = execute_query(query, (datetime.now().isoformat(), ticket_id))
        return {"message": "Ticket created", "ticket_id": result[0]["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))