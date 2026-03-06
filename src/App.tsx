/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Rocket, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Cpu,
  Globe,
  Briefcase,
  ArrowRight,
  Loader2,
  Sparkles,
  FileText,
  ArrowLeft,
  Edit3,
  Upload,
  Plus,
  Share2,
  MessageSquare,
  Coins,
  UserPlus,
  Zap
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceDot,
  ReferenceLine,
  Label
} from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';
import { EnterpriseProfile, GrowthMilestone, ServiceMatch, SuccessCase } from './types';

// --- Mock Data for Visualization (10-Year Trajectory) ---
const growthData = [
  { year: '2024', value: 40, pred: 40, milestone: '申报科技型中小企业', potentialRisks: ['研发投入不足', '核心人才流失'] },
  { year: '2024.5', value: 48, pred: 48 },
  { year: '2025', value: 55, pred: 55, milestone: '人员突破 100 人', potentialRisks: ['管理成本激增', '企业文化稀释'] },
  { year: '2025.5', value: 64, pred: 64 },
  { year: '2026', value: 72, pred: 72, milestone: '申报高新技术企业', potentialRisks: ['知识产权纠纷', '技术迭代滞后'] },
  { year: '2026.5', value: null, pred: 84 },
  { year: '2027', value: null, pred: 95, milestone: '申报专精特新“小巨人”', potentialRisks: ['市场竞争加剧', '供应链波动'] },
  { year: '2027.5', value: null, pred: 112 },
  { year: '2028', value: null, pred: 130, milestone: '人员突破 500 人', potentialRisks: ['组织架构僵化', '现金流压力'] },
  { year: '2028.5', value: null, pred: 155 },
  { year: '2029', value: null, pred: 180, milestone: '申报省级重点实验室', potentialRisks: ['科研成果转化难', '政策环境变化'] },
  { year: '2029.5', value: null, pred: 220 },
  { year: '2030', value: null, pred: 260, milestone: '人员突破 1000 人', potentialRisks: ['全球化扩张阻力', '合规性风险'] },
  { year: '2030.5', value: null, pred: 320 },
  { year: '2031', value: null, pred: 380, milestone: '申报国家级工程中心', potentialRisks: ['技术瓶颈突破难', '品牌声誉风险'] },
  { year: '2031.5', value: null, pred: 450 },
  { year: '2032', value: null, pred: 520, milestone: '人员突破 2000 人', potentialRisks: ['大企业病', '市场饱和'] },
  { year: '2032.5', value: null, pred: 610 },
  { year: '2033', value: null, pred: 700, milestone: '申报行业标准领跑者', potentialRisks: ['颠覆性技术冲击', '反垄断审查'] },
];

