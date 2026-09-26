/** 田園語遊 — 關卡數字與題庫（香港小二測驗級；UI／題幹＝書面語；自編，非逐字抄卷）
 * 真三難度：每關 itemsByDiff.easy / medium / hard 為獨立題池（≥20），零跨難度重複；session 抽題見 drawLevelItems。
 */
export const BALANCE = {
  pressMs: 80,
  restartMs: 1500,
  toastMs: 1800,
  fxOkMs: 1100,
  fxBadMs: 1800,
  cowSwapMs: 600,
  /** 橫向大廳熱點（對應 hub_bg_landscape 五區；中央果園 R24） */
  spotsLandscape: [
    { id: 'veg', levelId: 'L1_typo', name: '菜園・錯別字判斷', x: 0.22, y: 0.28, color: 0x81c784 },
    { id: 'barn', levelId: 'L4_measure', name: '穀倉・量詞填空', x: 0.78, y: 0.28, color: 0xffb74d },
    { id: 'pond', levelId: 'L2_reorder_sentence', name: '魚塘・重組句子', x: 0.22, y: 0.72, color: 0x4fc3f7 },
    { id: 'pasture', levelId: 'L3_paragraph', name: '牧場・排句成段', x: 0.78, y: 0.72, color: 0xaed581 },
    { id: 'orchard', levelId: 'L5_picture_sentence', name: '果園・看圖造句', x: 0.50, y: 0.45, color: 0xff8a65 }
  ],
  /** 豎向大廳熱點（R26：hub_bg_portrait 上→下菜園→魚塘→果園→穀倉→牧場） */
  spotsPortrait: [
    { id: 'veg', levelId: 'L1_typo', name: '菜園・錯別字判斷', x: 0.50, y: 0.12, color: 0x81c784 },
    { id: 'pond', levelId: 'L2_reorder_sentence', name: '魚塘・重組句子', x: 0.50, y: 0.31, color: 0x4fc3f7 },
    { id: 'orchard', levelId: 'L5_picture_sentence', name: '果園・看圖造句', x: 0.50, y: 0.50, color: 0xff8a65 },
    { id: 'barn', levelId: 'L4_measure', name: '穀倉・量詞填空', x: 0.50, y: 0.69, color: 0xffb74d },
    { id: 'pasture', levelId: 'L3_paragraph', name: '牧場・排句成段', x: 0.50, y: 0.88, color: 0xaed581 }
  ],
  cowLandscape: { x: 0.50, y: 0.90 },
  cowPortrait: { x: 0.86, y: 0.94 },
  cow: { x: 0.50, y: 0.90 },
  /** 三旋鈕：選項數（L4）／L2 塊數／干擾近似度；L1 難度＝句內形近字密度；L3 句數見各池 */
  difficulty: {
    easy: { label: '簡單', choiceCount: 3, blockCount: 3, similarity: 'low' },
    medium: { label: '中等', choiceCount: 4, blockCount: 4, similarity: 'mid' },
    hard: { label: '困難', choiceCount: 5, blockCount: 10, similarity: 'high' }
  }
};
BALANCE.spots = BALANCE.spotsLandscape;

/** 依螢幕方向取熱點表 */
export function getSpots(portrait) {
  return portrait ? BALANCE.spotsPortrait : BALANCE.spotsLandscape;
}

export function getCow(portrait) {
  return portrait ? BALANCE.cowPortrait : BALANCE.cowLandscape;
}

/**
 * 題庫：itemsByDiff 分池；錯字僅繁體字形內形近／誤用；禁簡體、假字。
 */
