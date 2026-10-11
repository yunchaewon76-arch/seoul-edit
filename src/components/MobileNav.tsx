"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TabIconName = "home" | "beauty" | "fashion" | "trends" | "match";
const tabs: { href: string; label: string; icon: TabIconName }[] = [
  { href: "/", label: "Главная", icon: "home" },
  { href: "/beauty", label: "Красота", icon: "beauty" },
  { href: "/match", label: "MATCH", icon: "match" },
  { href: "/fashion", label: "Мода", icon: "fashion" },
  { href: "/trends", label: "Тренды", icon: "trends" },
];

function TabIcon({ name }: { name: TabIconName }) {
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="22" height="22"
    fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    {name === "home" && <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"/><path d="M9 21v-8h6v8"/></>}
    {name === "beauty" && <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>}
    {name === "fashion" && <><path d="M9 5.5a3 3 0 0 1 6 0c0 1.5-1.5 2-3 3v2"/><path d="m12 10.5 9 7a2 2 0 0 1-1.2 3.5H4.2A2 2 0 0 1 3 17.5l9-7Z"/></>}
    {name === "trends" && <><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 8h8M8 12h8M8 16h5"/></>}
    {name === "match" && <><path d="m12 2 2.1 7.9L22 12l-7.9 2.1L12 22l-2.1-7.9L2 12l7.9-2.1L12 2Z"/><circle cx="12" cy="12" r="2"/></>}
  </svg>;
}

export default function MobileNav() {
  const path = usePathname();
  return <nav className="mobile-bottom-nav" aria-label="Мобильная навигация">
    <div className="mobile-bottom-inner">
      {tabs.map(tab => {
        const active = path === tab.href;
        return <Link key={tab.href} className={"mobile-tab" + (active ? " is-active" : "") + (tab.icon==="match" ? " mobile-tab--match" : "")}
          href={tab.href} aria-current={active ? "page" : undefined}>
          <TabIcon name={tab.icon} /><span>{tab.label}</span>
        </Link>;
      })}
    </div>
  </nav>;
}
