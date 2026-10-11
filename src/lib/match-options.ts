export type Concern = "hydration" | "comfort" | "makeup";
export type Budget = "under1000" | "1000to3000" | "over3000";
export type MatchCity = "moscow" | "saintPetersburg" | "other";
export type MatchPreferences = { concern:Concern; budget:Budget; city:MatchCity };
export const concernOptions: {value:Concern;title:string;subtitle:string}[] = [
 {value:"hydration",title:"Увлажнение",subtitle:"Увлажняющий уход и комфорт"},
 {value:"comfort",title:"Бережный уход",subtitle:"Мягкие текстуры и комфорт кожи"},
 {value:"makeup",title:"Макияж",subtitle:"Оттенки, текстуры и финиши"}
];
export const budgetOptions: {value:Budget;title:string;subtitle:string}[] = [
 {value:"under1000",title:"До 1 000 ₽",subtitle:"Бюджет до тысячи рублей"},
 {value:"1000to3000",title:"1 000–3 000 ₽",subtitle:"Средний ценовой диапазон"},
 {value:"over3000",title:"Более 3 000 ₽",subtitle:"Выше трёх тысяч рублей"}
];
export const cityOptions: {value:MatchCity;title:string;subtitle:string}[] = [
 {value:"moscow",title:"Москва",subtitle:"Предложения, проверенные для Москвы"},
 {value:"saintPetersburg",title:"Санкт-Петербург",subtitle:"Предложения для Санкт-Петербурга"},
 {value:"other",title:"Другой город",subtitle:"Региональная проверка ещё не поддерживается"}
];
export const labelFor=(items:readonly {value:string;title:string}[],value:string)=>items.find(item=>item.value===value)?.title??"";
