import PortableTextRenderer from "@/app/blog/components/PortableTextRenderer";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/lib/sanity";
import Link from "next/link";
import LatestPosts from "../components/LatestPosts";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(
    POST_QUERY,
    { slug } // 🔥 aqui está o segredo
  );

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(600).url()
    : null;

  return (
    <main className="relative px-6 py-10">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-purple-50 to-white" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* POST (principal) */}
        <article className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-sm">
          
          <Link
            href="/blog"
            className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
          >
            ← Voltar aos posts
          </Link>

          {postImageUrl && (
            <img
              src={postImageUrl}
              alt={post.title}
              className="w-full h-[420px] object-cover rounded-2xl mt-6"
            />
          )}

          <header className="mt-8 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {post.title}
            </h1>

            <p className="text-gray-500 text-sm">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </header>

          <div className="border-t border-gray-200 my-10" />

          <div className="blog-container">
            <PortableTextRenderer value={post.body} />
          </div>

          <section className="mt-16 p-8 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-3">
              Gostou do post?
            </h3>

            <p className="text-white/90 mb-6">
              Continue explorando nossos conteúdos.
            </p>

            <Link
              href="/blog"
              className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Ver mais posts
            </Link>
          </section>
        </article>

        {/* SIDEBAR */}
        <aside className="lg:col-span-1">
          <div className="sticky top-10">
            <LatestPosts />
          </div>
        </aside>

      </div>
    </main>
  );
}