import React, { useState, useRef } from "react";

const LISTINGS = [
  { id:1, title:"Veste en jean vintage", price:45, seller:"claire.lsn", city:"Lausanne", tag:"FEMME · VESTE", desc:"Veste en jean style 90s, portée quelques fois. Coupe oversize.", size:"M", state:"Bon état", category:"Femme", likes:128, comments:12, saves:34, shares:9 },
  { id:2, title:"Pull col rond beige",   price:20, seller:"noah.ch",    city:"Lausanne", tag:"HOMME · PULL",   desc:"Pull en laine mélangée, taille M, très peu porté.", size:"M", state:"Comme neuf", category:"Homme", likes:64, comments:4, saves:18, shares:3 },
  { id:3, title:"Bottines en cuir",      price:60, seller:"elsa.gva",   city:"Genève",   tag:"FEMME · CHAUSSURES", desc:"Bottines en cuir véritable, talon 3cm, taille 38.", size:"38", state:"Bon état", category:"Femme", likes:210, comments:21, saves:80, shares:15 },
];

function Logo({ size=28, dark=false }) {
  return (
    <span style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:size, lineHeight:1, userSelect:"none" }}>
      <span style={{ color:dark?"#F7F4EC":"#1C1A16" }}>Swip</span>
      <span style={{ color:"#E2462B", fontFamily:"'JetBrains Mono',monospace", fontSize:size*0.5, position:"relative", top:"-0.1em" }}>'n</span>
      <span style={{ color:dark?"#F5C518":"#1C1A16" }}> Style</span>
    </span>
  );
}

function Btn({ children, variant="primary", onClick, style:s }) {
  const base = { flex:1, textAlign:"center", padding:11, borderRadius:8, fontSize:12.5, fontWeight:700, fontFamily:"Manrope", cursor:"pointer", border:"none" };
  const v = { primary:{ background:"#1C1A16", color:"#F7F4EC" }, outline:{ background:"transparent", border:"1.5px solid #1C1A16", color:"#1C1A16" } };
  return <button onClick={onClick} style={{ ...base, ...v[variant], ...s }}>{children}</button>;
}

function Pill({ children }) {
  return <span style={{ border:"1px solid #D9D2C2", borderRadius:20, padding:"4px 10px", fontSize:10.5, fontFamily:"'JetBrains Mono'", color:"#6b6552" }}>{children}</span>;
}

function Toast({ msg }) {
  if (!msg) return null;
  return <div style={{ position:"absolute", bottom:80, left:"50%", transform:"translateX(-50%)", zIndex:99, background:"rgba(28,26,22,.92)", color:"#F7F4EC", fontFamily:"'JetBrains Mono'", fontSize:11, padding:"8px 18px", borderRadius:20, whiteSpace:"nowrap", pointerEvents:"none" }}>{msg}</div>;
}

function TabBar({ active, onNavigate }) {
  const tabs = [
    { key:"feed", label:"Fil", icon:"▭" },
    { key:"search", label:"Recherche", icon:"⌕" },
    { key:"sell", label:"Vendre", icon:"+" },
    { key:"messages", label:"Messages", icon:"✉" },
    { key:"profile", label:"Profil", icon:"○" },
  ];
  return (
    <div style={{ height:56, background:"#fff", borderTop:"1px solid #D9D2C2", display:"flex", alignItems:"center", justifyContent:"space-around" }}>
      {tabs.map(t => (
        <button key={t.key} onClick={() => onNavigate(t.key)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, color:active===t.key?"#E2462B":"#A39C89", fontWeight:active===t.key?700:400, fontSize:9, fontFamily:"Manrope" }}>
          <div style={{ width:18, height:18, border:"1.5px solid currentColor", borderRadius:t.key==="sell"?"50%":5, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11 }}>{t.icon}</div>
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── SPLASH ──
function SplashScreen({ onLogin, onRegister }) {
  return (
    <div style={{ height:"100%", background:"#1C1A16", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"50px 24px 36px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(226,70,43,.18) 0%, transparent 70%)", top:"20%", left:"50%", transform:"translateX(-50%)" }} />
      <div style={{ textAlign:"center", zIndex:1 }}>
        <div style={{ fontSize:56, marginBottom:12 }}>🏷️</div>
        <Logo size={38} dark={true} />
        <div style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:"rgba(255,255,255,.4)", marginTop:10, letterSpacing:".1em" }}>MARKETPLACE · SUISSE ROMANDE</div>
      </div>
      <div style={{ zIndex:1, textAlign:"center" }}>
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:20 }}>
          {[["👗","Femme"],["👔","Homme"],["👟","Shoes"]].map(([ic,label]) => (
            <div key={label} style={{ background:"rgba(255,255,255,.07)", borderRadius:12, padding:"16px 14px", border:"1px solid rgba(255,255,255,.1)" }}>
              <div style={{ fontSize:28, marginBottom:6 }}>{ic}</div>
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"rgba(255,255,255,.45)" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:"'Fraunces',serif", fontSize:22, color:"#F7F4EC", fontWeight:700, lineHeight:1.3, marginBottom:8 }}>Donnez une seconde vie<br/>à votre dressing.</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,.45)", lineHeight:1.6 }}>Swipez, vendez, achetez — en toute sécurité.</div>
      </div>
      <div style={{ width:"100%", zIndex:1, display:"flex", flexDirection:"column", gap:10 }}>
        <button onClick={onRegister} style={{ width:"100%", padding:14, background:"#E2462B", color:"#fff", border:"none", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"Manrope", cursor:"pointer" }}>Créer un compte</button>
        <button onClick={onLogin} style={{ width:"100%", padding:14, background:"transparent", color:"#F7F4EC", border:"1.5px solid rgba(255,255,255,.25)", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"Manrope", cursor:"pointer" }}>Se connecter</button>
        <div style={{ textAlign:"center", fontFamily:"'JetBrains Mono'", fontSize:9, color:"rgba(255,255,255,.25)", marginTop:4 }}>En continuant, vous acceptez nos CGU & CGV</div>
      </div>
    </div>
  );
}

// ── LOGIN ──
function LoginScreen({ onSuccess, onRegister, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = () => {
    if (!email||!password) { setError("Veuillez remplir tous les champs."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess({ email, name:email.split("@")[0] }); }, 1000);
  };
  return (
    <div style={{ height:"100%", background:"#F7F4EC", overflowY:"auto" }}>
      <div style={{ background:"#1C1A16", padding:"28px 20px 24px" }}>
        <div onClick={onBack} style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.4)", cursor:"pointer", marginBottom:16 }}>← Retour</div>
        <Logo size={22} dark={true} />
        <div style={{ fontFamily:"'Fraunces',serif", fontSize:20, color:"#F7F4EC", fontWeight:700, marginTop:10 }}>Bon retour 👋</div>
      </div>
      <div style={{ padding:"24px 20px" }}>
        <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:5 }}>EMAIL</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="claire@email.ch" style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #D9D2C2", borderRadius:10, fontSize:14, fontFamily:"Manrope", marginBottom:14, boxSizing:"border-box" }} />
        <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:5 }}>MOT DE PASSE</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #D9D2C2", borderRadius:10, fontSize:14, fontFamily:"Manrope", marginBottom:14, boxSizing:"border-box" }} />
        {error && <div style={{ color:"#E2462B", fontSize:12, marginBottom:12 }}>{error}</div>}
        <button onClick={login} style={{ width:"100%", padding:14, background:loading?"#8a8473":"#1C1A16", color:"#F7F4EC", border:"none", borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer" }}>{loading?"Connexion…":"Se connecter"}</button>
        <div style={{ textAlign:"center", marginTop:20, fontSize:12.5, color:"#8a8473" }}>Pas encore de compte ? <span onClick={onRegister} style={{ color:"#E2462B", fontWeight:700, cursor:"pointer" }}>Créer un compte</span></div>
      </div>
    </div>
  );
}

