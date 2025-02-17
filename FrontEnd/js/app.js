async function getWorks(filterId) {

	document.querySelector(".gallery").innerHTML = ""

	const url = "http://localhost:5678/api/works";
	
	try {
	  const response = await fetch(url);

	  if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	  }
	  const json = await response.json();
	  
	  if(filterId) {
		const filtered = json.filter((data) => data.categoryId === filterId);
		for(let i = 0; i < filtered.length; i++){
			setFigure(filtered[i]);
			setModalFigure(filtered[i]);
		}
	  } 
	  else {
		for(let i = 0; i < json.length; i++){
			setFigure(json[i]);
			setModalFigure(json[i]);
	    }
	  }
	}
	catch (error) {
	  console.error(error.message);
	}
}
getWorks();


function setFigure(data){
	const figure = document.createElement("figure");
	figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
				        <figcaption>${data.title}</figcaption>`;

	document.querySelector(".gallery").append(figure);
}

function setModalFigure(data){
	const figure = document.createElement("figure");
	figure.innerHTML = `<div class="image-container">
						<img src=${data.imageUrl} alt=${data.title}>
				        <figcaption>${data.title}</figcaption>
						<i class="fa-solid fa-trash-can overlay-icon"></i>
			           </div>`;

	document.querySelector(".gallery-modal").append(figure);
}





async function getCategories() {

	const url = "http://localhost:5678/api/categories";
	
	try {
	  const response = await fetch(url);

	  if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	  }
	  const json = await response.json();

	  for(let i = 0; i < json.length; i++){
		setFilter(json[i]);
	  }

	}
	catch (error) {
	  console.error(error.message);
	}
}
getCategories();


function setFilter(data){
	const div = document.createElement("div");
	div.className = data.id;
	div.innerHTML = `${data.name}`;
	document.querySelector(".div-projets").append(div);
	div.addEventListener("click", () => {
		getWorks(data.id)
	});
}
document.querySelector(".tous").addEventListener('click', () => {
	getWorks()
});





let modal = null

function modeEdition () {
	
	if(localStorage.authToken) {
		const editBanner = document.createElement("div");
		editBanner.className = "edition";
		editBanner.innerHTML = `<p><a href="#modal1" class="js-model"><i class="fa-regular fa-pen-to-square"></i>Mode édition</a></p>`;
		document.body.prepend(editBanner);

		const login = document.querySelector(".login");
		login.textContent = "logout";
	}
}
modeEdition();

const openModel = function(e) {
	e.preventDefault();
	const target = document.querySelector(e.target.getAttribute("href"));
	target.style.display = null;
	target.removeAttribute("aria-hidden");
	target.setAttribute("aria-modal", "true");
	modal = target;
	modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
};

const closeModal = (e) => {
	if(modal === null) return;
	e.preventDefault();
	modal.style.display = "none";
	modal.removeAttribute("aria-modal");
	modal.setAttribute("aria-hidden", "true");
	modal = null;
	document.activeElement.blur();
};

document.querySelectorAll(".js-model").forEach((a) => {
	a.addEventListener("click", openModel);

});





































// let modal = null
// const focusableSelector = "button, a, input, textarea";
// let focusables = [];

// function modeEdition () {
// 	if(localStorage.authToken) {
// 		const editBanner = document.createElement("div");
// 		editBanner.className = "edition";
// 		editBanner.innerHTML = `<p><a href="#modal1" class="js-model"><i class="fa-regular fa-pen-to-square"></i>Mode édition</a></p>`;
// 		document.body.prepend(editBanner);

// 		const login = document.querySelector(".login");
// 		login.textContent = "logout";
// 	}
// }
// modeEdition();

// const openModel = function(e) {
// 	e.preventDefault();
// 	modal = document.querySelector(e.target.getAttribute("href"));
// 	focusables = Array.from(modal.querySelectorAll(focusableSelector));
// 	focusables[0].focus();
// 	// const target = document.querySelector(e.target.getAttribute("href"));
// 	modal.style.display = null;
// 	modal.removeAttribute("aria-hidden");
// 	modal.setAttribute("aria-modal", "true");
// 	// modal = target;
// 	modal.addEventListener("click", closeModal);
// 	modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
// 	modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
// };

// const closeModal = (e) => {
// 	if(modal === null) return;
// 	e.preventDefault();
// 	modal.style.display = "none";
// 	modal.removeAttribute("aria-modal");
// 	modal.setAttribute("aria-hidden", "true");
// 	modal.removeEventListener("click", closeModal);
// 	modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
// 	modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
// 	modal = null;
// };

// const stopPropagation = (e) => {
// 	e.stopPropagation();
// }

// const focusInModal = (e) => {
// 	e.preventDefault();
// 	let index = focusables.findIndex( f => f === modal.querySelector(":focus"));
// 	// modal.querySelector(":focus");
// 	if(e.shiftKey === true) {
// 		index--;
// 	}
// 	else{
// 		index++;
// 	}

// 	if(index >= focusables.length) {
// 		index = 0;
// 	}
// 	if(index > 0) {
// 		index = focusables.length - 1;
// 	}
// }

// window.addEventListener("keydown", function(e) {
// 	if(e.key === 'Escape' || e.key === 'Esc'){
// 		closeModal(e);
// 	}
// 	if(e.key === 'Tab' && modal !== null){
// 		focusInModal(e);
// 	}
// 	focusables[index].focus();
// });

// document.querySelectorAll(".js-model").forEach((a) => {
// 	a.addEventListener("click", openModel);
// });








// modal.addEventListener("click", closeModal);



// modal.removeEventListener("click", closeModal);
// modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);