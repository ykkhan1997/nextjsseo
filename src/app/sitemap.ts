import { BlogPostsResponse } from "@/models/BlogPost";
import { MetadataRoute } from "next";

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
    const response=await fetch(`https://dummyjson.com/posts`);
    const {posts}=await response.json();
    const postEntries:MetadataRoute.Sitemap=posts.map((id:string)=>({
        url:`http://localhost:3000/posts/${id}`
    }));
    return[
        {
            url:"http//localhost:3000/about",
            lastModified:new Date()
        },
       ...postEntries 
    ]
}