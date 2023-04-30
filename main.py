import pymssql
import asyncio
from datetime import datetime

connection = pymssql.connect(server='localhost', user='sa', password='7LhDkK$M', database='juego')
cursor = connection.cursor()

cursor.execute('select count(*) from usuario;')
count_idUsuario = cursor.fetchone()

print(count_idUsuario)

# async def get_users():
#     cursor.execute('select * from usuario')
#     usuarios = await cursor.fetchall()
#     return usuarios

# async def get_partidas():
#     cursor.execute('select * from partida')
#     partidas = await cursor.fetchall()
#     return partidas

# async def main():

#     result = asyncio.gather
#     return 


# asyncio.run(main)

connection.close()