// ── REGISTER ──
function RegisterScreen({ onSuccess, onLogin, onBack }) {
  const [step, setStep] = useState(1);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [cgu, setCgu] = useState(false);
  const [cgv, setCgv] = useState(false);
  const [confid, setConfid] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [error, setError] = useState("");
  const [kycPhoto, setKycPhoto] = useState(null);
  const [kycSelfie, setKycSelfie] = useState(null);
  const [kycDone, setKycDone] = useState(false);
  const [kycLoading, setKycLoading] = useState(false);
  const photoRef = useRef();
  const selfieRef = useRef();

  const next = () => {
    setError("");
    if (step===1) { if (!prenom||!nom||!email||!tel) { setError("Tous les champs sont obligatoires."); return; } }
    if (step===2) { if (!password||password.length<8) { setError("Mot de passe trop court (8 car. min)."); return; } if (password!==confirm) { setError("Les mots de passe ne correspondent pas."); return; } }
    if (step===3) { if (!cgu||!cgv||!confid) { setError("Vous devez accepter les conditions obligatoires."); return; } }
    setStep(s=>s+1);
  };

  const launchKYC = () => {
    if (!kycPhoto||!kycSelfie) { setError("Veuillez importer votre pièce d'identité et un selfie."); return; }
    setError(""); setKycLoading(true);
    setTimeout(() => { setKycLoading(false); setKycDone(true); }, 2000);
  };

  const steps = ["Infos","Sécurité","CGU","Identité"];
  const iStyle = { width:"100%", padding:"11px 13px", border:"1.5px solid #D9D2C2", borderRadius:10, fontSize:13.5, fontFamily:"Manrope", marginBottom:12, boxSizing:"border-box", background:"#fff" };

  return (
    <div style={{ height:"100%", background:"#F7F4EC", overflowY:"auto" }}>
      <div style={{ background:"#1C1A16", padding:"20px 20px 18px" }}>
        <div onClick={onBack} style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.4)", cursor:"pointer", marginBottom:12 }}>← Retour</div>
        <Logo size={18} dark={true} />
        <div style={{ fontFamily:"'Fraunces',serif", fontSize:18, color:"#F7F4EC", fontWeight:700, marginTop:8 }}>Créer un compte</div>
        <div style={{ display:"flex", gap:6, marginTop:14 }}>
          {steps.map((s,i) => (
            <div key={s} style={{ flex:1 }}>
              <div style={{ height:3, borderRadius:3, background:step>i+1?"#7C8B6F":step===i+1?"#F5C518":"rgba(255,255,255,.2)", transition:"background .3s" }} />
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:8, color:step===i+1?"#F5C518":"rgba(255,255,255,.3)", marginTop:3 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"20px 20px 30px" }}>
        {/* ÉTAPE 1 */}
        {step===1 && <>
          <div style={{ fontFamily:"'Fraunces',serif", fontSize:15, fontWeight:700, marginBottom:14 }}>Vos informations</div>
          <div style={{ display:"flex", gap:8 }}>
            <div style={{ flex:1 }}>
              <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>PRÉNOM</label>
              <input value={prenom} onChange={e=>setPrenom(e.target.value)} placeholder="Claire" style={iStyle} />
            </div>
            <div style={{ flex:1 }}>
              <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>NOM</label>
              <input value={nom} onChange={e=>setNom(e.target.value)} placeholder="Moreau" style={iStyle} />
            </div>
          </div>
          <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>EMAIL</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="claire@email.ch" style={iStyle} />
          <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>TÉLÉPHONE</label>
          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="+41 79 000 00 00" style={iStyle} />
          <div style={{ background:"#FFF3E0", border:"1px solid #F5C518", borderRadius:8, padding:"8px 12px", fontSize:11, color:"#8B6E00", marginBottom:14 }}>🔒 Données protégées — nLPD suisse</div>
        </>}

        {/* ÉTAPE 2 */}
        {step===2 && <>
          <div style={{ fontFamily:"'Fraunces',serif", fontSize:15, fontWeight:700, marginBottom:14 }}>Sécurité du compte</div>
          <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>MOT DE PASSE</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="8 caractères minimum" style={iStyle} />
          <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>CONFIRMER</label>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Répétez le mot de passe" style={iStyle} />
          <div style={{ background:"#F0F7F0", border:"1px solid #7C8B6F", borderRadius:8, padding:"8px 12px", marginBottom:14 }}>
            {["8 caractères minimum","Une majuscule","Un chiffre"].map((r,i)=>(
              <div key={i} style={{ fontSize:11, color:"#4a6040", marginBottom:3 }}><span style={{ marginRight:6 }}>{password.length>=(i===0?8:1)?"✓":"○"}</span>{r}</div>
            ))}
          </div>
        </>}

        {/* ÉTAPE 3 */}
        {step===3 && <>
          <div style={{ fontFamily:"'Fraunces',serif", fontSize:15, fontWeight:700, marginBottom:14 }}>Conditions & confidentialité</div>
          {[
            [cgu, setCgu, "J'accepte les Conditions Générales d'Utilisation.", true],
            [cgv, setCgv, "J'accepte les Conditions Générales de Vente.", true],
            [confid, setConfid, "J'ai pris connaissance de la Politique de Confidentialité (nLPD).", true],
            [marketing, setMarketing, "Je souhaite recevoir les offres par email. (facultatif)", false],
          ].map(([val, setter, label, req], i) => (
            <div key={i} onClick={()=>setter(v=>!v)} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10, padding:"10px 12px", background:val?"#F0F7F0":"#fff", border:`1.5px solid ${val?"#7C8B6F":"#D9D2C2"}`, borderRadius:10, cursor:"pointer" }}>
              <div style={{ width:18, height:18, borderRadius:4, border:`2px solid ${val?"#7C8B6F":"#D9D2C2"}`, background:val?"#7C8B6F":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                {val && <span style={{ color:"#fff", fontSize:12, fontWeight:700 }}>✓</span>}
              </div>
              <div style={{ fontSize:11.5, color:"#5c5848", lineHeight:1.5 }}>{label}{req&&<span style={{ color:"#E2462B", fontFamily:"'JetBrains Mono'", fontSize:9, marginLeft:6 }}>OBLIGATOIRE</span>}</div>
            </div>
          ))}
        </>}

        {/* ÉTAPE 4 — KYC */}
        {step===4 && <>
          <div style={{ fontFamily:"'Fraunces',serif", fontSize:15, fontWeight:700, marginBottom:8 }}>Vérification d'identité</div>
          <div style={{ fontSize:12, color:"#5c5848", lineHeight:1.6, marginBottom:16 }}>Pour votre sécurité et celle de la communauté, une pièce d'identité et un selfie sont requis.</div>
          {!kycDone ? <>
            {/* Import carte d'identité */}
            <div onClick={()=>photoRef.current.click()} style={{ border:`1.5px dashed ${kycPhoto?"#7C8B6F":"#D9D2C2"}`, borderRadius:12, padding:16, textAlign:"center", marginBottom:12, cursor:"pointer", background:kycPhoto?"#F0F7F0":"#fff" }}>
              <div style={{ fontSize:32, marginBottom:6 }}>{kycPhoto?"✅":"🪪"}</div>
              <div style={{ fontWeight:700, fontSize:12.5, marginBottom:4 }}>{kycPhoto?kycPhoto.name:"Pièce d'identité / Passeport"}</div>
              <div style={{ fontSize:11, color:"#8a8473" }}>{kycPhoto?"Document importé":"Cliquez pour importer une photo"}</div>
              <input ref={photoRef} type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{ if(e.target.files[0]) setKycPhoto(e.target.files[0]); }} />
            </div>
            {/* Import selfie */}
            <div onClick={()=>selfieRef.current.click()} style={{ border:`1.5px dashed ${kycSelfie?"#7C8B6F":"#D9D2C2"}`, borderRadius:12, padding:16, textAlign:"center", marginBottom:16, cursor:"pointer", background:kycSelfie?"#F0F7F0":"#fff" }}>
              <div style={{ fontSize:32, marginBottom:6 }}>{kycSelfie?"✅":"🤳"}</div>
              <div style={{ fontWeight:700, fontSize:12.5, marginBottom:4 }}>{kycSelfie?kycSelfie.name:"Selfie de vérification"}</div>
              <div style={{ fontSize:11, color:"#8a8473" }}>{kycSelfie?"Selfie importé":"Prenez une photo de vous"}</div>
              <input ref={selfieRef} type="file" accept="image/*" capture="user" style={{ display:"none" }} onChange={e=>{ if(e.target.files[0]) setKycSelfie(e.target.files[0]); }} />
            </div>
            <button onClick={launchKYC} disabled={kycLoading} style={{ width:"100%", padding:13, background:kycLoading?"#8a8473":"#1C1A16", color:"#F7F4EC", border:"none", borderRadius:12, fontSize:13, fontWeight:700, cursor:"pointer" }}>
              {kycLoading?"Vérification en cours…":"✓ Valider mon identité"}
            </button>
          </> : (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:50, marginBottom:12 }}>✅</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:18, marginBottom:8 }}>Identité vérifiée !</div>
              <div style={{ fontSize:12, color:"#5c5848", marginBottom:24 }}>Bienvenue sur Swip'n Style !</div>
              <button onClick={()=>onSuccess({ prenom, nom, email })} style={{ background:"#E2462B", color:"#fff", border:"none", borderRadius:12, padding:"13px 32px", fontSize:14, fontWeight:700, cursor:"pointer" }}>Accéder à l'app →</button>
            </div>
          )}
        </>}

        {error && <div style={{ color:"#E2462B", fontSize:11.5, margin:"10px 0", fontFamily:"'JetBrains Mono'" }}>⚠️ {error}</div>}

        {step<4 && (
          <button onClick={next} style={{ width:"100%", padding:13, background:"#1C1A16", color:"#F7F4EC", border:"none", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"Manrope", cursor:"pointer", marginTop:10 }}>Continuer →</button>
        )}
        {step===1 && <div style={{ textAlign:"center", marginTop:14, fontSize:12.5, color:"#8a8473" }}>Déjà un compte ? <span onClick={onLogin} style={{ color:"#E2462B", fontWeight:700, cursor:"pointer" }}>Se connecter</span></div>}
      </div>
    </div>
  );
}

