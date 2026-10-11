"use client";
import {useState,type FormEvent} from "react";
import {concernOptions,budgetOptions,cityOptions,labelFor,type Concern,type Budget,type MatchCity} from "@/lib/match-options";
import {findVerifiedProducts} from "@/lib/match-products";

const progressLabels=["Интерес","Бюджет","Город"];
export default function MatchFinder(){
 const [step,setStep]=useState(0);
 const [concern,setConcern]=useState<Concern>("hydration");
 const [budget,setBudget]=useState<Budget>("1000to3000");
 const [city,setCity]=useState<MatchCity>("moscow");
 const done=step===3;
 const choices=step===0?concernOptions:step===1?budgetOptions:cityOptions;
 const selected=step===0?concern:step===1?budget:city;
 const results=done?findVerifiedProducts({concern,budget,city}):[];
 const choose=(value:string)=>{
  if(step===0)setConcern(value as Concern);
  if(step===1)setBudget(value as Budget);
  if(step===2)setCity(value as MatchCity);
 };
 const next=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();setStep(current=>Math.min(3,current+1));};
 return <div className="match-app">
  <div className="match-steps" aria-label="Этапы подбора">
   {progressLabels.map((label,i)=><div key={label} className={"match-step"+(step===i?" active":"")+(step>i?" complete":"")}>
    <span>0{i+1}</span><span>{label}</span></div>)}
  </div>
  {!done?
  <form className="match-form" onSubmit={next}>
   <span className="match-eyebrow">ВОПРОС {step+1} ИЗ 3</span>
   <h2>{step===0?"Что вам интересно?":step===1?"Какой бюджет удобен?":"В каком городе ищем?"}</h2>
   <p className="match-helper">{step===0?"Начнём с того, что вы хотите найти. Это не медицинская диагностика.":step===1?"Покажем только предложения с недавно проверенной ценой в вашем диапазоне.":"Мы не заявляем наличие товаров без проверки у продавца."}</p>
   <fieldset className="match-options"><legend className="sr-only">Выберите один вариант</legend>
    {choices.map(choice=><label key={choice.value} className={"match-option"+(selected===choice.value?" selected":"")}>
     <input type="radio" name={"match-step-"+step} value={choice.value} checked={selected===choice.value} onChange={()=>choose(choice.value)}/>
     <span className="match-option-text"><strong>{choice.title}</strong><small>{choice.subtitle}</small></span>
     <span className="match-option-end" aria-hidden="true">{selected===choice.value?"✓":"↗"}</span>
    </label>)}
   </fieldset>
   <div className="match-buttons">
    <button className="match-back" type="button" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}>← Назад</button>
    <button type="submit" className="match-button">{step===2?"Показать результат":"Продолжить"} <span aria-hidden="true">→</span></button>
   </div>
  </form>:
  <section className="match-result" aria-live="polite" aria-labelledby="match-result-title">
   <span className="match-eyebrow">ВАШ SEOUL MATCH / БЕТА</span>
   <h2 id="match-result-title">Ваша подборка</h2>
   <div className="match-summary" aria-label="Выбранные параметры">
    <span>{labelFor(concernOptions,concern)}</span>
    <span>{labelFor(budgetOptions,budget)}</span>
    <span>{labelFor(cityOptions,city)}</span>
   </div>
   {results.length>0?
    <div className="match-product-list">
     <p className="match-helper">Здесь только проверенные страницы и цены для выбранного города. Наличие уточняйте у продавца.</p>
     {results.map(product=><article key={product.id} className="match-product">
      <div><small>{product.kind==="alternative"?"Проверенная альтернатива":"Проверенная карточка товара"}</small>
       <h3>{product.brand} — {product.name}</h3><p>{product.editorialReason}</p>
       {product.kind==="alternative"&&<p><strong>Вместо:</strong> {product.originalProductName}. {product.differenceNote}</p>}
       <p className="match-date">Страница: {product.productPageCheckedAt} · Цена: {product.priceCheckedAt}</p>
      </div>
      <div className="match-buy"><b>{new Intl.NumberFormat("ru-RU").format(product.priceRub)} ₽</b>
       <a href={product.goldenAppleUrl} target="_blank" rel="noopener noreferrer" className="match-button">Открыть в Золотом Яблоке ↗</a><small>Наличие не подтверждено</small></div>
     </article>)}
    </div>:
    <div className="match-empty">
     <span className="match-flower" aria-hidden="true">✳</span>
     <h3>{city==="other"?"Для других городов подбор пока не настроен.":"Для этих параметров пока нет проверенных товаров."}</h3>
     <p>{city==="other"?"Мы пока не можем достоверно сопоставить цены и условия для вашего региона.":"Мы не придумываем товары, цены, наличие или персональные рекомендации. Подборка появится после ручной проверки для выбранного города и бюджета."}</p>
     <div className="match-notice"><strong>Важно</strong><span>Даже проверенная ссылка не означает наличие товара. Проверяйте актуальную цену, доставку и остатки непосредственно в магазине.</span></div>
    </div>}
   <div className="match-buttons">
    <button type="button" className="match-back" onClick={()=>setStep(2)}>← Изменить город</button>
    <button type="button" className="match-button" onClick={()=>setStep(0)}>Пройти заново ↗</button>
   </div>
  </section>}
 </div>;
}
