const projectName = "random-quote-machine";
localStorage.setItem("example_project", "Randowm Quote Machine");

function quote() {
  let tweetMsg = "";

  // Get random quote data from API endpoint
  $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", (data) => {
    // display quote
    $("#text").html(data.quoteText);

    // display author & update tweet href link
    // if there is no author, do not display
    if (!data.quoteAuthor || data.quoteAuthor.length === 0) {
      $("#author").html("");
      // define tweet message for url
      tweetMsg = `"${data.quoteText}"`;
    } else {
      $("#author").html(` - ${data.quoteAuthor}`);
      // define tweet message for url
      tweetMsg = `"${data.quoteText}" - ${data.quoteAuthor}`;
    }

    // // Update twitter share button href link
    const link = `https://twitter.com/intent/tweet?text=${encodeURI(tweetMsg)}`;
    $("#tweet-quote").attr("href", link);
  });
}

// Changes the colour of the background each time a new quote is reeived
function changeBgColor() {
  const a = Math.floor((Math.random() * 255) + 1);
  const b = Math.floor((Math.random() * 255) + 1);
  const c = Math.floor((Math.random() * 255) + 1);
  const rgbTotal = a + b + c;
  const bgColor = `rgb(${a}, ${b}, ${c})`;

  // If rgbTotal is greater than 50% of 255+255+255, change heading colour.
  if (rgbTotal > 382) {
    $("#heading").css("color", "black");
  } else {
    $("#heading").css("color", "white");
  }

  // Set background color
  $(document.body).css("backgroundColor", bgColor);
}

// Click event for new quote button
$("#new-quote").on("click", () => {
  quote();
  changeBgColor();
});


// On page load, quote is generated and background color set.
$(document).ready(() => {
  quote();
  changeBgColor();
});
