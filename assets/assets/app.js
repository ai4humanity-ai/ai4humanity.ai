
const links=[...document.querySelectorAll('nav.toc a')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href')));
const onScroll=()=>{
  const y=window.scrollY+120;
  let active=0;
  for(let i=0;i<sections.length;i++){
    if(sections[i] && sections[i].offsetTop<=y) active=i;
  }
  links.forEach((l,i)=>l.classList.toggle('active',i===active));
};
document.addEventListener('scroll',onScroll);onScroll();

const input=document.getElementById('q');
if(input){
  input.addEventListener('input',()=>{
    const q=input.value.toLowerCase().trim();
    document.querySelectorAll('.card.searchable').forEach(card=>{
      const hit=card.textContent.toLowerCase().includes(q);
      card.style.display= hit ? '' : 'none';
    });
  });
}

document.querySelectorAll('details').forEach((d,idx)=>{
  const key='acc_'+idx;
  const saved=localStorage.getItem(key);
  if(saved==='1') d.open=true;
  d.addEventListener('toggle',()=>localStorage.setItem(key,d.open?'1':'0'));
});
