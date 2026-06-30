import React, { useState } from "react";

// ---------- Données de démonstration ----------
const LISTINGS = [
  { id: 1, title: "Veste en jean vintage", price: 45, seller: "claire.lsn", city: "Lausanne", tag: "FEMME · VESTE", desc: "Veste en jean style 90s, portée quelques fois, aucune tache ni accroc. Coupe oversize.", size: "M", state: "Bon état", category: "Femme", likes: 128, comments: 12, saves: 34, shares: 9 },
  { id: 2, title: "Pull col rond beige", price: 20, seller: "noah.ch", city: "Lausanne", tag: "HOMME · PULL", desc: "Pull en laine mélangée, taille M, très peu porté.", size: "M", state: "Comme neuf", category: "Homme", likes: 64, comments: 4, saves: 18, shares: 3 },
  { id: 3, title: "Bottines en cuir", price: 60, seller: "elsa.gva", city: "Genève", tag: "FEMME · CHAUSSURES", desc: "Bottines en cuir véritable, talon 3cm, taille 38.", size: "38", state: "Bon état", category: "Femme", likes: 210, comments: 21, saves: 80, shares: 15 },
];

// ---------- Logo ----------
function Logo({ size = 28, dark = false }) {
  return (
    <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: size, lineHeight: 1, userSelect: "none" }}>
      <span style={{ color: dark ? "#F7F4EC" : "#1C1A16" }}>Swip</span>
      <span style={{ color: "#E2462B", fontFamily: "'JetBrains Mono',monospace", fontSize: size * 0.5, position: "relative", top: "-0.1em" }}>'n</span>
      <span style={{ color: dark ? "#F5C518" : "#1C1A16" }}> Style</span>
    </span>
  );
}

// ---------- Écran Splash (accueil) ----------
function SplashScreen({ onLogin, onRegister }) {
  return (
    <div style={{ height:"100%", background:"#1C1A16", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"50px 24px 36px", position:"relative", overflow:"hidden" }}>
      {/* Cercle décoratif */}
      <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(226,70,43,.2) 0%, transparent 70%)", top:"20%", left:"50%", transform:"translateX(-50%)" }} />

      {/* Logo + tagline */}
      <div style={{ textAlign:"center", zIndex:1 }}>
        <div style={{ marginBottom:16 }}>
          <svg width="60" height="78" viewBox="0 0 80 100">
            <rect x="8" y="24" width="64" height="72" rx="6" fill="#F7F4EC"/>
            <circle cx="40" cy="20" r="8" fill="none" stroke="#D9D2C2" stroke-width="2.5"/>
            <line x1="40" y1="12" x2="40" y2="0" stroke="#D9D2C2" stroke-width="2" stroke-dasharray="3,2"/>
            <text x="40" y="68" text-anchor="middle" font-family="serif" font-weight="700" font-size="24" fill="#1C1A16">S</text>
            <text x="40" y="84" text-anchor="middle" font-family="monospace" font-size="9" fill="#E2462B" letter-spacing="1">'n S</text>
          </svg>
        </div>
        <Logo size={38} dark={true} />
        <div style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:"rgba(255,255,255,.4)", marginTop:10, letterSpacing:".1em" }}>MARKETPLACE · SUISSE ROMANDE</div>
      </div>

      {/* Illustration centrale */}
      <div style={{ zIndex:1, textAlign:"center" }}>
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:20 }}>
          {[["👗","Femme"],["👔","Homme"],["👟","Shoes"]].map(([ic, label]) => (
            <div key={label} style={{ background:"rgba(255,255,255,.07)", borderRadius:12, padding:"16px 14px", border:"1px solid rgba(255,255,255,.1)" }}>
              <div style={{ fontSize:28, marginBottom:6 }}>{ic}</div>
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"rgba(255,255,255,.45)" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:"'Fraunces',serif", fontSize:22, color:"#F7F4EC", fontWeight:700, lineHeight:1.3, marginBottom:8 }}>
          Donnez une seconde vie<br/>à votre dressing.
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,.45)", lineHeight:1.6 }}>
          Swipez, vendez, achetez — en toute sécurité.
        </div>
      </div>

      {/* Boutons */}
      <div style={{ width:"100%", zIndex:1, display:"flex", flexDirection:"column", gap:10 }}>
        <button onClick={onRegister} style={{ width:"100%", padding:"14px", background:"#E2462B", color:"#fff", border:"none", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"Manrope", cursor:"pointer" }}>
          Créer un compte
        </button>
        <button onClick={onLogin} style={{ width:"100%", padding:"14px", background:"transparent", color:"#F7F4EC", border:"1.5px solid rgba(255,255,255,.25)", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"Manrope", cursor:"pointer" }}>
          Se connecter
        </button>
        <div style={{ textAlign:"center", fontFamily:"'JetBrains Mono'", fontSize:9, color:"rgba(255,255,255,.25)", marginTop:4 }}>
          En continuant, vous acceptez nos CGU & CGV
        </div>
      </div>
    </div>
  );
}

// ---------- Écran Connexion ----------
function LoginScreen({ onSuccess, onRegister, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (!email || !password) { setError("Veuillez remplir tous les champs."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess({ email, name: email.split("@")[0] }); }, 1200);
  };

  return (
    <div style={{ height:"100%", background:"#F7F4EC", overflowY:"auto" }}>
      <div style={{ background:"#1C1A16", padding:"28px 20px 24px", textAlign:"center" }}>
        <div onClick={onBack} style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.4)", cursor:"pointer", textAlign:"left", marginBottom:16 }}>← Retour</div>
        <Logo size={22} dark={true} />
        <div style={{ fontFamily:"'Fraunces',serif", fontSize:20, color:"#F7F4EC", fontWeight:700, marginTop:10 }}>Bon retour 👋</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,.45)", marginTop:4 }}>Connectez-vous à votre compte</div>
      </div>

      <div style={{ padding:"24px 20px" }}>
        {[["Email", email, setEmail, "email", "claire@email.ch"],
          ["Mot de passe", password, setPassword, "password", "••••••••"]
        ].map(([label, val, setter, type, ph]) => (
          <FormInput key={label} label={label} value={val} onChange={v => { setter(v); setError(""); }} type={type} placeholder={ph} />
        ))}

        {error && <div style={{ color:"#E2462B", fontSize:12, marginBottom:12, fontFamily:"'JetBrains Mono'" }}>{error}</div>}

        <div style={{ textAlign:"right", marginBottom:20 }}>
          <span style={{ fontSize:12, color:"#E2462B", cursor:"pointer", fontFamily:"'JetBrains Mono'" }}>Mot de passe oublié ?</span>
        </div>

        <button onClick={login} style={{ width:"100%", padding:"14px", background: loading ? "#8a8473" : "#1C1A16", color:"#F7F4EC", border:"none", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"Manrope", cursor:"pointer" }}>
          {loading ? "Connexion…" : "Se connecter"}
        </button>

        <div style={{ textAlign:"center", marginTop:20, fontSize:12.5, color:"#8a8473" }}>
          Pas encore de compte ?{" "}
          <span onClick={onRegister} style={{ color:"#E2462B", fontWeight:700, cursor:"pointer" }}>Créer un compte</span>
        </div>
      </div>
    </div>
  );
}

// ---------- Input réutilisable (défini hors des composants pour éviter le bug de focus) ----------
function FormInput({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#8a8473", display: "block", marginBottom: 4 }}>
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", padding: "11px 13px", border: "1.5px solid #D9D2C2", borderRadius: 10, fontSize: 13.5, fontFamily: "Manrope", background: "#fff" }}
      />
    </div>
  );
}