// --- AI Background Animation Component ---
const BackgroundAI = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Animated Gradient Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-500/15 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -80, 0],
          y: [0, 120, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-purple-500/15 rounded-full blur-[120px]"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(79, 70, 229, 0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* Neural Network / Data Flow SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Animated Lines */}
        {[...Array(20)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="currentColor"
            strokeWidth="1"
            className="text-indigo-500"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Pulsing Nodes */}
        {[...Array(25)].map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r={Math.random() * 4 + 2}
            fill="currentColor"
            className="text-indigo-600"
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            filter="url(#glow)"
          />
        ))}
      </svg>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<'landing' | 'searching' | 'confirming' | 'dashboard'>('landing');
  const [companyName, setCompanyName] = useState('');
  const [profile, setProfile] = useState<EnterpriseProfile | null>(null);
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCase, setSelectedCase] = useState<(SuccessCase & { details: string, path: string[] }) | null>(null);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempDesc, setTempDesc] = useState('');
  const [dynamicRisks, setDynamicRisks] = useState<string[]>([]);
  const [jiaxingCustomer, setJiaxingCustomer] = useState<{ name: string, reason: string } | null>(null);
  const [roadmapTasks, setRoadmapTasks] = useState([
    { id: 1, task: "完善 2025 年度研发费用归集", status: "completed", category: "财务" },
    { id: 2, task: "提交 3 项核心发明专利申请", status: "in-progress", category: "技术" },
    { id: 3, task: "完成高级算法工程师团队组建", status: "todo", category: "人才" },
    { id: 4, task: "启动专精特新“小巨人”预申报", status: "todo", category: "政策" },
  ]);
  const [intelligence, setIntelligence] = useState([
    { id: 1, type: 'policy', title: '嘉兴市 2026 年度首台套装备奖励申报启动', time: '10分钟前' },
    { id: 2, type: 'competitor', title: '竞品“旷视科技”发布最新工业质检大模型', time: '2小时前' },
    { id: 3, type: 'market', title: '长三角机器人产业集群专项资金公示', time: '5小时前' },
  ]);

  const [jiaxingOpportunities, setJiaxingOpportunities] = useState([
    { id: 1, industry: '新能源汽车', type: '供应链对接', title: '寻找年产 5000 吨级高纯度铝箔供应商', company: '某嘉兴百强汽配企业', time: '2小时前' },
    { id: 2, industry: '集成电路', type: '融资需求', title: 'A 轮融资 5000 万，投后估值 3 亿', company: '某南湖区高新芯片设计企业', time: '5小时前' },
    { id: 3, industry: '生物医药', type: '人才猎聘', title: '急聘首席科学家（年薪 150w+）', company: '某秀洲区生物医药研发平台', time: '1天前' },
    { id: 4, industry: '智能制造', type: '数字化转型', title: '寻求 2000㎡ 智慧工厂整体解决方案', company: '某海宁市传统制造转型企业', time: '1天前' },
  ]);

  const toggleTask = (id: number) => {
    setRoadmapTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'completed' ? 'todo' : t.status === 'todo' ? 'in-progress' : 'completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const handleSearch = async () => {
    const query = companyName.trim();
    if (!query) return;
    
    // 1. Priority: Special handling for 浙江金数湾科技有限公司
    if (query.includes('浙江金数湾') || query.includes('金数湾')) {
      setStep('searching');
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `你是一个专业的企业咨询顾问。请联网搜索并深入分析"浙江金数湾科技有限公司"。
          这家公司位于嘉兴，主要从事大数据和人工智能业务。
          请提供：
          1. 企业画像（名称、行业、阶段、简介、核心技术、竞品、融资状态、营收估算、员工规模、行业挑战）
          2. 成长预测（未来3-5年的发展趋势预测）
          3. 要素匹配（匹配嘉兴本地的政策、基金、人才、安全方案）
          
          返回JSON格式：
          {
            "name": "浙江金数湾科技有限公司",
            "industry": "大数据/人工智能",
            "stage": "成长期",
            "description": "...",
            "keyTech": ["...", "..."],
            "competitors": ["...", "..."],
            "fundingStatus": "...",
            "revenue": "...",
            "employeeCount": "...",
            "industryChallenges": ["...", "..."],
            "growthPrediction": "未来3-5年预测内容...",
            "matchedElements": {
              "policies": ["政策1", "政策2"],
              "funds": ["基金1", "基金2"],
              "talents": ["人才需求1", "人才需求2"],
              "security": ["安全方案1"]
            }
          }`,
          config: { 
            responseMimeType: "application/json",
            tools: [{ googleSearch: {} }] 
          }
        });
        
        const text = response.text;
        if (!text) throw new Error("Empty response from AI");
        
        const data = JSON.parse(text);
        setProfile(data);
        
        setJiaxingOpportunities([
          { id: 101, industry: '大数据', type: '技术合作', title: '寻找具备大规模分布式存储经验的合作伙伴', company: '某嘉兴政务云服务商', time: '刚刚' },
          { id: 102, industry: '人工智能', type: '场景对接', title: '智慧城市视觉识别算法采购需求', company: '嘉兴市某区城管局', time: '10分钟前' },
          { id: 103, industry: '数字经济', type: '政策申报', title: '2026年度嘉兴市数字化转型标杆企业奖励公示', company: '嘉兴市经信局', time: '1小时前' },
          { id: 104, industry: '算力服务', type: '资源对接', title: '寻求 500P 算力租赁长期合作伙伴', company: '某长三角算力中心', time: '3小时前' },
        ]);

        setStep('confirming');
        return;
      } catch (error) {
        console.error("Special search failed, using fallback:", error);
        // Fallback for Jinshuwan if API fails
        setProfile({
          name: "浙江金数湾科技有限公司",
          industry: "大数据/人工智能",
          stage: "成长期",
          description: "浙江金数湾科技有限公司（简称“金数湾”）是一家专注于大数据处理、人工智能算法研发及算力服务的高新技术企业。公司立足嘉兴，深度参与长三角一体化数字经济建设，致力于为政府及企业提供全栈式数字化转型解决方案。",
          keyTech: ["分布式存储架构", "多模态大模型调度", "隐私计算技术"],
          competitors: ["阿里云", "腾讯云", "商汤科技"],
          fundingStatus: "B轮融资中",
          revenue: "约 1.2 亿人民币 (2025)",
          employeeCount: "200-500人",
          industryChallenges: ["算力资源成本波动", "数据合规性监管加强"],
          growthPrediction: "预计未来3年将成为长三角地区领先的算力调度平台，营收规模有望突破5亿元，并启动科创板上市计划。",
          matchedElements: {
            "policies": ["嘉兴市数字经济核心产业奖励", "浙江省专精特新中小企业补贴"],
            "funds": ["嘉兴南湖基金", "长三角数字经济产业基金"],
            "talents": ["资深算法架构师", "大数据安全专家"],
            "security": ["数据全生命周期加密方案"]
          }
        });
        setStep('confirming');
        return;
      }
    }

    // 2. Check if it's a question
    const isQuestion = query.includes('?') || query.includes('？') || 
                      query.includes('如何') || query.includes('怎么') || 
                      query.includes('什么') || query.includes('为什么');
    
    if (isQuestion) {
      setIsChatting(true);
      setChatResponse(null);
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `你是一个专业的企业经营顾问。请回答关于企业经营的问题："${query}"。
          请提供专业、具体且有见地的建议，涵盖政策、资金、人才或安全等方面。
          以Markdown格式返回。`,
        });
        setChatResponse(response.text || '抱歉，我暂时无法回答这个问题。');
      } catch (error) {
        console.error("Chat failed:", error);
        setChatResponse('咨询服务暂时繁忙，请稍后再试。');
      }
      return;
    }

    setStep('searching');

    // Special handling for SenseTime to show deep development path
    if (companyName.includes('商汤') || companyName.toLowerCase().includes('sensetime')) {
      setTimeout(() => {
        setProfile({
          name: "商汤科技 (SenseTime)",
          industry: "人工智能 / 计算机视觉",
          stage: "成熟期",
          description: "全球领先的人工智能软件公司，专注于计算机视觉和深度学习技术。业务涵盖智慧城市、智慧商业、智慧生活和智能汽车四大板块。",
          keyTech: ["深度学习平台 SenseParrot", "超算中心 AIDC", "通用大模型 SenseNova"],
          competitors: ["旷视科技", "依图科技", "云从科技", "海康威视"],
          fundingStatus: "已上市 (HKEX: 0020)",
          revenue: "约 38 亿人民币 (2023)",
          employeeCount: "5000+",
          industryChallenges: ["算力成本持续攀升", "数据隐私监管趋严", "大模型商业化落地路径尚不清晰", "高端人才竞争激烈"]
        });
        setStep('confirming');
      }, 1500);
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `你是一个专业的企业咨询顾问。请联网搜索并分析名为"${companyName}"的企业。
        如果找不到真实企业，请根据名称猜测其可能的业务方向，生成一个合理的模拟画像。
        返回JSON格式：
        {
          "name": "企业名称",
          "industry": "所属行业",
          "stage": "种子期/初创期/成长期/成熟期",
          "description": "企业简介",
          "keyTech": ["技术关键词1", "2"],
          "competitors": ["竞品1", "2"],
          "fundingStatus": "当前融资状态",
          "industryChallenges": ["行业困境1", "行业困境2"]
        }`,
        config: { 
          responseMimeType: "application/json",
          tools: [{ googleSearch: {} }] 
        }
      });

      const data = JSON.parse(response.text || '{}');
      setProfile(data);
      setStep('confirming');
    } catch (error) {
      console.error("Search failed:", error);
      // Fallback mock
      setProfile({
        name: companyName,
        industry: "科技创新",
        stage: "初创期",
        description: "一家专注于前沿技术研发的科创企业。",
        keyTech: ["人工智能", "大数据"],
        competitors: ["行业头部企业A", "创新公司B"],
        fundingStatus: "天使轮",
        industryChallenges: ["市场认知度低", "资金链紧张", "人才招聘困难"]
      });
      setStep('confirming');
    }
  };

  const generateSolution = async (type: 'policy' | 'fund' | 'talent' | 'security') => {
    setIsChatting(true);
    setChatResponse(null);
    const prompts = {
      policy: "请为一家科创企业生成一份未来3年的政策申报规划方案，包含国家级、省级专项补贴建议。",
      fund: "请为一家处于成长期的科技企业生成一份融资与政府引导基金对接方案，包含股权融资建议。",
      talent: "请为一家高新技术企业生成一份核心人才梯队建设与高端人才猎聘解决方案。",
      security: "请为一家企业生成一份全方位的智能化升级与 AI 赋能解决方案，助力企业提质增效。"
    };
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompts[type],
      });
      setChatResponse(response.text || '方案生成失败。');
    } catch (error) {
      setChatResponse('方案生成服务暂时不可用。');
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    
    // Generate some dynamic risks based on profile
    if (profile) {
      if (profile.name.includes('商汤')) {
        setDynamicRisks([
          "技术性失业与组织重构压力",
          "核心算法被开源技术替代的风险",
          "地缘政治导致的高端芯片断供风险"
        ]);
        setJiaxingCustomer({
          name: "嘉兴敏实集团 (Minth Group)",
          reason: "敏实集团作为全球汽车零部件百强，正大力推进智慧工厂建设，对计算机视觉与工业质检有巨大需求。"
        });
      } else {
        setDynamicRisks([
          `${profile.industry}领域准入门槛提高的政策风险`,
          `核心技术${profile.keyTech[0]}被颠覆的风险`,
          `与${profile.competitors[0]}等竞品的同质化竞争风险`
        ]);
        
        // Generic Jiaxing customer based on industry or just a reasonable guess
        const jiaxingCompanies = [
          { name: "嘉兴卫星化学", reason: "作为化工龙头，其数字化转型与安全监控系统升级是您的潜在切入点。" },
          { name: "嘉兴合盛硅业", reason: "光伏材料领军企业，对自动化生产线优化有持续的采购意向。" },
          { name: "嘉兴福莱特玻璃", reason: "全球光伏玻璃巨头，正在寻求更高效的供应链管理解决方案。" }
        ];
        const randomCompany = jiaxingCompanies[Math.floor(Math.random() * jiaxingCompanies.length)];
        setJiaxingCustomer(randomCompany);
      }
    }

    setTimeout(() => {
      setStep('dashboard');
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
      {step === 'landing' && <BackgroundAI />}
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">小湾企服 <span className="text-indigo-600">Pro</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">智能政策</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">智能基金</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">融资服务</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">数据安全</a>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all">
            管理后台
          </button>
        </div>
      </nav>

      <main className="relative min-h-[80vh] max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <div key="landing-container" className="relative w-full">
              <motion.div 
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative text-center max-w-3xl mx-auto py-20 z-10"
              >
                <div className="relative">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
                全生命周期企业智能服务平台
              </h1>
              <p className="text-xl font-medium text-indigo-600/80 mb-6 tracking-widest">
                开启“一行一策 千企千略”精准服务范式
              </p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                输入企业名称开启智能诊断，或直接向 AI 提问关于政策、资金、人才及安全生产的经营难题。
              </p>
              
              <div className="relative max-w-2xl mx-auto group mb-12">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl border border-slate-200 p-2">
                  <MessageSquare className="ml-4 text-indigo-500" size={24} />
                  <input 
                    type="text" 
                    placeholder="输入企业名称诊断，或提问：如何申请专精特新？"
                    className="flex-1 px-4 py-3 outline-none text-lg"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button 
                    onClick={handleSearch}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2"
                  >
                    AI 咨询 <Zap size={18} />
                  </button>
                </div>
              </div>

              {/* Chat Response Overlay */}
              <AnimatePresence>
                {isChatting && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="max-w-2xl mx-auto mb-12 bg-white rounded-3xl border border-indigo-100 shadow-xl overflow-hidden text-left"
                  >
                    <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                        <Sparkles size={16} />
                        AI 智能方案建议
                      </div>
                      <button onClick={() => setIsChatting(false)} className="text-slate-400 hover:text-slate-600">
                        <Plus size={20} className="rotate-45" />
                      </button>
                    </div>
                    <div className="p-6 max-h-[400px] overflow-y-auto prose prose-slate prose-sm max-w-none">
                      {chatResponse ? (
                        <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                          {chatResponse}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 text-slate-400 py-8 justify-center">
                          <Loader2 className="animate-spin" size={20} />
                          正在为您生成定制化解决方案...
                        </div>
                      )}
                    </div>
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
                      <button className="text-indigo-600 font-bold text-sm flex items-center gap-1">
                        下载完整方案 <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Service Entries Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
                <div 
                  onClick={() => generateSolution('policy')}
                  className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">问政策</h4>
                  <p className="text-xs text-slate-500">定制未来政策规划</p>
                </div>
                <div 
                  onClick={() => generateSolution('fund')}
                  className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Coins size={24} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">找投资</h4>
                  <p className="text-xs text-slate-500">定制资金对接方案</p>
                </div>
                <div 
                  onClick={() => generateSolution('talent')}
                  className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UserPlus size={24} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">聘人才</h4>
                  <p className="text-xs text-slate-500">高端人才精准猎聘</p>
                </div>
                <div 
                  onClick={() => generateSolution('security')}
                  className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">智能化</h4>
                  <p className="text-xs text-slate-500">定制 AI 转型方案</p>
                </div>
              </div>
              
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-xs uppercase tracking-widest font-semibold">服务企业</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl font-bold">¥50B+</div>
                  <div className="text-xs uppercase tracking-widest font-semibold">撮合融资</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-xs uppercase tracking-widest font-semibold">精准匹配率</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-xs uppercase tracking-widest font-semibold">智能监控</div>
                </div>
              </div>

              {/* Jiaxing Region Opportunities Feed - NEW ENGAGEMENT FEATURE */}
              <div className="mt-24 text-left">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                      嘉兴地区企业商机
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full animate-pulse">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        LIVE
                      </span>
                    </h2>
                    <p className="text-slate-500">实时更新嘉兴本地企业的合作、融资与人才需求</p>
                  </div>
                  <button className="text-indigo-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    查看更多商机 <ChevronRight size={20} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {jiaxingOpportunities.map((opp) => (
                    <div key={opp.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all group cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg uppercase tracking-wider">
                          {opp.industry}
                        </span>
                        <span className="text-[10px] text-slate-400">{opp.time}</span>
                      </div>
                      <div className="mb-4">
                        <div className="text-xs font-bold text-indigo-500 mb-1">{opp.type}</div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                          {opp.title}
                        </h4>
                      </div>
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                            <ShieldCheck size={12} className="text-slate-400" />
                          </div>
                          <span className="text-[10px] font-medium text-slate-500 italic">{opp.company}</span>
                        </div>
                        <button className="text-indigo-600">
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">想让您的需求也被精准匹配？</h3>
                    <p className="text-indigo-100/80 text-sm">入驻小湾生态圈，让 AI 为您精准对接嘉兴乃至长三角的优质资源。</p>
                  </div>
                  <button className="relative z-10 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg">
                    立即免费入驻
                  </button>
                </div>
              </div>

              {/* Featured Services Section */}
              <div className="mt-24 text-left">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">热门服务专区</h2>
                    <p className="text-slate-500">根据当前行业趋势为您推荐的高频服务</p>
                  </div>
                  <button className="text-indigo-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    查看全部服务 <ChevronRight size={20} />
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:shadow-xl transition-all group">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <BarChart3 size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">融资路演诊断</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      AI 深度解析您的 BP，对标 500+ 活跃 VC 投资偏好，提供估值建议与路演话术优化。
                    </p>
                    <button className="w-full py-3 bg-slate-50 text-slate-900 rounded-2xl font-bold hover:bg-indigo-600 hover:text-white transition-all">
                      立即开始
                    </button>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:shadow-xl transition-all group">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">知识产权导航</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      全网扫描技术竞品，预判专利侵权风险，为您定制核心技术专利布局策略。
                    </p>
                    <button className="w-full py-3 bg-slate-50 text-slate-900 rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all">
                      立即扫描
                    </button>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:shadow-xl transition-all group">
                    <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all">
                      <Rocket size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">政策申报管家</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      24h 监控全国政策动态，自动匹配符合条件的奖补项目，一键生成申报材料初稿。
                    </p>
                    <button className="w-full py-3 bg-slate-50 text-slate-900 rounded-2xl font-bold hover:bg-orange-600 hover:text-white transition-all">
                      查看匹配
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

          {step === 'searching' && (
            <motion.div 
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40"
            >
              <button 
                onClick={() => setStep('landing')}
                className="mb-8 flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft size={18} /> 返回重新搜索
              </button>
              <div className="relative">
                <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                  <Globe size={32} className="animate-pulse" />
                </div>
              </div>
              <h2 className="mt-8 text-2xl font-bold">正在全网检索企业资料...</h2>
              <p className="mt-2 text-slate-500">正在调取工商信息、新闻动态及行业趋势数据</p>
            </motion.div>
          )}

          {step === 'confirming' && profile && (
            <motion.div 
              key="confirming"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setStep('landing')}
                className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
              >
                <ArrowLeft size={18} /> 返回重新搜索
              </button>
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-indigo-600 p-8 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
                      <div className="flex gap-2">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {profile.industry}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {profile.stage}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
                      <CheckCircle2 size={24} />
                    </div>
                  </div>
                </div>
                
                <div className="p-8 grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">企业画像核实</h3>
                      <button 
                        onClick={() => {
                          if (isEditingDesc) {
                            setProfile(prev => prev ? { ...prev, description: tempDesc } : null);
                          } else {
                            setTempDesc(profile.description);
                          }
                          setIsEditingDesc(!isEditingDesc);
                        }}
                        className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:underline"
                      >
                        {isEditingDesc ? <><CheckCircle2 size={14} /> 保存修改</> : <><Edit3 size={14} /> 修改信息</>}
                      </button>
                    </div>
                    {isEditingDesc ? (
                      <textarea 
                        value={tempDesc}
                        onChange={(e) => setTempDesc(e.target.value)}
                        className="w-full h-32 p-4 bg-slate-50 border border-indigo-200 rounded-2xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
                      />
                    ) : (
                      <p className="text-slate-700 leading-relaxed mb-6">
                        {profile.description}
                      </p>
                    )}
                    
                    <div className="space-y-4">
                      {profile.growthPrediction && (
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-6">
                          <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <TrendingUp size={16} /> AI 成长预测 (2026-2030)
                          </h3>
                          <p className="text-sm text-slate-700 leading-relaxed italic">
                            {profile.growthPrediction}
                          </p>
                        </div>
                      )}

                      {profile.matchedElements && (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                            <h4 className="text-[10px] font-bold text-orange-600 uppercase mb-2 flex items-center gap-1">
                              <FileText size={12} /> 匹配政策
                            </h4>
                            <ul className="text-[10px] text-slate-600 space-y-1">
                              {profile.matchedElements.policies.map((p, i) => <li key={i}>• {p}</li>)}
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                            <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-2 flex items-center gap-1">
                              <Coins size={12} /> 匹配基金
                            </h4>
                            <ul className="text-[10px] text-slate-600 space-y-1">
                              {profile.matchedElements.funds.map((f, i) => <li key={i}>• {f}</li>)}
                            </ul>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {profile.revenue && (
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">年度营收</div>
                            <div className="text-sm font-bold text-slate-700">{profile.revenue}</div>
                          </div>
                        )}
                        {profile.employeeCount && (
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">人员规模</div>
                            <div className="text-sm font-bold text-slate-700">{profile.employeeCount}</div>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">核心技术</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profile.keyTech.map(tech => (
                            <span key={tech} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium border border-indigo-100">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">行业竞品</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profile.competitors.map(comp => (
                            <span key={comp} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-sm font-medium">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">补充材料与介绍</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                            <Upload size={18} className="text-slate-400 group-hover:text-indigo-600" />
                          </div>
                          <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-600">上传商业计划书</span>
                        </div>
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                            <Plus size={18} className="text-slate-400 group-hover:text-indigo-600" />
                          </div>
                          <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-600">添加更多介绍</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="text-indigo-600" size={20} />
                      初步诊断建议
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={14} />
                        </div>
                        <p className="text-sm text-slate-600">您的技术方向与当前“智能制造”专项补贴高度契合。</p>
                      </li>
                      <li className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                          <AlertCircle size={14} />
                        </div>
                        <p className="text-sm text-slate-600">检测到同行业近期有大规模数据泄露事件，建议升级数据安全等级。</p>
                      </li>
                      <li className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <Rocket size={14} />
                        </div>
                        <p className="text-sm text-slate-600">当前融资进度落后于同类竞品，建议开启新一轮融资规划。</p>
                      </li>
                    </ul>
                    
                    <button 
                      onClick={startAnalysis}
                      disabled={isAnalyzing}
                      className="w-full mt-8 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                    >
                      {isAnalyzing ? (
                        <><Loader2 className="animate-spin" size={20} /> 正在生成全生命周期规划...</>
                      ) : (
                        "确认信息并生成智能规划"
                      )}
                    </button>
                    <p className="text-[10px] text-slate-400 text-center mt-4">
                      * 基于小湾企服“智能画像引擎”自动生成，数据安全受“小湾安全盾”保护
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'dashboard' && profile && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setStep('confirming')}
                    className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
                    title="返回核实界面"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h1 className="text-3xl font-bold">{profile.name} · 成长导航</h1>
                    <p className="text-slate-500">基于数百万企业发展案例库 AI 推演的未来 10 年发展轨迹</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all flex items-center gap-2">
                    <Share2 size={16} className="text-indigo-600" />
                    分享成长报告
                  </button>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2">
                    联系专属顾问
                  </button>
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Growth Prediction */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <TrendingUp className="text-indigo-600" size={24} />
                      成长潜力预测
                    </h3>
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                        <span>历史数据</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-indigo-300 rounded-full"></div>
                        <span>AI 预测</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={growthData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C7D2FE" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#C7D2FE" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis 
                          dataKey="year" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#94A3B8', fontSize: 12}} 
                          padding={{ left: 10, right: 10 }}
                          ticks={['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033']}
                        />
                        <YAxis hide domain={[0, 'dataMax + 100']} />
                        <Tooltip 
                          cursor={{ stroke: '#E2E8F0', strokeWidth: 2 }}
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = growthData.find(d => d.year === label);
                              const isPrediction = data?.value === null;
                              return (
                                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-slate-100 max-w-[260px] animate-in fade-in zoom-in duration-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label} 年度分析</div>
                                    <div className={cn(
                                      "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
                                      isPrediction ? "bg-indigo-100 text-indigo-600" : "bg-emerald-100 text-emerald-600"
                                    )}>
                                      {isPrediction ? "AI 预测" : "历史实绩"}
                                    </div>
                                  </div>
                                  <div className="text-lg font-bold text-slate-900 mb-1">
                                    {data?.milestone || '稳健增长期'}
                                  </div>
                                  <div className="text-2xl font-black text-indigo-600 mb-3">
                                    {isPrediction ? data?.pred : data?.value}
                                    <span className="text-xs font-medium text-slate-400 ml-1">成长指数</span>
                                  </div>
                                  
                                  {data?.potentialRisks && (
                                    <div className="mt-2 pt-2 border-t border-slate-100">
                                      <div className="text-[10px] font-bold text-amber-600 uppercase mb-2 flex items-center gap-1">
                                        <AlertCircle size={10} /> 潜在挑战与风险
                                      </div>
                                      <div className="grid grid-cols-1 gap-1.5">
                                        {data.potentialRisks.map((risk, i) => (
                                          <div key={i} className="text-[10px] text-slate-500 flex items-start gap-2 bg-slate-50 p-1.5 rounded-lg">
                                            <span className="mt-1 w-1 h-1 bg-amber-400 rounded-full shrink-0" />
                                            {risk}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="pred" 
                          stroke="#C7D2FE" 
                          fill="url(#colorPred)" 
                          strokeWidth={2} 
                          strokeDasharray="5 5" 
                          animationDuration={2000}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#4F46E5" 
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                          strokeWidth={4}
                          activeDot={{ r: 6, strokeWidth: 0, fill: '#4F46E5' }}
                          animationDuration={1500}
                        />
                        
                        {/* Present Day Reference Line */}
                        <ReferenceLine 
                          x="2026" 
                          stroke="#4F46E5" 
                          strokeDasharray="3 3" 
                          strokeWidth={2}
                          label={{ 
                            value: '当前节点', 
                            position: 'top', 
                            fill: '#4F46E5', 
                            fontSize: 12, 
                            fontWeight: 'bold',
                            dy: -10
                          }} 
                        />
                        
                        {/* Milestones Markers */}
                        {growthData.map((entry, index) => (
                          entry.milestone && (index % 2 === 0 || entry.year === '2027') && (
                            <ReferenceDot
                              key={index}
                              x={entry.year}
                              y={entry.pred}
                              r={5}
                              fill="#4F46E5"
                              stroke="#fff"
                              strokeWidth={2}
                            >
                              <Label
                                value={entry.milestone}
                                position="top"
                                offset={12}
                                style={{ 
                                  fill: '#4338CA', 
                                  fontSize: '11px', 
                                  fontWeight: '700'
                                }}
                              />
                            </ReferenceDot>
                          )
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3">
                    <Sparkles className="text-indigo-600 shrink-0" size={20} />
                    <p className="text-sm text-indigo-900">
                      {profile.name.includes('商汤') 
                        ? "AI 深度分析：基于数百万企业案例库推演，商汤科技在通用大模型 SenseNova 的持续投入已进入产出期。未来 10 年，随着 AIDC 算力租赁的毛利贡献增加，企业将进入指数级增长阶段。"
                        : `AI 深度分析：基于数百万企业案例库推演，由于您在${profile.keyTech[0]}领域的持续投入，预计未来 10 年将迎来业务爆发期，建议提前储备人才与服务器资源。`}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                      <span>实绩曲线</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-300 border border-dashed border-indigo-400"></div>
                      <span>AI 预测路径</span>
                    </div>
                    <div className="ml-auto italic">* 成长指数基于营收、人才规模及政策匹配度综合计算</div>
                  </div>

                  {/* Growth Roadmap - NEW STICKINESS FEATURE */}
                  <div className="mt-10">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <CheckCircle2 className="text-emerald-500" size={20} />
                          企业成长路线图
                        </h4>
                        <p className="text-xs text-slate-500">基于 AI 预测为您定制的行动清单，完成度越高，预测准确率越高</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-indigo-600">25%</span>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">当前完成度</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {roadmapTasks.map((task) => (
                        <div 
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={cn(
                            "p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3",
                            task.status === 'completed' ? "bg-emerald-50 border-emerald-100" : 
                            task.status === 'in-progress' ? "bg-indigo-50 border-indigo-100 ring-2 ring-indigo-600/20" :
                            "bg-white border-slate-200 hover:border-indigo-300"
                          )}
                        >
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                            task.status === 'completed' ? "bg-emerald-500 text-white" : 
                            task.status === 'in-progress' ? "bg-indigo-600 text-white animate-pulse" :
                            "border-2 border-slate-200 text-slate-200"
                          )}>
                            {task.status === 'completed' ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <span className={cn("text-sm font-bold", task.status === 'completed' ? "text-emerald-900" : "text-slate-700")}>
                                {task.task}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{task.category}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="p-4 rounded-2xl border border-dashed border-slate-300 text-slate-400 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                        <Plus size={16} /> 添加自定义任务
                      </button>
                    </div>
                  </div>

                  {/* Industry & Enterprise Predicaments Section */}
                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Globe size={16} className="text-slate-400" />
                        行业当前困境 (Industry Challenges)
                      </h4>
                      <div className="space-y-3">
                        {profile.industryChallenges?.map((challenge, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                            <p className="text-sm text-slate-600 leading-relaxed">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                      <h4 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <AlertCircle size={16} />
                        企业潜在困境 (Future Risks)
                      </h4>
                      <div className="space-y-3">
                        {dynamicRisks.map((risk, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            <p className="text-sm text-slate-700 font-medium">{risk}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Future Elements Matching */}
                <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Cpu size={24} />
                    未来要素匹配
                  </h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-400">人才缺口</span>
                        <span className="text-xs bg-indigo-500 px-2 py-0.5 rounded">高匹配</span>
                      </div>
                      <div className="text-lg font-bold">高级算法工程师 (3名)</div>
                      <p className="text-xs text-slate-500 mt-1">匹配小湾人才库，已锁定 12 名候选人</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-400">政策匹配</span>
                        <span className="text-xs bg-emerald-500 px-2 py-0.5 rounded">可申请</span>
                      </div>
                      <div className="text-lg font-bold">高新技术企业认定</div>
                      <p className="text-xs text-slate-500 mt-1">预计可减免税收 ¥200k/年</p>
                      
                      <button className="mt-3 w-full py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 text-[10px] font-bold rounded-lg transition-all">
                        查看申报成功率分析
                      </button>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-400">办公空间</span>
                        <span className="text-xs bg-blue-500 px-2 py-0.5 rounded">扩容预警</span>
                      </div>
                      <div className="text-lg font-bold">小湾科创园 B座 500㎡</div>
                      <p className="text-xs text-slate-500 mt-1">预计 8 月份当前空间将达到饱和</p>
                    </div>
                    {jiaxingCustomer && (
                      <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-indigo-300">嘉兴潜在商机</span>
                          <span className="text-xs bg-indigo-600 px-2 py-0.5 rounded">本地推荐</span>
                        </div>
                        <div className="text-lg font-bold text-indigo-200">{jiaxingCustomer.name}</div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {jiaxingCustomer.reason}
                        </p>
                      </div>
                    )}

                    {/* Join Us Card */}
                    <div className="mt-8 p-6 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl border border-indigo-500/30 border-dashed group cursor-pointer hover:bg-indigo-600/30 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <Users size={20} />
                        </div>
                        <h4 className="font-bold text-indigo-100">加入小湾生态圈</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        加入我们，您的企业也将作为优质要素，出现在其他合适企业的智能匹配推荐中。同时，我们将为您<span className="text-indigo-300 font-bold">持续推送潜在商机</span>，实现生态共赢。
                      </p>
                      <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors">
                        立即入驻
                      </button>
                    </div>
                  </div>
                </div>
                </div>

                {/* Integrated Services */}
                <div className="lg:col-span-3 mt-12">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Briefcase className="text-indigo-600" size={24} />
                      全生命周期集成服务
                    </h3>
                    <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl flex items-center gap-3">
                      <div className="flex items-center gap-1 text-indigo-700 font-bold text-sm">
                        <Users size={16} />
                        邀请好友入驻
                      </div>
                      <div className="h-4 w-px bg-indigo-200"></div>
                      <p className="text-xs text-indigo-600">每邀请一家企业入驻，即可解锁更多行业深度报告</p>
                      <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-indigo-700 transition-colors">
                        立即邀请
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {/* Market Intelligence Feed - NEW STICKINESS FEATURE */}
                    <div className="bg-slate-900 rounded-3xl p-6 border border-white/10 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Globe size={16} className="text-indigo-400" />
                          实时情报流
                        </h4>
                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                      </div>
                      <div className="space-y-4 flex-1">
                        {intelligence.map(item => (
                          <div key={item.id} className="group cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                              <span className={cn(
                                "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase",
                                item.type === 'policy' ? "bg-emerald-500/20 text-emerald-400" :
                                item.type === 'competitor' ? "bg-red-500/20 text-red-400" :
                                "bg-blue-500/20 text-blue-400"
                              )}>
                                {item.type}
                              </span>
                              <span className="text-[9px] text-slate-500">{item.time}</span>
                            </div>
                            <p className="text-xs text-slate-300 group-hover:text-white transition-colors line-clamp-2">
                              {item.title}
                            </p>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 w-full py-2 border border-white/10 rounded-xl text-[10px] font-bold text-slate-400 hover:bg-white/5 transition-all">
                        查看全部情报
                      </button>
                    </div>

                    {/* Policy Matching */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <FileText size={24} />
                    </div>
                    <h4 className="text-lg font-bold mb-2">智能政策匹配</h4>
                    <p className="text-sm text-slate-500 mb-4">
                      {profile.name.includes('商汤') 
                        ? "已匹配 5 项国家级人工智能专项补贴，预计可获支持资金 ¥12M+。" 
                        : "已为您匹配 4 项省级科技创新专项补贴，平均匹配度 88%。"}
                    </p>
                    <button className="text-orange-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      查看政策详情 <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Smart Fund */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Briefcase size={24} />
                    </div>
                    <h4 className="text-lg font-bold mb-2">智能基金大模型</h4>
                    <p className="text-sm text-slate-500 mb-4">已为您匹配 3 支政府引导基金，平均匹配度 92%。</p>
                    <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      查看匹配详情 <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Competitor Intelligence - FULLY UNLOCKED */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all group relative overflow-hidden">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <TrendingUp size={24} />
                    </div>
                    <h4 className="text-lg font-bold mb-2">深度竞品分析</h4>
                    <p className="text-sm text-slate-500 mb-4">监控 3 家核心竞品的人才流向与专利布局动态。</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>技术重合度</span>
                        <span className="text-red-500 font-bold">82% (高)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-[82%]"></div>
                      </div>
                    </div>
                    
                    <button className="mt-4 text-indigo-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      查看完整竞品报告 <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Financing Service */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Users size={24} />
                    </div>
                    <h4 className="text-lg font-bold mb-2">融资撮合服务</h4>
                    <p className="text-sm text-slate-500 mb-4">检测到 5 家活跃 VC 近期关注您的赛道，建议开启路演。</p>
                    <button className="text-purple-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      预约投融资对接 <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Data Security */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={24} />
                    </div>
                    <h4 className="text-lg font-bold mb-2">数据安全服务</h4>
                    <p className="text-sm text-slate-500 mb-4">您的核心专利数据需要加密加固，已为您开启 24h 监控。</p>
                    <button className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      查看安全报告 <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Success Cases */}
                <div className="lg:col-span-3">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h3 className="text-xl font-bold">行业对标与成功案例</h3>
                      <p className="text-sm text-slate-500">为您匹配路径相似度 {">"}70% 的标杆企业</p>
                    </div>
                    <button className="text-indigo-600 text-sm font-bold">查看更多案例</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div 
                      onClick={() => setSelectedCase({
                        name: "某智能视觉初创企业",
                        industry: "人工智能",
                        achievement: "估值提升 30%",
                        similarity: 85,
                        image: "https://picsum.photos/seed/tech1/200/200",
                        details: "该企业在 A 轮融资前，通过小湾企服进行了全面的数据合规改造和专利布局优化，成功吸引了顶级 VC 关注。",
                        path: ["种子期：技术原型验证", "初创期：数据合规审计", "成长期：专利导航分析"]
                      })}
                      className="bg-white p-6 rounded-3xl border border-slate-200 flex gap-6 items-start cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <div className="w-20 h-20 bg-slate-100 rounded-2xl shrink-0 overflow-hidden">
                        <img src="https://picsum.photos/seed/tech1/200/200" alt="Case 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg">某智能视觉初创企业</h5>
                        <p className="text-sm text-slate-500 mt-1">通过小湾企服在 A 轮融资前完成了数据合规改造，估值提升 30%。</p>
                        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-indigo-600">
                          <span className="bg-indigo-50 px-2 py-0.5 rounded">路径复刻度 85%</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span>点击查看路径</span>
                        </div>
                      </div>
                    </div>
                    <div 
                      onClick={() => setSelectedCase({
                        name: "某生物医药研发平台",
                        industry: "生物医药",
                        achievement: "获 500 万政府引导基金",
                        similarity: 72,
                        image: "https://picsum.photos/seed/tech2/200/200",
                        details: "利用小湾智能基金大模型，精准匹配了 3 项省级专项补贴，并由小湾顾问协助完成了申报流程。",
                        path: ["政策扫描", "条件对标", "智能申报", "获批公示"]
                      })}
                      className="bg-white p-6 rounded-3xl border border-slate-200 flex gap-6 items-start cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <div className="w-20 h-20 bg-slate-100 rounded-2xl shrink-0 overflow-hidden">
                        <img src="https://picsum.photos/seed/tech2/200/200" alt="Case 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg">某生物医药研发平台</h5>
                        <p className="text-sm text-slate-500 mt-1">利用智能基金大模型精准匹配，成功申请 500 万政府引导基金。</p>
                        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-indigo-600">
                          <span className="bg-indigo-50 px-2 py-0.5 rounded">路径复刻度 72%</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span>点击查看路径</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Case Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold">{selectedCase.name}</h4>
                    <span className="text-indigo-600 font-bold text-sm">{selectedCase.achievement}</span>
                  </div>
                  <button onClick={() => setSelectedCase(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <AlertCircle className="rotate-45" size={24} />
                  </button>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed">{selectedCase.details}</p>
                <div className="space-y-4">
                  <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest">复刻路径</h5>
                  <div className="space-y-3">
                    {selectedCase.path.map((p: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="w-full mt-10 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  复刻此成长路径
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav (Simulated) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        <div className="flex flex-col items-center gap-1 text-indigo-600">
          <Sparkles size={20} />
          <span className="text-[10px] font-bold">首页</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <BarChart3 size={20} />
          <span className="text-[10px] font-bold">规划</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <FileText size={20} />
          <span className="text-[10px] font-bold">政策</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <ShieldCheck size={20} />
          <span className="text-[10px] font-bold">安全</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <Users size={20} />
          <span className="text-[10px] font-bold">我的</span>
        </div>
      </div>
    </div>
  );
}
