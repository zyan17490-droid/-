import { CharacterKey, CharacterInfo, Question } from './types';

export const CHARACTERS: Record<CharacterKey, CharacterInfo> = {
  nezha: {
    name: '哪吒',
    personality: '勇敢、叛逆、热血，喜欢挑战，充满激情',
    tag: '勇敢热血小魔童',
    quote: '我命由我，不由天！',
    color: '#ef4444', // red-500
    prompt: '生成一张哪吒角色海报：角色：哪吒。角色性格特征：勇敢、叛逆、热血，喜欢挑战，充满激情。海报风格：动漫风格，色彩鲜明，动态感强。背景颜色/元素：红色火焰背景，带飞溅火焰特效。布局：角色在海报中心，脚踩风火轮，手握火尖枪。视觉效果：光影细腻，突出角色表情，海报整体震撼。',
  },
  aobing: {
    name: '敖丙',
    personality: '温和、理智、善良，冷静分析，讲道理',
    tag: '冷静理智少年侠',
    quote: '凡事皆有规则，顺其自然。',
    color: '#3b82f6', // blue-500
    prompt: '生成一张敖丙角色海报：角色：敖丙。角色性格特征：温和、理智、善良，冷静分析，讲道理。海报风格：动漫风格，色彩鲜明，水元素动态感。背景颜色/元素：蓝色水波背景，带流动水花效果。布局：角色居中，手持长枪，动作优雅。视觉效果：光影柔和，突出角色优雅与沉稳气质。',
  },
  shengongbao: {
    name: '申公豹',
    personality: '狡黠、聪明、爱捣乱，喜欢小聪明和恶作剧',
    tag: '狡猾小聪明',
    quote: '小聪明，大智慧。',
    color: '#a855f7', // purple-500
    prompt: '生成一张申公豹角色海报：角色：申公豹。角色性格特征：狡黠、聪明、爱捣乱，喜欢小聪明和恶作剧。海报风格：动漫风格，色彩鲜明，阴影感强。背景颜色/元素：紫色背景，带阴影和光斑效果。布局：角色居中，手持法宝，表情狡黠。视觉效果：突出角色表情与动作，整体有趣又狡猾。',
  },
  lijing: {
    name: '李靖',
    personality: '严厉、有责任感，成熟稳重，家庭至上',
    tag: '家人至上守护者',
    quote: '家人第一，责任至上。',
    color: '#eab308', // yellow-500
    prompt: '生成一张李靖角色海报：角色：李靖。角色性格特征：严厉、有责任感，成熟稳重，家庭至上。海报风格：动漫风格，色彩稳重，光影柔和。背景颜色/元素：金色背景，带祥云或神秘光晕效果。布局：角色居中，手持武器或卷轴，姿态坚定。视觉效果：突出角色威严与稳重感。',
  },
  yinfuren: {
    name: '殷夫人',
    personality: '善良、温柔、关爱，细腻体贴',
    tag: '温柔力量守护者',
    quote: '温柔是最大的力量。',
    color: '#ec4899', // pink-500
    prompt: '生成一张殷夫人角色海报：角色：殷夫人。角色性格特征：善良、温柔、关爱，细腻体贴。海报风格：动漫风格，色彩柔和，温暖感。背景颜色/元素：粉色背景，带光晕和花瓣效果。布局：角色居中，动作温柔，面带微笑。视觉效果：突出角色温柔气质和柔美光影。',
  },
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '面对困难，你会怎么做？',
    options: [
      { text: '迎难而上', character: 'nezha' },
      { text: '冷静分析', character: 'aobing' },
      { text: '找机会利用', character: 'shengongbao' },
      { text: '听从长辈建议', character: 'lijing' },
      { text: '安慰大家', character: 'yinfuren' },
    ],
  },
  {
    id: 2,
    text: '最看重的品质是？',
    options: [
      { text: '勇气', character: 'nezha' },
      { text: '理智', character: 'aobing' },
      { text: '聪明', character: 'shengongbao' },
      { text: '责任', character: 'lijing' },
      { text: '善良', character: 'yinfuren' },
    ],
  },
  {
    id: 3,
    text: '朋友做错事，你会？',
    options: [
      { text: '直接指出', character: 'nezha' },
      { text: '温和劝说', character: 'aobing' },
      { text: '偷偷制造麻烦', character: 'shengongbao' },
      { text: '严厉教训', character: 'lijing' },
      { text: '鼓励改正', character: 'yinfuren' },
    ],
  },
  {
    id: 4,
    text: '你在团队里通常是什么角色？',
    options: [
      { text: '冲锋先锋', character: 'nezha' },
      { text: '稳定中坚', character: 'aobing' },
      { text: '策划捣蛋', character: 'shengongbao' },
      { text: '指导者', character: 'lijing' },
      { text: '调解者', character: 'yinfuren' },
    ],
  },
  {
    id: 5,
    text: '面对新朋友，你的第一反应？',
    options: [
      { text: '直率打招呼', character: 'nezha' },
      { text: '先观察', character: 'aobing' },
      { text: '想办法逗笑', character: 'shengongbao' },
      { text: '礼貌问好', character: 'lijing' },
      { text: '体贴问候', character: 'yinfuren' },
    ],
  },
  {
    id: 6,
    text: '最喜欢的活动类型？',
    options: [
      { text: '冒险、挑战', character: 'nezha' },
      { text: '学习、分析', character: 'aobing' },
      { text: '游戏、恶作剧', character: 'shengongbao' },
      { text: '组织安排', character: 'lijing' },
      { text: '帮助他人', character: 'yinfuren' },
    ],
  },
  {
    id: 7,
    text: '你的座右铭？',
    options: [
      { text: '“无所畏惧”', character: 'nezha' },
      { text: '“顺其自然”', character: 'aobing' },
      { text: '“智取胜”', character: 'shengongbao' },
      { text: '“责任至上”', character: 'lijing' },
      { text: '“心怀善意”', character: 'yinfuren' },
    ],
  },
  {
    id: 8,
    text: '遇到不公平事情，你会？',
    options: [
      { text: '当场反抗', character: 'nezha' },
      { text: '寻求合理解决', character: 'aobing' },
      { text: '偷偷反击', character: 'shengongbao' },
      { text: '告诉长辈', character: 'lijing' },
      { text: '安慰受害者', character: 'yinfuren' },
    ],
  },
  {
    id: 9,
    text: '你最害怕的事？',
    options: [
      { text: '被束缚', character: 'nezha' },
      { text: '决策错误', character: 'aobing' },
      { text: '被忽视', character: 'shengongbao' },
      { text: '家人不信任', character: 'lijing' },
      { text: '伤害别人', character: 'yinfuren' },
    ],
  },
  {
    id: 10,
    text: '理想的一天？',
    options: [
      { text: '挑战自我', character: 'nezha' },
      { text: '平静生活', character: 'aobing' },
      { text: '充满惊喜', character: 'shengongbao' },
      { text: '家庭团聚', character: 'lijing' },
      { text: '帮助他人', character: 'yinfuren' },
    ],
  },
];
