let addToy = true;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToys(){
  fetch('http://localhost:3000/toys')
  .then (response => response.json())
  .then (data => {
    data.forEach(function(data){
      displayToysInDom(data)
    })
    
  })
}
renderToys()

function displayToysInDom(data){
  const toyContainer = document.getElementById('toy-collection')
  const container = document.createElement('div')
  container.className = "card"
  container.innerHTML = `
  <h3>${data.name}</h3>
  <img class="toy-avatar" src="${data.image}"/>
  <p class="like">${data.likes}</p>
  <button data-toy-id="${data.id}"class = "btn">Like</button>
  `
  toyContainer.appendChild(container)
  const likeButtons = document.querySelectorAll('.btn') 

  likeButtons.forEach(button=>{
  
  button.addEventListener('click',async function(){
    const toyId = button.getAttribute('data-toy-id')
    

   const response =  await fetch (`http://localhost:3000/toys/${toyId}`,{
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        likes: parseInt(button.previousElementSibling.textContent)+1
      })
    })
    const updatedToy = await response.json()
    
    this.previousElementSibling.textContent = updatedToy.likes
  })
  
})
}

function addNewToys(){
 const form = document.querySelector('.add-toy-form');
 const toyName = document.querySelector('#name');
 const toyImage = document.querySelector('#image')

 
 form.addEventListener('submit', function(){
  const toyObj = {
    name:toyName.value,
    image: toyImage.value,
    likes: 0
   }
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(toyObj)

  })
 })
  
}
addNewToys()



    

