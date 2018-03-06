// set article path
// for loop 
// document . on click button to comment on articles
//ajax call go to routes on server.js (i need to create routes)
// save comment (call ajax, set the post route in server)
$.getJSON("/articles", function (data) {
    // For each one
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});