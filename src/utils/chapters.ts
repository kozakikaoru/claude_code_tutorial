/**
 * chapters.ts — 章の整列・スラッグ・前後ナビの単一ロジック（design.md §6.2）
 *
 * サイドバー・前後ナビ・進捗・難易度マップは、すべて getSortedChapters() の
 * 1 つの整列結果を共有する。順序ロジックをここ以外に書かない。
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { partIndex, parts } from '../data/parts';

export type Chapter = CollectionEntry<'chapters'>;

/**
 * 全章を「部の並び順 × order」で一列に整列して返す。
 * 本番ビルドでは draft を除外。同一 part 内の order 重複は throw で検出（R8）。
 */
export async function getSortedChapters(): Promise<Chapter[]> {
  const entries = await getCollection('chapters', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const sorted = entries.sort((a, b) => {
    const pa = partIndex[a.data.part] ?? 999;
    const pb = partIndex[b.data.part] ?? 999;
    if (pa !== pb) return pa - pb;
    return a.data.order - b.data.order;
  });

  // order 重複チェック（同じ part 内で同じ order があると並びが崩れる）
  const seen = new Map<string, Set<number>>();
  for (const c of sorted) {
    const set = seen.get(c.data.part) ?? new Set<number>();
    if (set.has(c.data.order)) {
      throw new Error(
        `[chapters] order 重複: part="${c.data.part}" order=${c.data.order}（${c.id}）— frontmatter を確認`,
      );
    }
    set.add(c.data.order);
    seen.set(c.data.part, set);
  }

  return sorted;
}

/**
 * entry の id（ファイルパス由来、例 "01-beginner/00-install"）を
 * きれいなスラッグへ正規化する（数値プレフィックスを除去）。
 * 例 -> "beginner/install"。最終 URL は <base>/chapters/beginner/install/。
 */
export function normalizeSlug(id: string): string {
  return id
    .split('/')
    .map((seg) => seg.replace(/^\d+[-_]/, ''))
    .join('/');
}

/** 章の URL パス（base なし。href() に渡す前提） */
export function chapterPath(id: string): string {
  return `/chapters/${normalizeSlug(id)}`;
}

export interface PartGroup {
  part: (typeof parts)[number];
  chapters: Chapter[];
}

/** 整列済み章を部ごとにグルーピング（サイドバー用）。章が 1 つも無い部は除外。 */
export function groupByPart(sorted: Chapter[]): PartGroup[] {
  return parts
    .map((part) => ({
      part,
      chapters: sorted.filter((c) => c.data.part === part.id),
    }))
    .filter((g) => g.chapters.length > 0);
}

/** ある章の「その部の中で何章目 / 部内総数」を返す（進捗用） */
export function partProgress(
  sorted: Chapter[],
  current: Chapter,
): { index: number; total: number } {
  const inPart = sorted.filter((c) => c.data.part === current.data.part);
  const index = inPart.findIndex((c) => c.id === current.id);
  return { index: index + 1, total: inPart.length };
}