// ── COMMENTAIRES ──
function CommentsPanel({ item, onClose }) {
  const [text, setText] = useState("");
  const [list, setList] = useState([
    { user:"marc.lsn", msg:"Toujours disponible ?", time:"2min" },
    { user:"sophie_vd", msg:"Super qualité sur la photo !", time:"8min" },
  ]);
  const send = () => {
    if (!text.trim()) return;
    setList(p=>[{ user:"moi", msg:text, time:"à l'instant" }, ...p]);
    setText("");
  };
  return (
    <div style={{ position:"absolute", inset:0, zIndex:20, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={onClose} style={{ flex:1, background:"rgba(0,0,0,.45)" }} />
      <div style={{ background:"#F7F4EC", borderTopLeftRadius:20, borderTopRightRadius:20, padding:"16px 16px 12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:15 }}>Commentaires · {list.length}</div>
          <div onClick={onClose} style={{ fontSize:18, cursor:"pointer", color:"#8a8473" }}>✕</div>
        </div>
        <div style={{ overflowY:"auto", maxHeight:180, marginBottom:12 }}>
          {list.map((c,i)=>(
            <div key={i} style={{ display:"flex", gap:8, marginBottom:12 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:c.user==="moi"?"#E2462B":"#7C8B6F", flexShrink:0 }} />
              <div><div style={{ fontWeight:700, fontSize:11 }}>@{c.user} <span style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"#A39C89", fontWeight:400 }}>{c.time}</span></div><div style={{ fontSize:12, color:"#5c5848", marginTop:2 }}>{c.msg}</div></div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Écrire un commentaire…" style={{ flex:1, border:"1.5px solid #D9D2C2", borderRadius:20, padding:"8px 14px", fontSize:12, fontFamily:"Manrope" }} />
          <button onClick={send} style={{ background:"#E2462B", border:"none", borderRadius:20, color:"#fff", padding:"8px 14px", fontWeight:700, fontSize:12, cursor:"pointer" }}>↑</button>
        </div>
      </div>
    </div>
  );
}

// ── FEED ──
function FeedScreen({ index, setIndex, onOpenListing, onNavigate }) {
  const item = LISTINGS[index % LISTINGS.length];
  const nextItem = LISTINGS[(index+1) % LISTINGS.length];
  const prevItem = LISTINGS[(index-1+LISTINGS.length) % LISTINGS.length];
  const [followTab, setFollowTab] = useState("pourtoi");
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [saves, setSaves] = useState(item.saves);
  const [toast, setToast] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const wheelAcc = useRef(0);
  const wheelTimer = useRef(null);
  const startY = useRef(null);
  const [dragY, setDragY] = useState(0);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 1800); };
  const toggleLike = () => { setLiked(p=>!p); setLikes(p=>liked?p-1:p+1); if(!liked) showToast("❤️ Ajouté aux coups de cœur"); };
  const toggleSave = () => { setSaved(p=>!p); setSaves(p=>saved?p-1:p+1); if(!saved) showToast("🔖 Annonce enregistrée"); };
  const toggleFollow = () => { setFollowed(p=>!p); showToast(followed?"Abonnement annulé":"✅ Vous suivez ce vendeur"); };

  const THRESHOLD = 80;
  const go = (dir) => {
    if (animating) return;
    setDirection(dir); setAnimating(true);
    setTimeout(()=>{ setIndex(i=>dir==="up"?(i+1)%LISTINGS.length:(i-1+LISTINGS.length)%LISTINGS.length); setDragY(0); setAnimating(false); setDirection(null); }, 400);
  };
  const onWheel = (e) => {
    if (animating) return;
    wheelAcc.current += e.deltaY;
    clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(()=>{ if(wheelAcc.current>THRESHOLD) go("up"); else if(wheelAcc.current<-THRESHOLD) go("down"); wheelAcc.current=0; }, 100);
  };
  const onTouchStart = (e) => { startY.current = e.touches[0].clientY; };
  const onTouchMove = (e) => { if(animating) return; setDragY(Math.max(-140, Math.min(140, e.touches[0].clientY - startY.current))); };
  const onTouchEnd = () => { if(dragY<-THRESHOLD) go("up"); else if(dragY>THRESHOLD) go("down"); else setDragY(0); };

  const COLORS = ["linear-gradient(160deg,#D7CDB8,#9C8E6C)","linear-gradient(160deg,#B8C9D7,#6C8A9C)","linear-gradient(160deg,#C9D7B8,#7C9C6C)"];
  const slideStyle = (offset) => {
    let t = offset*100 + (dragY/660)*100;
    if (animating) t = direction==="up" ? offset*100-100 : offset*100+100;
    return { position:"absolute", inset:0, transform:`translateY(${t}%)`, transition:animating?"transform 0.4s cubic-bezier(0.4,0,0.2,1)":dragY!==0?"none":"transform 0.3s ease" };
  };

  return (
    <div style={{ height:"100%", position:"relative", background:"#15130F", color:"#fff", overflow:"hidden", touchAction:"none" }}
      onWheel={onWheel} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {/* Slides */}
      <div style={slideStyle(-1)}><div style={{ position:"absolute", inset:0, background:COLORS[(index-1+3)%3] }} /></div>
      <div style={slideStyle(0)}>
        <div style={{ position:"absolute", inset:0, background:COLORS[index%3] }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(0,0,0,.55) 0%,rgba(0,0,0,0) 20%,rgba(0,0,0,0) 55%,rgba(0,0,0,.75) 100%)" }} />
        {/* Topnav */}
        <div style={{ position:"absolute", top:0, left:0, right:0, zIndex:3, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px 8px" }}>
          <div onClick={()=>onNavigate("live")} style={{ display:"flex", alignItems:"center", gap:4, fontFamily:"'JetBrains Mono'", fontSize:9, border:"1px solid rgba(255,255,255,.5)", borderRadius:5, padding:"3px 6px", cursor:"pointer" }}>📡 Live</div>
          <div style={{ display:"flex", gap:14, fontSize:12.5 }}>
            <span onClick={()=>setFollowTab("suivis")} style={{ color:followTab==="suivis"?"#fff":"rgba(255,255,255,.55)", fontWeight:followTab==="suivis"?700:400, borderBottom:followTab==="suivis"?"2px solid #E2462B":"none", paddingBottom:6, cursor:"pointer" }}>Suivis</span>
            <span onClick={()=>setFollowTab("pourtoi")} style={{ color:followTab==="pourtoi"?"#fff":"rgba(255,255,255,.55)", fontWeight:followTab==="pourtoi"?700:400, borderBottom:followTab==="pourtoi"?"2px solid #E2462B":"none", paddingBottom:6, cursor:"pointer" }}>Pour toi</span>
          </div>
          <div onClick={()=>onNavigate("search")} style={{ fontSize:14, cursor:"pointer" }}>⌕</div>
        </div>
        <div style={{ position:"absolute", top:46, left:14, zIndex:3, background:"#E2462B", color:"#fff", fontFamily:"'JetBrains Mono'", fontSize:9.5, padding:"4px 9px", borderRadius:3 }}>{item.tag}</div>
        {/* Rail */}
        <div style={{ position:"absolute", right:10, bottom:100, zIndex:3, display:"flex", flexDirection:"column", alignItems:"center", gap:15 }}>
          <div onClick={toggleFollow} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer" }}>
            <div style={{ width:38, height:38, borderRadius:"50%", background:"#7C8B6F", border:`2px solid ${followed?"#E2462B":"#fff"}`, position:"relative" }}>
              <div style={{ position:"absolute", bottom:-7, left:"50%", transform:"translateX(-50%)", width:16, height:16, borderRadius:"50%", background:followed?"#7C8B6F":"#E2462B", color:"#fff", fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>{followed?"✓":"+"}</div>
            </div>
            <span style={{ fontFamily:"'JetBrains Mono'", fontSize:8, marginTop:4, color:followed?"#F5C518":"rgba(255,255,255,.8)" }}>{followed?"Suivi":"Suivre"}</span>
          </div>
          <div onClick={toggleLike} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer" }}>
            <div style={{ fontSize:26, color:liked?"#E2462B":"#fff" }}>{liked?"❤️":"♡"}</div>
            <span style={{ fontFamily:"'JetBrains Mono'", fontSize:9.5, color:liked?"#E2462B":"#fff" }}>{likes}</span>
          </div>
          <div onClick={()=>setShowComments(true)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer" }}>
            <div style={{ fontSize:23 }}>💬</div><span style={{ fontFamily:"'JetBrains Mono'", fontSize:9.5 }}>{item.comments}</span>
          </div>
          <div onClick={toggleSave} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer" }}>
            <div style={{ fontSize:23, color:saved?"#F5C518":"#fff" }}>🔖</div><span style={{ fontFamily:"'JetBrains Mono'", fontSize:9.5, color:saved?"#F5C518":"#fff" }}>{saves}</span>
          </div>
          <div onClick={()=>showToast("↗ Lien copié !")} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer" }}>
            <div style={{ fontSize:23 }}>↗</div><span style={{ fontFamily:"'JetBrains Mono'", fontSize:9.5 }}>{item.shares}</span>
          </div>
        </div>
        {/* Caption */}
        <div onClick={()=>onOpenListing(item)} style={{ position:"absolute", left:14, right:64, bottom:20, zIndex:3, cursor:"pointer" }}>
          <div style={{ display:"inline-block", background:"#fff", color:"#E2462B", fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:16, padding:"3px 10px", borderRadius:5, marginBottom:7 }}>{item.price}.- CHF</div>
          <div style={{ fontWeight:700, fontSize:13, marginBottom:3 }}>@{item.seller} · {item.city}</div>
          <div style={{ fontSize:11.5, lineHeight:1.4, color:"rgba(255,255,255,.9)" }}>{item.desc}</div>
        </div>
        {/* Dots */}
        <div style={{ position:"absolute", bottom:5, left:"50%", transform:"translateX(-50%)", zIndex:3, display:"flex", gap:5 }}>
          {LISTINGS.map((_,i)=><div key={i} style={{ width:i===index%LISTINGS.length?16:5, height:5, borderRadius:3, background:i===index%LISTINGS.length?"#E2462B":"rgba(255,255,255,.35)", transition:"all .3s" }} />)}
        </div>
        <Toast msg={toast} />
        {showComments && <CommentsPanel item={item} onClose={()=>setShowComments(false)} />}
      </div>
      <div style={slideStyle(1)}><div style={{ position:"absolute", inset:0, background:COLORS[(index+1)%3] }} /></div>
    </div>
  );
}

// ── LISTING DETAIL ──
function ListingDetail({ item, onBack, onBuy }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [saves, setSaves] = useState(item.saves);
  const [toast, setToast] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const showT = (m) => { setToast(m); setTimeout(()=>setToast(null),1800); };

  return (
    <div style={{ height:"100%", overflowY:"auto", background:"#F7F4EC", position:"relative" }}>
      <div style={{ height:"46%", position:"relative", background:"linear-gradient(160deg,#CDBFA1,#A99A78)" }}>
        <div onClick={onBack} style={{ position:"absolute", top:14, left:14, width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,.9)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>←</div>
        <div style={{ position:"absolute", top:14, right:14, display:"flex", gap:8 }}>
          <div onClick={()=>{setSaved(p=>!p);setSaves(p=>saved?p-1:p+1);if(!saved)showT("🔖 Enregistré");}} style={{ width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,.9)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:saved?"#F5C518":"#1C1A16" }}>🔖</div>
          <div onClick={()=>showT("↗ Lien copié !")} style={{ width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,.9)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>↗</div>
        </div>
        <div style={{ position:"absolute", bottom:16, right:16, background:"#E2462B", color:"#fff", width:54, height:54, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:13, lineHeight:1.1 }}>{item.price}.-<br/>CHF</div>
      </div>
      <div style={{ padding:18 }}>
        <div style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:19, marginBottom:6 }}>{item.title}</div>
        <div style={{ display:"flex", gap:16, marginBottom:12 }}>
          <div onClick={()=>{setLiked(p=>!p);setLikes(p=>liked?p-1:p+1);}} style={{ display:"flex", alignItems:"center", gap:5, cursor:"pointer" }}>
            <span style={{ fontSize:18, color:liked?"#E2462B":"#A39C89" }}>{liked?"❤️":"♡"}</span>
            <span style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:liked?"#E2462B":"#8a8473" }}>{likes}</span>
          </div>
          <div onClick={()=>setShowComments(true)} style={{ display:"flex", alignItems:"center", gap:5, cursor:"pointer" }}>
            <span style={{ fontSize:18 }}>💬</span><span style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:"#8a8473" }}>{item.comments}</span>
          </div>
          <div onClick={()=>{setSaved(p=>!p);setSaves(p=>saved?p-1:p+1);}} style={{ display:"flex", alignItems:"center", gap:5, cursor:"pointer" }}>
            <span style={{ fontSize:18, color:saved?"#F5C518":"#A39C89" }}>🔖</span><span style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:saved?"#F5C518":"#8a8473" }}>{saves}</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
          <Pill>Taille {item.size}</Pill><Pill>{item.state}</Pill><Pill>{item.category}</Pill>
        </div>
        <div style={{ fontSize:12.5, color:"#5c5848", lineHeight:1.5, marginBottom:12 }}>{item.desc}</div>
        <div style={{ display:"flex", alignItems:"center", gap:10, borderTop:"1px dashed #D9D2C2", paddingTop:12, marginBottom:14, justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"#7C8B6F" }} />
            <div><div style={{ fontSize:12, fontWeight:700 }}>@{item.seller} ✓</div><div style={{ fontSize:10, color:"#8a8473" }}>4.9 ★ · 23 ventes</div></div>
          </div>
          <button onClick={()=>setFollowed(p=>!p)} style={{ background:followed?"#F7F4EC":"#1C1A16", color:followed?"#1C1A16":"#F7F4EC", border:"1.5px solid #1C1A16", borderRadius:20, padding:"5px 14px", fontSize:11, fontWeight:700, cursor:"pointer" }}>{followed?"✓ Suivi":"+ Suivre"}</button>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <Btn variant="outline">Message</Btn>
          <Btn variant="primary" onClick={onBuy}>Acheter</Btn>
        </div>
      </div>
      <Toast msg={toast} />
      {showComments && <CommentsPanel item={item} onClose={()=>setShowComments(false)} />}
    </div>
  );
}

// ── SEARCH ──
function SearchScreen({ onOpenListing }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tous");
  const filtered = LISTINGS.filter(l => {
    const matchCat = filter==="Tous" || l.category===filter;
    const matchQ = !query || l.title.toLowerCase().includes(query.toLowerCase()) || l.desc.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div style={{ height:"100%", background:"#F7F4EC", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"12px 16px 8px" }}>
        <input
          value={query}
          onChange={e=>setQuery(e.target.value)}
          placeholder="⌕ Rechercher un article…"
          style={{ width:"100%", background:"#fff", border:"1.5px solid #1C1A16", borderRadius:10, padding:"10px 12px", fontSize:12, fontFamily:"'JetBrains Mono'", boxSizing:"border-box" }}
        />
      </div>
      <div style={{ display:"flex", gap:7, padding:"0 16px 10px", flexWrap:"wrap" }}>
        {["Tous","Femme","Homme"].map(f=>(
          <div key={f} onClick={()=>setFilter(f)} style={{ border:"1px solid #1C1A16", borderRadius:20, padding:"5px 11px", fontSize:10.5, fontFamily:"'JetBrains Mono'", cursor:"pointer", background:filter===f?"#E2462B":"#fff", color:filter===f?"#fff":"#1C1A16", borderColor:filter===f?"#E2462B":"#1C1A16" }}>{f}</div>
        ))}
      </div>
      <div style={{ flex:1, overflowY:"auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, padding:"0 16px 16px" }}>
        {filtered.length===0 && <div style={{ gridColumn:"1/-1", textAlign:"center", color:"#8a8473", fontSize:13, marginTop:30 }}>Aucun résultat pour "{query}"</div>}
        {filtered.map(l=>(
          <div key={l.id} onClick={()=>onOpenListing(l)} style={{ background:"#fff", borderRadius:10, overflow:"hidden", border:"1px solid #D9D2C2", cursor:"pointer" }}>
            <div style={{ height:110, background:"linear-gradient(160deg,#D4C8AC,#B3A483)" }} />
            <div style={{ padding:8 }}>
              <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, color:"#E2462B", fontSize:14 }}>{l.price}.-</div>
              <div style={{ fontSize:10.5, color:"#5c5848" }}>{l.title}</div>
              <div style={{ fontSize:9.5, color:"#A39C89", fontFamily:"'JetBrains Mono'" }}>{l.city}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SELL ──
function SellScreen() {
  const [price, setPrice] = useState(45);
  const [mode, setMode] = useState("recommande");
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [published, setPublished] = useState(false);
  const photoRef = useRef();
  const commission = (price * 0.06).toFixed(2);
  const net = (price - price * 0.06).toFixed(2);
  const iStyle = { width:"100%", padding:"10px 12px", border:"1.5px solid #D9D2C2", borderRadius:10, fontSize:13, fontFamily:"Manrope", marginBottom:12, boxSizing:"border-box", background:"#fff" };

  const addPhotos = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(p=>[...p, ...files].slice(0,5));
  };

  const publish = () => {
    if (!title) { alert("Veuillez ajouter un titre."); return; }
    if (photos.length===0) { alert("Veuillez ajouter au moins une photo."); return; }
    setPublished(true);
  };

  if (published) return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#F7F4EC", padding:32, textAlign:"center" }}>
      <div style={{ fontSize:52, marginBottom:14 }}>🎉</div>
      <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:20, marginBottom:8 }}>Annonce publiée !</div>
      <div style={{ fontSize:12.5, color:"#5c5848", marginBottom:24 }}>Votre article est maintenant visible dans le fil.</div>
      <button onClick={()=>setPublished(false)} style={{ background:"#E2462B", color:"#fff", border:"none", borderRadius:12, padding:"12px 28px", fontSize:14, fontWeight:700, cursor:"pointer" }}>Publier un autre article</button>
    </div>
  );

  return (
    <div style={{ height:"100%", overflowY:"auto", background:"#F7F4EC" }}>
      <div style={{ padding:"16px 18px 6px", fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:17 }}>Nouvelle annonce</div>
      <div style={{ padding:"0 18px 24px" }}>
        {/* Photos */}
        <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
          {photos.map((f,i)=>(
            <div key={i} style={{ width:64, height:64, borderRadius:8, background:"linear-gradient(160deg,#D7CDB8,#A99A78)", position:"relative", overflow:"hidden" }}>
              <img src={URL.createObjectURL(f)} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <div onClick={()=>setPhotos(p=>p.filter((_,j)=>j!==i))} style={{ position:"absolute", top:2, right:2, width:16, height:16, borderRadius:"50%", background:"#E2462B", color:"#fff", fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>✕</div>
            </div>
          ))}
          {photos.length<5 && (
            <div onClick={()=>photoRef.current.click()} style={{ width:64, height:64, borderRadius:8, border:"1.5px dashed #D9D2C2", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontSize:22, color:"#A39C89", cursor:"pointer" }}>
              <span>+</span>
              <span style={{ fontSize:8, fontFamily:"'JetBrains Mono'" }}>Photo</span>
            </div>
          )}
          <input ref={photoRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={addPhotos} />
        </div>

        <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>TITRE DE L'ANNONCE</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ex: Veste en jean vintage taille M" style={iStyle} />

        <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>DESCRIPTION</label>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Décrivez l'état, la taille, la marque…" rows={3} style={{ ...iStyle, resize:"none" }} />

        <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>PRIX DE VENTE (CHF)</label>
        <input type="number" value={price} onChange={e=>setPrice(Number(e.target.value)||0)} style={{ ...iStyle, fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:16, color:"#E2462B" }} />

        <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:6 }}>MODE DE LIVRAISON</label>
        <div style={{ display:"flex", gap:7, marginBottom:14, flexWrap:"wrap" }}>
          {[["recommande","Recommandé"],["simple","Envoi simple"],["main_propre","Main propre"]].map(([k,label])=>(
            <div key={k} onClick={()=>setMode(k)} style={{ border:"1px solid #1C1A16", borderRadius:20, padding:"5px 11px", fontSize:10.5, fontFamily:"'JetBrains Mono'", cursor:"pointer", background:mode===k?"#E2462B":"#fff", color:mode===k?"#fff":"#1C1A16", borderColor:mode===k?"#E2462B":"#1C1A16" }}>{label}</div>
          ))}
        </div>

        <div style={{ border:"1.5px dashed #1C1A16", borderRadius:10, padding:12, marginBottom:16 }}>
          <div style={{ fontFamily:"'JetBrains Mono'", fontSize:11, fontWeight:700, marginBottom:6 }}>RÉPARTITION DU PRIX</div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11.5, marginBottom:5 }}><span style={{ color:"#5c5848" }}>Prix de vente</span><span style={{ fontFamily:"'JetBrains Mono'" }}>{price.toFixed(2)} CHF</span></div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11.5, marginBottom:5 }}><span style={{ color:"#5c5848" }}>Commission (6%)</span><span style={{ fontFamily:"'JetBrains Mono'", color:"#E2462B" }}>− {commission} CHF</span></div>
          <div style={{ height:1, background:"#D9D2C2", margin:"8px 0" }} />
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, fontWeight:700 }}><span>Vous recevez</span><span style={{ fontFamily:"'JetBrains Mono'", color:"#7C8B6F" }}>{net} CHF</span></div>
        </div>
        <button onClick={publish} style={{ width:"100%", padding:13, background:"#E2462B", color:"#fff", border:"none", borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer" }}>Publier l'annonce</button>
      </div>
    </div>
  );
}

