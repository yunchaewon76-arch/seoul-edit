import type {Metadata} from "next";
import Link from "next/link";
import AskExplorer from "@/components/AskExplorer";
export const metadata:Metadata={title:"ASK SEOUL — вопросы о Корее",description:"Вопросы о корейской косметике и моде с объяснениями, исследованиями и проверяемыми источниками."};
export default function AskPage(){
 return <div className="container ask-page">
  <nav className="match-crumbs" aria-label="Навигационная цепочка"><Link href="/">Главная</Link><span>/</span><span>ASK SEOUL</span></nav>
  <header className="ask-page-head"><span className="eyebrow">YOU ASK / WE INVESTIGATE</span><h1>ASK <em>SEOUL.</em></h1>
   <p>Не принимайте вирусный тренд на веру. Начните с вопроса — и посмотрите, что показывают первоисточники.</p>
   <span className="ask-page-label">РЕДАКЦИОННЫЕ ВОПРОСЫ И ОТВЕТЫ · BETA</span>
  </header>
  <AskExplorer/>
 </div>;
}
