/**
 * steps.ts — 章本文（MDX raw）から「ステップ総数」と「リード有無」を数える純関数。
 * （architecture/step-design.md §4.2）
 *
 * rehype-stepify は HAST のトップレベル <h2> を境界に section へ割る。ここではビルド時に
 * その「割れ方」を本文文字列から先読みして、章境界リンク（前章の最終 step 番号など）に使う。
 * render() は section 数を返さないため、本文を軽量にパースしてカウントする。
 *
 * 約束:
 *   - rehype 側と同じく「トップレベルの ## だけ」を境界とみなす。
 *     <ModeBlock>…</ModeBlock> や ``` フェンスの内側にある ## は境界に数えない
 *     （rehype は入れ子の h2 を分割境界にしないため、ここも一致させる）。
 *   - リード（最初のトップレベル ## より前に実体テキストがある）なら step0 を 1 つ加える。
 *   - トップレベル ## が 0 個なら steps = 1（単一節章は丸ごと 1 ステップ）。
 */

export interface StepInfo {
  /** ステップ総数（step0 を含む） */
  total: number;
  /** リード（step0）があるか */
  hasLede: boolean;
  /** 最後のステップの番号（0 始まり）。deep link `#step-<last>` 用 */
  lastIndex: number;
}

/** frontmatter（先頭の --- … ---）を取り除く */
function stripFrontmatter(body: string): string {
  if (body.startsWith('---')) {
    const end = body.indexOf('\n---', 3);
    if (end !== -1) {
      const after = body.indexOf('\n', end + 1);
      return after !== -1 ? body.slice(after + 1) : '';
    }
  }
  return body;
}

/**
 * 本文 raw から step 情報を算出する。
 * トップレベル判定: コードフェンス（``` / ~~~）の外、かつ JSX 要素のネスト深さ 0 の行の `## ` のみ数える。
 * JSX ネストは <ModeBlock> 等の開きタグ／閉じタグを数えて近似する（自己完結タグ <X /> は無視）。
 */
export function computeSteps(rawBody: string): StepInfo {
  const body = stripFrontmatter(rawBody);
  const lines = body.split(/\r?\n/);

  let inFence = false;
  let fenceMarker = '';
  let jsxDepth = 0;
  let topLevelH2 = 0;
  let ledeSeen = false;
  let firstH2Reached = false;

  for (const raw of lines) {
    const line = raw;
    const trimmed = line.trim();

    // コードフェンスの開閉（``` または ~~~）
    const fenceMatch = trimmed.match(/^(```+|~~~+)/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        inFence = false;
        fenceMarker = '';
      }
      continue;
    }
    if (inFence) continue;

    // トップレベル（jsxDepth===0）の H2 を境界としてカウント
    if (jsxDepth === 0 && /^##\s+/.test(trimmed)) {
      topLevelH2 += 1;
      firstH2Reached = true;
    } else if (!firstH2Reached && trimmed.length > 0) {
      // 最初のトップレベル H2 より前に実体（空行以外）があればリード扱い。
      // ただし開きの JSX タグ行（<ModeBlock> など）単体はリード本文とはみなさない方が自然だが、
      // Callout 等のリード文も step0 に入るため、実体テキストがあれば lede ありとする。
      ledeSeen = true;
    }

    // JSX ネスト深さの更新（行内の開き/閉じブロックタグを数える簡易版）
    // 開き <Tag ...>（末尾が "/>" でない、かつ </ で始まらない）で +1、閉じ </Tag> で -1。
    // 大文字始まりのコンポーネント名のみ対象（ModeBlock/Callout/CodeBlock/GlassShowcase 等）。
    const openTags = trimmed.match(/<([A-Z][A-Za-z0-9]*)(\s[^>]*)?>/g) || [];
    for (const t of openTags) {
      if (!/\/>\s*$/.test(t)) jsxDepth += 1;
    }
    const closeTags = trimmed.match(/<\/([A-Z][A-Za-z0-9]*)>/g) || [];
    jsxDepth -= closeTags.length;
    if (jsxDepth < 0) jsxDepth = 0;
  }

  const hasLede = ledeSeen;
  // ステップ数 = トップレベル H2 数 +（リードがあれば 1）。H2 が 0 でも最低 1 ステップ。
  let total = topLevelH2 + (hasLede ? 1 : 0);
  if (total < 1) total = 1;

  return { total, hasLede, lastIndex: total - 1 };
}
