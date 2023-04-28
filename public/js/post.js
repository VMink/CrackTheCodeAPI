const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData.entries());
    console.log(jsonData);
    fetch("http://52.55.120.19:8080/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success: ', result);
        alert('Hecho')
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}
