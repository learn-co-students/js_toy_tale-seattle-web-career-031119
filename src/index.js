
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const TOYURL = 'http://localhost:3000/toys'

let addToy = false

// TOY FETCHER
function getToys() {
  fetch(TOYURL)
  .then( res => res.json() )
  .then( addToys )
}

// TOY BOSS
function addToys (toys) {
  toys.forEach( makeToy )
}

// TOY MAKER STUFF
function makeToy (toy) {
  let toyDiv = document.getElementById("toy-collection")
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')

  div.classList.add("card")
  h2.textContent = toy.name
  img.src = toy.image
  img.classList.add("toy-avatar")
  p.textContent = toy.likes + " likes"

  let likeButton = newLikeButton(toy)
  let deleteButton = newDeleteButton(toy, div)

  addChildren(div, h2, img, p, likeButton, deleteButton)
  toyDiv.appendChild(div)
}

// makes a like button for the toy card
function newLikeButton(toy) {
  let likeButton = document.createElement('button')
  likeButton.textContent = "like <3"
  likeButton.classList.add("like-btn")
  likeButton.addEventListener('click', _ => {
    increaseLikes(toy)
    .then( json => p.textContent = json.likes + " likes")
    })
  return likeButton
}

// makes a delete button for the toy card
function newDeleteButton(toy, div) {
  let deleteButton = document.createElement('button')
  deleteButton.textContent = "delete <3333"
  deleteButton.classList.add("like-btn")
  deleteButton.addEventListener('click', _ => {
    deleteToy(toy.id)
    .then( _ => div.remove() )
  })
  return deleteButton
}

// wraps up the child adding process for the toy card
function addChildren(div, ...args) {
  args.forEach(arg => div.appendChild(arg) )
}

// takes an ID and deletes the toy from the DB
function deleteToy(id) {
  return fetch(TOYURL +'/' + id, {
    method: "DELETE"
    }).then (res => res.json())
}

// sends a new like for a toy to the DB
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

// this came with the code, shows/hides the toy form
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

// gets toy name/img from form, submits, and closes form
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

// THE BIG BOSS
function main() {
  getToys()
}

// we are very sure the page loads before we start doing stuff
document.addEventListener('DOMContentLoaded', main)
