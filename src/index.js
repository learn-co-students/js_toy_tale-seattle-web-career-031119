document.addEventListener("DOMContentLoaded", function() {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  // YOUR CODE HERE
  // Fetch data from API
  function getToyCollection(){
      fetch("http://localhost:3000/toys")
        .then(res => res.json())
        .then(json=> createCardDiv(json))
    }

//Create toy card
  function createCardDiv(toys){
    toys.forEach(toy => {
      createToy(toy)
    })
  }

//Creating toy to render on toy card
  function createToy(toy){
    let toyCollectionDiv = document.getElementById('toy-collection')

    let toyCardDiv= document.createElement('div')
    toyCardDiv.classList.add('card')

    let toyName = document.createElement('h2')
    toyName.textContent = toy.name

    let toyImage = document.createElement('img')
    toyImage.classList.add("toy-avatar")
    toyImage.src = toy.image

    let toyLikes = document.createElement('p')
    toyLikes.textContent = `${toy.likes} Likes`

    //we need to grab likes from the card in fx above
    // addEventListener to click action and pass in updatesLikes
    //which will be defined below
    //pass in (toy.likes, toy.id) so it knows which toy
    //to add likes to
    let likeButton = document.createElement('button')
    likeButton.classList.add('like-btn')
    likeButton.textContent = 'Like'
    likeButton.addEventListener('click', () => {
      updatesLikes(toy.likes, toy.id)
    })

    toyCardDiv.appendChild(toyName)
    toyCardDiv.appendChild(toyImage)
    toyCardDiv.appendChild(toyLikes)
    toyCardDiv.appendChild(likeButton)
    toyCollectionDiv.appendChild(toyCardDiv)
  }
//adding ++ before instantly increments value
function updatesLikes(likes, id){
  return fetch("http://localhost:3000/toys/" + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: ++likes
    })
  }).then(res => {return res.json()})
  .catch(err => {
    displayError(err)
  })
.then(_ => window.location.reload())
}

//Create function to add a new toy through a form
  function addNewToy(){
    let newToyForm = document.getElementById('new-toy')
    newToyForm.addEventListener('submit', handleSubmit)
  }

//prevent default to prevent form from refreshing page
//calling toyName and toyImage from function saveToy
//where name and toy are called bc they dont need to be
//the exact same as in the handleSubmit fx
function handleSubmit(ev){
  ev.preventDefault()

  let toyName = ev.target.elements['name'].value
  let toyImage = ev.target.elements['image'].value
  saveToy(toyName, toyImage)
  .then(toy => createToy)
  createLikeButton()
}

function saveToy(name, image){
  return fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  }).then(res => {return res.json()})
	.catch(err => {
		displayError(err)
	})
.then(_ => window.location.reload())
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




// OR HERE!






  function main(){
    getToyCollection()
    addNewToy()

  }

  main()


console.log("The DOM has loaded");
});
