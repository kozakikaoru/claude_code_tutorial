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

  // ───────────────────────────────────────────────
  // 第2部 初中級 — 自分仕様にする
  // ───────────────────────────────────────────────
  'auto-memory': {
    term: 'Auto memory / 自動メモリ',
    short:
      'Claude が作業しながら**ビルド手順やデバッグの知見を自分で保存し**、セッションを跨いで活用する仕組み。行頭 `#` での手動追記もこの仕組みに乗る。',
    aliases: ['自動メモリ', 'オートメモリ'],
  },
  memory: {
    term: 'Memory / メモリ',
    short:
      'セッションを跨いで Claude に覚えておかせる情報の総称。`CLAUDE.md` などのファイルに書かれ、起動時に読み込まれて常時の文脈になる。',
    aliases: ['メモリ'],
  },
  context: {
    term: 'Context / コンテキスト',
    short:
      'Claude がその時点で参照している情報のまとまり。会話履歴・読み込んだファイル・`CLAUDE.md` などが含まれ、ここに入っている内容を踏まえて応答する。',
    aliases: ['コンテキスト', '文脈'],
  },
  'settings-json': {
    term: 'settings.json',
    short:
      '権限・フック・モデルなどの動作を決める設定ファイル。`~/.claude/settings.json`(個人共通)/ `.claude/settings.json`(チーム共有)/ `.claude/settings.local.json`(個人・gitignore)の3階層で管理する。',
    aliases: ['settings.json', '設定ファイル'],
  },
  permissions: {
    term: 'Permissions / 権限設定',
    short:
      'どのファイルを読み、どのコマンドを実行してよいかのルール。`allow`(許可)/ `deny`(遮断)/ `ask`(都度確認)で指定し、機密ファイルは `deny` で守る。',
    aliases: ['権限設定', 'パーミッション'],
  },
  'allow-deny-ask': {
    term: 'allow / deny / ask',
    short:
      'permissions で使う3種のルール。**allow** は自動許可、**deny** は完全遮断(機密ファイルやコマンド向き)、**ask** は実行前に毎回確認する。',
    aliases: ['allow', 'deny', 'ask'],
  },
  'hot-reload': {
    term: 'Hot reload / ホットリロード',
    short:
      '設定ファイルを保存すると、**再起動せずにその場で反映される**挙動。permissions やフックの変更もすぐ効くため、試しながら調整しやすい。',
    aliases: ['ホットリロード'],
  },
  stage: {
    term: 'Stage / ステージ',
    short:
      'Git でコミットに含める変更を選んで準備する操作(`git add` 相当)。Claude に「コミットして」と頼むと、この段階から自動で進めてくれる。',
    aliases: ['ステージ', 'ステージング'],
  },
  commit: {
    term: 'Commit / コミット',
    short:
      '変更履歴を1つの区切りとして Git に記録する操作。Claude はメッセージ文面まで作る。機能ごとに小さくコミットするのが扱いやすい。',
    aliases: ['コミット'],
  },
  'pull-request': {
    term: 'Pull Request / プルリクエスト (PR)',
    short:
      'ブランチの変更を本流に取り込むための提案。レビューしてから統合する。Claude に「PR作って」と頼むとブランチ作成から PR 提出まで任せられる。',
    aliases: ['プルリクエスト', 'PR'],
  },
  branch: {
    term: 'Branch / ブランチ',
    short:
      '本流から枝分かれさせて変更を進める作業線。本流を壊さず試せる。機能や修正ごとにブランチを切り、まとまったら PR で取り込む。',
    aliases: ['ブランチ'],
  },
  'dot-claude': {
    term: '.claude フォルダ',
    short:
      'プロジェクト直下に置く設定一式の入れ物。`agents/`・`commands/`(or `skills/`)・`hooks/`・`settings.json` などが入り、ここを見れば設定の全体像が分かる。',
    aliases: ['.claude フォルダ', '.claude ディレクトリ'],
  },
  'model-routing': {
    term: 'Model routing / モデルルーティング',
    short:
      'タスクに応じてモデルを使い分ける考え方。**探索や単純作業は安いモデル(Haiku)**、難所は賢いモデル(Opus)へ振り分け、品質とコストのバランスを取る。',
    aliases: ['モデルルーティング'],
  },

  // ───────────────────────────────────────────────
  // 第3部 中級の山 — サブエージェント
  // ───────────────────────────────────────────────
  'context-window': {
    term: 'Context window / コンテキストウィンドウ',
    short:
      'Claude が一度に扱える情報量の上限。会話やファイルがここに収まる。長い会話で埋まってくると応答品質が落ちやすく、これがサブエージェントを使う動機になる。',
    aliases: ['コンテキストウィンドウ'],
  },
  'context-pollution': {
    term: 'Context pollution / コンテキスト汚染',
    short:
      '検索結果・ログ・大量ファイルなど横道の情報でメイン会話の文脈が散らかること。本筋がぼやけて品質が落ちる。**別の頭(サブエージェント)に投げて要約だけ受け取る**と防げる。',
    aliases: ['コンテキスト汚染'],
  },
  'system-prompt': {
    term: 'System prompt / システムプロンプト',
    short:
      'その AI の役割や振る舞いをあらかじめ定める指示文。サブエージェントでは Markdown の**本文がそのままシステムプロンプト**になり、専門性を作り込める。',
    aliases: ['システムプロンプト'],
  },
  'tool-permission': {
    term: 'Tool permission / ツール権限',
    short:
      'そのエージェントが使えるツール(ファイル読み取り・編集・コマンド実行など)の範囲。**必要なものだけに絞る**ことで、安全性が増し挙動も安定する。',
    aliases: ['ツール権限'],
  },
  'yaml-frontmatter': {
    term: 'YAML フロントマター',
    short:
      'Markdown ファイル先頭に `---` で囲って書く設定欄。サブエージェントでは `name`・`description`・`tools`・`model` などをここで宣言する。',
    aliases: ['YAMLフロントマター', 'フロントマター'],
  },
  'agents-command': {
    term: '/agents コマンド',
    short:
      'サブエージェントを対話的に作成・編集・管理するスラッシュコマンド。ファイルを直接書かずに、案内に沿ってエージェントを用意できる。',
    aliases: ['/agents'],
  },
  'model-inherit': {
    term: 'model: inherit',
    short:
      'サブエージェントの設定値の一つで、**呼び出し元と同じモデルを使う**指定。個別に固定したいときはモデル名を書く。',
    aliases: ['inherit', 'モデル継承'],
  },
  'auto-delegation': {
    term: 'Auto delegation / 自動委譲',
    short:
      'Claude が各サブエージェントの `description` を見て、合致するタスクを**自動で割り振る**こと。`description` を具体的に書くほど狙い通りに呼ばれる。',
    aliases: ['自動委譲'],
  },
  description: {
    term: 'description / 説明文',
    short:
      'サブエージェントやコマンドが**いつ・何のために使われるか**を書くフロントマター項目。自動委譲の判断材料になるため、トリガー語・対象・場面を具体的に書く。',
    aliases: ['説明文'],
  },
  'plan-generate-evaluate': {
    term: '計画・生成・評価 (3分離パターン)',
    short:
      '1つのエージェントに計画・実装・評価を全部させず、**役割ごとに別エージェントへ分ける**公式パターン。独立した評価者が懐疑的に見ることで品質が上がる。',
    aliases: ['計画・生成・評価', '3分離パターン'],
  },
  planner: {
    term: 'Planner / 計画担当',
    short:
      '3分離パターンで**What/Why(何を・なぜ)**を担う役。要件から実装計画(md/json)を作り、技術詳細は決めすぎない。Opus または Sonnet を当てることが多い。',
    aliases: ['Planner', '計画担当'],
  },
  generator: {
    term: 'Generator / 生成担当',
    short:
      '3分離パターンで**How(どう作るか)**を担う役。計画を受けてコードとテストを書き、機能ごとに commit しながら逐次実装する。Sonnet を当てることが多い。',
    aliases: ['Generator', '生成担当'],
  },
  evaluator: {
    term: 'Evaluator / 評価担当',
    short:
      '3分離パターンで**第三者として成果物を検証する**役。計画とコードを突き合わせ、事実ベースで PASS / NEEDS_REVISION / FAIL を判定する。',
    aliases: ['Evaluator', '評価担当'],
  },
  'loose-coupling': {
    term: 'Loose coupling / 疎結合',
    short:
      '各役割がメイン会話を覗かず、**やり取りをファイル(md/json)経由に限る**設計。互いの内部に踏み込まないため、文脈が混ざらずトークンも節約できる。',
    aliases: ['疎結合'],
  },
  'binary-eval': {
    term: 'Binary evaluation / 二値評価',
    short:
      '評価を「満たす/満たさない」の**2択チェックリスト**で行うやり方。曖昧な点数付けを避け、判定がぶれにくくなる。根拠はファイルパス+行番号で示す。',
    aliases: ['二値評価', '二値チェックリスト'],
  },
  orchestration: {
    term: 'Orchestration / オーケストレーション',
    short:
      '複数の手順やエージェントを**全体の流れとして束ねて指揮する**こと。スキルやスラッシュコマンドがこの入口になり、単一責務のサブエージェントを順に動かす。',
    aliases: ['オーケストレーション'],
  },
  'single-responsibility': {
    term: 'Single responsibility / 単一責務',
    short:
      '1つのサブエージェントには**役割を1つだけ持たせる**設計指針。何でも屋にせず責務を絞ると、挙動が安定し再利用や差し替えもしやすい。',
    aliases: ['単一責務'],
  },
  'skill-md': {
    term: 'SKILL.md',
    short:
      'スキルの実体となるファイル。`.claude/skills/` に置き、YAML で `name` と `description` を書く。多段ワークフローをまとめ、`/名前` で呼び出せるようにする。',
    aliases: ['SKILL.md'],
  },
  'code-reviewer': {
    term: 'code-reviewer / コードレビュー担当',
    short:
      'コードの問題点を指摘する役割のサブエージェント例。実務テンプレの定番の一つで、レビュー観点を `description` と本文に書いて専門化する。',
    aliases: ['code-reviewer', 'コードレビュー担当'],
  },
  'test-runner': {
    term: 'test-runner / テスト実行担当',
    short:
      'テストを走らせて結果を確認する役割のサブエージェント例。実行系のため軽量モデルにルーティングしてコストを抑えやすい。',
    aliases: ['test-runner', 'テスト実行担当'],
  },
  'log-investigator': {
    term: 'log-investigator / ログ調査担当',
    short:
      'ログやエラー出力を調べて原因の手がかりを返す役割のサブエージェント例。大量のログをメイン会話に流し込まず、要点だけ受け取れる。',
    aliases: ['log-investigator', 'ログ調査担当'],
  },
  'custom-slash-command': {
    term: 'カスタムスラッシュコマンド',
    short:
      '自分で定義する `/` コマンド。`.claude/commands/<名前>.md`(個人は `~/.claude/commands/`)に置き、本文がプロンプトテンプレ、フロントマターで説明・許可ツール・モデルを指定する。',
    aliases: ['カスタムスラッシュコマンド'],
  },
  'pre-tooluse': {
    term: 'PreToolUse',
    short:
      'ツールが実行される**直前**に発火するフックのイベント。`rm -rf` のような危険コマンドをここで止める、といった事前チェックに使う。',
    aliases: ['PreToolUse'],
  },
  'post-tooluse': {
    term: 'PostToolUse',
    short:
      'ツールが実行された**直後**に発火するフックのイベント。ファイル編集後に自動フォーマットをかける、などの後処理に使う。',
    aliases: ['PostToolUse'],
  },
  matcher: {
    term: 'Matcher / マッチャー',
    short:
      'フックを**どのツールに効かせるか**を絞り込む条件。例えば `Edit|Write` で編集系だけ、`Bash` でコマンド実行だけ、というように対象を限定する。',
    aliases: ['マッチャー'],
  },
  'exit-2': {
    term: 'exit 2 (ブロッキング)',
    short:
      'フックが返す終了コード。`0` は成功、**`2` は処理をブロック**し、エラー内容を Claude に渡して動作を止める。lint 失敗時の遮断などに使う。',
    aliases: ['exit 2', '終了コード2'],
  },
  'mcp-client': {
    term: 'MCP クライアント',
    short:
      'MCP サーバーに繋いでそのツールを使う側。Claude Code は MCP クライアントとして、GitHub・Slack・DB などを**自分の機能のように**呼び出せる。',
    aliases: ['MCPクライアント'],
  },
  'mcp-server': {
    term: 'MCP サーバー',
    short:
      '外部サービスやデータへの操作を MCP 経由で提供する側。GitHub・Slack・PostgreSQL・ブラウザなどがサーバーとなり、クライアント(Claude Code)から使われる。',
    aliases: ['MCPサーバー'],
  },
  transport: {
    term: 'Transport / トランスポート',
    short:
      'MCP クライアントとサーバーの**つなぎ方(通信方式)**。ローカル直結の stdio、ネットワーク越しの SSE / HTTP がある。',
    aliases: ['トランスポート', 'stdio/SSE/HTTP'],
  },
  'least-privilege': {
    term: 'Least privilege / 最小権限',
    short:
      '各エージェントやツールに**必要最小限の権限しか与えない**原則。事故や誤操作の被害を抑える、安全運用の基本姿勢。',
    aliases: ['最小権限'],
  },

  // ───────────────────────────────────────────────
  // 第4部 上級 — 複数エージェントと自動化
  // ───────────────────────────────────────────────
  'lead-agent': {
    term: 'Lead agent / リードエージェント',
    short:
      'エージェントチームで**調整役**を務める親エージェント。サブタスクを各エージェントに割り当て、返ってきた結果をまとめ上げる。',
    aliases: ['リードエージェント'],
  },
  'agent-view': {
    term: 'Agent view',
    short:
      '並列で動く複数のセッションを**1画面でまとめて監視する**ビュー。それぞれの進捗を見ながらエージェントチームを運用できる。',
    aliases: ['agent view'],
  },
  'background-agent': {
    term: 'Background agent / バックグラウンドエージェント',
    short:
      '別作業を続けながら**裏で走らせるセッション**。`Ctrl+B` で長い処理をバックグラウンドへ送り、完了時に通知を受け取れる。',
    aliases: ['バックグラウンドエージェント'],
  },
  'nested-subagent': {
    term: '入れ子サブエージェント',
    short:
      'サブエージェントが**さらに別のサブエージェントを呼ぶ**階層構造。大きな仕事を段階的に分割できる(2026年時点で最大3階層とされる ※最新版で要確認)。',
    aliases: ['入れ子サブエージェント', 'ネストサブエージェント'],
  },
  'fallback-model': {
    term: 'fallbackModel / フォールバックモデル',
    short:
      '指定したモデルが使えないときに**代わりに使う控えのモデル**。複数を連ねて指定でき、混雑や上限到達時でも作業を続けやすくする(最大3つとされる ※最新版で要確認)。',
    aliases: ['fallbackModel', 'フォールバックモデル'],
  },
  worktree: {
    term: 'Git worktree / ワークツリー',
    short:
      '同じリポジトリの**別ブランチを別フォルダーとして同時に開く**Git の仕組み。ブランチを物理的に分けて並列セッションを安全に走らせられる。',
    aliases: ['worktree', 'ワークツリー'],
  },
  'sparse-paths': {
    term: 'worktree.sparsePaths / スパースパス',
    short:
      '大規模モノレポで**必要なパスだけを読み込ませる**設定。全体を抱え込まずに済み、コンテキストとコストを抑えられる。',
    aliases: ['sparsePaths', 'スパースパス'],
  },
  compact: {
    term: '/compact / 圧縮',
    short:
      '会話の要点を残して**圧縮しつつ続ける**スラッシュコマンド。コンテキストが膨らんだときにトークンを節約できる。履歴を消す `/clear` とは別物。',
    aliases: ['/compact', '圧縮'],
  },
  'prompt-cache': {
    term: 'Prompt cache / プロンプトキャッシュ',
    short:
      '繰り返し使う文脈を**キャッシュして再利用する**仕組み。同じ前提を毎回送り直さずに済み、応答が速くコストも下がる。',
    aliases: ['プロンプトキャッシュ'],
  },
  token: {
    term: 'Token / トークン',
    short:
      'AI が文章を扱う単位。文字数に近い概念で、**入力・出力の量に応じてコストがかかる**。コンテキスト管理やコスト最適化の基準になる。',
    aliases: ['トークン'],
  },
  routines: {
    term: 'Routines / ルーティン',
    short:
      'Anthropic 管理のインフラ上で動く定期実行。**PC を閉じていても動き**、API や GitHub イベントでもトリガーできる。朝の PR レビューや夜間 CI 解析などに使う。',
    aliases: ['Routines', 'ルーティン'],
  },
  'scheduled-task': {
    term: '定期タスク',
    short:
      '決まった時刻やイベントで自動的に走らせる仕事。デスクトップ版の定期タスクは自分のマシンで動き、ローカルのファイルやツールに直接アクセスできる。',
    aliases: ['定期タスク', 'スケジュールタスク'],
  },
  'loop-command': {
    term: '/loop',
    short:
      'CLI セッション内で**プロンプトを一定間隔で繰り返す**スラッシュコマンド。状態のポーリングなどに使う(最大3日継続とされる ※最新版で要確認)。',
    aliases: ['/loop'],
  },
  teleport: {
    term: '--teleport / テレポート',
    short:
      'Web や iOS で始めた長時間タスクを**ターミナルに引き込む**機能。`claude --teleport` で、続きを手元のターミナルで扱える。',
    aliases: ['--teleport', 'テレポート'],
  },
  'desktop-command': {
    term: '/desktop',
    short:
      'ターミナルのセッションを**デスクトップアプリに渡す**スラッシュコマンド。視覚的な差分レビューに切り替えたいときに使う。',
    aliases: ['/desktop'],
  },
  'remote-control': {
    term: 'Remote Control / リモートコントロール',
    short:
      'スマホや別ブラウザから、手元で動いている**ローカルセッションを継続操作する**機能。外出先から進捗を見て指示を足せる。',
    aliases: ['リモートコントロール', 'Remote Control'],
  },
  dispatch: {
    term: 'Dispatch / ディスパッチ',
    short:
      'スマホから**タスクを投げて、デスクトップ側でセッションを開かせる**機能。移動中に依頼だけ済ませ、戻ってから結果を確認できる。',
    aliases: ['Dispatch', 'ディスパッチ'],
  },
  btw: {
    term: '/btw',
    short:
      'メイン会話を汚さずに**ちょっとした横の質問をする**スラッシュコマンド。やり取りが本筋の履歴に残らないため、文脈を保ったまま気軽に聞ける。',
    aliases: ['/btw', 'サイドクエスチョン'],
  },
  'safe-mode': {
    term: '--safe-mode / セーフモード',
    short:
      'フックやプラグインなどの**カスタム初期化をスキップして起動する**オプション。素早く立ち上げたいときや、設定の切り分け確認に使う。',
    aliases: ['--safe-mode', 'セーフモード'],
  },
  'bang-command': {
    term: '!コマンド (即シェル実行)',
    short:
      '行頭に `!` を付けると、**推論を挟まずシェルコマンドをそのまま即実行**する入力テク。決まったコマンドをサッと打ちたいときに速い。',
    aliases: ['!コマンド', 'バンコマンド'],
  },

  // ───────────────────────────────────────────────
  // 第5部 プロ — チーム & CI & SDK
  // ───────────────────────────────────────────────
  headless: {
    term: 'Headless / ヘッドレス',
    short:
      '対話画面(REPL)を使わず、**1回のコマンドとして実行する**使い方。`claude -p` がこれにあたり、スクリプトや CI に組み込みやすい。',
    aliases: ['ヘッドレス'],
  },
  'claude-p': {
    term: 'claude -p (--print)',
    short:
      'プロンプトを1回だけ実行して結果を返すヘッドレス起動(`--print` の略)。`tail -200 app.log | claude -p "異常があれば報告"` のように Unix のパイプと合成できる。',
    aliases: ['claude -p', '--print'],
  },
  'output-format': {
    term: '--output-format',
    short:
      '`claude -p` の出力形式を指定するオプション。テキストだけでなく**機械で扱いやすい形(JSON など)**で受け取れ、後続処理に渡しやすくなる。',
    aliases: ['--output-format', '出力フォーマット'],
  },
  'github-actions': {
    term: 'GitHub Actions',
    short:
      'GitHub のワークフロー自動実行基盤。Claude Code を組み込むと、PR レビューや issue トリアージを CI 上で自動化できる。',
    aliases: ['GitHub Actions'],
  },
  'claude-code-action': {
    term: 'claude-code-action',
    short:
      '公式の GitHub Action(`anthropics/claude-code-action@v1`)。ヘッドレス実行をラップしており、`/install-github-app` で対話的にセットアップできる。',
    aliases: ['claude-code-action'],
  },
  cron: {
    term: 'cron / スケジュール式',
    short:
      '「毎日3時」のように**時刻指定で定期実行する書式**。GitHub Actions の `schedule` などで `cron: "0 3 * * *"` のように書く。',
    aliases: ['cron'],
  },
  'agent-sdk': {
    term: 'Claude Agent SDK',
    short:
      'Claude Code のツール群を使って**独自エージェントを構築する開発キット**(TypeScript / Python)。オーケストレーションやツール権限を細かく制御できる。公式 GitHub Action もこの上に作られている。',
    aliases: ['Claude Agent SDK', 'Agent SDK'],
  },
  monorepo: {
    term: 'Monorepo / モノレポ',
    short:
      '複数のプロジェクトを**1つのリポジトリにまとめて管理する**構成。規模が大きくなりやすいため、sparse worktree で必要パスだけ読ませる工夫が効く。',
    aliases: ['モノレポ'],
  },
  'dev-container': {
    term: 'Dev Container / 開発コンテナ',
    short:
      '開発環境をコンテナとして定義し、**誰の手元でも同じ環境**を再現する仕組み。チームで Claude Code の前提を揃えるのに役立つ。',
    aliases: ['Dev Container', '開発コンテナ'],
  },
  sandbox: {
    term: 'Sandbox / サンドボックス',
    short:
      '実行を**隔離された安全な領域**に閉じ込める仕組み。万一危険な操作が走っても本体環境に影響しにくく、自動実行の安全性を高める。',
    aliases: ['サンドボックス'],
  },
  opentelemetry: {
    term: 'OpenTelemetry',
    short:
      '動作の記録(メトリクス・ログ等)を集める業界標準。エンタープライズでは Claude Code の利用状況を OpenTelemetry で監視・分析できる。',
    aliases: ['OpenTelemetry', 'OTel'],
  },
  'monthly-credit': {
    term: '月次クレジット',
    short:
      '`claude -p`・Agent SDK・GitHub Actions など**自動化経由の利用に使われる、通常のサブスク枠とは別の枠**(2026/6/15〜)。使いすぎを防ぐため自動化章では注意が要る。',
    aliases: ['月次クレジット', 'クレジット'],
  },
  governance: {
    term: 'Governance / ガバナンス',
    short:
      'チームや組織で**コストと権限を安全に統制する**取り組み。最小権限の徹底、`deny` 設計、課金事故の予防などをルールとして整える。',
    aliases: ['ガバナンス'],
  },

  // ───────────────────────────────────────────────
  // 第6部 実践レシピ集
  // ───────────────────────────────────────────────
  'lessons-md': {
    term: 'lessons.md',
    short:
      '修正パターンや学びを書き溜めておくファイル。Claude に参照させて**同じ失敗を繰り返させない**、自己改善ループの足場になる(運用テンプレ例)。',
    aliases: ['lessons.md'],
  },
  marp: {
    term: 'Marp',
    short:
      'Markdown からスライドを生成するツール。Claude に文字起こしや要点をまとめさせ、**Markdown でプレゼン資料を作る**業務自動化に使える。',
    aliases: ['Marp'],
  },
  'gradient-automation': {
    term: 'グラデーション自動化',
    short:
      '**100%の自動化を狙わず、一番面倒な部分だけを自動化する**考え方。人と AI の役割分担を程よく保ち、現実的に効果を出す設計思想。',
    aliases: ['グラデーション自動化', 'グラデーション思考'],
  },
  'spec-driven': {
    term: 'Spec-driven / 仕様駆動',
    short:
      '作業前に仕様(やること・前提)を文書で固めてから進めるやり方。`PLAN` / `SPEC` / `TODO` / `KNOWLEDGE` などのドキュメントで Claude の迷いを減らす。',
    aliases: ['仕様駆動', '仕様駆動開発'],
  },
  'commander-agent': {
    term: '司令塔エージェント',
    short:
      '優先順位を決めて全体を指揮する親役のエージェント。各役割のサブエージェントに下書きを作らせ、まとめ上げる「AIカンパニー」事例の中心になる(個人事例)。',
    aliases: ['司令塔エージェント', '司令塔AI'],
  },
  'feedback-loop': {
    term: 'Feedback loop / フィードバックループ',
    short:
      '結果を振り返って次の指示や設定に反映し、**回すほど精度が上がっていく**仕組み。`lessons.md` などと組み合わせて育てる。',
    aliases: ['フィードバックループ'],
  },
  'hybrid-workflow': {
    term: 'ハイブリッド運用',
    short:
      'ターミナル・デスクトップ・スマホを**場面ごとに使い分けて1つの作業をつなぐ**運用。朝はスマホで依頼、日中はデスクトップでレビュー、夜はターミナルでバッチ、のように回す。',
    aliases: ['ハイブリッド運用', 'ハイブリッドワークフロー'],
  },
  'destructive-operation': {
    term: '破壊的操作',
    short:
      '`push --force` や `rm -rf` のように、**元に戻しにくい/取り返しのつかない操作**。AI に丸投げせず人が最終判断すべき領域で、`deny` 設計で守る対象。',
    aliases: ['破壊的操作'],
  },
  'safety-guardrail': {
    term: '安全ガードレール',
    short:
      '事故を防ぐために設ける歯止めの総称。`deny` での遮断、フックでの危険コマンドブロック、最小権限、`bypassPermissions` を避ける、などを組み合わせる。',
    aliases: ['安全ガードレール', 'ガードレール'],
  },
};
