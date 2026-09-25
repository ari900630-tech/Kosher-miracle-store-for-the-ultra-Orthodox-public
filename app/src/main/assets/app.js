const API_BASE_URL=window.PELEI_API_BASE_URL||'';
const demo=[['📚','לומדים חכם','פלאי טק','4.9'],['🧮','מחשבון פלוס','כלים','4.8'],['🎯','אתגר יומי','משחקים','4.7'],['📝','פתקים שלי','עבודה','4.9'],['📖','ספרייה דיגיטלית','תוכן','4.8'],['💬','קהילה','תקשורת','4.6']];
const box=document.getElementById('apps');
const status=document.getElementById('status');
let data=demo;
function render(q=''){box.innerHTML=data.filter(x=>x[1].toLowerCase().includes(q.toLowerCase())).map(x=>'<article class="card"><div class="icon">'+x[0]+'</div><h3>'+x[1]+'</h3><div class="meta">'+x[2]+'</div><div class="rating">⭐ '+x[3]+'</div><button class="install">התקנה</button></article>').join('');}
async function load(){if(!API_BASE_URL){status.textContent='מצב הדגמה — API החנות עדיין לא הוגדר';render();return;}try{const r=await fetch(API_BASE_URL+'/apps');if(!r.ok)throw new Error(r.status);const j=await r.json();const list=Array.isArray(j)?j:(j.apps||j.items||j.data||[]);data=list.map(a=>[a.icon||'📱',a.name||a.title||'אפליקציה',a.developer||'',String(a.rating||'—')]);status.textContent='קטלוג החנות נטען';render();}catch(e){status.textContent='שגיאה בחיבור ל־API: '+e.message;box.innerHTML='<div class="error">לא ניתן לטעון את קטלוג החנות.</div>';}}
document.getElementById('search').oninput=e=>render(e.target.value);
document.getElementById('theme').onclick=()=>document.body.classList.toggle('dark');
load();