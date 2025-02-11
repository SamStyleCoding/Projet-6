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
		}
	  } 
	  else {
		for(let i = 0; i < json.length; i++){
			setFigure(json[i]);
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




function modeEdition () {
	if(localStorage.authToken) {
		const editBanner = document.createElement("div");
		editBanner.className = "edition";
		editBanner.innerHTML = `<p><i class="fa-regular fa-pen-to-square"></i>Mode édition</p>`;
		document.body.prepend(editBanner);
	}
}
modeEdition();

