const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);
// form.addEventListener("submit", (e) => {
//     e.preventDefault(); 
//     const formData = new FormData(form); 
//     const url = form.action; 
//     const queryParams = new URLSearchParams(formData).toString(); 
//     const fullUrl = `${url}?${queryParams}`; 
//     window.href = fullUrl;
//   });
  

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData.entries());
    fetch("http://52.55.120.19:8080/login-admin", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(jsonData)
    }).then(response => response.json())
    .then(result => {
        if (result.error == 'si') {
            alert('Error: ' + result.resultado);
        } else {
            window.location = 'http://52.55.120.19:8080/tableau';
        }
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}