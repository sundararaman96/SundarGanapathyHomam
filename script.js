const openBtn = document.getElementById('openInviteBtn');
const revealItems = document.querySelectorAll('.reveal-item');

function revealInviteSequence(){
  document.body.classList.add('reveal-started');
  setTimeout(() => {
    document.body.classList.add('show-invite');
    document.getElementById('inviteScreen').setAttribute('aria-hidden', 'false');
    document.getElementById('openingScreen').setAttribute('aria-hidden', 'true');

    revealItems.forEach((item, index) => {
      setTimeout(() => item.classList.add('is-visible'), 180 + index * 130);
    });
  }, 1750);
}

openBtn.addEventListener('click', revealInviteSequence, { once: true });