export const LEVELS = {
  L1_typo: {
    id: 'L1_typo',
    spot: 'veg',
    name: '錯別字判斷',
    verb: 'tap',
    npc: '農夫',
    voice: 'primary',
    goal: '請點選句子中寫錯的字',
    itemsByDiff: {
      easy: [
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '小烏飛得很高。',
          wrongIndex: 1,
          wrongChar: '烏',
          correctChar: '鳥',
          speak: '小鳥飛得很高',
          hint: '注意哪個字少了一點。',
          hints: ['注意飛禽相關的字。', '哪個字少了一點？', '想想「鳥」字怎樣寫。'],
          explainCorrect: '這句的錯字是「烏」，應寫作「鳥」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '碼碼在煮飯。',
          wrongIndex: 0,
          wrongChar: '碼',
          correctChar: '媽',
          speak: '媽媽在煮飯',
          hint: '注意與家人稱謂有關的字形。',
          hints: ['想想媽媽怎樣寫。', '哪個字是「石」字旁？', '家人稱謂不應用「碼」。'],
          explainCorrect: '這句的錯字是「碼」，應寫作「媽」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '老師在黑版上寫字。',
          wrongIndex: 4,
          wrongChar: '版',
          correctChar: '板',
          speak: '老師在黑板上寫字',
          hint: '注意寫字用的那塊東西怎樣寫。',
          hints: ['黑板是木製的嗎？', '「版」和「板」哪里不同？', '想想「黑板」怎樣寫。'],
          explainCorrect: '這句的錯字是「版」，應寫作「板」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '我們在校國裏跑步。',
          wrongIndex: 4,
          wrongChar: '國',
          correctChar: '園',
          speak: '我們在校園裏跑步',
          hint: '注意學校裏的那個地方怎樣寫。',
          hints: ['校園是學校的園地。', '「國」和「園」哪里不同？', '想想「校園」怎樣寫。'],
          explainCorrect: '這句的錯字是「國」，應寫作「園」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他把書放在卓子上。',
          wrongIndex: 5,
          wrongChar: '卓',
          correctChar: '桌',
          speak: '他把書放在桌子上',
          hint: '注意放書的那件家具怎樣寫。',
          hints: ['放書的家具是哪一件？', '「卓」和「桌」哪里不同？', '想想「桌子」怎樣寫。'],
          explainCorrect: '這句的錯字是「卓」，應寫作「桌」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '花開得很美利。',
          wrongIndex: 5,
          wrongChar: '利',
          correctChar: '麗',
          speak: '花開得很美麗',
          hint: '注意形容好看的那個詞。',
          hints: ['「美麗」怎樣寫？', '哪個字寫錯了？', '「利」不是「麗」。'],
          explainCorrect: '這句的錯字是「利」，應寫作「麗」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '公圍裏有很多花。',
          wrongIndex: 1,
          wrongChar: '圍',
          correctChar: '園',
          speak: '公園裏有很多花',
          hint: '注意玩耍的地方怎樣寫。',
          hints: ['注意玩耍的地方怎樣寫。', '「圍」和「園」哪里不同？'],
          explainCorrect: '這句的錯字是「圍」，應寫作「園」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '弟弟在吃苹菓。',
          wrongIndex: 5,
          wrongChar: '菓',
          correctChar: '果',
          speak: '弟弟在吃蘋果',
          hint: '注意水果的「果」字。',
          hints: ['注意水果的「果」字。', '「菓」和「果」哪里不同？'],
          explainCorrect: '這句的錯字是「菓」，應寫作「果」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '今天的太揚很大。',
          wrongIndex: 4,
          wrongChar: '揚',
          correctChar: '陽',
          speak: '今天的太陽很大',
          hint: '注意天上那個火球怎樣寫。',
          hints: ['注意天上那個火球怎樣寫。', '「揚」和「陽」哪里不同？'],
          explainCorrect: '這句的錯字是「揚」，應寫作「陽」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '請把窗子關上。',
          wrongIndex: 3,
          wrongChar: '子',
          correctChar: '戶',
          speak: '請把窗戶關上',
          hint: '注意「窗戶」怎樣寫。',
          hints: ['注意「窗戶」怎樣寫。', '「子」和「戶」哪里不同？'],
          explainCorrect: '這句的錯字是「子」，應寫作「戶」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '我有一枝新鉛筆。',
          wrongIndex: 3,
          wrongChar: '枝',
          correctChar: '支',
          speak: '我有一支新鉛筆',
          hint: '注意筆的量詞字形。',
          hints: ['注意筆的量詞字形。', '「枝」和「支」哪里不同？'],
          explainCorrect: '這句的錯字是「枝」，應寫作「支」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '爸爸在看報子。',
          wrongIndex: 5,
          wrongChar: '子',
          correctChar: '紙',
          speak: '爸爸在看報紙',
          hint: '注意報紙的「紙」字。',
          hints: ['注意報紙的「紙」字。', '「子」和「紙」哪里不同？'],
          explainCorrect: '這句的錯字是「子」，應寫作「紙」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '小貓在捉老尿。',
          wrongIndex: 5,
          wrongChar: '尿',
          correctChar: '鼠',
          speak: '小貓在捉老鼠',
          hint: '注意「老鼠」怎樣寫。',
          hints: ['注意「老鼠」怎樣寫。', '「尿」和「鼠」哪里不同？'],
          explainCorrect: '這句的錯字是「尿」，應寫作「鼠」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '姐姐喜歡跳午。',
          wrongIndex: 5,
          wrongChar: '午',
          correctChar: '舞',
          speak: '姐姐喜歡跳舞',
          hint: '注意「跳舞」怎樣寫。',
          hints: ['注意「跳舞」怎樣寫。', '「午」和「舞」哪里不同？'],
          explainCorrect: '這句的錯字是「午」，應寫作「舞」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '奶奶坐在倚子上。',
          wrongIndex: 4,
          wrongChar: '倚',
          correctChar: '椅',
          speak: '奶奶坐在椅子上',
          hint: '注意「椅子」怎樣寫。',
          hints: ['注意「椅子」怎樣寫。', '「倚」和「椅」哪里不同？'],
          explainCorrect: '這句的錯字是「倚」，應寫作「椅」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '小鳥在空中非翔。',
          wrongIndex: 5,
          wrongChar: '非',
          correctChar: '飛',
          speak: '小鳥在空中飛翔',
          hint: '注意「飛」字怎樣寫。',
          hints: ['注意「飛」字怎樣寫。', '「非」和「飛」哪里不同？'],
          explainCorrect: '這句的錯字是「非」，應寫作「飛」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '媽媽買了新鮮牛乃。',
          wrongIndex: 7,
          wrongChar: '乃',
          correctChar: '奶',
          speak: '媽媽買了新鮮牛奶',
          hint: '注意「牛奶」怎樣寫。',
          hints: ['注意「牛奶」怎樣寫。', '「乃」和「奶」哪里不同？'],
          explainCorrect: '這句的錯字是「乃」，應寫作「奶」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '請打開課夲。',
          wrongIndex: 4,
          wrongChar: '夲',
          correctChar: '本',
          speak: '請打開課本',
          hint: '注意「本」字怎樣寫。',
          hints: ['注意「本」字怎樣寫。', '「夲」和「本」哪里不同？'],
          explainCorrect: '這句的錯字是「夲」，應寫作「本」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '我們一齊去上學。',
          wrongIndex: 3,
          wrongChar: '齊',
          correctChar: '起',
          speak: '我們一起去上學',
          hint: '注意「一起」怎樣寫。',
          hints: ['注意「一起」怎樣寫。', '「齊」和「起」哪里不同？'],
          explainCorrect: '這句的錯字是「齊」，應寫作「起」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '花兒開得很芳芳。',
          wrongIndex: 6,
          wrongChar: '芳',
          correctChar: '香',
          speak: '花兒開得很芳香',
          hint: '注意「芳香」怎樣寫。',
          hints: ['注意「芳香」怎樣寫。', '「芳」和「香」哪里不同？'],
          explainCorrect: '這句的錯字是「芳」，應寫作「香」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '弟弟穿上一雙新挂。',
          wrongIndex: 7,
          wrongChar: '挂',
          correctChar: '鞋',
          speak: '弟弟穿上一雙新鞋',
          hint: '注意「鞋」字怎樣寫。',
          hints: ['注意「鞋」字怎樣寫。', '「挂」和「鞋」哪里不同？'],
          explainCorrect: '這句的錯字是「挂」，應寫作「鞋」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '妹妹在畫圖晝。',
          wrongIndex: 5,
          wrongChar: '晝',
          correctChar: '畫',
          speak: '妹妹在畫圖畫',
          hint: '注意「圖畫」怎樣寫。',
          hints: ['注意「圖畫」怎樣寫。', '「晝」和「畫」哪里不同？'],
          explainCorrect: '這句的錯字是「晝」，應寫作「畫」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '晴蛙會跳水。',
          wrongIndex: 0,
          wrongChar: '晴',
          correctChar: '青',
          speak: '青蛙會跳水',
          hint: '注意「青蛙」怎樣寫。',
          hints: ['注意「青蛙」怎樣寫。', '「晴」和「青」哪里不同？'],
          explainCorrect: '這句的錯字是「晴」，應寫作「青」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '月亮又園又亮。',
          wrongIndex: 3,
          wrongChar: '園',
          correctChar: '圓',
          speak: '月亮又圓又亮',
          hint: '注意「圓」字怎樣寫。',
          hints: ['注意「圓」字怎樣寫。', '「園」和「圓」哪里不同？'],
          explainCorrect: '這句的錯字是「園」，應寫作「圓」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '秋天的樹頁黃了。',
          wrongIndex: 4,
          wrongChar: '頁',
          correctChar: '葉',
          speak: '秋天的樹葉黃了',
          hint: '注意「樹葉」怎樣寫。',
          hints: ['注意「樹葉」怎樣寫。', '「頁」和「葉」哪里不同？'],
          explainCorrect: '這句的錯字是「頁」，應寫作「葉」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '小魚在水裏游氷。',
          wrongIndex: 6,
          wrongChar: '氷',
          correctChar: '泳',
          speak: '小魚在水裏游泳',
          hint: '注意「游泳」怎樣寫。',
          hints: ['注意「游泳」怎樣寫。', '「氷」和「泳」哪里不同？'],
          explainCorrect: '這句的錯字是「氷」，應寫作「泳」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        }
      ],
      medium: [
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他坐在坐位上看書。',
          wrongIndex: 3,
          wrongChar: '坐',
          correctChar: '座',
          speak: '他坐在座位上看書',
          hint: '注意表示動作的字和表示地方的字。',
          hints: ['「坐」是動作，「座」是位置。', '「座位」怎樣寫？', '句中有兩個「坐」，哪個不對？'],
          explainCorrect: '這句的錯字是「坐」（坐位），應寫作「座」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '請看這裏的請水很涼。',
          wrongIndex: 5,
          wrongChar: '請',
          correctChar: '清',
          speak: '這裏的清水很涼',
          hint: '注意與「水」有關的那個字。',
          hints: ['清水的「清」怎樣寫？', '句中有兩個「請」，哪個不對？', '「言」字旁還是「水」字旁？'],
          explainCorrect: '這句的錯字是「請」（請水），應寫作「清」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '妹妹穿了一件新依服去依人。',
          wrongIndex: 7,
          wrongChar: '依',
          correctChar: '衣',
          speak: '妹妹穿了一件新衣服',
          hint: '注意「衣服」兩個字。',
          hints: ['穿衣服的「衣」怎樣寫？', '「依」和「衣」哪里不同？', '句中哪個「依」是錯字？'],
          explainCorrect: '這句的錯字是「依」（依服），應寫作「衣」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '我們一起去公園玩要，不要亂跑。',
          wrongIndex: 8,
          wrongChar: '要',
          correctChar: '耍',
          speak: '我們一起去公園玩耍',
          hint: '注意「玩耍」的寫法。',
          hints: ['「玩耍」怎樣寫？', '「要」和「耍」哪里不同？', '句中有兩個「要」，哪個不對？'],
          explainCorrect: '這句的錯字是「要」（玩要），應寫作「耍」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '老師叫我們安精聽講，精神要好。',
          wrongIndex: 6,
          wrongChar: '精',
          correctChar: '靜',
          speak: '老師叫我們安靜聽講',
          hint: '注意表示不吵鬧的那個詞。',
          hints: ['「安靜」怎樣寫？', '「精」和「靜」哪里不同？', '句中有「精」字，哪個才是錯字？'],
          explainCorrect: '這句的錯字是「精」（安精），應寫作「靜」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '河水從山上留下來，別留下垃圾。',
          wrongIndex: 5,
          wrongChar: '留',
          correctChar: '流',
          speak: '河水從山上流下來',
          hint: '注意水怎樣移動的那個字。',
          hints: ['水流的「流」怎樣寫？', '「留」和「流」哪里不同？', '句中有兩個「留」，哪個不對？'],
          explainCorrect: '這句的錯字是「留」（留下來），應寫作「流」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '同學們在課室裏朗瀆課文。',
          wrongIndex: 8,
          wrongChar: '瀆',
          correctChar: '讀',
          speak: '同學們在課室裏朗讀課文',
          hint: '注意「朗讀」怎樣寫。',
          hints: ['注意「朗讀」怎樣寫。', '「瀆」和「讀」哪里不同？'],
          explainCorrect: '這句的錯字是「瀆」，應寫作「讀」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '放學後我們一齊做功課。',
          wrongIndex: 6,
          wrongChar: '齊',
          correctChar: '起',
          speak: '放學後我們一起做功課',
          hint: '注意「一起」怎樣寫。',
          hints: ['注意「一起」怎樣寫。', '「齊」和「起」哪里不同？'],
          explainCorrect: '這句的錯字是「齊」，應寫作「起」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他把雨衣穿在身休上。',
          wrongIndex: 7,
          wrongChar: '休',
          correctChar: '體',
          speak: '他把雨衣穿在身體上',
          hint: '注意「身體」怎樣寫。',
          hints: ['注意「身體」怎樣寫。', '「休」和「體」哪里不同？'],
          explainCorrect: '這句的錯字是「休」，應寫作「體」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '妹妹寫字寫得很端証。',
          wrongIndex: 8,
          wrongChar: '証',
          correctChar: '正',
          speak: '妹妹寫字寫得很端正',
          hint: '注意「端正」怎樣寫。',
          hints: ['注意「端正」怎樣寫。', '「証」和「正」哪里不同？'],
          explainCorrect: '這句的錯字是「証」，應寫作「正」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '我們去圖書管借書。',
          wrongIndex: 5,
          wrongChar: '管',
          correctChar: '館',
          speak: '我們去圖書館借書',
          hint: '注意「圖書館」怎樣寫。',
          hints: ['注意「圖書館」怎樣寫。', '「管」和「館」哪里不同？'],
          explainCorrect: '這句的錯字是「管」，應寫作「館」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '爸爸騎單車去上坂。',
          wrongIndex: 7,
          wrongChar: '坂',
          correctChar: '班',
          speak: '爸爸騎單車去上班',
          hint: '注意「上班」怎樣寫。',
          hints: ['注意「上班」怎樣寫。', '「坂」和「班」哪里不同？'],
          explainCorrect: '這句的錯字是「坂」，應寫作「班」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '春天到了百花勝開。',
          wrongIndex: 6,
          wrongChar: '勝',
          correctChar: '盛',
          speak: '春天到了百花盛開',
          hint: '注意「盛開」怎樣寫。',
          hints: ['注意「盛開」怎樣寫。', '「勝」和「盛」哪里不同？'],
          explainCorrect: '這句的錯字是「勝」，應寫作「盛」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '弟弟把玩具收拾亁淨。',
          wrongIndex: 7,
          wrongChar: '亁',
          correctChar: '乾',
          speak: '弟弟把玩具收拾乾淨',
          hint: '注意「乾淨」怎樣寫。',
          hints: ['注意「乾淨」怎樣寫。', '「亁」和「乾」哪里不同？'],
          explainCorrect: '這句的錯字是「亁」，應寫作「乾」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '湖水清澈見厎。',
          wrongIndex: 5,
          wrongChar: '厎',
          correctChar: '底',
          speak: '湖水清澈見底',
          hint: '注意「見底」怎樣寫。',
          hints: ['注意「見底」怎樣寫。', '「厎」和「底」哪里不同？'],
          explainCorrect: '這句的錯字是「厎」，應寫作「底」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '奶奶戴著一副眼晴。',
          wrongIndex: 7,
          wrongChar: '晴',
          correctChar: '鏡',
          speak: '奶奶戴著一副眼鏡',
          hint: '注意「眼鏡」怎樣寫。',
          hints: ['注意「眼鏡」怎樣寫。', '「晴」和「鏡」哪里不同？'],
          explainCorrect: '這句的錯字是「晴」，應寫作「鏡」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他把書包放在卓子下。',
          wrongIndex: 6,
          wrongChar: '卓',
          correctChar: '桌',
          speak: '他把書包放在桌子下',
          hint: '注意「桌子」怎樣寫。',
          hints: ['注意「桌子」怎樣寫。', '「卓」和「桌」哪里不同？'],
          explainCorrect: '這句的錯字是「卓」，應寫作「桌」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '妹妹穿了一件新衣報。',
          wrongIndex: 8,
          wrongChar: '報',
          correctChar: '服',
          speak: '妹妹穿了一件新衣服',
          hint: '注意「衣服」怎樣寫。',
          hints: ['注意「衣服」怎樣寫。', '「報」和「服」哪里不同？'],
          explainCorrect: '這句的錯字是「報」，應寫作「服」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '冬天到了天氣很寒泠。',
          wrongIndex: 8,
          wrongChar: '泠',
          correctChar: '冷',
          speak: '冬天到了天氣很寒冷',
          hint: '注意「寒冷」怎樣寫。',
          hints: ['注意「寒冷」怎樣寫。', '「泠」和「冷」哪里不同？'],
          explainCorrect: '這句的錯字是「泠」，應寫作「冷」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '哥哥在操場上練跑歩。',
          wrongIndex: 8,
          wrongChar: '歩',
          correctChar: '步',
          speak: '哥哥在操場上練跑步',
          hint: '注意「跑步」怎樣寫。',
          hints: ['注意「跑步」怎樣寫。', '「歩」和「步」哪里不同？'],
          explainCorrect: '這句的錯字是「歩」，應寫作「步」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '請把垃圾丟進垃及桶。',
          wrongIndex: 7,
          wrongChar: '及',
          correctChar: '圾',
          speak: '請把垃圾丟進垃圾桶',
          hint: '注意「垃圾」怎樣寫。',
          hints: ['注意「垃圾」怎樣寫。', '「及」和「圾」哪里不同？'],
          explainCorrect: '這句的錯字是「及」，應寫作「圾」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '媽媽切了一盤水菓。',
          wrongIndex: 7,
          wrongChar: '菓',
          correctChar: '果',
          speak: '媽媽切了一盤水果',
          hint: '注意「水果」怎樣寫。',
          hints: ['注意「水果」怎樣寫。', '「菓」和「果」哪里不同？'],
          explainCorrect: '這句的錯字是「菓」，應寫作「果」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '小鳥停在樹稍上唱歌。',
          wrongIndex: 5,
          wrongChar: '稍',
          correctChar: '梢',
          speak: '小鳥停在樹梢上唱歌',
          hint: '注意「樹梢」怎樣寫。',
          hints: ['注意「樹梢」怎樣寫。', '「稍」和「梢」哪里不同？'],
          explainCorrect: '這句的錯字是「稍」，應寫作「梢」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他認真地完成了作葉。',
          wrongIndex: 8,
          wrongChar: '葉',
          correctChar: '業',
          speak: '他認真地完成了作業',
          hint: '注意「作業」怎樣寫。',
          hints: ['注意「作業」怎樣寫。', '「葉」和「業」哪里不同？'],
          explainCorrect: '這句的錯字是「葉」，應寫作「業」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '我們要保持環境清絜。',
          wrongIndex: 8,
          wrongChar: '絜',
          correctChar: '潔',
          speak: '我們要保持環境清潔',
          hint: '注意「清潔」怎樣寫。',
          hints: ['注意「清潔」怎樣寫。', '「絜」和「潔」哪里不同？'],
          explainCorrect: '這句的錯字是「絜」，應寫作「潔」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '姐姐在日記裏寫心徳。',
          wrongIndex: 8,
          wrongChar: '徳',
          correctChar: '得',
          speak: '姐姐在日記裏寫心得',
          hint: '注意「心得」怎樣寫。',
          hints: ['注意「心得」怎樣寫。', '「徳」和「得」哪里不同？'],
          explainCorrect: '這句的錯字是「徳」，應寫作「得」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        }
      ],
      hard: [
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '小鳥停在樹技上，枝頭還有花。',
          wrongIndex: 5,
          wrongChar: '技',
          correctChar: '枝',
          speak: '小鳥停在樹枝上唱歌',
          hint: '注意樹木分出來的那一部分怎樣寫。',
          hints: ['樹枝的「枝」是木字旁。', '「技」和「枝」哪里不同？', '句中「技」與「枝」哪個才對？'],
          explainCorrect: '這句的錯字是「技」，應寫作「枝」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '媽媽買了新鮮的疏菜和青蔬。',
          wrongIndex: 7,
          wrongChar: '疏',
          correctChar: '蔬',
          speak: '媽媽買了新鮮的蔬菜',
          hint: '注意可吃的青菜怎樣寫。',
          hints: ['蔬菜的「蔬」有草字頭。', '「疏」和「蔬」哪里不同？', '句中「疏」與「蔬」哪個才對？'],
          explainCorrect: '這句的錯字是「疏」，應寫作「蔬」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他很專住地寫功課，不住地練習。',
          wrongIndex: 3,
          wrongChar: '住',
          correctChar: '注',
          speak: '他很專注地寫功課',
          hint: '注意專心做事的那個詞。',
          hints: ['「專注」怎樣寫？', '「住」和「注」哪里不同？', '句中有兩個「住」，哪個不對？'],
          explainCorrect: '這句的錯字是「住」（專住），應寫作「注」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他付了錢，戴著一付眼鏡。',
          wrongIndex: 8,
          wrongChar: '付',
          correctChar: '副',
          speak: '他戴著一副眼鏡',
          hint: '注意成對物件常用的那個字。',
          hints: ['一副眼鏡的「副」怎樣寫？', '「付」和「副」哪里不同？', '句中有兩個「付」，哪個不對？'],
          explainCorrect: '這句的錯字是「付」（一付），應寫作「副」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '春天到了，樹葉漸斬長大，漸漸變綠。',
          wrongIndex: 8,
          wrongChar: '斬',
          correctChar: '漸',
          speak: '春天到了，樹葉漸漸長大',
          hint: '注意表示慢慢變化的那個詞。',
          hints: ['「漸漸」怎樣寫？', '「斬」和「漸」哪里不同？', '句中「斬」與「漸」哪個才對？'],
          explainCorrect: '這句的錯字是「斬」，應寫作「漸」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '弟弟寫了一封信給朋有，又有一封給老師。',
          wrongIndex: 9,
          wrongChar: '有',
          correctChar: '友',
          speak: '弟弟寫了一封信給朋友',
          hint: '注意一起玩的那個人怎樣寫。',
          hints: ['「朋友」怎樣寫？', '「有」和「友」哪里不同？', '句中有兩個「有」，哪個不對？'],
          explainCorrect: '這句的錯字是「有」（朋有），應寫作「友」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '小鳥停在樹技上休息。',
          wrongIndex: 5,
          wrongChar: '技',
          correctChar: '枝',
          speak: '小鳥停在樹枝上休息',
          hint: '注意「樹枝」怎樣寫。',
          hints: ['注意「樹枝」怎樣寫。', '「技」和「枝」哪里不同？'],
          explainCorrect: '這句的錯字是「技」，應寫作「枝」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '媽媽買了新鮮的疏果。',
          wrongIndex: 7,
          wrongChar: '疏',
          correctChar: '蔬',
          speak: '媽媽買了新鮮的蔬果',
          hint: '注意「蔬果」怎樣寫。',
          hints: ['注意「蔬果」怎樣寫。', '「疏」和「蔬」哪里不同？'],
          explainCorrect: '這句的錯字是「疏」，應寫作「蔬」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他很專住地看書。',
          wrongIndex: 3,
          wrongChar: '住',
          correctChar: '注',
          speak: '他很專注地看書',
          hint: '注意「專注」怎樣寫。',
          hints: ['注意「專注」怎樣寫。', '「住」和「注」哪里不同？'],
          explainCorrect: '這句的錯字是「住」，應寫作「注」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他戴著一付手套。',
          wrongIndex: 4,
          wrongChar: '付',
          correctChar: '副',
          speak: '他戴著一副手套',
          hint: '注意「一副」怎樣寫。',
          hints: ['注意「一副」怎樣寫。', '「付」和「副」哪里不同？'],
          explainCorrect: '這句的錯字是「付」，應寫作「副」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '樹葉漸斬變黃了。',
          wrongIndex: 3,
          wrongChar: '斬',
          correctChar: '漸',
          speak: '樹葉漸漸變黃了',
          hint: '注意「漸漸」怎樣寫。',
          hints: ['注意「漸漸」怎樣寫。', '「斬」和「漸」哪里不同？'],
          explainCorrect: '這句的錯字是「斬」，應寫作「漸」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '弟弟寫信給朋有。',
          wrongIndex: 6,
          wrongChar: '有',
          correctChar: '友',
          speak: '弟弟寫信給朋友',
          hint: '注意「朋友」怎樣寫。',
          hints: ['注意「朋友」怎樣寫。', '「有」和「友」哪里不同？'],
          explainCorrect: '這句的錯字是「有」，應寫作「友」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '請不要浪費食勿。',
          wrongIndex: 6,
          wrongChar: '勿',
          correctChar: '物',
          speak: '請不要浪費食物',
          hint: '注意「食物」怎樣寫。',
          hints: ['注意「食物」怎樣寫。', '「勿」和「物」哪里不同？'],
          explainCorrect: '這句的錯字是「勿」，應寫作「物」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '我們要守時守訊。',
          wrongIndex: 6,
          wrongChar: '訊',
          correctChar: '信',
          speak: '我們要守時守信',
          hint: '注意「守信」怎樣寫。',
          hints: ['注意「守信」怎樣寫。', '「訊」和「信」哪里不同？'],
          explainCorrect: '這句的錯字是「訊」，應寫作「信」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他對人很有豊貌。',
          wrongIndex: 5,
          wrongChar: '豊',
          correctChar: '禮',
          speak: '他對人很有禮貌',
          hint: '注意「禮貌」怎樣寫。',
          hints: ['注意「禮貌」怎樣寫。', '「豊」和「禮」哪里不同？'],
          explainCorrect: '這句的錯字是「豊」，應寫作「禮」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '這道題目很簡簞。',
          wrongIndex: 6,
          wrongChar: '簞',
          correctChar: '單',
          speak: '這道題目很簡單',
          hint: '注意「簡單」怎樣寫。',
          hints: ['注意「簡單」怎樣寫。', '「簞」和「單」哪里不同？'],
          explainCorrect: '這句的錯字是「簞」，應寫作「單」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '請把書包整理整齌。',
          wrongIndex: 7,
          wrongChar: '齌',
          correctChar: '齊',
          speak: '請把書包整理整齊',
          hint: '注意「整齊」怎樣寫。',
          hints: ['注意「整齊」怎樣寫。', '「齌」和「齊」哪里不同？'],
          explainCorrect: '這句的錯字是「齌」，應寫作「齊」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '考試時要細心檢茶。',
          wrongIndex: 7,
          wrongChar: '茶',
          correctChar: '查',
          speak: '考試時要細心檢查',
          hint: '注意「檢查」怎樣寫。',
          hints: ['注意「檢查」怎樣寫。', '「茶」和「查」哪里不同？'],
          explainCorrect: '這句的錯字是「茶」，應寫作「查」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '操場上有許多同學在活働。',
          wrongIndex: 10,
          wrongChar: '働',
          correctChar: '動',
          speak: '操場上有許多同學在活動',
          hint: '注意「活動」怎樣寫。',
          hints: ['注意「活動」怎樣寫。', '「働」和「動」哪里不同？'],
          explainCorrect: '這句的錯字是「働」，應寫作「動」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他說了一個有趣的故亊。',
          wrongIndex: 9,
          wrongChar: '亊',
          correctChar: '事',
          speak: '他說了一個有趣的故事',
          hint: '注意「故事」怎樣寫。',
          hints: ['注意「故事」怎樣寫。', '「亊」和「事」哪里不同？'],
          explainCorrect: '這句的錯字是「亊」，應寫作「事」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '我們要愛護公圡設施。',
          wrongIndex: 6,
          wrongChar: '圡',
          correctChar: '共',
          speak: '我們要愛護公共設施',
          hint: '注意「公共」怎樣寫。',
          hints: ['注意「公共」怎樣寫。', '「圡」和「共」哪里不同？'],
          explainCorrect: '這句的錯字是「圡」，應寫作「共」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '這本書的內蓉很豐富。',
          wrongIndex: 5,
          wrongChar: '蓉',
          correctChar: '容',
          speak: '這本書的內容很豐富',
          hint: '注意「內容」怎樣寫。',
          hints: ['注意「內容」怎樣寫。', '「蓉」和「容」哪里不同？'],
          explainCorrect: '這句的錯字是「蓉」，應寫作「容」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '姐姐每天都練習鋼琹。',
          wrongIndex: 8,
          wrongChar: '琹',
          correctChar: '琴',
          speak: '姐姐每天都練習鋼琴',
          hint: '注意「鋼琴」怎樣寫。',
          hints: ['注意「鋼琴」怎樣寫。', '「琹」和「琴」哪里不同？'],
          explainCorrect: '這句的錯字是「琹」，應寫作「琴」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '今天的天氣真舒菔。',
          wrongIndex: 7,
          wrongChar: '菔',
          correctChar: '服',
          speak: '今天的天氣真舒服',
          hint: '注意「舒服」怎樣寫。',
          hints: ['注意「舒服」怎樣寫。', '「菔」和「服」哪里不同？'],
          explainCorrect: '這句的錯字是「菔」，應寫作「服」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '請把答案寫在薄子上。',
          wrongIndex: 6,
          wrongChar: '薄',
          correctChar: '簿',
          speak: '請把答案寫在簿子上',
          hint: '注意「簿子」怎樣寫。',
          hints: ['注意「簿子」怎樣寫。', '「薄」和「簿」哪里不同？'],
          explainCorrect: '這句的錯字是「薄」，應寫作「簿」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        },
        {
          prompt: '請點選句子中寫錯的字。',
          sentence: '他畫了一幅美麗的圖晝。',
          wrongIndex: 9,
          wrongChar: '晝',
          correctChar: '畫',
          speak: '他畫了一幅美麗的圖畫',
          hint: '注意「圖畫」怎樣寫。',
          hints: ['注意「圖畫」怎樣寫。', '「晝」和「畫」哪里不同？'],
          explainCorrect: '這句的錯字是「晝」，應寫作「畫」。',
          explainWrong: '這個字沒有寫錯，請再找別的字。'
        }
      ]
    }
  },
  L2_reorder_sentence: {
    id: 'L2_reorder_sentence',
    spot: 'pond',
    name: '重組句子',
    verb: 'drag',
    npc: '漁夫',
    voice: 'male',
    goal: '請把下列字詞排成一句通順的話',
    itemsByDiff: {
      easy: [
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '我去釣魚',
          hint: '先找出「誰」，再找出去做甚麼。',
          hints: ['先找出「誰」，再找出去做甚麼。'],
          order: ['我', '去', '釣魚'],
          distractorHint: '先想主語，再想去做甚麼。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先想主語，再想去做甚麼。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '媽媽在種菜',
          hint: '先找出「誰」，再找出在做甚麼。',
          hints: ['先找出「誰」，再找出在做甚麼。'],
          order: ['媽媽', '在', '種菜'],
          distractorHint: '誰在做甚麼？',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '誰在做甚麼？'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '弟弟在看書',
          hint: '先找出人物，再找出動作。',
          hints: ['先找出人物，再找出動作。'],
          order: ['弟弟', '在', '看書'],
          distractorHint: '誰在做甚麼？',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '誰在做甚麼？'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '小貓在捉魚',
          hint: '先找出小動物，再找出牠在做甚麼。',
          hints: ['先找出小動物，再找出牠在做甚麼。'],
          order: ['小貓', '在', '捉魚'],
          distractorHint: '誰在做甚麼？',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '誰在做甚麼？'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '我們一起回家',
          hint: '先找出「我們」，再找出怎樣回家。',
          hints: ['先找出「我們」，再找出怎樣回家。'],
          order: ['我們', '一起', '回家'],
          distractorHint: '誰一起做甚麼？',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '誰一起做甚麼？'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '農夫在割草',
          hint: '先找出「農夫」，再找出工作。',
          hints: ['先找出「農夫」，再找出工作。'],
          order: ['農夫', '在', '割草'],
          distractorHint: '誰在做甚麼？',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '誰在做甚麼？'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '妹妹在畫畫',
          hint: '先找出「誰」，再找出做甚麼。',
          hints: ['先找出「誰」，再找出做甚麼。'],
          order: ['妹妹', '在', '畫畫'],
          distractorHint: '先找出「誰」，再找出做甚麼。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「誰」，再找出做甚麼。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '哥哥去踢球',
          hint: '先找出人物，再找出動作。',
          hints: ['先找出人物，再找出動作。'],
          order: ['哥哥', '去', '踢球'],
          distractorHint: '先找出人物，再找出動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出人物，再找出動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '老師在講課',
          hint: '先找出「誰」，再找出做甚麼。',
          hints: ['先找出「誰」，再找出做甚麼。'],
          order: ['老師', '在', '講課'],
          distractorHint: '先找出「誰」，再找出做甚麼。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「誰」，再找出做甚麼。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '小狗在睡覺',
          hint: '先找出小動物，再找出動作。',
          hints: ['先找出小動物，再找出動作。'],
          order: ['小狗', '在', '睡覺'],
          distractorHint: '先找出小動物，再找出動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出小動物，再找出動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '我愛讀書',
          hint: '先找出「我」，再找出喜歡做甚麼。',
          hints: ['先找出「我」，再找出喜歡做甚麼。'],
          order: ['我', '愛', '讀書'],
          distractorHint: '先找出「我」，再找出喜歡做甚麼。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「我」，再找出喜歡做甚麼。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '爸爸在開車',
          hint: '先找出「爸爸」，再找出工作。',
          hints: ['先找出「爸爸」，再找出工作。'],
          order: ['爸爸', '在', '開車'],
          distractorHint: '先找出「爸爸」，再找出工作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「爸爸」，再找出工作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '蜜蜂在採蜜',
          hint: '先找出昆蟲，再找出動作。',
          hints: ['先找出昆蟲，再找出動作。'],
          order: ['蜜蜂', '在', '採蜜'],
          distractorHint: '先找出昆蟲，再找出動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出昆蟲，再找出動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '雨下很大',
          hint: '先找出「雨」，再找出情形。',
          hints: ['先找出「雨」，再找出情形。'],
          order: ['雨', '下', '很大'],
          distractorHint: '先找出「雨」，再找出情形。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「雨」，再找出情形。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '花開了',
          hint: '先找出「花」，再找出變化。',
          hints: ['先找出「花」，再找出變化。'],
          order: ['花', '開', '了'],
          distractorHint: '先找出「花」，再找出變化。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「花」，再找出變化。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '魚在游水',
          hint: '先找出「魚」，再找出動作。',
          hints: ['先找出「魚」，再找出動作。'],
          order: ['魚', '在', '游水'],
          distractorHint: '先找出「魚」，再找出動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「魚」，再找出動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '我們去公園',
          hint: '先找出「我們」，再找出地點。',
          hints: ['先找出「我們」，再找出地點。'],
          order: ['我們', '去', '公園'],
          distractorHint: '先找出「我們」，再找出地點。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「我們」，再找出地點。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '奶奶在喝茶',
          hint: '先找出「奶奶」，再找出動作。',
          hints: ['先找出「奶奶」，再找出動作。'],
          order: ['奶奶', '在', '喝茶'],
          distractorHint: '先找出「奶奶」，再找出動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「奶奶」，再找出動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '小鳥會飛',
          hint: '先找出「小鳥」，再找出本領。',
          hints: ['先找出「小鳥」，再找出本領。'],
          order: ['小鳥', '會', '飛'],
          distractorHint: '先找出「小鳥」，再找出本領。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「小鳥」，再找出本領。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '弟弟愛吃糖',
          hint: '先找出「弟弟」，再找出喜歡甚麼。',
          hints: ['先找出「弟弟」，再找出喜歡甚麼。'],
          order: ['弟弟', '愛', '吃糖'],
          distractorHint: '先找出「弟弟」，再找出喜歡甚麼。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「弟弟」，再找出喜歡甚麼。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '太陽升起來',
          hint: '先找出「太陽」，再找出變化。',
          hints: ['先找出「太陽」，再找出變化。'],
          order: ['太陽', '升', '起來'],
          distractorHint: '先找出「太陽」，再找出變化。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「太陽」，再找出變化。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '風吹過來',
          hint: '先找出「風」，再找出動作。',
          hints: ['先找出「風」，再找出動作。'],
          order: ['風', '吹', '過來'],
          distractorHint: '先找出「風」，再找出動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「風」，再找出動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '小朋友在唱歌',
          hint: '先找出「誰」，再找出做甚麼。',
          hints: ['先找出「誰」，再找出做甚麼。'],
          order: ['小朋友', '在', '唱歌'],
          distractorHint: '先找出「誰」，再找出做甚麼。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「誰」，再找出做甚麼。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '螞蟻搬食物',
          hint: '先找出小動物，再找出動作。',
          hints: ['先找出小動物，再找出動作。'],
          order: ['螞蟻', '搬', '食物'],
          distractorHint: '先找出小動物，再找出動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出小動物，再找出動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '我寫日記',
          hint: '先找出「我」，再找出做甚麼。',
          hints: ['先找出「我」，再找出做甚麼。'],
          order: ['我', '寫', '日記'],
          distractorHint: '先找出「我」，再找出做甚麼。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「我」，再找出做甚麼。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '媽媽煮晚飯',
          hint: '先找出「媽媽」，再找出做甚麼。',
          hints: ['先找出「媽媽」，再找出做甚麼。'],
          order: ['媽媽', '煮', '晚飯'],
          distractorHint: '先找出「媽媽」，再找出做甚麼。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出「媽媽」，再找出做甚麼。'
        }
      ],
      medium: [
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '姐姐在圖書館借書',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['姐姐', '在', '圖書館', '借書'],
          distractorHint: '地點要放在動作前面。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '地點要放在動作前面。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '老師在黑板上寫字',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['老師', '在', '黑板上', '寫字'],
          distractorHint: '地點要緊接在「在」後面。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '地點要緊接在「在」後面。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '小鳥在枝頭唱歌',
          hint: '先找出小動物，再找出地點與動作。',
          hints: ['先找出小動物，再找出地點。'],
          order: ['小鳥', '在', '枝頭', '唱歌'],
          distractorHint: '地點「枝頭」要放在動作前。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '地點「枝頭」要放在動作前。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '小朋友在操場跑步',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['小朋友', '在', '操場', '跑步'],
          distractorHint: '先排人物，再排地點與動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排人物，再排地點與動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '奶奶在廚房煮湯',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['奶奶', '在', '廚房', '煮湯'],
          distractorHint: '地點要緊接在「在」後面。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '地點要緊接在「在」後面。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '我們下課後一起打球',
          hint: '時間詞可放在動作之前。',
          hints: ['時間詞可放在動作之前。'],
          order: ['我們', '下課後', '一起', '打球'],
          distractorHint: '先排人物，再排時間與動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排人物，再排時間與動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '弟弟在課室寫字',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['弟弟', '在', '課室', '寫字'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '媽媽在市場買菜',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['媽媽', '在', '市場', '買菜'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '小魚在池塘游泳',
          hint: '先找出小動物，再找出地點與動作。',
          hints: ['先找出小動物，再找出地點與動作。'],
          order: ['小魚', '在', '池塘', '游泳'],
          distractorHint: '先找出小動物，再找出地點與動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出小動物，再找出地點與動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '同學在圖書館看書',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['同學', '在', '圖書館', '看書'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '農夫在田裏種菜',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['農夫', '在', '田裏', '種菜'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '我們早上一起跑步',
          hint: '時間詞可放在動作之前。',
          hints: ['時間詞可放在動作之前。'],
          order: ['我們', '早上', '一起', '跑步'],
          distractorHint: '時間詞可放在動作之前。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '時間詞可放在動作之前。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '姐姐在房間彈琴',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['姐姐', '在', '房間', '彈琴'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '爸爸在花園澆花',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['爸爸', '在', '花園', '澆花'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '小貓在沙發睡覺',
          hint: '先找出小動物，再找出地點。',
          hints: ['先找出小動物，再找出地點。'],
          order: ['小貓', '在', '沙發', '睡覺'],
          distractorHint: '先找出小動物，再找出地點。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出小動物，再找出地點。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '老師在操場跑步',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['老師', '在', '操場', '跑步'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '我們下課後一起收拾',
          hint: '先排人物，再排時間與動作。',
          hints: ['先排人物，再排時間與動作。'],
          order: ['我們', '下課後', '一起', '收拾'],
          distractorHint: '先排人物，再排時間與動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排人物，再排時間與動作。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '蜜蜂在花叢飛舞',
          hint: '先找出昆蟲，再找出地點。',
          hints: ['先找出昆蟲，再找出地點。'],
          order: ['蜜蜂', '在', '花叢', '飛舞'],
          distractorHint: '先找出昆蟲，再找出地點。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出昆蟲，再找出地點。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '弟弟在客廳看電視',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['弟弟', '在', '客廳', '看電視'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '奶奶在陽台曬衣',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['奶奶', '在', '陽台', '曬衣'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '小朋友在沙池堆沙',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['小朋友', '在', '沙池', '堆沙'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '我晚上認真溫習',
          hint: '時間詞可放在動作之前。',
          hints: ['時間詞可放在動作之前。'],
          order: ['我', '晚上', '認真', '溫習'],
          distractorHint: '時間詞可放在動作之前。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '時間詞可放在動作之前。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '小鳥在樹上唱歌',
          hint: '先找出小動物，再找出地點。',
          hints: ['先找出小動物，再找出地點。'],
          order: ['小鳥', '在', '樹上', '唱歌'],
          distractorHint: '先找出小動物，再找出地點。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出小動物，再找出地點。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '哥哥在球場射球',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['哥哥', '在', '球場', '射球'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '媽媽在廚房炒菜',
          hint: '請按「誰—在哪裏—做甚麼」排列。',
          hints: ['請按「誰—在哪裏—做甚麼」排列。'],
          order: ['媽媽', '在', '廚房', '炒菜'],
          distractorHint: '請按「誰—在哪裏—做甚麼」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「誰—在哪裏—做甚麼」排列。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '我們假期去旅行',
          hint: '先排人物，再排時間與動作。',
          hints: ['先排人物，再排時間與動作。'],
          order: ['我們', '假期', '去', '旅行'],
          distractorHint: '先排人物，再排時間與動作。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排人物，再排時間與動作。'
        }
      ],
      hard: [
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '因為下雨，所以我們留在家裏看書。',
          hint: '先排「因為……所以……」，標點各佔一塊。',
          hints: ['先找出「因為」和「所以」。', '逗號、句號各是獨立一塊。'],
          order: ['因為', '下雨', '，', '所以', '我們', '留在', '家裏', '，', '看書', '。'],
          distractorHint: '先寫原因，再用「所以」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫原因，再用「所以」寫結果。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '雖然今天很累，但是弟弟仍然堅持練習。',
          hint: '先排「雖然……但是……」，再看「仍然」。',
          hints: ['「雖然」後面接轉折「但是」。', '留意標點各佔一塊。'],
          order: ['雖然', '今天', '很累', '，', '但是', '弟弟', '仍然', '堅持', '練習', '。'],
          distractorHint: '先寫「雖然」，再用「但是／仍然」寫轉折。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「雖然」，再用「但是／仍然」寫轉折。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '如果明天天晴，我們就去公園野餐。',
          hint: '先排「如果……就……」的條件句。',
          hints: ['「如果」表示假設，「就」接結果。', '標點各佔一塊。'],
          order: ['如果', '明天', '天晴', '，', '我們', '就', '去', '公園', '野餐', '。'],
          distractorHint: '先寫條件，再用「就」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫條件，再用「就」寫結果。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '姐姐不但會唱歌，而且還會跳舞。',
          hint: '先排「不但……而且……」。',
          hints: ['「不但」後面要接「而且」。', '標點各佔一塊。'],
          order: ['姐姐', '不但', '會', '唱歌', '，', '而且', '還', '會', '跳舞', '。'],
          distractorHint: '「不但」要配「而且」。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '「不但」要配「而且」。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '因為肚子餓了，所以媽媽煮麵給我們。',
          hint: '先排「因為……所以……」。',
          hints: ['先找出原因和結果。', '標點各佔一塊。'],
          order: ['因為', '肚子', '餓了', '，', '所以', '媽媽', '煮麵', '給', '我們', '。'],
          distractorHint: '先寫「因為」，再用「所以」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「因為」，再用「所以」寫結果。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '雖然外面很熱，我們仍然戴上帽子。',
          hint: '「雖然」常配「仍然」或「但是」。',
          hints: ['先找出「雖然」和「仍然」。', '標點各佔一塊。'],
          order: ['雖然', '外面', '很熱', '，', '我們', '仍然', '戴上', '帽子', '出門', '。'],
          distractorHint: '先寫「雖然」，再用「仍然」寫轉折。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「雖然」，再用「仍然」寫轉折。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '如果用心溫習，你就會取得進步。',
          hint: '先排「如果……就……」。',
          hints: ['條件在前，結果在後。', '標點各佔一塊。'],
          order: ['如果', '用心', '溫習', '，', '你', '就', '會', '取得', '進步', '。'],
          distractorHint: '先寫「如果」，再用「就」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「如果」，再用「就」寫結果。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '他不但分數高，而且字也很工整。',
          hint: '先排「不但……而且……」。',
          hints: ['兩項優點用「不但……而且……」連接。', '標點各佔一塊。'],
          order: ['他', '不但', '分數', '高', '，', '而且', '字', '也', '工整', '。'],
          distractorHint: '「不但」要配「而且」。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '「不但」要配「而且」。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '因為明天要早起，所以今晚早點睡覺。',
          hint: '先排「因為……所以……」。',
          hints: ['原因是早起，結果是早睡。', '標點各佔一塊。'],
          order: ['因為', '明天', '要', '早起', '，', '所以', '今晚', '早點', '睡覺', '。'],
          distractorHint: '先寫原因，再用「所以」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫原因，再用「所以」寫結果。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '雖然這次考試失敗，但是他並不灰心。',
          hint: '先排「雖然……但是……」。',
          hints: ['失敗後用「但是」轉折。', '標點各佔一塊。'],
          order: ['雖然', '這次', '考試', '失敗', '，', '但是', '他', '並不', '灰心', '。'],
          distractorHint: '「雖然」要配「但是」。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '「雖然」要配「但是」。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '如果週末放假，我們就去郊外遠足。',
          hint: '先排「如果……就……」。',
          hints: ['先寫假設，再寫結果。', '標點各佔一塊。'],
          order: ['如果', '週末', '放假', '，', '我們', '就', '去', '郊外', '遠足', '。'],
          distractorHint: '先寫「如果」，再用「就」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「如果」，再用「就」寫結果。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '因為路很滑，所以我們慢慢地走路。',
          hint: '先排「因為……所以……」。',
          hints: ['路滑是原因，慢走是結果。', '標點各佔一塊。'],
          order: ['因為', '路', '很滑', '，', '所以', '我們', '慢慢', '地', '走路', '。'],
          distractorHint: '先寫「因為」，再用「所以」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「因為」，再用「所以」寫結果。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '弟弟不但愛看書，而且愛寫日記。',
          hint: '先排「不但……而且……」。',
          hints: ['兩件喜好用「不但……而且……」。', '標點各佔一塊。'],
          order: ['弟弟', '不但', '愛', '看書', '，', '而且', '愛', '寫', '日記', '。'],
          distractorHint: '「不但」要配「而且」。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '「不但」要配「而且」。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '雖然功課很多，姐姐仍然抽空溫習。',
          hint: '「雖然」配「仍然」表示轉折。',
          hints: ['先寫情況，再寫仍然怎樣做。', '標點各佔一塊。'],
          order: ['雖然', '功課', '很多', '，', '姐姐', '仍然', '抽空', '替我', '溫習', '。'],
          distractorHint: '先寫「雖然」，再用「仍然」寫轉折。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「雖然」，再用「仍然」寫轉折。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '因為愛護環境，所以我們不亂丟垃圾。',
          hint: '先排「因為……所以……」。',
          hints: ['愛護環境是原因。', '標點各佔一塊。'],
          order: ['因為', '愛護', '環境', '，', '所以', '我們', '不', '亂丟', '垃圾', '。'],
          distractorHint: '先寫「因為」，再用「所以」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「因為」，再用「所以」寫結果。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '如果大家齊心，這件事就容易辦成。',
          hint: '先排「如果……就……」。',
          hints: ['齊心是條件，辦成是結果。', '標點各佔一塊。'],
          order: ['如果', '大家', '齊心', '，', '這件', '事', '就', '容易', '辦成', '。'],
          distractorHint: '先寫「如果」，再用「就」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「如果」，再用「就」寫結果。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '雖然下着大雨，但是同學仍然上學去。',
          hint: '先排「雖然……但是……仍然……」。',
          hints: ['雨天用「但是／仍然」轉折。', '標點各佔一塊。'],
          order: ['雖然', '下着', '大雨', '，', '但是', '同學', '仍然', '上學', '去', '。'],
          distractorHint: '「雖然」要配「但是」或「仍然」。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '「雖然」要配「但是」或「仍然」。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '媽媽不但會煮湯，而且會烤蛋糕。',
          hint: '先排「不但……而且……」。',
          hints: ['兩種廚藝用「不但……而且……」。', '標點各佔一塊。'],
          order: ['媽媽', '不但', '會', '煮湯', '，', '而且', '會', '烤', '蛋糕', '。'],
          distractorHint: '「不但」要配「而且」。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '「不但」要配「而且」。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '因為天氣轉涼，所以媽媽拿出厚衣服。',
          hint: '先排「因為……所以……」。',
          hints: ['轉涼是原因，拿衣服是結果。', '標點各佔一塊。'],
          order: ['因為', '天氣', '轉涼', '，', '所以', '媽媽', '拿出', '厚', '衣服', '。'],
          distractorHint: '先寫「因為」，再用「所以」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「因為」，再用「所以」寫結果。'
        },
        {
          prompt: '請把下列字詞排成一句通順的話。',
          speak: '如果明天不用上課，我們就去圖書館。',
          hint: '先排「如果……就……」。',
          hints: ['先寫假設，再寫去哪裏。', '標點各佔一塊。'],
          order: ['如果', '明天', '不用', '上課', '，', '我們', '就', '去', '圖書館', '。'],
          distractorHint: '先寫「如果」，再用「就」寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「如果」，再用「就」寫結果。'
        }
      ]
    }
  },
  L3_paragraph: {
    id: 'L3_paragraph',
    spot: 'pasture',
    name: '排句成段',
    verb: 'drag',
    npc: '農夫',
    voice: 'primary',
    goal: '請點選句子，排成一段通順的話',
    itemsByDiff: {
      easy: [
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '早上我們到牧場，我們餵小羊吃草，傍晚我們回家！',
          hint: '先找出表示時間的句子。',
          hints: ['先找出表示時間的句子。'],
          order: ['早上我們到牧場，', '我們餵小羊吃草，', '傍晚我們回家！'],
          distractorHint: '請按時間先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按時間先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '我們走到菜園。大家一起種菜！菜苗長得很齊。',
          hint: '請按做事的先後排列。',
          hints: ['請按做事的先後排列。'],
          order: ['我們走到菜園。', '大家一起種菜！', '菜苗長得很齊。'],
          distractorHint: '先到地方，再做事，最後寫結果。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先到地方，再做事，最後寫結果。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '漁夫走到魚塘，他放下魚餌，他釣到一條魚！',
          hint: '請按釣魚的步驟排列。',
          hints: ['請按釣魚的步驟排列。'],
          order: ['漁夫走到魚塘，', '他放下魚餌，', '他釣到一條魚！'],
          distractorHint: '先到魚塘，再放下魚餌，最後才釣到魚。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先到魚塘，再放下魚餌，最後才釣到魚。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '天空忽然下雨！我們趕快收衣服，大家都跑回家。',
          hint: '先找出下雨的句子。',
          hints: ['先找出下雨的句子。'],
          order: ['天空忽然下雨！', '我們趕快收衣服，', '大家都跑回家。'],
          distractorHint: '先下雨，再收衣服，最後回家。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先下雨，再收衣服，最後回家。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '我們提着飼料，牛羊走過來吃，牠們吃得很開心！',
          hint: '先寫拿出飼料，再寫動物來吃。',
          hints: ['先寫拿出飼料，再寫動物來吃。'],
          order: ['我們提着飼料，', '牛羊走過來吃，', '牠們吃得很開心！'],
          distractorHint: '先提飼料，再給動物吃，最後寫牠們的樣子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先提飼料，再給動物吃，最後寫牠們的樣子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '穀倉的門打開了！大家把穀物搬進去，農夫把門鎖好。',
          hint: '先開門，再搬東西，最後鎖門。',
          hints: ['先開門，再搬東西，最後鎖門。'],
          order: ['穀倉的門打開了！', '大家把穀物搬進去，', '農夫把門鎖好。'],
          distractorHint: '開門→搬進去→鎖門。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '開門→搬進去→鎖門。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '早上太陽出來了，小鳥開始唱歌，我們去上學。',
          hint: '先找出表示時間的句子。',
          hints: ['先找出表示時間的句子。'],
          order: ['早上太陽出來了，', '小鳥開始唱歌，', '我們去上學。'],
          distractorHint: '先找出表示時間的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出表示時間的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '媽媽走進廚房，她洗乾淨蔬菜，然後開始煮湯。',
          hint: '請按做事的先後排列。',
          hints: ['請按做事的先後排列。'],
          order: ['媽媽走進廚房，', '她洗乾淨蔬菜，', '然後開始煮湯。'],
          distractorHint: '請按做事的先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按做事的先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '弟弟拿出畫筆，他認真地畫畫，畫好了一隻貓！',
          hint: '請按做事步驟排列。',
          hints: ['請按做事步驟排列。'],
          order: ['弟弟拿出畫筆，', '他認真地畫畫，', '畫好了一隻貓！'],
          distractorHint: '請按做事步驟排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按做事步驟排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '忽然刮起大風！樹上的葉子落下來，我們趕快回家。',
          hint: '先找出起風的句子。',
          hints: ['先找出起風的句子。'],
          order: ['忽然刮起大風！', '樹上的葉子落下來，', '我們趕快回家。'],
          distractorHint: '先找出起風的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出起風的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '我打開書包，拿出練習簿，開始寫功課！',
          hint: '請按做事先後排列。',
          hints: ['請按做事先後排列。'],
          order: ['我打開書包，', '拿出練習簿，', '開始寫功課！'],
          distractorHint: '請按做事先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按做事先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '農夫走到田裏，他播下種子，盼望收成好。',
          hint: '請按耕種步驟排列。',
          hints: ['請按耕種步驟排列。'],
          order: ['農夫走到田裏，', '他播下種子，', '盼望收成好。'],
          distractorHint: '請按耕種步驟排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按耕種步驟排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '晚上燈亮了，全家坐在一起，開心吃晚飯！',
          hint: '先找出時間的句子。',
          hints: ['先找出時間的句子。'],
          order: ['晚上燈亮了，', '全家坐在一起，', '開心吃晚飯！'],
          distractorHint: '先找出時間的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出時間的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '小貓看見蝴蝶！牠追着跑，卻捉不到。',
          hint: '請按事情先後排列。',
          hints: ['請按事情先後排列。'],
          order: ['小貓看見蝴蝶！', '牠追着跑，', '卻捉不到。'],
          distractorHint: '請按事情先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按事情先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '我們走到河邊，看見小魚游泳，大家都很開心！',
          hint: '先到地方，再看事物，最後寫心情。',
          hints: ['先到地方，再看事物，最後寫心情。'],
          order: ['我們走到河邊，', '看見小魚游泳，', '大家都很開心！'],
          distractorHint: '先到地方，再看事物，最後寫心情。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先到地方，再看事物，最後寫心情。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '老師走進課室，同學們站起來，齊聲說早安。',
          hint: '請按上課開始的次序排列。',
          hints: ['請按上課開始的次序排列。'],
          order: ['老師走進課室，', '同學們站起來，', '齊聲說早安。'],
          distractorHint: '請按上課開始的次序排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按上課開始的次序排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '下雪了！地上變得雪白，小朋友堆雪人。',
          hint: '先找出下雪的句子。',
          hints: ['先找出下雪的句子。'],
          order: ['下雪了！', '地上變得雪白，', '小朋友堆雪人。'],
          distractorHint: '先找出下雪的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出下雪的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '爸爸修好單車，讓我試騎一下，我騎得很穩！',
          hint: '請按做事先後排列。',
          hints: ['請按做事先後排列。'],
          order: ['爸爸修好單車，', '讓我試騎一下，', '我騎得很穩！'],
          distractorHint: '請按做事先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按做事先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '蜜蜂飛來飛去，停在花朵上，忙着採花蜜！',
          hint: '請按事情先後排列。',
          hints: ['請按事情先後排列。'],
          order: ['蜜蜂飛來飛去，', '停在花朵上，', '忙着採花蜜！'],
          distractorHint: '請按事情先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按事情先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '姐姐打開故事書，她輕輕地讀給我聽，我聽得入了神。',
          hint: '請按做事先後排列。',
          hints: ['請按做事先後排列。'],
          order: ['姐姐打開故事書，', '她輕輕地讀給我聽，', '我聽得入了神。'],
          distractorHint: '請按做事先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按做事先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '天亮了，公雞喔喔叫，農場醒過來！',
          hint: '先找出時間的句子。',
          hints: ['先找出時間的句子。'],
          order: ['天亮了，', '公雞喔喔叫，', '農場醒過來！'],
          distractorHint: '先找出時間的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出時間的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '我們提着水桶，去澆菜園的菜，菜葉變得翠綠！',
          hint: '請按做事先後排列。',
          hints: ['請按做事先後排列。'],
          order: ['我們提着水桶，', '去澆菜園的菜，', '菜葉變得翠綠！'],
          distractorHint: '請按做事先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按做事先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '忽然閃電了！跟着打雷，大家走進屋內。',
          hint: '先找出閃電的句子。',
          hints: ['先找出閃電的句子。'],
          order: ['忽然閃電了！', '跟着打雷，', '大家走進屋內。'],
          distractorHint: '先找出閃電的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出閃電的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '妹妹穿好衣服，背上小書包，高高興興上學去！',
          hint: '請按出門步驟排列。',
          hints: ['請按出門步驟排列。'],
          order: ['妹妹穿好衣服，', '背上小書包，', '高高興興上學去！'],
          distractorHint: '請按出門步驟排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按出門步驟排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '湖面很平靜，小鴨游過來，留下一串水紋！',
          hint: '請按場面先後排列。',
          hints: ['請按場面先後排列。'],
          order: ['湖面很平靜，', '小鴨游過來，', '留下一串水紋！'],
          distractorHint: '請按場面先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按場面先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '我們收拾玩具，把房間整理好，媽媽露出笑容。',
          hint: '請按做事先後排列。',
          hints: ['請按做事先後排列。'],
          order: ['我們收拾玩具，', '把房間整理好，', '媽媽露出笑容。'],
          distractorHint: '請按做事先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按做事先後排列。'
        }
      ],
      medium: [
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '星期六早上，爸爸帶我去圖書館。我借了兩本故事書！回家後我立刻讀起來。',
          hint: '請按「時間—去做甚麼—結果」排列。',
          hints: ['請按時間與做事先後排列。'],
          order: ['星期六早上，', '爸爸帶我去圖書館。', '我借了兩本故事書！', '回家後我立刻讀起來。'],
          distractorHint: '先寫時間，再寫去圖書館、借書、回家讀。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫時間，再寫去圖書館、借書、回家讀。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為下大雨，所以路很滑。我們慢慢地走，終於平安到家了。',
          hint: '先找出表示原因的句子。',
          hints: ['先找出表示原因的句子。'],
          order: ['因為下大雨，所以路很滑。', '我們慢慢地走，', '終於平安到家了。'],
          distractorHint: '先寫原因，再寫怎樣走，最後到家。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫原因，再寫怎樣走，最後到家。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '媽媽買菜回來了！她把青菜洗乾淨，然後切成小段，準備煮湯給大家喝。',
          hint: '先找出媽媽回來，再排洗、切、煮。',
          hints: ['請按做事步驟排列。'],
          order: ['媽媽買菜回來了！', '她把青菜洗乾淨，', '然後切成小段，', '準備煮湯給大家喝。'],
          distractorHint: '回來→洗→切→煮。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '回來→洗→切→煮。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '上課鐘響了。同學們迅速走進課室，老師開始點名，大家都坐得端端正正。',
          hint: '先找出鐘響，再排進課室、點名、坐好。',
          hints: ['請按課前步驟排列。'],
          order: ['上課鐘響了。', '同學們迅速走進課室，', '老師開始點名，', '大家都坐得端端正正。'],
          distractorHint: '鐘響→進課室→點名→坐好。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '鐘響→進課室→點名→坐好。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '我們先完成功課，再幫忙洗碗，最後才可以看電視！',
          hint: '留意「先」「再」「最後」這些詞。',
          hints: ['留意「先」「再」「最後」這些詞。'],
          order: ['我們先完成功課，', '再幫忙洗碗，', '最後才可以看電視！'],
          distractorHint: '請按「先—再—最後」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「先—再—最後」排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為明天要測驗，所以今晚早點睡。媽媽替我調好鬧鐘，我安心地上牀休息。',
          hint: '先找出「因為……所以……」的句子。',
          hints: ['先找出因果句。'],
          order: ['因為明天要測驗，所以今晚早點睡。', '媽媽替我調好鬧鐘，', '我安心地上牀休息。'],
          distractorHint: '先寫因果，再寫調鬧鐘與休息。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫因果，再寫調鬧鐘與休息。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '星期天早上，媽媽帶我去市場。我們買了新鮮魚！回家後一起煮來吃。',
          hint: '請按「時間—去做甚麼—結果」排列。',
          hints: ['請按「時間—去做甚麼—結果」排列。'],
          order: ['星期天早上，', '媽媽帶我去市場。', '我們買了新鮮魚！', '回家後一起煮來吃。'],
          distractorHint: '請按「時間—去做甚麼—結果」排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按「時間—去做甚麼—結果」排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為路很遠，所以我們提早出門。一路上說說笑笑，終於趕到學校了。',
          hint: '先找出表示原因的句子。',
          hints: ['先找出表示原因的句子。'],
          order: ['因為路很遠，所以我們提早出門。', '一路上說說笑笑，', '終於趕到學校了。'],
          distractorHint: '先找出表示原因的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出表示原因的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '爸爸下班回來了！他換上便服，然後陪我下棋，大家玩得很開心。',
          hint: '請按回家後的先後排列。',
          hints: ['請按回家後的先後排列。'],
          order: ['爸爸下班回來了！', '他換上便服，', '然後陪我下棋，', '大家玩得很開心。'],
          distractorHint: '請按回家後的先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按回家後的先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '下課鐘響了。同學們收拾書包，老師叮囑我們小心過馬路，大家慢慢走出校門。',
          hint: '請按放學流程排列。',
          hints: ['請按放學流程排列。'],
          order: ['下課鐘響了。', '同學們收拾書包，', '老師叮囑我們小心過馬路，', '大家慢慢走出校門。'],
          distractorHint: '請按放學流程排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按放學流程排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '我們先洗手，再幫忙擺碗筷，最後才開動吃飯！',
          hint: '留意「先／再／最後」。',
          hints: ['留意「先／再／最後」。'],
          order: ['我們先洗手，', '再幫忙擺碗筷，', '最後才開動吃飯！'],
          distractorHint: '留意「先／再／最後」。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '留意「先／再／最後」。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為明天要旅行，所以今晚整理行李。姐姐幫我檢查物品，我安心地上牀睡覺。',
          hint: '先找出表示原因的句子。',
          hints: ['先找出表示原因的句子。'],
          order: ['因為明天要旅行，所以今晚整理行李。', '姐姐幫我檢查物品，', '我安心地上牀睡覺。'],
          distractorHint: '先找出表示原因的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出表示原因的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '星期六下午，我們去公園放風箏。風箏飛得很高！大家都笑得很開心。',
          hint: '請按時間與事情先後排列。',
          hints: ['請按時間與事情先後排列。'],
          order: ['星期六下午，', '我們去公園放風箏。', '風箏飛得很高！', '大家都笑得很開心。'],
          distractorHint: '請按時間與事情先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按時間與事情先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '忽然下起大雨。我們跑到屋簷下，等雨停了才回家，衣服都濕了一點。',
          hint: '先找出下雨的句子。',
          hints: ['先找出下雨的句子。'],
          order: ['忽然下起大雨。', '我們跑到屋簷下，', '等雨停了才回家，', '衣服都濕了一點。'],
          distractorHint: '先找出下雨的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出下雨的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '老師派發測驗卷。同學們安靜作答，鈴聲一響就停筆，大家鬆了一口氣。',
          hint: '請按測驗流程排列。',
          hints: ['請按測驗流程排列。'],
          order: ['老師派發測驗卷。', '同學們安靜作答，', '鈴聲一響就停筆，', '大家鬆了一口氣。'],
          distractorHint: '請按測驗流程排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按測驗流程排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為想看清楚，所以我戴上眼鏡。字跡立刻清楚了，我繼續認真寫字。',
          hint: '先找出表示原因的句子。',
          hints: ['先找出表示原因的句子。'],
          order: ['因為想看清楚，所以我戴上眼鏡。', '字跡立刻清楚了，', '我繼續認真寫字。'],
          distractorHint: '先找出表示原因的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出表示原因的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '晚上八時，全家坐在客廳。我們一起看電視！看到好笑處都笑了。',
          hint: '請按時間與事情先後排列。',
          hints: ['請按時間與事情先後排列。'],
          order: ['晚上八時，', '全家坐在客廳。', '我們一起看電視！', '看到好笑處都笑了。'],
          distractorHint: '請按時間與事情先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按時間與事情先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '我們先量好水，再倒進水杯，最後才把花澆好！',
          hint: '留意「先／再／最後」。',
          hints: ['留意「先／再／最後」。'],
          order: ['我們先量好水，', '再倒進水杯，', '最後才把花澆好！'],
          distractorHint: '留意「先／再／最後」。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '留意「先／再／最後」。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為肚子餓了，所以我們走進餐廳。點了兩碗麵，吃得津津有味。',
          hint: '先找出表示原因的句子。',
          hints: ['先找出表示原因的句子。'],
          order: ['因為肚子餓了，所以我們走進餐廳。', '點了兩碗麵，', '吃得津津有味。'],
          distractorHint: '先找出表示原因的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出表示原因的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '運動課開始了。老師教我們熱身，接着練習跑步，最後一起伸展。',
          hint: '請按課堂流程排列。',
          hints: ['請按課堂流程排列。'],
          order: ['運動課開始了。', '老師教我們熱身，', '接着練習跑步，', '最後一起伸展。'],
          distractorHint: '請按課堂流程排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按課堂流程排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '星期五晚上，我完成了全部功課。媽媽檢查一遍。准許我看一會書。',
          hint: '請按時間與事情先後排列。',
          hints: ['請按時間與事情先後排列。'],
          order: ['星期五晚上，', '我完成了全部功課。', '媽媽檢查一遍。', '准許我看一會書。'],
          distractorHint: '請按時間與事情先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按時間與事情先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為天氣轉涼，所以媽媽拿出厚衣服。我穿上毛衣，就不怕冷了。',
          hint: '先找出表示原因的句子。',
          hints: ['先找出表示原因的句子。'],
          order: ['因為天氣轉涼，所以媽媽拿出厚衣服。', '我穿上毛衣，', '就不怕冷了。'],
          distractorHint: '先找出表示原因的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出表示原因的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '我們來到農場。先探望小羊，再餵牠們青草，最後和農夫道別。',
          hint: '留意「先／再／最後」。',
          hints: ['留意「先／再／最後」。'],
          order: ['我們來到農場。', '先探望小羊，', '再餵牠們青草，', '最後和農夫道別。'],
          distractorHint: '留意「先／再／最後」。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '留意「先／再／最後」。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '上課前十分鐘，班長提醒大家坐好。老師走進課室。課堂正式開始。',
          hint: '請按上課前先後排列。',
          hints: ['請按上課前先後排列。'],
          order: ['上課前十分鐘，', '班長提醒大家坐好。', '老師走進課室。', '課堂正式開始。'],
          distractorHint: '請按上課前先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按上課前先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為要準時，所以我們快步行走。終於趕上巴士，大家都放心了。',
          hint: '先找出表示原因的句子。',
          hints: ['先找出表示原因的句子。'],
          order: ['因為要準時，所以我們快步行走。', '終於趕上巴士，', '大家都放心了。'],
          distractorHint: '先找出表示原因的句子。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先找出表示原因的句子。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '中秋節那天，我們在天台賞月。吃了甜甜的月餅！全家有說有笑。',
          hint: '請按時間與事情先後排列。',
          hints: ['請按時間與事情先後排列。'],
          order: ['中秋節那天，', '我們在天台賞月。', '吃了甜甜的月餅！', '全家有說有笑。'],
          distractorHint: '請按時間與事情先後排列。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按時間與事情先後排列。'
        }
      ],
      hard: [
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為昨天下大雨，所以操場很濕滑。老師宣佈改在禮堂，我們搬來墊子，開始練習體操，大家都很小心，沒有人摔倒。',
          hint: '先排「因為……所以……」，再排改場地與練習。',
          hints: ['先找出「因為」原因句，再接「所以」結果句。', '因果之後才是改到禮堂與練習步驟。', '留意「因為」在「所以」前面。'],
          order: ['因為昨天下大雨，', '所以操場很濕滑。', '老師宣佈改在禮堂，', '我們搬來墊子，', '開始練習體操，', '大家都很小心，', '沒有人摔倒。'],
          distractorHint: '因為→所以→改場地→搬墊→練習→小心→沒摔倒。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排因果，再排改場地與練習步驟。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '雖然今天很忙，但是姐姐仍然抽空替我溫習。我們先改正錯字，再練習造句，最後一起檢查答案。',
          hint: '先找出「雖然……但是……仍然……」，再排溫習步驟。',
          hints: ['先排轉折句。', '再按溫習步驟排列。'],
          order: ['雖然今天很忙，', '但是姐姐仍然抽空替我溫習。', '我們先改正錯字，', '再練習造句，', '最後一起檢查答案，', '兩人都很開心。', '大家都笑起來。'],
          distractorHint: '先寫「雖然／但是」，再寫溫習步驟。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「雖然／但是」，再寫溫習步驟。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為明天要測驗，所以今晚早點溫習。我先整理筆記，再做練習題，媽媽替我調好鬧鐘，我洗漱完畢，就安心地上牀休息。',
          hint: '先排「因為……所以……」，再排溫習步驟與休息。',
          hints: ['先排出「因為」和「所以」兩句。', '溫習步驟在上床之前。', '調鬧鐘、洗漱後才休息。'],
          order: ['因為明天要測驗，', '所以今晚早點溫習。', '我先整理筆記，', '再做練習題，', '媽媽替我調好鬧鐘，', '我洗漱完畢，', '就安心地上牀休息。'],
          distractorHint: '因為→所以→整理→練習→鬧鐘→洗漱→休息。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排因果，再排溫習與休息步驟。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '下午放學後，我先把書包放好，接着寫完數學練習，又複習生字，最後才下樓玩耍，天色漸漸暗了，媽媽叫我回家吃飯。',
          hint: '先排放學，再排「先／接着／最後」與回家。',
          hints: ['留意「先」「接着」「最後」這些時間詞。', '放書包在寫練習之前。', '玩耍之後才是天色暗與回家。'],
          order: ['下午放學後，', '我先把書包放好，', '接着寫完數學練習，', '又複習生字，', '最後才下樓玩耍，', '天色漸漸暗了，', '媽媽叫我回家吃飯。'],
          distractorHint: '放學→放書包→寫練習→複習→玩耍→天暗→回家。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按放學後做事的先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '弟弟不但會畫畫，而且會寫故事。他先畫了一隻小貓，再寫下說明，貼在壁報上，同學們都稱讚他，他開心極了。',
          hint: '先找出「不但……而且……」，再排創作步驟。',
          hints: ['先排「不但……而且……」。', '再按畫畫、寫作、張貼排列。'],
          order: ['弟弟不但會畫畫，', '而且會寫故事。', '他先畫了一隻小貓，', '再寫下說明，', '貼在壁報上，', '同學們都稱讚他，', '他開心極了。'],
          distractorHint: '先寫「不但／而且」，再寫創作步驟。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「不但／而且」，再寫創作步驟。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為路很遠，所以我們提早出門。一路上說說笑笑，經過兩條大街，終於趕到學校，剛好趕上早會，大家都鬆了一口氣。',
          hint: '先排因果，再排路上與趕到學校。',
          hints: ['先找出「因為」和「所以」。', '出門之後才是一路經過。', '趕到學校後才趕上早會。'],
          order: ['因為路很遠，', '所以我們提早出門。', '一路上說說笑笑，', '經過兩條大街，', '終於趕到學校，', '剛好趕上早會，', '大家都鬆了一口氣。'],
          distractorHint: '因為→所以→說說笑笑→經過大街→趕到→早會→放心。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排因果，再排路程與到達。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '如果明天天氣晴朗，我們就去郊外放風箏。大家先準備材料，再到空地試飛，風箏漸漸升高，我們看得很高興。',
          hint: '先找出「如果……就……」，再排放風箏步驟。',
          hints: ['先排條件句。', '再按準備、試飛、升高排列。'],
          order: ['如果明天天氣晴朗，', '我們就去郊外放風箏。', '大家先準備材料，', '再到空地試飛，', '風箏漸漸升高，', '我們看得很高興，', '誰也不想回家。'],
          distractorHint: '先寫「如果／就」，再寫放風箏步驟。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫「如果／就」，再寫放風箏步驟。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '運動會那天，我參加了短跑比賽，哨子一響我就向前衝，中途超過兩位同學，最後衝過終點，得了第二名，全班為我鼓掌。',
          hint: '先排日子，再排比賽過程與結果。',
          hints: ['先找出表示日子的句子。', '槍聲響後才向前衝。', '衝過終點後才是名次與鼓掌。'],
          order: ['運動會那天，', '我參加了短跑比賽，', '哨子一響我就向前衝，', '中途超過兩位同學，', '最後衝過終點，', '得了第二名，', '全班為我鼓掌。'],
          distractorHint: '日子→參加→起跑→超過→終點→名次→鼓掌。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按比賽流程排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為想看清楚黑板，所以我戴上眼鏡。字跡立刻清楚了，我認真抄筆記，下課後整理好簿子，放進書包，心情輕鬆多了。',
          hint: '先排「因為……所以……」，再排看清後的行動。',
          hints: ['先排出因果兩句。', '戴眼鏡後字跡才清楚。', '抄筆記在整理簿子之前。'],
          order: ['因為想看清楚黑板，', '所以我戴上眼鏡。', '字跡立刻清楚了，', '我認真抄筆記，', '下課後整理好簿子，', '放進書包，', '心情輕鬆多了。'],
          distractorHint: '因為→所以→清楚→抄筆記→整理→放書包→輕鬆。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排因果，再排抄寫與收拾。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '冬天到了，湖面結了一層薄冰，小朋友們圍着看，有人想走上去，老師連忙阻止，誰也不敢踏上冰面，大家只好在岸邊堆雪人。',
          hint: '先排季節與結冰，再排圍看、阻止與改玩。',
          hints: ['先找出季節句。', '結冰之後才圍着看。', '老師阻止後才改去堆雪人。'],
          order: ['冬天到了，', '湖面結了一層薄冰，', '小朋友們圍着看，', '有人想走上去，', '老師連忙阻止，', '誰也不敢踏上冰面，', '大家只好在岸邊堆雪人。'],
          distractorHint: '冬天→結冰→圍看→想走→阻止→不敢→堆雪人。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫季節景象，再寫阻止與改玩。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '清早霧氣未散，爸爸帶我去買包子，店門剛開，熱氣從蒸籠冒出，我們買了六個，一邊走一邊吃，包子真香。',
          hint: '先找出時間，再排買包子的步驟。',
          hints: ['先找出清晨時間句。', '店門開後才看見熱氣。', '買了之後才邊走邊吃。'],
          order: ['清早霧氣未散，', '爸爸帶我去買包子，', '店門剛開，', '熱氣從蒸籠冒出，', '我們買了六個，', '一邊走一邊吃，', '包子真香。'],
          distractorHint: '清晨→出發→開門→熱氣→購買→邊走邊吃→真香。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按買包子的時間序排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為肚子餓了，所以我們走進餐廳。點了兩碗麵，又要了一碟青菜，很快就上桌了，大家吃得津津有味，連湯也喝光了。',
          hint: '先排因果，再排點菜、上桌與進食。',
          hints: ['先找出「因為」和「所以」。', '點菜在上桌之前。', '吃得津津有味在上菜之後。'],
          order: ['因為肚子餓了，', '所以我們走進餐廳。', '點了兩碗麵，', '又要了一碟青菜，', '很快就上桌了，', '大家吃得津津有味，', '連湯也喝光了。'],
          distractorHint: '因為→所以→點麵→點菜→上桌→吃→喝湯。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排因果，再排點餐與進食。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '圖書館很安靜，我找到想看的書，坐在窗邊細讀，做了幾頁筆記，不知不覺過了一小時，管理員輕聲提醒，我才收拾離開。',
          hint: '先寫環境，再寫借讀、做筆記與離開。',
          hints: ['先找出寫環境的句子。', '找到書後才坐下細讀。', '管理員提醒後才離開。'],
          order: ['圖書館很安靜，', '我找到想看的書，', '坐在窗邊細讀，', '做了幾頁筆記，', '不知不覺過了一小時，', '管理員輕聲提醒，', '我才收拾離開。'],
          distractorHint: '安靜→找書→細讀→筆記→一小時→提醒→離開。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫環境，再寫閱讀與離開。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '下雨過後，天上出現彩虹，弟弟指着天空大叫，我們一起跑到窗邊，拿出手機拍照，還互相比手勢，留下開心的紀念。',
          hint: '先寫雨後與彩虹，再排指認、拍照與紀念。',
          hints: ['先找出「下雨過後」。', '出現彩虹後弟弟才指着叫。', '拍照在比手勢與紀念之前。'],
          order: ['下雨過後，', '天上出現彩虹，', '弟弟指着天空大叫，', '我們一起跑到窗邊，', '拿出手機拍照，', '還互相比手勢，', '留下開心的紀念。'],
          distractorHint: '雨後→彩虹→大叫→窗邊→拍照→比手勢→紀念。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按雨後看彩虹的先後排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為天氣轉涼，所以媽媽拿出厚衣服。我穿上毛衣，又加了一件外套，戴好帽子，就不怕冷了，可以安心上學。',
          hint: '先排因果，再排穿衣步驟與結果。',
          hints: ['先排出「因為」和「所以」。', '毛衣在外套之前。', '不怕冷之後才安心上學。'],
          order: ['因為天氣轉涼，', '所以媽媽拿出厚衣服。', '我穿上毛衣，', '又加了一件外套，', '戴好帽子，', '就不怕冷了，', '可以安心上學。'],
          distractorHint: '因為→所以→毛衣→外套→帽子→不怕冷→上學。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排因果，再排穿衣次序。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '媽媽生病了，我倒了一杯溫水，輕輕放到牀邊，幫她蓋好被子，提醒她按時吃藥，希望她早點好起來，她微笑着點頭。',
          hint: '先寫原因，再寫照顧步驟與願望。',
          hints: ['先找出媽媽生病的句子。', '倒水後才放到牀邊。', '叮囑吃藥在希望康復之前。'],
          order: ['媽媽生病了，', '我倒了一杯溫水，', '輕輕放到牀邊，', '幫她蓋好被子，', '提醒她按時吃藥，', '希望她早點好起來，', '她微笑着點頭。'],
          distractorHint: '生病→倒水→放牀邊→蓋被→吃藥→希望→點頭。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫原因，再寫照顧步驟。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '忽然停電了，屋裏變得一片漆黑，爸爸找出電筒，我們靠着燈光坐下，輪流說有趣的事，不知不覺過了半小時，電終於來了。',
          hint: '先寫停電，再寫找電筒、聊天與來電。',
          hints: ['先找出停電的句子。', '漆黑之後才找電筒。', '聊天在電力恢復之前。'],
          order: ['忽然停電了，', '屋裏變得一片漆黑，', '爸爸找出電筒，', '我們靠着燈光坐下，', '輪流說有趣的事，', '不知不覺過了半小時，', '電終於來了。'],
          distractorHint: '停電→漆黑→電筒→坐下→聊天→半小時→來電。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先寫停電，再寫應對與來電。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '姐姐學骑自行车，起初總是跌倒，膝蓋擦破了一點皮，後來越騎越穩，能夠自己轉彎，還敢走小斜坡，終於學會了。',
          hint: '請按學習過程由失敗到成功排列。',
          hints: ['先寫開始學騎。', '跌倒在越騎越穩之前。', '轉彎、斜坡後才終於學會。'],
          order: ['姐姐學骑自行车，', '起初總是跌倒，', '膝蓋擦破了一點皮，', '後來越騎越穩，', '能夠自己轉彎，', '還敢走小斜坡，', '終於學會了。'],
          distractorHint: '學騎→跌倒→擦傷→漸穩→轉彎→斜坡→學會。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按學習過程排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '週末我們去郊野公園，沿山路慢慢走上去，在半山休息飲水，到了山頂吃午餐，拍了幾張照片，下午才下山，回到家已經黃昏。',
          hint: '請按郊遊上山、山頂、下山的時間序排列。',
          hints: ['先找出出發去公園。', '半山休息在山頂午餐之前。', '下山回家是最後。'],
          order: ['週末我們去郊野公園，', '沿山路慢慢走上去，', '在半山休息飲水，', '到了山頂吃午餐，', '拍了幾張照片，', '下午才下山，', '回到家已經黃昏。'],
          distractorHint: '出發→上山→半山→山頂午餐→拍照→下山→回家。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '請按郊遊時間序排列。'
        },
        {
          prompt: '請把下列句子排成一段通順的話。',
          speak: '因為要準時到達，所以我們快步行走。經過馬路時很小心，終於趕上巴士，找到空位坐下，大家都放心了，還互相笑了笑。',
          hint: '先排因果，再排趕路、上車與放心。',
          hints: ['先找出「因為」和「所以」。', '快步走後才經過馬路。', '趕上巴士後才坐下放心。'],
          order: ['因為要準時到達，', '所以我們快步行走。', '經過馬路時很小心，', '終於趕上巴士，', '找到空位坐下，', '大家都放心了，', '還互相笑了笑。'],
          distractorHint: '因為→所以→過馬路→趕上→坐下→放心→互笑。',
          explainCorrect: '句子順序正確，段落通順。',
          explainWrong: '先排因果，再排趕車過程。'
        }
      ]
    }
  },
  L4_measure: {
    id: 'L4_measure',
    spot: 'barn',
    name: '量詞填空',
    verb: 'tap',
    npc: '農夫',
    voice: 'primary',
    goal: '請選擇正確的量詞',
    itemsByDiff: {
      easy: [
        {
          prompt: '請選擇正確的量詞。一＿小鳥',
          speak: '一隻小鳥',
          hint: '想一想小型動物常用哪一個量詞。',
          hints: ['想一想小型動物常用哪一個量詞。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '隻',
              correct: true,
              hint: '小型動物常用「隻」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」多用在平面的物件。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿雨傘',
          speak: '一把雨傘',
          hint: '想一想有柄、可以握住的物件。',
          hints: ['想一想有柄、可以握住的物件。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '把',
              correct: true,
              hint: '有柄可握的物件常用「把」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '雨傘不用「隻」。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿桌子',
          speak: '一張桌子',
          hint: '想一想平面較大的家具常用哪一個量詞。',
          hints: ['想一想平面較大的家具常用哪一個量詞。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '張',
              correct: true,
              hint: '桌子、紙張常用「張」。'
            },
            {
              text: '條',
              correct: false,
              hint: '桌子不用「條」。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿書',
          speak: '一本書',
          hint: '想一想裝訂成冊的讀物常用哪一個量詞。',
          hints: ['想一想裝訂成冊的讀物常用哪一個量詞。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '本',
              correct: true,
              hint: '書本常用「本」。'
            },
            {
              text: '張',
              correct: false,
              hint: '整本書不用「張」。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿花',
          speak: '一朵花',
          hint: '想一想花朵常用哪一個量詞。',
          hints: ['想一想花朵常用哪一個量詞。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '朵',
              correct: true,
              hint: '花朵常用「朵」。'
            },
            {
              text: '條',
              correct: false,
              hint: '花不用「條」。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿牛',
          speak: '一頭牛',
          hint: '想一想較大的牲畜常用哪一個量詞。',
          hints: ['想一想較大的牲畜常用哪一個量詞。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '頭',
              correct: true,
              hint: '牛常用「頭」。'
            },
            {
              text: '張',
              correct: false,
              hint: '牛不用「張」。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿蘋果',
          speak: '一個蘋果',
          hint: '常用來數蘋果的量詞是甚麼？',
          hints: ['常用來數蘋果的量詞是甚麼？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '個',
              correct: true,
              hint: '這裏應用「個」。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿刀',
          speak: '一把刀',
          hint: '有把手的工具常用哪個量詞？',
          hints: ['有把手的工具常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '把',
              correct: true,
              hint: '這裏應用「把」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿信',
          speak: '一封信',
          hint: '書信常用哪個量詞？',
          hints: ['書信常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '封',
              correct: true,
              hint: '這裏應用「封」。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '頭',
              correct: false,
              hint: '「頭」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿河',
          speak: '一條河',
          hint: '長長的河流常用哪個量詞？',
          hints: ['長長的河流常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '條',
              correct: true,
              hint: '這裏應用「條」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿帽子',
          speak: '一頂帽子',
          hint: '帽子常用哪個量詞？',
          hints: ['帽子常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '頂',
              correct: true,
              hint: '這裏應用「頂」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '塊',
              correct: false,
              hint: '「塊」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿羊',
          speak: '一隻羊',
          hint: '動物常用哪個量詞？',
          hints: ['動物常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '隻',
              correct: true,
              hint: '這裏應用「隻」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿門',
          speak: '一扇門',
          hint: '門常用哪個量詞？',
          hints: ['門常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '扇',
              correct: true,
              hint: '這裏應用「扇」。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '頭',
              correct: false,
              hint: '「頭」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿麵包',
          speak: '一塊麵包',
          hint: '切成一塊的食物常用哪個量詞？',
          hints: ['切成一塊的食物常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '塊',
              correct: true,
              hint: '這裏應用「塊」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿鉛筆',
          speak: '一支鉛筆',
          hint: '細長的筆常用哪個量詞？',
          hints: ['細長的筆常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '支',
              correct: true,
              hint: '這裏應用「支」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '頭',
              correct: false,
              hint: '「頭」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿地圖',
          speak: '一幅地圖',
          hint: '平面的圖畫常用哪個量詞？',
          hints: ['平面的圖畫常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '幅',
              correct: true,
              hint: '這裏應用「幅」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿馬',
          speak: '一匹馬',
          hint: '馬常用哪個量詞？',
          hints: ['馬常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '匹',
              correct: true,
              hint: '這裏應用「匹」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿褲子',
          speak: '一條褲子',
          hint: '褲子常用哪個量詞？',
          hints: ['褲子常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '條',
              correct: true,
              hint: '這裏應用「條」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '頭',
              correct: false,
              hint: '「頭」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿燈',
          speak: '一盞燈',
          hint: '燈常用哪個量詞？',
          hints: ['燈常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '盞',
              correct: true,
              hint: '這裏應用「盞」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿山',
          speak: '一座山',
          hint: '大山常用哪個量詞？',
          hints: ['大山常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '座',
              correct: true,
              hint: '這裏應用「座」。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿鑰匙',
          speak: '一把鑰匙',
          hint: '鑰匙常用哪個量詞？',
          hints: ['鑰匙常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '把',
              correct: true,
              hint: '這裏應用「把」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿蛋',
          speak: '一隻蛋',
          hint: '蛋常用哪個量詞？',
          hints: ['蛋常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '隻',
              correct: true,
              hint: '這裏應用「隻」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿旗',
          speak: '一面旗',
          hint: '旗子常用哪個量詞？',
          hints: ['旗子常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '面',
              correct: true,
              hint: '這裏應用「面」。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿橋',
          speak: '一座橋',
          hint: '橋常用哪個量詞？',
          hints: ['橋常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '座',
              correct: true,
              hint: '這裏應用「座」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿繩',
          speak: '一條繩',
          hint: '長長的繩子常用哪個量詞？',
          hints: ['長長的繩子常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '條',
              correct: true,
              hint: '這裏應用「條」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '頭',
              correct: false,
              hint: '「頭」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿窗',
          speak: '一扇窗',
          hint: '窗戶常用哪個量詞？',
          hints: ['窗戶常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '扇',
              correct: true,
              hint: '這裏應用「扇」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        }
      ],
      medium: [
        {
          prompt: '請選擇正確的量詞。一＿鞋子',
          speak: '一雙鞋子',
          hint: '成對穿的東西常用哪一個量詞？',
          hints: ['成對穿的東西常用哪一個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '雙',
              correct: true,
              hint: '成對的鞋子常用「雙」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '單邊才用「隻」，一對用「雙」。'
            },
            {
              text: '下',
              correct: false,
              hint: '「下」是動量詞，不用來數鞋子。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿樹',
          speak: '一棵樹',
          hint: '整株植物常用哪一個量詞？',
          hints: ['整株植物常用哪一個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '棵',
              correct: true,
              hint: '整株樹常用「棵」。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」多用在花。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」是動量詞，不用來數樹。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿魚',
          speak: '一條魚',
          hint: '細長的動物常用哪一個量詞？',
          hints: ['細長的動物常用哪一個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '條',
              correct: true,
              hint: '魚常用「條」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '魚較常用「條」，少用「隻」。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」是動量詞，不用來數魚。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。敲了門一＿',
          speak: '敲了門一下',
          hint: '表示動作做了一次，常用哪個動量詞？',
          hints: ['表示動作做了一次，常用哪個動量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '下',
              correct: true,
              hint: '敲一下門，用動量詞「下」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」是物量詞，不配「敲」。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」多用在書。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿鏡子',
          speak: '一面鏡子',
          hint: '平坦可照的東西常用哪一個量詞？',
          hints: ['平坦可照的東西常用哪一個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '面',
              correct: true,
              hint: '鏡子常用「面」。'
            },
            {
              text: '張',
              correct: false,
              hint: '鏡子較常用「面」，少用「張」。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」是動量詞，不用來數鏡子。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿石頭',
          speak: '一塊石頭',
          hint: '固體一塊一塊的東西常用哪個量詞？',
          hints: ['固體一塊一塊的東西常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '塊',
              correct: true,
              hint: '石頭常用「塊」。'
            },
            {
              text: '片',
              correct: false,
              hint: '「片」多用在薄片，石頭多用「塊」。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」是動量詞，不用來數石頭。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿手套',
          speak: '一雙手套',
          hint: '成對的手套常用哪個量詞？',
          hints: ['成對的手套常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '雙',
              correct: true,
              hint: '這裏應用「雙」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿草',
          speak: '一棵草',
          hint: '植物常用哪個量詞？',
          hints: ['植物常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '棵',
              correct: true,
              hint: '這裏應用「棵」。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」不適合這裏。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿路',
          speak: '一條路',
          hint: '道路常用哪個量詞？',
          hints: ['道路常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '條',
              correct: true,
              hint: '這裏應用「條」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            },
            {
              text: '頭',
              correct: false,
              hint: '「頭」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。拍了手一＿',
          speak: '拍了手一下',
          hint: '拍一下手，用量詞「下」。',
          hints: ['拍一下手，用量詞「下」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '下',
              correct: true,
              hint: '這裏應用「下」。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」不適合這裏。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿鼓',
          speak: '一面鼓',
          hint: '鼓常用哪個量詞？',
          hints: ['鼓常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '面',
              correct: true,
              hint: '這裏應用「面」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿肥皂',
          speak: '一塊肥皂',
          hint: '肥皂常用哪個量詞？',
          hints: ['肥皂常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '塊',
              correct: true,
              hint: '這裏應用「塊」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿襪子',
          speak: '一雙襪子',
          hint: '成對的襪子常用哪個量詞？',
          hints: ['成對的襪子常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '雙',
              correct: true,
              hint: '這裏應用「雙」。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿竹',
          speak: '一棵竹',
          hint: '竹子常用哪個量詞？',
          hints: ['竹子常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '棵',
              correct: true,
              hint: '這裏應用「棵」。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿江',
          speak: '一條江',
          hint: '江河常用哪個量詞？',
          hints: ['江河常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '條',
              correct: true,
              hint: '這裏應用「條」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            },
            {
              text: '頭',
              correct: false,
              hint: '「頭」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。叫了人一＿',
          speak: '叫了人一聲',
          hint: '叫一聲，用量詞「聲」。',
          hints: ['叫一聲，用量詞「聲」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '聲',
              correct: true,
              hint: '這裏應用「聲」。'
            },
            {
              text: '下',
              correct: false,
              hint: '「下」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿牆',
          speak: '一面牆',
          hint: '牆壁常用哪個量詞？',
          hints: ['牆壁常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '面',
              correct: true,
              hint: '這裏應用「面」。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿糖',
          speak: '一塊糖',
          hint: '糖常用哪個量詞？',
          hints: ['糖常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '塊',
              correct: true,
              hint: '這裏應用「塊」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿筷子',
          speak: '一雙筷子',
          hint: '成對的筷子常用哪個量詞？',
          hints: ['成對的筷子常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '雙',
              correct: true,
              hint: '這裏應用「雙」。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿菜',
          speak: '一棵菜',
          hint: '蔬菜整株常用哪個量詞？',
          hints: ['蔬菜整株常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '棵',
              correct: true,
              hint: '這裏應用「棵」。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」不適合這裏。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿蛇',
          speak: '一條蛇',
          hint: '蛇常用哪個量詞？',
          hints: ['蛇常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '條',
              correct: true,
              hint: '這裏應用「條」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。看了書一＿',
          speak: '看了書一次',
          hint: '看一次，用量詞「次」。',
          hints: ['看一次，用量詞「次」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '次',
              correct: true,
              hint: '這裏應用「次」。'
            },
            {
              text: '下',
              correct: false,
              hint: '「下」不適合這裏。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」不適合這裏。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿磚',
          speak: '一塊磚',
          hint: '磚頭常用哪個量詞？',
          hints: ['磚頭常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '塊',
              correct: true,
              hint: '這裏應用「塊」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿眼睛',
          speak: '一雙眼睛',
          hint: '成對的眼睛常用哪個量詞？',
          hints: ['成對的眼睛常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '雙',
              correct: true,
              hint: '這裏應用「雙」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」不適合這裏。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿樹苗',
          speak: '一棵樹苗',
          hint: '樹苗常用哪個量詞？',
          hints: ['樹苗常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '棵',
              correct: true,
              hint: '這裏應用「棵」。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」不適合這裏。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            }
          ]
        }
      ],
      hard: [
        {
          prompt: '請選擇正確的量詞。一＿報紙（單張攤開看）',
          speak: '一張報紙',
          hint: '單張攤開的紙類常用哪個量詞？',
          hints: ['單張攤開的紙類常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '張',
              correct: true,
              hint: '單張報紙常用「張」。'
            },
            {
              text: '份',
              correct: false,
              hint: '整份訂閱或成套才多用「份」。'
            },
            {
              text: '疊',
              correct: false,
              hint: '很多張疊在一起才用「疊」。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」是動量詞，不用來數報紙。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿功課（老師派發的整套）',
          speak: '一份功課',
          hint: '成套派發的紙本常用哪個量詞？',
          hints: ['成套派發的紙本常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '份',
              correct: true,
              hint: '成套的功課常用「份」。'
            },
            {
              text: '張',
              correct: false,
              hint: '單張紙才用「張」。'
            },
            {
              text: '疊',
              correct: false,
              hint: '很多份疊起才用「疊」。'
            },
            {
              text: '下',
              correct: false,
              hint: '「下」是動量詞，不用來數功課。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿信紙（很多張疊好）',
          speak: '一疊信紙',
          hint: '很多張疊在一起常用哪個量詞？',
          hints: ['很多張疊在一起常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '疊',
              correct: true,
              hint: '疊起來的紙常用「疊」。'
            },
            {
              text: '張',
              correct: false,
              hint: '單張才用「張」。'
            },
            {
              text: '份',
              correct: false,
              hint: '成套文件多用「份」，這裏強調疊起。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」是動量詞，不用來數信紙。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。他大聲叫了一＿',
          speak: '他大聲叫了一聲',
          hint: '表示發出聲音，常用哪個動量詞？',
          hints: ['表示發出聲音，常用哪個動量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '聲',
              correct: true,
              hint: '叫一聲，用動量詞「聲」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」是物量詞，不配「叫」。'
            },
            {
              text: '本',
              correct: false,
              hint: '「本」多用在書。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」多用在花。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。媽媽去了一＿市場',
          speak: '媽媽去了一趟市場',
          hint: '表示走一回，常用哪個動量詞？',
          hints: ['表示走一回，常用哪個動量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '趟',
              correct: true,
              hint: '去一趟，用動量詞「趟」。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」是物量詞，不配「去」。'
            },
            {
              text: '隻',
              correct: false,
              hint: '「隻」多用在動物。'
            },
            {
              text: '面',
              correct: false,
              hint: '「面」多用在鏡子、旗子。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿花（綁成一捆送人）',
          speak: '一束花',
          hint: '許多花扎在一起常用哪個量詞？',
          hints: ['許多花扎在一起常用哪個量詞？'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '束',
              correct: true,
              hint: '扎成一捆的花常用「束」。'
            },
            {
              text: '朵',
              correct: false,
              hint: '單朵花才用「朵」。'
            },
            {
              text: '棵',
              correct: false,
              hint: '「棵」多用在整株植物。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」是動量詞，不用來數花。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」很常用，但這裡有更合適的量詞。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿照片（單張沖洗出來）',
          speak: '一張照片',
          hint: '單張照片常用「張」。',
          hints: ['單張照片常用「張」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '張',
              correct: true,
              hint: '這裏應用「張」。'
            },
            {
              text: '份',
              correct: false,
              hint: '「份」不適合這裏。'
            },
            {
              text: '疊',
              correct: false,
              hint: '「疊」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿講義（整套派發）',
          speak: '一份講義',
          hint: '整套講義常用「份」。',
          hints: ['整套講義常用「份」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '份',
              correct: true,
              hint: '這裏應用「份」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '疊',
              correct: false,
              hint: '「疊」不適合這裏。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」不適合這裏。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿紙牌（很多張疊好）',
          speak: '一疊紙牌',
          hint: '很多張疊好常用「疊」。',
          hints: ['很多張疊好常用「疊」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '疊',
              correct: true,
              hint: '這裏應用「疊」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '份',
              correct: false,
              hint: '「份」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '面',
              correct: false,
              hint: '「面」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。他歎了一＿',
          speak: '他歎了一聲',
          hint: '歎一口氣／一聲。',
          hints: ['歎一口氣／一聲。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '聲',
              correct: true,
              hint: '這裏應用「聲」。'
            },
            {
              text: '下',
              correct: false,
              hint: '「下」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」不適合這裏。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。姐姐回了一＿外婆家',
          speak: '姐姐回了一趟外婆家',
          hint: '回一趟，用動量詞「趟」。',
          hints: ['回一趟，用動量詞「趟」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '趟',
              correct: true,
              hint: '這裏應用「趟」。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」不適合這裏。'
            },
            {
              text: '下',
              correct: false,
              hint: '「下」不適合這裏。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿花（綁成一扎）',
          speak: '一束花',
          hint: '扎成一捆的花常用「束」。',
          hints: ['扎成一捆的花常用「束」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '束',
              correct: true,
              hint: '這裏應用「束」。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」不適合這裏。'
            },
            {
              text: '棵',
              correct: false,
              hint: '「棵」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿報紙（整份訂閱）',
          speak: '一份報紙',
          hint: '整份報紙常用「份」。',
          hints: ['整份報紙常用「份」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '份',
              correct: true,
              hint: '這裏應用「份」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '疊',
              correct: false,
              hint: '「疊」不適合這裏。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」不適合這裏。'
            },
            {
              text: '面',
              correct: false,
              hint: '「面」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿信箋（單張）',
          speak: '一張信箋',
          hint: '單張信箋常用「張」。',
          hints: ['單張信箋常用「張」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '張',
              correct: true,
              hint: '這裏應用「張」。'
            },
            {
              text: '份',
              correct: false,
              hint: '「份」不適合這裏。'
            },
            {
              text: '疊',
              correct: false,
              hint: '「疊」不適合這裏。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」不適合這裏。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿作業紙（很多張疊好）',
          speak: '一疊作業紙',
          hint: '很多張疊好常用「疊」。',
          hints: ['很多張疊好常用「疊」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '疊',
              correct: true,
              hint: '這裏應用「疊」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '份',
              correct: false,
              hint: '「份」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '面',
              correct: false,
              hint: '「面」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。門響了一＿',
          speak: '門響了一聲',
          hint: '門響一聲。',
          hints: ['門響一聲。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '聲',
              correct: true,
              hint: '這裏應用「聲」。'
            },
            {
              text: '下',
              correct: false,
              hint: '「下」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」不適合這裏。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。我們去了一＿郊外',
          speak: '我們去了一趟郊外',
          hint: '去一趟，用動量詞「趟」。',
          hints: ['去一趟，用動量詞「趟」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '趟',
              correct: true,
              hint: '這裏應用「趟」。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」不適合這裏。'
            },
            {
              text: '下',
              correct: false,
              hint: '「下」不適合這裏。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿青菜（扎成一把）',
          speak: '一束青菜',
          hint: '扎成一把的菜常用「束」。',
          hints: ['扎成一把的菜常用「束」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '束',
              correct: true,
              hint: '這裏應用「束」。'
            },
            {
              text: '棵',
              correct: false,
              hint: '「棵」不適合這裏。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿考卷（老師派發的整套）',
          speak: '一份考卷',
          hint: '整套考卷常用「份」。',
          hints: ['整套考卷常用「份」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '份',
              correct: true,
              hint: '這裏應用「份」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '疊',
              correct: false,
              hint: '「疊」不適合這裏。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」不適合這裏。'
            },
            {
              text: '面',
              correct: false,
              hint: '「面」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿海報（貼在牆上的單張）',
          speak: '一張海報',
          hint: '單張海報常用「張」。',
          hints: ['單張海報常用「張」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '張',
              correct: true,
              hint: '這裏應用「張」。'
            },
            {
              text: '份',
              correct: false,
              hint: '「份」不適合這裏。'
            },
            {
              text: '疊',
              correct: false,
              hint: '「疊」不適合這裏。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」不適合這裏。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿明信片（很多張疊好）',
          speak: '一疊明信片',
          hint: '很多張疊好常用「疊」。',
          hints: ['很多張疊好常用「疊」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '疊',
              correct: true,
              hint: '這裏應用「疊」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '份',
              correct: false,
              hint: '「份」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '面',
              correct: false,
              hint: '「面」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。寶寶哭了一＿',
          speak: '寶寶哭了一聲',
          hint: '哭一聲。',
          hints: ['哭一聲。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '聲',
              correct: true,
              hint: '這裏應用「聲」。'
            },
            {
              text: '下',
              correct: false,
              hint: '「下」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」不適合這裏。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。媽媽跑了一＿郵局',
          speak: '媽媽跑了一趟郵局',
          hint: '跑一趟，用動量詞「趟」。',
          hints: ['跑一趟，用動量詞「趟」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '趟',
              correct: true,
              hint: '這裏應用「趟」。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」不適合這裏。'
            },
            {
              text: '下',
              correct: false,
              hint: '「下」不適合這裏。'
            },
            {
              text: '條',
              correct: false,
              hint: '「條」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿稻穗（收割綁好）',
          speak: '一束稻穗',
          hint: '綁好的稻穗常用「束」。',
          hints: ['綁好的稻穗常用「束」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '束',
              correct: true,
              hint: '這裏應用「束」。'
            },
            {
              text: '棵',
              correct: false,
              hint: '「棵」不適合這裏。'
            },
            {
              text: '朵',
              correct: false,
              hint: '「朵」不適合這裏。'
            },
            {
              text: '次',
              correct: false,
              hint: '「次」不適合這裏。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿問卷（整套填寫）',
          speak: '一份問卷',
          hint: '整套問卷常用「份」。',
          hints: ['整套問卷常用「份」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '份',
              correct: true,
              hint: '這裏應用「份」。'
            },
            {
              text: '張',
              correct: false,
              hint: '「張」不適合這裏。'
            },
            {
              text: '疊',
              correct: false,
              hint: '「疊」不適合這裏。'
            },
            {
              text: '聲',
              correct: false,
              hint: '「聲」不適合這裏。'
            },
            {
              text: '面',
              correct: false,
              hint: '「面」不適合這裏。'
            }
          ]
        },
        {
          prompt: '請選擇正確的量詞。一＿畫紙（單張使用）',
          speak: '一張畫紙',
          hint: '單張畫紙常用「張」。',
          hints: ['單張畫紙常用「張」。'],
          explainCorrect: '量詞選用正確。',
          explainWrong: '這個量詞不適合，請再試。',
          choices: [
            {
              text: '張',
              correct: true,
              hint: '這裏應用「張」。'
            },
            {
              text: '份',
              correct: false,
              hint: '「份」不適合這裏。'
            },
            {
              text: '疊',
              correct: false,
              hint: '「疊」不適合這裏。'
            },
            {
              text: '趟',
              correct: false,
              hint: '「趟」不適合這裏。'
            },
            {
              text: '個',
              correct: false,
              hint: '「個」不適合這裏。'
            }
          ]
        }
      ]
    }
  },
  L5_picture_sentence: {
    id: 'L5_picture_sentence',
    spot: 'orchard',
    name: '看圖造句',
    verb: 'drag',
    npc: '農夫',
    voice: 'farmer',
    goal: '請看圖，選出有用的字詞，組成一句通順的話',
    itemsByDiff: {
      easy: [
        {
          id: "l5e01",
          pic: "art/story/pic_story_01.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","同學們","在學校門口整齊排隊","。"],
          distractors: ["夜晚","在家","睡覺","果園"],
          answers: [
            ["早上","，","同學們","在學校門口整齊排隊","。"]
          ],
          speak: "早上，同學們在學校門口整齊排隊。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（學校門口／同學們）。","不要選禁配詞：夜晚、在家。"],
          explainCorrect: "句子通順、標點正確，符合圖中「校園排隊」。",
          explainWrong: "勿選禁配（夜晚、在家、睡覺等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e02",
          pic: "art/story/pic_story_02.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","小明","在課室裏認真看書","。"],
          distractors: ["夜晚","操場","踢足球","睡覺"],
          answers: [
            ["今天","，","小明","在課室裏認真看書","。"]
          ],
          speak: "今天，小明在課室裏認真看書。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（課室／小明）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「課室看書」。",
          explainWrong: "勿選禁配（夜晚、操場、踢足球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e03",
          pic: "art/story/pic_story_03.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","媽媽","替我準備晚飯","。"],
          distractors: ["早上","太陽高掛","回校","公園"],
          answers: [
            ["晚上","，","媽媽","替我準備晚飯","。"]
          ],
          speak: "晚上，媽媽替我準備晚飯。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（家裏／媽媽）。","不要選禁配詞：早上、太陽高掛。"],
          explainCorrect: "句子通順、標點正確，符合圖中「家庭晚飯」。",
          explainWrong: "勿選禁配（早上、太陽高掛、回校等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e04",
          pic: "art/story/pic_story_04.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["白天","，","爸爸","在家裏陪我做功課","。"],
          distractors: ["夜晚","操場","吃飯","踢球"],
          answers: [
            ["白天","，","爸爸","在家裏陪我做功課","。"]
          ],
          speak: "白天，爸爸在家裏陪我做功課。",
          hints: ["時間是「白天」，後面要有「，」。","地點與人物要合圖（家裏／爸爸）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「家庭功課」。",
          explainWrong: "勿選禁配（夜晚、操場、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e05",
          pic: "art/story/pic_story_05.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["小息時","，","兩位同學","在操場分享零食","。"],
          distractors: ["夜晚","飯廳","考試","上數學課"],
          answers: [
            ["小息時","，","兩位同學","在操場分享零食","。"]
          ],
          speak: "小息時，兩位同學在操場分享零食。",
          hints: ["時間是「小息時」，後面要有「，」。","地點與人物要合圖（操場／兩位同學）。","不要選禁配詞：夜晚、飯廳。"],
          explainCorrect: "句子通順、標點正確，符合圖中「校園小息」。",
          explainWrong: "勿選禁配（夜晚、飯廳、考試等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e06",
          pic: "art/story/pic_story_06.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我和爺爺奶奶","在公園散步","。"],
          distractors: ["夜晚","學校排隊","下雨","果園"],
          answers: [
            ["星期天","，","我和爺爺奶奶","在公園散步","。"]
          ],
          speak: "星期天，我和爺爺奶奶在公園散步。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（公園／我和爺爺奶奶）。","不要選禁配詞：夜晚、學校排隊。"],
          explainCorrect: "句子通順、標點正確，符合圖中「家庭散步」。",
          explainWrong: "勿選禁配（夜晚、學校排隊、下雨等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e07",
          pic: "art/story/pic_story_07.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下雨天","，","小明","撐着雨傘走進學校","。"],
          distractors: ["晴天","夜晚","放學","公園"],
          answers: [
            ["下雨天","，","小明","撐着雨傘走進學校","。"]
          ],
          speak: "下雨天，小明撐着雨傘走進學校。",
          hints: ["時間是「下雨天」，後面要有「，」。","地點與人物要合圖（學校／小明）。","不要選禁配詞：晴天、夜晚。"],
          explainCorrect: "句子通順、標點正確，符合圖中「雨天上學」。",
          explainWrong: "勿選禁配（晴天、夜晚、放學等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e08",
          pic: "art/story/pic_story_08.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","小美","在圖書館挑選圖書","。"],
          distractors: ["夜晚","操場","刷牙","踢球"],
          answers: [
            ["今天","，","小美","在圖書館挑選圖書","。"]
          ],
          speak: "今天，小美在圖書館挑選圖書。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（圖書館／小美）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「圖書館借書」。",
          explainWrong: "勿選禁配（夜晚、操場、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e09",
          pic: "art/story/pic_story_09.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","我","在浴室裏刷牙","。"],
          distractors: ["夜晚臨睡","學校","吃飯","睡覺"],
          answers: [
            ["早上","，","我","在浴室裏刷牙","。"]
          ],
          speak: "早上，我在浴室裏刷牙。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（浴室／我）。","不要選禁配詞：夜晚臨睡、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「早上刷牙」。",
          explainWrong: "勿選禁配（夜晚臨睡、學校、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e10",
          pic: "art/story/pic_story_10.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["體育課時","，","同學們","在操場上拍球","。"],
          distractors: ["夜晚","圖書館","看電視","睡覺"],
          answers: [
            ["體育課時","，","同學們","在操場上拍球","。"]
          ],
          speak: "體育課時，同學們在操場上拍球。",
          hints: ["時間是「體育課時」，後面要有「，」。","地點與人物要合圖（操場／同學們）。","不要選禁配詞：夜晚、圖書館。"],
          explainCorrect: "句子通順、標點正確，符合圖中「體育課」。",
          explainWrong: "勿選禁配（夜晚、圖書館、看電視等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e11",
          pic: "art/story/pic_story_11.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","媽媽和我","在客廳看電視","。"],
          distractors: ["早上","學校","做功課","太陽"],
          answers: [
            ["晚上","，","媽媽和我","在客廳看電視","。"]
          ],
          speak: "晚上，媽媽和我在客廳看電視。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（客廳／媽媽和我）。","不要選禁配詞：早上、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「晚上看電視」。",
          explainWrong: "勿選禁配（早上、學校、做功課等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e12",
          pic: "art/story/pic_story_12.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","媽媽替我準備早餐","，","我收拾書包","。"],
          distractors: ["夜晚","操場","撐傘回校","下雨"],
          answers: [
            ["早上","，","媽媽替我準備早餐","，","我收拾書包","。"]
          ],
          speak: "早上，媽媽替我準備早餐，我收拾書包。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（廚房／媽媽）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「早上出門前」。",
          explainWrong: "勿選禁配（夜晚、操場、撐傘回校等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e13",
          pic: "art/story/pic_story_13.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小明","在陽台給花兒澆水","。"],
          distractors: ["夜晚","課室","吃飯","學校"],
          answers: [
            ["早上","，","小明","在陽台給花兒澆水","。"]
          ],
          speak: "早上，小明在陽台給花兒澆水。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（陽台／小明）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「陽台澆花」。",
          explainWrong: "勿選禁配（夜晚、課室、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e14",
          pic: "art/story/pic_story_14.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["吃飯前","，","小明","在洗手盆洗手","。"],
          distractors: ["夜晚","操場","睡覺","踢球"],
          answers: [
            ["吃飯前","，","小明","在洗手盆洗手","。"]
          ],
          speak: "吃飯前，小明在洗手盆洗手。",
          hints: ["時間是「吃飯前」，後面要有「，」。","地點與人物要合圖（洗手盆／小明）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「飯前洗手」。",
          explainWrong: "勿選禁配（夜晚、操場、睡覺等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e15",
          pic: "art/story/pic_story_15.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","爸爸","牽着我的手橫過馬路","。"],
          distractors: ["夜晚","公園","游泳","睡覺"],
          answers: [
            ["早上","，","爸爸","牽着我的手橫過馬路","。"]
          ],
          speak: "早上，爸爸牽着我的手橫過馬路。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（馬路／爸爸）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「過馬路」。",
          explainWrong: "勿選禁配（夜晚、公園、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e16",
          pic: "art/story/pic_story_16.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","媽媽","帶我到市場買水果","。"],
          distractors: ["夜晚","課室","刷牙","考試"],
          answers: [
            ["星期天","，","媽媽","帶我到市場買水果","。"]
          ],
          speak: "星期天，媽媽帶我到市場買水果。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（市場／媽媽）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「市場買水果」。",
          explainWrong: "勿選禁配（夜晚、課室、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e17",
          pic: "art/story/pic_story_17.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["上課時","，","同學","在黑板上寫字","。"],
          distractors: ["夜晚","公園","吃飯","睡覺"],
          answers: [
            ["上課時","，","同學","在黑板上寫字","。"]
          ],
          speak: "上課時，同學在黑板上寫字。",
          hints: ["時間是「上課時」，後面要有「，」。","地點與人物要合圖（課室／同學）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「黑板寫字」。",
          explainWrong: "勿選禁配（夜晚、公園、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e18",
          pic: "art/story/pic_story_18.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["音樂課時","，","同學們","跟着老師開心唱歌","。"],
          distractors: ["夜晚","廚房","睡覺","煮飯"],
          answers: [
            ["音樂課時","，","同學們","跟着老師開心唱歌","。"]
          ],
          speak: "音樂課時，同學們跟着老師開心唱歌。",
          hints: ["時間是「音樂課時」，後面要有「，」。","地點與人物要合圖（音樂室／同學們）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「音樂課唱歌」。",
          explainWrong: "勿選禁配（夜晚、廚房、睡覺等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e19",
          pic: "art/story/pic_story_19.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["美術課時","，","小美","正在畫畫","。"],
          distractors: ["夜晚","操場","買菜","睡覺"],
          answers: [
            ["美術課時","，","小美","正在畫畫","。"]
          ],
          speak: "美術課時，小美正在畫畫。",
          hints: ["時間是「美術課時」，後面要有「，」。","地點與人物要合圖（美術室／小美）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「美術課畫畫」。",
          explainWrong: "勿選禁配（夜晚、操場、買菜等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e20",
          pic: "art/story/pic_story_20.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","小明","在客廳裏餵小貓吃東西","。"],
          distractors: ["夜晚","學校","排隊","考試"],
          answers: [
            ["下午","，","小明","在客廳裏餵小貓吃東西","。"]
          ],
          speak: "下午，小明在客廳裏餵小貓吃東西。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（客廳／小明）。","不要選禁配詞：夜晚、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「餵寵物」。",
          explainWrong: "勿選禁配（夜晚、學校、排隊等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e21",
          pic: "art/story/pic_story_21.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","奶奶和小妹妹","在客廳裏摺衣服","。"],
          distractors: ["夜晚","操場","游泳","踢球"],
          answers: [
            ["下午","，","奶奶和小妹妹","在客廳裏摺衣服","。"]
          ],
          speak: "下午，奶奶和小妹妹在客廳裏摺衣服。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（客廳／奶奶和小妹妹）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「摺衣服」。",
          explainWrong: "勿選禁配（夜晚、操場、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e22",
          pic: "art/story/pic_story_22.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","一家人","為小明慶祝生日","。"],
          distractors: ["早上","學校","下雨上學","考試"],
          answers: [
            ["晚上","，","一家人","為小明慶祝生日","。"]
          ],
          speak: "晚上，一家人為小明慶祝生日。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（客廳／一家人）。","不要選禁配詞：早上、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「生日吹蠟燭」。",
          explainWrong: "勿選禁配（早上、學校、下雨上學等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e23",
          pic: "art/story/pic_story_23.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","同學們","在路邊排隊上校車","。"],
          distractors: ["夜晚","客廳","看電視","睡覺"],
          answers: [
            ["早上","，","同學們","在路邊排隊上校車","。"]
          ],
          speak: "早上，同學們在路邊排隊上校車。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（路邊／同學們）。","不要選禁配詞：夜晚、客廳。"],
          explainCorrect: "句子通順、標點正確，符合圖中「上校車」。",
          explainWrong: "勿選禁配（夜晚、客廳、看電視等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e24",
          pic: "art/story/pic_story_24.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小明","背着書包去上學","。"],
          distractors: ["夜晚","博物館","吃蛋糕","睡覺"],
          answers: [
            ["早上","，","小明","背着書包去上學","。"]
          ],
          speak: "早上，小明背着書包去上學。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（家門／小明）。","不要選禁配詞：夜晚、博物館。"],
          explainCorrect: "句子通順、標點正確，符合圖中「上學揮手」。",
          explainWrong: "勿選禁配（夜晚、博物館、吃蛋糕等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e25",
          pic: "art/story/pic_story_25.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["假日","，","爺爺","在客廳裏看報紙","。"],
          distractors: ["夜晚","操場","踢足球","睡覺"],
          answers: [
            ["假日","，","爺爺","在客廳裏看報紙","。"]
          ],
          speak: "假日，爺爺在客廳裏看報紙。",
          hints: ["時間是「假日」，後面要有「，」。","地點與人物要合圖（客廳／爺爺）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「看報紙」。",
          explainWrong: "勿選禁配（夜晚、操場、踢足球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e26",
          pic: "art/story/pic_story_26.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","老師和同學們","在菜園裏給蔬菜澆水","。"],
          distractors: ["夜晚","浴室","刷牙","睡覺"],
          answers: [
            ["早上","，","老師和同學們","在菜園裏給蔬菜澆水","。"]
          ],
          speak: "早上，老師和同學們在菜園裏給蔬菜澆水。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（菜園／老師和同學們）。","不要選禁配詞：夜晚、浴室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「校園菜園澆水」。",
          explainWrong: "勿選禁配（夜晚、浴室、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e27",
          pic: "art/story/pic_story_27.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["中午","，","同學們","在食堂裏吃午餐","。"],
          distractors: ["夜晚","公園","放風箏","睡覺"],
          answers: [
            ["中午","，","同學們","在食堂裏吃午餐","。"]
          ],
          speak: "中午，同學們在食堂裏吃午餐。",
          hints: ["時間是「中午」，後面要有「，」。","地點與人物要合圖（食堂／同學們）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「食堂午膳」。",
          explainWrong: "勿選禁配（夜晚、公園、放風箏等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e28",
          pic: "art/story/pic_story_28.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","媽媽和我","一起準備午餐","。"],
          distractors: ["夜晚","圖書館","唱歌","睡覺"],
          answers: [
            ["早上","，","媽媽和我","一起準備午餐","。"]
          ],
          speak: "早上，媽媽和我一起準備午餐。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（廚房／媽媽和我）。","不要選禁配詞：夜晚、圖書館。"],
          explainCorrect: "句子通順、標點正確，符合圖中「準備飯盒」。",
          explainWrong: "勿選禁配（夜晚、圖書館、唱歌等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e29",
          pic: "art/story/pic_story_29.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","媽媽","帶我到診所看醫生","。"],
          distractors: ["夜晚","操場","踢球","睡覺"],
          answers: [
            ["今天","，","媽媽","帶我到診所看醫生","。"]
          ],
          speak: "今天，媽媽帶我到診所看醫生。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（診所／媽媽和我）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「看醫生」。",
          explainWrong: "勿選禁配（夜晚、操場、踢球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e30",
          pic: "art/story/pic_story_30.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","爸爸","陪我在家裏下棋","。"],
          distractors: ["夜晚","食堂","吃飯","睡覺"],
          answers: [
            ["下午","，","爸爸","陪我在家裏下棋","。"]
          ],
          speak: "下午，爸爸陪我在家裏下棋。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（家裏／爸爸）。","不要選禁配詞：夜晚、食堂。"],
          explainCorrect: "句子通順、標點正確，符合圖中「下棋」。",
          explainWrong: "勿選禁配（夜晚、食堂、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e31",
          pic: "art/story/pic_story_31.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["小息後","，","同學們","在課室裏清潔","。"],
          distractors: ["夜晚","公園","放風箏","睡覺"],
          answers: [
            ["小息後","，","同學們","在課室裏清潔","。"]
          ],
          speak: "小息後，同學們在課室裏清潔。",
          hints: ["時間是「小息後」，後面要有「，」。","地點與人物要合圖（課室／同學們）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「清潔課室」。",
          explainWrong: "勿選禁配（夜晚、公園、放風箏等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e32",
          pic: "art/story/pic_story_32.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","同學們","參加升旗禮","。"],
          distractors: ["夜晚","廚房","煮飯","睡覺"],
          answers: [
            ["早上","，","同學們","參加升旗禮","。"]
          ],
          speak: "早上，同學們參加升旗禮。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（操場／同學們）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「升旗禮」。",
          explainWrong: "勿選禁配（夜晚、廚房、煮飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e33",
          pic: "art/story/pic_story_33.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["體育課時","，","同學們","在泳池游泳","。"],
          distractors: ["夜晚","課室","寫字","睡覺"],
          answers: [
            ["體育課時","，","同學們","在泳池游泳","。"]
          ],
          speak: "體育課時，同學們在泳池游泳。",
          hints: ["時間是「體育課時」，後面要有「，」。","地點與人物要合圖（泳池／同學們）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「游泳課」。",
          explainWrong: "勿選禁配（夜晚、課室、寫字等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e34",
          pic: "art/story/pic_story_34.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我","在陽台替花盆播種","。"],
          distractors: ["夜晚","操場","跑步","睡覺"],
          answers: [
            ["星期天","，","我","在陽台替花盆播種","。"]
          ],
          speak: "星期天，我在陽台替花盆播種。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（陽台／我）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「盆栽播種」。",
          explainWrong: "勿選禁配（夜晚、操場、跑步等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e35",
          pic: "art/story/pic_story_35.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","我和爺爺奶奶","視像通話","。"],
          distractors: ["早上","街市","買水果","太陽"],
          answers: [
            ["晚上","，","我和爺爺奶奶","視像通話","。"]
          ],
          speak: "晚上，我和爺爺奶奶視像通話。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（家裏／我和爺爺奶奶）。","不要選禁配詞：早上、街市。"],
          explainCorrect: "句子通順、標點正確，符合圖中「視像通話」。",
          explainWrong: "勿選禁配（早上、街市、買水果等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e36",
          pic: "art/story/pic_story_36.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["放學後","，","媽媽","帶我到文具店買文具","。"],
          distractors: ["夜晚","泳池","游泳","睡覺"],
          answers: [
            ["放學後","，","媽媽","帶我到文具店買文具","。"]
          ],
          speak: "放學後，媽媽帶我到文具店買文具。",
          hints: ["時間是「放學後」，後面要有「，」。","地點與人物要合圖（文具店／媽媽）。","不要選禁配詞：夜晚、泳池。"],
          explainCorrect: "句子通順、標點正確，符合圖中「買文具」。",
          explainWrong: "勿選禁配（夜晚、泳池、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e37",
          pic: "art/story/pic_story_37.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","我","在公園裏遛狗","。"],
          distractors: ["夜晚","課室","考試","睡覺"],
          answers: [
            ["早上","，","我","在公園裏遛狗","。"]
          ],
          speak: "早上，我在公園裏遛狗。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（公園／我）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「遛狗」。",
          explainWrong: "勿選禁配（夜晚、課室、考試等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e38",
          pic: "art/story/pic_story_38.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","我","幫忙提着購物袋回家","。"],
          distractors: ["夜晚","音樂室","唱歌","睡覺"],
          answers: [
            ["下午","，","我","幫忙提着購物袋回家","。"]
          ],
          speak: "下午，我幫忙提着購物袋回家。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（回家路上／我）。","不要選禁配詞：夜晚、音樂室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「提菜」。",
          explainWrong: "勿選禁配（夜晚、音樂室、唱歌等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e39",
          pic: "art/story/pic_story_39.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","我","在家裏練習彈鋼琴","。"],
          distractors: ["夜晚","操場","踢足球","睡覺"],
          answers: [
            ["下午","，","我","在家裏練習彈鋼琴","。"]
          ],
          speak: "下午，我在家裏練習彈鋼琴。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（家裏／我）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「練琴」。",
          explainWrong: "勿選禁配（夜晚、操場、踢足球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e40",
          pic: "art/story/pic_story_40.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["科學課時","，","同學們","在做實驗","。"],
          distractors: ["夜晚","廚房","煮麵","睡覺"],
          answers: [
            ["科學課時","，","同學們","在做實驗","。"]
          ],
          speak: "科學課時，同學們在做實驗。",
          hints: ["時間是「科學課時」，後面要有「，」。","地點與人物要合圖（科學室／同學們）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「科學實驗」。",
          explainWrong: "勿選禁配（夜晚、廚房、煮麵等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e41",
          pic: "art/story/pic_story_41.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","小男孩","在家裏專心地寫日記","。"],
          distractors: ["早上","操場","踢球","太陽"],
          answers: [
            ["晚上","，","小男孩","在家裏專心地寫日記","。"]
          ],
          speak: "晚上，小男孩在家裏專心地寫日記。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（家裏／小男孩）。","不要選禁配詞：早上、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「寫日記」。",
          explainWrong: "勿選禁配（早上、操場、踢球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e42",
          pic: "art/story/pic_story_42.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我們","在公園裏放風箏","。"],
          distractors: ["夜晚","課室","寫黑板","睡覺"],
          answers: [
            ["星期天","，","我們","在公園裏放風箏","。"]
          ],
          speak: "星期天，我們在公園裏放風箏。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（公園／我們）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「放風箏」。",
          explainWrong: "勿選禁配（夜晚、課室、寫黑板等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e43",
          pic: "art/story/pic_story_43.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","老師","帶我們到博物館參觀","。"],
          distractors: ["夜晚","浴室","刷牙","睡覺"],
          answers: [
            ["今天","，","老師","帶我們到博物館參觀","。"]
          ],
          speak: "今天，老師帶我們到博物館參觀。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（博物館／老師）。","不要選禁配詞：夜晚、浴室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「參觀博物館」。",
          explainWrong: "勿選禁配（夜晚、浴室、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e44",
          pic: "art/story/pic_story_44.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小美","在廚房裏做三明治","。"],
          distractors: ["夜晚","操場","升旗","睡覺"],
          answers: [
            ["早上","，","小美","在廚房裏做三明治","。"]
          ],
          speak: "早上，小美在廚房裏做三明治。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（廚房／小美）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「做三明治」。",
          explainWrong: "勿選禁配（夜晚、操場、升旗等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e45",
          pic: "art/story/pic_story_45.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小明","在門口穿鞋準備上學","。"],
          distractors: ["夜晚","食堂","吃飯","睡覺"],
          answers: [
            ["早上","，","小明","在門口穿鞋準備上學","。"]
          ],
          speak: "早上，小明在門口穿鞋準備上學。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（門口／小明）。","不要選禁配詞：夜晚、食堂。"],
          explainCorrect: "句子通順、標點正確，符合圖中「穿校服鞋」。",
          explainWrong: "勿選禁配（夜晚、食堂、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e46",
          pic: "art/story/pic_story_46.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小美","在窗台給盆栽澆水","。"],
          distractors: ["夜晚","泳池","游泳","睡覺"],
          answers: [
            ["早上","，","小美","在窗台給盆栽澆水","。"]
          ],
          speak: "早上，小美在窗台給盆栽澆水。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（窗台／小美）。","不要選禁配詞：夜晚、泳池。"],
          explainCorrect: "句子通順、標點正確，符合圖中「窗台澆花」。",
          explainWrong: "勿選禁配（夜晚、泳池、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e47",
          pic: "art/story/pic_story_47.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["教師節","，","小明","送花給老師","。"],
          distractors: ["夜晚","廚房","洗碗","睡覺"],
          answers: [
            ["教師節","，","小明","送花給老師","。"]
          ],
          speak: "教師節，小明送花給老師。",
          hints: ["時間是「教師節」，後面要有「，」。","地點與人物要合圖（校園／小明）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「送花謝師」。",
          explainWrong: "勿選禁配（夜晚、廚房、洗碗等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e48",
          pic: "art/story/pic_story_48.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["小息時","，","同學們","在課室做垃圾分類","。"],
          distractors: ["夜晚","公園","放風箏","睡覺"],
          answers: [
            ["小息時","，","同學們","在課室做垃圾分類","。"]
          ],
          speak: "小息時，同學們在課室做垃圾分類。",
          hints: ["時間是「小息時」，後面要有「，」。","地點與人物要合圖（課室／同學們）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「垃圾分類」。",
          explainWrong: "勿選禁配（夜晚、公園、放風箏等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e49",
          pic: "art/story/pic_story_49.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我們","帶水果去探望爺爺嫲嫲","。"],
          distractors: ["夜晚","科學室","實驗","睡覺"],
          answers: [
            ["星期天","，","我們","帶水果去探望爺爺嫲嫲","。"]
          ],
          speak: "星期天，我們帶水果去探望爺爺嫲嫲。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（祖父母家／我們）。","不要選禁配詞：夜晚、科學室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「探訪祖父母」。",
          explainWrong: "勿選禁配（夜晚、科學室、實驗等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5e50",
          pic: "art/story/pic_story_50.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","媽媽","帶我到書店挑選故事書","。"],
          distractors: ["夜晚","操場","跑接力","睡覺"],
          answers: [
            ["今天","，","媽媽","帶我到書店挑選故事書","。"]
          ],
          speak: "今天，媽媽帶我到書店挑選故事書。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（書店／媽媽）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「書店選書」。",
          explainWrong: "勿選禁配（夜晚、操場、跑接力等）；須合圖且時間詞後有「，」。"
        }
      ],
      medium: [
        {
          id: "l5m01",
          pic: "art/story/pic_story_01.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","同學們","在學校門口","整齊排隊","。"],
          distractors: ["夜晚","在家","睡覺","果園","！"],
          answers: [
            ["早上","，","同學們","在學校門口","整齊排隊","。"]
          ],
          speak: "早上，同學們在學校門口整齊排隊。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（學校門口／同學們）。","不要選禁配詞：夜晚、在家。"],
          explainCorrect: "句子通順、標點正確，符合圖中「校園排隊」。",
          explainWrong: "勿選禁配（夜晚、在家、睡覺等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m02",
          pic: "art/story/pic_story_02.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","小明","在課室裏","認真看書","。"],
          distractors: ["夜晚","操場","踢足球","睡覺","！"],
          answers: [
            ["今天","，","小明","在課室裏","認真看書","。"]
          ],
          speak: "今天，小明在課室裏認真看書。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（課室／小明）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「課室看書」。",
          explainWrong: "勿選禁配（夜晚、操場、踢足球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m03",
          pic: "art/story/pic_story_03.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","媽媽","替我","準備晚飯","。"],
          distractors: ["早上","太陽高掛","回校","公園","！"],
          answers: [
            ["晚上","，","媽媽","替我","準備晚飯","。"]
          ],
          speak: "晚上，媽媽替我準備晚飯。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（家裏／媽媽）。","不要選禁配詞：早上、太陽高掛。"],
          explainCorrect: "句子通順、標點正確，符合圖中「家庭晚飯」。",
          explainWrong: "勿選禁配（早上、太陽高掛、回校等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m04",
          pic: "art/story/pic_story_04.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["白天","，","爸爸","在家裏","陪我做功課","。"],
          distractors: ["夜晚","操場","吃飯","踢球","！"],
          answers: [
            ["白天","，","爸爸","在家裏","陪我做功課","。"]
          ],
          speak: "白天，爸爸在家裏陪我做功課。",
          hints: ["時間是「白天」，後面要有「，」。","地點與人物要合圖（家裏／爸爸）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「家庭功課」。",
          explainWrong: "勿選禁配（夜晚、操場、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m05",
          pic: "art/story/pic_story_05.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["小息時","，","兩位同學","在操場","分享零食","。"],
          distractors: ["夜晚","飯廳","考試","上數學課","！"],
          answers: [
            ["小息時","，","兩位同學","在操場","分享零食","。"]
          ],
          speak: "小息時，兩位同學在操場分享零食。",
          hints: ["時間是「小息時」，後面要有「，」。","地點與人物要合圖（操場／兩位同學）。","不要選禁配詞：夜晚、飯廳。"],
          explainCorrect: "句子通順、標點正確，符合圖中「校園小息」。",
          explainWrong: "勿選禁配（夜晚、飯廳、考試等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m06",
          pic: "art/story/pic_story_06.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我","和爺爺奶奶","在公園散步","。"],
          distractors: ["夜晚","學校排隊","下雨","果園","！"],
          answers: [
            ["星期天","，","我","和爺爺奶奶","在公園散步","。"]
          ],
          speak: "星期天，我和爺爺奶奶在公園散步。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（公園／我和爺爺奶奶）。","不要選禁配詞：夜晚、學校排隊。"],
          explainCorrect: "句子通順、標點正確，符合圖中「家庭散步」。",
          explainWrong: "勿選禁配（夜晚、學校排隊、下雨等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m07",
          pic: "art/story/pic_story_07.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下雨天","，","小明","撐着雨傘","走進學校","。"],
          distractors: ["晴天","夜晚","放學","公園","！"],
          answers: [
            ["下雨天","，","小明","撐着雨傘","走進學校","。"]
          ],
          speak: "下雨天，小明撐着雨傘走進學校。",
          hints: ["時間是「下雨天」，後面要有「，」。","地點與人物要合圖（學校／小明）。","不要選禁配詞：晴天、夜晚。"],
          explainCorrect: "句子通順、標點正確，符合圖中「雨天上學」。",
          explainWrong: "勿選禁配（晴天、夜晚、放學等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m08",
          pic: "art/story/pic_story_08.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","小美","在圖書館","挑選圖書","。"],
          distractors: ["夜晚","操場","刷牙","踢球","！"],
          answers: [
            ["今天","，","小美","在圖書館","挑選圖書","。"]
          ],
          speak: "今天，小美在圖書館挑選圖書。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（圖書館／小美）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「圖書館借書」。",
          explainWrong: "勿選禁配（夜晚、操場、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m09",
          pic: "art/story/pic_story_09.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","我","在浴室裏","刷牙","。"],
          distractors: ["夜晚臨睡","學校","吃飯","睡覺","！"],
          answers: [
            ["早上","，","我","在浴室裏","刷牙","。"]
          ],
          speak: "早上，我在浴室裏刷牙。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（浴室／我）。","不要選禁配詞：夜晚臨睡、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「早上刷牙」。",
          explainWrong: "勿選禁配（夜晚臨睡、學校、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m10",
          pic: "art/story/pic_story_10.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["體育課時","，","同學們","在操場上","拍球","。"],
          distractors: ["夜晚","圖書館","看電視","睡覺","！"],
          answers: [
            ["體育課時","，","同學們","在操場上","拍球","。"]
          ],
          speak: "體育課時，同學們在操場上拍球。",
          hints: ["時間是「體育課時」，後面要有「，」。","地點與人物要合圖（操場／同學們）。","不要選禁配詞：夜晚、圖書館。"],
          explainCorrect: "句子通順、標點正確，符合圖中「體育課」。",
          explainWrong: "勿選禁配（夜晚、圖書館、看電視等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m11",
          pic: "art/story/pic_story_11.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","媽媽和我","在客廳","看電視","。"],
          distractors: ["早上","學校","做功課","太陽","！"],
          answers: [
            ["晚上","，","媽媽和我","在客廳","看電視","。"]
          ],
          speak: "晚上，媽媽和我在客廳看電視。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（客廳／媽媽和我）。","不要選禁配詞：早上、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「晚上看電視」。",
          explainWrong: "勿選禁配（早上、學校、做功課等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m12",
          pic: "art/story/pic_story_12.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","媽媽","替我","準備早餐","，","我","收拾書包","。"],
          distractors: ["夜晚","操場","撐傘回校","下雨","！"],
          answers: [
            ["早上","，","媽媽","替我","準備早餐","，","我","收拾書包","。"]
          ],
          speak: "早上，媽媽替我準備早餐，我收拾書包。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（廚房／媽媽）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「早上出門前」。",
          explainWrong: "勿選禁配（夜晚、操場、撐傘回校等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m13",
          pic: "art/story/pic_story_13.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小明","在陽台","給花兒澆水","。"],
          distractors: ["夜晚","課室","吃飯","學校","！"],
          answers: [
            ["早上","，","小明","在陽台","給花兒澆水","。"]
          ],
          speak: "早上，小明在陽台給花兒澆水。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（陽台／小明）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「陽台澆花」。",
          explainWrong: "勿選禁配（夜晚、課室、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m14",
          pic: "art/story/pic_story_14.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["吃飯前","，","小明","在洗手盆","洗手","。"],
          distractors: ["夜晚","操場","睡覺","踢球","！"],
          answers: [
            ["吃飯前","，","小明","在洗手盆","洗手","。"]
          ],
          speak: "吃飯前，小明在洗手盆洗手。",
          hints: ["時間是「吃飯前」，後面要有「，」。","地點與人物要合圖（洗手盆／小明）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「飯前洗手」。",
          explainWrong: "勿選禁配（夜晚、操場、睡覺等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m15",
          pic: "art/story/pic_story_15.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","爸爸","牽着我的手","橫過馬路","。"],
          distractors: ["夜晚","公園","游泳","睡覺","！"],
          answers: [
            ["早上","，","爸爸","牽着我的手","橫過馬路","。"]
          ],
          speak: "早上，爸爸牽着我的手橫過馬路。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（馬路／爸爸）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「過馬路」。",
          explainWrong: "勿選禁配（夜晚、公園、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m16",
          pic: "art/story/pic_story_16.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","媽媽","帶我","到市場買水果","。"],
          distractors: ["夜晚","課室","刷牙","考試","！"],
          answers: [
            ["星期天","，","媽媽","帶我","到市場買水果","。"]
          ],
          speak: "星期天，媽媽帶我到市場買水果。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（市場／媽媽）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「市場買水果」。",
          explainWrong: "勿選禁配（夜晚、課室、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m17",
          pic: "art/story/pic_story_17.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["上課時","，","同學","在黑板上","寫字","。"],
          distractors: ["夜晚","公園","吃飯","睡覺","！"],
          answers: [
            ["上課時","，","同學","在黑板上","寫字","。"]
          ],
          speak: "上課時，同學在黑板上寫字。",
          hints: ["時間是「上課時」，後面要有「，」。","地點與人物要合圖（課室／同學）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「黑板寫字」。",
          explainWrong: "勿選禁配（夜晚、公園、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m18",
          pic: "art/story/pic_story_18.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["音樂課時","，","同學們","跟着老師","開心唱歌","。"],
          distractors: ["夜晚","廚房","睡覺","煮飯","！"],
          answers: [
            ["音樂課時","，","同學們","跟着老師","開心唱歌","。"]
          ],
          speak: "音樂課時，同學們跟着老師開心唱歌。",
          hints: ["時間是「音樂課時」，後面要有「，」。","地點與人物要合圖（音樂室／同學們）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「音樂課唱歌」。",
          explainWrong: "勿選禁配（夜晚、廚房、睡覺等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m19",
          pic: "art/story/pic_story_19.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["美術課時","，","小美","正在畫畫","。"],
          distractors: ["夜晚","操場","買菜","睡覺","！"],
          answers: [
            ["美術課時","，","小美","正在畫畫","。"]
          ],
          speak: "美術課時，小美正在畫畫。",
          hints: ["時間是「美術課時」，後面要有「，」。","地點與人物要合圖（美術室／小美）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「美術課畫畫」。",
          explainWrong: "勿選禁配（夜晚、操場、買菜等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m20",
          pic: "art/story/pic_story_20.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","小明","在客廳裏","餵小貓吃東西","。"],
          distractors: ["夜晚","學校","排隊","考試","！"],
          answers: [
            ["下午","，","小明","在客廳裏","餵小貓吃東西","。"]
          ],
          speak: "下午，小明在客廳裏餵小貓吃東西。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（客廳／小明）。","不要選禁配詞：夜晚、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「餵寵物」。",
          explainWrong: "勿選禁配（夜晚、學校、排隊等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m21",
          pic: "art/story/pic_story_21.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","奶奶和小妹妹","在客廳裏","摺衣服","。"],
          distractors: ["夜晚","操場","游泳","踢球","！"],
          answers: [
            ["下午","，","奶奶和小妹妹","在客廳裏","摺衣服","。"]
          ],
          speak: "下午，奶奶和小妹妹在客廳裏摺衣服。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（客廳／奶奶和小妹妹）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「摺衣服」。",
          explainWrong: "勿選禁配（夜晚、操場、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m22",
          pic: "art/story/pic_story_22.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","一家人","為小明","慶祝生日","。"],
          distractors: ["早上","學校","下雨上學","考試","！"],
          answers: [
            ["晚上","，","一家人","為小明","慶祝生日","。"]
          ],
          speak: "晚上，一家人為小明慶祝生日。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（客廳／一家人）。","不要選禁配詞：早上、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「生日吹蠟燭」。",
          explainWrong: "勿選禁配（早上、學校、下雨上學等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m23",
          pic: "art/story/pic_story_23.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","同學們","在路邊","排隊上校車","。"],
          distractors: ["夜晚","客廳","看電視","睡覺","！"],
          answers: [
            ["早上","，","同學們","在路邊","排隊上校車","。"]
          ],
          speak: "早上，同學們在路邊排隊上校車。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（路邊／同學們）。","不要選禁配詞：夜晚、客廳。"],
          explainCorrect: "句子通順、標點正確，符合圖中「上校車」。",
          explainWrong: "勿選禁配（夜晚、客廳、看電視等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m24",
          pic: "art/story/pic_story_24.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小明","背着書包","去上學","。"],
          distractors: ["夜晚","博物館","吃蛋糕","睡覺","！"],
          answers: [
            ["早上","，","小明","背着書包","去上學","。"]
          ],
          speak: "早上，小明背着書包去上學。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（家門／小明）。","不要選禁配詞：夜晚、博物館。"],
          explainCorrect: "句子通順、標點正確，符合圖中「上學揮手」。",
          explainWrong: "勿選禁配（夜晚、博物館、吃蛋糕等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m25",
          pic: "art/story/pic_story_25.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["假日","，","爺爺","在客廳裏","看報紙","。"],
          distractors: ["夜晚","操場","踢足球","睡覺","！"],
          answers: [
            ["假日","，","爺爺","在客廳裏","看報紙","。"]
          ],
          speak: "假日，爺爺在客廳裏看報紙。",
          hints: ["時間是「假日」，後面要有「，」。","地點與人物要合圖（客廳／爺爺）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「看報紙」。",
          explainWrong: "勿選禁配（夜晚、操場、踢足球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m26",
          pic: "art/story/pic_story_26.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","老師和同學們","在菜園裏","給蔬菜澆水","。"],
          distractors: ["夜晚","浴室","刷牙","睡覺","！"],
          answers: [
            ["早上","，","老師和同學們","在菜園裏","給蔬菜澆水","。"]
          ],
          speak: "早上，老師和同學們在菜園裏給蔬菜澆水。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（菜園／老師和同學們）。","不要選禁配詞：夜晚、浴室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「校園菜園澆水」。",
          explainWrong: "勿選禁配（夜晚、浴室、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m27",
          pic: "art/story/pic_story_27.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["中午","，","同學們","在食堂裏","吃午餐","。"],
          distractors: ["夜晚","公園","放風箏","睡覺","！"],
          answers: [
            ["中午","，","同學們","在食堂裏","吃午餐","。"]
          ],
          speak: "中午，同學們在食堂裏吃午餐。",
          hints: ["時間是「中午」，後面要有「，」。","地點與人物要合圖（食堂／同學們）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「食堂午膳」。",
          explainWrong: "勿選禁配（夜晚、公園、放風箏等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m28",
          pic: "art/story/pic_story_28.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","媽媽和我","一起","準備午餐","。"],
          distractors: ["夜晚","圖書館","唱歌","睡覺","！"],
          answers: [
            ["早上","，","媽媽和我","一起","準備午餐","。"]
          ],
          speak: "早上，媽媽和我一起準備午餐。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（廚房／媽媽和我）。","不要選禁配詞：夜晚、圖書館。"],
          explainCorrect: "句子通順、標點正確，符合圖中「準備飯盒」。",
          explainWrong: "勿選禁配（夜晚、圖書館、唱歌等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m29",
          pic: "art/story/pic_story_29.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","媽媽","帶我","到診所看醫生","。"],
          distractors: ["夜晚","操場","踢球","睡覺","！"],
          answers: [
            ["今天","，","媽媽","帶我","到診所看醫生","。"]
          ],
          speak: "今天，媽媽帶我到診所看醫生。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（診所／媽媽和我）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「看醫生」。",
          explainWrong: "勿選禁配（夜晚、操場、踢球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m30",
          pic: "art/story/pic_story_30.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","爸爸","陪我","在家裏下棋","。"],
          distractors: ["夜晚","食堂","吃飯","睡覺","！"],
          answers: [
            ["下午","，","爸爸","陪我","在家裏下棋","。"]
          ],
          speak: "下午，爸爸陪我在家裏下棋。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（家裏／爸爸）。","不要選禁配詞：夜晚、食堂。"],
          explainCorrect: "句子通順、標點正確，符合圖中「下棋」。",
          explainWrong: "勿選禁配（夜晚、食堂、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m31",
          pic: "art/story/pic_story_31.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["小息後","，","同學們","在課室裏","清潔","。"],
          distractors: ["夜晚","公園","放風箏","睡覺","！"],
          answers: [
            ["小息後","，","同學們","在課室裏","清潔","。"]
          ],
          speak: "小息後，同學們在課室裏清潔。",
          hints: ["時間是「小息後」，後面要有「，」。","地點與人物要合圖（課室／同學們）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「清潔課室」。",
          explainWrong: "勿選禁配（夜晚、公園、放風箏等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m32",
          pic: "art/story/pic_story_32.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","同學們","參加升旗禮","。"],
          distractors: ["夜晚","廚房","煮飯","睡覺","！"],
          answers: [
            ["早上","，","同學們","參加升旗禮","。"]
          ],
          speak: "早上，同學們參加升旗禮。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（操場／同學們）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「升旗禮」。",
          explainWrong: "勿選禁配（夜晚、廚房、煮飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m33",
          pic: "art/story/pic_story_33.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["體育課時","，","同學們","在泳池","游泳","。"],
          distractors: ["夜晚","課室","寫字","睡覺","！"],
          answers: [
            ["體育課時","，","同學們","在泳池","游泳","。"]
          ],
          speak: "體育課時，同學們在泳池游泳。",
          hints: ["時間是「體育課時」，後面要有「，」。","地點與人物要合圖（泳池／同學們）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「游泳課」。",
          explainWrong: "勿選禁配（夜晚、課室、寫字等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m34",
          pic: "art/story/pic_story_34.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我","在陽台","替花盆播種","。"],
          distractors: ["夜晚","操場","跑步","睡覺","！"],
          answers: [
            ["星期天","，","我","在陽台","替花盆播種","。"]
          ],
          speak: "星期天，我在陽台替花盆播種。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（陽台／我）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「盆栽播種」。",
          explainWrong: "勿選禁配（夜晚、操場、跑步等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m35",
          pic: "art/story/pic_story_35.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","我","和爺爺奶奶","視像通話","。"],
          distractors: ["早上","街市","買水果","太陽","！"],
          answers: [
            ["晚上","，","我","和爺爺奶奶","視像通話","。"]
          ],
          speak: "晚上，我和爺爺奶奶視像通話。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（家裏／我和爺爺奶奶）。","不要選禁配詞：早上、街市。"],
          explainCorrect: "句子通順、標點正確，符合圖中「視像通話」。",
          explainWrong: "勿選禁配（早上、街市、買水果等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m36",
          pic: "art/story/pic_story_36.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["放學後","，","媽媽","帶我","到文具店買文具","。"],
          distractors: ["夜晚","泳池","游泳","睡覺","！"],
          answers: [
            ["放學後","，","媽媽","帶我","到文具店買文具","。"]
          ],
          speak: "放學後，媽媽帶我到文具店買文具。",
          hints: ["時間是「放學後」，後面要有「，」。","地點與人物要合圖（文具店／媽媽）。","不要選禁配詞：夜晚、泳池。"],
          explainCorrect: "句子通順、標點正確，符合圖中「買文具」。",
          explainWrong: "勿選禁配（夜晚、泳池、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m37",
          pic: "art/story/pic_story_37.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","我","在公園裏","遛狗","。"],
          distractors: ["夜晚","課室","考試","睡覺","！"],
          answers: [
            ["早上","，","我","在公園裏","遛狗","。"]
          ],
          speak: "早上，我在公園裏遛狗。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（公園／我）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「遛狗」。",
          explainWrong: "勿選禁配（夜晚、課室、考試等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m38",
          pic: "art/story/pic_story_38.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","我","幫忙","提着購物袋回家","。"],
          distractors: ["夜晚","音樂室","唱歌","睡覺","！"],
          answers: [
            ["下午","，","我","幫忙","提着購物袋回家","。"]
          ],
          speak: "下午，我幫忙提着購物袋回家。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（回家路上／我）。","不要選禁配詞：夜晚、音樂室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「提菜」。",
          explainWrong: "勿選禁配（夜晚、音樂室、唱歌等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m39",
          pic: "art/story/pic_story_39.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","我","在家裏","練習彈鋼琴","。"],
          distractors: ["夜晚","操場","踢足球","睡覺","！"],
          answers: [
            ["下午","，","我","在家裏","練習彈鋼琴","。"]
          ],
          speak: "下午，我在家裏練習彈鋼琴。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（家裏／我）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「練琴」。",
          explainWrong: "勿選禁配（夜晚、操場、踢足球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m40",
          pic: "art/story/pic_story_40.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["科學課時","，","同學們","在做實驗","。"],
          distractors: ["夜晚","廚房","煮麵","睡覺","！"],
          answers: [
            ["科學課時","，","同學們","在做實驗","。"]
          ],
          speak: "科學課時，同學們在做實驗。",
          hints: ["時間是「科學課時」，後面要有「，」。","地點與人物要合圖（科學室／同學們）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「科學實驗」。",
          explainWrong: "勿選禁配（夜晚、廚房、煮麵等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m41",
          pic: "art/story/pic_story_41.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","小男孩","在家裏","專心地寫日記","。"],
          distractors: ["早上","操場","踢球","太陽","！"],
          answers: [
            ["晚上","，","小男孩","在家裏","專心地寫日記","。"]
          ],
          speak: "晚上，小男孩在家裏專心地寫日記。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（家裏／小男孩）。","不要選禁配詞：早上、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「寫日記」。",
          explainWrong: "勿選禁配（早上、操場、踢球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m42",
          pic: "art/story/pic_story_42.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我們","在公園裏","放風箏","。"],
          distractors: ["夜晚","課室","寫黑板","睡覺","！"],
          answers: [
            ["星期天","，","我們","在公園裏","放風箏","。"]
          ],
          speak: "星期天，我們在公園裏放風箏。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（公園／我們）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「放風箏」。",
          explainWrong: "勿選禁配（夜晚、課室、寫黑板等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m43",
          pic: "art/story/pic_story_43.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","老師","帶我們","到博物館參觀","。"],
          distractors: ["夜晚","浴室","刷牙","睡覺","！"],
          answers: [
            ["今天","，","老師","帶我們","到博物館參觀","。"]
          ],
          speak: "今天，老師帶我們到博物館參觀。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（博物館／老師）。","不要選禁配詞：夜晚、浴室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「參觀博物館」。",
          explainWrong: "勿選禁配（夜晚、浴室、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m44",
          pic: "art/story/pic_story_44.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小美","在廚房裏","做三明治","。"],
          distractors: ["夜晚","操場","升旗","睡覺","！"],
          answers: [
            ["早上","，","小美","在廚房裏","做三明治","。"]
          ],
          speak: "早上，小美在廚房裏做三明治。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（廚房／小美）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「做三明治」。",
          explainWrong: "勿選禁配（夜晚、操場、升旗等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m45",
          pic: "art/story/pic_story_45.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小明","在門口","穿鞋準備上學","。"],
          distractors: ["夜晚","食堂","吃飯","睡覺","！"],
          answers: [
            ["早上","，","小明","在門口","穿鞋準備上學","。"]
          ],
          speak: "早上，小明在門口穿鞋準備上學。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（門口／小明）。","不要選禁配詞：夜晚、食堂。"],
          explainCorrect: "句子通順、標點正確，符合圖中「穿校服鞋」。",
          explainWrong: "勿選禁配（夜晚、食堂、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m46",
          pic: "art/story/pic_story_46.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小美","在窗台","給盆栽澆水","。"],
          distractors: ["夜晚","泳池","游泳","睡覺","！"],
          answers: [
            ["早上","，","小美","在窗台","給盆栽澆水","。"]
          ],
          speak: "早上，小美在窗台給盆栽澆水。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（窗台／小美）。","不要選禁配詞：夜晚、泳池。"],
          explainCorrect: "句子通順、標點正確，符合圖中「窗台澆花」。",
          explainWrong: "勿選禁配（夜晚、泳池、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m47",
          pic: "art/story/pic_story_47.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["教師節","，","小明","送花給老師","。"],
          distractors: ["夜晚","廚房","洗碗","睡覺","！"],
          answers: [
            ["教師節","，","小明","送花給老師","。"]
          ],
          speak: "教師節，小明送花給老師。",
          hints: ["時間是「教師節」，後面要有「，」。","地點與人物要合圖（校園／小明）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「送花謝師」。",
          explainWrong: "勿選禁配（夜晚、廚房、洗碗等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m48",
          pic: "art/story/pic_story_48.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["小息時","，","同學們","在課室","做垃圾分類","。"],
          distractors: ["夜晚","公園","放風箏","睡覺","！"],
          answers: [
            ["小息時","，","同學們","在課室","做垃圾分類","。"]
          ],
          speak: "小息時，同學們在課室做垃圾分類。",
          hints: ["時間是「小息時」，後面要有「，」。","地點與人物要合圖（課室／同學們）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「垃圾分類」。",
          explainWrong: "勿選禁配（夜晚、公園、放風箏等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m49",
          pic: "art/story/pic_story_49.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我們","帶水果","去探望爺爺嫲嫲","。"],
          distractors: ["夜晚","科學室","實驗","睡覺","！"],
          answers: [
            ["星期天","，","我們","帶水果","去探望爺爺嫲嫲","。"]
          ],
          speak: "星期天，我們帶水果去探望爺爺嫲嫲。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（祖父母家／我們）。","不要選禁配詞：夜晚、科學室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「探訪祖父母」。",
          explainWrong: "勿選禁配（夜晚、科學室、實驗等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5m50",
          pic: "art/story/pic_story_50.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","媽媽","帶我","到書店挑選故事書","。"],
          distractors: ["夜晚","操場","跑接力","睡覺","！"],
          answers: [
            ["今天","，","媽媽","帶我","到書店挑選故事書","。"]
          ],
          speak: "今天，媽媽帶我到書店挑選故事書。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（書店／媽媽）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「書店選書」。",
          explainWrong: "勿選禁配（夜晚、操場、跑接力等）；須合圖且時間詞後有「，」。"
        }
      ],
      hard: [
        {
          id: "l5h01",
          pic: "art/story/pic_story_01.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","同學們","在學校門口","整齊排隊","。"],
          distractors: ["夜晚","在家","睡覺","果園","！","？","採蘋果","半夜"],
          answers: [
            ["早上","，","同學們","在學校門口","整齊排隊","。"]
          ],
          speak: "早上，同學們在學校門口整齊排隊。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（學校門口／同學們）。","不要選禁配詞：夜晚、在家。"],
          explainCorrect: "句子通順、標點正確，符合圖中「校園排隊」。",
          explainWrong: "勿選禁配（夜晚、在家、睡覺等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h02",
          pic: "art/story/pic_story_02.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","小明","在課室裏","認真看書","。"],
          distractors: ["夜晚","操場","踢足球","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["今天","，","小明","在課室裏","認真看書","。"]
          ],
          speak: "今天，小明在課室裏認真看書。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（課室／小明）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「課室看書」。",
          explainWrong: "勿選禁配（夜晚、操場、踢足球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h03",
          pic: "art/story/pic_story_03.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","媽媽","替我","準備晚飯","。"],
          distractors: ["早上","太陽高掛","回校","公園","！","？","採蘋果","果園"],
          answers: [
            ["晚上","，","媽媽","替我","準備晚飯","。"]
          ],
          speak: "晚上，媽媽替我準備晚飯。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（家裏／媽媽）。","不要選禁配詞：早上、太陽高掛。"],
          explainCorrect: "句子通順、標點正確，符合圖中「家庭晚飯」。",
          explainWrong: "勿選禁配（早上、太陽高掛、回校等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h04",
          pic: "art/story/pic_story_04.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["白天","，","爸爸","在家裏","陪我做功課","。"],
          distractors: ["夜晚","操場","吃飯","踢球","！","？","採蘋果","果園"],
          answers: [
            ["白天","，","爸爸","在家裏","陪我做功課","。"]
          ],
          speak: "白天，爸爸在家裏陪我做功課。",
          hints: ["時間是「白天」，後面要有「，」。","地點與人物要合圖（家裏／爸爸）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「家庭功課」。",
          explainWrong: "勿選禁配（夜晚、操場、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h05",
          pic: "art/story/pic_story_05.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["小息時","，","兩位同學","在操場","分享零食","。"],
          distractors: ["夜晚","飯廳","考試","上數學課","！","？","採蘋果","果園"],
          answers: [
            ["小息時","，","兩位同學","在操場","分享零食","。"]
          ],
          speak: "小息時，兩位同學在操場分享零食。",
          hints: ["時間是「小息時」，後面要有「，」。","地點與人物要合圖（操場／兩位同學）。","不要選禁配詞：夜晚、飯廳。"],
          explainCorrect: "句子通順、標點正確，符合圖中「校園小息」。",
          explainWrong: "勿選禁配（夜晚、飯廳、考試等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h06",
          pic: "art/story/pic_story_06.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我","和爺爺奶奶","在公園散步","。"],
          distractors: ["夜晚","學校排隊","下雨","果園","！","？","採蘋果","半夜"],
          answers: [
            ["星期天","，","我","和爺爺奶奶","在公園散步","。"]
          ],
          speak: "星期天，我和爺爺奶奶在公園散步。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（公園／我和爺爺奶奶）。","不要選禁配詞：夜晚、學校排隊。"],
          explainCorrect: "句子通順、標點正確，符合圖中「家庭散步」。",
          explainWrong: "勿選禁配（夜晚、學校排隊、下雨等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h07",
          pic: "art/story/pic_story_07.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下雨天","，","小明","撐着雨傘","走進學校","。"],
          distractors: ["晴天","夜晚","放學","公園","！","？","採蘋果","果園"],
          answers: [
            ["下雨天","，","小明","撐着雨傘","走進學校","。"]
          ],
          speak: "下雨天，小明撐着雨傘走進學校。",
          hints: ["時間是「下雨天」，後面要有「，」。","地點與人物要合圖（學校／小明）。","不要選禁配詞：晴天、夜晚。"],
          explainCorrect: "句子通順、標點正確，符合圖中「雨天上學」。",
          explainWrong: "勿選禁配（晴天、夜晚、放學等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h08",
          pic: "art/story/pic_story_08.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","小美","在圖書館","挑選圖書","。"],
          distractors: ["夜晚","操場","刷牙","踢球","！","？","採蘋果","果園"],
          answers: [
            ["今天","，","小美","在圖書館","挑選圖書","。"]
          ],
          speak: "今天，小美在圖書館挑選圖書。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（圖書館／小美）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「圖書館借書」。",
          explainWrong: "勿選禁配（夜晚、操場、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h09",
          pic: "art/story/pic_story_09.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","我","在浴室裏","刷牙","。"],
          distractors: ["夜晚臨睡","學校","吃飯","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","我","在浴室裏","刷牙","。"]
          ],
          speak: "早上，我在浴室裏刷牙。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（浴室／我）。","不要選禁配詞：夜晚臨睡、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「早上刷牙」。",
          explainWrong: "勿選禁配（夜晚臨睡、學校、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h10",
          pic: "art/story/pic_story_10.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["體育課時","，","同學們","在操場上","拍球","。"],
          distractors: ["夜晚","圖書館","看電視","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["體育課時","，","同學們","在操場上","拍球","。"]
          ],
          speak: "體育課時，同學們在操場上拍球。",
          hints: ["時間是「體育課時」，後面要有「，」。","地點與人物要合圖（操場／同學們）。","不要選禁配詞：夜晚、圖書館。"],
          explainCorrect: "句子通順、標點正確，符合圖中「體育課」。",
          explainWrong: "勿選禁配（夜晚、圖書館、看電視等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h11",
          pic: "art/story/pic_story_11.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","媽媽和我","在客廳","看電視","。"],
          distractors: ["早上","學校","做功課","太陽","！","？","採蘋果","果園"],
          answers: [
            ["晚上","，","媽媽和我","在客廳","看電視","。"]
          ],
          speak: "晚上，媽媽和我在客廳看電視。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（客廳／媽媽和我）。","不要選禁配詞：早上、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「晚上看電視」。",
          explainWrong: "勿選禁配（早上、學校、做功課等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h12",
          pic: "art/story/pic_story_12.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","媽媽","替我","準備早餐","，","我","收拾書包","。"],
          distractors: ["夜晚","操場","撐傘回校","下雨","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","媽媽","替我","準備早餐","，","我","收拾書包","。"]
          ],
          speak: "早上，媽媽替我準備早餐，我收拾書包。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（廚房／媽媽）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「早上出門前」。",
          explainWrong: "勿選禁配（夜晚、操場、撐傘回校等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h13",
          pic: "art/story/pic_story_13.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小明","在陽台","給花兒澆水","。"],
          distractors: ["夜晚","課室","吃飯","學校","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","小明","在陽台","給花兒澆水","。"]
          ],
          speak: "早上，小明在陽台給花兒澆水。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（陽台／小明）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「陽台澆花」。",
          explainWrong: "勿選禁配（夜晚、課室、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h14",
          pic: "art/story/pic_story_14.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["吃飯前","，","小明","在洗手盆","洗手","。"],
          distractors: ["夜晚","操場","睡覺","踢球","！","？","採蘋果","果園"],
          answers: [
            ["吃飯前","，","小明","在洗手盆","洗手","。"]
          ],
          speak: "吃飯前，小明在洗手盆洗手。",
          hints: ["時間是「吃飯前」，後面要有「，」。","地點與人物要合圖（洗手盆／小明）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「飯前洗手」。",
          explainWrong: "勿選禁配（夜晚、操場、睡覺等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h15",
          pic: "art/story/pic_story_15.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","爸爸","牽着我的手","橫過馬路","。"],
          distractors: ["夜晚","公園","游泳","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","爸爸","牽着我的手","橫過馬路","。"]
          ],
          speak: "早上，爸爸牽着我的手橫過馬路。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（馬路／爸爸）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「過馬路」。",
          explainWrong: "勿選禁配（夜晚、公園、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h16",
          pic: "art/story/pic_story_16.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","媽媽","帶我","到市場買水果","。"],
          distractors: ["夜晚","課室","刷牙","考試","！","？","採蘋果","果園"],
          answers: [
            ["星期天","，","媽媽","帶我","到市場買水果","。"]
          ],
          speak: "星期天，媽媽帶我到市場買水果。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（市場／媽媽）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「市場買水果」。",
          explainWrong: "勿選禁配（夜晚、課室、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h17",
          pic: "art/story/pic_story_17.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["上課時","，","同學","在黑板上","寫字","。"],
          distractors: ["夜晚","公園","吃飯","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["上課時","，","同學","在黑板上","寫字","。"]
          ],
          speak: "上課時，同學在黑板上寫字。",
          hints: ["時間是「上課時」，後面要有「，」。","地點與人物要合圖（課室／同學）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「黑板寫字」。",
          explainWrong: "勿選禁配（夜晚、公園、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h18",
          pic: "art/story/pic_story_18.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["音樂課時","，","同學們","跟着老師","開心唱歌","。"],
          distractors: ["夜晚","廚房","睡覺","煮飯","！","？","採蘋果","果園"],
          answers: [
            ["音樂課時","，","同學們","跟着老師","開心唱歌","。"]
          ],
          speak: "音樂課時，同學們跟着老師開心唱歌。",
          hints: ["時間是「音樂課時」，後面要有「，」。","地點與人物要合圖（音樂室／同學們）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「音樂課唱歌」。",
          explainWrong: "勿選禁配（夜晚、廚房、睡覺等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h19",
          pic: "art/story/pic_story_19.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["美術課時","，","小美","正在畫畫","。"],
          distractors: ["夜晚","操場","買菜","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["美術課時","，","小美","正在畫畫","。"]
          ],
          speak: "美術課時，小美正在畫畫。",
          hints: ["時間是「美術課時」，後面要有「，」。","地點與人物要合圖（美術室／小美）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「美術課畫畫」。",
          explainWrong: "勿選禁配（夜晚、操場、買菜等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h20",
          pic: "art/story/pic_story_20.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","小明","在客廳裏","餵小貓吃東西","。"],
          distractors: ["夜晚","學校","排隊","考試","！","？","採蘋果","果園"],
          answers: [
            ["下午","，","小明","在客廳裏","餵小貓吃東西","。"]
          ],
          speak: "下午，小明在客廳裏餵小貓吃東西。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（客廳／小明）。","不要選禁配詞：夜晚、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「餵寵物」。",
          explainWrong: "勿選禁配（夜晚、學校、排隊等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h21",
          pic: "art/story/pic_story_21.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","奶奶和小妹妹","在客廳裏","摺衣服","。"],
          distractors: ["夜晚","操場","游泳","踢球","！","？","採蘋果","果園"],
          answers: [
            ["下午","，","奶奶和小妹妹","在客廳裏","摺衣服","。"]
          ],
          speak: "下午，奶奶和小妹妹在客廳裏摺衣服。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（客廳／奶奶和小妹妹）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「摺衣服」。",
          explainWrong: "勿選禁配（夜晚、操場、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h22",
          pic: "art/story/pic_story_22.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","一家人","為小明","慶祝生日","。"],
          distractors: ["早上","學校","下雨上學","考試","！","？","採蘋果","果園"],
          answers: [
            ["晚上","，","一家人","為小明","慶祝生日","。"]
          ],
          speak: "晚上，一家人為小明慶祝生日。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（客廳／一家人）。","不要選禁配詞：早上、學校。"],
          explainCorrect: "句子通順、標點正確，符合圖中「生日吹蠟燭」。",
          explainWrong: "勿選禁配（早上、學校、下雨上學等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h23",
          pic: "art/story/pic_story_23.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","同學們","在路邊","排隊上校車","。"],
          distractors: ["夜晚","客廳","看電視","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","同學們","在路邊","排隊上校車","。"]
          ],
          speak: "早上，同學們在路邊排隊上校車。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（路邊／同學們）。","不要選禁配詞：夜晚、客廳。"],
          explainCorrect: "句子通順、標點正確，符合圖中「上校車」。",
          explainWrong: "勿選禁配（夜晚、客廳、看電視等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h24",
          pic: "art/story/pic_story_24.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小明","背着書包","去上學","。"],
          distractors: ["夜晚","博物館","吃蛋糕","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","小明","背着書包","去上學","。"]
          ],
          speak: "早上，小明背着書包去上學。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（家門／小明）。","不要選禁配詞：夜晚、博物館。"],
          explainCorrect: "句子通順、標點正確，符合圖中「上學揮手」。",
          explainWrong: "勿選禁配（夜晚、博物館、吃蛋糕等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h25",
          pic: "art/story/pic_story_25.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["假日","，","爺爺","在客廳裏","看報紙","。"],
          distractors: ["夜晚","操場","踢足球","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["假日","，","爺爺","在客廳裏","看報紙","。"]
          ],
          speak: "假日，爺爺在客廳裏看報紙。",
          hints: ["時間是「假日」，後面要有「，」。","地點與人物要合圖（客廳／爺爺）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「看報紙」。",
          explainWrong: "勿選禁配（夜晚、操場、踢足球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h26",
          pic: "art/story/pic_story_26.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","老師和同學們","在菜園裏","給蔬菜澆水","。"],
          distractors: ["夜晚","浴室","刷牙","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","老師和同學們","在菜園裏","給蔬菜澆水","。"]
          ],
          speak: "早上，老師和同學們在菜園裏給蔬菜澆水。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（菜園／老師和同學們）。","不要選禁配詞：夜晚、浴室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「校園菜園澆水」。",
          explainWrong: "勿選禁配（夜晚、浴室、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h27",
          pic: "art/story/pic_story_27.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["中午","，","同學們","在食堂裏","吃午餐","。"],
          distractors: ["夜晚","公園","放風箏","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["中午","，","同學們","在食堂裏","吃午餐","。"]
          ],
          speak: "中午，同學們在食堂裏吃午餐。",
          hints: ["時間是「中午」，後面要有「，」。","地點與人物要合圖（食堂／同學們）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「食堂午膳」。",
          explainWrong: "勿選禁配（夜晚、公園、放風箏等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h28",
          pic: "art/story/pic_story_28.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","媽媽和我","一起","準備午餐","。"],
          distractors: ["夜晚","圖書館","唱歌","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","媽媽和我","一起","準備午餐","。"]
          ],
          speak: "早上，媽媽和我一起準備午餐。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（廚房／媽媽和我）。","不要選禁配詞：夜晚、圖書館。"],
          explainCorrect: "句子通順、標點正確，符合圖中「準備飯盒」。",
          explainWrong: "勿選禁配（夜晚、圖書館、唱歌等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h29",
          pic: "art/story/pic_story_29.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","媽媽","帶我","到診所看醫生","。"],
          distractors: ["夜晚","操場","踢球","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["今天","，","媽媽","帶我","到診所看醫生","。"]
          ],
          speak: "今天，媽媽帶我到診所看醫生。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（診所／媽媽和我）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「看醫生」。",
          explainWrong: "勿選禁配（夜晚、操場、踢球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h30",
          pic: "art/story/pic_story_30.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","爸爸","陪我","在家裏下棋","。"],
          distractors: ["夜晚","食堂","吃飯","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["下午","，","爸爸","陪我","在家裏下棋","。"]
          ],
          speak: "下午，爸爸陪我在家裏下棋。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（家裏／爸爸）。","不要選禁配詞：夜晚、食堂。"],
          explainCorrect: "句子通順、標點正確，符合圖中「下棋」。",
          explainWrong: "勿選禁配（夜晚、食堂、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h31",
          pic: "art/story/pic_story_31.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["小息後","，","同學們","在課室裏","清潔","。"],
          distractors: ["夜晚","公園","放風箏","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["小息後","，","同學們","在課室裏","清潔","。"]
          ],
          speak: "小息後，同學們在課室裏清潔。",
          hints: ["時間是「小息後」，後面要有「，」。","地點與人物要合圖（課室／同學們）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「清潔課室」。",
          explainWrong: "勿選禁配（夜晚、公園、放風箏等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h32",
          pic: "art/story/pic_story_32.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","同學們","參加升旗禮","。"],
          distractors: ["夜晚","廚房","煮飯","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","同學們","參加升旗禮","。"]
          ],
          speak: "早上，同學們參加升旗禮。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（操場／同學們）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「升旗禮」。",
          explainWrong: "勿選禁配（夜晚、廚房、煮飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h33",
          pic: "art/story/pic_story_33.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["體育課時","，","同學們","在泳池","游泳","。"],
          distractors: ["夜晚","課室","寫字","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["體育課時","，","同學們","在泳池","游泳","。"]
          ],
          speak: "體育課時，同學們在泳池游泳。",
          hints: ["時間是「體育課時」，後面要有「，」。","地點與人物要合圖（泳池／同學們）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「游泳課」。",
          explainWrong: "勿選禁配（夜晚、課室、寫字等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h34",
          pic: "art/story/pic_story_34.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我","在陽台","替花盆播種","。"],
          distractors: ["夜晚","操場","跑步","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["星期天","，","我","在陽台","替花盆播種","。"]
          ],
          speak: "星期天，我在陽台替花盆播種。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（陽台／我）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「盆栽播種」。",
          explainWrong: "勿選禁配（夜晚、操場、跑步等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h35",
          pic: "art/story/pic_story_35.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","我","和爺爺奶奶","視像通話","。"],
          distractors: ["早上","街市","買水果","太陽","！","？","採蘋果","果園"],
          answers: [
            ["晚上","，","我","和爺爺奶奶","視像通話","。"]
          ],
          speak: "晚上，我和爺爺奶奶視像通話。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（家裏／我和爺爺奶奶）。","不要選禁配詞：早上、街市。"],
          explainCorrect: "句子通順、標點正確，符合圖中「視像通話」。",
          explainWrong: "勿選禁配（早上、街市、買水果等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h36",
          pic: "art/story/pic_story_36.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["放學後","，","媽媽","帶我","到文具店買文具","。"],
          distractors: ["夜晚","泳池","游泳","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["放學後","，","媽媽","帶我","到文具店買文具","。"]
          ],
          speak: "放學後，媽媽帶我到文具店買文具。",
          hints: ["時間是「放學後」，後面要有「，」。","地點與人物要合圖（文具店／媽媽）。","不要選禁配詞：夜晚、泳池。"],
          explainCorrect: "句子通順、標點正確，符合圖中「買文具」。",
          explainWrong: "勿選禁配（夜晚、泳池、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h37",
          pic: "art/story/pic_story_37.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","我","在公園裏","遛狗","。"],
          distractors: ["夜晚","課室","考試","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","我","在公園裏","遛狗","。"]
          ],
          speak: "早上，我在公園裏遛狗。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（公園／我）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「遛狗」。",
          explainWrong: "勿選禁配（夜晚、課室、考試等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h38",
          pic: "art/story/pic_story_38.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","我","幫忙","提着購物袋回家","。"],
          distractors: ["夜晚","音樂室","唱歌","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["下午","，","我","幫忙","提着購物袋回家","。"]
          ],
          speak: "下午，我幫忙提着購物袋回家。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（回家路上／我）。","不要選禁配詞：夜晚、音樂室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「提菜」。",
          explainWrong: "勿選禁配（夜晚、音樂室、唱歌等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h39",
          pic: "art/story/pic_story_39.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["下午","，","我","在家裏","練習彈鋼琴","。"],
          distractors: ["夜晚","操場","踢足球","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["下午","，","我","在家裏","練習彈鋼琴","。"]
          ],
          speak: "下午，我在家裏練習彈鋼琴。",
          hints: ["時間是「下午」，後面要有「，」。","地點與人物要合圖（家裏／我）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「練琴」。",
          explainWrong: "勿選禁配（夜晚、操場、踢足球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h40",
          pic: "art/story/pic_story_40.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["科學課時","，","同學們","在做實驗","。"],
          distractors: ["夜晚","廚房","煮麵","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["科學課時","，","同學們","在做實驗","。"]
          ],
          speak: "科學課時，同學們在做實驗。",
          hints: ["時間是「科學課時」，後面要有「，」。","地點與人物要合圖（科學室／同學們）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「科學實驗」。",
          explainWrong: "勿選禁配（夜晚、廚房、煮麵等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h41",
          pic: "art/story/pic_story_41.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["晚上","，","小男孩","在家裏","專心地寫日記","。"],
          distractors: ["早上","操場","踢球","太陽","！","？","採蘋果","果園"],
          answers: [
            ["晚上","，","小男孩","在家裏","專心地寫日記","。"]
          ],
          speak: "晚上，小男孩在家裏專心地寫日記。",
          hints: ["時間是「晚上」，後面要有「，」。","地點與人物要合圖（家裏／小男孩）。","不要選禁配詞：早上、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「寫日記」。",
          explainWrong: "勿選禁配（早上、操場、踢球等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h42",
          pic: "art/story/pic_story_42.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我們","在公園裏","放風箏","。"],
          distractors: ["夜晚","課室","寫黑板","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["星期天","，","我們","在公園裏","放風箏","。"]
          ],
          speak: "星期天，我們在公園裏放風箏。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（公園／我們）。","不要選禁配詞：夜晚、課室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「放風箏」。",
          explainWrong: "勿選禁配（夜晚、課室、寫黑板等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h43",
          pic: "art/story/pic_story_43.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","老師","帶我們","到博物館參觀","。"],
          distractors: ["夜晚","浴室","刷牙","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["今天","，","老師","帶我們","到博物館參觀","。"]
          ],
          speak: "今天，老師帶我們到博物館參觀。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（博物館／老師）。","不要選禁配詞：夜晚、浴室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「參觀博物館」。",
          explainWrong: "勿選禁配（夜晚、浴室、刷牙等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h44",
          pic: "art/story/pic_story_44.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小美","在廚房裏","做三明治","。"],
          distractors: ["夜晚","操場","升旗","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","小美","在廚房裏","做三明治","。"]
          ],
          speak: "早上，小美在廚房裏做三明治。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（廚房／小美）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「做三明治」。",
          explainWrong: "勿選禁配（夜晚、操場、升旗等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h45",
          pic: "art/story/pic_story_45.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小明","在門口","穿鞋準備上學","。"],
          distractors: ["夜晚","食堂","吃飯","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","小明","在門口","穿鞋準備上學","。"]
          ],
          speak: "早上，小明在門口穿鞋準備上學。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（門口／小明）。","不要選禁配詞：夜晚、食堂。"],
          explainCorrect: "句子通順、標點正確，符合圖中「穿校服鞋」。",
          explainWrong: "勿選禁配（夜晚、食堂、吃飯等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h46",
          pic: "art/story/pic_story_46.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["早上","，","小美","在窗台","給盆栽澆水","。"],
          distractors: ["夜晚","泳池","游泳","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["早上","，","小美","在窗台","給盆栽澆水","。"]
          ],
          speak: "早上，小美在窗台給盆栽澆水。",
          hints: ["時間是「早上」，後面要有「，」。","地點與人物要合圖（窗台／小美）。","不要選禁配詞：夜晚、泳池。"],
          explainCorrect: "句子通順、標點正確，符合圖中「窗台澆花」。",
          explainWrong: "勿選禁配（夜晚、泳池、游泳等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h47",
          pic: "art/story/pic_story_47.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["教師節","，","小明","送花給老師","。"],
          distractors: ["夜晚","廚房","洗碗","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["教師節","，","小明","送花給老師","。"]
          ],
          speak: "教師節，小明送花給老師。",
          hints: ["時間是「教師節」，後面要有「，」。","地點與人物要合圖（校園／小明）。","不要選禁配詞：夜晚、廚房。"],
          explainCorrect: "句子通順、標點正確，符合圖中「送花謝師」。",
          explainWrong: "勿選禁配（夜晚、廚房、洗碗等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h48",
          pic: "art/story/pic_story_48.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["小息時","，","同學們","在課室","做垃圾分類","。"],
          distractors: ["夜晚","公園","放風箏","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["小息時","，","同學們","在課室","做垃圾分類","。"]
          ],
          speak: "小息時，同學們在課室做垃圾分類。",
          hints: ["時間是「小息時」，後面要有「，」。","地點與人物要合圖（課室／同學們）。","不要選禁配詞：夜晚、公園。"],
          explainCorrect: "句子通順、標點正確，符合圖中「垃圾分類」。",
          explainWrong: "勿選禁配（夜晚、公園、放風箏等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h49",
          pic: "art/story/pic_story_49.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["星期天","，","我們","帶水果","去探望爺爺嫲嫲","。"],
          distractors: ["夜晚","科學室","實驗","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["星期天","，","我們","帶水果","去探望爺爺嫲嫲","。"]
          ],
          speak: "星期天，我們帶水果去探望爺爺嫲嫲。",
          hints: ["時間是「星期天」，後面要有「，」。","地點與人物要合圖（祖父母家／我們）。","不要選禁配詞：夜晚、科學室。"],
          explainCorrect: "句子通順、標點正確，符合圖中「探訪祖父母」。",
          explainWrong: "勿選禁配（夜晚、科學室、實驗等）；須合圖且時間詞後有「，」。"
        },
        {
          id: "l5h50",
          pic: "art/story/pic_story_50.jpg",
          prompt: "請看圖，選出有用的字詞，組成一句通順的話。",
          order: ["今天","，","媽媽","帶我","到書店挑選故事書","。"],
          distractors: ["夜晚","操場","跑接力","睡覺","！","？","採蘋果","果園"],
          answers: [
            ["今天","，","媽媽","帶我","到書店挑選故事書","。"]
          ],
          speak: "今天，媽媽帶我到書店挑選故事書。",
          hints: ["時間是「今天」，後面要有「，」。","地點與人物要合圖（書店／媽媽）。","不要選禁配詞：夜晚、操場。"],
          explainCorrect: "句子通順、標點正確，符合圖中「書店選書」。",
          explainWrong: "勿選禁配（夜晚、操場、跑接力等）；須合圖且時間詞後有「，」。"
        }
      ]
    }
  }
};

