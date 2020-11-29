const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//function showLoadingSpinner() {
//    loader.hidden = false;
//    quoteContainer.hidden = true;
//}

//function removeLoadingSpinner() {
//    if (!loader.hidden) {
//        quoteContainer.hidden = false;
//        loader.hidden = true;
//    }
//}
//Get quote from Api

async function getQuote() {
    //showLoadingSpinner();
    const proxyUrl = 'http://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //If author is black, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        //Reduce font size if text long
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quoteA');
            authorText.classList.add('long-quoteB');
        } else {
            quoteText.classList.remove('long-quoteA');
            authorText.classList.remove('long-quoteB');
        }
        quoteText.innerText = data.quoteText;
        //Stop loader, show quote
        //removeLoadingSpinner();
    } catch (error) {
        getQuote();
        console.log('woops error', error)
    }
}
//Twitter quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterUrl, '_blank');
}
//Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);



//On load
getQuote()
