// todo-ultime : la to-do list ultime.

var form = document.getElementById('form');
var input = document.getElementById('task');
var list = document.getElementById('list');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!input.value) return;
  var li = document.createElement('li');
  li.textContent = input.value;
  list.appendChild(li);
  input.value = '';
});

// TODO : cocher, supprimer, sauvegarder
