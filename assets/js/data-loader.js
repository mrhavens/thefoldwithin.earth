document.addEventListener('DOMContentLoaded', () => {
    // Load Codices
    fetch('data/codices.json')
      .then(response => response.json())
      .then(data => {
        Object.keys(data).forEach(stratumId => {
          const stratum = document.getElementById(stratumId);
          if (!stratum) {
            console.warn(`Stratum ${stratumId} not found in DOM`);
            return;
          }
          const codexContainer = stratum.querySelector('.codex-container');
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
          stratum.classList.add('visible');
        });
  
        // Scroll to anchor if present
        const hash = window.location.hash;
        if (hash) {
          const target = document.querySelector(hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
  
        // Trigger event for dynamic listeners
        document.dispatchEvent(new Event('codicesLoaded'));
      })
      .catch(error => console.error('Error loading codices:', error));
  
    // Load Appendices
    fetch('data/meta-index.json')
      .then(response => response.json())
      .then(data => {
        Object.keys(data).forEach(appendixId => {
          const appendix = document.getElementById(appendixId);
          if (!appendix) {
            console.warn(`Appendix ${appendixId} not found in DOM`);
            return;
          }
          const metaContainer = appendix.querySelector('.meta-container');
          data[appendixId].forEach(meta => {
            const metaElement = document.createElement('div');
            metaElement.className = 'meta-entry';
            metaElement.innerHTML = `
              <h4>${meta.id} ${meta.title}</h4>
              <p><strong>Subtitle:</strong> ${meta.subtitle}</p>
              <p><em>${meta.tagline}</em></p>
              <blockquote>${meta.quote}</blockquote>
              <p>${meta.summary}</p>
              <p><a href="${meta.link}" target="_blank" aria-label="Access ${meta.title} via OSF">↗ Access via OSF</a></p>
            `;
            metaContainer.appendChild(metaElement);
          });
        });
      })
      .catch(error => console.error('Error loading meta-index:', error));
  
    // Scroll Shimmer Effect
    const strata = document.querySelectorAll('.stratum');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
  
    strata.forEach(stratum => observer.observe(stratum));
  });