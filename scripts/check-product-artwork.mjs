import {readFileSync,statSync} from "node:fs";
import {createHash} from "node:crypto";
import {join} from "node:path";
const all=JSON.parse(readFileSync("src/data/verified-video-products.json","utf8"));
const slug="taengkodok-ep03-taeyeon-eunchae";
const targets=all.filter(p=>p.videoSlug===slug);
if(targets.length!==19)throw new Error("Expected 19 products for "+slug+", found "+targets.length);
const usedIds=new Set(),usedPaths=new Set(),uniqueArtwork=new Set();
for(const p of targets){
 if(usedIds.has(p.id))throw new Error("Duplicate product ID "+p.id);
 usedIds.add(p.id);
 const expected="/products/editorial/"+p.id+".svg";
 if(p.editorialImagePath!==expected)throw new Error("Artwork path mismatch: "+p.id);
 if(usedPaths.has(expected))throw new Error("Duplicate artwork path "+expected);
 usedPaths.add(expected);
 if(!p.editorialImageAlt?.includes(p.name))throw new Error("Missing specific Russian ALT: "+p.id);
 const path=join("public",p.editorialImagePath);
 const svg=readFileSync(path,"utf8");
 if(!svg.startsWith("<svg")||!svg.includes("</svg>")||!svg.includes("ILLUSTRATION / SEOUL EDIT"))throw new Error("Invalid editorial artwork: "+p.id);
 if(statSync(path).size<1000)throw new Error("Suspiciously small artwork: "+p.id);
 const hash=createHash("sha256").update(svg).digest("hex");
 if(uniqueArtwork.has(hash))throw new Error("Repeated artwork content: "+p.id);
 uniqueArtwork.add(hash);
}
for(const cat of ["skincare","cheek","complexion","eyes","lips","tools"]){
 const path=join("public","products","fallback",cat+".svg");
 const svg=readFileSync(path,"utf8");
 if(!svg.startsWith("<svg")||!svg.includes("</svg>"))throw new Error("Invalid category fallback: "+cat);
}
console.log("SEOUL EDIT verified 19 distinct product SVGs + 6 category fallbacks; product mapping and ALT matched.");
