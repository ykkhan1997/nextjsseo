import { delay } from "@/lib/utils";
import { BlogPostsResponse } from "@/models/BlogPost";
import Link from "next/link";
import { notFound } from "next/navigation";
import cache from "react";

export async function generateStaticParams(){
  const response=await fetch(`https://dummyjson.com/posts`);
  const {posts}:BlogPostsResponse=await response.json();
  return posts.map((id)=>id);
}
//Manually duplicate request if not using fetch
// const getPost=cache(async(postId:string)=>{
//   const response=await fetch(`https://dummyjson.com/posts/${postId}`);
//   const post=await prisma.post.findUnique(postId);
//   return post;
// })
export default async function BlogPage() {
  const response = await fetch("https://dummyjson.com/posts");
  if(response.status===404){
    notFound();
  }
  const { posts }: BlogPostsResponse = await response.json();

  await delay(1000);

  return (
    <div className="max-w-prose m-auto space-y-5">
      <h1 className="text-3xl text-center mb-3 font-bold">Posts</h1>
      {posts.map(({ id, title }) => (
        <article key={title}>
          <h2>
            <Link href={`/posts/${id}`} className="text-lg font-bold">
              {title}
            </Link>
          </h2>
        </article>
      ))}
    </div>
  );
}
