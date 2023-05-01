from urllib import request
import json
from pymssql import connect,InterfaceError,OperationalError
from datetime import datetime,timedelta,date
from hashlib import sha3_256
import random

num_usuarios = 1000

paises = ('Argentina','Bolivia','Brasil','Chile',
          'Colombia','Ecuador','Islas Malvinas','Guyana Francesa',
          'Guyana','México','Paraguay','Perú','Suriname',
          'Uruguay','Venezuela')

clave_tel_pais = {'Argentina':'54','Bolivia':'591','Brasil':'55',
                  'Chile':'56','Colombia':'57','Ecuador':'593',
                  'Islas Malvinas':'500','Guyana Francesa':'594',
                  'Guyana':'592','México':'52','Paraguay':'595',
                  'Perú':'51','Suriname':'597','Uruguay':'598',
                  'Venezuela':'58'}

try:
    connection = connect(server='localhost', user='sa', password='7LhDkK$M', database='juego')
    print('Conexion con la BD establecida con exito')
    cursor = connection.cursor()
except InterfaceError as e:
    print(f'No se pudo establecer conexion con la BD. Error:{e}')
    quit(2)
except OperationalError as e:
    print(f'No se pudo establecer conexion con la BD. Error:{e}')
    quit(2)

usuarios_guardados = []

for usuario in range(num_usuarios):

    url = 'https://randomuser.me/api/'
    try:
        respuesta = json.loads(request.urlopen(url).read().decode())
    except:
        continue


    idUsuario = respuesta["results"][0]['login']['username']
    nombre = respuesta["results"][0]["name"]['first']
    apellido = respuesta["results"][0]["name"]['last']
    datenow = date.today()
    timed = timedelta(days=random.randint(2992,4750))
    randomBirthday = datenow - timed
    fechaNacimiento = randomBirthday.strftime('%Y-%m-%d')
    contraseña = sha3_256(respuesta["results"][0]['login']['password'].encode()).hexdigest()
    correo = respuesta["results"][0]['email']
    pais = random.choice(paises)
    phone = respuesta["results"][0]['phone']
    telefono = f'+{clave_tel_pais[pais]}{phone}'


    query_insert_usuario = 'insert into usuario (idUsuario,nombre,apellido,fechaNacimiento,contraseña,correo,telefono,pais) values (%s,%s,%s,%s,%s,%s,%s,%s);'
    values_insert_usuario = (idUsuario,nombre,apellido,fechaNacimiento,contraseña,correo,telefono,pais)

    cursor.execute(query_insert_usuario,values_insert_usuario)
    connection.commit()

    seed = respuesta['info']['seed']
    plain_pass = respuesta["results"][0]['login']['password']

    usuarios_guardados.append(f'{idUsuario}: {plain_pass}\nseed: {seed}\n\n')

    for partida in range(random.randint(0,5)):
        now = datetime.now()
        timed = timedelta(days=random.randint(0,5),hours=random.randint(0,23),minutes=random.randint(0,59),seconds=random.randint(0,59))
        randomDateBegin = now - timed
        timed = timedelta(hours=random.randint(0,3),minutes=random.randint(0,59),seconds=random.randint(0,59))
        randomDateEnd = randomDateBegin + timed
        fechaHoraInicio = randomDateBegin.strftime('%Y-%m-%d %H:%M:%S')
        fechaHoraFinal = randomDateEnd.strftime('%Y-%m-%d %H:%M:%S')
        puntuacionAcumulada = random.randint(10,100)

        query_insert_partida = 'insert into partida (idUsuario,fechaHoraInicio,fechaHoraFinal,puntuacionAcumulada) values (%s,%s,%s,%s);'
        values_insert_partida = (idUsuario,fechaHoraInicio,fechaHoraFinal,puntuacionAcumulada)

        try:
            cursor.execute(query_insert_partida,values_insert_partida)
            connection.commit()

            idPartida = cursor.lastrowid
        except:
            continue

        for partidaminijuego in range(1,6):
            if partidaminijuego == 1 or partidaminijuego == 3:
                nivelAlcanzado = random.randint(1,3)
            else:
                nivelAlcanzado = random.randint(1,5)
            scoreHabilidadAlcanzado = random.randint(5,20)

            query_insert_partidaminijuego = 'insert into [partida-minijuego] (idUsuario,idPartida,idMinijuego,nivelAlcanzado,scoreHabilidadAlcanzado) values (%s,%s,%s,%s,%s);'
            values_insert_partidaminijuego = (idUsuario,idPartida,partidaminijuego,nivelAlcanzado,scoreHabilidadAlcanzado)

            cursor.execute(query_insert_partidaminijuego,values_insert_partidaminijuego)
            connection.commit()
    
    print(f'{usuario}: Usuario registrado {idUsuario}')

with open('usuarios_registrados.txt','a') as file:
    file.writelines(usuarios_guardados)

connection.close()
print('Conexion con la BD finalizada')

