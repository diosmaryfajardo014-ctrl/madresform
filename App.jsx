import { useState, useRef, useEffect } from "react";

// Logo component – uses /logo.png (place your PNG in /public/logo.png)
function Logo({ height = 48 }) {
  return (
    <img
      src="/logo.png"
      alt="ergotec"
      style={{ height, width: "auto", display: "block", objectFit: "contain" }}
    />
  );
}

const QUESTIONS = [
  { id:1,  emoji:"☕",  question:"Escoge una bebida",             options:[{label:"Café",v:"D"},{label:"Té",v:"E"},{label:"Matcha",v:"B"},{label:"Chocolate caliente",v:"C"}] },
  { id:2,  emoji:"🌤️", question:"Elige un clima",                options:[{label:"Lluvia",v:"E"},{label:"Frío",v:"C"},{label:"Soleado",v:"B"},{label:"Brisa fresca",v:"A"}] },
  { id:3,  emoji:"🌸", question:"¿Qué aroma te gusta más?",      options:[{label:"Floral",v:"A"},{label:"Dulce",v:"D"},{label:"Cítrico",v:"B"},{label:"Fresco",v:"B"}] },
  { id:4,  emoji:"👜", question:"¿Qué nunca falta en tu bolso?", options:[{label:"Labial",v:"A"},{label:"Perfume",v:"D"},{label:"Crema",v:"C"},{label:"Snacks",v:"B"},{label:"Agenda",v:"E"}] },
  { id:5,  emoji:"💆", question:"Tu plan ideal sería:",           options:[{label:"Spa",v:"C"},{label:"Playa",v:"B"},{label:"Dormir",v:"C"},{label:"Café y libro",v:"E"},{label:"Cena tranquila",v:"D"}] },
  { id:6,  emoji:"✨", question:"¿Qué textura prefieres?",        options:[{label:"Ligera",v:"B"},{label:"Cremosa",v:"D"},{label:"Gel",v:"B"},{label:"Aceitosa",v:"C"}] },
  { id:7,  emoji:"🎨", question:"Escoge un color",               options:[{label:"Rosado",v:"A"},{label:"Amarillo",v:"D"},{label:"Verde",v:"B"},{label:"Rojo",v:"C"},{label:"Morado",v:"E"}] },
  { id:8,  emoji:"🕯️", question:"Tu ambiente perfecto tiene:",   options:[{label:"Velas",v:"D"},{label:"Música suave",v:"A"},{label:"Silencio",v:"E"},{label:"Muchas flores",v:"A"},{label:"Luz natural",v:"B"}] },
  { id:9,  emoji:"🌙", question:"¿Qué momento disfrutas más?",   options:[{label:"Mañana tranquila",v:"B"},{label:"Tarde relajada",v:"D"},{label:"Noche de autocuidado",v:"E"}] },
  { id:10, emoji:"✨", question:"¿Cómo describirías tu piel?",    options:[{label:"Seca",v:"C"},{label:"Grasa",v:"B"},{label:"Mixta",v:"D"},{label:"Sensible",v:"A"},{label:"Normal",v:"E"}] },
  { id:11, emoji:"🎵", question:"¿Qué música te relajaría más?", options:[{label:"Jazz suave",v:"D"},{label:"Instrumental",v:"E"},{label:"Pop relajado",v:"B"},{label:"Música romántica",v:"A"},{label:"Sonidos de lluvia",v:"C"}] },
  { id:12, emoji:"✨", question:"Elige tu estado de ánimo ideal:",options:[{label:"Relax total",v:"C"},{label:"Brillo natural",v:"A"},{label:"Energía fresca",v:"B"},{label:"Vibra acogedora",v:"D"},{label:"Paz y calma",v:"E"}] },
];

const RESULTS = {
  A:{ title:"Mamá Brillo Suave",   emoji:"💖", desc:"Eres la mamá que ilumina cada espacio con su presencia. Tu energía es delicada, florece en los pequeños detalles y siempre encuentras belleza en lo cotidiano. Romántica, sensible y llena de amor." },
  B:{ title:"Mamá Energía Fresca", emoji:"☀️", desc:"Eres la mamá radiante que contagia vitalidad. Te mueves con ligereza, amas el aire libre y cada día es una nueva aventura. Tu energía positiva es tu superpoder." },
  C:{ title:"Mamá Relax Total",    emoji:"🌸", desc:"Eres la mamá que sabe perfectamente cómo recargar energías. Valoras el descanso, la calma y el autocuidado. Tu hogar es un santuario y tu presencia transmite una paz inmensa." },
  D:{ title:"Mamá Dorada",         emoji:"✨", desc:"Eres la mamá que exuda elegancia y calidez. Tienes gusto refinado, amas los momentos especiales y sabes cómo convertir lo ordinario en extraordinario. Sofisticada y cálida a la vez." },
  E:{ title:"Mamá Paz y Calma",    emoji:"🌙", desc:"Eres la mamá serena que encuentra equilibrio en todo. Tu presencia es como la luna: constante, suave y reconfortante. Amas la introspección y los espacios tranquilos." },
};

