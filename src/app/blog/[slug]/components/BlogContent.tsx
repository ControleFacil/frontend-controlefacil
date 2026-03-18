"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";

interface BlogContentProps {
  post: SanityDocument;
  otherPosts: SanityDocument[];
}

export default function BlogContent({ post, otherPosts }: BlogContentProps) {
  return (
    <main className="min-h-screen bg-background font-['Noto_Sans'] text-gray-900">
      {/* HERO / TITULO COM IMAGEM */}
      <section className="bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-start gap-12">
          <div className="w-full lg:w-1/2 h-64 lg:h-[400px] relative rounded-xl overflow-hidden shadow-lg">
            {post.mainImage?.asset?.url ? (
              <Image
                src={post.mainImage.asset.url}
                alt={post.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center bg-purple-100 text-purple-400 font-semibold h-full">
                Sem imagem
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              {post.title}
            </h1>
            {post.publishedAt && (
              <p className="mt-2 text-gray-500 text-sm">
                Publicado em {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="text-purple-600 hover:underline font-medium"
              >
                ← Voltar aos posts
              </Link>
              {otherPosts
                .filter((p) => p.slug.current !== post.slug.current)
                .slice(0, 3)
                .map((p) => (
                  <Link
                    key={p._id}
                    href={`/blog/${p.slug.current}`}
                    className="text-gray-600 hover:text-purple-600 hover:underline"
                  >
                    {p.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-5xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        <article className="prose prose-lg max-w-full flex-1">
          <PortableText value={post.body} />
        </article>

        <aside className="hidden lg:block w-64 flex-shrink-0">
          <h3 className="text-xl font-semibold text-purple-600 mb-4">
            Outros posts
          </h3>
          <ul className="space-y-3">
            {otherPosts
              .filter((p) => p.slug.current !== post.slug.current)
              .map((p) => (
                <li key={p._id}>
                  <Link
                    href={`/blog/${p.slug.current}`}
                    className="block p-3 bg-white rounded-xl shadow hover:shadow-lg transition"
                  >
                    <p className="font-medium text-gray-900">{p.title}</p>
                    {p.publishedAt && (
                      <p className="text-gray-500 text-sm">
                        {new Date(p.publishedAt).toLocaleDateString()}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </aside>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-center">
        <h3 className="text-3xl font-bold">
          Pronto para organizar sua vida financeira?
        </h3>

        <p className="mt-3 text-white/90">
          Comece agora e tenha controle total do seu dinheiro.
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Criar Conta
          </button>

          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
            Assinar Premium
          </button>
        </div>
      </section>
    </main>
  );
}