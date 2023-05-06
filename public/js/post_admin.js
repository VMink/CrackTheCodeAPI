const form = document.getElementById('form'); //Obtenemos el form con el DOM 
form.addEventListener('submit', (e) => { //Detectamos el submit del boton
    e.preventDefault(); 
    const formData = new FormData(form);  //Obtenemos la informacion del formulario
    const url = form.action;  //Tomamos el endpoint al que apunta el formulario
    const queryParams = new URLSearchParams(formData).toString();  //Creamos los parametros del query
    const fullUrl = `${url}?${queryParams}`;  //URL completa
    window.location.href = fullUrl; //Cambiamos de URL
  });
  

