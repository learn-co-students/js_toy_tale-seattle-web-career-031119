const addBtn = document.querySelector('#new-toy-btn')
const createBtn = document.querySelector('#click-create')
const toyForm = document.querySelector('.container')

let addToy = false

const TOYS_API = 'http://localhost:3000/toys'


function loadToys () {
  fetch (TOYS_API)
    .then(res => res.json())
    .then(toys => {
      console.log(toys)
      displayToys(toys)
    })
}

function displayToys(toys) {
  toys.forEach((toy) => {
    makeToyCard(toy)
  })
}

function makeToyCard(toy) {
  const bigDiv = document.getElementById('toy-collection')
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const imgUrl = toy.image
  const p = document.createElement('p')
  const button = document.createElement('button')
  const toyId = toy.id

  div.classList.add('card')

  h2.textContent = toy.name

  img.src = imgUrl
  img.classList.add('toy-avatar')

  p.textContent = `${toy.likes} Likes`

  button.classList.add('like-btn')
  button.textContent = "Like ♥"
  button.addEventListener('click', clickLike)

  bigDiv.appendChild(div)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)

  function clickLike(ev) {
    p.textContent = `${++toy.likes} Likes`
    console.log('likes:', toy.likes)
    patchLike(toy)
  }

  function patchLike (toy) {
    // newLikes = div.querySelector('p').innerText
    // numLikes = newLikes[0]
    return fetch (TOYS_API + "/" + toyId, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes
      })
    })
  }
}


createBtn.addEventListener('click', clickCreate)

function clickCreate(ev) {
  ev.preventDefault()
  let name = ev.target.form[0].value
  let image = ev.target.form[1].value
  console.log('name:', name)
  console.log('image:', image)
  createToy(name, image)
}

function createToy(name, image) {
  return fetch(TOYS_API, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(newToy => makeToyCard(newToy))
}






addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


loadToys()
