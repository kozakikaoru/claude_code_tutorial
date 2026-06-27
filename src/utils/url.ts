/**
 * url.ts — base パス込みの URL を生成するヘルパー（design.md R1/R2）
 *
 * GitHub Pages のプロジェクトページは base パス（/claude_code_tutorial）配下で配信される。
 * 素の `href="/chapters/..."` は base が付かず 404 になるため、内部リンク・public 配下の
 * アセット参照は必ずこのヘルパーを通すこと（サイドバー/pager/ロゴ/favicon など）。
 *
 * astro.config の trailingSlash:'always' に合わせ、ページ系リンクは末尾スラッシュを付ける。
 */

const BASE = import.meta.env.BASE_URL; // 例: "/claude_code_tutorial/"（末尾スラッシュ付き）

/** 先頭/末尾スラッシュを正規化して BASE と連結 */
function join(path: string): string {
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

/**
 * ページ用リンク（末尾スラッシュを付与）。
 * 例: href('/chapters/beginner/install') -> "/claude_code_tutorial/chapters/beginner/install/"
 */
export function href(path: string): string {
  if (path === '/' || path === '') return BASE;
  let out = join(path);
  if (!out.endsWith('/')) out += '/';
  return out;
}

/**
 * public 配下などの素アセット用（末尾スラッシュを付けない）。
 * 例: asset('/favicon.svg') -> "/claude_code_tutorial/favicon.svg"
 */
export function asset(path: string): string {
  return join(path);
}
