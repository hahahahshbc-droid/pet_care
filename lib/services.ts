export type PetType = "dog" | "cat";

export type Service = {
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
  features: string[];
};

export const services: Record<PetType, Service[]> = {
  dog: [
    {
      name: "清爽基础浴",
      description: "干干净净，是快乐的第一步。",
      price: 79,
      duration: "约 60–90 分钟",
      icon: "♧",
      features: ["温和清洁 · 护毛调理", "耳部清洁 · 修剪指甲", "脚底毛整理 · 吹干梳顺"],
    },
    {
      name: "精致造型护",
      description: "让每一个小可爱，都有自己的风格。",
      price: 159,
      duration: "约 90–150 分钟",
      icon: "✂",
      features: ["包含清爽基础浴全部项目", "全身毛发修剪 · 专属造型", "面部精修 · 细节整理"],
    },
    {
      name: "柔润深层护",
      description: "给毛发加一点柔软，给拥抱加分。",
      price: 199,
      duration: "约 90–120 分钟",
      icon: "✧",
      features: ["包含清爽基础浴全部项目", "深层护毛 · 柔顺护理", "浮毛梳理 · 毛发养护建议"],
    },
  ],
  cat: [
    {
      name: "喵喵清爽浴",
      description: "给爱干净的小猫，细致的清洁。",
      price: 129,
      duration: "约 60–90 分钟",
      icon: "♧",
      features: ["猫咪专用洗护 · 温水清洁", "耳部清洁 · 修剪指甲", "轻柔吹干 · 毛发梳顺"],
    },
    {
      name: "蓬松去浮毛",
      description: "梳掉多余浮毛，轻盈自在。",
      price: 189,
      duration: "约 90–120 分钟",
      icon: "✂",
      features: ["包含喵喵清爽浴全部项目", "分层梳理 · 浮毛护理", "局部毛发整理 · 护理建议"],
    },
    {
      name: "长毛柔润护",
      description: "照顾每一缕长毛，柔软好摸。",
      price: 229,
      duration: "约 90–150 分钟",
      icon: "✧",
      features: ["包含喵喵清爽浴全部项目", "长毛柔顺护理 · 深层护毛", "细致梳理 · 日常养护建议"],
    },
  ],
};