// ── MESSAGES ──
function MessagesScreen() {
  const [activeConvo, setActiveConvo] = useState(null);
  const [messages, setMessages] = useState({
    0:[{ from:"them", text:"Bonjour, l'article est-il toujours dispo ?", time:"10:32" }],
    1:[{ from:"them", text:"Parfait, je confirme l'envoi demain.", time:"09:15" },{ from:"me", text:"Super merci !", time:"09:18" }],
  });
  const [newMsg, setNewMsg] = useState("");

  const convos = [
    { id:0, seller:"marc.lsn", listing:"Veste en jean vintage", unread:true },
    { id:1, seller:"elsa.gva", listing:"Bottines en cuir", unread:false },
  ];

  const send = () => {
    if (!newMsg.trim()) return;
    setMessages(m=>({ ...m, [activeConvo]:[...(m[activeConvo]||[]), { from:"me", text:newMsg, time:"maintenant" }] }));
    setNewMsg("");
  };

  if (activeConvo !== null) {
    const convo = convos[activeConvo];
    const msgs = messages[activeConvo] || [];
    return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column", background:"#F7F4EC" }}>
        <div style={{ background:"#1C1A16", padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
          <div onClick={()=>setActiveConvo(null)} style={{ color:"rgba(255,255,255,.6)", cursor:"pointer", fontSize:18 }}>←</div>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"#7C8B6F" }} />
          <div>
            <div style={{ color:"#F7F4EC", fontWeight:700, fontSize:13 }}>@{convo.seller}</div>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"rgba(255,255,255,.4)" }}>{convo.listing}</div>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
          {msgs.map((m,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:m.from==="me"?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"75%", background:m.from==="me"?"#E2462B":"#fff", color:m.from==="me"?"#fff":"#1C1A16", borderRadius:12, padding:"9px 13px", fontSize:13, border:"1px solid #D9D2C2" }}>
                <div>{m.text}</div>
                <div style={{ fontSize:9, color:m.from==="me"?"rgba(255,255,255,.6)":"#A39C89", marginTop:4, fontFamily:"'JetBrains Mono'" }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding:"10px 14px", background:"#fff", borderTop:"1px solid #D9D2C2", display:"flex", gap:8 }}>
          <input value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Écrire un message…" style={{ flex:1, border:"1.5px solid #D9D2C2", borderRadius:20, padding:"9px 14px", fontSize:13, fontFamily:"Manrope" }} />
          <button onClick={send} style={{ background:"#E2462B", border:"none", borderRadius:20, color:"#fff", padding:"9px 16px", fontWeight:700, cursor:"pointer" }}>↑</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height:"100%", overflowY:"auto", background:"#F7F4EC" }}>
      <div style={{ padding:"16px 18px 10px", fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:17 }}>Messages</div>
      {convos.map(c=>(
        <div key={c.id} onClick={()=>setActiveConvo(c.id)} style={{ display:"flex", gap:10, padding:"12px 18px", borderBottom:"1px solid #D9D2C2", alignItems:"center", cursor:"pointer" }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:"#7C8B6F", flexShrink:0 }} />
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontWeight:700, fontSize:12.5 }}>@{c.seller}</span>
              {c.unread && <span style={{ width:8, height:8, borderRadius:"50%", background:"#E2462B", display:"inline-block" }} />}
            </div>
            <div style={{ fontSize:10, color:"#8a8473", marginBottom:2 }}>{c.listing}</div>
            <div style={{ fontSize:11, color:"#5c5848" }}>{(messages[c.id]||[]).slice(-1)[0]?.text||""}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── CHECKOUT ──
