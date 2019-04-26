
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const TOYURL = 'http://localhost:3000/toys'

let addToy = false

// YOUR CODE HERE
function getToys() {
  fetch(TOYURL)
  .then( res => res.json() )
  .then( addToys )
}

function addToys (toys) {
  toys.forEach( makeToy )
}

function makeToy (toy) {
  let toyDiv = document.getElementById("toy-collection")
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let likeButton = document.createElement('button')
  let deleteButton = document.createElement('button')

  div.classList.add("card")
  h2.textContent = toy.name
  img.src = toy.image
  img.classList.add("toy-avatar")
  p.textContent = toy.likes + " likes"

  likeButton.textContent = "like <3"
  likeButton.classList.add("like-btn")
  likeButton.addEventListener('click', _ => {
    increaseLikes(toy)
    .then( json => p.textContent = json.likes + " likes")
    })

  deleteButton.textContent = "delete <3333"
  deleteButton.classList.add("like-btn")
  deleteButton.addEventListener('click', _ => {
    deleteToy(toy.id)
    .then( _ => div.remove() )
  })

  addChildren(div, h2, img, p, likeButton, deleteButton)
  toyDiv.appendChild(div)
}

function addChildren(div, ...args) {
  args.forEach(arg => div.appendChild(arg) )
}

function deleteToy(id) {
  return fetch(TOYURL +'/' + id, {
    method: "DELETE"
    }).then (res => res.json())
}

function increaseLikes(toy) {
  return fetch(TOYURL + '/' + toy.id, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      likes: ++toy.likes
    })
  })
  .then( res => res.json() )
}

addBtn.addEventListener('click', (ev) => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    let form = document.getElementsByClassName('add-toy-form')[0]
    form.addEventListener( "submit", submitToy )
  } else {
    toyForm.style.display = "none"
  }
})

function submitToy(ev) {
  ev.preventDefault()
  let form = ev.target
  let toyName = form.elements["name"].value
  let toyImage = form.elements["image"].value
  return fetch(TOYURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 1
    })
  }).then( res => res.json() )
  .then( makeToy )
  .then( _ => toyForm.style.display = "none")
}


// OR HERE!
function main() {
  getToys()
}

document.addEventListener('DOMContentLoaded', main)
