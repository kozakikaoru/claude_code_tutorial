/**
 * parts.ts — 部（第0部〜第6部 + 付録）のメタ定義（単一の出どころ）
 *
 * 章そのものは Content Collections から集める（src/utils/chapters.ts）。
 * ここでは「部の並び順・番号・表示名・到達点バナー文言」だけを定義する。
 * outline.md の確定目次に対応（全部分の枠を用意。本文 MDX は今フェーズはサンプル2章のみ）。
 *
 * frontmatter の `part` はここの `id` と一致させる（content.config.ts の enum と同期）。
 */
export interface Part {
  /** frontmatter の part に一致する識別子 */
  id: string;
  /** サイドバー等に出す部番号（"00"〜"06"） */
  no: string;
  /** 表示名 */
  label: string;
  /** 難易度レベル（バッジ・難易度マップ用） */
  level: '初級' | '初中級' | '中級' | '上級' | 'プロ' | 'リファレンス';
  /** 部の狙い（扉・トップのカードに使う 1 行） */
  aim: string;
  /** 到達点バナー（読むと何ができるか）。null は付録など */
  goal: string | null;
}

export const parts: readonly Part[] = [
  {
    id: 'intro',
    no: '00',
    label: 'はじめに',
    level: '初級',
    aim: '全体像と「なぜ画期的か」を掴み、難易度マップで読む順番を知る。',
    goal: 'Claude Code が何で、自分はどこから読むべきか分かる。',
  },
  {
    id: 'beginner',
    no: '01',
    label: '初級 — まず動かす',
    level: '初級',
    aim: 'インストールから「自然言語で実装 → 安全に試す → 巻き戻す」まで。',
    goal: 'ここまで読めば動かせる。インストールして自然言語で実装させ、安全に試して巻き戻せる。',
  },
  {
    id: 'customize',
    no: '02',
    label: '初中級 — 自分仕様にする',
    level: '初中級',
    aim: 'CLAUDE.md と設定で Claude を自分/チームのやり方に合わせ、Git まで任せる。',
    goal: '自分仕様にして、コミット〜PR まで任せられる。',
  },
  {
    id: 'subagents',
    no: '03',
    label: '中級の山 — サブエージェント',
    level: '中級',
    aim: '「コンテキストが命」を理解し、サブエージェント／スキル／フック／MCP を実務で使う。',
    goal: 'ここまでで実務にかなり投入できる。サブエージェントを使いこなせれば中級者。',
  },
  {
    id: 'advanced',
    no: '04',
    label: '上級 — 複数エージェントと自動化',
    level: '上級',
    aim: '単発から「複数エージェント並列・定期自動化・コスト最適化」へ。',
    goal: '並列・自動化を設計でき、コストを管理できる。',
  },
  {
    id: 'pro',
    no: '05',
    label: 'プロ — チーム & CI & SDK',
    level: 'プロ',
    aim: '個人運用からチーム/CI/SDK/ガバナンスへ。プロ水準の設計力。',
    goal: 'CI・SDK・チーム運用・課金/権限ガバナンスまで設計できる＝一流。',
  },
  {
    id: 'recipes',
    no: '06',
    label: '実践レシピ集',
    level: '中級',
    aim: 'レベル横断の事例・テンプレで「使いこなしの幅」を見せる読み物。',
    goal: '自分の現場への応用イメージが湧く。',
  },
  {
    id: 'appendix',
    no: '07',
    label: '付録 — 早見表・用語集',
    level: 'リファレンス',
    aim: 'スラッシュコマンド/ショートカット/CLI フラグ早見表、用語集、最新の追い方。',
    goal: null,
  },
] as const;

/** part id → Part の早引きマップ */
export const partById: Record<string, Part> = Object.fromEntries(
  parts.map((p) => [p.id, p]),
);

/** part id → 並び順インデックス（章の整列に使う） */
export const partIndex: Record<string, number> = Object.fromEntries(
  parts.map((p, i) => [p.id, i]),
);
