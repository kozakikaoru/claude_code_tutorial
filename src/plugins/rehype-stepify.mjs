/**
 * rehype-stepify.mjs — 章本文を「§（H2）ひとつ = 1ステップ」に自動分割する rehype プラグイン。
 * （ADR-003 / architecture/step-design.md §1）
 *
 * 仕組み:
 *   MDX が JSX を要素へコンパイルし終えた後の HAST（HTML AST）に対し、トップレベルの
 *   <h2> を境界として「その h2 と、次の h2 までの兄弟ノード群」を 1 つの
 *   <section class="step" data-step="N" id="step-N"> で包む。最初の h2 より前のリード文は
 *   data-step="0" の section にまとめる（リードが無ければ step0 は作らない）。
 *
 *   <ModeBlock>/<Term>/<CodeBlock>/<Callout> はこの段階で既に要素ノード化済みなので、
 *   section で包んでも <Content components={...}> の対応付けはそのまま効く（本文 MDX は無改変）。
 *
 * 設計上の約束:
 *   - ステップ識別は「番号」を正とする。section の id は連番 step-N で固定（見出し slug 非依存・S12）。
 *   - h2 への slug id 付与は Astro 既定の rehypeHeadingIds が本プラグインの後段で行う。
 *     よって本プラグインは h2.id に依存しない（aria は h2 のテキストから aria-label を作る）。
 *   - h2 が 1 つも無い章は何もしない（section で包まない）。送り JS 側も steps<=1 で無効化（S8）。
 *
 * 注意:
 *   - root.children の中で <h2> 以外に挟まる空白テキスト（改行）も、直近の section に含める。
 *   - JSX フラグメント等で h2 が入れ子要素の中にある場合は分割境界に「ならない」
 *     （トップレベルの h2 のみを境界とする）。既存章は全て `## ` がトップレベルなので問題ない。
 */

/** HAST ノードから可視テキストを連結して取り出す（aria-label 用の最小実装） */
function textOf(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (Array.isArray(node.children)) {
    return node.children.map(textOf).join('');
  }
  return '';
}

/** h2 要素か判定 */
function isH2(node) {
  return node && node.type === 'element' && node.tagName === 'h2';
}

/** 空白だけのテキストノードか（セクション境界の判定で「実体なし」とみなす） */
function isWhitespace(node) {
  return node && node.type === 'text' && (node.value == null || node.value.trim() === '');
}

export default function rehypeStepify() {
  return function transformer(tree) {
    if (!tree || !Array.isArray(tree.children)) return;

    const children = tree.children;

    // トップレベルに h2 が無ければ分割しない（単一節章はそのまま）。
    const hasH2 = children.some(isH2);
    if (!hasH2) return;

    /** @type {{ step: number, nodes: any[] }[]} */
    const buckets = [];
    let current = { step: 0, nodes: [] };
    let stepCounter = 0;

    for (const node of children) {
      if (isH2(node)) {
        // 直前バケットに「実体（空白以外）」があれば確定して push。
        const hasContent = current.nodes.some((n) => !isWhitespace(n));
        if (hasContent) buckets.push(current);
        stepCounter += 1;
        current = { step: stepCounter, nodes: [node] };
      } else {
        current.nodes.push(node);
      }
    }
    // 末尾バケット
    if (current.nodes.some((n) => !isWhitespace(n))) buckets.push(current);

    // section 要素に包む
    tree.children = buckets.map((b) => {
      const properties = {
        className: ['step'],
        'data-step': String(b.step),
        id: `step-${b.step}`,
        'aria-roledescription': 'ステップ',
      };

      // step1 以降は先頭が h2。その見出しテキストを aria-label に流用（SR 用）。
      if (b.step > 0) {
        const h2 = b.nodes.find(isH2);
        const label = h2 ? textOf(h2).trim() : '';
        if (label) properties['aria-label'] = label;
      } else {
        properties['aria-label'] = '章のはじめに';
      }

      // 内容は .step-inner で包む（中央寄せ・最大幅 --maxread を CSS で適用）。
      // section 自体は「縦中央寄せ＋必要時スクロール」の枠、.step-inner が本文カラム。
      const inner = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['step-inner'] },
        children: b.nodes,
      };

      return {
        type: 'element',
        tagName: 'section',
        properties,
        children: [inner],
      };
    });
  };
}
