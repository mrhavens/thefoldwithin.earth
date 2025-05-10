document.addEventListener('DOMContentLoaded', () => {
  fetch('data/quotes.json')
    .then(response => response.json())
    .then(quotes => {
      const oracle = document.querySelector('.oracle');
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      oracle.textContent = randomQuote;
    })
    .catch(error => {
      console.error('Error loading quotes:', error);
      document.querySelector('.oracle').textContent = '“To see truly is to fold into the field.”';
    });
});