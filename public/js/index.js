 function getTodos() {
     fetch('/todos')
         .then(res => res.json())
         .then(todos => {
             todos.forEach(todo => {
                 const $h2 = document.createElement('h2');
                 const $p = document.createElement('p');
                 $h2.innerHTML = todo.task;
                 $p.innerHTML = todo.details;
                 document.body.appendChild($h2);
                 document.body.appendChild($p);
                 $h2.classList.add('text-center');
                 $p.classList.add('text-center');
             });
             console.log(JSON.stringify(todos));
         });
     console.log('getting todos');
 }

 window.onload = getTodos();

 document.getElementById('add').addEventListener('click', function() {
     const task = document.querySelector('#task').value;
     const details = document.querySelector('#details').value;
     const data = {
         task: task,
         details: details
     };
     fetch('/add', {
         method: "POST",
         body: JSON.stringify(data),
         headers: { "Content-Type": "application/json; charset=UTF-8" }
     });
     getTodos();
 });