import mysql.connector

# Conexión a la base de datos
mydb = mysql.connector.connect(
  host="localhost",
  user="sa",
  password="7LhDkK$M",
  database="juego",
  port=1433
)

# Crear un cursor
mycursor = mydb.cursor()

# Ejecutar una consulta SQL
mycursor.execute("SELECT * FROM usuario")

# Obtener los resultados
myresult = mycursor.fetchall()

# Imprimir los resultados
for x in myresult:
  print(x)