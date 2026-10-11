import Link from "next/link";
export default function Header() {
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="logo" aria-label="SEOUL EDIT — главная">SEOUL<span>EDIT</span></Link>
    <nav aria-label="Главное меню"><Link href="/beauty">Красота</Link><Link href="/fashion">Мода</Link><Link href="/trends">Тренды</Link></nav>
    <Link href="/search" className="search-link" aria-label="Поиск">Поиск ↗</Link>
  </div></header>;
}
