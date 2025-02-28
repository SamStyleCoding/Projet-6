async function getWorks(filterId) {

	document.querySelector(".gallery").innerHTML = ""
	document.querySelector(".gallery-modal").innerHTML = ""
	
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

	  const deleteTrashCan = document.querySelectorAll(".fa-trash-can");	  
	  deleteTrashCan.forEach((e) => e.addEventListener("click", (event) =>  deleteWork(event)));

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
						<i id=${data.id} class="fa-solid fa-trash-can overlay-icon"></i>
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
		login.style.cursor = "pointer"

		document.querySelector(".modifier").style.display = "block"

		document.querySelector(".login").addEventListener("click", () => {
			localStorage.clear();
			window.location.href = 'login.html';
		})
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




async function deleteWork(event) {
	event.stopPropagation();
		const id = event.srcElement.id;
		const deleteApi = "http://localhost:5678/api/works/";
		const token = localStorage.authToken;

		let response = await fetch(deleteApi + id, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		if(response.status === 401 || response.status === 500 ) {
			const errorBox = document.createElement("div");
			errorBox.className = "error-login";
			errorBox.innerHTML = "Error";
			document.querySelector(".model-button-container").prepend(errorBox);
		}
		else{
			try {
				result = await response.json();
			} 
			catch {
				console.warn("No JSON response from server, but delete was successful.");
			}

        const deletedElement = document.getElementById(id).closest("figure");
			if (deletedElement) {
				deletedElement.remove();
			}
		}

		updateGallery();

	}

	async function updateGallery() {
		const galleryContainer = document.querySelector(".gallery"); 
		galleryContainer.innerHTML = ""; 
	
		let response = await fetch("http://localhost:5678/api/works");
		let works = await response.json();
	
		works.forEach(work => {
			const figure = document.createElement("figure");
			figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}">
								<figcaption>${work.title}</figcaption>`;
			galleryContainer.appendChild(figure);
		});
	}
	




const switchModal = function () {

	document
	.querySelector(".modal-wrapper")
	.innerHTML=`<div class="modal-buttons-container">
					<button class="js-modal-back">
						<i class="fa-solid fa-arrow-left"></i>
					</button>
					<button class="js-modal-close">
						<i class="fa-solid fa-xmark"></i>
					</button>
				</div>
				<h3 class="titre-modal">Ajout photo</h3>
				<div id="contact">
					<form id="picture-form" action="#" method="post">
						<div class="file-section">
							<div id="photo-container"></div>
							<div><i class="fa-regular fa-image picture-loaded"></i></div>
							<label class="picture-loaded" for="file">+ Ajouter photo</label>
							<input type="file" id="file" name="file" accept="image/png, image/jpeg">
							<p class="picture-loaded">jpg, png : 4mo max</p>
						</div>
						<label for="title">Titre</label>
						<input type="text" name="title" id="title" required>
						<label for="category">Catégory</label>
						<select name="category" id="category">
							<option value="1">Objets</option>
							<option value="2">Appartements</option>
							<option value="3">Hotels & Restaurants</option>
						</select>
						<hr />
						<input type="submit" value="Valider" id="submitButton" class="add-photo model-button-container" style="cursor: pointer;">
					</form>
				</div>`;
	document.querySelector("#file").style.display = 'none';


const backButton = document.querySelector(".js-modal-back");
	backButton.addEventListener("click", function () {
		document
		.querySelector(".modal-wrapper")
		.innerHTML = `<div class="close-button-container">
						<button class="js-modal-close">
							<i class="fa-solid fa-xmark"></i>
						</button>
						</div>
						<h3 class="titre-modal">Galerie photo</h3>
						<div class="gallery-modal"></div>
						<hr />
						<div class="model-button-container">
							<button class="add-photo">Ajouter une photo</button>
						</div>`;

	document.querySelector(".js-modal-close").addEventListener("click", closeModal);
	document.querySelector(".add-photo").addEventListener("click", switchModal);
	getWorks();
	});
	document.querySelector(".fa-xmark").addEventListener("click", closeModal);

	

	document.getElementById("file").addEventListener("change", function (event) {
		file = event.target.files[0];
		if(file && (file.type === "image/jpeg" || file.type === "image/png")) {
			const reader = new FileReader();
			reader.onload = function(e) {
				const img = document.createElement("img");
				img.src = e.target.result;
				img.alt = "Uploaded Photo";
				document.getElementById("photo-container").appendChild(img);
			};
			reader.readAsDataURL(file);
			document.querySelectorAll(".picture-loaded").forEach((e) => e.style.display = "none");
		}
		else{
			alert("veuillez sélectionner une image au format JPG ou PNG");
		}
	});
	


const titleInput = document.querySelector("#title");
let titleValue = "";
	titleInput.addEventListener("input", () => {
		titleValue = titleInput.value;
	});


let selectedValue = "1";
	document.getElementById("category").addEventListener("change", function () {
		selectedValue = this.value;
	});


const addPictureForm = document.getElementById("picture-form");
	addPictureForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		const hasImage = document.querySelector("#photo-container").firstChild;
		if(hasImage && titleValue) {

			const formData = new FormData();
			
			formData.append("image", file);
			formData.append("title", titleValue);
			formData.append("category", selectedValue);

			const token = localStorage.authToken;

			let response = await fetch("http://localhost:5678/api/works", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
				},
				body: formData,
			});
		
			if(!response.ok) {
				alert("Error")
			}
			else {
				let result = await response.json();
				updateGallery();
				location.reload();
				}
			}
	});

};
document.querySelector(".add-photo").addEventListener("click", switchModal, closeModal);
