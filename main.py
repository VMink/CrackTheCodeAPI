import pymssql
import datetime

connection = pymssql.connect(server='localhost', user='sa', password='7LhDkK$M', database='juego')
cursor = connection.cursor()

cursor.execute('SELECT * FROM usuario;')
rows = cursor.fetchall()

for row in rows:
    print(row)

connection.close()