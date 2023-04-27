const form = document.getElementById('form');

form.addEventListener('submit',  async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    console.log(formData)

    try {
        const response = await fetch("http://52.55.120.19:8080/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        })
    
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.log(error)
    }
});