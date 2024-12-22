import type { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

export async function getData() {
    const client = createClient();
    const base = await client.getAllByType("page"); // Fetching static pages
    const blogs = await client.getAllByType("blog_post"); // Fetching blog posts
    return {
        base,
        blogs,
    };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { base, blogs } = await getData();
    const ROOT_URL = "https://athayogliving.com";

    // UIDs to exclude from the sitemap
    const exclude_uids = ['terms-of-service', 'privacy-policy', 'refund-policy'];

    // Generate sitemap for pages, excluding specified UIDs
    const pagesSitemap: MetadataRoute.Sitemap = base
        .filter((page) => !exclude_uids.includes(page.uid)) // Exclude pages by UID
        .map((page) => {
            const url = page.uid === "home" ? ROOT_URL : `${ROOT_URL}/${page.uid}`;
            return {
                url,
                lastModified: new Date(),
                changeFrequency: "yearly" as const,
                priority: page.uid === "home" ? 1 : 0.8,
            };
        });

    // Generate sitemap for blog posts
    const blogsSitemap: MetadataRoute.Sitemap = blogs.map((blog) => ({
        url: `${ROOT_URL}/blog/${blog.uid}`, // Assuming blog posts are under `/blog/`
        lastModified: new Date(blog.last_publication_date || new Date()), // Use `last_publication_date` if available
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    // Combine pages and blogs into a single sitemap array
    return [...pagesSitemap, ...blogsSitemap];
}