/** 依難度取出該關獨立題池（完整庫） */
export function getLevelItems(level, diffKey) {
  const pools = level.itemsByDiff || {};
  return pools[diffKey] || pools.medium || pools.easy || [];
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** 為所有關×難度建立洗牌後的 session 隊列 */
export function reshuffleAllPools() {
  const queues = {};
  for (const [levelId, level] of Object.entries(LEVELS)) {
    queues[levelId] = {};
    for (const diff of ['easy', 'medium', 'hard']) {
      const items = [...getLevelItems(level, diff)];
      shuffleInPlace(items);
      queues[levelId][diff] = items;
    }
  }
  return queues;
}

/**
 * 從 session 隊列抽出本關題目（預設 6 題）。
 * 隊列不足時重洗該池再抽；用盡則循環重洗。
 * R32 L5：同難度同輪不重 pic_story；池盡才洗牌。
 * 寫入 state.sessionQueues。
 */
export function drawLevelItems(level, diffKey, state, count = 6) {
  if (!state.sessionQueues) state.sessionQueues = reshuffleAllPools();
  const levelId = level.id;
  if (!state.sessionQueues[levelId]) state.sessionQueues[levelId] = {};
  let q = state.sessionQueues[levelId][diffKey];
  if (!Array.isArray(q) || q.length === 0) {
    q = shuffleInPlace([...getLevelItems(level, diffKey)]);
    state.sessionQueues[levelId][diffKey] = q;
  }
  const poolAll = getLevelItems(level, diffKey);
  const n = Math.min(count, Math.max(1, poolAll.length));
  const isL5 = levelId === 'L5_picture_sentence';

  function refillUniqueByPic(queue) {
    const have = new Set(queue.map((it) => it.pic || it.id));
    const fresh = shuffleInPlace([...poolAll]).filter((it) => !have.has(it.pic || it.id));
    // 若過濾後仍不足（理論上僅池極小），才允許完整重洗接上
    if (fresh.length === 0) return [...queue, ...shuffleInPlace([...poolAll])];
    return [...queue, ...fresh];
  }

  if (q.length < n) {
    q = isL5 ? refillUniqueByPic(q) : [...q, ...shuffleInPlace([...poolAll])];
    state.sessionQueues[levelId][diffKey] = q;
  }

  if (!isL5) {
    const drawn = q.splice(0, n);
    state.sessionQueues[levelId][diffKey] = q;
    return drawn;
  }

  // L5：抽出 n 題且 pic 不重複；不足才洗牌補池
  const drawn = [];
  const seenPic = new Set();
  const rest = [];
  let guard = 0;
  while (drawn.length < n && guard < poolAll.length * 3) {
    guard++;
    if (q.length === 0) {
      const block = new Set([...seenPic, ...rest.map((it) => it.pic || it.id)]);
      let fresh = shuffleInPlace([...poolAll]).filter((it) => !block.has(it.pic || it.id));
      if (fresh.length === 0) {
        fresh = shuffleInPlace([...poolAll]).filter((it) => !seenPic.has(it.pic || it.id));
      }
      if (fresh.length === 0) break;
      q = fresh;
    }
    const it = q.shift();
    const key = it.pic || it.id;
    if (seenPic.has(key)) {
      rest.push(it);
      continue;
    }
    seenPic.add(key);
    drawn.push(it);
  }
  state.sessionQueues[levelId][diffKey] = q.concat(rest);
  return drawn;
}

/** 正規化：L1／L4 依難度截成 3／4／5 選（必留正確項）；拖放關維持分池內容 */
export function resolveItem(level, item, diffKey) {
  if (!item) return null;
  const cfg = BALANCE.difficulty[diffKey] || BALANCE.difficulty.medium;
  const EMPTY_PRAISE = new Set(['請再細心想一想。', '留意題目中的關鍵詞。', '留意題目要求，仔細比較。', '再想一想，你可以的。', '你可以的。', '加油', '加油！', '再想一想。']);
  const baseHints = (Array.isArray(item.hints) && item.hints.length
    ? [...item.hints]
    : (item.hint ? [item.hint] : [])).filter((h) => h && !EMPTY_PRAISE.has(h));
  const fallbacks = ['比較形近字或選項差異。', '留意時間詞或因果連接。'];

  if (level.id === 'L1_typo') {
    return {
      prompt: item.prompt || '請點選句子中寫錯的字。',
      promptSpeak: item.promptSpeak || item.prompt || '請點選句子中寫錯的字。',
      sentence: item.sentence,
      wrongIndex: item.wrongIndex,
      wrongChar: item.wrongChar,
      correctChar: item.correctChar,
      speak: item.speak,
      hint: item.hint || '比較形近字差在哪一筆。',
      hints: baseHints,
      explainCorrect: item.explainCorrect || `這句的錯字是「${item.wrongChar}」，應寫作「${item.correctChar}」。`,
      explainWrong: item.explainWrong || '這個字沒有寫錯，請再找別的字。'
    };
  }

  if (level.verb === 'tap') {
    const all = Array.isArray(item.choices) ? [...item.choices] : [];
    const correct = all.filter((c) => c.correct);
    const wrong = all.filter((c) => !c.correct);
    const need = Math.max(1, cfg.choiceCount || 3);
    for (let i = wrong.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wrong[i], wrong[j]] = [wrong[j], wrong[i]];
    }
    let picked = [...correct, ...wrong].slice(0, need);
    if (!picked.some((c) => c.correct) && correct[0]) {
      picked = [correct[0], ...picked.filter((c) => !c.correct)].slice(0, need);
    }
    const explainCorrect = item.explainCorrect || (correct[0]?.hint || '答案正確。');
    return {
      prompt: item.prompt,
      promptSpeak: item.promptSpeak || item.prompt,
      speak: item.speak,
      choices: picked,
      hint: item.hint || '請細心比較各個選項。',
      hints: baseHints.length ? baseHints : [item.hint || '請細心比較各個選項。', ...fallbacks],
      explainCorrect,
      explainWrong: item.explainWrong || '這個答案不正確，請再試。'
    };
  }

  if (level.id === 'L5_picture_sentence') {
    const order = Array.isArray(item.order) ? [...item.order] : [];
    const distractors = Array.isArray(item.distractors) ? [...item.distractors] : [];
    const pool = Array.isArray(item.pool) && item.pool.length
      ? [...item.pool]
      : [...order, ...distractors];
    const answers = Array.isArray(item.answers) && item.answers.length
      ? item.answers.map((a) => [...a])
      : [order];
    return {
      prompt: item.prompt || '請看圖，選出有用的字詞，組成一句通順的話。',
      promptSpeak: item.promptSpeak || item.prompt,
      speak: item.speak || order.join(''),
      pic: item.pic || '',
      order,
      pool,
      answers,
      distractors,
      distractorHint: item.distractorHint || '',
      hint: item.hint || '先看圖，再選合圖的字詞組成完整句（含標點）。',
      hints: baseHints.length ? baseHints : [item.hint || '先看圖找出人物與動作。', '句子要通順、符合圖意，且標點正確。', '缺標點或標點位置不對都不算對。'],
      explainCorrect: item.explainCorrect || '句子通順，標點正確，也符合圖意。',
      explainWrong: item.explainWrong || '請組成通順完整句，必須符合圖意，且標點正確；通順但不合圖、欠主謂、缺標點或標點錯位，都不算對。'
    };
  }

  return {
    prompt: item.prompt,
    promptSpeak: item.promptSpeak || item.prompt,
    speak: item.speak,
    order: item.order,
    distractorHint: item.distractorHint || '',
    hint: item.hint || '留意時間詞或「因為……所以……」的順序。',
    hints: baseHints.length ? baseHints : [item.hint || '留意時間詞或因果邊。', ...fallbacks],
    explainCorrect: item.explainCorrect || '句子順序正確，段落通順。',
    explainWrong: item.explainWrong || item.distractorHint || '順序尚未正確，請再排列。'
  };
}

