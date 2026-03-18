import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { getLatestPosts } from "@/http/api/blog/blogService";

export default async function LatestPosts() {
  const posts = await getLatestPosts();

  return (
    <section className="px-4 py-6">
      
      <h2 className="text-xl font-bold mb-5 text-gray-800">
        Últimos posts
      </h2>

      <div className="space-y-5">
        {posts.map((post: any) => {
          const imageUrl = post.mainImage
            ? urlFor(post.mainImage).width(400).height(300).url()
            : null;

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex gap-4 p-3 rounded-xl bg-white/70 backdrop-blur-md border border-purple-100 hover:border-purple-300 hover:shadow-md hover:shadow-purple-200/40 transition-all"
            >
              
              {/* IMAGE */}
              {imageUrl && (
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* overlay roxo */}
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition" />
                </div>
              )}

              {/* CONTENT */}
              <div className="flex flex-col justify-center">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition leading-snug">
                  {post.title}
                </h3>

                <span className="text-xs text-gray-400 mt-1">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>

            </Link>
          );
        })}
      </div>
    </section>
  );
}