function calcResult(ans){
  const c={A:0,B:0,C:0,D:0,E:0};
  ans.forEach(v=>{if(c[v]!==undefined)c[v]++;});
  return Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0];
}

function drawShareCard(canvas, name, result, logoImg){
  const W=900,H=500;
  canvas.width=W; canvas.height=H;
  const ctx=canvas.getContext("2d");
  const bg=ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,"#fff8f4"); bg.addColorStop(.6,"#fdeee5"); bg.addColorStop(1,"#fdf0e8");
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  ctx.save(); ctx.globalAlpha=.13;
  ctx.fillStyle="#D16833"; ctx.beginPath(); ctx.arc(W-80,90,160,0,Math.PI*2); ctx.fill();
  ctx.fillStyle="#e8a07a"; ctx.beginPath(); ctx.arc(60,H-60,130,0,Math.PI*2); ctx.fill();
  ctx.restore();
  ctx.save(); ctx.strokeStyle="#D16833"; ctx.lineWidth=2.5; ctx.globalAlpha=.25;
  const r=20;
  ctx.beginPath();
  ctx.moveTo(24+r,24); ctx.lineTo(W-24-r,24); ctx.quadraticCurveTo(W-24,24,W-24,24+r);
  ctx.lineTo(W-24,H-24-r); ctx.quadraticCurveTo(W-24,H-24,W-24-r,H-24);
  ctx.lineTo(24+r,H-24); ctx.quadraticCurveTo(24,H-24,24,H-24-r);
  ctx.lineTo(24,24+r); ctx.quadraticCurveTo(24,24,24+r,24);
  ctx.closePath(); ctx.stroke(); ctx.restore();
  if(logoImg && logoImg.complete && logoImg.naturalWidth>0){
    const lh=52, lw=Math.round(logoImg.naturalWidth*(lh/logoImg.naturalHeight));
    ctx.drawImage(logoImg,56,30,lw,lh);
  } else {
    ctx.save(); ctx.font="bold 40px Georgia,serif"; ctx.fillStyle="#6B2D8B"; ctx.fillText("ergotec®",56,76); ctx.restore();
  }
  ctx.save(); ctx.strokeStyle="#D16833"; ctx.lineWidth=1; ctx.globalAlpha=.2;
  ctx.beginPath(); ctx.moveTo(56,106); ctx.lineTo(W-56,106); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.font="600 13px Arial,sans-serif"; ctx.fillStyle="#D16833"; ctx.globalAlpha=.7;
  ctx.fillText("Día de las Madres  •  Mi perfil de mamá",56,130); ctx.restore();
  ctx.font="90px serif"; ctx.fillText(result.emoji,56,250);
  ctx.save(); ctx.font="bold 52px Georgia,serif"; ctx.fillStyle="#2d1a0e"; ctx.fillText(result.title,56,316); ctx.restore();
  ctx.save(); ctx.font="700 24px Arial,sans-serif"; ctx.fillStyle="#D16833"; ctx.fillText("✨  "+name,56,356); ctx.restore();
  ctx.save(); ctx.font="17px Arial,sans-serif"; ctx.fillStyle="#7a4a2a";
  const maxW=W-112; const words=result.desc.split(" "); let line=""; let y=400;
  for(const w of words){ const t=line?line+" "+w:w; if(ctx.measureText(t).width>maxW){ctx.fillText(line,56,y);line=w;y+=26;}else line=t; }
  if(line)ctx.fillText(line,56,y);
  ctx.restore();
  ctx.save(); ctx.font="13px Arial,sans-serif"; ctx.fillStyle="#D16833"; ctx.globalAlpha=.55;
  const fw=ctx.measureText("ergotec.com").width;
  ctx.fillText("ergotec.com",W-56-fw,H-32); ctx.restore();
}

