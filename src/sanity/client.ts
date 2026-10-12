import {createClient} from "next-sanity";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
export const isCmsConfigured=Boolean(projectId&&dataset);

export const cmsClient=projectId&&dataset?createClient({
 projectId,dataset,apiVersion:"2026-10-01",useCdn:false,
 perspective:"published"
}):null;
