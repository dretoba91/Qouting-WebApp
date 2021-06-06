'use strict';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');

const authorText = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');

const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');

// Loader function

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadingComplete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API

async function getQuote() {
  loading();

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // console.log(data);

    // Reduce Font size for more than 100 words
    if (data.quoteText.length > 100) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;

    // If Author is blank and 'Unknown'
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown Author';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Stop loader, Show container
    loadingComplete();
  } catch (error) {
    getQuote();
    // console.log('SMH, no quote', error);
  }
}

// Tweet Quote to Twitter

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listener

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load get Quote

getQuote();
// loading();
