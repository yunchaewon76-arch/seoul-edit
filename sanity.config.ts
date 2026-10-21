"use client";

import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {schemaTypes} from "./src/sanity/schema";
import LegacyVideoImporter from "./src/sanity/LegacyVideoImporter";
import PublishedArticlesImporter from "./src/sanity/PublishedArticlesImporter";

export default defineConfig({
 name:"seoul-edit",
 title:"SEOUL EDIT · Editorial Studio",
 basePath:"/studio",
 projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "notconfigured",
 dataset:process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
 plugins:[structureTool({
  structure:S=>S.list().title("SEOUL EDIT 편집실").items([
   S.listItem().id("creator-video-import").title("📥 기존 영상 8개 가져오기").child(
    S.component(LegacyVideoImporter).id("legacy-video-import-pane").title("기존 CREATOR WATCH 영상 가져오기")
   ),
   S.divider(),
   S.listItem().id("published-article-import").title("📥 발행 기사 5개 Sanity 가져오기").child(
    S.component(PublishedArticlesImporter).id("approved-article-import-pane").title("기존 발행 기사 Sanity 등록")
   ),
   S.listItem().title("📰 일반 기사 / Articles").child(S.documentTypeList("editorialArticle").title("Articles")),
   S.listItem().title("🎬 CREATOR WATCH / Videos").child(S.documentTypeList("creatorVideo").title("Creator Videos")),
   S.listItem().title("🧴 제품·대체품 / Products").child(S.documentTypeList("videoProduct").title("Video Products"))
  ])
 })],
 schema:{types:schemaTypes}
});