// ---------- Écran Inscription ----------
function RegisterScreen({ onSuccess, onLogin, onBack }) {
  const [step, setStep] = useState(1); // 1=infos 2=sécurité 3=CGU 4=KYC
  const [form, setForm] = useState({ prenom:"", nom:"", email:"", tel:"", password:"", confirm:"" });
  const [cguAccepted, setCguAccepted] = useState(false);
  const [cgvAccepted, setCgvAccepted] = useState(false);
  const [confidAccepted, setConfidAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [error, setError] = useState("");
  const [kycLoading, setKycLoading] = useState(false);
  const [kycDone, setKycDone] = useState(false);

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError(""); };

  const nextStep = () => {
    if (step === 1) {
      if (!form.prenom || !form.nom || !form.email || !form.tel) { setError("Tous les champs sont obligatoires."); return; }
      if (!form.email.includes("@")) { setError("Email invalide."); return; }
    }
    if (step === 2) {
      if (!form.password || form.password.length < 8) { setError("Mot de passe trop court (8 caractères min)."); return; }
      if (form.password !== form.confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    }
    if (step === 3) {
      if (!cguAccepted || !cgvAccepted || !confidAccepted) { setError("Vous devez accepter les conditions obligatoires."); return; }
    }
    setError("");
    setStep(s => s + 1);
  };

  const simulateKYC = () => {
    setKycLoading(true);
    setTimeout(() => { setKycLoading(false); setKycDone(true); }, 2000);
  };

  const Input = ({ label, k, type="text", ph }) => (
    <FormInput label={label} value={form[k]} onChange={v => update(k, v)} type={type} placeholder={ph} />
  );

  const CheckRow = ({ checked, onChange, children, required }) => (
    <div style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:12, padding:"10px 12px", background: checked ? "#F0F7F0" : "#fff", border:`1.5px solid ${checked ? "#7C8B6F" : "#D9D2C2"}`, borderRadius:10 }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ marginTop:2, accentColor:"#E2462B", width:16, height:16, flexShrink:0 }} />
      <div style={{ fontSize:11.5, color:"#5c5848", lineHeight:1.5 }}>
        {children}
        {required && <span style={{ color:"#E2462B", fontFamily:"'JetBrains Mono'", fontSize:9, marginLeft:6 }}>OBLIGATOIRE</span>}
      </div>
    </div>
  );

  const steps = ["Infos", "Sécurité", "CGU", "Identité"];

  return (
    <div style={{ height:"100%", background:"#F7F4EC", overflowY:"auto" }}>
      <div style={{ background:"#1C1A16", padding:"20px 20px 18px" }}>
        <div onClick={onBack} style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.4)", cursor:"pointer", marginBottom:12 }}>← Retour</div>
        <Logo size={18} dark={true} />
        <div style={{ fontFamily:"'Fraunces',serif", fontSize:18, color:"#F7F4EC", fontWeight:700, marginTop:8 }}>Créer un compte</div>
        {/* Barre de progression */}
        <div style={{ display:"flex", gap:6, marginTop:14 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <div style={{ height:3, width:"100%", borderRadius:3, background: step > i+1 ? "#7C8B6F" : step === i+1 ? "#F5C518" : "rgba(255,255,255,.2)", transition:"background .3s" }} />
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:8, color: step === i+1 ? "#F5C518" : "rgba(255,255,255,.3)" }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"20px 20px 30px" }}>

        {/* Étape 1 — Informations personnelles */}
        {step === 1 && (
          <>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:15, fontWeight:700, marginBottom:16 }}>Vos informations</div>
            <div style={{ display:"flex", gap:10 }}>
              <div style={{ flex:1 }}><Input label="Prénom" k="prenom" ph="Claire" /></div>
              <div style={{ flex:1 }}><Input label="Nom" k="nom" ph="Moreau" /></div>
            </div>
            <Input label="Email" k="email" type="email" ph="claire@email.ch" />
            <Input label="Téléphone" k="tel" type="tel" ph="+41 79 000 00 00" />
            <div style={{ background:"#FFF3E0", border:"1px solid #F5C518", borderRadius:8, padding:"8px 12px", marginBottom:16, fontSize:11, color:"#8B6E00" }}>
              🔒 Vos données sont protégées conformément à la nLPD suisse.
            </div>
          </>
        )}

        {/* Étape 2 — Mot de passe */}
        {step === 2 && (
          <>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:15, fontWeight:700, marginBottom:16 }}>Sécurité du compte</div>
            <Input label="Mot de passe" k="password" type="password" ph="8 caractères minimum" />
            <Input label="Confirmer le mot de passe" k="confirm" type="password" ph="Répétez le mot de passe" />
            <div style={{ background:"#F0F7F0", border:"1px solid #7C8B6F", borderRadius:8, padding:"8px 12px", marginBottom:16 }}>
              {["8 caractères minimum","Une majuscule","Un chiffre"].map((r, i) => (
                <div key={i} style={{ fontSize:11, color:"#4a6040", marginBottom:3 }}>
                  <span style={{ marginRight:6 }}>{form.password.length >= (i===0?8:1) ? "✓" : "○"}</span>{r}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Étape 3 — CGU / CGV */}
        {step === 3 && (
          <>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:15, fontWeight:700, marginBottom:16 }}>Conditions & confidentialité</div>
            <CheckRow checked={cguAccepted} onChange={setCguAccepted} required>
              J'ai lu et j'accepte les <b>Conditions Générales d'Utilisation</b> de Swip'n Style.
            </CheckRow>
            <CheckRow checked={cgvAccepted} onChange={setCgvAccepted} required>
              J'accepte les <b>Conditions Générales de Vente</b>, incluant les règles sur les modes de livraison et les garanties.
            </CheckRow>
            <CheckRow checked={confidAccepted} onChange={setConfidAccepted} required>
              J'ai pris connaissance de la <b>Politique de Confidentialité</b> (traitement des données, nLPD suisse).
            </CheckRow>
            <CheckRow checked={marketingAccepted} onChange={setMarketingAccepted}>
              J'accepte de recevoir les offres et actualités Swip'n Style par email. <span style={{ color:"#A39C89" }}>(facultatif)</span>
            </CheckRow>
            <div style={{ fontSize:10, color:"#A39C89", fontFamily:"'JetBrains Mono'", textAlign:"center", marginTop:8 }}>
              Votre acceptation est horodatée et conservée conformément à la loi.
            </div>
          </>
        )}

        {/* Étape 4 — Vérification d'identité KYC */}
        {step === 4 && (
          <>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:15, fontWeight:700, marginBottom:8 }}>Vérification d'identité</div>
            <div style={{ fontSize:12, color:"#5c5848", lineHeight:1.6, marginBottom:20 }}>
              Conformément à nos CGU, une vérification d'identité est obligatoire pour utiliser Swip'n Style. Vos documents sont traités par un prestataire KYC certifié — nous ne les stockons jamais.
            </div>

            {!kycDone ? (
              <>
                <div style={{ border:"1.5px dashed #D9D2C2", borderRadius:12, padding:20, textAlign:"center", marginBottom:16 }}>
                  <div style={{ fontSize:40, marginBottom:10 }}>🪪</div>
                  <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>Carte d'identité ou Passeport</div>
                  <div style={{ fontSize:11.5, color:"#8a8473", marginBottom:14 }}>Prenez une photo de votre document et un selfie pour confirmer votre identité.</div>
                  <button onClick={simulateKYC} disabled={kycLoading}
                    style={{ background:"#1C1A16", color:"#F7F4EC", border:"none", borderRadius:10, padding:"11px 24px", fontSize:13, fontWeight:700, cursor:"pointer", opacity: kycLoading ? 0.6 : 1 }}>
                    {kycLoading ? "Vérification en cours…" : "📷 Lancer la vérification"}
                  </button>
                </div>
                <div style={{ fontSize:10, color:"#A39C89", fontFamily:"'JetBrains Mono'", textAlign:"center" }}>
                  La vérification prend environ 1 minute.
                </div>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:50, marginBottom:12 }}>✅</div>
                <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:18, marginBottom:8 }}>Identité vérifiée !</div>
                <div style={{ fontSize:12, color:"#5c5848", marginBottom:24 }}>Votre compte est activé. Bienvenue sur Swip'n Style !</div>
                <button onClick={() => onSuccess(form)}
                  style={{ background:"#E2462B", color:"#fff", border:"none", borderRadius:12, padding:"13px 32px", fontSize:14, fontWeight:700, cursor:"pointer" }}>
                  Accéder à l'app →
                </button>
              </div>
            )}
          </>
        )}

        {error && <div style={{ color:"#E2462B", fontSize:11.5, marginBottom:12, fontFamily:"'JetBrains Mono'" }}>⚠️ {error}</div>}

        {step < 4 && (
          <button onClick={nextStep}
            style={{ width:"100%", padding:"13px", background:"#1C1A16", color:"#F7F4EC", border:"none", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"Manrope", cursor:"pointer", marginTop:8 }}>
            Continuer →
          </button>
        )}

        {step === 1 && (
          <div style={{ textAlign:"center", marginTop:16, fontSize:12.5, color:"#8a8473" }}>
            Déjà un compte ?{" "}
            <span onClick={onLogin} style={{ color:"#E2462B", fontWeight:700, cursor:"pointer" }}>Se connecter</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Composants utilitaires ----------
function StatusBar({ dark }) {
  return (
    <div style={{ height: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: dark ? "#fff" : "#1C1A16" }}>
      <span>9:41</span><span>●●●</span>
    </div>
  );
}

function TabBar({ active, onNavigate }) {
  const tabs = [
    { key: "feed", label: "Fil", icon: "▭" },
    { key: "search", label: "Recherche", icon: "⌕" },
    { key: "sell", label: "Vendre", icon: "+" },
    { key: "messages", label: "Messages", icon: "✉" },
    { key: "profile", label: "Profil", icon: "○" },
  ];
  return (
    <div style={{ height: 56, background: "#fff", borderTop: "1px solid #D9D2C2", display: "flex", alignItems: "center", justifyContent: "space-around", fontFamily: "Manrope, sans-serif" }}>
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onNavigate(t.key)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            color: active === t.key ? "#E2462B" : "#A39C89",
            fontWeight: active === t.key ? 700 : 400, fontSize: 9,
          }}
        >
          <div style={{ width: 18, height: 18, border: `1.5px solid currentColor`, borderRadius: t.key === "sell" ? "50%" : 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{t.icon}</div>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Pill({ children }) {
  return <span style={{ border: "1px solid #D9D2C2", borderRadius: 20, padding: "4px 10px", fontSize: 10.5, fontFamily: "'JetBrains Mono'", color: "#6b6552" }}>{children}</span>;
}

function Btn({ children, variant = "primary", onClick, style }) {
  const base = { flex: 1, textAlign: "center", padding: 11, borderRadius: 8, fontSize: 12.5, fontWeight: 700, fontFamily: "Manrope", cursor: "pointer", border: "none" };
  const variants = {
    primary: { background: "#1C1A16", color: "#F7F4EC" },
    outline: { background: "transparent", border: "1.5px solid #1C1A16", color: "#1C1A16" },
  };
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>{children}</button>;
}

// ---------- État global partagé (likes, saves, follows, comments) ----------
const useInteractions = (initialItem) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [likes, setLikes] = useState(initialItem.likes);
  const [saves, setSaves] = useState(initialItem.saves);
  const [showToast, setShowToast] = useState(null);

  const toast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 1800);
  };

  const toggleLike = () => {
    setLiked(p => !p);
    setLikes(p => liked ? p - 1 : p + 1);
    if (!liked) toast("❤️ Ajouté aux coups de cœur");
  };
  const toggleSave = () => {
    setSaved(p => !p);
    setSaves(p => saved ? p - 1 : p + 1);
    if (!saved) toast("🔖 Annonce enregistrée");
  };
  const toggleFollow = () => {
    setFollowed(p => !p);
    toast(followed ? "Abonnement annulé" : "✅ Vous suivez ce vendeur");
  };
  const handleComment = (openComments) => openComments();
  const handleShare = () => toast("↗ Lien copié !");

  return { liked, saved, followed, likes, saves, showToast, toggleLike, toggleSave, toggleFollow, handleShare, handleComment };
};

// ---------- Toast ----------
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", zIndex: 99, background: "rgba(28,26,22,.92)", color: "#F7F4EC", fontFamily: "'JetBrains Mono'", fontSize: 11, padding: "8px 18px", borderRadius: 20, whiteSpace: "nowrap", pointerEvents: "none" }}>
      {msg}
    </div>
  );
}

