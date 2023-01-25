import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '@/utils/index'

const files = fs.readdirSync(path.join('posts'))

export function getPosts() {
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

  console.log('home-->', posts)

  return posts.sort(sortByDate)
}
