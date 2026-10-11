import type {Metadata} from "next";
import Link from "next/link";
import MatchFinder from "@/components/MatchFinder";
export const metadata:Metadata={
 title:"SEOUL MATCH — тренды для вас",
 description:"Выберите интерес, бюджет и город. SEOUL MATCH показывает только редакционно проверенные предложения без обещаний наличия."
};
export default function MatchPage(){
 return <div className="container match-page">
  <nav className="match-crumbs" aria-label="Навигационная цепочка"><Link href="/">Главная</Link><span aria-hidden="true">/</span><span>SEOUL MATCH</span></nav>
  <header className="match-hero">
   <div><span className="match-eyebrow">✳ YOUR KOREAN BEAUTY COMPASS</span>
    <h1>Корейские тренды.<br/><em>Твой выбор.</em></h1>
    <p>Три вопроса о ваших интересах, бюджете и городе. Мы показываем только проверенные ссылки и объясняем, чем альтернативы отличаются от оригинала.</p>
    <span className="match-beta">BETA · БАЗА ТОВАРОВ ФОРМИРУЕТСЯ</span>
   </div>
   <div className="match-hero-art" aria-hidden="true"><span>SEOUL<br/><i>MATCH</i></span><b>✳</b><small>EDIT YOUR BEAUTY / 001</small></div>
  </header>
  <MatchFinder/>
  <section className="match-method" aria-labelledby="match-method-title">
   <div><span className="match-eyebrow">EDITORIAL PROMISE</span><h2 id="match-method-title">Честно о подборе.</h2></div>
   <div className="match-method-grid">
    <div><strong>01 / Только проверенные товары</strong><p>Если не подтверждены карточка товара и цена в городе, рекомендация не появляется.</p></div>
    <div><strong>02 / Наличие — у магазина</strong><p>Проверенная ссылка не гарантирует наличие или доставку в ваш город.</p></div>
    <div><strong>03 / Никаких медицинских обещаний</strong><p>Подборка не диагностирует состояние кожи и не гарантирует эффект косметики.</p></div>
    <div><strong>04 / Без анкеты и профиля</strong><p>Ответы остаются только в текущем интерфейсе и не сохраняются на сервере.</p></div>
   </div>
  </section>
 </div>;
}