// ---------- Panneau Commentaires ----------
function CommentsPanel({ item, onClose }) {
  const [text, setText] = useState("");
  const [list, setList] = useState([
    { user: "marc.lsn", msg: "Toujours disponible ?", time: "2min" },
    { user: "sophie_vd", msg: "Super qualité sur la photo !", time: "8min" },
    { user: "nico.ch", msg: "Vous faites des échanges ?", time: "22min" },
  ]);
  const send = () => {
    if (!text.trim()) return;
    setList(p => [{ user: "moi", msg: text, time: "à l'instant" }, ...p]);
    setText("");
  };
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ flex: 1, background: "rgba(0,0,0,.45)" }} />
      <div style={{ background: "#F7F4EC", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: "16px 16px 12px", maxHeight: "65%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 15 }}>Commentaires · {list.length}</div>
          <div onClick={onClose} style={{ fontSize: 18, cursor: "pointer", color: "#8a8473" }}>✕</div>
        </div>
        <div style={{ overflowY: "auto", maxHeight: 200, marginBottom: 12 }}>
          {list.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: c.user === "moi" ? "#E2462B" : "#7C8B6F", flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#1C1A16" }}>@{c.user} <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, color: "#A39C89", fontWeight: 400 }}>{c.time}</span></div>
                <div style={{ fontSize: 12, color: "#5c5848", marginTop: 2 }}>{c.msg}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Écrire un commentaire…" style={{ flex: 1, border: "1.5px solid #D9D2C2", borderRadius: 20, padding: "8px 14px", fontSize: 12, fontFamily: "Manrope", outline: "none" }} />
          <button onClick={send} style={{ background: "#E2462B", border: "none", borderRadius: 20, color: "#fff", padding: "8px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>↑</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Écrans ----------
function FeedScreen({ index, setIndex, onOpenListing, onNavigate }) {
  const item = LISTINGS[index % LISTINGS.length];
  const nextItem = LISTINGS[(index + 1) % LISTINGS.length];
  const prevItem = LISTINGS[(index - 1 + LISTINGS.length) % LISTINGS.length];

  const [followTab, setFollowTab] = useState("pourtoi");
  const [showComments, setShowComments] = useState(false);
  const { liked, saved, followed, likes, saves, showToast, toggleLike, toggleSave, toggleFollow, handleShare } = useInteractions(item);

  // --- Scroll TikTok ---
  const [dragY, setDragY] = useState(0);         // déplacement en cours
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(null); // "up" | "down"
  const startY = React.useRef(null);
  const containerRef = React.useRef(null);
  const THRESHOLD = 60; // px minimum pour déclencher le changement

  const goNext = () => {
    if (animating) return;
    setDirection("up");
    setAnimating(true);
    setTimeout(() => {
      setIndex(i => (i + 1) % LISTINGS.length);
      setDragY(0); setAnimating(false); setDirection(null);
    }, 420);
  };
  const goPrev = () => {
    if (animating) return;
    setDirection("down");
    setAnimating(true);
    setTimeout(() => {
      setIndex(i => (i - 1 + LISTINGS.length) % LISTINGS.length);
      setDragY(0); setAnimating(false); setDirection(null);
    }, 420);
  };
  const cancel = () => { setDragY(0); };

  // Touch
  const onTouchStart = (e) => { startY.current = e.touches[0].clientY; };
  const onTouchMove = (e) => {
    if (animating) return;
    const dy = e.touches[0].clientY - startY.current;
    setDragY(Math.max(-140, Math.min(140, dy)));
  };
  const onTouchEnd = () => {
    if (dragY < -THRESHOLD) goNext();
    else if (dragY > THRESHOLD) goPrev();
    else cancel();
  };

  // Wheel (desktop)
  const wheelAcc = React.useRef(0);
  const wheelTimer = React.useRef(null);
  const onWheel = (e) => {
    if (animating) return;
    wheelAcc.current += e.deltaY;
    clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => {
      if (wheelAcc.current > THRESHOLD) goNext();
      else if (wheelAcc.current < -THRESHOLD) goPrev();
      wheelAcc.current = 0;
    }, 80);
  };

  // Calcul des positions des slides
  const getSlideStyle = (offset) => {
    let base = offset * 100; // % vertical : 0 = courant, 100 = bas, -100 = haut
    let drag = (dragY / 660) * 100; // conversion px → %
    let translate = base + drag;
    if (animating) {
      if (direction === "up") translate = base - 100;
      if (direction === "down") translate = base + 100;
    }
    return {
      position: "absolute", inset: 0,
      transform: `translateY(${translate}%)`,
      transition: animating ? "transform 0.42s cubic-bezier(0.4,0,0.2,1)" : dragY !== 0 ? "none" : "transform 0.3s ease",
    };
  };

  const COLORS = [
    "linear-gradient(160deg,#D7CDB8,#9C8E6C)",
    "linear-gradient(160deg,#B8C9D7,#6C8A9C)",
    "linear-gradient(160deg,#C9D7B8,#7C9C6C)",
  ];

  const SlideContent = ({ listItem, colorIdx }) => (
    <>
      <div style={{ position: "absolute", inset: 0, background: COLORS[colorIdx % COLORS.length] }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 55%, rgba(0,0,0,.75) 100%)" }} />
    </>
  );

  return (
    <div
      ref={containerRef}
      style={{ height: "100%", position: "relative", background: "#15130F", color: "#fff", overflow: "hidden", touchAction: "none" }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide précédente */}
      <div style={getSlideStyle(-1)}>
        <SlideContent listItem={prevItem} colorIdx={index - 1} />
      </div>

      {/* Slide courante */}
      <div style={getSlideStyle(0)}>
        <SlideContent listItem={item} colorIdx={index} />

        {/* Topnav */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px 8px" }}>
          <div onClick={() => onNavigate("live")} style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'JetBrains Mono'", fontSize: 9, border: "1px solid rgba(255,255,255,.5)", borderRadius: 5, padding: "3px 6px", cursor: "pointer" }}>📡 Live</div>
          <div style={{ display: "flex", gap: 14, fontSize: 12.5 }}>
            <span onClick={() => setFollowTab("suivis")} style={{ color: followTab === "suivis" ? "#fff" : "rgba(255,255,255,.55)", fontWeight: followTab === "suivis" ? 700 : 400, borderBottom: followTab === "suivis" ? "2px solid #E2462B" : "none", paddingBottom: 6, cursor: "pointer" }}>Suivis</span>
            <span onClick={() => setFollowTab("pourtoi")} style={{ color: followTab === "pourtoi" ? "#fff" : "rgba(255,255,255,.55)", fontWeight: followTab === "pourtoi" ? 700 : 400, borderBottom: followTab === "pourtoi" ? "2px solid #E2462B" : "none", paddingBottom: 6, cursor: "pointer" }}>Pour toi</span>
          </div>
          <div onClick={() => onNavigate("search")} style={{ fontSize: 14, cursor: "pointer" }}>⌕</div>
        </div>

        <div style={{ position: "absolute", top: 46, left: 14, zIndex: 3, background: "#E2462B", color: "#fff", fontFamily: "'JetBrains Mono'", fontSize: 9.5, padding: "4px 9px", borderRadius: 3 }}>{item.tag}</div>

        {/* Rail d'actions */}
        <div style={{ position: "absolute", right: 10, bottom: 108, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 15 }}>
          <div onClick={toggleFollow} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#7C8B6F", border: `2px solid ${followed ? "#E2462B" : "#fff"}`, position: "relative", transition: "border-color .2s" }}>
              <div style={{ position: "absolute", bottom: -7, left: "50%", transform: "translateX(-50%)", width: 16, height: 16, borderRadius: "50%", background: followed ? "#7C8B6F" : "#E2462B", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}>{followed ? "✓" : "+"}</div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 8, marginTop: 4, color: followed ? "#F5C518" : "rgba(255,255,255,.8)" }}>{followed ? "Suivi" : "Suivre"}</span>
          </div>
          <div onClick={toggleLike} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
            <div style={{ fontSize: 26, transition: "transform .15s", transform: liked ? "scale(1.25)" : "scale(1)", color: liked ? "#E2462B" : "#fff" }}>{liked ? "❤️" : "♡"}</div>
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9.5, color: liked ? "#E2462B" : "#fff" }}>{likes}</span>
          </div>
          <div onClick={() => setShowComments(true)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
            <div style={{ fontSize: 23 }}>💬</div>
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9.5 }}>{item.comments}</span>
          </div>
          <div onClick={toggleSave} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
            <div style={{ fontSize: 23, transition: "transform .15s", transform: saved ? "scale(1.2)" : "scale(1)", color: saved ? "#F5C518" : "#fff" }}>🔖</div>
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9.5, color: saved ? "#F5C518" : "#fff" }}>{saves}</span>
          </div>
          <div onClick={handleShare} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
            <div style={{ fontSize: 23 }}>↗</div>
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9.5 }}>{item.shares}</span>
          </div>
        </div>

        {/* Caption */}
        <div onClick={() => onOpenListing(item)} style={{ position: "absolute", left: 14, right: 64, bottom: 26, zIndex: 3, fontFamily: "Manrope", cursor: "pointer" }}>
          <div style={{ display: "inline-block", background: "#fff", color: "#E2462B", fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 16, padding: "3px 10px", borderRadius: 5, marginBottom: 7 }}>{item.price}.- CHF</div>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>@{item.seller} · {item.city}</div>
          <div style={{ fontSize: 11.5, lineHeight: 1.4, color: "rgba(255,255,255,.9)" }}>{item.desc}</div>
        </div>

        {/* Indicateur scroll */}
        <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", gap: 5 }}>
          {LISTINGS.map((_, i) => (
            <div key={i} style={{ width: i === index % LISTINGS.length ? 16 : 5, height: 5, borderRadius: 3, background: i === index % LISTINGS.length ? "#E2462B" : "rgba(255,255,255,.35)", transition: "all .3s" }} />
          ))}
        </div>

        <Toast msg={showToast} />
        {showComments && <CommentsPanel item={item} onClose={() => setShowComments(false)} />}
      </div>

      {/* Slide suivante */}
      <div style={getSlideStyle(1)}>
        <SlideContent listItem={nextItem} colorIdx={index + 1} />
      </div>
    </div>
  );
}

