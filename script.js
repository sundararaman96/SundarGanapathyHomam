(() => {
  'use strict';

  const coverPage = document.getElementById('coverPage');
  const datePage = document.getElementById('datePage');
  const invitePage = document.getElementById('invitePage');
  const openInvite = document.getElementById('openInvite');
  const continueInvite = document.getElementById('continueInvite');
  const houseCard = document.getElementById('houseCard');
  const photoModal = document.getElementById('photoModal');
  const closePhoto = document.getElementById('closePhoto');
  const revealSections = Array.from(document.querySelectorAll('#invitePage .reveal-section'));

  let flowStarted = false;
  let inviteShown = false;
  let dateTimer = null;

  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  function switchPage(fromPage, toPage) {
    if (fromPage) {
      fromPage.classList.add('is-leaving');
      fromPage.setAttribute('aria-hidden', 'true');
    }

    toPage.classList.add('is-active');
    toPage.setAttribute('aria-hidden', 'false');

    window.setTimeout(() => {
      if (fromPage) fromPage.classList.remove('is-active', 'is-leaving');
    }, 760);
  }

  async function startInvite() {
    if (flowStarted) return;
    flowStarted = true;
    openInvite.disabled = true;

    await wait(180);
    switchPage(coverPage, datePage);

    // This is the main automatic transition. The manual button below is a second route,
    // so the user can never be trapped on the date screen.
    dateTimer = window.setTimeout(showFullInvite, 3300);
  }

  function showFullInvite() {
    if (inviteShown) return;
    inviteShown = true;

    if (dateTimer !== null) {
      window.clearTimeout(dateTimer);
      dateTimer = null;
    }

    switchPage(datePage, invitePage);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    revealSections.forEach((section, index) => {
      window.setTimeout(() => section.classList.add('is-visible'), 180 + (index * 165));
    });

    // Large photo first, then a smooth shrink into the permanent clickable thumbnail.
    window.setTimeout(() => houseCard.classList.add('house-card--thumb'), 2250);
  }

  function openHousePhoto() {
    photoModal.classList.add('is-open');
    photoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeHousePhoto() {
    photoModal.classList.remove('is-open');
    photoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openInvite.addEventListener('click', startInvite);
  continueInvite.addEventListener('click', showFullInvite);
  houseCard.addEventListener('click', openHousePhoto);
  closePhoto.addEventListener('click', closeHousePhoto);
  photoModal.addEventListener('click', event => {
    if (event.target === photoModal) closeHousePhoto();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && photoModal.classList.contains('is-open')) closeHousePhoto();
  });

  // Failsafe: if any unrelated script error occurs while the date page is showing,
  // move to the full invitation rather than leaving the guest stuck.
  const params = new URLSearchParams(window.location.search);
  if (params.get('autoplay') === '1') {
    window.setTimeout(startInvite, 150);
  }

  window.addEventListener('error', () => {
    if (flowStarted && !inviteShown && datePage.classList.contains('is-active')) {
      showFullInvite();
    }
  });
})();
