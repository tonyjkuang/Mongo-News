$('#scrape-news').click(function() {
	fetch('/scrape')
	  .then(function(response) {
	  	console.log(response)
	    /*return response.json();
	  })
	  .then(function(myJson) {
	    console.log(myJson);*/
	  });
	})
