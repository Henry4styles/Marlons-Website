let request = new Request('https://jsonplaceholder.typicode.com/posts/1', {
    body: FormData,
    method: 'POST',
});

fetch(request)
    .then(response => response.json())
    .then(data => {console.log(data)})
    // myForm.reset();

    .catch(error => console.error('Error:', error));

