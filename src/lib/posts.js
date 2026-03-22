import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return []
  const files = fs.readdirSync(postsDirectory)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .sort().reverse()

  return files.map(filename => {
    const filepath = path.join(postsDirectory, filename)
    const raw = fs.readFileSync(filepath, 'utf8')
    const { data } = matter(raw)
    return {
      slug: data.slug || filename.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
      title: data.title || 'Untitled',
      date: data.date || '',
      description: data.description || '',
      category: data.category || 'general',
      tags: data.tags || [],
      image: data.image || 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200',
      readTime: data.readTime || '5 min read',
      keyword: data.keyword || '',
      author: data.author || 'AfriEarners Team',
    }
  })
}

export function getPostBySlug(slug) {
  if (!fs.existsSync(postsDirectory)) return null
  const files = fs.readdirSync(postsDirectory)
  const file = files.find(f => {
    const { data } = matter(fs.readFileSync(path.join(postsDirectory, f), 'utf8'))
    const fileSlug = data.slug || f.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
    return fileSlug === slug
  })
  if (!file) return null
  const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    content,
    title: data.title || 'Untitled',
    date: data.date || '',
    description: data.description || '',
    category: data.category || 'general',
    tags: data.tags || [],
    image: data.image || 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200',
    readTime: data.readTime || '5 min read',
    keyword: data.keyword || '',
    author: data.author || 'AfriEarners Team',
  }
}

export function getPostsByCategory(category) {
  return getAllPosts().filter(p => p.category === category)
}

export const CATEGORIES = [
  { slug: 'make-money', label: 'Make Money' },
  { slug: 'freelancing', label: 'Freelancing' },
  { slug: 'tech', label: 'Tech & Dev' },
  { slug: 'blogging', label: 'Blogging' },
  { slug: 'payments', label: 'Payments' },
  { slug: 'social-media', label: 'Social Media' },
  { slug: 'ecommerce', label: 'E-Commerce' },
  { slug: 'crypto', label: 'Crypto' },
]
