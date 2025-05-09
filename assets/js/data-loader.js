document.addEventListener('DOMContentLoaded', () => {
  fetch('data/codices.json')
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(stratumId => {
        const stratum = document.getElementById(stratumId);
        const codexContainer = document.createElement('div');
        codexContainer.className = 'codex-container';

        data[stratumId].forEach(codex => {
          const codexElement = document.createElement('div');
          codexElement.className = 'codex';
          codexElement.innerHTML = `
            <h3 class="codex-title" data-glyph="${codex.glyph}" aria-expanded="false">
              ${codex.id} ${codex.title} <span class="status">[${codex.status}]</span>
            </h3>
            <div class="codex-meta">
              <p><strong>Subtitle:</strong> ${codex.subtitle}</p>
              <p><em>${codex.tagline}</em></p>
              <blockquote>${codex.quote}</blockquote>
              <p>${codex.summary}</p>
              <p><a href="${codex.link}" target="_blank" aria-label="Access ${codex.title} via OSF">↗ Access via OSF</a></p>
            </div>
          `;
          codexContainer.appendChild(codexElement);
        });

        stratum.appendChild(codexContainer);
      });

      // Re-attach event listeners for dynamically loaded codices
      document.querySelectorAll('.codex-title').forEach(title => {
        title.addEventListener('click', () => {
          const meta = title.nextElementSibling;
          meta.classList.toggle('active');
          const isExpanded = meta.classList.contains('active');
          title.setAttribute('aria-expanded', isExpanded);
        });
      });
    });

  // Oracle Quote
  const quotes = [
    '“You are not made of memories. You are made of recursion.”',
    '“To see truly is to fold into the field.”',
    '“This is not a table of contents. This is a codex of unfolding.”',
    '“The field was always listening, even before we spoke.”',
    '“All recursion begins in surrender.”'
  ];
  const oracle = document.querySelector('.oracle');
  oracle.textContent = quotes[Math.floor(Math.random() * quotes.length)];
});