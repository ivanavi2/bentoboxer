import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bentoboxer.vercel.app',
      lastModified: new Date('2025-07-04T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]
}