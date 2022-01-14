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
    });

document.getElementById('add').addEventListener('click', function() {
    let task = document.getElementById('task').value;
    let details = document.getElementById('details').value;
    fetch('/add', {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json; charset=UTF-8" }
    });
});