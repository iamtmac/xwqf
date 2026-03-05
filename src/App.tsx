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
  Plus
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
  Label
} from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';
import { EnterpriseProfile, GrowthMilestone, ServiceMatch, SuccessCase } from './types';

// --- Mock Data for Visualization (10-Year Trajectory) ---
const growthData = [
  { year: '2024', value: 40, pred: 40, milestone: '申报科技型中小企业', potentialRisks: ['研发投入不足', '核心人才流失'] },
  { year: '2025', value: 55, pred: 55, milestone: '人员突破 100 人', potentialRisks: ['管理成本激增', '企业文化稀释'] },
  { year: '2026', value: 72, pred: 72, milestone: '申报高新技术企业', potentialRisks: ['知识产权纠纷', '技术迭代滞后'] },
  { year: '2027', value: null, pred: 95, milestone: '申报专精特新“小巨人”', potentialRisks: ['市场竞争加剧', '供应链波动'] },
  { year: '2028', value: null, pred: 130, milestone: '人员突破 500 人', potentialRisks: ['组织架构僵化', '现金流压力'] },
  { year: '2029', value: null, pred: 180, milestone: '申报省级重点实验室', potentialRisks: ['科研成果转化难', '政策环境变化'] },
  { year: '2030', value: null, pred: 260, milestone: '人员突破 1000 人', potentialRisks: ['全球化扩张阻力', '合规性风险'] },
  { year: '2031', value: null, pred: 380, milestone: '申报国家级工程中心', potentialRisks: ['技术瓶颈突破难', '品牌声誉风险'] },
  { year: '2032', value: null, pred: 520, milestone: '人员突破 2000 人', potentialRisks: ['大企业病', '市场饱和'] },
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCase, setSelectedCase] = useState<(SuccessCase & { details: string, path: string[] }) | null>(null);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempDesc, setTempDesc] = useState('');
  const [dynamicRisks, setDynamicRisks] = useState<string[]>([]);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const handleSearch = async () => {
    if (!companyName) return;
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
      } else {
        setDynamicRisks([
          `${profile.industry}领域准入门槛提高的政策风险`,
          `核心技术${profile.keyTech[0]}被颠覆的风险`,
          `与${profile.competitors[0]}等竞品的同质化竞争风险`
        ]);
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
                从“大水漫灌”到“精准滴灌”
              </h1>
              <p className="text-xl font-medium text-indigo-600/80 mb-6 tracking-widest">
                开启“一行一策 千企千略”精准服务范式
              </p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                输入企业名称，开启全生命周期智能规划。我们通过大数据与AI，为您的企业预判未来，匹配最精准的政策、基金与安全保障。
              </p>
              
              <div className="relative max-w-xl mx-auto group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl border border-slate-200 p-2">
                  <Search className="ml-4 text-slate-400" size={24} />
                  <input 
                    type="text" 
                    placeholder="输入您的企业全称..."
                    className="flex-1 px-4 py-3 outline-none text-lg"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button 
                    onClick={handleSearch}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2"
                  >
                    智能识别 <ArrowRight size={18} />
                  </button>
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
                    导出报告
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
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                        <YAxis hide />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = growthData.find(d => d.year === label);
                              return (
                                <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 max-w-[240px]">
                                  <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">{label} 年度预测</div>
                                  <div className="text-lg font-bold text-indigo-600 mb-2">
                                    {data?.milestone || '稳健增长期'}
                                  </div>
                                  {data?.potentialRisks && (
                                    <div className="mt-2 pt-2 border-t border-slate-100">
                                      <div className="text-[10px] font-bold text-amber-600 uppercase mb-1 flex items-center gap-1">
                                        <AlertCircle size={10} /> 潜在困境/风险
                                      </div>
                                      <ul className="space-y-1">
                                        {data.potentialRisks.map((risk, i) => (
                                          <li key={i} className="text-[10px] text-slate-500 flex items-start gap-1">
                                            <span className="mt-1 w-1 h-1 bg-amber-400 rounded-full shrink-0" />
                                            {risk}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area type="monotone" dataKey="pred" stroke="#C7D2FE" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                        <Area type="monotone" dataKey="value" stroke="#4F46E5" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                        
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
                                offset={10}
                                style={{ fill: '#4338CA', fontSize: '10px', fontWeight: '600' }}
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
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-400">政策匹配</span>
                        <span className="text-xs bg-emerald-500 px-2 py-0.5 rounded">可申请</span>
                      </div>
                      <div className="text-lg font-bold">高新技术企业认定</div>
                      <p className="text-xs text-slate-500 mt-1">预计可减免税收 ¥200k/年</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-400">办公空间</span>
                        <span className="text-xs bg-blue-500 px-2 py-0.5 rounded">扩容预警</span>
                      </div>
                      <div className="text-lg font-bold">小湾科创园 B座 500㎡</div>
                      <p className="text-xs text-slate-500 mt-1">预计 8 月份当前空间将达到饱和</p>
                    </div>
                  </div>
                </div>

                {/* Integrated Services */}
                <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-4 gap-8">
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
