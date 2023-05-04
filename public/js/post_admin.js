const form = document.getElementById('form');
// form.addEventListener('submit', handleSubmit);
form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const formData = new FormData(form); 
    const url = form.action; 
    const queryParams = new URLSearchParams(formData).toString(); 
    const fullUrl = `${url}?${queryParams}`; 
    window.href = fullUrl;
  });
  

