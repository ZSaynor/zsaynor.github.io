//Service worker for cache
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
	  // Registration was successful
	  console.log('ServiceWorker registration successful with scope: ', registration.scope);
	}, function(err) {
	  // registration failed :(
	  console.log('ServiceWorker registration failed: ', err);
	});
  });
}


//searchBar functionality, adapted from Tarik, https://stackoverflow.com/questions/9127498/how-to-perform-a-real-time-search-and-filter-on-a-html-table 
function searchRecipe() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("recipeTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 1; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}

//Used in ingredient checkbox on recipe detail page
function checkboxScan() {
	var boxes = document.getElementsByName('ingcheck');
	for(var i=0; i<boxes.length; i++){
		if(boxes[i].type=='checkbox' && boxes[i].checked==false) {
			document.getElementsByClassName("ingredientMsg")[0].innerHTML = "You do not have all the ingredients"
			return
		}
	}
	document.getElementsByClassName("ingredientMsg")[0].innerHTML = "You have all the ingredients"
}




// Changes the image source of the favourite star based on whether recipe is favourited
function favCheck() {
	// get favorites from local storage or empty array
	var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
	
	// gets the element with class favBtn
	var favID = document.getElementsByClassName("favBtn")
	
	// gets the name of favID element
	var favName = favID[0].getAttribute("name");
	
	// finds index of favID
	var favIndex = favourites.indexOf(favName);

	// if favID in favourites array then image is favourite star else is nonfavourite star
	if(favIndex !== -1) {
		// sets image to favourited
		favID[0].src = "../img/favourites.png"
		
	} else {		
		// Sets image to unfavourited
		favID[0].src = "../img/nonfavourite.png";
	}	
};



try {
	// Used to add strings representing favourite recipes to local storage
	document.querySelector('.favBtn').addEventListener('click', function(fav) {

		// get favorites from local storage or empty array
		var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
		
		// sets favID to name of fav button
		var favID = fav.target.name;
		
		// finds index of favID
		var favIndex = favourites.indexOf(favID);

		// if favID in favourites array then gets removed
		if(favIndex !== -1) {
			favourites.splice(favIndex, 1);
			
			// Sets image to unfavourited
			fav.target.src = "../img/nonfavourite.png"
			
		// else gets added to favourites array
		} else {
			favourites.push(favID);
			
			// sets image to favourited
			fav.target.src = "../img/favourites.png"
		}
		
		
		// sets favourites array into localStorage
		localStorage.setItem('favourites', JSON.stringify(favourites));
		
		console.log(favourites);
	});
} catch(err) {
	console.log("favourite Button not on page")
}



/*
//function for displaying favourites
function favDisplay() {
	// get favorites from local storage or empty array
	var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
		
	
};
*/