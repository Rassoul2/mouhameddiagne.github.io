// année dynamique dans le footer
document.getElementById('year').textContent = new Date().getFullYear();

// filtres portfolio
const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project');

buttons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;

    cards.forEach(card=>{
      const show = (cat === 'all') || card.classList.contains(cat);
      card.style.display = show ? '' : 'none';
    });
  });
});