const css=`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Nunito:wght@300;400;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Nunito',sans-serif;}
.page{min-height:100vh;background:linear-gradient(135deg,#fff8f4 0%,#fdeee5 55%,#fdf5f0 100%);display:flex;align-items:center;justify-content:center;padding:32px 16px;}
.card{width:100%;max-width:580px;background:#fffaf7;border-radius:32px;overflow:hidden;position:relative;box-shadow:0 24px 60px rgba(209,104,51,.14),0 4px 20px rgba(0,0,0,.06);}
.blob1{position:absolute;top:-60px;right:-60px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(209,104,51,.18) 0%,transparent 70%);pointer-events:none;}
.blob2{position:absolute;bottom:-40px;left:-40px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(232,160,122,.15) 0%,transparent 70%);pointer-events:none;}
.qprog{padding:24px 32px 0;position:relative;z-index:2;}
.qprog-top{display:flex;justify-content:space-between;margin-bottom:8px;}
.qprog-lbl{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#b07050;}
.qprog-track{height:4px;background:#fde0cc;border-radius:99px;overflow:hidden;}
.qprog-fill{height:100%;background:linear-gradient(90deg,#f0b490,#D16833);border-radius:99px;transition:width .5s cubic-bezier(.4,0,.2,1);}
@keyframes slideIn{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-28px)}}
@keyframes pop{from{transform:scale(.3);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes rring{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.08);opacity:1}}
@keyframes fadeup{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
.anim-in{animation:slideIn .32s cubic-bezier(.4,0,.2,1) both;}
.anim-out{animation:slideOut .2s ease both;}
.shake{animation:shake .35s ease;}
.qscreen{display:flex;flex-direction:column;padding:28px 32px 20px;position:relative;z-index:2;}
.q-emoji{font-size:48px;text-align:center;margin-bottom:12px;line-height:1;}
.q-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;text-align:center;line-height:1.25;color:#2d1a0e;margin-bottom:22px;letter-spacing:-.01em;}
.q-opts{display:flex;flex-direction:column;gap:10px;}
.q-opts.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.q-opt{width:100%;padding:14px 18px;background:white;border:1.5px solid #fde0cc;border-radius:18px;font-size:14px;font-weight:600;color:#2d1a0e;cursor:pointer;text-align:left;display:flex;align-items:center;justify-content:space-between;transition:border-color .18s,background .18s,transform .12s,box-shadow .18s;box-shadow:0 2px 8px rgba(209,104,51,.06);-webkit-tap-highlight-color:transparent;font-family:'Nunito',sans-serif;}
.q-opt:hover{border-color:#f0b490;box-shadow:0 4px 14px rgba(209,104,51,.13);}
.q-opt:active{transform:scale(.97);}
.q-opt.sel{border-color:#D16833;background:linear-gradient(135deg,#fff8f4,#fdeee5);box-shadow:0 4px 18px rgba(209,104,51,.18);}
.q-check{font-size:13px;width:22px;height:22px;border-radius:50%;background:#D16833;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;transform:scale(0);transition:transform .25s cubic-bezier(.34,1.56,.64,1);flex-shrink:0;}
.q-opt.sel .q-check{transform:scale(1);}
.q-footer{display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px 32px 32px;position:relative;z-index:2;}
.btn-main{background:linear-gradient(135deg,#D16833,#b85520);color:white;border:none;border-radius:99px;padding:14px 40px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 8px 22px rgba(209,104,51,.30);transition:transform .18s,box-shadow .18s,opacity .18s;letter-spacing:.02em;font-family:'Nunito',sans-serif;}
.btn-main:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 26px rgba(209,104,51,.36);}
.btn-main:active:not(:disabled){transform:translateY(0);}
.btn-main:disabled{opacity:.5;cursor:not-allowed;}
.btn-ghost{background:white;color:#D16833;border:1.5px solid #fde0cc;border-radius:99px;padding:12px 28px;font-size:13px;font-weight:600;cursor:pointer;transition:background .18s,border-color .18s;font-family:'Nunito',sans-serif;}
.btn-ghost:hover{background:#fff8f4;border-color:#D16833;}
.btn-wa{background:#25D366;color:white;border:none;border-radius:99px;padding:13px 28px;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;font-family:'Nunito',sans-serif;transition:transform .18s,box-shadow .18s;box-shadow:0 6px 18px rgba(37,211,102,.25);}
.btn-wa:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(37,211,102,.32);}
.hint-msg{font-size:12px;font-weight:600;color:#D16833;background:#fff8f4;border:1.5px solid #fde0cc;border-radius:99px;padding:6px 16px;opacity:0;transition:opacity .25s;pointer-events:none;}
.hint-msg.show{opacity:1;}
.intro{display:flex;flex-direction:column;align-items:center;padding:48px 36px;text-align:center;position:relative;z-index:2;}
.intro-logo{margin-bottom:32px;}
.intro-eye{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#D16833;margin-bottom:10px;}
.intro-h{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:600;line-height:1.15;color:#2d1a0e;margin-bottom:14px;letter-spacing:-.02em;}
.intro-h em{font-style:italic;color:#D16833;}
.intro-sub{font-size:14px;color:#9a6040;line-height:1.6;margin-bottom:28px;max-width:340px;}
.intro-pills{display:flex;gap:10px;margin-bottom:36px;flex-wrap:wrap;justify-content:center;}
.intro-pill{background:white;border:1.5px solid #fde0cc;border-radius:99px;padding:6px 14px;font-size:12px;font-weight:600;color:#9a6040;}
.name-screen{display:flex;flex-direction:column;align-items:center;padding:48px 36px;text-align:center;position:relative;z-index:2;}
.name-ico{font-size:56px;margin-bottom:18px;}
.name-eye{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#D16833;margin-bottom:10px;}
.name-h{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:600;line-height:1.2;color:#2d1a0e;margin-bottom:8px;letter-spacing:-.02em;}
.name-h em{font-style:italic;color:#D16833;}
.name-sub{font-size:13px;color:#9a6040;line-height:1.5;margin-bottom:32px;}
.name-field-wrap{width:100%;max-width:340px;margin-bottom:6px;}
.name-label{display:block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#9a6040;margin-bottom:8px;text-align:left;}
.name-input{width:100%;padding:16px 20px;background:white;border:1.5px solid #fde0cc;border-radius:18px;font-family:'Nunito',sans-serif;font-size:15px;font-weight:600;color:#2d1a0e;outline:none;transition:border-color .2s,box-shadow .2s;box-shadow:0 2px 8px rgba(209,104,51,.07);-webkit-appearance:none;}
.name-input::placeholder{color:#d4a080;font-weight:400;}
.name-input:focus{border-color:#D16833;box-shadow:0 0 0 3px rgba(209,104,51,.13),0 2px 8px rgba(209,104,51,.09);}
.name-input.err{border-color:#D16833;animation:shake .35s ease;}
.name-hint-row{display:flex;align-items:center;min-height:22px;margin-bottom:26px;width:100%;max-width:340px;}
.name-hint-txt{font-size:12px;font-weight:600;color:#D16833;opacity:0;transition:opacity .25s;}
.name-hint-txt.show{opacity:1;}
.result{display:flex;flex-direction:column;align-items:center;padding:40px 36px 44px;text-align:center;position:relative;z-index:2;}
.r-logo{margin-bottom:22px;animation:fadeup .4s .1s both;}
.r-emo-wrap{position:relative;margin-bottom:16px;}
.r-emo{font-size:68px;line-height:1;display:block;animation:pop .5s cubic-bezier(.34,1.56,.64,1) both;}
.r-ring{position:absolute;inset:-10px;border-radius:50%;border:2px solid #fde0cc;animation:rring 2s ease-in-out infinite;}
.r-eye{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#D16833;margin-bottom:8px;animation:fadeup .4s .2s both;}
.r-title{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:600;color:#2d1a0e;margin-bottom:16px;letter-spacing:-.02em;line-height:1.1;animation:fadeup .4s .3s both;}
.r-card{background:white;border:1.5px solid #fde0cc;border-radius:20px;padding:22px 24px;margin-bottom:24px;box-shadow:0 4px 20px rgba(209,104,51,.10);animation:fadeup .4s .4s both;width:100%;max-width:440px;}
.r-desc{font-size:15px;line-height:1.75;color:#9a6040;}
.r-actions{display:flex;flex-direction:column;gap:10px;width:100%;max-width:300px;animation:fadeup .4s .5s both;align-items:center;}
.r-hint{font-size:12px;color:#b07050;margin-top:10px;animation:fadeup .4s .6s both;}
.r-toast{display:flex;align-items:center;gap:6px;background:#f0fdf4;border:1.5px solid #86efac;color:#16a34a;border-radius:99px;padding:7px 16px;font-size:12px;font-weight:600;margin-bottom:14px;animation:fadeup .3s both;}
.canvas-hidden{position:absolute;left:-9999px;top:-9999px;pointer-events:none;visibility:hidden;}
@media(max-width:600px){
  .card{border-radius:24px;}
  .intro,.name-screen,.result{padding:32px 20px;}
  .intro-h{font-size:30px;}
  .name-h{font-size:26px;}
  .qscreen{padding:22px 18px 16px;}
  .q-footer{padding:10px 18px 24px;}
  .q-opts.grid2{grid-template-columns:1fr;}
  .r-title{font-size:28px;}
  .r-actions{max-width:100%;}
}
`;

