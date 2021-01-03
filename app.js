// todo-ultime : la to-do list ultime.

var KEY = 'todo-ultime';
var form = document.getElementById('form');
var input = document.getElementById('task');
var list = document.getElementById('list');
var count = document.getElementById('count');
var filters = document.getElementById('filters');
var filter = localStorage.getItem(KEY + '.filter') || 'all';
var tasks = JSON.parse(localStorage.getItem(KEY)) || [];

function save() {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

function visible(t) {
  return filter === 'all' || (filter === 'done') === t.done;
}

function render() {
  list.innerHTML = '';
  Array.prototype.forEach.call(filters.children, function (b) {
    var on = b.getAttribute('data-filter') === filter;
    b.className = on ? 'on' : '';
    b.setAttribute('aria-pressed', on);
  });
  tasks.filter(visible).forEach(function (t) {
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
  var left = tasks.filter(function (t) { return !t.done; }).length;
  count.textContent = left + (left > 1 ? ' tâches restantes' : ' tâche restante');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var text = input.value.trim();
  if (!text) return;
  var dup = tasks.some(function (t) { return t.text.toLowerCase() === text.toLowerCase(); });
  if (dup) {
    input.select();
    return;
  }
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

filters.addEventListener('click', function (e) {
  var f = e.target.getAttribute('data-filter');
  if (!f) return;
  filter = f;
  localStorage.setItem(KEY + '.filter', f);
  render();
});

document.getElementById('clear').addEventListener('click', function () {
  tasks = tasks.filter(function (t) { return !t.done; });
  save();
  render();
});

var themeBtn = document.getElementById('theme');
if (localStorage.getItem(KEY + '.dark') === '1') {
  document.body.classList.add('dark');
  themeBtn.setAttribute('aria-pressed', 'true');
}
themeBtn.addEventListener('click', function () {
  var on = document.body.classList.toggle('dark');
  themeBtn.setAttribute('aria-pressed', on);
  localStorage.setItem(KEY + '.dark', on ? '1' : '0');
});

render();
input.focus();

// TODO : synchronisation multi-appareils
// TODO : mode sombre automatique (prefers-color-scheme)
// TODO : finir cette liste de TODO