function CheckoutScreen({ item, onBack, onSuccess }) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("recommande");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [paying, setPaying] = useState(false);
  const fraisPort = mode==="recommande"?6.50:0;
  const total = item.price + fraisPort;
  const fmtCard = v=>v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const fmtExp  = v=>{ const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?d.slice(0,2)+"/"+d.slice(2):d; };
  const pay = () => { if(!cardNum||!expiry||!cvv) return; setPaying(true); setTimeout(()=>{ setPaying(false); setStep(3); },1800); };

  const iStyle = { width:"100%", padding:"10px 12px", border:"1.5px solid #D9D2C2", borderRadius:8, fontSize:14, fontFamily:"'JetBrains Mono'", marginBottom:12, boxSizing:"border-box" };

  if (step===3) return (
    <div style={{ height:"100%", overflowY:"auto", background:"#F7F4EC" }}>
      <div style={{ background:"#1C1A16", padding:"20px 18px", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:10 }}>✅</div>
        <Logo size={18} dark={true} />
        <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:20, color:"#F7F4EC", marginTop:8 }}>Paiement confirmé !</div>
      </div>
      <div style={{ padding:"20px 18px" }}>

        {/* Récapitulatif commande */}
        <div style={{ background:"#fff", borderRadius:12, padding:14, border:"1px solid #D9D2C2", marginBottom:14 }}>
          <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#E2462B", marginBottom:10 }}>RÉCAPITULATIF · REF #{Math.floor(Math.random()*90000+10000)}</div>
          <div style={{ display:"flex", gap:10, marginBottom:12, alignItems:"center" }}>
            <div style={{ width:44, height:44, borderRadius:8, background:"linear-gradient(160deg,#D7CDB8,#A99A78)", flexShrink:0 }} />
            <div><div style={{ fontWeight:700, fontSize:13 }}>{item.title}</div><div style={{ fontSize:11, color:"#8a8473" }}>@{item.seller} · {item.city}</div></div>
          </div>
          {[["Article", `${item.price.toFixed(2)} CHF`], fraisPort>0&&["Frais de port recommandé", `${fraisPort.toFixed(2)} CHF`]].filter(Boolean).map(([k,v])=>(
            <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4, color:"#5c5848" }}><span>{k}</span><span style={{ fontFamily:"'JetBrains Mono'" }}>{v}</span></div>
          ))}
          <div style={{ height:1, background:"#D9D2C2", margin:"8px 0" }} />
          <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:14 }}><span>Total payé</span><span style={{ fontFamily:"'JetBrains Mono'", color:"#E2462B" }}>{total.toFixed(2)} CHF</span></div>
        </div>

        {/* Email de confirmation simulé */}
        <div style={{ background:"#F0F7F0", border:"1px solid #7C8B6F", borderRadius:12, padding:14, marginBottom:14 }}>
          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
            <span style={{ fontSize:18 }}>📧</span>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#4a6040", fontWeight:700 }}>EMAIL DE CONFIRMATION ENVOYÉ</div>
          </div>
          <div style={{ fontSize:12, color:"#4a6040", lineHeight:1.6 }}>
            Un email de confirmation vient d'être envoyé à <b>{item.seller.replace(".lsn","")+"@email.ch"}</b> avec :
          </div>
          <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:4 }}>
            {["✓ Récapitulatif de votre commande","✓ Informations sur le vendeur","✓ Délai d'expédition (J+5 ouvrables)","✓ Procédure en cas de litige"].map(t=>(
              <div key={t} style={{ fontSize:11.5, color:"#4a6040" }}>{t}</div>
            ))}
          </div>
        </div>

        {/* Prochaines étapes */}
        <div style={{ background:"#fff", borderRadius:12, padding:14, border:"1px solid #D9D2C2", marginBottom:14 }}>
          <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", marginBottom:12 }}>PROCHAINES ÉTAPES</div>
          {[
            ["📦","Le vendeur expédie","Sous 5 jours ouvrables","En attente"],
            ["📬","Vous recevez le colis","Selon le mode choisi","À venir"],
            ["✅","Vous confirmez la réception","Dans les 48h","À venir"],
            ["💸","Fonds libérés au vendeur","Après confirmation","À venir"],
          ].map(([ic,title,sub,status])=>(
            <div key={title} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
              <span style={{ fontSize:20, flexShrink:0 }}>{ic}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:12 }}>{title}</div>
                <div style={{ fontSize:10.5, color:"#8a8473" }}>{sub}</div>
              </div>
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:status==="En attente"?"#F5C518":"#D9D2C2", background:status==="En attente"?"#FFF8E0":"#F7F4EC", padding:"3px 8px", borderRadius:10 }}>{status}</div>
            </div>
          ))}
        </div>

        {/* Notification SAV */}
        <div style={{ background:"#FFF3E0", border:"1px solid #F5C518", borderRadius:12, padding:12, marginBottom:16 }}>
          <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8B6E00", marginBottom:6 }}>SERVICE APRÈS-VENTE</div>
          <div style={{ fontSize:11.5, color:"#8B6E00", lineHeight:1.6 }}>En cas de problème, vous recevrez des emails à chaque étape. Vous pouvez aussi ouvrir un litige directement depuis le suivi de commande si quelque chose ne va pas.</div>
        </div>

        <Btn variant="primary" onClick={onBack} style={{ width:"100%" }}>Retour au fil</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ height:"100%", overflowY:"auto", background:"#F7F4EC" }}>
      <div style={{ background:"#1C1A16", padding:"14px 18px 16px" }}>
        <div onClick={onBack} style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.5)", cursor:"pointer", marginBottom:8 }}>← Annuler</div>
        <Logo size={15} dark={true} />
        <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:16, color:"#F7F4EC", marginTop:6 }}>Paiement sécurisé</div>
        <div style={{ display:"flex", gap:6, marginTop:12 }}>
          {["Livraison","Paiement"].map((s,i)=><div key={s} style={{ flex:1, height:3, borderRadius:3, background:step>i+1?"#7C8B6F":step===i+1?"#F5C518":"rgba(255,255,255,.2)", transition:"background .3s" }} />)}
        </div>
      </div>
      <div style={{ padding:"16px 18px" }}>
        <div style={{ display:"flex", gap:10, background:"#fff", borderRadius:10, padding:10, border:"1px solid #D9D2C2", marginBottom:16 }}>
          <div style={{ width:48, height:48, borderRadius:8, background:"linear-gradient(160deg,#D7CDB8,#A99A78)", flexShrink:0 }} />
          <div><div style={{ fontWeight:700, fontSize:12.5 }}>{item.title}</div><div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, color:"#E2462B", fontSize:15 }}>{item.price}.- CHF</div></div>
        </div>
        {step===1 && <>
          {[["recommande","📦 Recommandé","+ 6.50 CHF","Garanti avec numéro de suivi ✅"],["simple","📬 Envoi simple","Gratuit","Sans suivi — non remboursable si perte ⚠️"],["main_propre","🤝 Main propre","Gratuit","Rendez-vous avec le vendeur"]].map(([k,label,prix,desc])=>(
            <div key={k} onClick={()=>setMode(k)} style={{ border:`1.5px solid ${mode===k?"#1C1A16":"#D9D2C2"}`, borderRadius:10, padding:"10px 12px", marginBottom:8, cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}><span style={{ fontWeight:700, fontSize:12.5 }}>{label}</span><span style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:k==="recommande"?"#E2462B":"#7C8B6F" }}>{prix}</span></div>
              <div style={{ fontSize:10.5, color:"#8a8473" }}>{desc}</div>
            </div>
          ))}
          {mode==="simple" && (
            <div style={{ background:"#FFF3E0", border:"1px solid #F5C518", borderRadius:8, padding:10, marginBottom:12 }}>
              <div style={{ display:"flex", gap:8 }}>
                <input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} />
                <div style={{ fontSize:10.5, color:"#8B6E00" }}>J'accepte qu'en cas de perte, ni le vendeur ni Swip'n Style ne soient responsables.</div>
              </div>
            </div>
          )}
          <div style={{ border:"1px solid #D9D2C2", borderRadius:10, padding:12, marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}><span>Article</span><span style={{ fontFamily:"'JetBrains Mono'" }}>{item.price.toFixed(2)} CHF</span></div>
            {fraisPort>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}><span>Frais de port</span><span style={{ fontFamily:"'JetBrains Mono'" }}>{fraisPort.toFixed(2)} CHF</span></div>}
            <div style={{ height:1, background:"#D9D2C2", margin:"8px 0" }} />
            <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700 }}><span>Total</span><span style={{ fontFamily:"'JetBrains Mono'", color:"#E2462B" }}>{total.toFixed(2)} CHF</span></div>
          </div>
          <button onClick={()=>{ if(mode==="simple"&&!accepted) return; setStep(2); }} style={{ width:"100%", padding:13, background:"#1C1A16", color:"#F7F4EC", border:"none", borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer" }}>Continuer → Paiement</button>
        </>}
        {step===2 && <>
          <div style={{ background:"linear-gradient(135deg,#1C1A16,#3a3630)", borderRadius:14, padding:"20px 18px", marginBottom:16, color:"#F7F4EC" }}>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:"rgba(255,255,255,.5)", marginBottom:18 }}>Swip'n Style · Paiement sécurisé</div>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:16, letterSpacing:3, marginBottom:14 }}>{cardNum||"•••• •••• •••• ••••"}</div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div><div style={{ fontSize:9, color:"rgba(255,255,255,.4)" }}>EXPIRATION</div><div style={{ fontFamily:"'JetBrains Mono'", fontSize:13 }}>{expiry||"MM/AA"}</div></div>
              <div><div style={{ fontSize:9, color:"rgba(255,255,255,.4)" }}>CVV</div><div style={{ fontFamily:"'JetBrains Mono'", fontSize:13 }}>•••</div></div>
              <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:20, color:"#F5C518", alignSelf:"flex-end" }}>VISA</div>
            </div>
          </div>
          <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>N° DE CARTE</label>
          <input value={cardNum} onChange={e=>setCardNum(fmtCard(e.target.value))} placeholder="1234 5678 9012 3456" style={iStyle} />
          <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>EXPIRATION</label>
          <input value={expiry} onChange={e=>setExpiry(fmtExp(e.target.value))} placeholder="MM/AA" style={iStyle} />
          <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", display:"block", marginBottom:4 }}>CVV</label>
          <input value={cvv} onChange={e=>setCvv(e.target.value.replace(/\D/g,"").slice(0,3))} placeholder="•••" style={iStyle} />
          <div style={{ background:"#F0F7F0", border:"1px solid #7C8B6F", borderRadius:8, padding:"8px 12px", marginBottom:14, display:"flex", gap:8, alignItems:"center" }}>
            <span>🔒</span><div style={{ fontSize:10.5, color:"#4a6040" }}>Paiement chiffré SSL · Fonds en séquestre jusqu'à livraison</div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:14, marginBottom:14 }}><span>Total</span><span style={{ fontFamily:"'Fraunces',serif", color:"#E2462B" }}>{total.toFixed(2)} CHF</span></div>
          <button onClick={pay} style={{ width:"100%", padding:13, background:paying?"#8a8473":"#E2462B", color:"#fff", border:"none", borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer" }}>{paying?"Traitement…":`Payer ${total.toFixed(2)} CHF`}</button>
          <div onClick={()=>setStep(1)} style={{ textAlign:"center", fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", marginTop:12, cursor:"pointer" }}>← Modifier la livraison</div>
        </>}
      </div>
    </div>
  );
}

// ── LIVE ──
const LIVES = [
  { id:1, seller:"claire.lsn", title:"Vide-dressing — vestes & manteaux", viewers:142, tag:"FEMME", color:"linear-gradient(160deg,#C9A87C,#8B6E4E)" },
  { id:2, seller:"noah.ch",    title:"Solderie pulls & hoodies homme",    viewers:87,  tag:"HOMME", color:"linear-gradient(160deg,#7C8B6F,#4E5E44)" },
  { id:3, seller:"elsa.gva",   title:"Collection chaussures printemps",  viewers:213, tag:"FEMME", color:"linear-gradient(160deg,#C9B87C,#9E8A4E)" },
];
function LiveScreen({ onBack }) {
  const [active, setActive] = useState(null);
  if (active!==null) {
    const live = LIVES[active];
    return (
      <div style={{ height:"100%", position:"relative", background:"#000", color:"#fff", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:live.color, opacity:.85 }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(0,0,0,.5) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 55%,rgba(0,0,0,.8) 100%)" }} />
        <div style={{ position:"absolute", top:0, left:0, right:0, zIndex:3, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px" }}>
          <div onClick={()=>setActive(null)} style={{ width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>←</div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#E2462B" }} />
            <span style={{ fontFamily:"'JetBrains Mono'", fontSize:10, background:"#E2462B", padding:"3px 8px", borderRadius:4 }}>EN DIRECT</span>
          </div>
          <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10 }}>👁 {live.viewers}</div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:3, background:"rgba(28,26,22,.95)", padding:"12px 16px 16px", borderTopLeftRadius:16, borderTopRightRadius:16 }}>
          <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"#E2462B", marginBottom:4 }}>ARTICLE EN COURS</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div><div style={{ fontWeight:700, fontSize:13, color:"#F7F4EC" }}>{live.title}</div><div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:20, color:"#F5C518" }}>45.- CHF</div></div>
            <button style={{ background:"#E2462B", color:"#fff", border:"none", borderRadius:8, padding:"10px 16px", fontWeight:700, fontSize:12, cursor:"pointer" }}>Acheter</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ height:"100%", overflowY:"auto", background:"#F7F4EC" }}>
      <div style={{ padding:"16px 18px 6px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div onClick={onBack} style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", cursor:"pointer", marginBottom:4 }}>← Retour</div>
          <div style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:17 }}>En direct 📡</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5, background:"#E2462B", color:"#fff", fontFamily:"'JetBrains Mono'", fontSize:9, padding:"4px 10px", borderRadius:20 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#fff" }} />{LIVES.length} LIVES
        </div>
      </div>
      <div style={{ padding:"10px 16px" }}>
        {LIVES.map((l,i)=>(
          <div key={l.id} onClick={()=>setActive(i)} style={{ marginBottom:14, borderRadius:14, overflow:"hidden", border:"1px solid #D9D2C2", cursor:"pointer" }}>
            <div style={{ height:110, background:l.color, position:"relative" }}>
              <div style={{ position:"absolute", top:10, left:10, display:"flex", gap:6 }}>
                <div style={{ display:"flex", alignItems:"center", gap:4, background:"#E2462B", color:"#fff", fontFamily:"'JetBrains Mono'", fontSize:9, padding:"3px 8px", borderRadius:4 }}>● LIVE</div>
                <div style={{ background:"rgba(0,0,0,.5)", color:"#fff", fontFamily:"'JetBrains Mono'", fontSize:9, padding:"3px 8px", borderRadius:4 }}>{l.tag}</div>
              </div>
              <div style={{ position:"absolute", bottom:10, right:10, background:"rgba(0,0,0,.55)", color:"#fff", fontFamily:"'JetBrains Mono'", fontSize:9, padding:"3px 8px", borderRadius:4 }}>👁 {l.viewers}</div>
            </div>
            <div style={{ background:"#fff", padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:"#7C8B6F", flexShrink:0 }} />
              <div><div style={{ fontWeight:700, fontSize:12 }}>@{l.seller}</div><div style={{ fontSize:11, color:"#5c5848" }}>{l.title}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PROFIL ──
function ProfileScreen({ user }) {
  const [legalScreen, setLegalScreen] = useState(null);
  const LEGAL = {
    cgu:{ title:"CGU", icon:"📋", sections:[{ h:"Objet", t:"Les présentes CGU régissent l'utilisation de Swip'n Style, marketplace C2C de vêtements en Suisse romande. L'inscription implique l'acceptation des présentes conditions." },{ h:"Commission", t:"Une commission de 6% est prélevée sur chaque vente. Elle est affichée avant publication." }]},
    cgv:{ title:"CGV", icon:"🛍️", sections:[{ h:"Formation de la vente", t:"La vente est conclue dès la confirmation du paiement." },{ h:"Obligations", t:"Le vendeur expédie sous 5 jours ouvrables et fournit une preuve d'envoi." }]},
    livraison:{ title:"Livraison & garanties", icon:"📦", sections:[{ h:"Recommandé ✅", t:"Suivi obligatoire. Remboursement si perte confirmée." },{ h:"Simple ⚠️", t:"Sans suivi. Aucune garantie en cas de perte. Consentement actif requis." },{ h:"Main propre 🤝", t:"Pas d'envoi. Commission prélevée sur la carte du vendeur à la confirmation." }]},
    confidentialite:{ title:"Protection des données", icon:"🔒", sections:[{ h:"nLPD suisse", t:"Vos données sont protégées conformément à la Loi fédérale sur la protection des données. Documents d'identité traités par prestataire KYC certifié — jamais stockés chez nous." },{ h:"Vos droits", t:"Accès, rectification, suppression de vos données sur simple demande." }]},
    contrefacon:{ title:"Contrefaçon & marques", icon:"⚖️", sections:[{ h:"Interdiction", t:"Toute vente d'articles contrefaisants est strictement interdite (LPM, LDA). Sanction immédiate et signalement aux autorités." },{ h:"Signalement", t:"Bouton de signalement disponible sur chaque annonce." }]},
  };

  if (legalScreen) {
    const doc = LEGAL[legalScreen];
    return (
      <div style={{ height:"100%", overflowY:"auto", background:"#F7F4EC" }}>
        <div style={{ background:"#1C1A16", padding:"16px 18px 20px" }}>
          <div onClick={()=>setLegalScreen(null)} style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.5)", cursor:"pointer", marginBottom:10 }}>← Retour</div>
          <div style={{ fontSize:24, marginBottom:8 }}>{doc.icon}</div>
          <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:17, color:"#F7F4EC" }}>{doc.title}</div>
        </div>
        <div style={{ padding:"18px 18px 30px" }}>
          {doc.sections.map((s,i)=>(
            <div key={i} style={{ marginBottom:18, paddingBottom:18, borderBottom:i<doc.sections.length-1?"1px dashed #D9D2C2":"none" }}>
              <div style={{ fontWeight:700, fontSize:12.5, marginBottom:6 }}>{s.h}</div>
              <div style={{ fontSize:12, color:"#5c5848", lineHeight:1.65 }}>{s.t}</div>
            </div>
          ))}
          <div style={{ background:"#FFF3E0", border:"1px solid #F5C518", borderRadius:8, padding:12, marginTop:8 }}>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9.5, color:"#8B6E00" }}>⚠️ Document de travail — à valider par un avocat suisse avant mise en ligne officielle.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height:"100%", overflowY:"auto", background:"#F7F4EC" }}>
      <div style={{ background:"#1C1A16", color:"#F7F4EC", padding:"28px 18px 20px", textAlign:"center" }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:"#7C8B6F", margin:"0 auto 10px", border:"3px solid #F7F4EC", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>
          {user?.prenom?.[0]?.toUpperCase() || "👤"}
        </div>
        <div style={{ fontFamily:"'Fraunces',serif", fontWeight:600, fontSize:18 }}>{user?.prenom && user?.nom ? `${user.prenom} ${user.nom}` : user?.name || "Mon profil"}</div>
        <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"#7C8B6F", marginTop:4 }}>✓ Identité vérifiée</div>
        <div style={{ marginTop:8 }}><Logo size={13} dark={true} /></div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-around", padding:"16px 10px", borderBottom:"1px solid #D9D2C2" }}>
        {[["0","VENTES"],["0","ACHATS"],["0.00","GAINS CHF"]].map(([v,l])=>(
          <div key={l} style={{ textAlign:"center" }}><b style={{ display:"block", fontFamily:"'Fraunces',serif", fontSize:17 }}>{v}</b><span style={{ fontSize:9.5, color:"#8a8473", fontFamily:"'JetBrains Mono'" }}>{l}</span></div>
        ))}
      </div>
      <div style={{ margin:"14px 16px", border:"1.5px dashed #E2462B", borderRadius:10, padding:12 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#E2462B", fontFamily:"'JetBrains Mono'", marginBottom:6 }}>PROGRAMME FIDÉLITÉ</div>
        <div style={{ height:6, background:"#D9D2C2", borderRadius:4, overflow:"hidden", marginBottom:6 }}><div style={{ height:"100%", width:"0%", background:"#E2462B" }} /></div>
        <div style={{ fontSize:10, color:"#5c5848" }}>0 commande sur 5 — encore 5 pour -15%</div>
      </div>
      {["Mes annonces","Mes commandes","Articles sauvegardés","Paramètres du compte"].map(m=>(
        <div key={m} style={{ display:"flex", justifyContent:"space-between", padding:"13px 18px", borderBottom:"1px solid #D9D2C2", fontSize:12.5 }}>{m}<span style={{ color:"#bbb" }}>›</span></div>
      ))}
      <div style={{ margin:"16px 16px 4px" }}>
        <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>Informations légales</div>
        {[["cgu","📋","CGU"],["cgv","🛍️","CGV"],["livraison","📦","Livraison & garanties"],["confidentialite","🔒","Protection des données"],["contrefacon","⚖️","Contrefaçon & marques"]].map(([key,icon,label])=>(
          <div key={key} onClick={()=>setLegalScreen(key)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", borderRadius:10, background:"#fff", border:"1px solid #D9D2C2", marginBottom:8, cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}><span style={{ fontSize:16 }}>{icon}</span><span style={{ fontSize:12, fontWeight:600 }}>{label}</span></div>
            <span style={{ color:"#bbb" }}>›</span>
          </div>
        ))}
        <div style={{ fontSize:9.5, color:"#A39C89", fontFamily:"'JetBrains Mono'", textAlign:"center", marginTop:12 }}>Documents soumis au droit suisse · Canton de Vaud</div>
      </div>
    </div>
  );
}

// ── ADMIN ──
const ADMIN_TX = [
  { id:"#4821", article:"Veste en jean vintage", acheteur:"marc.lsn", vendeur:"claire.lsn", prix:45, commission:2.70, statut:"livree", date:"29.06.2026" },
  { id:"#4820", article:"Bottines en cuir",      acheteur:"noah.ch",  vendeur:"elsa.gva",   prix:60, commission:3.60, statut:"expediee", date:"28.06.2026" },
  { id:"#4819", article:"Pull col rond beige",   acheteur:"sophie_vd",vendeur:"noah.ch",    prix:20, commission:1.20, statut:"en_attente", date:"28.06.2026" },
];
const STATUT_COLORS = { livree:"#7C8B6F", expediee:"#F5C518", en_attente:"#A39C89", litige:"#E2462B" };
const STATUT_LABELS = { livree:"Livrée ✓", expediee:"Expédiée", en_attente:"En attente", litige:"Litige ⚠️" };

function AdminDashboard({ onBack }) {
  const [tab, setTab] = useState("overview");
  const totalRevenu = ADMIN_TX.reduce((s,t)=>s+t.prix,0);
  const totalComm   = ADMIN_TX.reduce((s,t)=>s+t.commission,0);
  return (
    <div style={{ height:"100%", overflowY:"auto", background:"#1C1A16", color:"#F7F4EC" }}>
      <div style={{ padding:"14px 18px 12px", borderBottom:"1px solid rgba(255,255,255,.1)" }}>
        <div onClick={onBack} style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.4)", cursor:"pointer", marginBottom:8 }}>← Quitter l'admin</div>
        <Logo size={16} dark={true} />
        <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"#E2462B", marginTop:3 }}>TABLEAU DE BORD ADMIN</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, padding:"14px 16px 0" }}>
        {[["💰","Revenu total",`${totalRevenu.toFixed(2)} CHF`,"#F5C518"],["📊","Commissions",`${totalComm.toFixed(2)} CHF`,"#E2462B"],["✅","Ventes",`${ADMIN_TX.filter(t=>t.statut==="livree").length}`,"#7C8B6F"],["⚠️","Litiges","0","#A39C89"]].map(([ic,label,val,color])=>(
          <div key={label} style={{ background:"rgba(255,255,255,.06)", borderRadius:12, padding:"12px 14px", border:"1px solid rgba(255,255,255,.08)" }}>
            <div style={{ fontSize:18, marginBottom:4 }}>{ic}</div>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"rgba(255,255,255,.45)", marginBottom:4 }}>{label.toUpperCase()}</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:18, color }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:0, margin:"14px 16px 0", background:"rgba(255,255,255,.06)", borderRadius:10, overflow:"hidden" }}>
        {[["overview","Transactions"],["litiges","Litiges"]].map(([k,l])=>(
          <div key={k} onClick={()=>setTab(k)} style={{ flex:1, textAlign:"center", padding:"8px 0", fontFamily:"'JetBrains Mono'", fontSize:10, cursor:"pointer", background:tab===k?"#E2462B":"transparent", color:tab===k?"#fff":"rgba(255,255,255,.45)" }}>{l}</div>
        ))}
      </div>
      <div style={{ padding:"10px 16px 20px" }}>
        {ADMIN_TX.filter(t=>tab==="litiges"?t.statut==="litige":true).map((t,i)=>(
          <div key={i} style={{ background:"rgba(255,255,255,.06)", borderRadius:10, padding:"10px 12px", marginBottom:8, border:"1px solid rgba(255,255,255,.08)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.4)" }}>{t.id} · {t.date}</span>
              <span style={{ fontFamily:"'JetBrains Mono'", fontSize:9, background:STATUT_COLORS[t.statut]+"22", color:STATUT_COLORS[t.statut], padding:"2px 8px", borderRadius:10 }}>{STATUT_LABELS[t.statut]}</span>
            </div>
            <div style={{ fontWeight:600, fontSize:12.5, marginBottom:2 }}>{t.article}</div>
            <div style={{ fontSize:10.5, color:"rgba(255,255,255,.45)", marginBottom:6 }}>@{t.acheteur} → @{t.vendeur}</div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:"rgba(255,255,255,.55)" }}>{t.prix.toFixed(2)} CHF</span>
              <span style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:"#E2462B", fontWeight:700 }}>+{t.commission.toFixed(2)} CHF</span>
            </div>
          </div>
        ))}
        {tab==="litiges" && <div style={{ textAlign:"center", color:"rgba(255,255,255,.3)", fontFamily:"'JetBrains Mono'", fontSize:11, marginTop:20 }}>Aucun litige en cours ✓</div>}
      </div>
    </div>
  );
}

