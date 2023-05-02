const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

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
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}
