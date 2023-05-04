const phoneInputField = document.querySelector("#telefono");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
})

const form = document.getElementById('form');
form.addEventListener('submit', event);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const phoneNumber = phoneInput.getNumber();
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData.entries());
    jsonData.telefono = phoneNumber;
    fetch("http://52.55.120.19:8080/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(result => {
        if (result.error == 'si') {
            alert('Error: ' + result.resultado);
        } else {
            const url = form.action;
            window.href = url;
        }
    })
    .catch(error => {
        console.log('Error: ', error)
    })
})

// function handleSubmit(event) {
//     event.preventDefault();
//     const phoneNumber = phoneInput.getNumber();
//     const formData = new FormData(event.target);
//     const jsonData = Object.fromEntries(formData.entries());
//     jsonData.telefono = phoneNumber;
//     fetch("http://52.55.120.19:8080/register", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//           },
//         body: JSON.stringify(jsonData)
//     })
//     .then(response => response.json())
//     .then(result => {
//         if (result.error == 'si') {
//             alert('Error: ' + result.resultado);
//         } else {
//             alert('Cuenta registrada!\n' + result.resultado);
//             const url = form.action;
//             window.href = url;
//         }
//     })
//     .catch(error => {
//         console.log('Error: ', error)
//     })
// }
