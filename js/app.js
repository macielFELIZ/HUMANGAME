(() => {
const $=s=>document.querySelector(s), key="humanigame-v1";
const areas=[
{name:"História",icon:"🏛️",color:"history",desc:"Investigue o passado e as transformações das sociedades."},
{name:"Geografia",icon:"🧭",color:"geo",desc:"Explore lugares, paisagens e a relação entre pessoas e natureza."},
{name:"Filosofia",icon:"💡",color:"philo",desc:"Faça perguntas, pense e construa boas razões."},
{name:"Sociologia",icon:"🤝",color:"socio",desc:"Entenda culturas, convivência e relações sociais."}];
const base={name:"Explorador",avatar:"🧙",grade:1,xp:0,coins:0,answers:{},completed:[],badges:[]};
let state;try{state={...base,...JSON.parse(localStorage.getItem(key)||"{}")}}catch{state={...base}}
let current=null,choice=null,answeredNow=false;
const qs=(g,s)=>HUMANI_QUESTIONS.filter(q=>q.grade===+g&&q.subject===s);
const lvl=()=>Math.floor(state.xp/100)+1;
const save=()=>localStorage.setItem(key,JSON.stringify(state));
const esc=t=>String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function render(){
 $("#playerName").textContent=state.name;$("#playerNameStrip").textContent=state.name;
 $("#playerAvatar").textContent=state.avatar;$("#playerAvatarLarge").textContent=state.avatar;
 $("#playerLevel").textContent="Nível "+lvl();$("#playerLevelStrip").textContent="Nível "+lvl()+" • "+(lvl()===1?"Iniciante":"Explorador");
 $("#xpText").textContent=state.xp+" XP";$("#xpBar").style.width=(state.xp%100)+"%";
 $("#xpRemaining").textContent=(100-state.xp%100)+" XP";
 $("#coinText").textContent=state.coins;$("#gradeSelect").value=state.grade;
 $("#gradeTag").textContent=state.grade+"º ano • Fundamental I";
 const list=HUMANI_QUESTIONS.filter(q=>q.grade===+state.grade);
 const done=list.filter(q=>state.answers[q.id]!==undefined).length;
 $("#statAnswered").textContent=done;
 $("#statCorrect").textContent=list.filter(q=>state.answers[q.id]===true).length;
 $("#statTotal").textContent=list.length;$("#statBadges").textContent=state.badges.length;
 $("#worldGrid").innerHTML=areas.map(a=>{
 const all=qs(state.grade,a.name),d=all.filter(q=>state.answers[q.id]!==undefined).length,p=Math.round(d/all.length*100);
 return `<article class="world-card ${a.color}"><div class="world-top"><span class="world-icon">${a.icon}</span><span class="world-count">${d}/${all.length} desafios</span></div><h3>${a.name}</h3><p>${a.desc}</p><div class="progress-track"><span style="width:${p}%"></span></div><div class="world-bottom"><small>${p}% explorado</small><button class="small-btn" data-area="${a.name}">Entrar na missão →</button></div></article>`;
 }).join("");
 document.querySelectorAll("[data-area]").forEach(b=>b.onclick=()=>openArea(b.dataset.area));
}
function openArea(s){
 const a=areas.find(x=>x.name===s),list=qs(state.grade,s);
 $("#modalTitle").textContent=a.icon+" "+s;$("#modalSubtitle").textContent=state.grade+"º ano • "+list.length+" desafios";
 $("#missionList").innerHTML=list.map((q,i)=>{
 const done=state.answers[q.id]!==undefined,ok=state.answers[q.id]===true;
 return `<button class="mission-row" data-q="${q.id}"><span class="mission-number">${i+1}</span><span class="mission-copy"><b>Desafio ${i+1}</b><small>${done?(ok?"Concluído • resposta correta":"Concluído • revise a explicação"):"Disponível para explorar"}</small></span><span class="mission-status">${done?(ok?"✓":"↻"):"›"}</span></button>`;
 }).join("");
 $("#missionModal").showModal();document.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>startQuestion(b.dataset.q));
}
function startQuestion(id){
 current=HUMANI_QUESTIONS.find(q=>q.id===id);choice=null;answeredNow=false;
 $("#questionMeta").textContent=state.grade+"º ano • "+current.subject;
 $("#questionTitle").textContent=current.question;$("#answerFeedback").hidden=true;
 $("#confirmAnswer").disabled=true;$("#confirmAnswer").textContent="Confirmar resposta";$("#confirmAnswer").onclick=confirm;
 $("#optionsList").innerHTML=current.options.map((o,i)=>`<button class="answer-option" data-opt="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${esc(o)}</span></button>`).join("");
 document.querySelectorAll("[data-opt]").forEach(b=>b.onclick=()=>{
 if(answeredNow)return;choice=+b.dataset.opt;
 document.querySelectorAll(".answer-option").forEach(x=>x.classList.toggle("selected",x===b));
 $("#confirmAnswer").disabled=false;
 });
 $("#missionModal").close();$("#questionModal").showModal();
}
function confirm(){
 if(!current||choice===null||answeredNow)return;
 answeredNow=true;const ok=choice===current.answer,old=state.answers[current.id];
 if(old===undefined){
 state.answers[current.id]=ok;
 if(ok){state.xp+=10;state.coins+=3;}
 const done=qs(state.grade,current.subject).every(q=>state.answers[q.id]!==undefined);
 const tag=state.grade+"-"+current.subject;
 if(done&&!state.completed.includes(tag)){state.completed.push(tag);state.xp+=20;state.coins+=5;}
 if(Object.keys(state.answers).length>=4&&!state.badges.includes("Primeiros passos"))state.badges.push("Primeiros passos");
 save();
 }
 document.querySelectorAll(".answer-option").forEach((b,i)=>{b.disabled=true;if(i===current.answer)b.classList.add("correct");else if(i===choice&&!ok)b.classList.add("incorrect");});
 $("#feedbackTitle").textContent=ok?"Muito bem! Você conseguiu!":"Boa tentativa! Vamos aprender.";
 $("#feedbackText").textContent=current.explanation;$("#answerFeedback").hidden=false;
 $("#confirmAnswer").textContent="Voltar às missões";
 $("#confirmAnswer").onclick=()=>{const s=current.subject;$("#questionModal").close();render();openArea(s);};
 render();
}
function profile(){
 $("#nameInput").value=state.name;
 document.querySelectorAll("[data-avatar]").forEach(b=>b.classList.toggle("chosen",b.dataset.avatar===state.avatar));
 $("#profileModal").showModal();
}
$("#gradeSelect").onchange=e=>{state.grade=+e.target.value;save();render();};
$("#editProfile").onclick=profile;
$("#saveProfile").onclick=()=>{const n=$("#nameInput").value.trim();if(n)state.name=n.slice(0,24);const a=document.querySelector("#avatarChoices .chosen");if(a)state.avatar=a.dataset.avatar;save();render();$("#profileModal").close();};
document.querySelectorAll("[data-avatar]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-avatar]").forEach(x=>x.classList.remove("chosen"));b.classList.add("chosen");});
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).close());
$("#howToPlay").onclick=()=>$("#helpModal").showModal();
$("#resetProgress").onclick=()=>{if(confirm("Deseja apagar o progresso salvo neste navegador?")){state={...base};save();render();$("#profileModal").close();}};
render();
})();