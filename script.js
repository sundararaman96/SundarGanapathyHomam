const coverStage = document.getElementById('coverStage');
const dateStage = document.getElementById('dateStage');
const invitePage = document.getElementById('invitePage');
const openInvite = document.getElementById('openInvite');
const housePhotoCard = document.getElementById('housePhotoCard');
const revealBlocks = [...document.querySelectorAll('.reveal-block')];
const photoModal = document.getElementById('photoModal');
const closePhoto = document.getElementById('closePhoto');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let running = false;

async function playInvitation(){
  if(running) return;
  running = true;
  openInvite.disabled = true;
  openInvite.style.animation = 'none';
  openInvite.style.transform = 'scale(.92)';
  openInvite.style.opacity = '.25';

  await sleep(420);
  dateStage.classList.add('is-visible');
  dateStage.setAttribute('aria-hidden','false');
  coverStage.classList.add('is-hidden');
  coverStage.setAttribute('aria-hidden','true');

  await sleep(3450);
  dateStage.classList.add('is-hidden');
  await sleep(650);

  invitePage.classList.add('is-visible');
  invitePage.setAttribute('aria-hidden','false');
  document.body.classList.remove('is-locked');
  window.scrollTo({top:0,behavior:'auto'});

  revealBlocks.forEach((block,index)=>{
    setTimeout(()=>block.classList.add('is-shown'), 150 + index * 180);
  });

  await sleep(1450);
  housePhotoCard.classList.add('is-thumbnail');
}

function openPhoto(){
  photoModal.classList.add('is-open');
  photoModal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closePhotoModal(){
  photoModal.classList.remove('is-open');
  photoModal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

openInvite.addEventListener('click', playInvitation);
housePhotoCard.addEventListener('click', openPhoto);
closePhoto.addEventListener('click', closePhotoModal);
photoModal.addEventListener('click', e => { if(e.target === photoModal) closePhotoModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closePhotoModal(); });
