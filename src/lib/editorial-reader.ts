/**
 * Safe, reversible *display-only* edit of imported Notion V3 articles.
 * Original V3 manuscripts (including audit notes) remain in Notion and staging JSON.
 */
export function readerMarkdown(raw: string): string {
  const lines = raw.replace(/<br\s*\/?>/gi,"\n").replace(/\r/g,"").split("\n");
  const out: string[] = [];
  let started = false;
  for (const original of lines) {
    let line = original.trim();
    if (!line) {out.push("");continue;}
    // The first real headline marks the beginning of the reader-facing feature.
    if (!started) {
      if (/^# (?!SEOUL EDIT|V3\b|V4\b|20\d\d)[\s\S]+/i.test(line)) started = true;
      else continue;
    }
    if (/^#{1,4} /i.test(line) && /(источники и редакцион|источники и прозрачност|редакционная прозрачност|список источников|내부 검수|источники и проверк|источники и права|검수 체크리스트|правовой статус|для редактора|редакционные проверки)/i.test(line)) break;
    if (/^#{1,4}\s*SEOUL EDIT|^#\s*V3\b|^#\s*V4\b/i.test(line)) continue;
    if (/^- \[[x ]\]/i.test(line)) continue;
    if (/^<b>(?:SEOUL EDIT|Редакционн|Редакторский черновик)/i.test(line)) continue;
    if (/^(?:Проверено|Проверка:|Дата проверки:|Внутренняя проверка:|Примечание для редактора:)/i.test(line)) continue;
    if (/^[А-Яа-я0-9][^\n]*\b(?:Не публиковать до проверки|Sanity Publish|GitHub main)\b/i.test(line)) continue;
    if (/^(?:Источники:|Права:|Редакторская пометка:|SEOUL EDIT\s*·)/i.test(line)) continue;
    if (/^---+$/.test(line)) continue;
    // Remove internal vendor/SKU verification chatter that is not a reader decision.
    line = line.replace(/Это трансграничный продавец, а не подтверждение наличия на складе внутри РФ\./gi,"");
    line = line.replace(/Не путать с VT PDRN Reedle Shot Hair Ampoule 15 мл и PDRN Scalp Shampoo 200 мл: это \*\*другие продукты\*\*\./gi,"");
    line = line.replace(/Не путать с VT PDRN Reedle Shot Hair Ampoule 15 мл и PDRN Scalp Shampoo 200 мл: это <b>другие продукты<\/b>\./gi,"");
    line = line.replace(/(?:Точных|Подтверждённых) российских (?:ссылок|карточек):\s*0\.?/gi,"");
    line = line.replace(/(?:Фото|Картинки) из (?:исходной публикации|рекламы) не копировать[^.]*\./gi,"");
    // No SEO meta-instructions or checklist markers are part of the reader's article.
    if (!line.trim())continue;
    out.push(line);
  }
  return out.join("\n").replace(/\n{3,}/g,"\n\n").trim();
}
