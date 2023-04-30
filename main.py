import pymssql
from datetime import datetime

def get_usuarios():
    cursor.execute('select * from usuario;')
    return cursor.fetchall()

def get_partidas():
    cursor.execute('select * from partida;')
    return cursor.fetchall()

def get_partidasminijuego():
    cursor.execute('select * from [partida-minijuego];')
    return cursor.fetchall()

def get_minijuegos():
    cursor.execute('select * from minijuego;')
    return cursor.fetchall()

def get_habilidades():
    cursor.execute('select * from habilidad;')
    return cursor.fetchall()


connection = pymssql.connect(server='localhost', user='sa', password='7LhDkK$M', database='juego')
cursor = connection.cursor()

usuarios = get_usuarios()
partidas = get_partidas()
partidasminijuego = get_partidasminijuego()
minijuegos = get_minijuegos()
habilidades = get_habilidades()

print(usuarios)
print(partidas)

connection.close()