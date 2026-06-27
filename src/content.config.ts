/**
 * content.config.ts — Content Collections 定義（design.md §2）
 *
 * 章は MDX で src/content/chapters/ に置く（1 ファイル = 1 章）。
 * glob ローダで集め、frontmatter を Zod で型検証する。order 未設定や part の typo は
 * ビルド時に検出される。getCollection('chapters') でサイドバー・前後ナビ・進捗を自動生成。
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// parts.ts の id と同期させること（部メタの単一の出どころは parts.ts）。
const PARTS = [
  'intro',
  'beginner',
  'customize',
  'subagents',
  'advanced',
  'pro',
  'recipes',
  'appendix',
] as const;
const LEVELS = ['初級', '初中級', '中級', '上級', 'プロ', 'リファレンス'] as const;
const MODES = ['terminal', 'desktop'] as const;

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/chapters' }),
  schema: z.object({
    /** 章タイトル（例「Claude Code とは」） */
    title: z.string(),
    /** 所属する部の id（parts.ts と一致） */
    part: z.enum(PARTS),
    /** 部内の表示順（1,2,3…）。サイドバー・前後ナビの並び根拠 */
    order: z.number(),
    /** 難易度タグ */
    level: z.enum(LEVELS),
    /** 1〜2 文の概要（リード/カード/meta description に流用） */
    summary: z.string(),
    /** 読了目安（分）。未指定可 */
    readingTime: z.number().optional(),
    /** 更新日（byline 表示）。未指定可 */
    updated: z.coerce.date().optional(),
    /** true は本番ビルドから除外 */
    draft: z.boolean().default(false),
    /** この章が両モード共通か片方専用か（既定は両対応） */
    modes: z.array(z.enum(MODES)).default(['terminal', 'desktop']),
  }),
});

export const collections = { chapters };