export const SPEAK_TTS = {
  '。': 'audio/tts/t_f92669081d9a.mp3',
  '一': 'audio/tts/t_d274eee8a175.mp3',
  '上': 'audio/tts/t_b967ce841ad5.mp3',
  '下': 'audio/tts/t_a6caf2effb1c.mp3',
  '不': 'audio/tts/t_8fa7401e9077.mp3',
  '丟': 'audio/tts/t_710f92155bd0.mp3',
  '中': 'audio/tts/t_0869071c92c0.mp3',
  '乃': 'audio/tts/t_ee613eb59a54.mp3',
  '也': 'audio/tts/t_db73d8577b4b.mp3',
  '乾': 'audio/tts/t_7f10671bd5ae.mp3',
  '亁': 'audio/tts/t_1d93d17f66e6.mp3',
  '亂': 'audio/tts/t_a4b278087f53.mp3',
  '了': 'audio/tts/t_a5933e2a9e71.mp3',
  '亊': 'audio/tts/t_c2286f06fe90.mp3',
  '事': 'audio/tts/t_aae488416289.mp3',
  '亮': 'audio/tts/t_caf3447b27cc.mp3',
  '人': 'audio/tts/t_4912771a4216.mp3',
  '今': 'audio/tts/t_d2130d70a08e.mp3',
  '他': 'audio/tts/t_e31b569a0f1d.mp3',
  '付': 'audio/tts/t_feb585f1697c.mp3',
  '件': 'audio/tts/t_04d7e6fc2cc7.mp3',
  '份': 'audio/tts/t_aa9f1ad4f91c.mp3',
  '休': 'audio/tts/t_0afbe7b539e1.mp3',
  '位': 'audio/tts/t_74c77a8ab028.mp3',
  '住': 'audio/tts/t_80b84acecf51.mp3',
  '作': 'audio/tts/t_e8555020c4b3.mp3',
  '你': 'audio/tts/t_5630b886f9cd.mp3',
  '來': 'audio/tts/t_1f50f2745746.mp3',
  '依': 'audio/tts/t_587317105552.mp3',
  '保': 'audio/tts/t_3a9756bb4428.mp3',
  '信': 'audio/tts/t_6c71e31e2aad.mp3',
  '個': 'audio/tts/t_922e29438e8d.mp3',
  '們': 'audio/tts/t_75fa2eb9a137.mp3',
  '倚': 'audio/tts/t_219d9e01ccbe.mp3',
  '借': 'audio/tts/t_83f88c8f0e30.mp3',
  '做': 'audio/tts/t_715fb2c0eff5.mp3',
  '停': 'audio/tts/t_c9bd4c71a44e.mp3',
  '働': 'audio/tts/t_2f6a82693328.mp3',
  '兒': 'audio/tts/t_389d474afa85.mp3',
  '內': 'audio/tts/t_9c988e20c344.mp3',
  '公': 'audio/tts/t_2eb8ebf6c33c.mp3',
  '共': 'audio/tts/t_3b6ef811b85a.mp3',
  '具': 'audio/tts/t_bb0233108ce9.mp3',
  '冬': 'audio/tts/t_d5ca75a91f1a.mp3',
  '冷': 'audio/tts/t_e2fc60d070bd.mp3',
  '切': 'audio/tts/t_edb815ad6b99.mp3',
  '別': 'audio/tts/t_ab420126abcb.mp3',
  '利': 'audio/tts/t_1a1001e5f30a.mp3',
  '到': 'audio/tts/t_792bbe6e08f5.mp3',
  '副': 'audio/tts/t_3671c766ad5a.mp3',
  '功': 'audio/tts/t_a351fd08c281.mp3',
  '動': 'audio/tts/t_bddc2bcde445.mp3',
  '勝': 'audio/tts/t_5408a70dd74e.mp3',
  '勿': 'audio/tts/t_c69295b63c1e.mp3',
  '包': 'audio/tts/t_7e396634c6ce.mp3',
  '匹': 'audio/tts/t_2c87a2d63adf.mp3',
  '升': 'audio/tts/t_6c0378767fa7.mp3',
  '午': 'audio/tts/t_66571b614d99.mp3',
  '卓': 'audio/tts/t_04a215f0461f.mp3',
  '厎': 'audio/tts/t_c4d30280c06d.mp3',
  '厚': 'audio/tts/t_7cc2333d5611.mp3',
  '去': 'audio/tts/t_033fd274f014.mp3',
  '又': 'audio/tts/t_4c2b677cfdc7.mp3',
  '及': 'audio/tts/t_22579e1b764b.mp3',
  '友': 'audio/tts/t_6cca7a3ec067.mp3',
  '叫': 'audio/tts/t_793f8679d7b0.mp3',
  '吃': 'audio/tts/t_a10d4d5a63e6.mp3',
  '同': 'audio/tts/t_0b8b919983f5.mp3',
  '吹': 'audio/tts/t_3b1bae0eaddd.mp3',
  '和': 'audio/tts/t_9a3eb340971f.mp3',
  '哥': 'audio/tts/t_cdfd26daa23a.mp3',
  '唱': 'audio/tts/t_07b810f63692.mp3',
  '喜': 'audio/tts/t_d21b4e3093be.mp3',
  '單': 'audio/tts/t_375b6af75a18.mp3',
  '國': 'audio/tts/t_34bb48d3b91f.mp3',
  '圍': 'audio/tts/t_ece26c160a10.mp3',
  '園': 'audio/tts/t_43bd88ad5a0e.mp3',
  '圓': 'audio/tts/t_9633e8c36db1.mp3',
  '圖': 'audio/tts/t_3a74f4cd3034.mp3',
  '圡': 'audio/tts/t_e8c45f2372ab.mp3',
  '在': 'audio/tts/t_686b703f41f3.mp3',
  '地': 'audio/tts/t_ede5b1e64059.mp3',
  '圾': 'audio/tts/t_bf0750502a15.mp3',
  '坂': 'audio/tts/t_6291ee32cc01.mp3',
  '坐': 'audio/tts/t_4a1e3b19faa5.mp3',
  '垃': 'audio/tts/t_0eb3bd17eee9.mp3',
  '報': 'audio/tts/t_7c155bc560d0.mp3',
  '場': 'audio/tts/t_edb84a4b9c87.mp3',
  '塊': 'audio/tts/t_39deb1dd264d.mp3',
  '境': 'audio/tts/t_8b008e3b6e86.mp3',
  '多': 'audio/tts/t_451b1366afa6.mp3',
  '大': 'audio/tts/t_0889c349726f.mp3',
  '天': 'audio/tts/t_c3304d1e49e3.mp3',
  '太': 'audio/tts/t_d2ff8f7020f4.mp3',
  '夲': 'audio/tts/t_a3a48615118c.mp3',
  '套': 'audio/tts/t_032231d845f8.mp3',
  '奶': 'audio/tts/t_d449dfee7fb1.mp3',
  '好': 'audio/tts/t_27e4fe4c3fe2.mp3',
  '妹': 'audio/tts/t_28f894973975.mp3',
  '姐': 'audio/tts/t_a151a2677510.mp3',
  '媽': 'audio/tts/t_378b3f3d82e4.mp3',
  '子': 'audio/tts/t_219e08c96026.mp3',
  '字': 'audio/tts/t_582c50066c2c.mp3',
  '學': 'audio/tts/t_db6aa5c9d965.mp3',
  '守': 'audio/tts/t_154083ba32ff.mp3',
  '安': 'audio/tts/t_3dfa9ea3c4ee.mp3',
  '完': 'audio/tts/t_08300957760b.mp3',
  '室': 'audio/tts/t_4faa260fd0a1.mp3',
  '容': 'audio/tts/t_7e8316a30537.mp3',
  '富': 'audio/tts/t_c6b3779c69f4.mp3',
  '寒': 'audio/tts/t_2d4f5882b000.mp3',
  '寫': 'audio/tts/t_29932f210557.mp3',
  '封': 'audio/tts/t_4bcc52c18437.mp3',
  '專': 'audio/tts/t_b98a81588d85.mp3',
  '對': 'audio/tts/t_5439502b9a48.mp3',
  '小': 'audio/tts/t_922517cc7363.mp3',
  '就': 'audio/tts/t_cc4858af41b5.mp3',
  '尿': 'audio/tts/t_81d099834184.mp3',
  '山': 'audio/tts/t_0e248e5603d3.mp3',
  '師': 'audio/tts/t_b48e9d30fb4e.mp3',
  '幅': 'audio/tts/t_690c5a2720e3.mp3',
  '底': 'audio/tts/t_2282a44c4e06.mp3',
  '座': 'audio/tts/t_2176b4faeddc.mp3',
  '弟': 'audio/tts/t_276330ed9702.mp3',
  '張': 'audio/tts/t_6dcb656fb70d.mp3',
  '很': 'audio/tts/t_74a04cc4bf3a.mp3',
  '後': 'audio/tts/t_a1a8cfd1dec3.mp3',
  '得': 'audio/tts/t_9c52fb11c883.mp3',
  '從': 'audio/tts/t_55ef756c9347.mp3',
  '徳': 'audio/tts/t_79ac578d8ce8.mp3',
  '心': 'audio/tts/t_481e547b1aa5.mp3',
  '息': 'audio/tts/t_4ad590ac2e09.mp3',
  '愛': 'audio/tts/t_6141c215aa08.mp3',
  '成': 'audio/tts/t_bb3578629d93.mp3',
  '我': 'audio/tts/t_34f201bc507e.mp3',
  '戴': 'audio/tts/t_eba355ed10eb.mp3',
  '戶': 'audio/tts/t_68c8463c28bb.mp3',
  '扇': 'audio/tts/t_511ae2ec186f.mp3',
  '手': 'audio/tts/t_c08a56997a21.mp3',
  '打': 'audio/tts/t_6919d5be906e.mp3',
  '技': 'audio/tts/t_9713721612b2.mp3',
  '把': 'audio/tts/t_b3ba7814f41e.mp3',
  '拾': 'audio/tts/t_73a8b0de5167.mp3',
  '持': 'audio/tts/t_e81dbd2acbb1.mp3',
  '挂': 'audio/tts/t_c566aea4461d.mp3',
  '捉': 'audio/tts/t_57c9f5ce96cd.mp3',
  '揚': 'audio/tts/t_d0d803d7c92d.mp3',
  '搬': 'audio/tts/t_cca9c0754efe.mp3',
  '操': 'audio/tts/t_df67d831dbab.mp3',
  '支': 'audio/tts/t_18d2086d6a02.mp3',
  '收': 'audio/tts/t_59a684eebe33.mp3',
  '放': 'audio/tts/t_6967b59e3d63.mp3',
  '故': 'audio/tts/t_811438c0ee85.mp3',
  '整': 'audio/tts/t_6be2ed78df56.mp3',
  '文': 'audio/tts/t_1d56b27a5e87.mp3',
  '斬': 'audio/tts/t_02b9ec7c36ea.mp3',
  '新': 'audio/tts/t_7b8a6bebd307.mp3',
  '施': 'audio/tts/t_09e1ba950481.mp3',
  '日': 'audio/tts/t_15917f3b3261.mp3',
  '春': 'audio/tts/t_3e450648252d.mp3',
  '時': 'audio/tts/t_2fdc2b012a91.mp3',
  '晝': 'audio/tts/t_5ea12e44747d.mp3',
  '晴': 'audio/tts/t_0d05046a439f.mp3',
  '書': 'audio/tts/t_a29f6f0625dc.mp3',
  '會': 'audio/tts/t_e711ba9088eb.mp3',
  '月': 'audio/tts/t_d9b59879f3b8.mp3',
  '有': 'audio/tts/t_fbd5b75066a6.mp3',
  '朋': 'audio/tts/t_01fd270dc700.mp3',
  '服': 'audio/tts/t_b5140a9fc3b0.mp3',
  '朗': 'audio/tts/t_58dd8f63b734.mp3',
  '本': 'audio/tts/t_d3cc0cab9c63.mp3',
  '朵': 'audio/tts/t_7fb98f22b92c.mp3',
  '束': 'audio/tts/t_e798ef0b79b9.mp3',
  '板': 'audio/tts/t_2793c14d0a42.mp3',
  '果': 'audio/tts/t_d62c08d357e1.mp3',
  '枝': 'audio/tts/t_14baba4cf87a.mp3',
  '查': 'audio/tts/t_a4f0863f4bb8.mp3',
  '校': 'audio/tts/t_5118ad88e3db.mp3',
  '案': 'audio/tts/t_6a6a8fd5bd94.mp3',
  '桌': 'audio/tts/t_c4a493bcda24.mp3',
  '桶': 'audio/tts/t_46bcef0347e5.mp3',
  '條': 'audio/tts/t_3f4526497c67.mp3',
  '梢': 'audio/tts/t_6a216b234264.mp3',
  '棵': 'audio/tts/t_926b2df0060f.mp3',
  '椅': 'audio/tts/t_618be2726b51.mp3',
  '業': 'audio/tts/t_beac7b3157b0.mp3',
  '樹': 'audio/tts/t_e660f3571e94.mp3',
  '檢': 'audio/tts/t_3789f7fecd8a.mp3',
  '次': 'audio/tts/t_5e5b8169eee6.mp3',
  '歌': 'audio/tts/t_3a3857bfa3f6.mp3',
  '歡': 'audio/tts/t_43a3b1f50130.mp3',
  '正': 'audio/tts/t_b67ca1194c0f.mp3',
  '步': 'audio/tts/t_5274e916ac90.mp3',
  '歩': 'audio/tts/t_38ddc2551552.mp3',
  '每': 'audio/tts/t_7757f7570e60.mp3',
  '氣': 'audio/tts/t_484a13bcecc2.mp3',
  '水': 'audio/tts/t_8ffbf192934a.mp3',
  '氷': 'audio/tts/t_19ffed6948f6.mp3',
  '河': 'audio/tts/t_2aa34a212476.mp3',
  '泠': 'audio/tts/t_2a00fe052a22.mp3',
  '注': 'audio/tts/t_e566be729dc0.mp3',
  '泳': 'audio/tts/t_e94720352f3c.mp3',
  '活': 'audio/tts/t_f3e7a5b215b1.mp3',
  '流': 'audio/tts/t_e970946cca35.mp3',
  '浪': 'audio/tts/t_a23e71e77f32.mp3',
  '涼': 'audio/tts/t_6b4995b2f0e5.mp3',
  '淨': 'audio/tts/t_a6a4387d484f.mp3',
  '清': 'audio/tts/t_e577cd812ea4.mp3',
  '游': 'audio/tts/t_666e80f7ce43.mp3',
  '湖': 'audio/tts/t_58c2d9447ca6.mp3',
  '漸': 'audio/tts/t_77e8e1e9d929.mp3',
  '潔': 'audio/tts/t_4b3e2eea2a73.mp3',
  '澈': 'audio/tts/t_ed71998a73be.mp3',
  '瀆': 'audio/tts/t_55e8b9ffbb5f.mp3',
  '烏': 'audio/tts/t_5ec08aeaaddc.mp3',
  '烤': 'audio/tts/t_6c1706af3064.mp3',
  '煮': 'audio/tts/t_391841be99dc.mp3',
  '爸': 'audio/tts/t_a732e56e22fb.mp3',
  '片': 'audio/tts/t_8f603fb51d3b.mp3',
  '版': 'audio/tts/t_3da4ed2a6f90.mp3',
  '牛': 'audio/tts/t_bf9b3e9c32c4.mp3',
  '物': 'audio/tts/t_bea55d0635be.mp3',
  '玩': 'audio/tts/t_d0ae305f3b3f.mp3',
  '班': 'audio/tts/t_1f7fea733e64.mp3',
  '理': 'audio/tts/t_1162f253d44c.mp3',
  '琴': 'audio/tts/t_aef8cdec9f70.mp3',
  '琹': 'audio/tts/t_029c8a50578b.mp3',
  '環': 'audio/tts/t_460363f30f4b.mp3',
  '留': 'audio/tts/t_0990e460add3.mp3',
  '畫': 'audio/tts/t_6b17ff448685.mp3',
  '疊': 'audio/tts/t_6ae87e268f4a.mp3',
  '疏': 'audio/tts/t_64a53134842e.mp3',
  '百': 'audio/tts/t_501367f95368.mp3',
  '的': 'audio/tts/t_0746bd624955.mp3',
  '盛': 'audio/tts/t_942006d3a26d.mp3',
  '盞': 'audio/tts/t_b66435ce95c1.mp3',
  '盤': 'audio/tts/t_54fa756d4577.mp3',
  '目': 'audio/tts/t_3a0ea34a22f0.mp3',
  '看': 'audio/tts/t_5f386ebdbb5c.mp3',
  '真': 'audio/tts/t_e756c6ef2a8e.mp3',
  '眼': 'audio/tts/t_6191d800ec61.mp3',
  '碼': 'audio/tts/t_52d9df0d194e.mp3',
  '神': 'audio/tts/t_87a94db45b3b.mp3',
  '禮': 'audio/tts/t_d1be5bbb52b1.mp3',
  '秋': 'audio/tts/t_8d8f4aeca850.mp3',
  '稍': 'audio/tts/t_d674e4188c1b.mp3',
  '空': 'audio/tts/t_82ca4a6ba635.mp3',
  '穿': 'audio/tts/t_a4021ccf1a94.mp3',
  '窗': 'audio/tts/t_1a3d1ffd196c.mp3',
  '端': 'audio/tts/t_d4b81ec29900.mp3',
  '筆': 'audio/tts/t_d0bb9b2b8ea7.mp3',
  '答': 'audio/tts/t_8bc965a1ed9e.mp3',
  '管': 'audio/tts/t_cb76c11dabd4.mp3',
  '簞': 'audio/tts/t_e2ceb4dfdc35.mp3',
  '簡': 'audio/tts/t_b02e272d6419.mp3',
  '簿': 'audio/tts/t_09703483c087.mp3',
  '精': 'audio/tts/t_fcb83b62bc0a.mp3',
  '紙': 'audio/tts/t_c899fb51e356.mp3',
  '細': 'audio/tts/t_a7c522dc20d5.mp3',
  '絜': 'audio/tts/t_4ca247510afd.mp3',
  '給': 'audio/tts/t_8ce32f2528cc.mp3',
  '綠': 'audio/tts/t_d0ca87cdb62b.mp3',
  '練': 'audio/tts/t_e409f96ac106.mp3',
  '美': 'audio/tts/t_88583a5ba07c.mp3',
  '習': 'audio/tts/t_91e7dd6558a6.mp3',
  '翔': 'audio/tts/t_9ae790e25b6c.mp3',
  '老': 'audio/tts/t_4b6e3ccb72b2.mp3',
  '考': 'audio/tts/t_ed96d74c8ab8.mp3',
  '耍': 'audio/tts/t_6d8cbb830ed1.mp3',
  '聲': 'audio/tts/t_e794d72cfb96.mp3',
  '聽': 'audio/tts/t_3fe500d7bcc1.mp3',
  '舒': 'audio/tts/t_421b14631d01.mp3',
  '舞': 'audio/tts/t_873c53142889.mp3',
  '花': 'audio/tts/t_9be4611e164b.mp3',
  '芳': 'audio/tts/t_1772f47e6ba0.mp3',
  '苹': 'audio/tts/t_49c671532353.mp3',
  '茶': 'audio/tts/t_97a08c17dc8f.mp3',
  '菓': 'audio/tts/t_41298ef20332.mp3',
  '菔': 'audio/tts/t_aed86599a282.mp3',
  '菜': 'audio/tts/t_7b4bb888fb65.mp3',
  '葉': 'audio/tts/t_457d1ab014d8.mp3',
  '著': 'audio/tts/t_5e9f34b708d1.mp3',
  '蓉': 'audio/tts/t_aa31420705f1.mp3',
  '蔬': 'audio/tts/t_79b665d41790.mp3',
  '薄': 'audio/tts/t_fc04b183b0f6.mp3',
  '蛙': 'audio/tts/t_e2a7b34f6173.mp3',
  '衣': 'audio/tts/t_cb6d35842549.mp3',
  '裏': 'audio/tts/t_527c2bac56c0.mp3',
  '要': 'audio/tts/t_93e27107a133.mp3',
  '見': 'audio/tts/t_7ac94c1ab970.mp3',
  '訊': 'audio/tts/t_ee1a2c8bb093.mp3',
  '記': 'audio/tts/t_5ed8c6157373.mp3',
  '設': 'audio/tts/t_266fb7583f2f.mp3',
  '許': 'audio/tts/t_088a5c7a8187.mp3',
  '証': 'audio/tts/t_055db9a9869d.mp3',
  '試': 'audio/tts/t_a43c1a92e8d9.mp3',
  '認': 'audio/tts/t_939e7447d4ef.mp3',
  '說': 'audio/tts/t_529c56f08a18.mp3',
  '課': 'audio/tts/t_ba6e4ede02e7.mp3',
  '請': 'audio/tts/t_815126e2c516.mp3',
  '講': 'audio/tts/t_b0ae4b1f55b7.mp3',
  '護': 'audio/tts/t_b54b871d5bf0.mp3',
  '讀': 'audio/tts/t_c6468898e1f1.mp3',
  '變': 'audio/tts/t_f80fbaec9303.mp3',
  '豊': 'audio/tts/t_c339348bf65a.mp3',
  '豐': 'audio/tts/t_5b9ce685dd66.mp3',
  '貌': 'audio/tts/t_6d7b75f92d0f.mp3',
  '貓': 'audio/tts/t_043c21967a1a.mp3',
  '買': 'audio/tts/t_a4a97dbdaea1.mp3',
  '費': 'audio/tts/t_841534d30dbd.mp3',
  '起': 'audio/tts/t_29195326fd13.mp3',
  '趟': 'audio/tts/t_9e90e2c0b6f5.mp3',
  '趣': 'audio/tts/t_cc169792a6d2.mp3',
  '跑': 'audio/tts/t_15160b8ab8f9.mp3',
  '路': 'audio/tts/t_de80bdbd702a.mp3',
  '跳': 'audio/tts/t_8449cf0cf425.mp3',
  '身': 'audio/tts/t_44a60d99966c.mp3',
  '車': 'audio/tts/t_47782cc9bccb.mp3',
  '這': 'audio/tts/t_c3733f486e3a.mp3',
  '進': 'audio/tts/t_d1255ded085b.mp3',
  '道': 'audio/tts/t_a33670427c5d.mp3',
  '還': 'audio/tts/t_755dfd435b4d.mp3',
  '都': 'audio/tts/t_d51dd8d130ce.mp3',
  '鉛': 'audio/tts/t_0f81e5ad13c0.mp3',
  '鋼': 'audio/tts/t_03ae2ce6525f.mp3',
  '錢': 'audio/tts/t_04ffe5d37530.mp3',
  '鏡': 'audio/tts/t_a675a8e931ad.mp3',
  '長': 'audio/tts/t_4d2263f11266.mp3',
  '開': 'audio/tts/t_99529c90aed3.mp3',
  '關': 'audio/tts/t_c56d81678d13.mp3',
  '陽': 'audio/tts/t_95419454758b.mp3',
  '隻': 'audio/tts/t_98f50781d627.mp3',
  '雙': 'audio/tts/t_96c73e5e2dd1.mp3',
  '雨': 'audio/tts/t_8995b8979971.mp3',
  '青': 'audio/tts/t_845d1da87f89.mp3',
  '靜': 'audio/tts/t_d9a4bb929e83.mp3',
  '非': 'audio/tts/t_748eed1c9629.mp3',
  '面': 'audio/tts/t_4dfa006d756d.mp3',
  '鞋': 'audio/tts/t_010642fdeb65.mp3',
  '頁': 'audio/tts/t_d04825997b36.mp3',
  '頂': 'audio/tts/t_09fd153079db.mp3',
  '頭': 'audio/tts/t_e349ae133850.mp3',
  '題': 'audio/tts/t_39ec5783e2f6.mp3',
  '風': 'audio/tts/t_0b703039737f.mp3',
  '飛': 'audio/tts/t_9cedb8bebca1.mp3',
  '食': 'audio/tts/t_d46696735b6a.mp3',
  '飯': 'audio/tts/t_00619b09692c.mp3',
  '館': 'audio/tts/t_acb46ae1f7a6.mp3',
  '香': 'audio/tts/t_7ba41552d7e5.mp3',
  '騎': 'audio/tts/t_e4ae8138bf7d.mp3',
  '體': 'audio/tts/t_c1f64550e499.mp3',
  '高': 'audio/tts/t_b096b3f5acd6.mp3',
  '魚': 'audio/tts/t_32cac33e2772.mp3',
  '鮮': 'audio/tts/t_8a8d66c36e9f.mp3',
  '鳥': 'audio/tts/t_716ea3c57cbd.mp3',
  '麗': 'audio/tts/t_3e87af4859f5.mp3',
  '黃': 'audio/tts/t_6f96741c2562.mp3',
  '黑': 'audio/tts/t_1518fc4aa7c0.mp3',
  '鼠': 'audio/tts/t_fbcd574974fb.mp3',
  '齊': 'audio/tts/t_681bb1d32237.mp3',
  '齌': 'audio/tts/t_92722aa9c833.mp3',
  '，': 'audio/tts/t_87525fe8ff30.mp3',
  '一起': 'audio/tts/t_3a85181e8e3c.mp3',
  '上學': 'audio/tts/t_fd9d2eb2e588.mp3',
  '上課': 'audio/tts/t_6775cd60307c.mp3',
  '下着': 'audio/tts/t_a6730f134ba7.mp3',
  '下雨': 'audio/tts/t_b94ed83e391b.mp3',
  '不但': 'audio/tts/t_da36ed59706e.mp3',
  '不用': 'audio/tts/t_78ac1ae08fe6.mp3',
  '並不': 'audio/tts/t_729465bddbb7.mp3',
  '亂丟': 'audio/tts/t_97e34dedd007.mp3',
  '今天': 'audio/tts/t_17e83cc25e22.mp3',
  '今晚': 'audio/tts/t_83e252a1d961.mp3',
  '這次': 'audio/tts/t_fa74f7a982af.mp3',
  '仍然': 'audio/tts/t_25598133d536.mp3',
  '但是': 'audio/tts/t_1c2da40d6d2f.mp3',
  '借書': 'audio/tts/t_23276951f5fe.mp3',
  '假期': 'audio/tts/t_f2170b231678.mp3',
  '公園': 'audio/tts/t_1c7fff2e2e56.mp3',
  '出門': 'audio/tts/t_0776f755a9e3.mp3',
  '分數': 'audio/tts/t_abb84b4596c7.mp3',
  '割草': 'audio/tts/t_bb7a3e077aae.mp3',
  '功課': 'audio/tts/t_ee4f75a22965.mp3',
  '取得': 'audio/tts/t_f06412750f05.mp3',
  '吃糖': 'audio/tts/t_1341b02d6a1a.mp3',
  '同學': 'audio/tts/t_ee964e3dce25.mp3',
  '哥哥': 'audio/tts/t_b91fac808bde.mp3',
  '唱歌': 'audio/tts/t_646478a9b069.mp3',
  '喝茶': 'audio/tts/t_d853579afd05.mp3',
  '回家': 'audio/tts/t_a56342e7f225.mp3',
  '因為': 'audio/tts/t_2b3304fa30d2.mp3',
  '垃圾': 'audio/tts/t_09da0af83403.mp3',
  '堅持': 'audio/tts/t_04f0eab6e0d2.mp3',
  '堆沙': 'audio/tts/t_dfcaa0e306e3.mp3',
  '外面': 'audio/tts/t_0f595cb1020c.mp3',
  '大家': 'audio/tts/t_4cad53b6ae4e.mp3',
  '大雨': 'audio/tts/t_89359e4ac0ab.mp3',
  '天晴': 'audio/tts/t_5c85101a740d.mp3',
  '天氣': 'audio/tts/t_b598f0e257f2.mp3',
  '太陽': 'audio/tts/t_30ee90bdba2c.mp3',
  '失敗': 'audio/tts/t_a1d7783338f0.mp3',
  '奶奶': 'audio/tts/t_fe4c23d62830.mp3',
  '如果': 'audio/tts/t_24a9af6fab62.mp3',
  '妹妹': 'audio/tts/t_3d647cfdc349.mp3',
  '姐姐': 'audio/tts/t_2d4e3b70d0ee.mp3',
  '媽媽': 'audio/tts/t_63248c6d5be3.mp3',
  '客廳': 'audio/tts/t_fec72da4a970.mp3',
  '家裏': 'audio/tts/t_ade959f36226.mp3',
  '容易': 'audio/tts/t_d293c4d7ec5d.mp3',
  '寫字': 'audio/tts/t_7cd85cad4f57.mp3',
  '射球': 'audio/tts/t_78bf074fc407.mp3',
  '小狗': 'audio/tts/t_e974ae496688.mp3',
  '小貓': 'audio/tts/t_657b6080f074.mp3',
  '小魚': 'audio/tts/t_6db7b7494833.mp3',
  '小鳥': 'audio/tts/t_0b1784783009.mp3',
  '工整': 'audio/tts/t_f1929b03c294.mp3',
  '市場': 'audio/tts/t_b26ab813edca.mp3',
  '帽子': 'audio/tts/t_8dccc4a2e6ce.mp3',
  '廚房': 'audio/tts/t_39cb0c0be783.mp3',
  '弟弟': 'audio/tts/t_d61f999a2911.mp3',
  '彈琴': 'audio/tts/t_ab2e86750cd8.mp3',
  '很多': 'audio/tts/t_432d02cc2156.mp3',
  '很大': 'audio/tts/t_a0fd2e184348.mp3',
  '很滑': 'audio/tts/t_d3567e8a4c37.mp3',
  '很熱': 'audio/tts/t_95b730dee36d.mp3',
  '很累': 'audio/tts/t_e26b21851d88.mp3',
  '愛護': 'audio/tts/t_a64fe7056a1a.mp3',
  '慢慢': 'audio/tts/t_037eefd0ddb2.mp3',
  '我們': 'audio/tts/t_041bc94963ae.mp3',
  '戴上': 'audio/tts/t_8c4f938db19f.mp3',
  '房間': 'audio/tts/t_aab563b3409e.mp3',
  '所以': 'audio/tts/t_2bfd44a44994.mp3',
  '打球': 'audio/tts/t_e47186582ba8.mp3',
  '抽空': 'audio/tts/t_b4e3feeed74b.mp3',
  '拿出': 'audio/tts/t_ea5deba01e64.mp3',
  '捉魚': 'audio/tts/t_323203c1c024.mp3',
  '採蜜': 'audio/tts/t_76d2164f37a4.mp3',
  '操場': 'audio/tts/t_d2b742d895d3.mp3',
  '收拾': 'audio/tts/t_ccf10dbeb6d7.mp3',
  '放假': 'audio/tts/t_5f191c3d9473.mp3',
  '旅行': 'audio/tts/t_92c1b6c8fd3f.mp3',
  '日記': 'audio/tts/t_2a863cf8329c.mp3',
  '早上': 'audio/tts/t_172fb7196ffc.mp3',
  '早起': 'audio/tts/t_7b70e8b76439.mp3',
  '早點': 'audio/tts/t_0e4d471f8cc4.mp3',
  '明天': 'audio/tts/t_b76ce230d32c.mp3',
  '晚上': 'audio/tts/t_76a41594927d.mp3',
  '晚飯': 'audio/tts/t_781fccec9f67.mp3',
  '曬衣': 'audio/tts/t_e4c55b7acfc4.mp3',
  '替我': 'audio/tts/t_7836878d6cd6.mp3',
  '枝頭': 'audio/tts/t_34171bc019fe.mp3',
  '樹上': 'audio/tts/t_278ea86e2ca6.mp3',
  '池塘': 'audio/tts/t_c4e76a65bc58.mp3',
  '沙池': 'audio/tts/t_ab4d7de018c5.mp3',
  '沙發': 'audio/tts/t_9f66c3e69b6e.mp3',
  '游水': 'audio/tts/t_cc491205e467.mp3',
  '游泳': 'audio/tts/t_b66f447bfcb9.mp3',
  '溫習': 'audio/tts/t_7cb5996b90c8.mp3',
  '澆花': 'audio/tts/t_92ff4df7cdc4.mp3',
  '灰心': 'audio/tts/t_5649d3bfb417.mp3',
  '炒菜': 'audio/tts/t_8fc4658325ae.mp3',
  '煮湯': 'audio/tts/t_bcaf0683995d.mp3',
  '煮麵': 'audio/tts/t_e3086c1792a9.mp3',
  '爸爸': 'audio/tts/t_c86d1645007f.mp3',
  '球場': 'audio/tts/t_c258417deca5.mp3',
  '環境': 'audio/tts/t_d67c52e0e449.mp3',
  '用心': 'audio/tts/t_03778f5ccf84.mp3',
  '田裏': 'audio/tts/t_41b3c8c4f53e.mp3',
  '留在': 'audio/tts/t_31ab5f1966fd.mp3',
  '畫畫': 'audio/tts/t_a974a36a70d1.mp3',
  '看書': 'audio/tts/t_9145b6ced328.mp3',
  '睡覺': 'audio/tts/t_da597cc01787.mp3',
  '種菜': 'audio/tts/t_bca61ef6f8ce.mp3',
  '練習': 'audio/tts/t_2ff4a6f70b6b.mp3',
  '老師': 'audio/tts/t_40e66668206b.mp3',
  '考試': 'audio/tts/t_2aa23aaed8ee.mp3',
  '而且': 'audio/tts/t_ca7cc7aa2255.mp3',
  '肚子': 'audio/tts/t_e10227da4977.mp3',
  '花叢': 'audio/tts/t_cc8ff8830752.mp3',
  '花園': 'audio/tts/t_0e2aee89b96c.mp3',
  '蛋糕': 'audio/tts/t_9418e3485462.mp3',
  '蜜蜂': 'audio/tts/t_f033ebd644b4.mp3',
  '螞蟻': 'audio/tts/t_30ea7aeb5dc2.mp3',
  '衣服': 'audio/tts/t_2e34963bf893.mp3',
  '認真': 'audio/tts/t_b204d94eee5d.mp3',
  '課室': 'audio/tts/t_0aaeeeea3b67.mp3',
  '講課': 'audio/tts/t_77666181431f.mp3',
  '讀書': 'audio/tts/t_48399be761b1.mp3',
  '買菜': 'audio/tts/t_eb49117f608d.mp3',
  '走路': 'audio/tts/t_f07f798e421b.mp3',
  '起來': 'audio/tts/t_ce386d628357.mp3',
  '跑步': 'audio/tts/t_8eb2fcd697eb.mp3',
  '跳舞': 'audio/tts/t_575d491eaa8c.mp3',
  '踢球': 'audio/tts/t_710dc9f17723.mp3',
  '轉涼': 'audio/tts/t_233a818707f7.mp3',
  '辦成': 'audio/tts/t_acb8467819a0.mp3',
  '農夫': 'audio/tts/t_9faf7ebb70bd.mp3',
  '這件': 'audio/tts/t_d440b9160178.mp3',
  '週末': 'audio/tts/t_b5ef4b947061.mp3',
  '進步': 'audio/tts/t_2af5b0f16ede.mp3',
  '過來': 'audio/tts/t_de50c30ddcf8.mp3',
  '遠足': 'audio/tts/t_e687d8f53836.mp3',
  '郊外': 'audio/tts/t_768df1b2712e.mp3',
  '野餐': 'audio/tts/t_603c97755f01.mp3',
  '釣魚': 'audio/tts/t_15acc9d9d9c6.mp3',
  '開車': 'audio/tts/t_94cd4c0deb2c.mp3',
  '陽台': 'audio/tts/t_33e09c12963b.mp3',
  '雖然': 'audio/tts/t_b434f01466db.mp3',
  '飛舞': 'audio/tts/t_326d337d9547.mp3',
  '食物': 'audio/tts/t_8183773155bc.mp3',
  '餓了': 'audio/tts/t_bf841bb2a41d.mp3',
  '齊心': 'audio/tts/t_d3325cb5a1e6.mp3',
  '一匹馬': 'audio/tts/t_97a6a2ddd7d5.mp3',
  '一塊磚': 'audio/tts/t_928de14e40ef.mp3',
  '一塊糖': 'audio/tts/t_21d2123c2051.mp3',
  '一封信': 'audio/tts/t_8d13c16f8ecd.mp3',
  '一座山': 'audio/tts/t_cc1462e12231.mp3',
  '一座橋': 'audio/tts/t_c4f58b49da07.mp3',
  '一扇窗': 'audio/tts/t_38f2ea45eab4.mp3',
  '一扇門': 'audio/tts/t_2cb8d7229f4c.mp3',
  '一把刀': 'audio/tts/t_ac89fd5900f7.mp3',
  '一本書': 'audio/tts/t_8d8e536326b9.mp3',
  '一朵花': 'audio/tts/t_e04cc410a6ab.mp3',
  '一束花': 'audio/tts/t_b1524d7803a6.mp3',
  '一條江': 'audio/tts/t_f7a686c833b6.mp3',
  '一條河': 'audio/tts/t_086d5a1cb9bb.mp3',
  '一條繩': 'audio/tts/t_462ebc9f60d3.mp3',
  '一條蛇': 'audio/tts/t_00442567d3e2.mp3',
  '一條路': 'audio/tts/t_2ea7485bd609.mp3',
  '一條魚': 'audio/tts/t_38f8fca707e8.mp3',
  '一棵樹': 'audio/tts/t_86d6e0243b72.mp3',
  '一棵竹': 'audio/tts/t_7e4ec33f37ca.mp3',
  '一棵草': 'audio/tts/t_da82607d85c0.mp3',
  '一棵菜': 'audio/tts/t_f44ba06c90e5.mp3',
  '一盞燈': 'audio/tts/t_cba601367c48.mp3',
  '一隻羊': 'audio/tts/t_219f72d1b42e.mp3',
  '一隻蛋': 'audio/tts/t_f79cfe2cbaca.mp3',
  '一面旗': 'audio/tts/t_9c306b87be82.mp3',
  '一面牆': 'audio/tts/t_0edfd6d5cb4c.mp3',
  '一面鼓': 'audio/tts/t_24071d197ce1.mp3',
  '一頭牛': 'audio/tts/t_aa7731daad9b.mp3',
  '下課後': 'audio/tts/t_bca2296490e3.mp3',
  '圖書館': 'audio/tts/t_14efaf47efe9.mp3',
  '小朋友': 'audio/tts/t_2cc2746fba4a.mp3',
  '看電視': 'audio/tts/t_59fc463699a8.mp3',
  '答對了': 'audio/tts/ok.mp3',
  '花開了': 'audio/tts/t_7d546c86fec2.mp3',
  '黑板上': 'audio/tts/t_f9104f7fe5de.mp3',
  '一份功課': 'audio/tts/t_2ed5e84ba2c7.mp3',
  '一份問卷': 'audio/tts/t_e34518ece8b6.mp3',
  '一份報紙': 'audio/tts/t_4920aaadfcf8.mp3',
  '一份考卷': 'audio/tts/t_73992b3ac78a.mp3',
  '一份講義': 'audio/tts/t_d78e78f4f479.mp3',
  '一個蘋果': 'audio/tts/t_d946b9aa21d3.mp3',
  '一塊石頭': 'audio/tts/t_c2f3e17e8843.mp3',
  '一塊肥皂': 'audio/tts/t_eca3d6d3908f.mp3',
  '一塊麵包': 'audio/tts/t_3f71e7b4f225.mp3',
  '一幅地圖': 'audio/tts/t_5b5d016c3f35.mp3',
  '一張信箋': 'audio/tts/t_8274d53beee2.mp3',
  '一張報紙': 'audio/tts/t_a687c6d79a79.mp3',
  '一張桌子': 'audio/tts/t_c774513c81ca.mp3',
  '一張海報': 'audio/tts/t_6e33bda179c6.mp3',
  '一張照片': 'audio/tts/t_19b68d314fef.mp3',
  '一張畫紙': 'audio/tts/t_1fc99b43f78e.mp3',
  '一把鑰匙': 'audio/tts/t_dc88a6e7a76c.mp3',
  '一把雨傘': 'audio/tts/t_aa4d1187f3d1.mp3',
  '一支鉛筆': 'audio/tts/t_9778e772e6d6.mp3',
  '一束稻穗': 'audio/tts/t_083dfd15e4a0.mp3',
  '一束青菜': 'audio/tts/t_d84e826eee10.mp3',
  '一條褲子': 'audio/tts/t_6b7c7a8a5274.mp3',
  '一棵樹苗': 'audio/tts/t_20201458f734.mp3',
  '一疊信紙': 'audio/tts/t_cb0df86dc72c.mp3',
  '一疊紙牌': 'audio/tts/t_0eafd0f7f369.mp3',
  '一隻小鳥': 'audio/tts/t_a4acd31a10d3.mp3',
  '一雙手套': 'audio/tts/t_23b56110dd4f.mp3',
  '一雙眼睛': 'audio/tts/t_df3f7cd0f630.mp3',
  '一雙筷子': 'audio/tts/t_56a2b0d994d0.mp3',
  '一雙襪子': 'audio/tts/t_67baf8ab15a0.mp3',
  '一雙鞋子': 'audio/tts/t_f580ec1bc5bc.mp3',
  '一面鏡子': 'audio/tts/t_6b35fba9f301.mp3',
  '一頂帽子': 'audio/tts/t_7900b82db80b.mp3',
  '下雪了！': 'audio/tts/t_701ca5336056.mp3',
  '天亮了，': 'audio/tts/t_d8abb2db6caa.mp3',
  '小鳥會飛': 'audio/tts/t_83440371e852.mp3',
  '我去釣魚': 'audio/tts/t_c45055d5b183.mp3',
  '我寫日記': 'audio/tts/t_3313f0d74ac6.mp3',
  '我愛讀書': 'audio/tts/t_ab37e08b3593.mp3',
  '本關完成': 'audio/tts/level_clear.mp3',
  '雨下很大': 'audio/tts/t_63447e1b7ce3.mp3',
  '風吹過來': 'audio/tts/t_9fa178e1945b.mp3',
  '魚在游水': 'audio/tts/t_461633069eee.mp3',
  '一疊作業紙': 'audio/tts/t_dd4efb22c098.mp3',
  '一疊明信片': 'audio/tts/t_bc9c8562dda2.mp3',
  '下雨過後，': 'audio/tts/t_325d2fa160d8.mp3',
  '他歎了一聲': 'audio/tts/t_d58f2a387131.mp3',
  '冬天到了，': 'audio/tts/t_61ea3b52308b.mp3',
  '包子真香。': 'audio/tts/t_b931086605c2.mp3',
  '卻捉不到。': 'audio/tts/t_04a889dc05a1.mp3',
  '叫了人一聲': 'audio/tts/t_8979ef30dd19.mp3',
  '哥哥去踢球': 'audio/tts/t_e187118c0bd3.mp3',
  '太陽升起來': 'audio/tts/t_d955d6e363fa.mp3',
  '奶奶在喝茶': 'audio/tts/t_83c68fafc1f1.mp3',
  '妹妹在畫畫': 'audio/tts/t_22e34765f047.mp3',
  '媽媽在煮飯': 'audio/tts/t_14b70b09fdae.mp3',
  '媽媽在種菜': 'audio/tts/t_189fda440040.mp3',
  '媽媽煮晚飯': 'audio/tts/t_02d89ca2de57.mp3',
  '小狗在睡覺': 'audio/tts/t_71a31f4886c6.mp3',
  '小貓在捉魚': 'audio/tts/t_a17d7ea8cb42.mp3',
  '店門剛開，': 'audio/tts/t_d0f38fb5c7a2.mp3',
  '弟弟在看書': 'audio/tts/t_66e53c213d6e.mp3',
  '弟弟愛吃糖': 'audio/tts/t_b6ebdcc2eeb1.mp3',
  '我們去公園': 'audio/tts/t_f435f788e258.mp3',
  '戴好帽子，': 'audio/tts/t_d137d4ad35c4.mp3',
  '拍了手一下': 'audio/tts/t_c33a2766df74.mp3',
  '放進書包，': 'audio/tts/t_4772a392fdf4.mp3',
  '敲了門一下': 'audio/tts/t_32f5d2aa1a76.mp3',
  '晚上八時，': 'audio/tts/t_b14670631bce.mp3',
  '本關完成！': 'audio/tts/level_clear_bang.mp3',
  '爸爸在開車': 'audio/tts/t_6fd6c0464910.mp3',
  '牠追着跑，': 'audio/tts/t_6942b24ea6c5.mp3',
  '看了書一次': 'audio/tts/t_66a805254aa5.mp3',
  '老師在講課': 'audio/tts/t_4d2156ae9029.mp3',
  '蜜蜂在採蜜': 'audio/tts/t_da9be2aec66d.mp3',
  '螞蟻搬食物': 'audio/tts/t_21238b7782dd.mp3',
  '請打開課本': 'audio/tts/t_103ef58350a6.mp3',
  '跟着打雷，': 'audio/tts/t_782522a1d38c.mp3',
  '農夫在割草': 'audio/tts/t_d290d33f4119.mp3',
  '門響了一聲': 'audio/tts/t_0913b313a554.mp3',
  '青蛙會跳水': 'audio/tts/t_6eb4d4016890.mp3',
  '上課鐘響了。': 'audio/tts/t_672bfb35830f.mp3',
  '下午才下山，': 'audio/tts/t_86038a98e1a2.mp3',
  '下午放學後，': 'audio/tts/t_e9ed709f3947.mp3',
  '下課鐘響了。': 'audio/tts/t_06b726970b60.mp3',
  '中秋節那天，': 'audio/tts/t_e6bf2d48338f.mp3',
  '他換上便服，': 'audio/tts/t_98901fa11155.mp3',
  '他播下種子，': 'audio/tts/t_fa5dcf3a3dd1.mp3',
  '他放下魚餌，': 'audio/tts/t_4b5db594f7e5.mp3',
  '他開心極了。': 'audio/tts/t_c5805cd8d102.mp3',
  '停在花朵上，': 'audio/tts/t_6685b490cddd.mp3',
  '先探望小羊，': 'audio/tts/t_01b0d68ada71.mp3',
  '公雞喔喔叫，': 'audio/tts/t_91cc19113f59.mp3',
  '再倒進水杯，': 'audio/tts/t_0cd5bdaba6ab.mp3',
  '再做練習題，': 'audio/tts/t_08cc23c856c3.mp3',
  '再寫下說明，': 'audio/tts/t_8f331f7d4fa1.mp3',
  '再幫忙洗碗，': 'audio/tts/t_1f3cfb4dcd37.mp3',
  '再練習造句，': 'audio/tts/t_76134926898d.mp3',
  '又複習生字，': 'audio/tts/t_c9641230f703.mp3',
  '因為路很遠，': 'audio/tts/t_64193229693e.mp3',
  '妹妹在畫圖畫': 'audio/tts/t_9fe94e8b995e.mp3',
  '姐姐喜歡跳舞': 'audio/tts/t_4ef360bedac7.mp3',
  '媽媽生病了，': 'audio/tts/t_f66f2f3dd8af.mp3',
  '寶寶哭了一聲': 'audio/tts/t_7db6d854b907.mp3',
  '小朋友在唱歌': 'audio/tts/t_45fb74c09c48.mp3',
  '小貓在捉老鼠': 'audio/tts/t_cff936b09fcd.mp3',
  '小鳥飛得很高': 'audio/tts/t_bca43f69f0b8.mp3',
  '小鴨游過來，': 'audio/tts/t_fb18b8291a41.mp3',
  '就不怕冷了。': 'audio/tts/t_9afc38cf3a11.mp3',
  '就不怕冷了，': 'audio/tts/t_c9ca3fc92ba6.mp3',
  '弟弟在吃蘋果': 'audio/tts/t_73bf3c663ccc.mp3',
  '得了第二名，': 'audio/tts/t_db105bb6b92c.mp3',
  '忙着採花蜜！': 'audio/tts/t_380eee898a2d.mp3',
  '忽然停電了，': 'audio/tts/t_cc02b1d5e346.mp3',
  '忽然閃電了！': 'audio/tts/t_51f87a8decb1.mp3',
  '我們一起回家': 'audio/tts/t_d11a508791e5.mp3',
  '我們先洗手，': 'audio/tts/t_4995f944a0ed.mp3',
  '我們去上學。': 'audio/tts/t_55c1702d5d6e.mp3',
  '我打開書包，': 'audio/tts/t_53ec8eeeb760.mp3',
  '我洗漱完畢，': 'audio/tts/t_30332ae73090.mp3',
  '我穿上毛衣，': 'audio/tts/t_49cab8248158.mp3',
  '我騎得很穩！': 'audio/tts/t_826615b6419b.mp3',
  '拿出練習簿，': 'audio/tts/t_e08196723e38.mp3',
  '星期五晚上，': 'audio/tts/t_56c7250bcc89.mp3',
  '星期六下午，': 'audio/tts/t_360bff23bed7.mp3',
  '星期六早上，': 'audio/tts/t_80886a16bd72.mp3',
  '星期天早上，': 'audio/tts/t_83d5b37d8afa.mp3',
  '晚上燈亮了，': 'audio/tts/t_e589801306ad.mp3',
  '晴蛙會跳水。': 'audio/tts/t_d5955f41b91c.mp3',
  '月亮又圓又亮': 'audio/tts/t_c75215a3e73d.mp3',
  '沒有人摔倒。': 'audio/tts/t_95beb2cf72bf.mp3',
  '湖水清澈見底': 'audio/tts/t_a8427cc18568.mp3',
  '湖面很平靜，': 'audio/tts/t_1f67f8ae474c.mp3',
  '爸爸在看報紙': 'audio/tts/t_ac0cf4ce52a9.mp3',
  '盼望收成好。': 'audio/tts/t_46ee07d3188a.mp3',
  '碼碼在煮飯。': 'audio/tts/t_bbb559bc1aad.mp3',
  '終於學會了。': 'audio/tts/t_fb6d2dec0c13.mp3',
  '背上小書包，': 'audio/tts/t_3a666f2e91d8.mp3',
  '花開得很美麗': 'audio/tts/t_d39c51f1417e.mp3',
  '請打開課夲。': 'audio/tts/t_925149a9d21c.mp3',
  '請把窗戶關上': 'audio/tts/t_8cf316d1fa1e.mp3',
  '貼在壁報上，': 'audio/tts/t_fe78c5bc0ec6.mp3',
  '農場醒過來！': 'audio/tts/t_1c438bd03654.mp3',
  '運動會那天，': 'audio/tts/t_9765b72a6b3b.mp3',
  '開始寫功課！': 'audio/tts/t_ac5d68f59534.mp3',
  '開心吃晚飯！': 'audio/tts/t_5e4f3943c99e.mp3',
  '電終於來了。': 'audio/tts/t_1c5cb5465cba.mp3',
  '點了兩碗麵，': 'audio/tts/t_07190376fc0a.mp3',
  '齊聲說早安。': 'audio/tts/t_d2888f2bf689.mp3',
  '一邊走一邊吃，': 'audio/tts/t_469cdea48e36.mp3',
  '上課前十分鐘，': 'audio/tts/t_38a9803da777.mp3',
  '今天的太陽很大': 'audio/tts/t_7b40d9cdb8a3.mp3',
  '他大聲叫了一聲': 'audio/tts/t_319936f5a46e.mp3',
  '他對人很有禮貌': 'audio/tts/t_47963747fdca.mp3',
  '他很專注地看書': 'audio/tts/t_137224d477ca.mp3',
  '他戴著一副手套': 'audio/tts/t_c00bb05a5fcd.mp3',
  '他戴著一副眼鏡': 'audio/tts/t_be5679d8ef58.mp3',
  '他認真地畫畫，': 'audio/tts/t_37d045aad8eb.mp3',
  '他釣到一條魚！': 'audio/tts/t_3d040d158026.mp3',
  '做了幾頁筆記，': 'audio/tts/t_5d4364f95767.mp3',
  '傍晚我們回家！': 'audio/tts/t_f064f1e78c1c.mp3',
  '全家坐在一起，': 'audio/tts/t_8011a7ea919a.mp3',
  '全家坐在客廳。': 'audio/tts/t_ffc484f4c6bf.mp3',
  '全家有說有笑。': 'audio/tts/t_8eadcfde7c1b.mp3',
  '全班為我鼓掌。': 'audio/tts/t_44f109f6ed8c.mp3',
  '兩人都很開心。': 'audio/tts/t_848d1d7553a4.mp3',
  '公園裏有很多花': 'audio/tts/t_2b6619ed8fb6.mp3',
  '再到空地試飛，': 'audio/tts/t_5e637979da17.mp3',
  '再幫忙擺碗筷，': 'audio/tts/t_1e2c2b8e4307.mp3',
  '再餵牠們青草，': 'audio/tts/t_d521c61da5cf.mp3',
  '剛好趕上早會，': 'audio/tts/t_880aa6eb6c83.mp3',
  '去澆菜園的菜，': 'audio/tts/t_b7aacf38dcf3.mp3',
  '可以安心上學。': 'audio/tts/t_6f0a615243d4.mp3',
  '吃得津津有味。': 'audio/tts/t_6f1830dfe511.mp3',
  '同學們站起來，': 'audio/tts/t_d9dc3ea9e40d.mp3',
  '哥哥在球場射球': 'audio/tts/t_5055d1deb5d8.mp3',
  '因為天氣轉涼，': 'audio/tts/t_ad67efd834d4.mp3',
  '因為肚子餓了，': 'audio/tts/t_4579404d1ab5.mp3',
  '圖書館很安靜，': 'audio/tts/t_572418f83494.mp3',
  '地上變得雪白，': 'audio/tts/t_c89984935b39.mp3',
  '坐在窗邊細讀，': 'audio/tts/t_bfbcd1e3a985.mp3',
  '大家一起種菜！': 'audio/tts/t_e9240803efe8.mp3',
  '大家走進屋內。': 'audio/tts/t_4e87e14afffa.mp3',
  '大家都很小心，': 'audio/tts/t_3d175788c580.mp3',
  '大家都很開心！': 'audio/tts/t_fa93704bb23c.mp3',
  '大家都放心了。': 'audio/tts/t_e014b3342d70.mp3',
  '大家都放心了，': 'audio/tts/t_efb52c966f7c.mp3',
  '大家都笑起來。': 'audio/tts/t_613cb1257f47.mp3',
  '大家都跑回家。': 'audio/tts/t_6dc4bae4b1c8.mp3',
  '天上出現彩虹，': 'audio/tts/t_b29bdbcea7f7.mp3',
  '天空忽然下雨！': 'audio/tts/t_a9d0af5ad022.mp3',
  '天色漸漸暗了，': 'audio/tts/t_1ac874e57157.mp3',
  '奶奶在廚房煮湯': 'audio/tts/t_1ffcda26795c.mp3',
  '奶奶在陽台曬衣': 'audio/tts/t_c8cc7e55d059.mp3',
  '奶奶坐在椅子上': 'audio/tts/t_e3d918de129b.mp3',
  '她微笑着點頭。': 'audio/tts/t_fe9b142593d0.mp3',
  '她洗乾淨蔬菜，': 'audio/tts/t_9c5942843a4b.mp3',
  '妹妹在畫圖晝。': 'audio/tts/t_1b228ba617de.mp3',
  '妹妹穿好衣服，': 'audio/tts/t_9def5e89c0e5.mp3',
  '姐姐喜歡跳午。': 'audio/tts/t_46dbd52226d1.mp3',
  '姐姐在房間彈琴': 'audio/tts/t_01d656141426.mp3',
  '媽媽在市場買菜': 'audio/tts/t_769cd32f5164.mp3',
  '媽媽在廚房炒菜': 'audio/tts/t_64dcb83ea530.mp3',
  '媽媽檢查一遍。': 'audio/tts/t_69552507feeb.mp3',
  '媽媽走進廚房，': 'audio/tts/t_65cea2b42d90.mp3',
  '媽媽露出笑容。': 'audio/tts/t_6c29dd2f3313.mp3',
  '小朋友堆雪人。': 'audio/tts/t_cceb77980fe4.mp3',
  '小烏飛得很高。': 'audio/tts/t_0a49b15eed89.mp3',
  '小貓在捉老尿。': 'audio/tts/t_846911446715.mp3',
  '小貓在沙發睡覺': 'audio/tts/t_5e28964a9036.mp3',
  '小貓看見蝴蝶！': 'audio/tts/t_d310c82464b7.mp3',
  '小魚在水裏游泳': 'audio/tts/t_41efc004c820.mp3',
  '小魚在池塘游泳': 'audio/tts/t_7efdfb2b5b6a.mp3',
  '小鳥在枝頭唱歌': 'audio/tts/t_bb70dad6bbf9.mp3',
  '小鳥在樹上唱歌': 'audio/tts/t_b585f8067626.mp3',
  '小鳥在空中飛翔': 'audio/tts/t_bc9f47e36372.mp3',
  '小鳥開始唱歌，': 'audio/tts/t_102dafc15aa3.mp3',
  '幫她蓋好被子，': 'audio/tts/t_908ba1149bbb.mp3',
  '弟弟在吃苹菓。': 'audio/tts/t_80e8a036c5e0.mp3',
  '弟弟在課室寫字': 'audio/tts/t_68281b5a3e1e.mp3',
  '弟弟寫信給朋友': 'audio/tts/t_6727df46fde9.mp3',
  '弟弟拿出畫筆，': 'audio/tts/t_b56c6512ccbf.mp3',
  '很快就上桌了，': 'audio/tts/t_1534d09092c7.mp3',
  '後來越騎越穩，': 'audio/tts/t_4a55ff9591bf.mp3',
  '心情輕鬆多了。': 'audio/tts/t_9d02620494ec.mp3',
  '忽然下起大雨。': 'audio/tts/t_81addea3ddad.mp3',
  '忽然刮起大風！': 'audio/tts/t_e44f14cf58d6.mp3',
  '我們一起去上學': 'audio/tts/t_d3e600f1465e.mp3',
  '我們來到農場。': 'audio/tts/t_36b1df91dc1a.mp3',
  '我們假期去旅行': 'audio/tts/t_67140880c102.mp3',
  '我們先量好水，': 'audio/tts/t_5255e0e14024.mp3',
  '我們慢慢地走，': 'audio/tts/t_55fdf2cadc02.mp3',
  '我們提着水桶，': 'audio/tts/t_254f98e1aa4a.mp3',
  '我們提着飼料，': 'audio/tts/t_c4de24a0b348.mp3',
  '我們搬來墊子，': 'audio/tts/t_81b77fcf20ba.mp3',
  '我們收拾玩具，': 'audio/tts/t_4365ad2f890f.mp3',
  '我們要守時守信': 'audio/tts/t_71f2a8190944.mp3',
  '我們買了六個，': 'audio/tts/t_8a96821395f9.mp3',
  '我們走到河邊，': 'audio/tts/t_257139ec9ddf.mp3',
  '我們走到菜園。': 'audio/tts/t_26c3cfb32e7a.mp3',
  '我們趕快回家。': 'audio/tts/t_718033340ffd.mp3',
  '我先整理筆記，': 'audio/tts/t_a8557933aa57.mp3',
  '我才收拾離開。': 'audio/tts/t_ff31eed68021.mp3',
  '我晚上認真溫習': 'audio/tts/t_b65460989a72.mp3',
  '我有一支新鉛筆': 'audio/tts/t_8783321e7faa.mp3',
  '我聽得入了神。': 'audio/tts/t_1147efb459c3.mp3',
  '我認真抄筆記，': 'audio/tts/t_6e08ee08e87e.mp3',
  '找到空位坐下，': 'audio/tts/t_0dd3c4af3413.mp3',
  '把房間整理好，': 'audio/tts/t_1873b2b35a5d.mp3',
  '拍了幾張照片，': 'audio/tts/t_92edd92ed20c.mp3',
  '拿出手機拍照，': 'audio/tts/t_a2ee1fb731a4.mp3',
  '接着練習跑步，': 'audio/tts/t_e6820a67f8e0.mp3',
  '最後一起伸展。': 'audio/tts/t_65886b7e6618.mp3',
  '最後衝過終點，': 'audio/tts/t_2f6b6935875c.mp3',
  '月亮又園又亮。': 'audio/tts/t_fae1397d5b71.mp3',
  '有人想走上去，': 'audio/tts/t_ed784d058401.mp3',
  '樹葉漸漸變黃了': 'audio/tts/t_d0a5dd850ade.mp3',
  '清早霧氣未散，': 'audio/tts/t_469de2fa3c9a.mp3',
  '湖水清澈見厎。': 'audio/tts/t_cedd958d67bd.mp3',
  '漁夫走到魚塘，': 'audio/tts/t_8729ab07dd67.mp3',
  '然後切成小段，': 'audio/tts/t_287d1da4f63d.mp3',
  '然後開始煮湯。': 'audio/tts/t_10f57216f1dd.mp3',
  '然後陪我下棋，': 'audio/tts/t_11d5cdaed286.mp3',
  '爸爸修好單車，': 'audio/tts/t_2bf30b01d23f.mp3',
  '爸爸在看報子。': 'audio/tts/t_d47053f34e6e.mp3',
  '爸爸在花園澆花': 'audio/tts/t_b9c9514fb28a.mp3',
  '爸爸找出電筒，': 'audio/tts/t_c3ee8523a53a.mp3',
  '牛羊走過來吃，': 'audio/tts/t_12b75394b79a.mp3',
  '留下一串水紋！': 'audio/tts/t_47c6db6882a0.mp3',
  '畫好了一隻貓！': 'audio/tts/t_5baf666dae30.mp3',
  '看見小魚游泳，': 'audio/tts/t_fa11f1874312.mp3',
  '秋天的樹葉黃了': 'audio/tts/t_0d375f1b9288.mp3',
  '終於趕上巴士，': 'audio/tts/t_cb6b2434af86.mp3',
  '終於趕到學校，': 'audio/tts/t_d177952765f7.mp3',
  '經過兩條大街，': 'audio/tts/t_2257c91c76db.mp3',
  '老師在操場跑步': 'audio/tts/t_1b1b38ec2bdc.mp3',
  '老師走進課室。': 'audio/tts/t_1fa3482c5393.mp3',
  '老師走進課室，': 'audio/tts/t_ea69a39b30b5.mp3',
  '老師連忙阻止，': 'audio/tts/t_33077b254e93.mp3',
  '老師開始點名，': 'audio/tts/t_e48955e04011.mp3',
  '而且會寫故事。': 'audio/tts/t_5ae4d8a15142.mp3',
  '能夠自己轉彎，': 'audio/tts/t_22fe46a570de.mp3',
  '花兒開得很芳香': 'audio/tts/t_a9d2f7231830.mp3',
  '花開得很美利。': 'audio/tts/t_b7b87dd36058.mp3',
  '菜苗長得很齊。': 'audio/tts/t_2b4f03c4b7ba.mp3',
  '菜葉變得翠綠！': 'audio/tts/t_dfb2bd32a38c.mp3',
  '蜜蜂在花叢飛舞': 'audio/tts/t_a09ba5407e8e.mp3',
  '蜜蜂飛來飛去，': 'audio/tts/t_b10fa409ec88.mp3',
  '誰也不想回家。': 'audio/tts/t_4c5b1043cd57.mp3',
  '課堂正式開始。': 'audio/tts/t_9d152951da27.mp3',
  '請不要浪費食物': 'audio/tts/t_c76579b769d1.mp3',
  '請把窗子關上。': 'audio/tts/t_fb3f8da145df.mp3',
  '讓我試騎一下，': 'audio/tts/t_04305edb33fe.mp3',
  '起初總是跌倒，': 'audio/tts/t_f4a0ad9619d3.mp3',
  '輕輕放到牀邊，': 'audio/tts/t_f685bd9af0b3.mp3',
  '農夫在田裏種菜': 'audio/tts/t_58a748b0c79c.mp3',
  '農夫把門鎖好。': 'audio/tts/t_566a25d291e9.mp3',
  '農夫走到田裏，': 'audio/tts/t_8f865c5f1c8a.mp3',
  '這裏的清水很涼': 'audio/tts/t_dd13d06fe044.mp3',
  '這道題目很簡單': 'audio/tts/t_f17afc2c7ba4.mp3',
  '連湯也喝光了。': 'audio/tts/t_ab6640a98999.mp3',
  '運動課開始了。': 'audio/tts/t_47534f217b09.mp3',
  '還互相比手勢，': 'audio/tts/t_dcdc89617f5b.mp3',
  '還互相笑了笑。': 'audio/tts/t_fbd3f59f440b.mp3',
  '還敢走小斜坡，': 'audio/tts/t_4ea52023c635.mp3',
  '開始練習體操，': 'audio/tts/t_9a1d05a94a59.mp3',
  '雖然今天很忙，': 'audio/tts/t_87e93b55665d.mp3',
  '風箏漸漸升高，': 'audio/tts/t_3524849e1da6.mp3',
  '風箏飛得很高！': 'audio/tts/t_6d2d6a53412c.mp3',
  '一路上說說笑笑，': 'audio/tts/t_6012fd2e8594.mp3',
  '今天的天氣真舒服': 'audio/tts/t_f30aebd26bf8.mp3',
  '今天的太揚很大。': 'audio/tts/t_53a5c16ce06a.mp3',
  '他坐在座位上看書': 'audio/tts/t_06016f2049de.mp3',
  '他對人很有豊貌。': 'audio/tts/t_9863daf09a78.mp3',
  '他很專住地看書。': 'audio/tts/t_087ba159a245.mp3',
  '他很專注地寫功課': 'audio/tts/t_dda4b663dbe8.mp3',
  '他戴著一付手套。': 'audio/tts/t_96b9f9a85b2b.mp3',
  '他把書放在桌子上': 'audio/tts/t_0649c6c8d15b.mp3',
  '公圍裏有很多花。': 'audio/tts/t_d319d98c462c.mp3',
  '准許我看一會書。': 'audio/tts/t_0a56c4a4f839.mp3',
  '到了山頂吃午餐，': 'audio/tts/t_e02f99a64fac.mp3',
  '又加了一件外套，': 'audio/tts/t_d309647b4598.mp3',
  '又要了一碟青菜，': 'audio/tts/t_97d3824cc3ce.mp3',
  '吃了甜甜的月餅！': 'audio/tts/t_27385fbf52d3.mp3',
  '同學們安靜作答，': 'audio/tts/t_9b235392d87a.mp3',
  '同學們收拾書包，': 'audio/tts/t_9533e10bffb7.mp3',
  '同學們都稱讚他，': 'audio/tts/t_466e6e7f28cd.mp3',
  '同學在圖書館看書': 'audio/tts/t_90ccca265ef9.mp3',
  '回到家已經黃昏。': 'audio/tts/t_ef6fbd3b3359.mp3',
  '因為明天要測驗，': 'audio/tts/t_03b38d5196a0.mp3',
  '因為昨天下大雨，': 'audio/tts/t_ed86909f28cd.mp3',
  '因為要準時到達，': 'audio/tts/t_4a1fcf1ed278.mp3',
  '在半山休息飲水，': 'audio/tts/t_2542fd897c50.mp3',
  '大家先準備材料，': 'audio/tts/t_c1fa5a7fefad.mp3',
  '大家玩得很開心。': 'audio/tts/t_6e53d3db5d40.mp3',
  '大家鬆了一口氣。': 'audio/tts/t_4ec8e00fc5f6.mp3',
  '奶奶坐在倚子上。': 'audio/tts/t_f616563fb615.mp3',
  '奶奶戴著一副眼鏡': 'audio/tts/t_d3bb8adfa099.mp3',
  '她把青菜洗乾淨，': 'audio/tts/t_9eb247392414.mp3',
  '姐姐在圖書館借書': 'audio/tts/t_b1cb43a44515.mp3',
  '姐姐學骑自行车，': 'audio/tts/t_280e6b32fb4e.mp3',
  '姐姐打開故事書，': 'audio/tts/t_5081e048c821.mp3',
  '媽媽切了一盤水果': 'audio/tts/t_73618f4ca376.mp3',
  '媽媽去了一趟市場': 'audio/tts/t_e1f10f9fc87f.mp3',
  '媽媽帶我去市場。': 'audio/tts/t_b681a6a6b9e5.mp3',
  '媽媽買了新鮮牛奶': 'audio/tts/t_844b9b6ca5d6.mp3',
  '媽媽買菜回來了！': 'audio/tts/t_7269b08b8275.mp3',
  '媽媽跑了一趟郵局': 'audio/tts/t_756b5fd3f28c.mp3',
  '字跡立刻清楚了，': 'audio/tts/t_9dcc790a7d0f.mp3',
  '小朋友們圍着看，': 'audio/tts/t_c475e5d91dbe.mp3',
  '小朋友在操場跑步': 'audio/tts/t_d3310040c37a.mp3',
  '小朋友在沙池堆沙': 'audio/tts/t_a64c8d4babdd.mp3',
  '小魚在水裏游氷。': 'audio/tts/t_1ce182dee245.mp3',
  '小鳥在空中非翔。': 'audio/tts/t_8d0d4a8aa7c6.mp3',
  '弟弟不但會畫畫，': 'audio/tts/t_ef97e0443366.mp3',
  '弟弟在客廳看電視': 'audio/tts/t_29e81c0b1044.mp3',
  '弟弟寫信給朋有。': 'audio/tts/t_55630f9b39d3.mp3',
  '弟弟穿上一雙新鞋': 'audio/tts/t_fb0d7df759ba.mp3',
  '我們一起看電視！': 'audio/tts/t_f86c393cd203.mp3',
  '我們一齊去上學。': 'audio/tts/t_8e15565d076d.mp3',
  '我們先完成功課，': 'audio/tts/t_49a40dfc879e.mp3',
  '我們先改正錯字，': 'audio/tts/t_ea09f98f0f32.mp3',
  '我們去了一趟郊外': 'audio/tts/t_e18f9d3203a2.mp3',
  '我們去圖書館借書': 'audio/tts/t_16bcb412b845.mp3',
  '我們在天台賞月。': 'audio/tts/t_c33f2d606088.mp3',
  '我們在校園裏跑步': 'audio/tts/t_4feba42d195d.mp3',
  '我們早上一起跑步': 'audio/tts/t_5b27842e0d4e.mp3',
  '我們看得很高興，': 'audio/tts/t_9818260490a7.mp3',
  '我們要守時守訊。': 'audio/tts/t_a212e30c7fc2.mp3',
  '我們買了新鮮魚！': 'audio/tts/t_7e3fc9591e4b.mp3',
  '我們趕快收衣服，': 'audio/tts/t_2f6debb5853e.mp3',
  '我們跑到屋簷下，': 'audio/tts/t_bdc9fada2ec0.mp3',
  '我們餵小羊吃草，': 'audio/tts/t_2bd3a54f1311.mp3',
  '我倒了一杯溫水，': 'audio/tts/t_cbe95fe7dbbb.mp3',
  '我先把書包放好，': 'audio/tts/t_99ce7a8439bb.mp3',
  '我找到想看的書，': 'audio/tts/t_9ea37b013bee.mp3',
  '我有一枝新鉛筆。': 'audio/tts/t_1220780b6f4e.mp3',
  '我繼續認真寫字。': 'audio/tts/t_bd9afc8b7b7e.mp3',
  '所以我戴上眼鏡。': 'audio/tts/t_2cdc364fabca.mp3',
  '所以操場很濕滑。': 'audio/tts/t_f0dbc4bb72d6.mp3',
  '提醒她按時吃藥，': 'audio/tts/t_59a0279a931b.mp3',
  '早上太陽出來了，': 'audio/tts/t_67f838bbfa25.mp3',
  '早上我們到牧場，': 'audio/tts/t_133b327039ae.mp3',
  '春天到了百花盛開': 'audio/tts/t_1cd4590e93dc.mp3',
  '最後和農夫道別。': 'audio/tts/t_44679c94214b.mp3',
  '最後才下樓玩耍，': 'audio/tts/t_8fd640accca7.mp3',
  '最後才把花澆好！': 'audio/tts/t_ce1a03a56b1b.mp3',
  '最後才開動吃飯！': 'audio/tts/t_87e2a6320fad.mp3',
  '樹葉漸斬變黃了。': 'audio/tts/t_50f6cfb26e7d.mp3',
  '河水從山上流下來': 'audio/tts/t_69c561045608.mp3',
  '熱氣從蒸籠冒出，': 'audio/tts/t_ecae334834af.mp3',
  '爸爸下班回來了！': 'audio/tts/t_a074c39f58b6.mp3',
  '爸爸騎單車去上班': 'audio/tts/t_9722df8eb296.mp3',
  '牠們吃得很開心！': 'audio/tts/t_e11a5d155dd0.mp3',
  '留下開心的紀念。': 'audio/tts/t_18e09ffaef7a.mp3',
  '秋天的樹頁黃了。': 'audio/tts/t_a4ea5f92eaa7.mp3',
  '穀倉的門打開了！': 'audio/tts/t_362b81595302.mp3',
  '等雨停了才回家，': 'audio/tts/t_ffa31326a64e.mp3',
  '管理員輕聲提醒，': 'audio/tts/t_e432226982ed.mp3',
  '終於平安到家了。': 'audio/tts/t_afd584f54b78.mp3',
  '終於趕到學校了。': 'audio/tts/t_957df2797e4a.mp3',
  '老師在黑板上寫字': 'audio/tts/t_66a616e5a95a.mp3',
  '老師教我們熱身，': 'audio/tts/t_dd3036da0cd3.mp3',
  '老師派發測驗卷。': 'audio/tts/t_16487d154fde.mp3',
  '考試時要細心檢查': 'audio/tts/t_63094d95387b.mp3',
  '花兒開得很芳芳。': 'audio/tts/t_369c26c61609.mp3',
  '衣服都濕了一點。': 'audio/tts/t_557e2be80aa1.mp3',
  '請不要浪費食勿。': 'audio/tts/t_c02312a384d9.mp3',
  '請把書包整理整齊': 'audio/tts/t_33d2fb492fc8.mp3',
  '輪流說有趣的事，': 'audio/tts/t_ef289127a4c2.mp3',
  '這道題目很簡簞。': 'audio/tts/t_02b424462d19.mp3',
  '鈴聲一響就停筆，': 'audio/tts/t_507ee9956034.mp3',
  '高高興興上學去！': 'audio/tts/t_03996bc0feb5.mp3',
  '下課後整理好簿子，': 'audio/tts/t_60fb3301c8d0.mp3',
  '中途超過兩位同學，': 'audio/tts/t_2177918f98f5.mp3',
  '今天的天氣真舒菔。': 'audio/tts/t_0a011ee6f787.mp3',
  '他先畫了一隻小貓，': 'audio/tts/t_bf3f04dac550.mp3',
  '他坐在坐位上看書。': 'audio/tts/t_1e5eb3531974.mp3',
  '他把書包放在桌子下': 'audio/tts/t_d25abed5cf44.mp3',
  '他把書放在卓子上。': 'audio/tts/t_3ab62371b15f.mp3',
  '他把雨衣穿在身體上': 'audio/tts/t_0b9bba929300.mp3',
  '他認真地完成了作業': 'audio/tts/t_4fcf3158d1a2.mp3',
  '冬天到了天氣很寒冷': 'audio/tts/t_730bcb148513.mp3',
  '哥哥在操場上練跑步': 'audio/tts/t_3632a186766c.mp3',
  '回家後一起煮來吃。': 'audio/tts/t_b0ab35f8a4c3.mp3',
  '因為想看清楚黑板，': 'audio/tts/t_7345684f6fb9.mp3',
  '大家吃得津津有味，': 'audio/tts/t_dfb2d85bb171.mp3',
  '大家慢慢走出校門。': 'audio/tts/t_82557360875e.mp3',
  '大家把穀物搬進去，': 'audio/tts/t_47dc71490a88.mp3',
  '大家都笑得很開心。': 'audio/tts/t_1755defedcbd.mp3',
  '大家都鬆了一口氣。': 'audio/tts/t_683ece8e06ad.mp3',
  '奶奶戴著一副眼晴。': 'audio/tts/t_278cb28a0cd0.mp3',
  '她輕輕地讀給我聽，': 'audio/tts/t_588ee1daca60.mp3',
  '如果明天天氣晴朗，': 'audio/tts/t_4d7fdbfbbfbb.mp3',
  '妹妹寫字寫得很端正': 'audio/tts/t_1bfa58807094.mp3',
  '妹妹穿了一件新衣服': 'audio/tts/t_d58676ffd799.mp3',
  '姐姐回了一趟外婆家': 'audio/tts/t_8c8bbefabfbd.mp3',
  '姐姐在日記裏寫心得': 'audio/tts/t_7607ab65021c.mp3',
  '姐姐幫我檢查物品，': 'audio/tts/t_c23ca7d71af6.mp3',
  '姐姐每天都練習鋼琴': 'audio/tts/t_041421cad19c.mp3',
  '媽媽切了一盤水菓。': 'audio/tts/t_11b4284ace57.mp3',
  '媽媽叫我回家吃飯。': 'audio/tts/t_71274f65753b.mp3',
  '媽媽替我調好鬧鐘，': 'audio/tts/t_0bb6d00135c9.mp3',
  '媽媽買了新鮮牛乃。': 'audio/tts/t_76438020fd12.mp3',
  '媽媽買了新鮮的蔬果': 'audio/tts/t_43b082b96168.mp3',
  '媽媽買了新鮮的蔬菜': 'audio/tts/t_a16f5690371f.mp3',
  '小鳥停在樹枝上休息': 'audio/tts/t_f37747a6e025.mp3',
  '小鳥停在樹枝上唱歌': 'audio/tts/t_4ee9c2b03415.mp3',
  '小鳥停在樹梢上唱歌': 'audio/tts/t_215c6600ea79.mp3',
  '就安心地上牀休息。': 'audio/tts/t_7a2443a8c107.mp3',
  '屋裏變得一片漆黑，': 'audio/tts/t_57bde3ac2990.mp3',
  '希望她早點好起來，': 'audio/tts/t_2f849748a45b.mp3',
  '弟弟把玩具收拾乾淨': 'audio/tts/t_7f84711d1e4e.mp3',
  '弟弟指着天空大叫，': 'audio/tts/t_62548081178a.mp3',
  '弟弟穿上一雙新挂。': 'audio/tts/t_6c7c07496b75.mp3',
  '我們一起去公園玩耍': 'audio/tts/t_9ffdde890acc.mp3',
  '我們一起跑到窗邊，': 'audio/tts/t_1f40cf1a3dc6.mp3',
  '我們下課後一起打球': 'audio/tts/t_ba9ee77b44f4.mp3',
  '我們下課後一起收拾': 'audio/tts/t_d6a9595d685a.mp3',
  '我們去公園放風箏。': 'audio/tts/t_cb98c231b78d.mp3',
  '我們去圖書管借書。': 'audio/tts/t_0fa6fdebcbec.mp3',
  '我們在校國裏跑步。': 'audio/tts/t_a625a276f325.mp3',
  '我們要保持環境清潔': 'audio/tts/t_61b4af922fb7.mp3',
  '我們要愛護公共設施': 'audio/tts/t_1c6224386014.mp3',
  '我們靠着燈光坐下，': 'audio/tts/t_1c4e69dbecff.mp3',
  '我借了兩本故事書！': 'audio/tts/t_1e51798d3afc.mp3',
  '我參加了短跑比賽，': 'audio/tts/t_c1ed4ad3381a.mp3',
  '我安心地上牀休息。': 'audio/tts/t_3cb762233035.mp3',
  '我安心地上牀睡覺。': 'audio/tts/t_88f5d10fc85e.mp3',
  '我完成了全部功課。': 'audio/tts/t_06e2424aa9d8.mp3',
  '所以今晚早點溫習。': 'audio/tts/t_8eee212bce80.mp3',
  '所以我們快步行走。': 'audio/tts/t_5ba79f3a4ccc.mp3',
  '所以我們提早出門。': 'audio/tts/t_f536f31d7954.mp3',
  '所以我們走進餐廳。': 'audio/tts/t_4dda251cf103.mp3',
  '接着寫完數學練習，': 'audio/tts/t_ed429f4616c3.mp3',
  '春天到了百花勝開。': 'audio/tts/t_dbe0f9dd0af8.mp3',
  '最後一起檢查答案，': 'audio/tts/t_479f13c189ad.mp3',
  '最後才可以看電視！': 'audio/tts/t_081719563c5b.mp3',
  '樹上的葉子落下來，': 'audio/tts/t_9a1dcfb56c8f.mp3',
  '沿山路慢慢走上去，': 'audio/tts/t_aa8dc138225f.mp3',
  '湖面結了一層薄冰，': 'audio/tts/t_95a4003b2a8d.mp3',
  '準備煮湯給大家喝。': 'audio/tts/t_bef41b15f985.mp3',
  '爸爸帶我去圖書館。': 'audio/tts/t_37efbd815642.mp3',
  '爸爸帶我去買包子，': 'audio/tts/t_b7d264891570.mp3',
  '爸爸騎單車去上坂。': 'audio/tts/t_5a17dc2a5f9b.mp3',
  '班長提醒大家坐好。': 'audio/tts/t_3b0334383a7c.mp3',
  '看到好笑處都笑了。': 'audio/tts/t_cbf923be6b05.mp3',
  '經過馬路時很小心，': 'audio/tts/t_c3947b8b87b8.mp3',
  '老師叫我們安靜聽講': 'audio/tts/t_c10a42cbfab1.mp3',
  '老師在黑版上寫字。': 'audio/tts/t_acfa53e9380d.mp3',
  '老師宣佈改在禮堂，': 'audio/tts/t_bf6505eb8841.mp3',
  '考試時要細心檢茶。': 'audio/tts/t_1546cd788ee7.mp3',
  '膝蓋擦破了一點皮，': 'audio/tts/t_67697e3389c2.mp3',
  '誰也不敢踏上冰面，': 'audio/tts/t_788cd310cc5d.mp3',
  '請把垃圾丟進垃圾桶': 'audio/tts/t_443362d590cb.mp3',
  '請把書包整理整齌。': 'audio/tts/t_c54af9dd0e58.mp3',
  '請把答案寫在簿子上': 'audio/tts/t_aa14136db68a.mp3',
  '請選擇正確的量詞。': 'audio/tts/prompt_measure.mp3',
  '這本書的內容很豐富': 'audio/tts/t_77cae38a4cb2.mp3',
  '不知不覺過了一小時，': 'audio/tts/t_fbd0f5cad495.mp3',
  '不知不覺過了半小時，': 'audio/tts/t_14d2453e8504.mp3',
  '他把書包放在卓子下。': 'audio/tts/t_590c88a64e05.mp3',
  '他把雨衣穿在身休上。': 'audio/tts/t_9fe5744c0b85.mp3',
  '他畫了一幅美麗的圖畫': 'audio/tts/t_980a3eb840c9.mp3',
  '他認真地完成了作葉。': 'audio/tts/t_c9db9b74d58c.mp3',
  '他說了一個有趣的故事': 'audio/tts/t_6c0ccbba9d0d.mp3',
  '冬天到了天氣很寒泠。': 'audio/tts/t_29bcfb304c36.mp3',
  '同學們迅速走進課室，': 'audio/tts/t_692185066b16.mp3',
  '哥哥在操場上練跑歩。': 'audio/tts/t_aa902c3a946c.mp3',
  '哨子一響我就向前衝，': 'audio/tts/t_354a4d94e011.mp3',
  '回家後我立刻讀起來。': 'audio/tts/t_6f075289495d.mp3',
  '大家都坐得端端正正。': 'audio/tts/t_23b290606418.mp3',
  '妹妹寫字寫得很端証。': 'audio/tts/t_6b82c52d5f28.mp3',
  '妹妹穿了一件新衣報。': 'audio/tts/t_78b222ef5eb1.mp3',
  '姐姐在日記裏寫心徳。': 'audio/tts/t_a354f7b5e81d.mp3',
  '姐姐每天都練習鋼琹。': 'audio/tts/t_b00eb012faed.mp3',
  '媽媽買了新鮮的疏果。': 'audio/tts/t_0f1c7a76be10.mp3',
  '小鳥停在樹技上休息。': 'audio/tts/t_e743da9decd5.mp3',
  '小鳥停在樹稍上唱歌。': 'audio/tts/t_5f06d4ec086c.mp3',
  '弟弟寫了一封信給朋友': 'audio/tts/t_48d553e7fa16.mp3',
  '弟弟把玩具收拾亁淨。': 'audio/tts/t_fe0dc0353e29.mp3',
  '我們就去郊外放風箏。': 'audio/tts/t_3ab2b64a2492.mp3',
  '我們要保持環境清絜。': 'audio/tts/t_9e6ff0a85aa3.mp3',
  '我們要愛護公圡設施。': 'audio/tts/t_0fd58e8cb333.mp3',
  '所以媽媽拿出厚衣服。': 'audio/tts/t_992aa9db7232.mp3',
  '放學後我們一起做功課': 'audio/tts/t_cb64881328ea.mp3',
  '請把垃圾丟進垃及桶。': 'audio/tts/t_57d0a1caf4e4.mp3',
  '請把答案寫在薄子上。': 'audio/tts/t_34882159838c.mp3',
  '請看這裏的請水很涼。': 'audio/tts/t_95c7083b4cd3.mp3',
  '這本書的內蓉很豐富。': 'audio/tts/t_75a8dfff966a.mp3',
  '週末我們去郊野公園，': 'audio/tts/t_79774f8a3669.mp3',
  '他畫了一幅美麗的圖晝。': 'audio/tts/t_e330cc1bf098.mp3',
  '他說了一個有趣的故亊。': 'audio/tts/t_bdb38c067b71.mp3',
  '同學們在課室裏朗讀課文': 'audio/tts/t_2f79923d0e9d.mp3',
  '大家只好在岸邊堆雪人。': 'audio/tts/t_21447f48c669.mp3',
  '操場上有許多同學在活動': 'audio/tts/t_70f74a4b0269.mp3',
  '放學後我們一齊做功課。': 'audio/tts/t_92fe408159d6.mp3',
  '春天到了，樹葉漸漸長大': 'audio/tts/t_55fb934fef76.mp3',
  '請點選句子中寫錯的字。': 'audio/tts/prompt_typo.mp3',
  '他付了錢，戴著一付眼鏡。': 'audio/tts/t_54a3e99cc295.mp3',
  '同學們在課室裏朗瀆課文。': 'audio/tts/t_7527ae241e61.mp3',
  '因為下大雨，所以路很滑。': 'audio/tts/t_06c35ecc7e3e.mp3',
  '操場上有許多同學在活働。': 'audio/tts/t_21b8c84d5fcf.mp3',
  '老師叮囑我們小心過馬路，': 'audio/tts/t_eb2a2f5538dd.mp3',
  '請選擇正確的量詞。一＿信': 'audio/tts/t_40aae2fe5aeb.mp3',
  '請選擇正確的量詞。一＿刀': 'audio/tts/t_8fba2ac08744.mp3',
  '請選擇正確的量詞。一＿山': 'audio/tts/t_5fb6ca272d60.mp3',
  '請選擇正確的量詞。一＿旗': 'audio/tts/t_4d7b9da10567.mp3',
  '請選擇正確的量詞。一＿書': 'audio/tts/t_0b8b133cded8.mp3',
  '請選擇正確的量詞。一＿樹': 'audio/tts/t_bd7f673b4fc0.mp3',
  '請選擇正確的量詞。一＿橋': 'audio/tts/t_929bbf9c9624.mp3',
  '請選擇正確的量詞。一＿江': 'audio/tts/t_04d6f43d9274.mp3',
  '請選擇正確的量詞。一＿河': 'audio/tts/t_e38033fb105c.mp3',
  '請選擇正確的量詞。一＿燈': 'audio/tts/t_c6b5844c1d9a.mp3',
  '請選擇正確的量詞。一＿牆': 'audio/tts/t_0aba5b366d1e.mp3',
  '請選擇正確的量詞。一＿牛': 'audio/tts/t_af445187fa93.mp3',
  '請選擇正確的量詞。一＿磚': 'audio/tts/t_42fb95fe1936.mp3',
  '請選擇正確的量詞。一＿窗': 'audio/tts/t_21ab1109dd35.mp3',
  '請選擇正確的量詞。一＿竹': 'audio/tts/t_24230ed32c79.mp3',
  '請選擇正確的量詞。一＿糖': 'audio/tts/t_02d3b91cb95a.mp3',
  '請選擇正確的量詞。一＿繩': 'audio/tts/t_6fa2628a288f.mp3',
  '請選擇正確的量詞。一＿羊': 'audio/tts/t_9c587352dddc.mp3',
  '請選擇正確的量詞。一＿花': 'audio/tts/t_ac8785277e99.mp3',
  '請選擇正確的量詞。一＿草': 'audio/tts/t_506e2418b691.mp3',
  '請選擇正確的量詞。一＿菜': 'audio/tts/t_10041d68b761.mp3',
  '請選擇正確的量詞。一＿蛇': 'audio/tts/t_de01e3124981.mp3',
  '請選擇正確的量詞。一＿蛋': 'audio/tts/t_3c84dba23e94.mp3',
  '請選擇正確的量詞。一＿路': 'audio/tts/t_bad4991a40c9.mp3',
  '請選擇正確的量詞。一＿門': 'audio/tts/t_5cb087d07336.mp3',
  '請選擇正確的量詞。一＿馬': 'audio/tts/t_7e369d4335ec.mp3',
  '請選擇正確的量詞。一＿魚': 'audio/tts/t_9c52ac015488.mp3',
  '請選擇正確的量詞。一＿鼓': 'audio/tts/t_afc433bbc5fa.mp3',
  '但是姐姐仍然抽空替我溫習。': 'audio/tts/t_6a66264e1570.mp3',
  '妹妹穿了一件新依服去依人。': 'audio/tts/t_21060473cdbe.mp3',
  '媽媽買了新鮮的疏菜和青蔬。': 'audio/tts/t_e5c8b7d80b60.mp3',
  '請選擇正確的量詞。一＿地圖': 'audio/tts/t_1db0a9981e61.mp3',
  '請選擇正確的量詞。一＿小鳥': 'audio/tts/t_871ab8ae1f6f.mp3',
  '請選擇正確的量詞。一＿帽子': 'audio/tts/t_1664a174418b.mp3',
  '請選擇正確的量詞。一＿手套': 'audio/tts/t_2e751e572c66.mp3',
  '請選擇正確的量詞。一＿桌子': 'audio/tts/t_4e6997191f66.mp3',
  '請選擇正確的量詞。一＿樹苗': 'audio/tts/t_7e279cb1889f.mp3',
  '請選擇正確的量詞。一＿眼睛': 'audio/tts/t_32e430f4a995.mp3',
  '請選擇正確的量詞。一＿石頭': 'audio/tts/t_f47967887946.mp3',
  '請選擇正確的量詞。一＿筷子': 'audio/tts/t_d32c37529556.mp3',
  '請選擇正確的量詞。一＿肥皂': 'audio/tts/t_2c8014749e9d.mp3',
  '請選擇正確的量詞。一＿蘋果': 'audio/tts/t_ea8d85ce83f9.mp3',
  '請選擇正確的量詞。一＿褲子': 'audio/tts/t_16818f816528.mp3',
  '請選擇正確的量詞。一＿襪子': 'audio/tts/t_1608202ee64a.mp3',
  '請選擇正確的量詞。一＿鉛筆': 'audio/tts/t_af62cdbdf614.mp3',
  '請選擇正確的量詞。一＿鏡子': 'audio/tts/t_c481f404debd.mp3',
  '請選擇正確的量詞。一＿鑰匙': 'audio/tts/t_06a16c1c97b3.mp3',
  '請選擇正確的量詞。一＿雨傘': 'audio/tts/t_42dd9f7a0f43.mp3',
  '請選擇正確的量詞。一＿鞋子': 'audio/tts/t_592f5dc8207c.mp3',
  '請選擇正確的量詞。一＿麵包': 'audio/tts/t_598b7f4a2f77.mp3',
  '小鳥停在樹技上，枝頭還有花。': 'audio/tts/t_31b952d1deeb.mp3',
  '請選擇正確的量詞。他歎了一＿': 'audio/tts/t_0c60960bfca3.mp3',
  '請選擇正確的量詞。叫了人一＿': 'audio/tts/t_0ecde19c6f67.mp3',
  '請選擇正確的量詞。拍了手一＿': 'audio/tts/t_506bd16b652f.mp3',
  '請選擇正確的量詞。敲了門一＿': 'audio/tts/t_4c5d925bf42d.mp3',
  '請選擇正確的量詞。看了書一＿': 'audio/tts/t_37431d844c01.mp3',
  '請選擇正確的量詞。門響了一＿': 'audio/tts/t_fed67458edbc.mp3',
  '他不但分數高，而且字也很工整。': 'audio/tts/t_b1d43c68a3a9.mp3',
  '他很專住地寫功課，不住地練習。': 'audio/tts/t_c070e71c546e.mp3',
  '因為想看清楚，所以我戴上眼鏡。': 'audio/tts/t_02d686c66614.mp3',
  '因為要準時，所以我們快步行走。': 'audio/tts/t_ff9ae707a81b.mp3',
  '因為路很遠，所以我們提早出門。': 'audio/tts/t_6603a4b7df7d.mp3',
  '如果用心溫習，你就會取得進步。': 'audio/tts/t_87666186d8aa.mp3',
  '姐姐不但會唱歌，而且還會跳舞。': 'audio/tts/t_fd776d4d3e35.mp3',
  '媽媽不但會煮湯，而且會烤蛋糕。': 'audio/tts/t_7e9870e81d8c.mp3',
  '弟弟不但愛看書，而且愛寫日記。': 'audio/tts/t_af6d4f93a76a.mp3',
  '我們一起去公園玩要，不要亂跑。': 'audio/tts/t_39f74055a4b8.mp3',
  '河水從山上留下來，別留下垃圾。': 'audio/tts/t_2a6d9a4edb59.mp3',
  '老師叫我們安精聽講，精神要好。': 'audio/tts/t_3f9d506c0544.mp3',
  '請把下列句子排成一段通順的話。': 'audio/tts/prompt_para.mp3',
  '請把下列字詞排成一句通順的話。': 'audio/tts/prompt_reorder.mp3',
  '請選擇正確的量詞。寶寶哭了一＿': 'audio/tts/t_9d573acf9a7e.mp3',
  '因為下雨，所以我們留在家裏看書。': 'audio/tts/t_f59795dace53.mp3',
  '因為明天要測驗，所以今晚早點睡。': 'audio/tts/t_ebf252b264b1.mp3',
  '因為肚子餓了，所以我們走進餐廳。': 'audio/tts/t_baad2d08f595.mp3',
  '因為路很滑，所以我們慢慢地走路。': 'audio/tts/t_e8af0b927275.mp3',
  '天亮了，公雞喔喔叫，農場醒過來！': 'audio/tts/t_146d71ea0990.mp3',
  '如果大家齊心，這件事就容易辦成。': 'audio/tts/t_1a1d64be1d07.mp3',
  '如果明天天晴，我們就去公園野餐。': 'audio/tts/t_d1fcf905bad5.mp3',
  '如果週末放假，我們就去郊外遠足。': 'audio/tts/t_d610a8f0b81b.mp3',
  '請選擇正確的量詞。他大聲叫了一＿': 'audio/tts/t_54db5763b107.mp3',
  '雖然功課很多，姐姐仍然抽空溫習。': 'audio/tts/t_0a43d72b1891.mp3',
  '雖然外面很熱，我們仍然戴上帽子。': 'audio/tts/t_631507159f0a.mp3',
  '因為天氣轉涼，所以媽媽拿出厚衣服。': 'audio/tts/t_9ed0e2f0eb36.mp3',
  '因為愛護環境，所以我們不亂丟垃圾。': 'audio/tts/t_f8be7a97a664.mp3',
  '因為明天要旅行，所以今晚整理行李。': 'audio/tts/t_bde3a094e5c6.mp3',
  '因為明天要早起，所以今晚早點睡覺。': 'audio/tts/t_929dc0dea0d7.mp3',
  '因為肚子餓了，所以媽媽煮麵給我們。': 'audio/tts/t_f6195d3016fe.mp3',
  '如果明天不用上課，我們就去圖書館。': 'audio/tts/t_e081b278c94b.mp3',
  '小貓看見蝴蝶！牠追着跑，卻捉不到。': 'audio/tts/t_a0ac109af3cf.mp3',
  '春天到了，樹葉漸斬長大，漸漸變綠。': 'audio/tts/t_563c72ac01b3.mp3',
  '請選擇正確的量詞。一＿信箋（單張）': 'audio/tts/t_27bd49ed56e0.mp3',
  '請選擇正確的量詞。媽媽去了一＿市場': 'audio/tts/t_ffcb8219adbe.mp3',
  '請選擇正確的量詞。媽媽跑了一＿郵局': 'audio/tts/t_da7afa0eb760.mp3',
  '請選擇正確的量詞。我們去了一＿郊外': 'audio/tts/t_220f1680767c.mp3',
  '雖然下着大雨，但是同學仍然上學去。': 'audio/tts/t_e98f88853b7b.mp3',
  '雖然這次考試失敗，但是他並不灰心。': 'audio/tts/t_d689f78fc132.mp3',
  '下雪了！地上變得雪白，小朋友堆雪人。': 'audio/tts/t_0b62fb147177.mp3',
  '忽然閃電了！跟着打雷，大家走進屋內。': 'audio/tts/t_e25f8240817d.mp3',
  '我打開書包，拿出練習簿，開始寫功課！': 'audio/tts/t_8d19430e82cb.mp3',
  '請選擇正確的量詞。一＿花（綁成一扎）': 'audio/tts/t_17826f3c81a2.mp3',
  '請選擇正確的量詞。姐姐回了一＿外婆家': 'audio/tts/t_899185d1498d.mp3',
  '雖然今天很累，但是弟弟仍然堅持練習。': 'audio/tts/t_b39932d9ae7f.mp3',
  '弟弟寫了一封信給朋有，又有一封給老師。': 'audio/tts/t_56af1cf1696b.mp3',
  '晚上燈亮了，全家坐在一起，開心吃晚飯！': 'audio/tts/t_efa16ed6784b.mp3',
  '湖面很平靜，小鴨游過來，留下一串水紋！': 'audio/tts/t_d80dc69ee2ed.mp3',
  '蜜蜂飛來飛去，停在花朵上，忙着採花蜜！': 'audio/tts/t_d7705aa4657e.mp3',
  '請選擇正確的量詞。一＿問卷（整套填寫）': 'audio/tts/t_24462878d544.mp3',
  '請選擇正確的量詞。一＿報紙（整份訂閱）': 'audio/tts/t_8ccdfc90635a.mp3',
  '請選擇正確的量詞。一＿畫紙（單張使用）': 'audio/tts/t_160c0b90a039.mp3',
  '請選擇正確的量詞。一＿稻穗（收割綁好）': 'audio/tts/t_6ded5b464ae2.mp3',
  '請選擇正確的量詞。一＿講義（整套派發）': 'audio/tts/t_333f068d330c.mp3',
  '請選擇正確的量詞。一＿青菜（扎成一把）': 'audio/tts/t_093bcae44f44.mp3',
  '農夫走到田裏，他播下種子，盼望收成好。': 'audio/tts/t_c324596df926.mp3',
  '漁夫走到魚塘，他放下魚餌，他釣到一條魚！': 'audio/tts/t_7f39dd564764.mp3',
  '爸爸修好單車，讓我試騎一下，我騎得很穩！': 'audio/tts/t_585b87dc480e.mp3',
  '老師走進課室，同學們站起來，齊聲說早安。': 'audio/tts/t_5d785c8e3904.mp3',
  '請選擇正確的量詞。一＿信紙（很多張疊好）': 'audio/tts/t_4a2225335ff2.mp3',
  '請選擇正確的量詞。一＿報紙（單張攤開看）': 'audio/tts/t_9f770fa7acac.mp3',
  '請選擇正確的量詞。一＿紙牌（很多張疊好）': 'audio/tts/t_6fac90666b1c.mp3',
  '請選擇正確的量詞。一＿花（綁成一捆送人）': 'audio/tts/t_112baa947e90.mp3',
  '妹妹穿好衣服，背上小書包，高高興興上學去！': 'audio/tts/t_6ee29e9899f2.mp3',
  '媽媽走進廚房，她洗乾淨蔬菜，然後開始煮湯。': 'audio/tts/t_1d1a2dd55be7.mp3',
  '弟弟拿出畫筆，他認真地畫畫，畫好了一隻貓！': 'audio/tts/t_5cfd10256efb.mp3',
  '我們先洗手，再幫忙擺碗筷，最後才開動吃飯！': 'audio/tts/t_794320803b8c.mp3',
  '我們先量好水，再倒進水杯，最後才把花澆好！': 'audio/tts/t_457011f93b59.mp3',
  '我們提着水桶，去澆菜園的菜，菜葉變得翠綠！': 'audio/tts/t_b6fa97a241d4.mp3',
  '我們收拾玩具，把房間整理好，媽媽露出笑容。': 'audio/tts/t_3e5b80affe6c.mp3',
  '我們走到河邊，看見小魚游泳，大家都很開心！': 'audio/tts/t_7d2ba96503ba.mp3',
  '我們走到菜園。大家一起種菜！菜苗長得很齊。': 'audio/tts/t_368173048813.mp3',
  '早上太陽出來了，小鳥開始唱歌，我們去上學。': 'audio/tts/t_294dda0a6bd8.mp3',
  '請選擇正確的量詞。一＿作業紙（很多張疊好）': 'audio/tts/t_865b3282c49c.mp3',
  '請選擇正確的量詞。一＿明信片（很多張疊好）': 'audio/tts/t_074363a73505.mp3',
  '請選擇正確的量詞。一＿照片（單張沖洗出來）': 'audio/tts/t_e44bdd47561d.mp3',
  '天空忽然下雨！我們趕快收衣服，大家都跑回家。': 'audio/tts/t_10ddf29fe3e7.mp3',
  '我們提着飼料，牛羊走過來吃，牠們吃得很開心！': 'audio/tts/t_8ef5dd8968d6.mp3',
  '請選擇正確的量詞。一＿功課（老師派發的整套）': 'audio/tts/t_7187b146bafe.mp3',
  '請選擇正確的量詞。一＿海報（貼在牆上的單張）': 'audio/tts/t_ad23a69cc2f2.mp3',
  '請選擇正確的量詞。一＿考卷（老師派發的整套）': 'audio/tts/t_73429b0eafd8.mp3',
  '忽然刮起大風！樹上的葉子落下來，我們趕快回家。': 'audio/tts/t_81d5cb59aebd.mp3',
  '我們先完成功課，再幫忙洗碗，最後才可以看電視！': 'audio/tts/t_c4129faaf289.mp3',
  '早上我們到牧場，我們餵小羊吃草，傍晚我們回家！': 'audio/tts/t_1f2fa7b4b279.mp3',
  '姐姐打開故事書，她輕輕地讀給我聽，我聽得入了神。': 'audio/tts/t_790088b9dee9.mp3',
  '穀倉的門打開了！大家把穀物搬進去，農夫把門鎖好。': 'audio/tts/t_101ab4e3ddf9.mp3',
  '因為下大雨，所以路很滑。我們慢慢地走，終於平安到家了。': 'audio/tts/t_92c8abb30761.mp3',
  '我們來到農場。先探望小羊，再餵牠們青草，最後和農夫道別。': 'audio/tts/t_cb07382b0439.mp3',
  '中秋節那天，我們在天台賞月。吃了甜甜的月餅！全家有說有笑。': 'audio/tts/t_7b41b047f401.mp3',
  '因為天氣轉涼，所以媽媽拿出厚衣服。我穿上毛衣，就不怕冷了。': 'audio/tts/t_925fa823ccc7.mp3',
  '因為肚子餓了，所以我們走進餐廳。點了兩碗麵，吃得津津有味。': 'audio/tts/t_4c49c52ec4b5.mp3',
  '因為要準時，所以我們快步行走。終於趕上巴士，大家都放心了。': 'audio/tts/t_f24bc081bfa8.mp3',
  '晚上八時，全家坐在客廳。我們一起看電視！看到好笑處都笑了。': 'audio/tts/t_4c418d1155ca.mp3',
  '爸爸下班回來了！他換上便服，然後陪我下棋，大家玩得很開心。': 'audio/tts/t_45693d93e3f8.mp3',
  '運動課開始了。老師教我們熱身，接着練習跑步，最後一起伸展。': 'audio/tts/t_3f945c3ca9d0.mp3',
  '上課前十分鐘，班長提醒大家坐好。老師走進課室。課堂正式開始。': 'audio/tts/t_95ee8cd9aa91.mp3',
  '星期五晚上，我完成了全部功課。媽媽檢查一遍。准許我看一會書。': 'audio/tts/t_a7545838ac54.mp3',
  '因為想看清楚，所以我戴上眼鏡。字跡立刻清楚了，我繼續認真寫字。': 'audio/tts/t_f29ba339e11f.mp3',
  '因為路很遠，所以我們提早出門。一路上說說笑笑，終於趕到學校了。': 'audio/tts/t_f9f296814e8f.mp3',
  '忽然下起大雨。我們跑到屋簷下，等雨停了才回家，衣服都濕了一點。': 'audio/tts/t_34b683a479a6.mp3',
  '星期六下午，我們去公園放風箏。風箏飛得很高！大家都笑得很開心。': 'audio/tts/t_5527d9a65798.mp3',
  '星期天早上，媽媽帶我去市場。我們買了新鮮魚！回家後一起煮來吃。': 'audio/tts/t_c87b2e694422.mp3',
  '媽媽買菜回來了！她把青菜洗乾淨，然後切成小段，準備煮湯給大家喝。': 'audio/tts/t_0c1ea7957477.mp3',
  '老師派發測驗卷。同學們安靜作答，鈴聲一響就停筆，大家鬆了一口氣。': 'audio/tts/t_a3da9d283bf9.mp3',
  '上課鐘響了。同學們迅速走進課室，老師開始點名，大家都坐得端端正正。': 'audio/tts/t_4685a87706fd.mp3',
  '因為明天要測驗，所以今晚早點睡。媽媽替我調好鬧鐘，我安心地上牀休息。': 'audio/tts/t_ed6e11825f2a.mp3',
  '星期六早上，爸爸帶我去圖書館。我借了兩本故事書！回家後我立刻讀起來。': 'audio/tts/t_dc35be54a3ce.mp3',
  '下課鐘響了。同學們收拾書包，老師叮囑我們小心過馬路，大家慢慢走出校門。': 'audio/tts/t_6048da28841b.mp3',
  '因為明天要旅行，所以今晚整理行李。姐姐幫我檢查物品，我安心地上牀睡覺。': 'audio/tts/t_e3c90a74c0af.mp3',
  '雖然今天很忙，但是姐姐仍然抽空替我溫習。我們先改正錯字，再練習造句，最後一起檢查答案。': 'audio/tts/t_3a2cb3f59370.mp3',
  '清早霧氣未散，爸爸帶我去買包子，店門剛開，熱氣從蒸籠冒出，我們買了六個，一邊走一邊吃，包子真香。': 'audio/tts/t_a78da5dfd0e4.mp3',
  '因為天氣轉涼，所以媽媽拿出厚衣服。我穿上毛衣，又加了一件外套，戴好帽子，就不怕冷了，可以安心上學。': 'audio/tts/t_bd2c4a45bb12.mp3',
  '如果明天天氣晴朗，我們就去郊外放風箏。大家先準備材料，再到空地試飛，風箏漸漸升高，我們看得很高興。': 'audio/tts/t_452dfae33ed1.mp3',
  '弟弟不但會畫畫，而且會寫故事。他先畫了一隻小貓，再寫下說明，貼在壁報上，同學們都稱讚他，他開心極了。': 'audio/tts/t_f1df25ee8b93.mp3',
  '姐姐學骑自行车，起初總是跌倒，膝蓋擦破了一點皮，後來越騎越穩，能夠自己轉彎，還敢走小斜坡，終於學會了。': 'audio/tts/t_49b80d20c5fc.mp3',
  '下雨過後，天上出現彩虹，弟弟指着天空大叫，我們一起跑到窗邊，拿出手機拍照，還互相比手勢，留下開心的紀念。': 'audio/tts/t_db4df1739d70.mp3',
  '因為昨天下大雨，所以操場很濕滑。老師宣佈改在禮堂，我們搬來墊子，開始練習體操，大家都很小心，沒有人摔倒。': 'audio/tts/t_06d7bfcc4669.mp3',
  '媽媽生病了，我倒了一杯溫水，輕輕放到牀邊，幫她蓋好被子，提醒她按時吃藥，希望她早點好起來，她微笑着點頭。': 'audio/tts/t_17c7868abd95.mp3',
  '下午放學後，我先把書包放好，接着寫完數學練習，又複習生字，最後才下樓玩耍，天色漸漸暗了，媽媽叫我回家吃飯。': 'audio/tts/t_2bab9efee05f.mp3',
  '因為想看清楚黑板，所以我戴上眼鏡。字跡立刻清楚了，我認真抄筆記，下課後整理好簿子，放進書包，心情輕鬆多了。': 'audio/tts/t_2c009f023be4.mp3',
  '因為肚子餓了，所以我們走進餐廳。點了兩碗麵，又要了一碟青菜，很快就上桌了，大家吃得津津有味，連湯也喝光了。': 'audio/tts/t_a1637b88a73f.mp3',
  '因為路很遠，所以我們提早出門。一路上說說笑笑，經過兩條大街，終於趕到學校，剛好趕上早會，大家都鬆了一口氣。': 'audio/tts/t_e46c6c2e3d3c.mp3',
  '因為明天要測驗，所以今晚早點溫習。我先整理筆記，再做練習題，媽媽替我調好鬧鐘，我洗漱完畢，就安心地上牀休息。': 'audio/tts/t_86295340051d.mp3',
  '因為要準時到達，所以我們快步行走。經過馬路時很小心，終於趕上巴士，找到空位坐下，大家都放心了，還互相笑了笑。': 'audio/tts/t_f6dd5ee66355.mp3',
  '圖書館很安靜，我找到想看的書，坐在窗邊細讀，做了幾頁筆記，不知不覺過了一小時，管理員輕聲提醒，我才收拾離開。': 'audio/tts/t_4c2b30bd0245.mp3',
  '運動會那天，我參加了短跑比賽，哨子一響我就向前衝，中途超過兩位同學，最後衝過終點，得了第二名，全班為我鼓掌。': 'audio/tts/t_231d0de73164.mp3',
  '忽然停電了，屋裏變得一片漆黑，爸爸找出電筒，我們靠着燈光坐下，輪流說有趣的事，不知不覺過了半小時，電終於來了。': 'audio/tts/t_641023012453.mp3',
  '冬天到了，湖面結了一層薄冰，小朋友們圍着看，有人想走上去，老師連忙阻止，誰也不敢踏上冰面，大家只好在岸邊堆雪人。': 'audio/tts/t_e0af11ab4293.mp3',
  '週末我們去郊野公園，沿山路慢慢走上去，在半山休息飲水，到了山頂吃午餐，拍了幾張照片，下午才下山，回到家已經黃昏。': 'audio/tts/t_fc322e61583f.mp3',
};
export const SPEAK_TTS_MALE = {
  '花開了': 'audio/tts/m_7d546c86fec2.mp3',
  '小鳥會飛': 'audio/tts/m_83440371e852.mp3',
  '我去釣魚': 'audio/tts/m_c45055d5b183.mp3',
  '我寫日記': 'audio/tts/m_3313f0d74ac6.mp3',
  '我愛讀書': 'audio/tts/m_ab37e08b3593.mp3',
  '雨下很大': 'audio/tts/m_63447e1b7ce3.mp3',
  '風吹過來': 'audio/tts/m_9fa178e1945b.mp3',
  '魚在游水': 'audio/tts/m_461633069eee.mp3',
  '哥哥去踢球': 'audio/tts/m_e187118c0bd3.mp3',
  '太陽升起來': 'audio/tts/m_d955d6e363fa.mp3',
  '奶奶在喝茶': 'audio/tts/m_83c68fafc1f1.mp3',
  '妹妹在畫畫': 'audio/tts/m_22e34765f047.mp3',
  '媽媽在種菜': 'audio/tts/m_189fda440040.mp3',
  '媽媽煮晚飯': 'audio/tts/m_02d89ca2de57.mp3',
  '小狗在睡覺': 'audio/tts/m_71a31f4886c6.mp3',
  '小貓在捉魚': 'audio/tts/m_a17d7ea8cb42.mp3',
  '弟弟在看書': 'audio/tts/m_66e53c213d6e.mp3',
  '弟弟愛吃糖': 'audio/tts/m_b6ebdcc2eeb1.mp3',
  '我們去公園': 'audio/tts/m_f435f788e258.mp3',
  '爸爸在開車': 'audio/tts/m_6fd6c0464910.mp3',
  '老師在講課': 'audio/tts/m_4d2156ae9029.mp3',
  '蜜蜂在採蜜': 'audio/tts/m_da9be2aec66d.mp3',
  '螞蟻搬食物': 'audio/tts/m_21238b7782dd.mp3',
  '農夫在割草': 'audio/tts/m_d290d33f4119.mp3',
  '小朋友在唱歌': 'audio/tts/m_45fb74c09c48.mp3',
  '我們一起回家': 'audio/tts/m_d11a508791e5.mp3',
  '哥哥在球場射球': 'audio/tts/m_5055d1deb5d8.mp3',
  '奶奶在廚房煮湯': 'audio/tts/m_1ffcda26795c.mp3',
  '奶奶在陽台曬衣': 'audio/tts/m_c8cc7e55d059.mp3',
  '姐姐在房間彈琴': 'audio/tts/m_01d656141426.mp3',
  '媽媽在市場買菜': 'audio/tts/m_769cd32f5164.mp3',
  '媽媽在廚房炒菜': 'audio/tts/m_64dcb83ea530.mp3',
  '小貓在沙發睡覺': 'audio/tts/m_5e28964a9036.mp3',
  '小魚在池塘游泳': 'audio/tts/m_7efdfb2b5b6a.mp3',
  '小鳥在枝頭唱歌': 'audio/tts/m_bb70dad6bbf9.mp3',
  '小鳥在樹上唱歌': 'audio/tts/m_b585f8067626.mp3',
  '弟弟在課室寫字': 'audio/tts/m_68281b5a3e1e.mp3',
  '我們假期去旅行': 'audio/tts/m_67140880c102.mp3',
  '我晚上認真溫習': 'audio/tts/m_b65460989a72.mp3',
  '爸爸在花園澆花': 'audio/tts/m_b9c9514fb28a.mp3',
  '老師在操場跑步': 'audio/tts/m_1b1b38ec2bdc.mp3',
  '蜜蜂在花叢飛舞': 'audio/tts/m_a09ba5407e8e.mp3',
  '農夫在田裏種菜': 'audio/tts/m_58a748b0c79c.mp3',
  '同學在圖書館看書': 'audio/tts/m_90ccca265ef9.mp3',
  '姐姐在圖書館借書': 'audio/tts/m_b1cb43a44515.mp3',
  '小朋友在操場跑步': 'audio/tts/m_d3310040c37a.mp3',
  '小朋友在沙池堆沙': 'audio/tts/m_a64c8d4babdd.mp3',
  '弟弟在客廳看電視': 'audio/tts/m_29e81c0b1044.mp3',
  '我們早上一起跑步': 'audio/tts/m_5b27842e0d4e.mp3',
  '老師在黑板上寫字': 'audio/tts/m_66a616e5a95a.mp3',
  '我們下課後一起打球': 'audio/tts/m_ba9ee77b44f4.mp3',
  '我們下課後一起收拾': 'audio/tts/m_d6a9595d685a.mp3',
  '他不但分數高，而且字也很工整。': 'audio/tts/m_b1d43c68a3a9.mp3',
  '如果用心溫習，你就會取得進步。': 'audio/tts/m_87666186d8aa.mp3',
  '姐姐不但會唱歌，而且還會跳舞。': 'audio/tts/m_fd776d4d3e35.mp3',
  '媽媽不但會煮湯，而且會烤蛋糕。': 'audio/tts/m_7e9870e81d8c.mp3',
  '弟弟不但愛看書，而且愛寫日記。': 'audio/tts/m_af6d4f93a76a.mp3',
  '因為下雨，所以我們留在家裏看書。': 'audio/tts/m_f59795dace53.mp3',
  '因為路很滑，所以我們慢慢地走路。': 'audio/tts/m_e8af0b927275.mp3',
  '如果大家齊心，這件事就容易辦成。': 'audio/tts/m_1a1d64be1d07.mp3',
  '如果明天天晴，我們就去公園野餐。': 'audio/tts/m_d1fcf905bad5.mp3',
  '如果週末放假，我們就去郊外遠足。': 'audio/tts/m_d610a8f0b81b.mp3',
  '雖然功課很多，姐姐仍然抽空溫習。': 'audio/tts/m_0a43d72b1891.mp3',
  '雖然外面很熱，我們仍然戴上帽子。': 'audio/tts/m_631507159f0a.mp3',
  '因為天氣轉涼，所以媽媽拿出厚衣服。': 'audio/tts/m_9ed0e2f0eb36.mp3',
  '因為愛護環境，所以我們不亂丟垃圾。': 'audio/tts/m_f8be7a97a664.mp3',
  '因為明天要早起，所以今晚早點睡覺。': 'audio/tts/m_929dc0dea0d7.mp3',
  '因為肚子餓了，所以媽媽煮麵給我們。': 'audio/tts/m_f6195d3016fe.mp3',
  '如果明天不用上課，我們就去圖書館。': 'audio/tts/m_e081b278c94b.mp3',
  '雖然下着大雨，但是同學仍然上學去。': 'audio/tts/m_e98f88853b7b.mp3',
  '雖然這次考試失敗，但是他並不灰心。': 'audio/tts/m_d689f78fc132.mp3',
  '雖然今天很累，但是弟弟仍然堅持練習。': 'audio/tts/m_b39932d9ae7f.mp3',
};
