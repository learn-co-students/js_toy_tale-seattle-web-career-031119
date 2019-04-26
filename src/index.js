document.addEventListener("DOMContentLoaded", function() {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  // YOUR CODE HERE
  function getToyCollection(){
      fetch("http://localhost:3000/toys")
        .then(res => res.json())
        .then(json=> createCardDiv(json))
    }

  function createCardDiv(toys){
    toys.forEach(toy => {
      createToy(toy)
    })
  }

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

    let likeButton = document.createElement('button')
    likeButton.classList.add('like-btn')
    likeButton.textContent = 'Like'

    toyCardDiv.appendChild(toyName)
    toyCardDiv.appendChild(toyImage)
    toyCardDiv.appendChild(toyLikes)
    toyCardDiv.appendChild(likeButton)
    toyCollectionDiv.appendChild(toyCardDiv)
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

}

main()

console.log("The DOM has loaded");
});
