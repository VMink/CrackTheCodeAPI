import pymssql

connection = pymssql.connect(server='localhost', user='sa', password='7LhDkK$M', database='juego')
cursor = connection.cursor()

cursor.execute('SELECT * FROM usuario;')
row = cursor.fetchone()

print(row)

connection.close()