function ListingDetail({ item, onBack, onBuy }) {
  const [showComments, setShowComments] = useState(false);
  const { liked, saved, followed, likes, saves, showToast, toggleLike, toggleSave, toggleFollow, handleShare } = useInteractions(item);

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#F7F4EC", position: "relative" }}>
      <div style={{ height: "46%", position: "relative", background: "linear-gradient(160deg,#CDBFA1,#A99A78)" }}>
        <div onClick={onBack} style={{ position: "absolute", top: 14, left: 14, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>←</div>

        {/* Actions rapides sur la photo */}
        <div style={{ position: "absolute", top: 14, right: 14, display: "flex", gap: 8 }}>
          <div onClick={toggleSave} style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: saved ? "#F5C518" : "#1C1A16" }}>🔖</div>
          <div onClick={handleShare} style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14 }}>↗</div>
        </div>

        <div style={{ position: "absolute", bottom: 16, right: 16, background: "#E2462B", color: "#fff", width: 54, height: 54, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 13, lineHeight: 1.1 }}>{item.price}.-<br />CHF</div>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 19, marginBottom: 6 }}>{item.title}</div>

        {/* Stats like/save/commentaire */}
        <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
          <div onClick={toggleLike} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
            <span style={{ fontSize: 18, color: liked ? "#E2462B" : "#A39C89" }}>{liked ? "❤️" : "♡"}</span>
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: liked ? "#E2462B" : "#8a8473" }}>{likes}</span>
          </div>
          <div onClick={() => setShowComments(true)} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
            <span style={{ fontSize: 18 }}>💬</span>
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: "#8a8473" }}>{item.comments}</span>
          </div>
          <div onClick={toggleSave} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
            <span style={{ fontSize: 18, color: saved ? "#F5C518" : "#A39C89" }}>🔖</span>
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: saved ? "#F5C518" : "#8a8473" }}>{saves}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          <Pill>Taille {item.size}</Pill><Pill>{item.state}</Pill><Pill>{item.category}</Pill>
        </div>
        <div style={{ fontSize: 12.5, color: "#5c5848", lineHeight: 1.5, marginBottom: 12 }}>{item.desc}</div>

        {/* Vendeur + Follow */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "1px dashed #D9D2C2", paddingTop: 12, marginBottom: 14, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#7C8B6F" }} />
            <div><div style={{ fontSize: 12, fontWeight: 700 }}>{item.seller} ✓ vérifié(e)</div><div style={{ fontSize: 10, color: "#8a8473" }}>4.9 ★ · 23 ventes</div></div>
          </div>
          <button onClick={toggleFollow} style={{ background: followed ? "#F7F4EC" : "#1C1A16", color: followed ? "#1C1A16" : "#F7F4EC", border: "1.5px solid #1C1A16", borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all .2s" }}>
            {followed ? "✓ Suivi" : "+ Suivre"}
          </button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="outline">Message</Btn>
          <Btn variant="primary" onClick={onBuy}>Acheter</Btn>
        </div>
      </div>

      <Toast msg={showToast} />
      {showComments && <CommentsPanel item={item} onClose={() => setShowComments(false)} />}
    </div>
  );
}

function SearchScreen() {
  const [filter, setFilter] = useState("Femme");
  const filtered = LISTINGS.filter((l) => l.category === filter || filter === "Tous");
  return (
    <div style={{ height: "100%", background: "#F7F4EC" }}>
      <div style={{ margin: "14px 16px 10px", background: "#fff", border: "1.5px solid #1C1A16", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#8a8473", fontFamily: "'JetBrains Mono'" }}>⌕ Rechercher un article…</div>
      <div style={{ display: "flex", gap: 7, padding: "0 16px 10px", flexWrap: "wrap" }}>
        {["Femme", "Homme", "Tous"].map((f) => (
          <div key={f} onClick={() => setFilter(f)} style={{ border: "1px solid #1C1A16", borderRadius: 20, padding: "5px 11px", fontSize: 10.5, fontFamily: "'JetBrains Mono'", cursor: "pointer", background: filter === f ? "#E2462B" : "#fff", color: filter === f ? "#fff" : "#1C1A16", borderColor: filter === f ? "#E2462B" : "#1C1A16" }}>{f}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 16px", overflowY: "auto", maxHeight: "calc(100% - 95px)" }}>
        {filtered.map((l) => (
          <div key={l.id} style={{ background: "#fff", borderRadius: 10, overflow: "hidden", border: "1px solid #D9D2C2" }}>
            <div style={{ height: 110, background: "linear-gradient(160deg,#D4C8AC,#B3A483)" }} />
            <div style={{ padding: 8 }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, color: "#E2462B", fontSize: 14 }}>{l.price}.-</div>
              <div style={{ fontSize: 10.5, color: "#5c5848" }}>{l.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SellScreen() {
  const [price, setPrice] = useState(45);
  const commissionRate = 0.06;
  const commission = (price * commissionRate).toFixed(2);
  const net = (price - price * commissionRate).toFixed(2);
  const [mode, setMode] = useState("recommande");

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#F7F4EC" }}>
      <div style={{ padding: "16px 18px 6px", fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 17 }}>Nouvelle annonce</div>
      <div style={{ padding: "0 18px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: 8, background: "linear-gradient(160deg,#D7CDB8,#A99A78)" }} />
          <div style={{ width: 64, height: 64, borderRadius: 8, border: "1.5px dashed #D9D2C2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#A39C89" }}>+</div>
        </div>

        <label style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, marginBottom: 4, display: "block" }}>PRIX DE VENTE (CHF)</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)}
          style={{ width: "100%", marginBottom: 14, padding: 10, fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 16, border: "1.5px solid #1C1A16", borderRadius: 10, color: "#E2462B" }} />

        <label style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, marginBottom: 6, display: "block" }}>MODE DE LIVRAISON</label>
        <div style={{ display: "flex", gap: 7, marginBottom: 14, flexWrap: "wrap" }}>
          {[["recommande", "Recommandé"], ["simple", "Envoi simple"], ["main_propre", "Main propre"]].map(([k, label]) => (
            <div key={k} onClick={() => setMode(k)} style={{ border: "1px solid #1C1A16", borderRadius: 20, padding: "5px 11px", fontSize: 10.5, fontFamily: "'JetBrains Mono'", cursor: "pointer", background: mode === k ? "#E2462B" : "#fff", color: mode === k ? "#fff" : "#1C1A16", borderColor: mode === k ? "#E2462B" : "#1C1A16" }}>{label}</div>
          ))}
        </div>

        <div style={{ border: "1.5px dashed #1C1A16", borderRadius: 10, padding: 12, marginBottom: 16 }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>RÉPARTITION DU PRIX</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 5 }}><span style={{ color: "#5c5848" }}>Prix de vente</span><span style={{ fontFamily: "'JetBrains Mono'" }}>{price.toFixed(2)} CHF</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 5 }}><span style={{ color: "#5c5848" }}>Commission plateforme (6%)</span><span style={{ fontFamily: "'JetBrains Mono'", color: "#E2462B" }}>− {commission} CHF</span></div>
          <div style={{ height: 1, background: "#D9D2C2", margin: "8px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}><span>Vous recevez</span><span style={{ fontFamily: "'JetBrains Mono'", color: "#7C8B6F" }}>{net} CHF</span></div>
        </div>
        <Btn variant="primary" style={{ width: "100%" }}>Publier l'annonce</Btn>
      </div>
    </div>
  );
}

function ProfileScreen() {
  const [legalScreen, setLegalScreen] = useState(null);

  const LEGAL = {
    cgu: {
      title: "Conditions Générales d'Utilisation",
      icon: "📋",
      sections: [
        { h: "1. Objet et acceptation", t: "Les présentes CGU régissent l'accès et l'utilisation de la plateforme Swip'n Style, service de mise en relation entre particuliers pour la vente et l'achat de vêtements et accessoires. L'inscription implique l'acceptation pleine et entière des présentes CGU, horodatée et conservée." },
        { h: "2. Inscription & KYC", t: "Tout utilisateur doit fournir des informations exactes et procéder à une vérification d'identité obligatoire dès l'inscription. Les documents transmis sont traités exclusivement par un prestataire KYC tiers — Swip'n Style ne stocke aucun document d'identité." },
        { h: "3. Annonces", t: "Les annonces doivent décrire fidèlement l'article et être accompagnées de photos réelles. Tout contenu trompeur, illicite ou contrefait est interdit et entraîne le retrait immédiat de l'annonce et la suspension du compte." },
        { h: "4. Commission", t: "Une commission de 6% est prélevée sur chaque vente conclue via la plateforme. Elle est affichée avant publication de l'annonce et rappelée sur chaque transaction." },
        { h: "5. Suspension de compte", t: "Swip'n Style peut suspendre ou résilier un compte en cas de manquement aux CGU : non-respect du délai d'envoi, non-paiement de commission, contenu interdit ou comportement frauduleux." },
      ]
    },
    cgv: {
      title: "Conditions Générales de Vente",
      icon: "🛍️",
      sections: [
        { h: "1. Formation de la vente", t: "La vente est réputée conclue dès la confirmation du paiement (modes A et B) ou dès la validation mutuelle du bouton de confirmation (mode C — main propre). Le vendeur s'engage à honorer la vente au prix affiché tant que l'article est disponible." },
        { h: "2. Obligations du vendeur", t: "Le vendeur doit expédier l'article dans les 5 jours ouvrables, l'emballer soigneusement, fournir les preuves d'envoi requises selon le mode choisi, et s'acquitter de la commission due à Swip'n Style." },
        { h: "3. Obligations de l'acheteur", t: "L'acheteur doit régler le prix convenu et confirmer la réception dans le délai de 48h. Passé ce délai, les fonds sont automatiquement libérés au vendeur." },
        { h: "4. Pas de droit de rétractation légal", t: "S'agissant d'une vente entre particuliers, aucun droit de rétractation légal ne s'applique. Un retour reste possible uniquement par accord entre les parties, ou en cas de non-conformité avérée." },
        { h: "5. Non-conformité", t: "L'acheteur dispose de 48h après réception pour signaler, photos à l'appui, toute non-conformité substantielle. En cas de non-conformité avérée, les frais de retour sont à la charge du vendeur." },
      ]
    },
    livraison: {
      title: "Modes de livraison & garanties",
      icon: "📦",
      sections: [
        { h: "Mode A — Envoi recommandé ✅ Protégé", t: "L'acheteur règle en ligne le produit + frais de port recommandé avec numéro de suivi obligatoire. En cas de non-envoi à J+5 ou de perte confirmée par La Poste, l'acheteur est intégralement remboursé automatiquement." },
        { h: "Mode B — Envoi simple ⚠️ Non garanti", t: "L'acheteur choisit de ne pas payer les frais recommandé. Le vendeur expédie sans suivi vérifiable. En cas de perte ou non-réception, ni le vendeur ni Swip'n Style ne peuvent être tenus responsables. Consentement actif requis avant paiement." },
        { h: "Mode C — Main propre 🤝 Commission vendeur", t: "Les parties conviennent d'un lieu de remise physique. La transaction est confirmée via un bouton dédié. Le paiement s'effectue directement entre les parties. La commission de 6% est prélevée automatiquement sur la carte enregistrée du vendeur." },
        { h: "Délai d'envoi", t: "Dans tous les modes avec envoi postal, le vendeur dispose de 5 jours ouvrables pour expédier l'article et fournir une preuve. Sans preuve à J+5, la commande passe automatiquement en litige." },
      ]
    },
    confidentialite: {
      title: "Protection des données (nLPD)",
      icon: "🔒",
      sections: [
        { h: "Données collectées", t: "Swip'n Style collecte vos données d'identification (nom, email, téléphone), de vérification d'identité (traitées par prestataire KYC tiers), de paiement (traitées par prestataire de paiement tiers), et données d'usage (historique, messages, likes)." },
        { h: "Ce que nous ne stockons PAS", t: "Swip'n Style ne stocke jamais vos documents d'identité ni vos données bancaires complètes. Ces données restent exclusivement chez nos prestataires spécialisés certifiés." },
        { h: "Vos droits (nLPD)", t: "Conformément à la Loi fédérale sur la protection des données (nLPD), vous disposez d'un droit d'accès, rectification, effacement et opposition concernant vos données personnelles. Contact : [email de contact]." },
        { h: "Partage des données", t: "Vos données ne sont transmises à des tiers que pour l'exécution du service (KYC, paiement, hébergeur) ou en cas d'obligation légale. Swip'n Style ne vend jamais vos données à des fins publicitaires." },
      ]
    },
    contrefacon: {
      title: "Contrefaçon & droits de marque",
      icon: "⚖️",
      sections: [
        { h: "Interdiction absolue", t: "Il est strictement interdit de vendre tout article contrefaisant une marque, un logo, un dessin ou modèle protégé, en violation de la LPM (Loi fédérale sur la protection des marques) et de la LDA (Loi fédérale sur le droit d'auteur)." },
        { h: "Responsabilité du vendeur", t: "Le vendeur garantit l'authenticité de tout article de marque proposé. Swip'n Style peut exiger une preuve d'authenticité (facture, certificat, numéro de série) avant publication ou maintien de toute annonce de marque." },
        { h: "Signalement", t: "Tout utilisateur ou titulaire de droits peut signaler une annonce suspecte via le bouton de signalement intégré, ou par email à [contact]. Swip'n Style examine chaque signalement et retire sans délai toute annonce manifestement contrefaisante." },
        { h: "Sanctions", t: "Publication d'un article contrefait = retrait immédiat + suspension ou résiliation définitive du compte, sans préjudice de poursuites civiles ou pénales par les titulaires de droits ou les autorités compétentes." },
      ]
    },
  };

  if (legalScreen) {
    const doc = LEGAL[legalScreen];
    return (
      <div style={{ height: "100%", overflowY: "auto", background: "#F7F4EC" }}>
        <div style={{ background: "#1C1A16", padding: "16px 18px 20px" }}>
          <div onClick={() => setLegalScreen(null)} style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "rgba(255,255,255,.5)", cursor: "pointer", marginBottom: 10 }}>← Retour</div>
          <div style={{ fontSize: 24, marginBottom: 8 }}>{doc.icon}</div>
          <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 17, color: "#F7F4EC", lineHeight: 1.3 }}>{doc.title}</div>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, color: "rgba(255,255,255,.4)", marginTop: 6 }}>Swip'n Style · Version 1.0 · Document de travail</div>
        </div>
        <div style={{ padding: "18px 18px 30px" }}>
          {doc.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < doc.sections.length - 1 ? "1px dashed #D9D2C2" : "none" }}>
              <div style={{ fontWeight: 700, fontSize: 12.5, marginBottom: 6, color: "#1C1A16" }}>{s.h}</div>
              <div style={{ fontSize: 12, color: "#5c5848", lineHeight: 1.65 }}>{s.t}</div>
            </div>
          ))}
          <div style={{ background: "#FFF3E0", border: "1px solid #F5C518", borderRadius: 8, padding: 12, marginTop: 8 }}>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9.5, color: "#8B6E00", lineHeight: 1.5 }}>
              ⚠️ Ce document est une base de travail. Il doit être validé par un avocat spécialisé en droit suisse avant toute mise en ligne officielle.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#F7F4EC" }}>
      <div style={{ background: "#1C1A16", color: "#F7F4EC", padding: "28px 18px 20px", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#7C8B6F", margin: "0 auto 10px", border: "3px solid #F7F4EC" }} />
        <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 18 }}>Claire Moreau</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'JetBrains Mono'", fontSize: 9, color: "#7C8B6F", marginTop: 4 }}>✓ Identité vérifiée</div>
        <div style={{ marginTop: 8 }}><Logo size={13} dark={true} /></div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "16px 10px", borderBottom: "1px solid #D9D2C2" }}>
        {[["23", "VENTES"], ["4.9", "NOTE"], ["12", "ACHATS"]].map(([v, l]) => (
          <div key={l} style={{ textAlign: "center" }}><b style={{ display: "block", fontFamily: "'Fraunces',serif", fontSize: 17 }}>{v}</b><span style={{ fontSize: 9.5, color: "#8a8473", fontFamily: "'JetBrains Mono'" }}>{l}</span></div>
        ))}
      </div>
      <div style={{ margin: "14px 16px", border: "1.5px dashed #E2462B", borderRadius: 10, padding: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#E2462B", fontFamily: "'JetBrains Mono'", marginBottom: 6 }}>PROGRAMME FIDÉLITÉ</div>
        <div style={{ height: 6, background: "#D9D2C2", borderRadius: 4, overflow: "hidden", marginBottom: 6 }}><div style={{ height: "100%", width: "60%", background: "#E2462B" }} /></div>
        <div style={{ fontSize: 10, color: "#5c5848" }}>3 commandes sur 5 — encore 2 pour -15%</div>
      </div>

      {["Mes annonces", "Mes commandes", "Articles sauvegardés", "Paramètres du compte"].map((m) => (
        <div key={m} style={{ display: "flex", justifyContent: "space-between", padding: "13px 18px", borderBottom: "1px solid #D9D2C2", fontSize: 12.5 }}>{m}<span style={{ color: "#bbb" }}>›</span></div>
      ))}

      {/* Section légale */}
      <div style={{ margin: "16px 16px 4px" }}>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#8a8473", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>Informations légales</div>
        {[
          { key: "cgu", icon: "📋", label: "Conditions Générales d'Utilisation" },
          { key: "cgv", icon: "🛍️", label: "Conditions Générales de Vente" },
          { key: "livraison", icon: "📦", label: "Modes de livraison & garanties" },
          { key: "confidentialite", icon: "🔒", label: "Protection des données (nLPD)" },
          { key: "contrefacon", icon: "⚖️", label: "Contrefaçon & droits de marque" },
        ].map(({ key, icon, label }) => (
          <div key={key} onClick={() => setLegalScreen(key)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: 10, background: "#fff", border: "1px solid #D9D2C2", marginBottom: 8, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1C1A16" }}>{label}</span>
            </div>
            <span style={{ color: "#bbb", fontSize: 14 }}>›</span>
          </div>
        ))}
        <div style={{ fontSize: 9.5, color: "#A39C89", fontFamily: "'JetBrains Mono'", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
          Documents soumis au droit suisse · Canton de Vaud
        </div>
      </div>
    </div>
  );
}

function MessagesScreen() {
  const convos = [
    { seller: "claire.lsn", listing: "Veste en jean vintage", last: "Bonjour, l'article est-il toujours dispo ?", unread: true },
    { seller: "elsa.gva", listing: "Bottines en cuir", last: "Parfait, je confirme l'envoi demain.", unread: false },
  ];
  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#F7F4EC" }}>
      <div style={{ padding: "16px 18px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 17 }}>Messages</div>
        <Logo size={13} />
      </div>
      {convos.map((c, i) => (
        <div key={i} style={{ display: "flex", gap: 10, padding: "12px 18px", borderBottom: "1px solid #D9D2C2", alignItems: "center" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#7C8B6F", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: 12.5 }}>{c.seller}</span>
              {c.unread && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E2462B" }} />}
            </div>
            <div style={{ fontSize: 10, color: "#8a8473", marginBottom: 2 }}>{c.listing}</div>
            <div style={{ fontSize: 11, color: "#5c5848" }}>{c.last}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Live Screen ----------
const LIVES = [
  { id: 1, seller: "claire.lsn", title: "Vide-dressing — vestes & manteaux", viewers: 142, tag: "FEMME", color: "linear-gradient(160deg,#C9A87C,#8B6E4E)" },
  { id: 2, seller: "noah.ch", title: "Solderie pulls & hoodies homme", viewers: 87, tag: "HOMME", color: "linear-gradient(160deg,#7C8B6F,#4E5E44)" },
  { id: 3, seller: "elsa.gva", title: "Collection chaussures printemps", viewers: 213, tag: "FEMME", color: "linear-gradient(160deg,#C9B87C,#9E8A4E)" },
];

function LiveScreen({ onBack }) {
  const [active, setActive] = useState(null);

  if (active !== null) {
    const live = LIVES[active];
    return (
      <div style={{ height: "100%", position: "relative", background: "#000", color: "#fff", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: live.color, opacity: .85 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,.8) 100%)" }} />

        {/* Header */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 8px" }}>
          <div onClick={() => setActive(null)} style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14 }}>←</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E2462B", animation: "pulse 1s infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, background: "#E2462B", padding: "3px 8px", borderRadius: 4 }}>EN DIRECT</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'JetBrains Mono'", fontSize: 10, color: "rgba(255,255,255,.8)" }}>👁 {live.viewers}</div>
        </div>

        {/* Seller */}
        <div style={{ position: "absolute", top: 52, left: 14, zIndex: 3, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#7C8B6F", border: "2px solid #fff" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 12 }}>@{live.seller}</div>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, color: "rgba(255,255,255,.7)" }}>{live.tag}</div>
          </div>
        </div>

        {/* Chat */}
        <div style={{ position: "absolute", left: 14, right: 60, bottom: 80, zIndex: 3 }}>
          {[
            { user: "marc.lsn", msg: "C'est disponible en S ?" },
            { user: "sophie_vd", msg: "Super qualité 🔥" },
            { user: "nico.ch", msg: "Je prends la veste !" },
          ].map((c, i) => (
            <div key={i} style={{ marginBottom: 6, fontSize: 11.5 }}>
              <span style={{ color: "#F5C518", fontWeight: 700 }}>@{c.user} </span>
              <span style={{ color: "rgba(255,255,255,.9)" }}>{c.msg}</span>
            </div>
          ))}
        </div>

        {/* Actions droite */}
        <div style={{ position: "absolute", right: 10, bottom: 90, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          {[["♡", "284"], ["💬", "47"], ["↗", "12"]].map(([ic, c], i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ fontSize: 22 }}>{ic}</div>
              <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9 }}>{c}</span>
            </div>
          ))}
        </div>

        {/* Annonce produit */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, background: "rgba(28,26,22,.95)", padding: "12px 16px 16px", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, color: "#E2462B", marginBottom: 4 }}>ARTICLE EN COURS</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#F7F4EC" }}>{live.title}</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 20, color: "#F5C518" }}>45.- CHF</div>
            </div>
            <button style={{ background: "#E2462B", color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Acheter</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#F7F4EC" }}>
      <div style={{ padding: "16px 18px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div onClick={onBack} style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#8a8473", cursor: "pointer", marginBottom: 4 }}>← Retour</div>
          <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 17 }}>En direct 📡</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#E2462B", color: "#fff", fontFamily: "'JetBrains Mono'", fontSize: 9, padding: "4px 10px", borderRadius: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
          {LIVES.length} LIVE{LIVES.length > 1 ? "S" : ""}
        </div>
      </div>

      <div style={{ padding: "10px 16px" }}>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#8a8473", marginBottom: 12 }}>
          Tapez sur un live pour rejoindre et acheter en temps réel.
        </div>
        {LIVES.map((l, i) => (
          <div key={l.id} onClick={() => setActive(i)} style={{ marginBottom: 14, borderRadius: 14, overflow: "hidden", border: "1px solid #D9D2C2", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,.08)" }}>
            <div style={{ height: 120, background: l.color, position: "relative" }}>
              <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#E2462B", color: "#fff", fontFamily: "'JetBrains Mono'", fontSize: 9, padding: "3px 8px", borderRadius: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />LIVE
                </div>
                <div style={{ background: "rgba(0,0,0,.5)", color: "#fff", fontFamily: "'JetBrains Mono'", fontSize: 9, padding: "3px 8px", borderRadius: 4 }}>{l.tag}</div>
              </div>
              <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,.55)", color: "#fff", fontFamily: "'JetBrains Mono'", fontSize: 9, padding: "3px 8px", borderRadius: 4 }}>
                👁 {l.viewers}
              </div>
            </div>
            <div style={{ background: "#fff", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#7C8B6F", flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 12 }}>@{l.seller}</div>
                <div style={{ fontSize: 11, color: "#5c5848" }}>{l.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ---------- Checkout (paiement acheteur) ----------
function CheckoutScreen({ item, onBack, onSuccess }) {
  const [step, setStep] = useState(1); // 1=livraison 2=paiement 3=confirmation
  const [mode, setMode] = useState("recommande");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [paying, setPaying] = useState(false);

  const fraisPort = mode === "recommande" ? 6.50 : 0;
  const total = item.price + fraisPort;

  const fmtCard = (v) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const fmtExp  = (v) => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?d.slice(0,2)+"/"+d.slice(2):d; };

  const pay = () => {
    if (!cardNum || !expiry || !cvv) return;
    setPaying(true);
    setTimeout(() => { setPaying(false); setStep(3); }, 1800);
  };

  if (step === 3) return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#F7F4EC", padding:32, textAlign:"center" }}>
      <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
      <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:22, marginBottom:8 }}>Paiement confirmé !</div>
      <div style={{ fontSize:12.5, color:"#5c5848", lineHeight:1.6, marginBottom:6 }}>
        <b>{total.toFixed(2)} CHF</b> débités en toute sécurité.<br/>
        Les fonds sont conservés en séquestre jusqu'à la livraison.
      </div>
      <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", marginBottom:24 }}>
        Réf. commande : #SNS-{Math.floor(Math.random()*90000+10000)}
      </div>
      <div style={{ background:"#fff", border:"1px solid #D9D2C2", borderRadius:12, padding:"12px 18px", width:"100%", marginBottom:16, fontSize:12 }}>
        <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#E2462B", marginBottom:6 }}>RÉCAPITULATIF</div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ color:"#5c5848" }}>Article</span><span style={{ fontFamily:"'JetBrains Mono'" }}>{item.price.toFixed(2)} CHF</span></div>
        {fraisPort > 0 && <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ color:"#5c5848" }}>Frais de port</span><span style={{ fontFamily:"'JetBrains Mono'" }}>{fraisPort.toFixed(2)} CHF</span></div>}
        <div style={{ height:1, background:"#D9D2C2", margin:"8px 0" }} />
        <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700 }}><span>Total payé</span><span style={{ fontFamily:"'JetBrains Mono'", color:"#E2462B" }}>{total.toFixed(2)} CHF</span></div>
      </div>
      <Btn variant="primary" onClick={onBack} style={{ width:"100%" }}>Retour au fil</Btn>
    </div>
  );

  return (
    <div style={{ height:"100%", overflowY:"auto", background:"#F7F4EC" }}>
      <div style={{ background:"#1C1A16", padding:"14px 18px 16px" }}>
        <div onClick={onBack} style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.5)", cursor:"pointer", marginBottom:8 }}>← Annuler</div>
        <Logo size={15} dark={true} />
        <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:16, color:"#F7F4EC", marginTop:6 }}>Paiement sécurisé</div>
        {/* Barre de progression */}
        <div style={{ display:"flex", gap:6, marginTop:12 }}>
          {["Livraison","Paiement"].map((s,i) => (
            <div key={s} style={{ flex:1, height:3, borderRadius:3, background: step > i+1 ? "#7C8B6F" : step === i+1 ? "#F5C518" : "rgba(255,255,255,.2)", transition:"background .3s" }} />
          ))}
        </div>
      </div>

      <div style={{ padding:"16px 18px" }}>
        {/* Récap article */}
        <div style={{ display:"flex", gap:10, background:"#fff", borderRadius:10, padding:10, border:"1px solid #D9D2C2", marginBottom:16 }}>
          <div style={{ width:48, height:48, borderRadius:8, background:"linear-gradient(160deg,#D7CDB8,#A99A78)", flexShrink:0 }} />
          <div>
            <div style={{ fontWeight:700, fontSize:12.5 }}>{item.title}</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, color:"#E2462B", fontSize:15 }}>{item.price}.- CHF</div>
            <div style={{ fontSize:10, color:"#8a8473" }}>@{item.seller} · {item.city}</div>
          </div>
        </div>

        {step === 1 && (
          <>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:11, fontWeight:700, marginBottom:10 }}>MODE DE LIVRAISON</div>
            {[
              ["recommande", "📦 Envoi recommandé", "+ 6.50 CHF", "Livraison garantie avec numéro de suivi ✅"],
              ["simple",     "📬 Envoi simple",     "Gratuit",    "Sans suivi — non remboursable si perte ⚠️"],
              ["main_propre","🤝 Main propre",       "Gratuit",    "Rendez-vous convenu avec le vendeur"],
            ].map(([k, label, prix, desc]) => (
              <div key={k} onClick={() => setMode(k)} style={{ border: `1.5px solid ${mode===k?"#1C1A16":"#D9D2C2"}`, borderRadius:10, padding:"10px 12px", marginBottom:8, cursor:"pointer", background: mode===k ? "#fff" : "transparent" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontWeight:700, fontSize:12.5 }}>{label}</span>
                  <span style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color: k==="recommande" ? "#E2462B" : "#7C8B6F" }}>{prix}</span>
                </div>
                <div style={{ fontSize:10.5, color:"#8a8473" }}>{desc}</div>
              </div>
            ))}

            {mode === "simple" && (
              <div style={{ background:"#FFF3E0", border:"1px solid #F5C518", borderRadius:8, padding:10, marginBottom:12 }}>
                <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                  <input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} style={{ marginTop:2, accentColor:"#E2462B" }} />
                  <div style={{ fontSize:10.5, color:"#8B6E00", lineHeight:1.5 }}>J'accepte qu'en cas de perte du colis, ni le vendeur ni Swip'n Style ne pourront être tenus responsables.</div>
                </div>
              </div>
            )}

            <div style={{ border:"1px solid #D9D2C2", borderRadius:10, padding:12, marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}><span style={{ color:"#5c5848" }}>Article</span><span style={{ fontFamily:"'JetBrains Mono'" }}>{item.price.toFixed(2)} CHF</span></div>
              {fraisPort > 0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}><span style={{ color:"#5c5848" }}>Frais de port</span><span style={{ fontFamily:"'JetBrains Mono'" }}>{fraisPort.toFixed(2)} CHF</span></div>}
              <div style={{ height:1, background:"#D9D2C2", margin:"8px 0" }} />
              <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700 }}><span>Total</span><span style={{ fontFamily:"'JetBrains Mono'", color:"#E2462B" }}>{total.toFixed(2)} CHF</span></div>
            </div>
            <Btn variant="primary" onClick={() => { if (mode==="simple" && !accepted) return; setStep(2); }} style={{ width:"100%", opacity: mode==="simple"&&!accepted ? 0.4 : 1 }}>Continuer → Paiement</Btn>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:11, fontWeight:700, marginBottom:10 }}>CARTE BANCAIRE</div>
            <div style={{ background:"linear-gradient(135deg,#1C1A16,#3a3630)", borderRadius:14, padding:"20px 18px", marginBottom:16, color:"#F7F4EC", position:"relative" }}>
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:"rgba(255,255,255,.5)", marginBottom:18 }}>Swip'n Style · Paiement sécurisé</div>
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:16, letterSpacing:3, marginBottom:14 }}>{cardNum || "•••• •••• •••• ••••"}</div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div><div style={{ fontSize:9, color:"rgba(255,255,255,.4)", marginBottom:2 }}>EXPIRATION</div><div style={{ fontFamily:"'JetBrains Mono'", fontSize:13 }}>{expiry || "MM/AA"}</div></div>
                <div><div style={{ fontSize:9, color:"rgba(255,255,255,.4)", marginBottom:2 }}>CVV</div><div style={{ fontFamily:"'JetBrains Mono'", fontSize:13 }}>{cvv ? "•••" : "•••"}</div></div>
                <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:20, color:"#F5C518", alignSelf:"flex-end" }}>VISA</div>
              </div>
            </div>

            {[
              ["N° de carte", cardNum, v=>setCardNum(fmtCard(v)), "1234 5678 9012 3456"],
              ["Date d'expiration", expiry, v=>setExpiry(fmtExp(v)), "MM/AA"],
              ["CVV", cvv, v=>setCvv(v.replace(/\D/g,"").slice(0,3)), "•••"],
            ].map(([lbl, val, onChange, ph]) => (
              <div key={lbl} style={{ marginBottom:12 }}>
                <label style={{ fontFamily:"'JetBrains Mono'", fontSize:10, display:"block", marginBottom:4, color:"#8a8473" }}>{lbl.toUpperCase()}</label>
                <input value={val} onChange={e=>onChange(e.target.value)} placeholder={ph}
                  style={{ width:"100%", padding:"10px 12px", border:"1.5px solid #D9D2C2", borderRadius:8, fontSize:14, fontFamily:"'JetBrains Mono'" }} />
              </div>
            ))}

            <div style={{ background:"#F0F7F0", border:"1px solid #7C8B6F", borderRadius:8, padding:"8px 12px", marginBottom:14, display:"flex", gap:8, alignItems:"center" }}>
              <span style={{ fontSize:16 }}>🔒</span>
              <div style={{ fontSize:10.5, color:"#4a6040" }}>Paiement chiffré SSL · Fonds conservés en séquestre jusqu'à la livraison</div>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:14, marginBottom:14, padding:"10px 0", borderTop:"1px dashed #D9D2C2" }}>
              <span>Total à payer</span><span style={{ fontFamily:"'Fraunces',serif", color:"#E2462B" }}>{total.toFixed(2)} CHF</span>
            </div>

            <Btn variant="primary" onClick={pay} style={{ width:"100%", opacity: paying?0.7:1 }}>
              {paying ? "Traitement en cours…" : `Payer ${total.toFixed(2)} CHF`}
            </Btn>
            <div onClick={()=>setStep(1)} style={{ textAlign:"center", fontFamily:"'JetBrains Mono'", fontSize:10, color:"#8a8473", marginTop:12, cursor:"pointer" }}>← Modifier la livraison</div>
          </>
        )}
      </div>
    </div>
  );
}

