import Link from "next/link";
export default function Footer(){
 return <footer className="footer"><div className="container footer-inner">
  <div className="footer-top"><div><span className="eyebrow">THE KOREAN EDIT / SOURCE-FIRST JOURNALISM</span><div className="footer-logo">SEOUL<span>EDIT</span><i aria-hidden="true">✳</i></div></div><p>Не просто тренды. Настоящая Корея — с контекстом.<br/>Русскоязычный независимый редакционный проект.</p></div>
  <div className="footer-bottom"><span>© 2026 SEOUL EDIT · ПИЛОТНАЯ РЕДАКЦИЯ</span><nav aria-label="Навигация в подвале"><Link href="/signal">SEOUL SIGNAL</Link><Link href="/beauty">Красота</Link><Link href="/fashion">Мода</Link><Link href="/trends">Тренды</Link><Link href="/video">CREATOR WATCH</Link><Link href="/ask">ASK SEOUL</Link><Link href="/search">Поиск</Link></nav><Link href="#top">Наверх ↑</Link></div>
 </div></footer>;
}
