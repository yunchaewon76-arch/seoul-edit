import type { Article } from "@/data/articles";
/** Visual mood images from Unsplash. Illustrations only, not direct event/product evidence. */
const covers:Record<string,{src:string;alt:string;credit:string}>={
 "hwahae-2026-what-rankings-tell-us":{src:"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1400&q=85",alt:"Иллюстративная косметическая композиция",credit:"Unsplash · иллюстрация"},
 "olive-young-awards-2025-how-to-read":{src:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85",alt:"Иллюстрация ухода за кожей, не официальный снимок победителей",credit:"Unsplash · иллюстрация"},
 "pdrn-what-science-actually-knows":{src:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",alt:"Студийный бьюти-портрет, иллюстрация",credit:"Unsplash · иллюстрация"},
 "korean-routine-russian-winter":{src:"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1400&q=85",alt:"Иллюстративная фотография увлажняющих средств",credit:"Unsplash · иллюстрация"},
 "seoul-fashion-week-2027-city-festival":{src:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",alt:"Иллюстративная фотография моды, не снимок Seoul Fashion Week",credit:"Unsplash · иллюстрация"},
 "k-fashion-five-brands-milan-2026":{src:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=85",alt:"Иллюстрация дизайнерской одежды, не коллекции упомянутых марок",credit:"Unsplash · иллюстрация"},
 "street-style-vs-real-seoul":{src:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",alt:"Иллюстративный стритстайл образ, не фотография Сеула",credit:"Unsplash · иллюстрация"},
 "global-kbeauty-local-korea":{src:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",alt:"Иллюстративный бьюти-портрет",credit:"Unsplash · иллюстрация"},
 "ten-step-routine-what-is-necessary":{src:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85",alt:"Иллюстрация базового ухода за кожей",credit:"Unsplash · иллюстрация"}
};
export const photoFor=(story:Article)=>covers[story.slug]??covers["hwahae-2026-what-rankings-tell-us"];
