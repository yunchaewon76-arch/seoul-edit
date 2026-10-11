import Link from "next/link";
export default function Footer() { return <footer className="footer"><div className="container footer-inner">
 <div className="footer-top"><div><span className="eyebrow">THE KOREAN EDIT / VOL. 01</span><div className="footer-logo">SEOUL<span>EDIT</span><i aria-hidden="true">✳</i></div></div><p>Корея ближе, чем кажется.<br/>О красоте, моде и современной культуре — по-русски.</p></div>
 <div className="footer-bottom"><span>© 2026 SEOUL EDIT · ДЕМОНСТРАЦИОННАЯ ВЕРСИЯ</span><nav aria-label="Навигация в подвале"><Link href="/beauty">Красота</Link><Link href="/fashion">Мода</Link><Link href="/trends">Тренды</Link><Link href="/search">Поиск</Link></nav><Link href="#top">Наверх ↑</Link></div>
 </div></footer>; }
