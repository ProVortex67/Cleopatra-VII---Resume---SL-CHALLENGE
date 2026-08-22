import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown, Crown, Gem, Globe2, Menu, Shield, Sparkles, X } from 'lucide-react';
import './styles.css';

const achievements = [
  ['51 BCE', 'A contested succession', 'Entered the throne amid a succession crisis and immediately had to manage legitimacy, alliances and state finances.'],
  ['48 BCE', 'The return to Alexandria', 'Rebuilt political leverage through decisive action, diplomacy and an acute understanding of Roman power.'],
  ['41 BCE', 'A Mediterranean power network', 'Turned a high-stakes alliance into military, economic and regional influence.'],
  ['30 BCE', 'An enduring legacy', 'Left a cultural and political imprint that continues to shape how leadership and power are imagined.']
];
const skills = ['Diplomacy', 'Coalition building', 'Crisis leadership', 'Economic strategy', 'Narrative control', 'Cultural fluency', 'Negotiation', 'Political intelligence'];
const assessment = [['Strategic vision', 94], ['Influence & communication', 97], ['Resilience', 95], ['Alliance management', 96], ['Economic leadership', 89]];

function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('profile');
  const [assessmentActive, setAssessmentActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting && entry.target instanceof HTMLElement) entry.target.classList.add('visible');
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    const onScroll = () => setProgress(Math.min(100, Math.max(0, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const scores = useMemo(() => assessmentActive ? assessment : assessment.map(([label, value]) => [label, Math.round(Number(value) * .88)]), [assessmentActive]);
  const go = (id: string) => { setActive(id); setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return <div className="site">
    <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
    <div className="grain" aria-hidden="true" />
    <header className="nav">
      <a className="brand" href="#top" onClick={() => setActive('profile')} aria-label="Cleopatra VII home"><span className="brand-mark">𓂀</span><span>CLEOPATRA <b>VII</b></span></a>
      <nav className={menu ? 'navlinks open' : 'navlinks'} aria-label="Primary navigation">
        {['profile', 'achievements', 'leadership', 'assessment'].map(id => <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>{id}</button>)}
      </nav>
      <button className="menu" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>

    <main id="top">
      <section id="profile" className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> EXECUTIVE DOSSIER · ALEXANDRIA · 69—30 BCE</p>
          <p className="kicker">SOVEREIGN / STRATEGIST / DIPLOMAT</p>
          <h1>Cleopatra <em>VII</em></h1>
          <p className="dek">Leadership under pressure,<br />translated for the modern boardroom.</p>
          <div className="hero-actions"><button className="gold-btn" onClick={() => go('assessment')}>Read the executive assessment <ArrowUpRight size={16} /></button><button className="text-btn" onClick={() => go('achievements')}>Explore the record <ChevronDown size={15} /></button></div>
          <div className="metrics"><div><strong>21</strong><span>years of rule</span></div><div><strong>8</strong><span>languages attributed</span></div><div><strong>∞</strong><span>cultural influence</span></div></div>
        </div>
        <div className="portrait-wrap reveal" aria-label="Stylized editorial portrait of Cleopatra VII">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="halo" />
          <div className="portrait"><div className="crown">𓂀</div><div className="face"><div className="eye e1" /><div className="eye e2" /><div className="nose" /><div className="mouth" /></div><div className="hair" /></div>
          <div className="seal"><Crown size={15} /><span>ROYAL<br />ARCHIVE</span></div>
          <div className="portrait-note"><span>01</span><b>THE LAST<br />PTOLEMAIC</b></div>
        </div>
      </section>

      <section className="quote reveal"><div className="quote-line" /><span>“</span><blockquote>Power is not simply inherited. It is negotiated, communicated, and continuously earned.</blockquote><cite>MODERN EXECUTIVE INTERPRETATION</cite></section>

      <section id="achievements" className="section reveal">
        <div className="section-top"><p className="section-index">01 / 05</p><p className="eyebrow">TRACK RECORD</p></div>
        <div className="section-head"><h2>Results that <em>changed the map.</em></h2><p>A career defined by compressed timelines, high-stakes stakeholders and the ability to convert instability into leverage.</p></div>
        <div className="timeline">{achievements.map(([year, title, desc], i) => <article className="achievement" key={year}><div className="year">{year}</div><div className="timeline-index">0{i + 1}</div><div className="achievement-copy"><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight className="row-arrow" size={17} /></article>)}</div>
      </section>

      <section id="leadership" className="dark-panel reveal">
        <div className="panel-intro"><div className="section-top"><p className="section-index">02 / 05</p><p className="eyebrow">LEADERSHIP STYLE</p></div><h2>High-context.<br /><em>High conviction.</em></h2><p>Her edge was not one trait. It was the combination: cultural intelligence, personal presence, strategic patience and the willingness to act decisively when the window opened.</p></div>
        <div className="principles"><article><span>01</span><Shield /><h3>Resilient authority</h3><p>Survived exile, civil conflict and shifting Roman power without surrendering strategic agency.</p></article><article><span>02</span><Globe2 /><h3>Cultural fluency</h3><p>Used language, symbolism and local knowledge as instruments of diplomacy and statecraft.</p></article><article><span>03</span><Gem /><h3>Alliance architecture</h3><p>Built relationships around shared interests, incentives and timing rather than sentiment alone.</p></article></div>
      </section>

      <section className="section reveal capabilities"><div className="section-top"><p className="section-index">03 / 05</p><p className="eyebrow">CORE CAPABILITIES</p></div><div className="section-head"><h2>A sovereign's <em>toolkit.</em></h2><p>The executive capabilities that translate most clearly from ancient statecraft to modern leadership.</p></div><div className="skills">{skills.map((skill, i) => <span key={skill}><b>0{i + 1}</b>{skill}</span>)}</div></section>

      <section id="assessment" className="assessment reveal">
        <div className="assessment-copy"><div className="section-top"><p className="section-index">04 / 05</p><p className="eyebrow">CEO ASSESSMENT · 2026 LENS</p></div><h2>Would she thrive in a <em>modern C-suite?</em></h2><p>Strip away the crown and the fundamentals remain: stakeholder management, asymmetric negotiation, crisis response, economic judgment and an instinct for narrative.</p><button className="outline-btn" onClick={() => setAssessmentActive(!assessmentActive)}><Sparkles size={15} /> {assessmentActive ? 'Assessment active' : 'Activate assessment'}</button></div>
        <div className="score-card"><div className="score-top"><span>EXECUTIVE INDEX</span><strong>{assessmentActive ? 94 : 83}<small>/100</small></strong></div>{scores.map(([label, val]) => <div className="bar" key={label}><div><span>{label}</span><b>{val}</b></div><i><i style={{ width: `${val}%` }} /></i></div>)}<p className="verdict"><span>VERDICT</span> Exceptional operator · strongest in high-stakes transformation, diplomacy and coalition building.</p></div>
      </section>

      <section className="challenges reveal"><div><div className="section-top"><p className="section-index">05 / 05</p><p className="eyebrow">LEADERSHIP CHALLENGES</p></div><h2>Every advantage<br /><em>has a cost.</em></h2></div><div className="challenge-grid"><p><b>01</b><span>Roman expansion</span>Preserving Egyptian sovereignty while operating beside a superpower.</p><p><b>02</b><span>Succession pressure</span>Managing internal legitimacy while competing elites shaped the court.</p><p><b>03</b><span>Economic strain</span>Balancing fiscal pressure, military needs and the politics of stability.</p></div></section>

      <section className="closing reveal"><p className="eyebrow">THE EXECUTIVE TAKEAWAY</p><h2>Influence is a discipline.<br /><em>Not a title.</em></h2><p>Cleopatra's most transferable lesson is simple: understand the system, understand the people inside it, then create enough leverage to change the outcome.</p><button className="gold-btn" onClick={() => go('profile')}>Return to profile <ArrowUpRight size={16} /></button></section>
    </main>
    <footer><span>𓂀 CLEOPATRA VII · EXECUTIVE ARCHIVE</span><span>ALEXANDRIA · 2026 EDITION</span></footer>
  </div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
