import { Post } from "../types/Post"
import { client } from "@/lib/sanity";

export async function getPosts(): Promise<Post[]> {
  return client.fetch(`*[_type == "post"]{
    title,
    "slug": slug.current,
    image,
    publishedAt
  }`);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      image,
      publishedAt,
      body
    }`,
    { slug }
  );
  return post || null;
}
export async function getLatestPosts() {
  return client.fetch(`*[_type == "post"] 
    | order(publishedAt desc)[0...5] {
      title,
      "slug": slug.current,
      image,
      publishedAt
    }`);
}