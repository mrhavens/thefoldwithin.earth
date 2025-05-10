document.addEventListener('DOMContentLoaded', () => {
  let codices = [];

  // Load codices for search
  fetch('data/codices.json')
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(stratumId => {
        codices = codices.concat(data[stratumId].map(codex => ({
          ...codex,
          stratumId
        })));
      });

      const fuse = new Fuse(codices, {
        keys: ['title', 'subtitle', 'tagline'],
        threshold: 0.3
      });

      const searchInput = document.getElementById('search-input');
      searchInput.addEventListener('input', e => {
        const query = e.target.value;
        const results = query ? fuse.search(query).map(result => result.item) : codices;

        // Update visibility
        document.querySelectorAll('.stratum').forEach(stratum => {
          const codexContainer = stratum.querySelector('.codex-container');
          codexContainer.innerHTML = '';
          const stratumCodices = results.filter(codex => codex.stratumId === stratum.id);
          stratumCodices.forEach(codex => {
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
        });

        document.dispatchEvent(new Event('codicesLoaded'));
      });
    });
});