// ---------- Dashboard Admin ----------
const ADMIN_TRANSACTIONS = [
  { id:"#4821", article:"Veste en jean vintage", acheteur:"marc.lsn", vendeur:"claire.lsn", prix:45, commission:2.70, mode:"recommande", statut:"livree", date:"29.06.2026" },
  { id:"#4820", article:"Bottines en cuir",       acheteur:"noah.ch",  vendeur:"elsa.gva",  prix:60, commission:3.60, mode:"recommande", statut:"expediee", date:"28.06.2026" },
  { id:"#4819", article:"Pull col rond beige",    acheteur:"sophie_vd",vendeur:"noah.ch",   prix:20, commission:1.20, mode:"simple",     statut:"en_attente", date:"28.06.2026" },
  { id:"#4818", article:"Veste en jean vintage",  acheteur:"elsa.gva", vendeur:"claire.lsn",prix:45, commission:2.70, mode:"main_propre",statut:"livree", date:"27.06.2026" },
  { id:"#4817", article:"Bottines en cuir",       acheteur:"nico.ch",  vendeur:"elsa.gva",  prix:60, commission:3.60, mode:"recommande", statut:"litige", date:"26.06.2026" },
];
const STATUT_COLORS = { livree:"#7C8B6F", expediee:"#F5C518", en_attente:"#A39C89", litige:"#E2462B" };
const STATUT_LABELS = { livree:"Livrée ✓", expediee:"Expédiée", en_attente:"En attente", litige:"Litige ⚠️" };

