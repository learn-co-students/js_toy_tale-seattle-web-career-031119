const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const newToyForm = document.querySelector('.add-toy-form')

const TOYSURL = 'http://localhost:3000/toys'



let addToy = false

// YOUR CODE HERE

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


// fetch server toys

fetch(TOYSURL)
  .then(res => res.json())
  .then(json => handleToys(json))


function handleToys(json) {
  json.forEach((toy) => {
    makeCard(toy)
  })
}

function makeCard(toy) {

  const div = document.createElement('div')
  div.classList.add('card')
  div.setAttribute('toy-id', toy.id)
  toyCollection.appendChild(div)


  const h2 = document.createElement('h2')
  h2.textContent = toy.name
  div.appendChild(h2)

  const img = document.createElement('img')
  img.src = toy.image
  img.classList.add('toy-avatar')
  div.appendChild(img)

  const p = document.createElement('p')
  p.textContent = `${toy.likes} Likes `
  div.appendChild(p)

  const button = document.createElement('button')
  button.classList.add('like-btn')
  button.textContent = "Like ♥"
  button.addEventListener("click", () => handleLike(toy))
  div.appendChild(button)


}

//get new toy info
newToyForm.addEventListener('submit', handleSubmit)

function handleSubmit(ev) {
  ev.preventDefault()

  const name = ev.target.elements['name'].value
  const img = ev.target.elements['image'].value
  createNewToy(name,img)

}

function handleLike(toy) {
  toy.likes = toy.likes + 1
  return fetch(TOYSURL + `/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
  })
  .then(res => res.json())
  .then(_ => window.location.reload())
}


// fetch post a toy
function createNewToy(name, img) {
  return fetch(TOYSURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": img,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(_ => window.location.reload())
}
