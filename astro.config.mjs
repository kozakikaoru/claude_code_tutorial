// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeStepify from './src/plugins/rehype-stepify.mjs';

// 公開先: GitHub Pages のプロジェクトページ。
// - site: OGP / sitemap の絶対 URL 生成に使われる。実アカウント/組織名に置換すること（プレースホルダ）。
// - base: リポジトリ名と完全一致させる。内部リンク・アセットの基準。
// - trailingSlash: 'always' で GitHub Pages のディレクトリ index 配信と相性を取る（design.md §7 / R1）。
export default defineConfig({
  site: 'https://kozakikaoru.github.io',
  base: '/claude_code_tutorial',
  trailingSlash: 'always',
  // rehype-stepify: 各章本文を §（H2）境界で <section class="step"> に自動分割する（ADR-003）。
  // markdown.rehypePlugins は MDX 統合にも継承される（@astrojs/mdx が markdownConfig を引き継ぐ）。
  // 本プラグインは Astro 既定の rehypeHeadingIds より前に走るため、h2.id には依存しない実装にしてある。
  markdown: {
    rehypePlugins: [rehypeStepify],
  },
  integrations: [mdx()],
  // dev/preview のポート。既定は 4321。環境変数 PORT があればそれを使う
  // （プレビューハーネスが空きポートを割り当てる場合に追従。本番ビルド出力には影響しない）。
  server: { port: Number(process.env.PORT) || 4321 },
  // build.format は既定の 'directory'（各ページ /path/index.html）。base 配下で素直に動く。
});