function AdminDashboard({ onBack }) {
  const [tab, setTab] = useState("overview");
  const totalRevenu = ADMIN_TRANSACTIONS.reduce((s,t) => s + t.prix, 0);
  const totalCommission = ADMIN_TRANSACTIONS.reduce((s,t) => s + t.commission, 0);
  const nbLitiges = ADMIN_TRANSACTIONS.filter(t=>t.statut==="litige").length;
  const nbVentes = ADMIN_TRANSACTIONS.filter(t=>t.statut==="livree").length;

  return (
    <div style={{ height:"100%", overflowY:"auto", background:"#1C1A16", color:"#F7F4EC" }}>
      {/* Header admin */}
      <div style={{ padding:"14px 18px 12px", borderBottom:"1px solid rgba(255,255,255,.1)" }}>
        <div onClick={onBack} style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.4)", cursor:"pointer", marginBottom:8 }}>← Quitter l'admin</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <Logo size={16} dark={true} />
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"#E2462B", marginTop:3, letterSpacing:".1em" }}>TABLEAU DE BORD ADMIN</div>
          </div>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"#E2462B", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>👤</div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, padding:"14px 16px 0" }}>
        {[
          ["💰", "Revenu total", `${totalRevenu.toFixed(2)} CHF`, "#F5C518"],
          ["📊", "Commissions", `${totalCommission.toFixed(2)} CHF`, "#E2462B"],
          ["✅", "Ventes conclues", `${nbVentes}`, "#7C8B6F"],
          ["⚠️", "Litiges ouverts", `${nbLitiges}`, "#E2462B"],
        ].map(([ic, label, val, color]) => (
          <div key={label} style={{ background:"rgba(255,255,255,.06)", borderRadius:12, padding:"12px 14px", border:`1px solid rgba(255,255,255,.08)` }}>
            <div style={{ fontSize:18, marginBottom:4 }}>{ic}</div>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"rgba(255,255,255,.45)", marginBottom:4 }}>{label.toUpperCase()}</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:18, color }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Graphique simple (barres) */}
      <div style={{ margin:"14px 16px 0", background:"rgba(255,255,255,.05)", borderRadius:12, padding:"12px 14px", border:"1px solid rgba(255,255,255,.08)" }}>
        <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"rgba(255,255,255,.4)", marginBottom:12 }}>COMMISSIONS / TRANSACTION (CHF)</div>
        <div style={{ display:"flex", gap:6, alignItems:"flex-end", height:50 }}>
          {ADMIN_TRANSACTIONS.map((t,i) => (
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <div style={{ width:"100%", background:"#E2462B", borderRadius:"3px 3px 0 0", height: `${(t.commission / 4) * 50}px`, transition:"height .3s" }} />
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:7, color:"rgba(255,255,255,.35)", whiteSpace:"nowrap" }}>{t.commission.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Onglets */}
      <div style={{ display:"flex", gap:0, margin:"14px 16px 0", background:"rgba(255,255,255,.06)", borderRadius:10, overflow:"hidden" }}>
        {[["overview","Transactions"],["litiges","Litiges"]].map(([k,l]) => (
          <div key={k} onClick={()=>setTab(k)} style={{ flex:1, textAlign:"center", padding:"8px 0", fontFamily:"'JetBrains Mono'", fontSize:10, cursor:"pointer", background: tab===k ? "#E2462B" : "transparent", color: tab===k ? "#fff" : "rgba(255,255,255,.45)", transition:"background .2s" }}>{l}</div>
        ))}
      </div>

      {/* Liste transactions */}
      <div style={{ padding:"10px 16px 20px" }}>
        {ADMIN_TRANSACTIONS
          .filter(t => tab==="litiges" ? t.statut==="litige" : true)
          .map((t,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,.06)", borderRadius:10, padding:"10px 12px", marginBottom:8, border:"1px solid rgba(255,255,255,.08)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"rgba(255,255,255,.4)" }}>{t.id} · {t.date}</span>
                <span style={{ fontFamily:"'JetBrains Mono'", fontSize:9, background: STATUT_COLORS[t.statut]+"22", color: STATUT_COLORS[t.statut], padding:"2px 8px", borderRadius:10 }}>{STATUT_LABELS[t.statut]}</span>
              </div>
              <div style={{ fontWeight:600, fontSize:12.5, marginBottom:2 }}>{t.article}</div>
              <div style={{ fontSize:10.5, color:"rgba(255,255,255,.45)", marginBottom:6 }}>@{t.acheteur} → @{t.vendeur}</div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:"rgba(255,255,255,.55)" }}>Vente : {t.prix.toFixed(2)} CHF</span>
                <span style={{ fontFamily:"'JetBrains Mono'", fontSize:11, color:"#E2462B", fontWeight:700 }}>+{t.commission.toFixed(2)} CHF</span>
              </div>
            </div>
          ))}
        {tab==="litiges" && ADMIN_TRANSACTIONS.filter(t=>t.statut==="litige").length === 0 && (
          <div style={{ textAlign:"center", color:"rgba(255,255,255,.3)", fontFamily:"'JetBrains Mono'", fontSize:11, marginTop:20 }}>Aucun litige en cours ✓</div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [auth, setAuth] = useState("splash"); // splash | login | register | app
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("feed");
  const [feedIndex, setFeedIndex] = useState(0);
  const [activeListing, setActiveListing] = useState(null);

  const onLoginSuccess  = (u) => { setUser(u); setAuth("app"); };
  const onRegisterSuccess = (u) => { setUser(u); setAuth("app"); };

  // --- Accès admin secret ---
  const ADMIN_PIN = "1234";
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const longPressTimer = React.useRef(null);

  const onLogoPress = () => {
    longPressTimer.current = setTimeout(() => {
      setShowPinModal(true); setPin(""); setPinError(false);
    }, 1500);
  };
  const onLogoRelease = () => clearTimeout(longPressTimer.current);

  const submitPin = (p) => {
    if (p === ADMIN_PIN) { setShowPinModal(false); setPin(""); setScreen("admin"); }
    else { setPinError(true); setPin(""); setTimeout(() => setPinError(false), 1200); }
  };
  const addDigit = (d) => { const next = pin + d; setPin(next); if (next.length === 4) submitPin(next); };

  const openListing  = (item) => { setActiveListing(item); setScreen("detail"); };
  const openCheckout = (item) => { setActiveListing(item); setScreen("checkout"); };

  // --- Écrans auth ---
  if (auth === "splash") return (
    <Wrapper>
      <div style={{ width:320, height:660, borderRadius:30, border:"7px solid #1C1A16", overflow:"hidden", boxShadow:"0 18px 30px -12px rgba(0,0,0,.4)" }}>
        <SplashScreen onLogin={() => setAuth("login")} onRegister={() => setAuth("register")} />
      </div>
    </Wrapper>
  );

  if (auth === "login") return (
    <Wrapper>
      <div style={{ width:320, height:660, background:"#F7F4EC", borderRadius:30, border:"7px solid #1C1A16", overflow:"hidden", boxShadow:"0 18px 30px -12px rgba(0,0,0,.4)" }}>
        <LoginScreen onSuccess={onLoginSuccess} onRegister={() => setAuth("register")} onBack={() => setAuth("splash")} />
      </div>
    </Wrapper>
  );

  if (auth === "register") return (
    <Wrapper>
      <div style={{ width:320, height:660, background:"#F7F4EC", borderRadius:30, border:"7px solid #1C1A16", overflow:"hidden", boxShadow:"0 18px 30px -12px rgba(0,0,0,.4)" }}>
        <RegisterScreen onSuccess={onRegisterSuccess} onLogin={() => setAuth("login")} onBack={() => setAuth("splash")} />
      </div>
    </Wrapper>
  );

  // --- App principale ---
  let body;
  if      (screen === "feed")     body = <FeedScreen index={feedIndex} setIndex={setFeedIndex} onOpenListing={openListing} onNavigate={setScreen} />;
  else if (screen === "detail")   body = <ListingDetail item={activeListing} onBack={() => setScreen("feed")} onBuy={() => openCheckout(activeListing)} />;
  else if (screen === "checkout") body = <CheckoutScreen item={activeListing} onBack={() => setScreen("detail")} onSuccess={() => setScreen("feed")} />;
  else if (screen === "search")   body = <SearchScreen />;
  else if (screen === "sell")     body = <SellScreen />;
  else if (screen === "messages") body = <MessagesScreen />;
  else if (screen === "profile")  body = <ProfileScreen />;
  else if (screen === "live")     body = <LiveScreen onBack={() => setScreen("feed")} />;
  else if (screen === "admin")    body = <AdminDashboard onBack={() => setScreen("profile")} />;

  return (
    <Wrapper onLogoPress={onLogoPress} onLogoRelease={onLogoRelease}>
      <div style={{ width:320, height:660, background:"#F7F4EC", borderRadius:30, border:"7px solid #1C1A16", overflow:"hidden", boxShadow:"0 18px 30px -12px rgba(0,0,0,.4)", display:"flex", flexDirection:"column" }}>
        {screen !== "feed" && screen !== "admin" && <StatusBar />}
        <div style={{ flex:1, overflow:"hidden", position:"relative" }}>{body}</div>
        {screen !== "admin" && <TabBar active={screen} onNavigate={setScreen} />}
      </div>

      {showPinModal && (
        <div style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(0,0,0,.88)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"#1C1A16", borderRadius:20, padding:"28px 24px", width:240, textAlign:"center", border:"1px solid rgba(255,255,255,.1)" }}>
            <Logo size={18} dark={true} />
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:"#E2462B", letterSpacing:".12em", margin:"10px 0 22px" }}>ACCÈS RESTREINT</div>
            <div style={{ display:"flex", justifyContent:"center", gap:14, marginBottom:24 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ width:13, height:13, borderRadius:"50%", background: pin.length > i ? (pinError ? "#E2462B" : "#F5C518") : "rgba(255,255,255,.15)", transition:"background .15s" }} />
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:10 }}>
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} onClick={() => addDigit(String(n))} style={{ background:"rgba(255,255,255,.09)", border:"none", borderRadius:10, height:46, color:"#F7F4EC", fontSize:19, fontWeight:700, cursor:"pointer" }}>{n}</button>
              ))}
              <button onClick={() => { setShowPinModal(false); setPin(""); }} style={{ background:"rgba(255,255,255,.04)", border:"none", borderRadius:10, height:46, color:"rgba(255,255,255,.35)", fontSize:11, cursor:"pointer" }}>✕</button>
              <button onClick={() => addDigit("0")} style={{ background:"rgba(255,255,255,.09)", border:"none", borderRadius:10, height:46, color:"#F7F4EC", fontSize:19, fontWeight:700, cursor:"pointer" }}>0</button>
              <button onClick={() => setPin(p => p.slice(0,-1))} style={{ background:"rgba(255,255,255,.04)", border:"none", borderRadius:10, height:46, color:"rgba(255,255,255,.45)", fontSize:17, cursor:"pointer" }}>⌫</button>
            </div>
            {pinError && <div style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:"#E2462B" }}>Code incorrect</div>}
          </div>
        </div>
      )}
    </Wrapper>
  );
}

// ---------- Wrapper commun ----------
function Wrapper({ children, onLogoPress, onLogoRelease }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"#1C1A16", fontFamily:"Manrope, sans-serif", flexDirection:"column", gap:20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,700;9..144,1,700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        input:focus { outline: 2px solid #E2462B; }
        button:active { opacity: 0.75; }
      `}</style>
      <div
        onMouseDown={onLogoPress} onMouseUp={onLogoRelease} onMouseLeave={onLogoRelease}
        onTouchStart={onLogoPress} onTouchEnd={onLogoRelease}
        style={{ cursor:"default", userSelect:"none" }}
      >
        <Logo size={32} dark={true} />
      </div>
      {children}
    </div>
  );
}
