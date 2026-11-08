document.querySelectorAll('.link-card').forEach(card => {
  card.addEventListener('click', function() {
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.style.transform = 'none';
    }, 150);
  });
});

/* ==========================================================
   /achadinhos — accordion (um painel aberto por vez) + rastreamento
   Sem efeito em páginas sem .accordion-trigger.
   ========================================================== */
(function () {
  var triggers = document.querySelectorAll('.accordion-trigger');

  // Envia evento para o dataLayer (GTM) e para o Meta Pixel, se existirem na página.
  function track(label) {
    if (!label) return;
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'rf5_click', rf5_label: label });
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'RF5Click', { label: label });
      }
    } catch (e) { /* rastreamento nunca deve quebrar a página */ }
  }

  function setOpen(trigger, open) {
    var panel = document.getElementById(trigger.getAttribute('aria-controls'));
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (panel) panel.classList.toggle('is-open', open);
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var willOpen = trigger.getAttribute('aria-expanded') !== 'true';
      triggers.forEach(function (other) {
        if (other !== trigger) setOpen(other, false);
      });
      setOpen(trigger, willOpen);
      if (willOpen) track(trigger.dataset.track);
    });
  });

  document.querySelectorAll('.sub-link').forEach(function (link) {
    link.addEventListener('click', function (event) {
      // Link ainda não preenchido (href="#"): não rola a página nem registra clique.
      if (link.getAttribute('href') === '#') {
        event.preventDefault();
        return;
      }
      track(link.dataset.track);
    });
  });
})();
