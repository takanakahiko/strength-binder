export const elements = [
  // 思考力
  '分析思考',
  '原点思考',
  '未来志向',
  '着想',
  '収集心',
  '内省',
  '学習欲',
  '戦略性',

  // 人間関係力
  '適応性',
  '運命思考',
  '成長促進',
  '共感性',
  '調和性',
  '包含',
  '個別化',
  'ポジティブ',
  '親密性',

  // 影響力
  '活発性',
  '指令性',
  'コミュニケーション',
  '競争性',
  '最上志向',
  '自己確信',
  '自我',
  '社交性',

  // 実行力
  '達成欲',
  'アレンジ',
  '信念',
  '公平性',
  '慎重さ',
  '規律性',
  '目標志向',
  '責任感',
  '回復志向',
]

interface ElementCategory {
  name: string;
  color: string;
  elementIndexies: number[];
  description: string;
}

export const elementCategories: ElementCategory[] = [
  {
    name: '思考力',
    color: 'rgba(0,227,150,0.8)',
    elementIndexies: [0, 1, 2, 3, 4, 5, 6, 7],
    description: '「考えたい」「頭脳活動をしたい」資質',
  },
  {
    name: '人間関係力',
    color: 'rgba(0,143,251,0.8)',
    elementIndexies: [8, 9, 10, 11, 12, 13, 14, 15, 16],
    description: '「人とつながりたい」「関係性を築きたい」資質',
  },
  {
    name: '影響力',
    color: 'rgba(254,176,25,0.8)',
    elementIndexies: [17, 18, 19, 20, 21, 22, 23, 24],
    description: '「人に影響を与えたい」「人を動かしたい」資質',
  },
  {
    name: '実行力',
    color: 'rgba(119,93,208,0.8)',
    elementIndexies: [25, 26, 27, 28, 29, 30, 31, 32, 33],
    description: '「何かを実行したい」「完遂したい」資質',
  },
]

// takanakahiko の結果。ダーミー用データとして使う。
export const tempStrengthsFinderResult = {
  meta: null,
  elementIndexies: [21, 8, 16, 14, 3],
}

const dummyCategory = {
  name: 'エラー',
  color: 'rgba(255,0,0,0.8)',
  elementIndexies: [],
  description: 'エラー',
}

export const element2category = (elementIndex: number): ElementCategory => {
  for (const category of elementCategories) {
    if (category.elementIndexies.includes(elementIndex)) return category
  }
  return dummyCategory
}
