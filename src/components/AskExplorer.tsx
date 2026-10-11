"use client";
import {useState} from "react";
import Link from "next/link";
const questions=[
 {topic:"Красота",question:"Что на самом деле означают рейтинги косметики в Корее?",answer:"Они отражают методику и аудиторию конкретной платформы. Прежде чем назвать товар «самым популярным», нужно уточнить категорию, период и источник.",href:"/article/hwahae-2026-what-rankings-tell-us"},
 {topic:"Красота",question:"Правда ли, что PDRN в сыворотке работает так же, как в процедуре?",answer:"Нет оснований автоматически приравнивать косметическое средство к инъекционному протоколу. Исследования отличаются составами, дозировками и способами применения.",href:"/article/pdrn-what-science-actually-knows"},
 {topic:"Красота",question:"Нужны ли десять шагов для корейского ухода?",answer:"Фиксированное число шагов не является медицинским стандартом. Уход лучше выбирать по задаче, переносимости и качеству доказательств.",href:"/article/ten-step-routine-what-is-necessary"},
 {topic:"Мода",question:"То, что мы видим на Seoul Fashion Week, носят каждый день?",answer:"Снимки гостей недели моды показывают специально отобранные для модного мероприятия образы. Они вдохновляют, но не представляют всех жителей Сеула.",href:"/article/street-style-vs-real-seoul"},
 {topic:"Мода",question:"Какие корейские дизайнеры выходят на мировую сцену?",answer:"В феврале 2026 года власти Сеула назвали пять отобранных брендов для проекта выхода на миланские площадки. Это история о развитии индустрии, не о доказанном успехе продаж.",href:"/article/k-fashion-five-brands-milan-2026"},
 {topic:"Тренды",question:"Если бренд популярен за рубежом, он обязательно лидер в Корее?",answer:"Не обязательно. Международный спрос, экспортная статистика, рейтинги местных магазинов и рекламные охваты измеряют разные процессы.",href:"/article/global-kbeauty-local-korea"}
];
export default function AskExplorer(){
 const [query,setQuery]=useState("");
 const [selected,setSelected]=useState("Все");
 const [expanded,setExpanded]=useState<number|null>(0);
 const [draft,setDraft]=useState("");
 const [copyStatus,setCopyStatus]=useState("");
 const filtered=questions.map((q,i)=>({...q,index:i})).filter(q=>(selected==="Все"||q.topic===selected)&&
 (q.question+" "+q.answer).toLocaleLowerCase("ru-RU").includes(query.toLocaleLowerCase("ru-RU").trim()));
 async function copyQuestion(){
  if(!draft.trim())return;
  try{await navigator.clipboard.writeText(draft.trim());setCopyStatus("Вопрос скопирован. Отправка в редакцию пока не подключена.");}
  catch{setCopyStatus("Не удалось скопировать. Вы можете выделить и скопировать текст вручную.");}
 }
 return <div className="ask-explorer">
   <div className="ask-filters"><label className="ask-search-label">
      <span>Найти ответ</span>
      <input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Например, PDRN, уход, Сеул..." />
    </label>
    <div className="ask-filter-list" aria-label="Темы вопросов">
      {["Все","Красота","Мода","Тренды"].map(topic=><button key={topic} type="button" className={selected===topic?"active":""} onClick={()=>setSelected(topic)} aria-pressed={selected===topic}>{topic}</button>)}
    </div>
   </div>
   <div className="ask-question-list">{filtered.length?filtered.map(q=><div className="ask-question" key={q.index}>
    <button type="button" className="ask-question-button" aria-expanded={expanded===q.index} onClick={()=>setExpanded(expanded===q.index?null:q.index)}>
     <span>{String(q.index+1).padStart(2,"0")}</span><strong>{q.question}</strong><span aria-hidden="true">{expanded===q.index?"−":"+"}</span>
    </button>
    {expanded===q.index&&<div className="ask-answer"><p>{q.answer}</p><Link href={q.href}>Читать разбор с источниками ↗</Link></div>}
   </div>):<div className="ask-no-results">По такому запросу пока нет ответа. Попробуйте другую формулировку.</div>}</div>
   <section className="ask-composer"><div><span className="eyebrow">WHAT SHOULD WE INVESTIGATE NEXT?</span><h2>Какой вопрос <em>вы бы задали?</em></h2><p>Сформулируйте идею для будущего материала. Пока мы готовим форму приёма обращений, вы можете написать и скопировать вопрос — он никуда не отправится автоматически.</p></div>
    <div className="ask-compose-form"><label htmlFor="ask-draft">Ваш вопрос</label><textarea id="ask-draft" value={draft} onChange={e=>{setDraft(e.target.value);setCopyStatus("");}} placeholder="Что вы хотите узнать о настоящих трендах Кореи?" maxLength={700} rows={5}/>
     <button type="button" disabled={!draft.trim()} onClick={copyQuestion}>Скопировать вопрос ↗</button>
     <small role="status" aria-live="polite">{copyStatus||"Эта версия не принимает сообщения и не сохраняет введённый текст."}</small>
    </div>
   </section>
 </div>;
}
