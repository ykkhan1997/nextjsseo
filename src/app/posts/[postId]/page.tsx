import { delay } from "@/lib/utils";
import { BlogPost } from "@/models/BlogPost";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: { postId: string };
}

export async function generateMetadata({params:{postId}}:BlogPostPageProps):Promise<Metadata>{
  const response=await fetch(`https://dummyjson.com/posts/${postId}`);
  const post:BlogPost=await response.json();
  return{
    title:post.title,
    description:post.body,
    // openGraph:{
    //   images:[
    //     {
    //       url:post.imgUrl
    //     }
    //   ]
    // }
  };
}
export async function generateStaticParams(){
  const response=await fetch(`https://dummyjson.com/posts`);
  const {posts}:BlogPostPageProps=await response.json();
  return posts.map(({id})=>id)
}
export default async function BlogPostPage({
  params: { postId },
}: BlogPostPageProps) {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  if(response.status===404){
    notFound();
  }
  const { title, body }: BlogPost = await response.json();

  await delay(1000);

  return (
    <article className="max-w-prose m-auto space-y-5">
      <h1 className="text-3xl text-center font-bold">{title}</h1>
      <p className="text-lg">{body}</p>
    </article>
  );
}
