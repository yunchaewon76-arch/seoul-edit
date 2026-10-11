import {candidateProductsFor} from "@/data/product-mentions";
/** Preliminary product mentions — not verified items or shopping recommendations. */
export default function CandidateProductShelf({videoSlug}:{videoSlug:string}){
 const products=candidateProductsFor(videoSlug);
 if(!products.length)return null;
 return <section className="se-candidate-shelf" aria-labelledby="candidate-products-heading">
  <div className="se-product-head"><div>
   <span className="eyebrow">PRODUCT RESEARCH / NEEDS ORIGINAL CHECK</span>
   <h2 id="candidate-products-heading">Продукты на проверке</h2>
  </div><p>Предварительные упоминания из стороннего каталога. Мы ещё не сверили их с самим видео и не проверили наличие в России.</p></div>
  <div className="se-product-grid">
   {products.map((p,i)=><article className="se-product-card se-candidate-card" key={p.videoSlug+"-"+p.brand+"-"+p.name}>
    <div className={"se-product-art se-product-art-"+(i%2===0?"cream":"blue")}>
     <span className="se-candidate-monogram">{p.brand.slice(0,1).toUpperCase()}<small>EDITORIAL RESEARCH</small></span>
    </div>
    <span className="se-product-role">УПОМИНАНИЕ ИЗ СТОРОННЕГО КАТАЛОГА</span>
    <h3>{p.brand}</h3><p>{p.name}{p.variant?" · "+p.variant:""}</p>
    <span className="se-product-unverified">Российская ссылка не проверена</span>
    <small className="se-product-disclaimer">Присутствие в видео требует проверки по оригиналу. Цена, наличие и эквивалентность не подтверждены.</small>
    <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="se-product-research-source">Предварительный источник ↗</a>
   </article>)}
  </div>
 </section>;
}
