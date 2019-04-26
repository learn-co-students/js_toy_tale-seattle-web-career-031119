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

//this .then will set up the page to refresh smoothly after a
//new like has been added to the page
      .then(json => {
        toyLikes.textContent = `${json.likes} Likes`
      })
    })

    toyCardDiv.appendChild(toyName)
    toyCardDiv.appendChild(toyImage)
    toyCardDiv.appendChild(toyLikes)
    toyCardDiv.appendChild(likeButton)
    toyCollectionDiv.appendChild(toyCardDiv)
  }
//adding ++ before instantly increments value
//catch error message not necessary but there in case we had error message
// concatenate/append + id to the end of the url string, set comma, then
// open up a block for method, headers, body, .then statements
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
 // .then(_ => window.location.reload())
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

}


//saveToy function passes in name and image (because of the form on the web
//page) we hard coded likes start point to 0
//we have a catch err fx but not necessary bc there are no error messages
//in db
//.then(toy => createToy(toy)) is passing in toy from the function
//  createToy(toy) into our .then statement and that refreshes the page
//automatically without the janky .then => window.location.reload()
function saveToy(name, image){
  fetch("http://localhost:3000/toys", {
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
  }).then(res => res.json())
	.catch(err => {
		displayError(err)
	})
  .then(toy => createToy(toy))
// .then(_ => window.location.reload())
}


//code below was provided by the lab
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

//Add functions to main to keep track of what you're actually calling
  function main(){
    getToyCollection()
    addNewToy()
  }

//call main function at bottom
  main()


console.log("The DOM has loaded");
});
