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
