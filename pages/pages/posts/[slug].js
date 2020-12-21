import fs from "fs"
import path from "path"
import Layout from "../../components/Layout"
import { listContentFiles, readContentFile } from "../../lib/content-loader"
// （中略）
/**
 * ページコンポーネントで使用する値を用意する
 */
export async function getStaticProps({ params }) {
  const content = await readContentFile({ fs, slug: params.slug })
  return {
    props: {
      ...content
    }
  }
}
/**
 * 有効な URL パラメータを全件返す
 */
export async function getStaticPaths() {
  const paths = listContentFiles({ fs })
    .map((filename) => ({
      params: {
        slug: path.parse(filename).name,
      }
    }))
  return { paths, fallback: false }
}
// 先ほど作った、ダミー投稿を返す
// `listContentFiles()` と `readContentFile()` は削除する