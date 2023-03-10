import Layout from '@/components/Layout'
import fs from 'fs'
import path from 'path'
import Post from '@/components/Post'
import { POSTS_PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'
import { getPosts } from '@/lib/posts'
import CategoryList from '@/components/CategoryList'

export default function BlogPage({ posts, numPages, currentPage, categories }) {
  console.log(posts)
  return (
    <Layout>
      <div className="flex-col flex justify-between sm:flex-row">
        <div className="w-full sm:w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Latest posts!</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-full sm:w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>

      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

  let paths = []

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    })
  }
  console.log('paths:::', paths)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1)

  const files = fs.readdirSync(path.join('posts'))

  // console.log('files', files)
  const posts = getPosts()
  console.log('Posts', posts)

  // Get categories from sidebar
  const categories = posts.map((post) => post.frontmatter.category)

  const uniqueCategories = [...new Set(categories)]
  console.log(uniqueCategories)

  // numar total pagini
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  )

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  }
}
