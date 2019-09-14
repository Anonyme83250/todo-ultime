// todo-ultime : la to-do list ultime.

var KEY = 'todo-ultime';
var form = document.getElementById('form');
var input = document.getElementById('task');
var list = document.getElementById('list');
var tasks = JSON.parse(localStorage.getItem(KEY)) || [];

function save() {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

function render() {
  list.innerHTML = '';
  tasks.forEach(function (t) {
    var li = document.createElement('li');
    li.dataset.id = t.id;
    if (t.done) li.className = 'done';
    var span = document.createElement('span');
    span.textContent = t.text;
    var del = document.createElement('button');
    del.type = 'button';
    del.className = 'del';
    del.textContent = '×';
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var text = input.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = '';
  save();
  render();
});

list.addEventListener('click', function (e) {
  var li = e.target.closest('li');
  if (!li) return;
  var i = tasks.findIndex(function (t) { return t.id === +li.dataset.id; });
  if (e.target.className === 'del') tasks.splice(i, 1);
  else tasks[i].done = !tasks[i].done;
  save();
  render();
});

render();

// TODO : synchronisation multi-appareils
