const tarefaBox = document.getElementById("inputAddTarefa")
const listaTarefas = document.getElementById("doBox")
const listaTarefasFazendo = document.getElementById("doingBox")
const listaTarefasFeitas = document.getElementById("doneBox")
const quadroDo = document.getElementById("doBoard")
const quadroDoing = document.getElementById("doingBoard")
const quadroDone = document.getElementById("doneBoard")
let elementoMovendo = null
let offsetX
let offsetY


function addTarefa(texto) {
  const novaTarefa = document.createElement('li')
  novaTarefa.style.display = 'flex'
  novaTarefa.style.alignItems = 'Center'
  novaTarefa.style.justifyContent = 'space-between'
  novaTarefa.addEventListener("mousedown", (e) => {iniciaMovimento(e, novaTarefa)})
  novaTarefa.addEventListener("touchstart", (e) => {iniciaMovimento(e, novaTarefa)})
  novaTarefa.classList.add('tarefa')
  novaTarefa.innerHTML = texto
  tarefaBox.value = ''
  novaTarefa.innerHTML += `<button class="btn-remover" onclick="this.parentElement.remove()">X</button>`
  listaTarefas.appendChild(novaTarefa)
}

function iniciaMovimento(e, tarefa) {
  if(e.target.tagName !== 'BUTTON') {
    elementoMovendo = e.target
  }
  offsetX = e.clientX
  offsetY = e.clientY 

  document.addEventListener('mousemove', moveTarefa);
  document.addEventListener('mouseup', pararMover);
}

function moveTarefa(e) {
  if (elementoMovendo) {
    var x = e.clientX - offsetX;
    var y = e.clientY - offsetY;

    elementoMovendo.style.left = x + 'px';
    elementoMovendo.style.top = y + 'px';
  }
}

function pararMover(e) {
  
  if(testeSeMoveu(e)) {
    let novoElemento = elementoMovendo
    console.log(testeSeMoveu(e))
    switch(testeSeMoveu(e)) {
      case 'doBox':
        listaTarefas.appendChild(novoElemento)
        break
      case 'doingBox':
        listaTarefasFazendo.appendChild(novoElemento)
        break
      case 'doneBox':
        listaTarefasFeitas.appendChild(novoElemento)
        break
    }
  } 
  elementoMovendo.style.left = 0 + 'px';
  elementoMovendo.style.top = 0 + 'px';
  
  elementoMovendo = null
  document.removeEventListener('mousemove', moveTarefa);
  document.removeEventListener('mouseup', pararMover);

}

function testeSeMoveu(e) {
  if(e.pageX >= quadroDo.getBoundingClientRect().left && e.pageX <= quadroDo.getBoundingClientRect().right && e.pageY >= quadroDo.getBoundingClientRect().top && e.pageY <= quadroDo.getBoundingClientRect().bottom) {
    return 'doBox'
  }
  else if(e.pageX >= quadroDoing.getBoundingClientRect().left && e.pageX <= quadroDoing.getBoundingClientRect().right && e.pageY >= quadroDoing.getBoundingClientRect().top && e.pageY <= quadroDoing.getBoundingClientRect().bottom) {
    return 'doingBox'
  }
  else if(e.pageX >= quadroDone.getBoundingClientRect().left && e.pageX <= quadroDone.getBoundingClientRect().right && e.pageY >= quadroDone.getBoundingClientRect().top && e.pageY <= quadroDone.getBoundingClientRect().bottom) {
    return 'doneBox'
  } else {
    return null
  }
}

tarefaBox.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    addTarefa(tarefaBox.value)
  }
})