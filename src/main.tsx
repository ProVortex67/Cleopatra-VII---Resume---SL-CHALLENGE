import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ChevronDown, Crown, Eye, Gem, Globe2, Menu, Shield, Sparkles, X } from 'lucide-react';
import './styles.css';

const achievements = [
  ['51 BCE', 'Assumed the throne', 'Became co-ruler of Ptolemaic Egypt and inherited a politically fragile kingdom.'],
  ['48 BCE', 'Restored strategic position', 'Returned to Alexandria and rebuilt power through diplomacy, alliances and decisive action.'],
  ['41 BCE', 'Eastern Mediterranean alliance', 'Forged a high-impact political and economic partnership with Mark Antony.'],
  ['30 BCE', 'Legacy secured', 'Ended an era while leaving an enduring cultural and political imprint.'],
];

const skills = ['Diplomacy', 'Coalition building', 'Crisis leadership', 'Economic strategy', 'Public narrative', 'Cultural fluency', 'Negotiation', 'Political intelligence'];

function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('profile');
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const assessment = useMemo(() => [
    ['Strategic vision', 94], ['Influence & communication', 97], ['Resilience', 95], ['Alliance management', 96], ['Economic leadership', 89]
  ], []);

  const go = (id: string) => { setActive(id); setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return <div className="site">
    <div className="grain" aria-hidden="true" />
    <header className="nav">
      <a className="brand" href="#top" onClick={() => setActive('profile')}><span className="brand-mark">𓂀</span><span>CLEOPATRA <b>VII</b></span></a>
      <nav className={menu ? 'navlinks open' : 'navlinks'} aria-label="Primary navigation">
        {['profile','achievements','leadership','assessment'].map(id => <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>{id}</button>)}
      </nav>
      <button className="menu" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>

    <main id="top">
      <section id="profile" className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> EXECUTIVE DOSSIER · ALEXANDRIA</p>
          <h1>Cleopatra <em>VII</em></h1>
          <p className="dek">Sovereign. Strategist. Diplomat.<br />A study in leadership under pressure.</p>
          <div className="hero-actions"><button className="gold-btn" onClick={() => go('assessment')}>View modern assessment <ArrowUpRight size={17} /></button><button className="text-btn" onClick={() => go('achievements')}>Explore the record <ChevronDown size={16} /></button></div>
          <div className="metrics"><div><strong>21</strong><span>years of rule</span></div><div><strong>8</strong><span>languages attributed</span></div><div><strong>∞</strong><span>cultural influence</span></div></div>
        </div>
        <div className="portrait-wrap reveal" aria-label="Stylized portrait illustration of Cleopatra VII">
          <div className="halo" /><div className="portrait"><div className="crown">𓂀</div><div className="face"><div className="eye e1" /><div className="eye e2" /><div className="nose" /><div className="neck" /></div><div className="collar">◇ ◇ ◇ ◇ ◇</div></div>
          <div className="seal"><Crown size={16} /><span>ROYAL<br />ARCHIVE</span></div>
        </div>
      </section>

      <section className="quote reveal"><span>“</span><blockquote>She understood that power is not only inherited — it is negotiated, communicated, and continuously earned.</blockquote><cite>MODERN EXECUTIVE INTERPRETATION</cite></section>

      <section id="achievements" className="section reveal"><div className="section-head"><p className="eyebrow">01 · TRACK RECORD</p><h2>Results that <em>changed the map.</em></h2><p>From succession crisis to regional power, Cleopatra's career is a case study in converting volatility into leverage.</p></div><div className="timeline">{achievements.map(([year,title,body], i) => <article className="achievement" key={year}><div className="year">{year}</div><div className="dot">0{i+1}</div><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>

      <section id="leadership" className="dark-panel reveal"><div className="panel-intro"><p className="eyebrow">02 · LEADERSHIP STYLE</p><h2>High-context.<br /><em>High conviction.</em></h2><p>Her leadership blended symbolic authority with practical statecraft: know the room, shape the narrative, then make the deal.</p></div><div className="principles"><article><span>01</span><Gem /><h3>Strategic intimacy</h3><p>Built relationships at the highest level and treated alliances as living systems, not transactions.</p></article><article><span>02</span><Globe2 /><h3>Cultural fluency</h3><p>Moved between Egyptian, Greek and Roman worlds with unusual linguistic and diplomatic range.</p></article><article><span>03</span><Shield /><h3>Resilient authority</h3><p>Returned from exile, civil conflict and economic pressure with a renewed mandate to lead.</p></article></div></section>

      <section className="section reveal"><div className="section-head"><p className="eyebrow">03 · CORE CAPABILITIES</p><h2>A sovereign's <em>toolkit.</em></h2></div><div className="skills">{skills.map((s,i)=><span key={s}><b>0{i+1}</b>{s}</span>)}</div></section>

      <section id="assessment" className="assessment reveal"><div><p className="eyebrow">04 · CEO ASSESSMENT · 2026 LENS</p><h2>Would she thrive<br />in a <em>modern C-suite?</em></h2><p>Remove the crown and the fundamentals remain: stakeholder management, asymmetric negotiation, crisis response and an instinct for narrative.</p><button className="outline-btn" onClick={() => setReveal(!reveal)}><Sparkles size={16} /> {reveal ? 'Assessment active' : 'Activate assessment'}</button></div><div className="score-card"><div className="score-top"><span>EXECUTIVE INDEX</span><strong>94<span>/100</span></strong></div>{assessment.map(([label,val])=><div className="bar" key={label}><div><span>{label}</span><b>{val}</b></div><i><i style={{ width: `${val}%` }} /></i></div>)}<p className="verdict"><Eye size={15} /> Verdict: <b>Exceptional operator</b> · best deployed in high-stakes transformation.</p></div></section>

      <section className="challenges reveal"><div><p className="eyebrow">05 · CHALLENGES</p><h2>Leadership is never<br /><em>without a cost.</em></h2></div><div className="challenge-grid"><p><b>01</b> Navigating Rome's expansion while preserving Egyptian sovereignty.</p><p><b>02</b> Managing succession, internal legitimacy and a volatile elite.</p><p><b>03</b> Balancing economic pressure with the demands of war and diplomacy.</p></div></section>

      <section className="disclosure"><Sparkles size={17} /><div><b>AI-use disclosure</b><p>This interactive presentation was developed with AI assistance for research synthesis, copy structuring and front-end implementation. Historical claims are presented as an executive interpretation, not a substitute for primary-source scholarship.</p></div></section>
    </main>
    <footer><span>𓂀 CLEOPATRA VII · EXECUTIVE ARCHIVE</span><span>DESIGNED FOR THE SL CHALLENGE · 2026</span></footer>
  </div>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
