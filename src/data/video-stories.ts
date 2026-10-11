import initialVideos from "./creator-videos.json";
/** The editorial archive uses a human-editable JSON source of truth. */
export type VideoCategory="beauty"|"fashion"|"trends";
export type VideoStory={
 slug:string;youtubeId:string;headline:string;originalTitle:string|null;creator:string|null;
 category:VideoCategory|null;reviewStatus:"identified"|"pending";publishedAt:string|null;
 deck:string;takeaways:string[];sourceNote:string;sourceUrl:string|null;linkedProducts:string[];
};
export const videoCategoryLabels:Record<VideoCategory,string>={beauty:"Красота",fashion:"Мода",trends:"Тренды"};
const validId=(s:string)=>/^[a-zA-Z0-9_-]{11}$/.test(s);
export const videoStories:VideoStory[]=(initialVideos as VideoStory[])
 .filter(s=>validId(s.youtubeId)&&!!s.slug&&!!s.headline)
 .map(s=>({...s,category:s.reviewStatus==="identified"?s.category:null}));
export const findVideoStory=(slug:string)=>videoStories.find(s=>s.slug===slug);
export const videoYouTubeUrl=(id:string)=>"https://www.youtube.com/watch?v="+id;
export const videoThumbnail=(id:string)=>"https://i.ytimg.com/vi/"+id+"/hqdefault.jpg";
export const videosInCategory=(category:VideoCategory)=>videoStories.filter(s=>s.category===category&&s.reviewStatus==="identified");
export const countVideos=(category:VideoCategory|"all")=>category==="all"?videoStories.length:videosInCategory(category).length;
