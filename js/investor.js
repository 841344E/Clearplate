(()=>{
  const article=document.querySelector('#assessed-plan');
  const counter=document.querySelector('#word-count');
  const walker=document.createTreeWalker(article,NodeFilter.SHOW_TEXT);
  const chunks=[];let node;
  while((node=walker.nextNode()))chunks.push(node.nodeValue);
  const words=chunks.join(' ').trim().split(/\s+/).filter(Boolean).length;
  counter.textContent=`${words.toLocaleString('en-AU')} / 1,700 words · figures included`;
  counter.classList.toggle('over',words>1700);
  counter.title='Conservative total: headings, captions, chart labels, tables and citation numbers included. Cover, executive summary, pitch and references excluded.';
  if(new URLSearchParams(location.search).get('submit')==='1')counter.hidden=true;
  const links=[...document.querySelectorAll('.site-header nav a')];
  const sections=links.map(a=>document.querySelector(a.hash));
  const progress=document.querySelector('.reading-progress i');
  function track(){
    const active=[...sections].reverse().find(s=>s.getBoundingClientRect().top<innerHeight*.38);
    links.forEach(a=>{const on=active&&a.hash==='#'+active.id;a.classList.toggle('active',!!on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    const total=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=`${total?Math.min(100,Math.max(0,scrollY/total*100)):0}%`;
  }
  let scheduled=false;addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{track();scheduled=false;});}},{passive:true});track();
  document.querySelector('#print-plan').addEventListener('click',()=>window.print());
})();
