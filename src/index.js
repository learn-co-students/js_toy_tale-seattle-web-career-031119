document.addEventListener("DOMContentLoaded", function() {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  // YOUR CODE HERE
  function getToyCollection(){
    let toyCollectionDiv = document.getElementById('toy-collection')
      fetch("http://localhost:3000/toys")
        .then(res => res.json())
        .then(json=>console.log(json))
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
