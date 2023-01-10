import Layout from '../../components/Layout'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Post from '../../components/Post'
import { sortByDate } from '../../utils'

export default function BlogPage({ posts }) {
  console.log(posts)
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest posts!</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))
  // console.log('files', files)
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )
    //console.log(markdownWithMeta)

    const { data: frontmatter } = matter(markdownWithMeta)

    // console.log(frontmattter)
    return {
      slug,
      frontmatter,
    }
  })

  console.log(posts)

  return {
    props: { posts: posts.sort(sortByDate) },
  }
}
