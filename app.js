// todo-ultime : la to-do list ultime.

var form = document.getElementById('form');
var input = document.getElementById('task');
var list = document.getElementById('list');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!input.value.trim()) return;
  var li = document.createElement('li');
  var span = document.createElement('span');
  span.textContent = input.value.trim();
  var del = document.createElement('button');
  del.type = 'button';
  del.className = 'del';
  del.textContent = '×';
  del.addEventListener('click', function (e) {
    e.stopPropagation();
    li.remove();
  });
  li.appendChild(span);
  li.appendChild(del);
  li.addEventListener('click', function () {
    li.classList.toggle('done');
  });
  list.appendChild(li);
  input.value = '';
});

// TODO : sauvegarder