function ProgressBar({current,total}){
  const pct=Math.round((current/total)*100);
  return(
    <div className="qprog">
      <div className="qprog-top">
        <span className="qprog-lbl">Pregunta {current} de {total}</span>
        <span className="qprog-lbl">{pct}%</span>
      </div>
      <div className="qprog-track"><div className="qprog-fill" style={{width:pct+"%"}}/></div>
    </div>
  );
}

function QuizQuestion({question,onAnswer}){
  const [sel,setSel]=useState(null);
  const [animClass,setAnim]=useState("anim-in");
  const [showHint,setShowHint]=useState(false);
  const [hintShake,setHintShake]=useState(false);
  const useGrid=question.options.length>=4;
  const pick=opt=>{setSel(opt.label);setShowHint(false);};
  const next=()=>{
    if(!sel){setShowHint(true);setHintShake(true);setTimeout(()=>setHintShake(false),400);return;}
    setAnim("anim-out");
    setTimeout(()=>onAnswer(question.options.find(o=>o.label===sel).v),200);
  };
  return(
    <>
      <div className={`qscreen ${animClass}`}>
        <div className="q-emoji">{question.emoji}</div>
        <h2 className="q-title">{question.question}</h2>
        <div className={`q-opts${useGrid?" grid2":""}`}>
          {question.options.map(opt=>(
            <button key={opt.label} className={`q-opt${sel===opt.label?" sel":""}`} onClick={()=>pick(opt)}>
              {opt.label}<span className="q-check">✓</span>
            </button>
          ))}
        </div>
      </div>
      <div className="q-footer">
        <button className={`btn-main${hintShake?" shake":""}`} onClick={next}>Siguiente →</button>
        <span className={`hint-msg${showHint?" show":""}`}>✨ Por favor selecciona una opción</span>
      </div>
    </>
  );
}

