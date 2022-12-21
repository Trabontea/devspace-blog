import Layout from '../components/Layout'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Home({ posts }) {
  console.log(posts)
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
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

    const { data: frontmattter } = matter(markdownWithMeta)

    // console.log(frontmattter)
    return {
      slug,
      frontmattter,
    }
  })

  console.log(posts)

  return {
    props: { posts },
  }
}
