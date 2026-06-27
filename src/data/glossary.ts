/**
 * glossary.ts — 用語集（単一の出どころ / ADR-002）
 *
 * 本文では <Term id="agent">エージェント</Term> のように id 参照する。
 * 解説文・正式名称はここだけにあるので、ここを直せば全ページのツールチップが一斉更新される。
 * 未定義 id は Term.astro がビルド時に throw して typo を検出する。
 *
 * short は HTML 文字列を持たない。部分強調は `**…**` のみ許可し、Term 側の最小パーサで
 * <b> に変換する（XSS 回避・一貫性。design.md §4.2）。
 */
export interface GlossaryEntry {
  /** 表示する正式名称（例 "Agent / エージェント"） */
  term: string;
  /** ツールチップ本文（1〜3 文。`**…**` で部分強調可） */
  short: string;
  /** 別名（将来の自動リンク用。MVP では未使用でも定義だけ用意） */
  aliases?: string[];
}

export const glossary: Record<string, GlossaryEntry> = {
  agent: {
    term: 'Agent / エージェント',
    short:
      '目標を渡すと**自分で手順を分解し**、ファイル読み取りやコマンド実行などのツールを使って完了まで進める AI。一問一答ではなく複数ステップを自律的にこなす。',
    aliases: ['エージェント'],
  },
  'claude-code': {
    term: 'Claude Code',
    short:
      'Anthropic のエージェント型コーディングツール。リポジトリを文脈として理解し、自然言語の指示からコードを生成・編集・実行・検証まで一貫して行う。CLI・IDE・デスクトップアプリ・Web から同じエンジンを使える。',
    aliases: ['Claude Code'],
  },
  'autonomous-loop': {
    term: '自律ループ',
    short:
      '「計画 → 編集 → コマンド実行 → 結果を見て次の手を決める」をエージェントが自分で回す流れ。失敗したテストを直すまで、といった曖昧な依頼も完了まで運ぶ。',
    aliases: ['自律ループ'],
  },
  repository: {
    term: 'Repository / リポジトリ',
    short:
      'プロジェクトのコード一式とその変更履歴をまとめた入れ物。Claude Code は単一ファイルではなくリポジトリ全体を文脈として扱える。',
    aliases: ['リポジトリ'],
  },
  prompt: {
    term: 'Prompt / プロンプト',
    short:
      'エージェントへの**指示文**。「このバグを直して」「テストを追加して」のような自然文でよい。文脈が具体的なほど結果が安定する。',
    aliases: ['プロンプト'],
  },
  surface: {
    term: 'Surface / サーフェス',
    short:
      'Claude Code を使う入り口のこと。CLI・VS Code・JetBrains・デスクトップアプリ・Web/iOS の各形態を指す。中身のモデルと能力は共通で、入り口だけが違う。',
    aliases: ['サーフェス'],
  },
  cli: {
    term: 'CLI / コマンドラインインターフェース',
    short:
      'ターミナル（シェル）から文字で操作する方式。claude コマンドを起動して対話する形態を本サイトでは「ターミナル版」と呼ぶ。',
    aliases: ['CLI'],
  },
  'claude-md': {
    term: 'CLAUDE.md',
    short:
      'プロジェクトのルートに置く Markdown ファイル。**毎セッション起動時に自動で読まれ**、コーディング規約・アーキ判断・使用ライブラリなどを Claude に常時伝えられる。全サーフェスで共通して効く。',
    aliases: ['CLAUDE.md'],
  },
  mcp: {
    term: 'MCP / Model Context Protocol',
    short:
      'AI ツールと外部データ・サービスを繋ぐオープン標準。Claude Code は **MCP クライアント**として、GitHub・Slack・DB などを自分の機能のように操作できる。',
    aliases: ['MCP'],
  },
  subagent: {
    term: 'Sub-agent / サブエージェント',
    short:
      '専門特化した別コンテキストのアシスタント。メイン会話を汚さず、限定したツール権限で作業し、**結果の要約だけ**を返す。使いこなせてようやく中級者。',
    aliases: ['サブエージェント'],
  },
  session: {
    term: 'Session / セッション',
    short:
      '「会話履歴 + 対象フォルダー + 変更」を 1 単位として持つ作業の塊。claude -c で直前を再開でき、名前を付けて復元もできる。',
    aliases: ['セッション'],
  },
  'permission-mode': {
    term: 'Permission Mode / 権限モード',
    short:
      'どこまで自動で実行してよいかの設定。default（都度確認）/ plan（解析のみ）/ acceptEdits（編集を自動承認）/ bypassPermissions（全権委任・危険）の 4 種。',
    aliases: ['権限モード'],
  },
  'native-install': {
    term: 'ネイティブインストール',
    short:
      '公式インストーラ（install.sh / install.ps1）で入れる方式。**裏で自動更新される**のが特徴。推奨の入れ方。',
    aliases: ['ネイティブインストール', 'ネイティブ版'],
  },
  homebrew: {
    term: 'Homebrew',
    short:
      'macOS / Linux 向けのパッケージ管理ツール。brew install --cask claude-code で入る。**自動更新されない**ため brew upgrade を自分で実行する必要がある。',
    aliases: ['Homebrew'],
  },
  wsl: {
    term: 'WSL / Windows Subsystem for Linux',
    short:
      'Windows 上で Linux 環境を動かす仕組み。Windows でターミナル版を使う場合の選択肢のひとつ。',
    aliases: ['WSL'],
  },
  'auto-update': {
    term: '自動更新',
    short:
      'ネイティブ版が裏で最新版に更新し続ける挙動。Homebrew / WinGet 版は対象外で手動更新が要る、という差が初心者のつまずきどころ。',
    aliases: ['自動更新'],
  },
  desktop: {
    term: 'デスクトップアプリ',
    short:
      'macOS / Windows 向けの GUI アプリ（**Linux 非対応**）。視覚的な差分レビュー・複数セッション並列・定期タスクが使える。Chat / Cowork / Code の 3 タブ構成。',
    aliases: ['デスクトップアプリ', 'デスクトップ版'],
  },
  hook: {
    term: 'Hook / フック',
    short:
      'Claude の動作の**特定の節目**（ツール実行の前後やセッション開始時など）で自動実行する自前の処理。編集後の自動整形や、危険コマンドの遮断などを仕込める。例えるなら Git の pre-commit の Claude 版。',
    aliases: ['フック'],
  },
  skill: {
    term: 'Skill / スキル',
    short:
      '繰り返す手順をひとつの入口にまとめた拡張。`SKILL.md` に名前と説明を書いて定義し、`/名前` で呼び出せる。多段のワークフローを再利用可能にする。',
    aliases: ['スキル'],
  },
  'agent-team': {
    term: 'エージェントチーム',
    short:
      'リード役のエージェントが複数のフルセッションを束ね、サブタスクを割り当てて結果をまとめる、複数エージェントの並列運用。上級の自動化で扱う。',
    aliases: ['エージェントチーム'],
  },
  workflow: {
    term: 'Workflow / ワークフロー',
    short:
      '「指示 → 計画 → 編集 → 検証」のように、ひとつの目的を達成するまでの一連の作業の流れ。Claude Code はこの流れをまとめて引き受ける。',
    aliases: ['ワークフロー'],
  },
  verification: {
    term: 'Verification / 検証',
    short:
      'エージェントが自分の変更が正しいかを**テストやビルドの実行で確かめる**こと。失敗を見て直す、を繰り返して完了に近づける。',
    aliases: ['検証'],
  },
  'status-line': {
    term: 'Status line / ステータスライン',
    short:
      'ターミナル版の画面下部などに出る状態表示。現在の権限モード・モデル・対象フォルダーなどがひと目で分かる。',
    aliases: ['ステータスライン'],
  },
  'plan-mode': {
    term: 'Plan mode / プランモード',
    short:
      'ファイル編集もコマンド実行もせず、**何をするかの計画だけ**を立てて見せるモード。大きめのタスク前にレビューでき、手戻りとコストを抑えられる。',
    aliases: ['プランモード'],
  },
  'approval-flow': {
    term: '承認フロー',
    short:
      'エージェントの提案（計画や差分）を人が確認してから取り込む往復のこと。いきなり確定させず、読んで納得してから進めるのが基本姿勢。',
    aliases: ['承認フロー'],
  },
  'slash-command': {
    term: 'スラッシュコマンド',
    short:
      '`/` で始まる組み込み命令。`/help` `/clear` `/compact` など、よく使う操作を呼び出せる。自分専用のコマンドも作れる。',
    aliases: ['スラッシュコマンド'],
  },
  models: {
    term: 'Opus / Sonnet / Haiku',
    short:
      'Claude のモデルの種類。**Opus** は最も賢く難所向き、**Sonnet** はバランス型、**Haiku** は高速・低コスト。タスクに応じて `/model` で切り替える。',
    aliases: ['Opus', 'Sonnet', 'Haiku', 'モデル'],
  },
  'at-mention': {
    term: '@メンション',
    short:
      '`@ファイル名` の形で、特定のファイルを会話の文脈に投入する入力テク。読んでほしいファイルを明示できる。',
    aliases: ['@メンション'],
  },
  'hash-memory': {
    term: '# メモリ追記',
    short:
      '行頭に `#` を付けて入力すると、その内容を**メモリ（CLAUDE.md など）に追記**できる入力テク。覚えておいてほしいことをその場で残せる。',
    aliases: ['メモリ追記'],
  },
  rewind: {
    term: 'Rewind / 巻き戻し',
    short:
      '直前の変更を**なかったことに戻す**機能。`/rewind` や Esc 2 回で呼び出す。失敗しても戻せるので、安心して試せる。',
    aliases: ['巻き戻し'],
  },
  checkpoint: {
    term: 'Checkpoint / チェックポイント',
    short:
      '巻き戻しの戻り先となる、変更の区切り点。エージェントの作業の節目に作られ、「ここまで戻る」を選べる。',
    aliases: ['チェックポイント'],
  },
  cowork: {
    term: 'Cowork',
    short:
      'デスクトップアプリのタブのひとつ。腰を据えた共同作業向けの画面で、Chat / Cowork / Code の 3 タブ構成の一角。',
    aliases: ['Cowork'],
  },
  'diff-view': {
    term: '差分ビュー / Diff',
    short:
      '変更前後のコードを**見比べられる表示**。デスクトップ版では視覚的に差分を確認し、承認しながら取り込める。',
    aliases: ['差分ビュー'],
  },
  'file-tree': {
    term: 'ファイルツリー',
    short:
      'プロジェクトのフォルダー・ファイルを階層表示するパネル。デスクトップ版ではここからファイルを選んで文脈に加えられる。',
    aliases: ['ファイルツリー'],
  },
};
