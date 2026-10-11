import type { Article } from "@/data/articles";

/* Unsplash photos are temporary editorial imagery, not photos of
   real Korean products, Seoul trends, or people mentioned in the demos. */
const photos: Record<string, {src:string; alt:string; credit:string}> = {
  "k-beauty-simple-routine": {src:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",alt:"Студийный бьюти-портрет в мягком синем свете",credit:"Unsplash"},
  "seoul-minimal-style": {src:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=85",alt:"Ряд одежды в спокойных природных оттенках",credit:"Unsplash"},
  "toner-pads-explained": {src:"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1400&q=85",alt:"Уходовые средства на фоне светло-зелёной плитки",credit:"Unsplash"},
  "layering-for-autumn": {src:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",alt:"Уличный модный образ с верхней одеждой",credit:"Unsplash"},
  "lip-textures": {src:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",alt:"Классический студийный бьюти-портрет",credit:"Unsplash"},
  "capsule-colors": {src:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",alt:"Модный образ в ярком жёлтом цвете",credit:"Unsplash"},
  "read-skincare-label": {src:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85",alt:"Уходовое средство на белой ткани",credit:"Unsplash"},
  "accessories-first": {src:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1400&q=85",alt:"Минималистичный летний образ в белом",credit:"Unsplash"}
};
export const photoFor = (story:Article) => photos[story.slug] || photos["k-beauty-simple-routine"];
