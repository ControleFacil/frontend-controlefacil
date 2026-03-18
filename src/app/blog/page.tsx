import Hero from "./components/Hero";
import EditorialSection from "./components/EditorialSection";
import QuoteSection from "./components/QuoteSection";
import PostsGrid from "./components/PostsGrid";
import AnimatedBackground from "./components/AnimatedBackground";
import Header from "./components/Header";

import { getLatestPosts } from "@/http/api/blog/blogService";
import Footer from "./components/Footer";

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <main className="relative bg-gradient-to-br from-white via-purple-50 to-white">
      
      <AnimatedBackground />
      <Header/>
      <Hero />
      <EditorialSection />
      <QuoteSection />
      <PostsGrid posts={posts} />
      <Footer/>
    </main>
  );
}