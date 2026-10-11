import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export default function Header() {
  return <>
    <a className="skip-link" href="#main-content">Перейти к содержимому</a>
    <header className="site-header">
      <div className="utility-bar"><div className="container utility-inner">
        <span>FROM SEOUL, WITH A POINT OF VIEW</span>
        <span>НЕЗАВИСИМЫЙ ЖУРНАЛ О КОРЕЙСКОМ СТИЛЕ <span aria-hidden="true">✦</span> RU</span>
      </div></div>
      <div className="container brand-row">
        <span className="brand-aside">K-BEAUTY<br/>K-FASHION<br/>K-CULTURE</span>
        <Link href="/" className="logo" aria-label="SEOUL EDIT — главная">SEOUL<span>EDIT</span><i aria-hidden="true">✳</i></Link>
        <span className="brand-aside brand-aside--right">THE KOREAN EDIT<br/>VOL. 01 / 2026<br/>ONLINE EDITION</span>
        <Link href="/search" className="mobile-header-search" aria-label="Поиск по журналу">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>
        </Link>
      </div>
      <div className="nav-shell"><div className="container nav-inner">
        <nav aria-label="Главное меню">
          <Link href="/">Главная</Link>
          <Link href="/beauty">Красота</Link>
          <Link href="/fashion">Мода</Link>
          <Link href="/trends">Тренды</Link>
          <Link href="/match" className="match-nav-link">✳ SEOUL MATCH</Link>
        </nav>
        <span className="nav-caption">YOUR DAILY DOSE OF SEOUL</span>
        <Link href="/search" className="search-link" aria-label="Перейти к поиску">Поиск <span aria-hidden="true">⌕</span></Link>
      </div></div>
    </header>
    <MobileNav/>
  </>;
}
