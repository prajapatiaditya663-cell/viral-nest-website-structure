import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export const revalidate = 60 // revalidate every 60 seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://viral-nest-website-structure.vercel.app'

  // Fetch all blog slugs from Sanity
  const posts = await client.fetch(`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      publishedAt
    }
  `)

  const blogUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt
      ? new Date(post.publishedAt)
      : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    // MAIN PAGES
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/dubai`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/india`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/europe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // BLOG POSTS (Dynamic)
    ...blogUrls,
  ]
}