function Intro({onStart}){
  return(
    <div className="intro anim-in">
      <div className="intro-logo"><Logo height={56}/></div>
      <p className="intro-eye">Día de las Madres</p>
      <h1 className="intro-h">¿Qué tipo de<br/><em>mamá</em> eres?</h1>
      <p className="intro-sub">Responde 12 preguntas y descubre tu perfil único de mamá.</p>
      <div className="intro-pills">
        <span className="intro-pill">⏱ 2 minutos</span>
        <span className="intro-pill">✨ 12 preguntas</span>
        <span className="intro-pill">💌 5 resultados</span>
      </div>
      <button className="btn-main" onClick={onStart}>Comenzar 🌸</button>
    </div>
  );
}

function NameScreen({onContinue}){
  const [name,setName]=useState("");
  const [err,setErr]=useState(false);
  const [showHint,setShowHint]=useState(false);
  const go=()=>{
    if(!name.trim()){setErr(true);setShowHint(true);setTimeout(()=>setErr(false),400);return;}
    onContinue(name.trim());
  };
  return(
    <div className="name-screen anim-in">
      <div className="name-ico">💖</div>
      <p className="name-eye">Día de las Madres</p>
      <h1 className="name-h">Hola, <em>mamá</em> especial</h1>
      <p className="name-sub">¿Cuál es tu nombre? Lo usaremos para personalizar tu resultado.</p>
      <div className="name-field-wrap">
        <label className="name-label" htmlFor="mama-name">Tu nombre</label>
        <input id="mama-name" className={`name-input${err?" err":""}`} type="text"
          placeholder="Escribe tu nombre aquí..."
          value={name}
          onChange={e=>{setName(e.target.value);if(e.target.value.trim())setShowHint(false);}}
          onKeyDown={e=>e.key==="Enter"&&go()}
          autoComplete="off" maxLength={50}/>
      </div>
      <div className="name-hint-row">
        <span className={`name-hint-txt${showHint?" show":""}`}>✨ Ingresa tu nombre para continuar</span>
      </div>
      <button className="btn-main" onClick={go}>Continuar 🌸</button>
    </div>
  );
}