// ── APP PRINCIPALE ──
export default function App() {
  const [auth, setAuth] = useState("splash");
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("feed");
  const [feedIndex, setFeedIndex] = useState(0);
  const [activeListing, setActiveListing] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const ADMIN_PIN = "1234";
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const longTimer = useRef(null);

  // Détection responsive
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const onLogoPress   = () => { longTimer.current = setTimeout(()=>{ setShowPin(true); setPin(""); setPinError(false); }, 1500); };
  const onLogoRelease = () => clearTimeout(longTimer.current);
  const addDigit = (d) => {
    const next = pin + d; setPin(next);
    if (next.length === 4) {
      if (next === ADMIN_PIN) { setShowPin(false); setPin(""); setScreen("admin"); }
      else { setPinError(true); setPin(""); setTimeout(()=>setPinError(false), 1200); }
    }
  };

  const openListing  = (item) => { setActiveListing(item); setScreen("detail"); };
  const openCheckout = (item) => { setActiveListing(item); setScreen("checkout"); };

  const GLOBAL_STYLE = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,700;9..144,1,700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #1C1A16; font-family: Manrope, sans-serif; }
    input, textarea { outline: none; font-family: Manrope, sans-serif; }
    input:focus, textarea:focus { border-color: #E2462B !important; }
    button { cursor: pointer; font-family: Manrope, sans-serif; }
    button:active { opacity: .8; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #D9D2C2; border-radius: 4px; }
  `;

  // ── PIN MODAL ──
  const PinModal = () => (
    <div style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(0,0,0,.88)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#1C1A16", borderRadius:20, padding:"28px 24px", width:240, textAlign:"center", border:"1px solid rgba(255,255,255,.1)" }}>
        <Logo size={18} dark={true} />
        <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"#E2462B", margin:"10px 0 22px" }}>ACCÈS RESTREINT</div>
        <div style={{ display:"flex", justifyContent:"center", gap:14, marginBottom:24 }}>
          {[0,1,2,3].map(i=><div key={i} style={{ width:13, height:13, borderRadius:"50%", background:pin.length>i?(pinError?"#E2462B":"#F5C518"):"rgba(255,255,255,.15)", transition:"background .15s" }} />)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:10 }}>
          {[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>addDigit(String(n))} style={{ background:"rgba(255,255,255,.09)", border:"none", borderRadius:10, height:46, color:"#F7F4EC", fontSize:19, fontWeight:700 }}>{n}</button>)}
          <button onClick={()=>{ setShowPin(false); setPin(""); }} style={{ background:"rgba(255,255,255,.04)", border:"none", borderRadius:10, height:46, color:"rgba(255,255,255,.35)", fontSize:11 }}>✕</button>
          <button onClick={()=>addDigit("0")} style={{ background:"rgba(255,255,255,.09)", border:"none", borderRadius:10, height:46, color:"#F7F4EC", fontSize:19, fontWeight:700 }}>0</button>
          <button onClick={()=>setPin(p=>p.slice(0,-1))} style={{ background:"rgba(255,255,255,.04)", border:"none", borderRadius:10, height:46, color:"rgba(255,255,255,.45)", fontSize:17 }}>⌫</button>
        </div>
        {pinError && <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#E2462B" }}>Code incorrect</div>}
      </div>
    </div>
  );

  // ── ÉCRANS AUTH (identiques mobile/desktop, centrés) ──
  if (auth === "splash" || auth === "login" || auth === "register") {
    return (
      <div style={{ minHeight:"100vh", background:"#1C1A16", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
        <style>{GLOBAL_STYLE}</style>
        <div style={{ width:"100%", maxWidth:440, borderRadius:isMobile?0:24, overflow:"hidden", boxShadow:"0 24px 48px rgba(0,0,0,.5)", minHeight:isMobile?"100vh":640, display:"flex", flexDirection:"column" }}>
          {auth==="splash"   && <SplashScreen onLogin={()=>setAuth("login")} onRegister={()=>setAuth("register")} />}
          {auth==="login"    && <LoginScreen onSuccess={u=>{setUser(u);setAuth("app");}} onRegister={()=>setAuth("register")} onBack={()=>setAuth("splash")} />}
          {auth==="register" && <RegisterScreen onSuccess={u=>{setUser(u);setAuth("app");}} onLogin={()=>setAuth("login")} onBack={()=>setAuth("splash")} />}
        </div>
        {showPin && <PinModal />}
      </div>
    );
  }

  // ── CONTENU PRINCIPAL ──
  let body;
  if      (screen==="feed")     body = <FeedScreen index={feedIndex} setIndex={setFeedIndex} onOpenListing={openListing} onNavigate={setScreen} />;
  else if (screen==="detail")   body = <ListingDetail item={activeListing} onBack={()=>setScreen("feed")} onBuy={()=>openCheckout(activeListing)} />;
  else if (screen==="checkout") body = <CheckoutScreen item={activeListing} onBack={()=>setScreen("detail")} onSuccess={()=>setScreen("feed")} />;
  else if (screen==="search")   body = <SearchScreen onOpenListing={openListing} />;
  else if (screen==="sell")     body = <SellScreen />;
  else if (screen==="messages") body = <MessagesScreen />;
  else if (screen==="profile")  body = <ProfileScreen user={user} />;
  else if (screen==="live")     body = <LiveScreen onBack={()=>setScreen("feed")} />;
  else if (screen==="admin")    body = <AdminDashboard onBack={()=>setScreen("profile")} />;

  // ── LAYOUT MOBILE ──
  if (isMobile) {
    return (
      <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:"#F7F4EC", overflow:"hidden" }}>
        <style>{GLOBAL_STYLE}</style>
        <div style={{ flex:1, overflow:"hidden", position:"relative" }}>{body}</div>
        {screen!=="admin" && <TabBar active={screen} onNavigate={setScreen} />}
        {showPin && <PinModal />}
      </div>
    );
  }

  // ── LAYOUT DESKTOP ──
  const NAV_ITEMS = [
    { key:"feed",     icon:"▭", label:"Fil" },
    { key:"search",   icon:"⌕", label:"Recherche" },
    { key:"live",     icon:"📡", label:"Live" },
    { key:"sell",     icon:"+", label:"Vendre" },
    { key:"messages", icon:"✉", label:"Messages" },
    { key:"profile",  icon:"○", label:"Mon profil" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#EDEAE0", display:"flex", flexDirection:"column" }}>
      <style>{GLOBAL_STYLE}</style>

      {/* ── TOPBAR DESKTOP ── */}
      <div style={{ height:64, background:"#1C1A16", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 32px", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 20px rgba(0,0,0,.4)" }}>
        {/* Logo cliquable */}
        <div onMouseDown={onLogoPress} onMouseUp={onLogoRelease} onMouseLeave={onLogoRelease} style={{ userSelect:"none", cursor:"default" }}>
          <Logo size={26} dark={true} />
        </div>

        {/* Nav centrale */}
        <div style={{ display:"flex", gap:4 }}>
          {NAV_ITEMS.filter(n=>!["live","sell"].includes(n.key)).map(n=>(
            <button key={n.key} onClick={()=>setScreen(n.key)} style={{ background:screen===n.key?"rgba(226,70,43,.15)":"transparent", border:"none", borderRadius:10, padding:"8px 16px", color:screen===n.key?"#E2462B":"rgba(255,255,255,.6)", fontWeight:screen===n.key?700:400, fontSize:13, display:"flex", alignItems:"center", gap:7, transition:"all .2s" }}>
              <span>{n.icon}</span>{n.label}
              {n.key==="messages" && <span style={{ background:"#E2462B", color:"#fff", borderRadius:"50%", width:16, height:16, fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'JetBrains Mono'" }}>1</span>}
            </button>
          ))}
        </div>

        {/* Actions droite */}
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <button onClick={()=>setScreen("live")} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(226,70,43,.2)", border:"1px solid #E2462B", borderRadius:20, padding:"6px 14px", color:"#E2462B", fontSize:12, fontWeight:700, fontFamily:"'JetBrains Mono'" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#E2462B", display:"inline-block" }} />LIVE
          </button>
          <button onClick={()=>setScreen("sell")} style={{ background:"#E2462B", border:"none", borderRadius:20, padding:"8px 18px", color:"#fff", fontSize:13, fontWeight:700 }}>+ Vendre</button>
          <div onClick={()=>setScreen("profile")} style={{ width:36, height:36, borderRadius:"50%", background:"#7C8B6F", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, border:"2px solid rgba(255,255,255,.2)" }}>
            {user?.prenom?.[0]?.toUpperCase()||"👤"}
          </div>
        </div>
      </div>

      {/* ── CONTENU DESKTOP ── */}
      <div style={{ flex:1, maxWidth:1280, margin:"0 auto", width:"100%", padding:"24px 24px", display:"grid", gridTemplateColumns: screen==="feed"?"1fr 380px":"1fr", gap:24 }}>

        {/* Colonne principale */}
        <div style={{ background:"#fff", borderRadius:20, overflow:"hidden", minHeight:"calc(100vh - 112px)", boxShadow:"0 4px 24px rgba(0,0,0,.08)", display:"flex", flexDirection:"column" }}>
          {body}
        </div>

        {/* Sidebar droite (seulement sur le feed) */}
        {screen==="feed" && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Profil rapide */}
            <div style={{ background:"#fff", borderRadius:20, padding:20, boxShadow:"0 4px 24px rgba(0,0,0,.08)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:"#7C8B6F", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:"#fff" }}>{user?.prenom?.[0]?.toUpperCase()||"👤"}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:14 }}>{user?.prenom&&user?.nom?`${user.prenom} ${user.nom}`:user?.name||"Mon profil"}</div>
                  <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"#7C8B6F" }}>✓ Identité vérifiée</div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, textAlign:"center" }}>
                {[["0","Ventes"],["0","Achats"],["0","Suivis"]].map(([v,l])=>(
                  <div key={l} style={{ background:"#F7F4EC", borderRadius:10, padding:"10px 6px" }}>
                    <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:18, color:"#E2462B" }}>{v}</div>
                    <div style={{ fontSize:10, color:"#8a8473", fontFamily:"'JetBrains Mono'" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fidélité */}
            <div style={{ background:"#fff", borderRadius:20, padding:20, boxShadow:"0 4px 24px rgba(0,0,0,.08)" }}>
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#E2462B", fontWeight:700, marginBottom:10 }}>PROGRAMME FIDÉLITÉ</div>
              <div style={{ height:6, background:"#D9D2C2", borderRadius:4, overflow:"hidden", marginBottom:8 }}><div style={{ height:"100%", width:"0%", background:"#E2462B" }} /></div>
              <div style={{ fontSize:11.5, color:"#5c5848" }}>0 commande sur 5 — encore 5 pour <b>-15%</b></div>
            </div>

            {/* Lives en cours */}
            <div style={{ background:"#fff", borderRadius:20, padding:20, boxShadow:"0 4px 24px rgba(0,0,0,.08)" }}>
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#E2462B", fontWeight:700, marginBottom:12 }}>LIVES EN COURS</div>
              {LIVES.map(l=>(
                <div key={l.id} onClick={()=>setScreen("live")} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, cursor:"pointer", padding:"8px 10px", borderRadius:10, background:"#F7F4EC" }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:l.color, position:"relative", flexShrink:0 }}>
                    <div style={{ position:"absolute", top:2, left:2, width:7, height:7, borderRadius:"50%", background:"#E2462B" }} />
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700 }}>@{l.seller}</div>
                    <div style={{ fontSize:10, color:"#8a8473" }}>👁 {l.viewers} · {l.tag}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Catégories */}
            <div style={{ background:"#fff", borderRadius:20, padding:20, boxShadow:"0 4px 24px rgba(0,0,0,.08)" }}>
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", fontWeight:700, marginBottom:12 }}>CATÉGORIES</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["👗 Femme","👔 Homme","👟 Chaussures","👜 Sacs","🧣 Accessoires"].map(c=>(
                  <div key={c} onClick={()=>setScreen("search")} style={{ background:"#F7F4EC", borderRadius:20, padding:"6px 12px", fontSize:12, cursor:"pointer", border:"1px solid #D9D2C2" }}>{c}</div>
                ))}
              </div>
            </div>

            {/* Footer légal */}
            <div style={{ fontSize:10, color:"#A39C89", fontFamily:"'JetBrains Mono'", lineHeight:1.8, padding:"0 4px" }}>
              <div onClick={()=>setScreen("profile")} style={{ cursor:"pointer" }}>CGU · CGV · Confidentialité</div>
              <div>© 2026 Swip'n Style · Suisse romande</div>
            </div>
          </div>
        )}
      </div>

      {showPin && <PinModal />}
    </div>
  );
}

