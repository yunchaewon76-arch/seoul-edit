/** Editorial video references. All identities/summaries must be checked against the video before full publication. */
export type VideoStory = {
 slug:string;
 youtubeId:string;
 headline:string;
 originalTitle:string|null;
 creator:string|null;
 category:"beauty"|"fashion";
 reviewStatus:"identified"|"pending";
 publishedAt:string|null;
 deck:string;
 takeaways:string[];
 sourceNote:string;
 linkedProducts:string[];
};
export const videoStories:VideoStory[]=[
 {
  slug:"taengkodok-ep03-taeyeon-eunchae",
  youtubeId:"QGcxSjKaRCs",
  headline:"Тэён и Хон Ынчэ: разговор о макияже в Taengkodok EP.03",
  originalTitle:"“화장을 모르느냐” 하지 마시고 | 탱코덕 EP.03",
  creator:"TAEYEON Official",
  category:"beauty",reviewStatus:"identified",publishedAt:"2026-05-03",
  deck:"Разбираем формат корейского бьюти-разговора: почему стоит слушать оригинал, а не воспринимать отдельный совет как универсальное правило.",
  takeaways:[
   "В открытых анонсах ролик обозначен как третий выпуск Taengkodok с участием Хон Ынчэ из LE SSERAFIM и Тэён. Тема связана с макияжем.",
   "Разговоры артистов о макияже — источник интересных наблюдений об эстетике и личных привычках, но не доказательство распространённости приёма среди всех женщин в Корее.",
   "Имена конкретных средств, оттенки и таймкоды в этой редакционной версии не публикуются: мы не смогли независимо сверить их по оригиналу."
  ],
  sourceNote:"Название, номер эпизода и участники подтверждены публичными анонсами выпуска; точный транскрипт и список средств редакцией не проверены.",
  linkedProducts:[]
 },
 {
  slug:"reader-video-02-under-review",
  youtubeId:"po4uyYWD4nY",
  headline:"Видео из подборки читателя №02 — редакционная проверка",
  originalTitle:null,creator:null,category:"beauty",reviewStatus:"pending",publishedAt:null,
  deck:"Второй оригинальный ролик из вашей подборки. Заголовок, автор, содержание и косметика пока не подтверждены независимой проверкой.",
  takeaways:[],
  sourceNote:"Ссылка получена от читателя. Не удалось надёжно подтвердить название, создателя и упомянутые продукты; редакционная статья появится после просмотра оригинала.",
  linkedProducts:[]
 }
];
export const findVideoStory=(slug:string)=>videoStories.find(s=>s.slug===slug);
export const videoYouTubeUrl=(id:string)=>"https://www.youtube.com/watch?v="+id;
export const videoThumbnail=(id:string)=>"https://i.ytimg.com/vi/"+id+"/hqdefault.jpg";
