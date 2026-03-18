import Link from "next/link";
import { urlFor } from "@/lib/sanity";

export default function PostsGrid({ posts }: any) {
  return (
    <section id="posts" className="max-w-7xl mx-auto px-6 py-24">
      
      <h2 className="text-3xl font-bold mb-12 text-gray-800">
        Conteúdos recentes
      </h2>

      {/* destaque */}
      {posts[0] && (
        <Link
          href={`/blog/${posts[0].slug}`}
          className="block mb-12 rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-purple-100"
        >
          {posts[0]?.image ? (
          <img
            src={urlFor(posts[0].image).width(1200).url()}
            className="w-full h-80 object-cover"
          />
          ) : (
          <div className="w-full h-80 bg-purple-100 flex items-center justify-center text-purple-500">
            Sem imagem
          </div>
          )}

          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {posts[0].title}
            </h3>
          </div>
        </Link>
      )}

      {/* grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(1).map((post: any) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-100 hover:shadow-lg transition"
          >
            {post?.image ? (
              <img
                src={urlFor(post.image).width(600).url()}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-purple-100 flex items-center justify-center text-purple-500">
                Sem imagem
              </div>
            )}

            <div className="p-4">
              <h3 className="font-semibold text-gray-800 group-hover:text-purple-600">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}