const opening = document.getElementById('opening');
const openInvite = document.getElementById('openInvite');
const dateReveal = document.getElementById('dateReveal');
const invite = document.getElementById('invite');
const houseCard = document.getElementById('houseCard');
const eventDetails = document.getElementById('eventDetails');
const photoModal = document.getElementById('photoModal');
const closeModal = document.getElementById('closeModal');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let started = false;

async function startInvitation(){
  if(started) return;
  started = true;
  opening.classList.add('is-leaving');
  await sleep(650);
  dateReveal.classList.add('is-active');
  dateReveal.setAttribute('aria-hidden','false');
  await sleep(3200);
  dateReveal.classList.add('is-fading');
  await sleep(520);
  dateReveal.style.display = 'none';
  invite.classList.add('is-visible');
  invite.setAttribute('aria-hidden','false');
  document.body.classList.remove('locked');
  window.scrollTo(0,0);
  await sleep(1450);
  houseCard.classList.add('house-card--small');
  await sleep(850);
  eventDetails.classList.add('is-visible');
}

function showPhoto(){
  photoModal.classList.add('is-open');
  photoModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function hidePhoto(){
  photoModal.classList.remove('is-open');
  photoModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

openInvite.addEventListener('click', startInvitation);
houseCard.addEventListener('click', showPhoto);
closeModal.addEventListener('click', hidePhoto);
photoModal.addEventListener('click', e => { if(e.target === photoModal) hidePhoto(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') hidePhoto(); });

if(new URLSearchParams(location.search).get('autoplay') === '1'){
  setTimeout(startInvitation, 250);
}
