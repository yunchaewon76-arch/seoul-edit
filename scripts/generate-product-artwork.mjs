import {mkdirSync,writeFileSync} from "node:fs";
import {join} from "node:path";
/* Original stylized illustrations only. Never use these as evidence of packaging details. */
const products=[
["taeng-mh-pad","jar","SKINCARE","#eaf8f2","#b4eee5","#6dcac3"],
["taeng-mh-mask","sachet","SKINCARE","#edf7ec","#d0f1d8","#8cbca3"],
["taeng-lilybyred","heart","CHEEK","#f5eeff","#e5bbe9","#bc90d6"],
["taeng-2an","duo","CHEEK","#fff2f5","#f1bdcb","#d58faa"],
["taeng-jsm","cushion","COMPLEXION","#f6f1ec","#e3d6c6","#514c51"],
["taeng-hourglass","wand","COMPLEXION","#f9f3ed","#ebdbca","#c5a98b"],
["taeng-thesaem","trio","COMPLEXION","#f9f0e6","#eed2b6","#c9aa9a"],
["taeng-tirtir","tube","COMPLEXION","#f1edfc","#e5d8ef","#bcb0ca"],
["taeng-hwahong","brush","TOOLS","#f1f5ed","#d4ddd0","#74534a"],
["taeng-etude","mascara","EYES","#fff0f4","#ebb7c9","#44333b"],
["taeng-clio","compact","CHEEK","#fff2ed","#f7ddc0","#edb5a0"],
["taeng-frottage","pencil","EYES","#f5f0e8","#e9d3c6","#d4aa9a"],
["taeng-smudging","double","EYES","#f4f4fa","#d7bdc7","#4d404a"],
["taeng-dejavu","liner","EYES","#f3eeeb","#d5b9a2","#523934"],
["taeng-club","powder","COMPLEXION","#f9f1f3","#f1e5e9","#dfbacb"],
["taeng-heart","lipliner","LIPS","#f9f0ed","#dcb0a7","#a86f72"],
["taeng-chanel","duolip","LIPS","#fff0f3","#e7b9b9","#603c49"],
["taeng-fenty","gloss","LIPS","#fff0ed","#e49f9f","#b43d4e"],
["taeng-mac","lipstick","LIPS","#f6eff4","#daa7b7","#433842"]
];
const fallbacks=[
["skincare","jar","SKINCARE","#edf5ef","#c6ded1","#a3bead"],
["cheek","duo","CHEEK","#fdf2f4","#ecc4ce","#cda5bc"],
["complexion","cushion","COMPLEXION","#f7f2ee","#e6d6c6","#aa9787"],
["eyes","pencil","EYES","#f4f1f9","#d9cfeb","#b09bb8"],
["lips","lipstick","LIPS","#faf0f1","#e5bac0","#ae7b8d"],
["tools","brush","TOOLS","#eef4ef","#d7e1d9","#7b7167"]
];
const shapes={
jar:'<rect x="204" y="313" width="312" height="223" rx="45" fill="url(#body)" stroke="white" stroke-width="7"/><rect x="192" y="281" width="336" height="90" rx="31" fill="url(#glass)" stroke="white" stroke-width="7"/><rect x="233" y="410" width="254" height="74" rx="14" fill="white" opacity=".19"/>',
sachet:'<g transform="rotate(-6 360 394)"><path d="M253 194h214l24 358H229z" fill="url(#body)" stroke="white" stroke-width="7"/><path d="M267 220h188M251 522h216" stroke="white" stroke-width="8" opacity=".6"/><path d="M352 459q-101-62-2-163 23 61 18 54 91 44-16 109Z" fill="white" opacity=".26"/></g>',
heart:'<g transform="translate(360 390)"><path d="M0 166C-216 46-159-163-14-98Q0-94 2-84C119-198 246-56 137 82Q75 141 0 166Z" fill="url(#glass)" stroke="white" stroke-width="8"/><path d="M0 133C-170 45-132-122-12-71Q0-65 2-57C102-149 204-38 116 67Q64 113 0 133Z" fill="url(#body)"/></g>',
duo:'<g transform="rotate(-7 360 394)"><rect x="193" y="232" width="334" height="312" rx="56" fill="url(#glass)" stroke="white" stroke-width="8"/><rect x="225" y="269" width="268" height="236" rx="40" fill="white" opacity=".47"/><ellipse cx="297" cy="384" rx="61" ry="88" fill="url(#body)"/><ellipse cx="424" cy="384" rx="60" ry="88" fill="#e8aaba"/></g>',
cushion:'<ellipse cx="360" cy="457" rx="178" ry="56" fill="#48444b"/><ellipse cx="360" cy="389" rx="183" ry="147" fill="url(#glass)" stroke="white" stroke-width="8"/><ellipse cx="360" cy="389" rx="140" ry="106" fill="url(#body)" stroke="white" stroke-opacity=".74" stroke-width="5"/>',
wand:'<g transform="rotate(10 360 396)"><rect x="297" y="177" width="128" height="352" rx="21" fill="url(#glass)" stroke="white" stroke-width="7"/><rect x="301" y="222" width="120" height="109" rx="15" fill="url(#body)"/><rect x="308" y="344" width="104" height="158" rx="9" fill="url(#body)"/><rect x="304" y="517" width="113" height="53" rx="11" fill="#b0a092" stroke="white" stroke-width="5"/></g>',
trio:'<g transform="rotate(-5 360 392)"><rect x="198" y="261" width="323" height="283" rx="49" fill="url(#glass)" stroke="white" stroke-width="7"/><rect x="222" y="284" width="277" height="235" rx="33" fill="#fdf9f4"/><ellipse cx="280" cy="399" rx="55" ry="90" fill="#dabbab"/><ellipse cx="360" cy="399" rx="54" ry="90" fill="#e9cdb6"/><ellipse cx="443" cy="399" rx="54" ry="90" fill="#ceb1a6"/></g>',
tube:'<g transform="rotate(-8 362 394)"><path d="M299 208h123l18 257q0 40-38 44h-91q-38-3-37-44z" fill="url(#body)" stroke="white" stroke-width="7"/><rect x="298" y="196" width="122" height="32" rx="11" fill="url(#glass)"/><rect x="304" y="508" width="114" height="70" rx="12" fill="url(#glass)" stroke="white" stroke-width="5"/></g>',
brush:'<g transform="rotate(29 360 384)"><path d="M340 248q-27-67 17-93 46 26 20 93Z" fill="#51433f"/><rect x="338" y="244" width="43" height="67" rx="8" fill="url(#glass)"/><path d="M342 310h37l-9 310q-13 15-21 0z" fill="url(#body)" stroke="white" stroke-width="5"/></g>',
mascara:'<g transform="rotate(-8 359 392)"><path d="M321 205h80l15 231q-55 45-109 0z" fill="url(#body)" stroke="white" stroke-width="7"/><rect x="315" y="452" width="91" height="119" rx="13" fill="#e4aec7" stroke="white" stroke-width="6"/></g>',
compact:'<g transform="rotate(6 360 388)"><rect x="211" y="235" width="298" height="305" rx="48" fill="url(#glass)" stroke="white" stroke-width="8"/><rect x="237" y="262" width="246" height="253" rx="31" fill="white" opacity=".5"/><circle cx="360" cy="386" r="109" fill="url(#body)" stroke="white" stroke-width="7"/></g>',
pencil:'<g transform="rotate(43 360 387)"><rect x="332" y="143" width="57" height="380" rx="11" fill="url(#body)" stroke="white" stroke-width="5"/><rect x="330" y="150" width="61" height="59" rx="10" fill="url(#glass)"/><path d="M332 516l28 97 29-97z" fill="#e4cfc3"/></g>',
double:'<g transform="rotate(39 352 384)"><rect x="296" y="149" width="39" height="409" rx="7" fill="url(#body)"/><rect x="354" y="159" width="39" height="406" rx="7" fill="#54464b"/><path d="M296 554l20 65 19-65M354 565l20 60 19-60" fill="#d4a69e"/></g>',
liner:'<g transform="rotate(42 359 378)"><rect x="332" y="132" width="57" height="415" rx="6" fill="url(#body)" stroke="white" stroke-width="5"/><rect x="333" y="163" width="55" height="73" rx="5" fill="#4f3f3c"/><path d="M333 545l27 73 29-73z" fill="#dcc6ae"/></g>',
powder:'<ellipse cx="361" cy="443" rx="166" ry="129" fill="url(#body)" stroke="white" stroke-width="6"/><rect x="213" y="290" width="296" height="154" rx="39" fill="url(#glass)" stroke="white" stroke-width="6"/><ellipse cx="361" cy="311" rx="149" ry="77" fill="#fffcfa" stroke="white" stroke-width="7"/>',
lipliner:'<g transform="rotate(38 356 388)"><rect x="331" y="137" width="58" height="417" rx="8" fill="url(#body)" stroke="white" stroke-width="5"/><rect x="328" y="167" width="64" height="76" rx="7" fill="#c58e8e"/><path d="M331 552l29 67 29-67Z" fill="#f3ddd3"/></g>',
duolip:'<g transform="rotate(-8 357 390)"><rect x="302" y="177" width="114" height="388" rx="18" fill="url(#glass)" stroke="white" stroke-width="6"/><rect x="306" y="188" width="106" height="147" rx="17" fill="#2c292f"/><rect x="311" y="337" width="96" height="133" rx="8" fill="url(#body)"/><rect x="307" y="473" width="105" height="88" rx="13" fill="#333039"/></g>',
gloss:'<g transform="rotate(9 358 394)"><rect x="304" y="210" width="113" height="341" rx="22" fill="url(#glass)" stroke="white" stroke-width="7"/><rect x="313" y="337" width="95" height="201" rx="16" fill="url(#body)"/><rect x="308" y="165" width="104" height="132" rx="13" fill="#e9d8cf" stroke="white" stroke-width="6"/></g>',
lipstick:'<g transform="rotate(-8 358 394)"><rect x="312" y="363" width="111" height="237" rx="16" fill="#2a292f" stroke="white" stroke-width="5"/><rect x="318" y="344" width="99" height="126" rx="7" fill="url(#glass)"/><path d="M322 350v-87q45-48 92-18v105Z" fill="url(#body)" stroke="white" stroke-width="6"/></g>'
};
function svg(spec,index,fallback){
 const [id,type,cat,bg,soft,main]=spec;
 const decor=index%3===0?'<path d="M102 553q87-137 125-209M134 510q-28-90-67-86" fill="none" stroke="#9aaf9b" stroke-width="9" opacity=".35"/>':index%3===1?'<circle cx="573" cy="197" r="73" fill="#fff" opacity=".26"/>':'<ellipse cx="143" cy="540" rx="71" ry="45" transform="rotate(-24 143 540)" fill="white" opacity=".33"/>';
 return '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720"><title>SEOUL EDIT '+cat+' editorial illustration</title><desc>Original concept illustration; not an authenticated product photograph or exact packaging.</desc><defs><linearGradient id="wall" x2="1" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="'+bg+'"/></linearGradient><linearGradient id="body" x2="1" y2="1"><stop stop-color="'+soft+'"/><stop offset=".48" stop-color="'+main+'"/><stop offset="1" stop-color="'+soft+'"/></linearGradient><linearGradient id="glass" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".94"/><stop offset=".65" stop-color="'+soft+'" stop-opacity=".66"/><stop offset="1" stop-color="#fff" stop-opacity=".91"/></linearGradient><filter id="drop"><feDropShadow dx="4" dy="20" stdDeviation="19" flood-color="#5a4b54" flood-opacity=".17"/></filter></defs><rect width="720" height="720" fill="url(#wall)"/><circle cx="550" cy="159" r="262" fill="#fff" opacity=".25"/><path d="M0 549L720 532V720H0Z" fill="#fff" opacity=".38"/>'+decor+'<ellipse cx="359" cy="556" rx="235" ry="27" fill="#594e56" opacity=".1"/><g filter="url(#drop)">'+shapes[type]+'</g><path d="M51 78h60" stroke="#5d5354" opacity=".5"/><text x="51" y="110" font-size="15" letter-spacing="3" font-family="Arial" fill="#5b5155">SEOUL EDIT</text><text x="51" y="132" font-size="11" letter-spacing="2" font-family="Arial" fill="#73686b">'+(fallback?'CATEGORY STUDY':'OBJECT STUDY / '+String(index+1).padStart(2,"0"))+'</text><path d="M49 645h622" stroke="#62595a" opacity=".2"/><text x="50" y="674" font-size="12" letter-spacing="2" font-family="Arial" fill="#5d5558">ILLUSTRATION / SEOUL EDIT</text><text x="670" y="674" text-anchor="end" font-size="12" letter-spacing="2" font-family="Arial" fill="#5d5558">'+cat+'</text></svg>\n';
}
for(const [i,s] of products.entries()){const dir=join("public","products","editorial");mkdirSync(dir,{recursive:true});writeFileSync(join(dir,s[0]+".svg"),svg(s,i,false));}
for(const [i,s] of fallbacks.entries()){const dir=join("public","products","fallback");mkdirSync(dir,{recursive:true});writeFileSync(join(dir,s[0]+".svg"),svg(s,i+products.length,true));}
console.log("SEOUL EDIT generated "+products.length+" unique product illustrations and "+fallbacks.length+" fallback artworks.");
