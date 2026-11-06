import React from 'react';
import { createRoot } from 'react-dom/client';
import { ShieldCheck, Terminal, Network, BookOpen, FileSearch, Activity } from 'lucide-react';
import './style.css';

const modules = [
  { icon: Terminal, name: 'Terminal Lab', desc: 'Console pédagogique et historique', state: 'Démo disponible' },
  { icon: ShieldCheck, name: 'Metasploit Center', desc: 'Documentation, modules et paramètres', state: 'À connecter au lab' },
  { icon: Network, name: 'Network Lab', desc: 'Inventaire des actifs autorisés', state: 'À configurer' },
  { icon: FileSearch, name: 'PCAP Analyzer', desc: 'Analyse hors ligne de captures', state: 'Planifié' },
  { icon: BookOpen, name: 'CVE Library', desc: 'Référentiel et suivi des vulnérabilités', state: 'Planifié' },
  { icon: Activity, name: 'Security Reports', desc: 'Historique et rapports de laboratoire', state: 'Planifié' }
];

function App() {
  const [output, setOutput] = React.useState('CYBERLAB MR1 — console pédagogique\nTapez help pour afficher les commandes disponibles.');
  const [cmd, setCmd] = React.useState('');
  async function runDemo(e) {
    e.preventDefault();
    try {
      const r = await fetch('http://127.0.0.1:8000/api/terminal/demo', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({command: cmd})
      });
      const data = await r.json();
      setOutput(old => old + '\n$ ' + cmd + '\n' + (data.output || data.detail || ''));
    } catch {
      setOutput(old => old + '\nAPI indisponible — démarrez le backend FastAPI.');
    }
    setCmd('');
  }
  return <main className="shell">
    <header><div className="brand"><span className="mark"><ShieldCheck size={22}/></span><div><b>CYBERLAB <em>MR1</em></b><small>MOBILE SECURITY LAB</small></div></div><span className="pill">● LAB OFFLINE</span></header>
    <section className="hero"><p className="eyebrow">AUTHORIZED SECURITY ENVIRONMENT</p><h1>Control your<br/><span>cyber lab.</span></h1><p className="sub">Un espace de travail mobile pour apprendre, auditer et documenter la sécurité de tes propres environnements.</p></section>
    <section className="section"><div className="section-title"><h2>Modules</h2><span>01 / 06</span></div><div className="cards">{modules.map(({icon:Icon,name,desc,state})=><article className="card" key={name}><div className="card-icon"><Icon size={20}/></div><h3>{name}</h3><p>{desc}</p><small>{state}</small></article>)}</div></section>
    <section className="section terminal"><div className="section-title"><h2><Terminal size={17}/> Terminal pédagogique</h2><span>SAFE DEMO</span></div><pre>{output}</pre><form onSubmit={runDemo}><span>$</span><input value={cmd} onChange={e=>setCmd(e.target.value)} placeholder="help / status / whoami" aria-label="Commande pédagogique"/><button>Run</button></form><p className="hint">Cette console est une démonstration locale. Elle n'exécute aucune commande système ni action réseau.</p></section>
    <footer>CYBERLAB MR1 <span>BUILD 0.1.0 · SECURITY FIRST</span></footer>
  </main>;
}
createRoot(document.getElementById('root')).render(<App/>);
