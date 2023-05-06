//Sript para hacer funcionar la lada internacional
const phoneInputField = document.querySelector("#telefono");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
})

const form = document.getElementById('form'); //Obtenemos el form 
form.addEventListener('submit', (event) => { //Evento de submit
    event.preventDefault();
    //Capturamos los datos del formulario y juntamos el numero de telefono con la lada internacional
    const phoneNumber = phoneInput.getNumber();
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData.entries());
    jsonData.telefono = phoneNumber;
    //Peticion POST para realizar el registro en la base de datos usando Fetch
    fetch("http://52.55.120.19:8080/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(jsonData) //Convertimos el formulario a un JSON
    })
    .then(response => response.json())
    .then(result => {
        if (result.error == 'si') {
            alert('Error: ' + result.resultado);
        } else {
            const url = form.action;
            window.location.href = url;
            console.log(url);
        }
    })
    .catch(error => {
        console.log('Error: ', error)
    })
})