function ResultScreen({result,name,onRestart}){
  const canvasRef=useRef(null);
  const logoRef=useRef(null);
  const [busy,setBusy]=useState(false);
  const [toast,setToast]=useState("");

  useEffect(()=>{
    const img=new Image();
    img.onload=()=>{ logoRef.current=img; };
    img.onerror=()=>{ logoRef.current=null; };
    img.src="/logo.png";
  },[]);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2800);};

  const getBlob=()=>new Promise((res,rej)=>{
    const c=canvasRef.current;
    drawShareCard(c,name,result,logoRef.current);
    c.toBlob(b=>b?res(b):rej(new Error("canvas empty")),"image/png");
  });

  const handleSave=async()=>{
    setBusy(true);
    try{
      const blob=await getBlob();
      const file=new File([blob],"mi-perfil-mama.png",{type:"image/png"});
      if(navigator.share&&navigator.canShare?.({files:[file]})){
        await navigator.share({files:[file],title:`Soy "${result.title}"`,text:"¡Descubrí mi perfil de mamá con ergotec! ✨"});
      } else {
        const url=URL.createObjectURL(blob);
        const a=document.createElement("a");
        a.href=url;a.download="mi-perfil-mama.png";
        document.body.appendChild(a);a.click();
        document.body.removeChild(a);URL.revokeObjectURL(url);
        showToast("✓ Imagen descargada");
      }
    }catch(e){if(e.name!=="AbortError")showToast("✓ Imagen lista");}
    setBusy(false);
  };

  const handleWA=async()=>{
    try{
      const blob=await getBlob();
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url;a.download="mi-perfil-mama.png";
      document.body.appendChild(a);a.click();
      document.body.removeChild(a);URL.revokeObjectURL(url);
    }catch(e){}
    const txt=encodeURIComponent(`✨ Soy "${result.title}" ${result.emoji}\n¡Descubrí mi perfil de mamá con ergotec!\n\n${result.desc}`);
    window.open(`https://wa.me/?text=${txt}`,"_blank");
  };

  return(
    <div className="result">
      <canvas ref={canvasRef} className="canvas-hidden"/>
      <div className="r-logo"><Logo height={40}/></div>
      <div className="r-emo-wrap">
        <span className="r-emo">{result.emoji}</span>
        <div className="r-ring"/>
      </div>
      <p className="r-eye">{name}, tu resultado es</p>
      <h2 className="r-title">{result.title}</h2>
      {toast&&<div className="r-toast">{toast}</div>}
      <div className="r-card"><p className="r-desc">{result.desc}</p></div>
      <div className="r-actions">
        <button className="btn-main" onClick={handleSave} disabled={busy}>
          {busy?"Generando imagen…":"💾 Guardar imagen"}
        </button>
        <button className="btn-wa" onClick={handleWA}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Compartir por WhatsApp
        </button>
        <button className="btn-ghost" onClick={onRestart}>Volver a jugar 🔄</button>
      </div>
      <p className="r-hint">Comparte con las mamás especiales de tu vida 🌸</p>
    </div>
  );
}

export default function App(){
  const [phase,setPhase]=useState("intro");
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState([]);
  const [result,setResult]=useState(null);
  const [name,setName]=useState("");
  const handleName=n=>{setName(n);setPhase("quiz");setStep(0);setAnswers([]);};
  const handleAnswer=v=>{
    const next=[...answers,v];
    setAnswers(next);
    if(step+1<QUESTIONS.length)setStep(s=>s+1);
    else{setResult(RESULTS[calcResult(next)]);setPhase("result");}
  };
  const restart=()=>{setPhase("intro");setStep(0);setAnswers([]);setResult(null);setName("");};
  return(
    <>
      <style>{css}</style>
      <div className="page">
        <div className="card">
          <div className="blob1"/><div className="blob2"/>
          {phase==="quiz"&&<ProgressBar current={step+1} total={QUESTIONS.length}/>}
          {phase==="intro"&&<Intro onStart={()=>setPhase("name")}/>}
          {phase==="name"&&<NameScreen onContinue={handleName}/>}
          {phase==="quiz"&&<QuizQuestion key={step} question={QUESTIONS[step]} onAnswer={handleAnswer}/>}
          {phase==="result"&&result&&<ResultScreen result={result} name={name} onRestart={restart}/>}
        </div>
      </div>
    </>
  );
}