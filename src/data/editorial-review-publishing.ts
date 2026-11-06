/**
 * Editorial staging only. These records are matched against existing Notion V3 drafts.
 * Retailer listings and external photography remain subject to review before publication.
 */
export const expiredEventSlugs = [
 "hangang-fall-festival-2026",
 "skylrk-seongsu-popup",
 "hanbok-culture-week-2026",
 "musinsa-zozotown-popup",
 "shinsegae-womens-week"
] as const;
export const expiredSet: ReadonlySet<string> = new Set(expiredEventSlugs);

export type EditorialProduct = {
 name: string;
 format?: string;
 href: string;
 image: string;
 imageCredit: string;
 merchant: string;
 sellerRegion: "RU" | "cross-border";
 verified: "2026-11-06" | "2026-10-24";
 note?: string;
};
export const productCards: Record<string, EditorialProduct[]> = {
 "best-of-beauty-hair-fragrance-2026": [
  {name:"Fino Premium Touch Conditioner",format:"550 мл",href:"https://kcosmetics.ru/products/fino-premium-touch-conditioner-550ml",merchant:"K·Cosmetics",sellerRegion:"RU",verified:"2026-11-06",image:"https://japantrading.com.ua/content/images/47/1500x1500l100nn0/fino-kondytsioner-dlia-volossia-hlyboke-zvolozhennia-ta-zhyvlennia-shiseido-premium-touch-conditioner-550-ml-41099268954369.jpg",imageCredit:"Фото товара: JapanTrading"},
  {name:"VT Reedle Shot Hair Boosting Scaling Shampoo",format:"500 мл",href:"https://ru.stylekorean.com/shop/vt-cosmetics-%D0%A8%D0%B0%D0%BC%D0%BF%D1%83%D0%BD%D1%8C-%D0%B4%D0%BB%D1%8F-%D0%B3%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%BE%D0%B3%D0%BE-%D0%BE%D1%87%D0%B8%D1%89%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BA%D0%BE%D0%B6%D0%B8/1781074315/",merchant:"StyleKorean RU",sellerRegion:"cross-border",verified:"2026-10-24",image:"https://www.dodoskin.com/cdn/shop/files/VTCOSMETICSReedleShotHairBoostingScalingShampoo500ml-1.jpg?v=1776824907",imageCredit:"Фото товара: Dodo Skin",note:"Ссылка на русскоязычную страницу."}
 ],
 "autumn-blouson-guide": [
  {name:"ZARA High-Collar Bomber Jacket",format:"Ecru · 8372/283/712",href:"https://www.zararu.ru/product/high-collar-bomber-jacket-nv00196736v",merchant:"ZaraRU, независимый посредник",sellerRegion:"RU",verified:"2026-10-24",image:"https://static.zara.net/assets/public/9064/5dfb/17524b0089fd/af3fa74d89aa/08372027712-p/08372027712-p.jpg?ts=1771263286164",imageCredit:"Фото модели: Zara",note:"Наличие у продавца уточняйте при переходе."}
 ],
 "jisoo-heart-eye-patch": [
  {name:"Beauty of Joseon Revive Under Eye Patch",format:"Ginseng + Retinal · 60 шт.",href:"https://hollyshop.ru/catalog/product/patchi_dlya_vek_s_zhenshenem_i_retinalem_beauty_of_joseon_revive_under_eye_patch_ginseng_retinal/",merchant:"Hollyshop",sellerRegion:"RU",verified:"2026-11-06",image:"https://cdn2.parfumdreams.de/image/product/144600-235735-0-0.webp",imageCredit:"Фото товара: parfumdreams",note:"На дату проверки товара не было в наличии."}
 ],
 "korean-tone-up-products": [
  {name:"9wishes Vegan White Tone-Up Cream",format:"SPF21 · 50 мл + 20 мл",href:"https://www.joom.ru/ru/products/69a53160bd4656013668c66f",merchant:"Joom",sellerRegion:"cross-border",verified:"2026-10-24",image:"https://www.dodoskin.com/cdn/shop/files/87ac33afe38c2b3966248aa6aeb927b0_062d3ee5-0b4e-459d-ae2a-62e44429170e.jpg?v=1706600797",imageCredit:"Фото основного продукта: Dodo Skin",note:"В карточке указан набор 50+20 мл."}
 ],
 "guerlain-lheure-bleue-2026": [
  {name:"Guerlain L’Heure Bleue Eau de Parfum",format:"Коллекция 2026 · 100 мл",href:"https://mavenfume.ru/guerlain-l-heure-bleue-2026-100-ml",merchant:"MavenFume",sellerRegion:"RU",verified:"2026-11-06",image:"https://cdn.idealo.com/folder/Product/213602/6/213602682/s4_produktbild_max_4/guerlain-l-heure-bleue-2026-eau-de-parfum-100-ml.jpg",imageCredit:"Фото продукта: idealo"}
 ]
};
