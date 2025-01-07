import asyncpg
import asyncio

async def test_connection():
    try:
        conn = await asyncpg.connect(
            user="postgres",
            password="meawae",
            host="localhost",
            port="5433",
            database="postgres"
        )
        print("Connection successful!")
        await conn.close()
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(test_connection())