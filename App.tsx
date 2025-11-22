import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, ArrowRight, ChevronDown, Star, Globe, Shield, 
  Users, Play, Check, Instagram, Youtube, Mail, Phone, 
  ChevronUp, BookOpen, Rocket, Map, Utensils, MessageSquare,
  Clock, FileText, Download, Cpu, Palette, Zap, Heart, Brain, Layout, Flame
} from 'lucide-react';

// --- Theme Constants ---
const THEME = {
  primary: '#085BA7',
  light: '#E6EEF6',
  black: '#0f172a',
  white: '#ffffff',
  kakaoYellow: '#FEE500',
  kakaoBrown: '#3C1E1E'
};

// --- Types & Components ---

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface BadgeProps {
  children: React.ReactNode;
}

interface RepresentativeCardProps {
  image: string;
  name: string;
  role: string;
  history: string[];
  message: string;
  title?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "", id = "", style }) => (
  <section id={id} className={`relative w-full overflow-hidden ${className}`} style={style}>
    {children}
  </section>
);

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const Badge: React.FC<BadgeProps> = ({ children }) => (
  <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase border rounded-full backdrop-blur-sm"
        style={{ 
          color: THEME.primary, 
          borderColor: `${THEME.primary}4D`, 
          backgroundColor: `${THEME.primary}1A` 
        }}>
    {children}
  </span>
);

const RepresentativeCard: React.FC<RepresentativeCardProps> = ({ image, name, role, history, message, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: THEME.light }}>
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">{name}</h3>
          <div className="text-sm font-medium mb-1 whitespace-pre-line" style={{ color: THEME.primary }}>
            {role}
          </div>
        </div>
      </div>

      <div className="mb-6 text-xs text-slate-500 bg-slate-50 p-4 rounded-lg space-y-1">
        {history.map((item, idx) => (
           <div key={idx} className="flex gap-2">
             <span className="shrink-0 text-slate-400">•</span>
             <span>{item}</span>
           </div>
        ))}
      </div>

      <div className="mt-auto">
        {title && (
            <h4 className="font-bold text-sm mb-2" style={{ color: THEME.primary }}>"{title}"</h4>
        )}
        <div className={`text-sm text-slate-600 leading-relaxed relative ${!isExpanded ? 'max-h-32 overflow-hidden' : ''}`}>
            {message.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-2">{paragraph}</p>
            ))}
            {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
            )}
        </div>
        
        <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-sm font-bold flex items-center gap-1 hover:underline focus:outline-none"
            style={{ color: THEME.primary }}
        >
            {isExpanded ? (
                <>접기 (Show Less) <ChevronUp size={14} /></>
            ) : (
                <>더 보기 (Read More) <ChevronDown size={14} /></>
            )}
        </button>
      </div>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [activeTab, setActiveTab] = useState('class');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const [, setScrolled] = useState(false);

  // Form States
  const [formName, setFormName] = useState('');
  const [formGrade, setFormGrade] = useState('초등 3학년');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleNetlifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = {
      "form-name": "contact",
      name: formName,
      grade: formGrade,
      phone: formPhone,
      message: formMessage
    };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(formData)
    })
      .then(() => {
        setFormStatus('success');
        setFormName('');
        setFormPhone('');
        setFormMessage('');
      })
      .catch(error => {
        console.error(error);
        setFormStatus('error');
      });
  };

  // Images
  const classImages = ["image/class 1.jpg", "image/class 2.png", "image/class 3.png"];
  const cultureImages = ["image/city tour.jpg", "image/ocean park.jpg", "image/hanoi museum.jpg"];
  const villaImages = ["image/villa 1.jpg", "image/villa 2.jpg"];
  const mealImages = ["image/meal 1.jpg", "image/meal 2.jpg"];

  const partners = [
    { name: "What's Edu", logo: "image/whatsedu.png", link: "https://whatsedu.kr/" },
    { name: "Eduplex", logo: "image/eduplex.png", link: "https://www.eduplex.net/" },
    { name: "ATC", logo: "image/ATC.png", link: "https://hicomputing.org:45939/?ckattempt=1" },
    { name: "Maple Bear", logo: "image/Mapple Bear.png", link: "https://www.maplebear.ca/" },
    { name: "Hanoi Toronto", logo: "image/Hanoi Toronto.png", link: "https://www.hanoitorontoschool.edu.vn/" }
  ];

  // Timetable Data
  const schedule = [
    { time: "07:30 - 08:30", activity: "Wake up & Breakfast (기상 및 조식)" },
    { time: "09:00 - 12:00", activity: "English Class @ Maple Bear" },
    { time: "12:00 - 13:00", activity: "Lunch (점심 식사)" },
    { time: "13:00 - 16:00", activity: "STEAM & Activity (오후 활동)" },
    { time: "16:00 - 18:00", activity: "Free Time & Shower (휴식 및 샤워)" },
    { time: "18:00 - 19:00", activity: "Dinner (저녁 식사)" },
    { time: "19:00 - 21:00", activity: "Self-Coaching (자기주도학습)" },
    { time: "21:30", activity: "Sleep (취침)" }
  ];

  // Full Messages
  const msgBaek = `안녕하세요, EduOne Global Camp를 공동 주최하는 (주) 네스트플렉스 대표 백계원입니다.
저는 20여 년간 학생들의 진학 및 입시 매니지먼트를 담당하며 교육 시스템이 시대가 요구하는 인재상에 맞춰 어떻게 변화하는지 가장 가까이에서 지켜보았습니다.
과거에는 지식을 많이 아는 '문제풀이형 인재'를 선발했지만, 현재 확대 도입되는 대입 종합전형, 고교학점제 등의 체계는 산업 간 창의적 활용 융합을 갖춘 '주도적 인재'를 양성하는 데 중점을 두고 있습니다.

성장 골든타임을 놓치지 않아야 합니다.
대부분의 중·고등학생들은 당장의 성적 관리로 자신을 이해하고 진로를 설계하는 핵심 경험을 놓칩니다. 그 결과, 결국 남들과 동일하게 성적에 맞춰 진로를 정하는 악순환이 반복됩니다.
무엇이든 순수하게 흡수하는 초등 시기야말로 진정한 성장 골든타임입니다. 이때 누가, 무엇을, 어떤 방식으로 제시하는지가 아이의 미래를 결정합니다.

EduOne Global Camp는 이 핵심 시기에 아이에게 필요한 모든 것을 제공하기 위해 각 분야 최고 기관들이 힘을 모아 새롭게 정의한 글로벌 교육의 장입니다.
아이들이 쌓게 될 글로벌 역량, 자기주도학습 능력, AI 활용 경험은 결코 사라질 '소비'가 아닌, 평생 잃지 못할 '투자'가 될 것임을 진학 전문가로서 확신합니다.
‘아이의 완전한 성장을 향한 두 가지 가치(감성적 공감과 논리적 설계)’ 가 만나는 곳, EduOne Global Camp에서 아이의 미래 설계가 시작됩니다.
감사합니다.`;

  const msgJeong = `안녕하세요, EduOne Global Camp를 주최하는 왓츠에듀 대표 정하나입니다.
저는 오랫동안 교육 현장에서 아이들과 함께하며, 변치 않는 하나의 진실을 마음 깊이 확인했습니다. 그것은 바로 "아이의 성장은 가르침이 아닌, 살아있는 경험에서 시작된다"는 믿음입니다.
EduOne Global Camp는 이러한 교육 철학을 바탕으로 기획된, 단순한 해외 체험을 넘어선 '아이의 내면을 확장하는 배움의 여정' 입니다.

이 특별한 여정에서 우리 아이들은:
영어로 사고하는 국제적인 감각을 익히고,
예술로 감정을 표현하며 창의성을 꽃피우고,
AI와 STEAM으로 미래를 상상하며 문제 해결 능력을 키우고,
협업 속에서 자신만의 방식으로 빛나는 순간들을 발견하게 될 것입니다.

이 모든 과정을 위해 What's Edu, EDUPLEX, ATC, Maple Bear Sunshine등 각 분야를 대표하는 최고의 교육기관들이 오직 '한 아이의 글로벌 리더로의 성장'을 중심에 두고 뜻을 모았습니다.
저는 이 캠프를 통해 우리 아이들이 새로운 환경을 두려움이 아닌 호기심으로 대하고, 스스로에 대한 단단한 믿음을 세우며, 배움의 기쁨을 삶 전체로 확장하길 진심으로 소망합니다.
왓츠에듀는 아이들의 빛나는 미래를 위해 최고의 환경과 진심을 다하는 케어를 약속드립니다. 저희는 단순한 프로그램 제공자가 아닌, 아이 성장의 변함없는 파트너로 함께할 것입니다.
감사합니다.`;

  return (
    <div className="font-sans antialiased relative w-full overflow-x-hidden" style={{ color: THEME.black }}>
      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float-bubble-1 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(10px, -15px) scale(1.05); } 66% { transform: translate(-5px, 5px) scale(0.95); } }
        @keyframes float-bubble-2 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(-15px, 10px) scale(1.1); } 66% { transform: translate(5px, -5px) scale(0.9); } }
        @keyframes float-bubble-3 { 0%, 100% { transform: translate(0, 0) scale(1); } 25% { transform: translate(5px, 15px) scale(0.9); } 75% { transform: translate(-10px, -10px) scale(1.05); } }
        @keyframes float-bubble-4 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(-5px, -5px) scale(1.1); } 66% { transform: translate(15px, 10px) scale(0.95); } }
        .animate-float-1 { animation: float-bubble-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-bubble-2 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-bubble-3 9s ease-in-out infinite; }
        .animate-float-4 { animation: float-bubble-4 11s ease-in-out infinite; }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .glass-card-dark { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
        ::selection { background-color: ${THEME.light}; color: ${THEME.primary}; }
      `}</style>

      {/* Floating Kakao Button */}
      <div className="fixed bottom-8 right-8 z-40 group">
        <a href="https://open.kakao.com/o/sdTZ912h" target="_blank" rel="noopener noreferrer" className="flex p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 items-center justify-center" style={{ backgroundColor: THEME.kakaoYellow, color: THEME.kakaoBrown }}>
          <MessageCircle size={28} fill="currentColor" />
          <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold py-1 px-3 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
             1:1 상담 (ID: whatsedu)
          </span>
        </a>
      </div>

      {/* --- 1. Hero Section --- */}
      <Section className="h-screen flex items-center justify-center bg-slate-900 text-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60" poster="image/herovideo.mp4">
            <source src="image/herovideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-900/70" />
        </div>
        <Container className="relative z-10 text-center">
          <div className="flex flex-col items-center">
            {/* REMOVED THE BADGE HERE */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white opacity-0 animate-[fadeIn_1s_ease-out_forwards]">EDUONE GLOBAL <br className="hidden md:block" /> CAMP 2026</h1>
            <h2 className="text-2xl md:text-4xl font-bold tracking-widest uppercase mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]" style={{ color: THEME.light }}>하노이 V-One Camp</h2>
            <div className="space-y-2 mb-12 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
              <p className="text-xl md:text-3xl font-light tracking-wide font-serif italic" style={{ color: THEME.light }}>“Think. Create. Connect. Grow.”</p>
              <p className="text-lg md:text-2xl text-white/90 font-medium">“영어로 배우고, 창의로 표현하며, 협력으로 성장하다.”</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeIn_1s_ease-out_0.9s_forwards]">
              <button 
                onClick={() => scrollToSection('philosophy')}
                className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-lg transition-all duration-300 hover:scale-105 w-full md:w-auto hover:bg-white hover:text-slate-900"
              >
                캠프 소개 보기
              </button>
              <a href="#contact" className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 w-full md:w-auto" style={{ backgroundColor: THEME.primary, boxShadow: `0 0 20px ${THEME.primary}66` }}>
                지금 상담 신청하기 <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- 2. Brand Philosophy --- */}
      <Section id="philosophy" className="py-12" style={{ background: `linear-gradient(to bottom, white, ${THEME.light})` }}>
        <Container className="text-center">
          {/* Partners - Updated Layout: 3 columns on mobile, flex-nowrap on desktop */}
          <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-x-4 gap-y-8 md:gap-8 lg:gap-16 mb-16 opacity-100">
              {partners.map((partner, index) => (
                <a key={index} href={partner.link} target="_blank" rel="noopener noreferrer" className="w-[30%] md:w-auto flex justify-center items-center group">
                  <img src={partner.logo} alt={`${partner.name} Logo`} className="w-full h-auto max-h-16 md:h-24 object-contain transition-transform duration-300 hover:scale-110" />
                </a>
              ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: THEME.primary }}>
            EduOne은 단순한 영어캠프가 아니라,<br />미래교육 브랜드입니다.
          </h2>
          <p className="text-xl text-gray-500 font-serif italic mb-8">"When language meets empathy, learning becomes growth."</p>
          
          {/* Responsive Graph Visualization - Fixed for PC/Tablet, TIGHTER for Mobile */}
          <div className="relative mx-auto mt-12 flex items-center justify-center w-[230px] h-[230px] md:w-[600px] md:h-[600px]">
            
            {/* Center Circle - Smaller on Mobile */}
            <div className="absolute z-20 w-28 h-28 md:w-64 md:h-64 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-slate-50">
                <div className="text-center">
                    <span className="block font-extrabold text-xl md:text-4xl tracking-tighter" style={{ color: THEME.primary }}>ONE</span>
                    <span className="block font-extrabold text-xl md:text-4xl tracking-tighter" style={{ color: THEME.primary }}>VISION</span>
                </div>
            </div>
            
            {/* Floating Bubbles - Fixed absolute positions to prevent overlap/cutoff */}
            {/* Top Left - Empathy */}
            <div className="absolute top-0 left-0 md:top-[10%] md:left-[10%] animate-float-1">
              <div className="w-20 h-20 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-lg bg-sky-400/90 backdrop-blur-sm text-white">
                <span className="font-bold text-base md:text-2xl">감성</span>
              </div>
            </div>

            {/* Top Right - Global */}
            <div className="absolute top-0 right-0 md:top-[10%] md:right-[10%] animate-float-2">
              <div className="w-24 h-24 md:w-44 md:h-44 rounded-full flex items-center justify-center shadow-xl text-white" style={{ backgroundColor: THEME.primary }}>
                <span className="font-bold text-lg md:text-2xl">글로벌</span>
              </div>
            </div>

            {/* Bottom Right - Science */}
            <div className="absolute bottom-0 right-0 md:bottom-[10%] md:right-[15%] animate-float-3">
               <div className="w-16 h-16 md:w-36 md:h-36 rounded-full flex items-center justify-center shadow-lg bg-blue-800/90 backdrop-blur-sm text-white">
                <span className="font-bold text-sm md:text-xl">과학</span>
              </div>
            </div>

            {/* Bottom Left - Self-directed */}
            <div className="absolute bottom-0 left-0 md:bottom-[10%] md:left-[15%] animate-float-4">
               <div className="w-20 h-20 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-lg bg-cyan-500/90 backdrop-blur-sm text-white">
                <span className="font-bold text-base md:text-2xl">자기주도</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- 3. Representative Message (Moved Up) --- */}
      <Section className="py-16" style={{ backgroundColor: THEME.light }}>
        <Container>
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold" style={{ color: THEME.primary }}>대표 인사말</h2>
             <p className="text-slate-600 mt-2">최고의 교육 전문가들이 아이들의 미래를 함께 설계합니다.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
             <RepresentativeCard 
                image="image/Baek Gye Won.png"
                name="백계원"
                role={`네스트플렉스 대표\n에듀플렉스 EGC 베트남본부장\n에듀원 글로벌 캠프 공동대표`}
                history={["현) 에듀플렉스 EGC 베트남본부장 & 네스트플렉스 대표", "전) 에듀플렉스 진학입시연구소 초대소장", "다수 교육청, 기업, 학교 초청 캠프 강연"]}
                title="AI 시대를 관통하는 새로운 인재 기준"
                message={msgBaek}
             />
             <RepresentativeCard 
                image="image/Jeong Hana.jpg"
                name="정하나"
                role={`왓츠에듀 대표\n에듀원 글로벌 캠프 공동대표`}
                history={["현 한국토론대학 국제부 및 자원봉사단 단장", "전 분당 분더잉글리시 원장", "Master’s Degree in Early Childhood Studies"]}
                title="아이의 내면을 확장하는 배움의 여정"
                message={msgJeong}
             />
          </div>
        </Container>
      </Section>

      {/* --- 4. Camp Core --- */}
      <Section className="py-24 relative overflow-hidden bg-white">
        <Container>
            <div className="text-center mb-16">
                <Badge>Why EduOne?</Badge>
                <h2 className="text-4xl font-bold" style={{ color: THEME.primary }}>차별화된 캠프</h2>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Users, 
                title: "4대 기관 협력 통합 교육", 
                desc: "Education Experts", 
                img: "image/Education Experts.png" 
              },
              { 
                icon: Globe, 
                title: "캐나다 국제학교 MAPLE BEAR 정규수업", 
                desc: "English communication skills", 
                img: "image/Cultural Exchange.png" 
              },
              { 
                icon: Shield, 
                title: "Premium & safe Management", 
                desc: "24-hour Personal Manager, Coordinator", 
                img: "image/Premium Lifestyle.png" 
              }
            ].map((item, i) => (
              <div key={i} className="group relative h-96 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-slate-900 border border-slate-100">
                 <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                 <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                    <div className="p-4 rounded-2xl shadow-sm w-fit backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                        <item.icon size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 break-words">{item.title}</h3>
                        <p className="text-slate-200 font-serif">{item.desc}</p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- 5. Schedule & Daily Routine --- */}
      <Section className="pt-12 pb-24 bg-white">
        <Container>
          <div className="flex flex-col items-center mb-12 border-b border-gray-100 pb-8 text-center">
             <h2 className="text-4xl font-bold mb-4" style={{ color: THEME.primary }}>16일간의 성장 루틴</h2>
             <p className="text-slate-600 text-lg leading-relaxed">16일 동안, 아이는 매일 영어로 사고하고 AI를 탐구하며,<br/>자기주도 루틴을 만듭니다.</p>
          </div>

          {/* Timetable Inserted Here */}
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="text-blue-600" />
              <h3 className="text-2xl font-bold text-slate-800">Daily Schedule (일정표)</h3>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="divide-y divide-gray-100">
                {schedule.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row p-4 hover:bg-blue-50/30 transition duration-150">
                    <div className="w-full sm:w-40 font-bold text-blue-600 mb-1 sm:mb-0 flex items-center gap-2 shrink-0">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {item.time.split(' ')[0]} {/* Show only start time or full range */}
                    </div>
                    <div className="text-gray-700 font-medium">{item.activity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { icon: BookOpen, title: "영어수업 (English Class)", desc: "Level-based classes,\ninterpretation support" },
                    { icon: Rocket, title: "STEAM & AI Projects", desc: "Creative coding & robotics" },
                    { icon: Users, title: "자기주도학습코칭", desc: "Planning, Reading,\nand Studying" },
                    { icon: Map, title: "체험을 통한 문화 감수성 확장", desc: "Cultural experience activities" }
                ].map((item, i) => (
                    <div key={i} className="relative p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-shadow group text-center h-full flex flex-col items-center justify-center">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform" style={{ backgroundColor: THEME.light, color: THEME.primary }}><item.icon size={28} /></div>
                        <h4 className="text-lg font-bold text-slate-800 mt-2 mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-500 whitespace-pre-line">{item.desc}</p>
                    </div>
                ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* --- 6. Accommodation & Meals --- */}
      <Section className="py-24" style={{ backgroundColor: THEME.light }}>
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge>Life & Care</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: THEME.primary }}>최고의 안전과 편안함이 아이의 집중력을 만듭니다</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-slate-600">
                <span className="flex items-center gap-2"><Star style={{color: THEME.primary}} size={18} /> Premium Villa</span>
                <span className="flex items-center gap-2"><Utensils style={{color: THEME.primary}} size={18} /> Nutritious Meals</span>
                <span className="flex items-center gap-2"><Shield style={{color: THEME.primary}} size={18} /> Safe Care</span>
            </div>
          </div>

          <div className="flex flex-col gap-24">
            {/* Row 1: Accommodation */}
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                    <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                         <img src={villaImages[0]} alt="Villa" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <span className="text-sm font-bold uppercase tracking-wider mb-2 block" style={{ color: THEME.primary }}>숙소 (Accommodation)</span>
                    <h3 className="text-3xl font-bold text-slate-800 mb-6">하노이 NCC 가든 빌라<br/>(NCC Garden Villas)</h3>
                    <ul className="space-y-4 text-slate-600 leading-relaxed">
                        <li className="flex items-start gap-3">
                            <Check className="shrink-0 mt-1" size={18} style={{color: THEME.primary}} /> 
                            <span>5성급 최고급 리조트형 독채 빌라 (국가 영빈관 사용으로 출입 보안 통제)</span>
                        </li>
                        <li className="flex items-start gap-3"><Check className="shrink-0 mt-1" size={18} style={{color: THEME.primary}} /> <span>전용 수영장 / 호수 전망 산책로 / 운동 공간</span></li>
                        <li className="flex items-start gap-3">
                            <Check className="shrink-0 mt-1" size={18} style={{color: THEME.primary}} /> 
                            <span>담당 매니저 숙소 상주</span>
                        </li>
                        <li className="flex items-start gap-3"><Check className="shrink-0 mt-1" size={18} style={{color: THEME.primary}} /> <span>현지 병원 연계 응급의료·안전 시스템 완비</span></li>
                    </ul>
                </div>
            </div>

            {/* Row 2: Meals */}
             <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                <div className="w-full md:w-1/2">
                     <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                         <img src={mealImages[0]} alt="Meal" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-left"> 
                    <div>
                        <span className="text-sm font-bold uppercase tracking-wider mb-2 block" style={{ color: THEME.primary }}>식사 (Meals)</span>
                        <h3 className="text-3xl font-bold text-slate-800 mb-6">Nutritious K-Food & Local</h3>
                        <ul className="space-y-4 text-slate-600 leading-relaxed">
                            <li className="flex items-start gap-3">
                                <Check className="shrink-0 mt-1" size={18} style={{color: THEME.primary}} /> 
                                <span>조석식 본죽 협약 한식 케이터링 / 중식 국제학교 글로벌식단</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="shrink-0 mt-1" size={18} style={{color: THEME.primary}} /> 
                                <span>주말 최고급 식당 특식 / 과일, 영양 간식 상시 비치</span>
                            </li>
                            <li className="flex items-start gap-3"><Check className="shrink-0 mt-1" size={18} style={{color: THEME.primary}} /> <span>알러지 맞춤 케어 및 균형 잡힌 식단 관리</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Row 3: Weekend Program */}
            <div className="mt-8 pt-12 border-t border-slate-200">
                <h3 className="text-2xl font-bold text-center mb-10" style={{ color: THEME.primary }}>Weekend Program Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-64">
                        <img src="image/ocean park.jpg" alt="Ocean Park" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full p-6 text-white text-left">
                            <h4 className="text-xl font-bold mb-1">Ocean Park</h4>
                            <p className="text-sm opacity-90">영어 팀 미션 수행<br/>협력/공감 능력 강화</p>
                        </div>
                     </div>
                     <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-64">
                        <img src="image/hanoi museum.jpg" alt="Hanoi Museum" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                         <div className="absolute bottom-0 left-0 w-full p-6 text-white text-left">
                            <h4 className="text-xl font-bold mb-1">Hanoi Museum</h4>
                            <p className="text-sm opacity-90">역사·문화 영어 탐구<br/>글로벌 시민의식 함양</p>
                        </div>
                     </div>
                     <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-64">
                        <img src="image/city tour.jpg" alt="City Tour" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                         <div className="absolute bottom-0 left-0 w-full p-6 text-white text-left">
                            <h4 className="text-xl font-bold mb-1">City Tour</h4>
                            <p className="text-sm opacity-90">신·구도시 비교 탐방<br/>문화 감수성 확장</p>
                        </div>
                     </div>
                     {/* New 4th Activity */}
                     <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-64">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-slate-900"></div>
                        {/* Fallback gradient if no image is provided for campfire, but structure assumes image */}
                        <img src="image/campfire.jpg" alt="Camp Fire" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80" 
                             onError={(e) => {e.currentTarget.style.display = 'none'}} /> 
                        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Flame size={48} className="text-orange-400 opacity-50" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                         <div className="absolute bottom-0 left-0 w-full p-6 text-white text-left">
                            <h4 className="text-xl font-bold mb-1">Camp Fire</h4>
                            <p className="text-sm opacity-90">소중한 추억을 위한<br/>캠프파이어</p>
                        </div>
                     </div>
                </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- 7. Holistic AI Camp (New Design) --- */}
      <Section className="py-24 bg-white border-t border-slate-100 relative">
         <Container>
             {/* Header */}
             <div className="max-w-4xl mx-auto mb-16">
                 <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Holistic AI Camp</h2>
                    <div className="h-px flex-1 bg-slate-200"></div>
                    <div className="flex gap-4 items-center">
                        <img src="image/whatsedu.png" alt="What's Edu" className="h-10 object-contain" />
                        <span className="text-slate-300">|</span>
                        <img src="image/ATC.png" alt="ATC" className="h-8 object-contain" />
                    </div>
                 </div>
                 
                 <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight" style={{ color: THEME.primary }}>
                    “AI를 배우기 전, 나를 이해하는 법부터 배웁니다.”
                 </h3>
                 <h4 className="text-xl font-bold text-slate-800 mb-6">All-English Project-based STEAM Program</h4>
                 <p className="text-slate-600 text-lg leading-relaxed">
                    왓츠에듀의 <span className="font-bold text-slate-900">감정·언어·예술 교육 철학</span>과 ATC의 <span className="font-bold text-slate-900">과학·AI 기반 STEAM 시스템</span>이 만났습니다.<br/>
                    매일 방과 후, 인문 예술과 AI 로봇코딩을 결합한 프로젝트 수업을 영어로 진행합니다.
                 </p>
             </div>

             {/* 10-Step Program Visualization */}
             <div className="relative">
                 {/* Moved Badge to Header area for cleaner mobile view and no blocking */}
                 <div className="flex justify-center mb-8">
                     <div className="bg-white rounded-full shadow-lg border border-slate-200 px-8 py-2 flex items-center gap-2">
                         <span className="text-2xl font-black text-slate-800">10</span>
                         <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Step Program</span>
                     </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                     {[
                         { step: 1, title: "나를 탐구", sub: "나의 감정과\n성장 이해", color: "bg-orange-400" },
                         { step: 2, title: "또 다른 나 상상", sub: "새로운 나를\n상상하며 정체성 탐색", color: "bg-orange-500" },
                         { step: 3, title: "인간의 뿌리 이해", sub: "유전자와 진화로\n인간 이해", color: "bg-red-500" },
                         { step: 4, title: "나의 언어 디자인", sub: "영어 단어로\n나를 정의", color: "bg-pink-600" },
                         { step: 5, title: "생각을 코드로 표현", sub: "사고를 구조화하며\n논리 훈련", color: "bg-purple-700" },
                         { step: 6, title: "감정 코딩 심장", sub: "감정을 담아\n로봇 심장 코딩", color: "bg-blue-800" },
                         { step: 7, title: "나를 닮은 로봇", sub: "나의 개성을 담은\n로봇 제작", color: "bg-cyan-600" },
                         { step: 8, title: "강점 기반 팀 결성", sub: "서로의 강점으로\n팀워크 형성", color: "bg-emerald-500" },
                         { step: 9, title: "협력 프로젝트 발표", sub: "팀별 영어 발표\n및 협업 수행", color: "bg-green-500" },
                         { step: 10, title: "쇼케이스 발표", sub: "과정을 돌아보고\n성장 기록", color: "bg-yellow-400" }
                     ].map((item, i) => (
                         <div key={i} className="relative group">
                             <div className={`h-full p-6 rounded-2xl text-white shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between ${item.color}`}>
                                 <div className="text-5xl font-black opacity-20 absolute top-2 right-4">{item.step}</div>
                                 <div className="mt-4">
                                     <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                     <p className="text-sm opacity-90 whitespace-pre-line font-medium leading-snug">{item.sub}</p>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         </Container>
      </Section>

      {/* --- 8. Self-directed Learning (Moved & Updated) --- */}
      <Section className="py-20 bg-slate-50">
        <Container>
             {/* Eduplex Video Section */}
             <div className="rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="w-full md:w-1/2 text-center">
                        <div className="relative aspect-square max-w-sm mx-auto rounded-full overflow-hidden border-8 border-slate-50 shadow-inner">
                            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                                <source src="image/eduplex coaching.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold mb-6" style={{ color: THEME.primary }}>스스로 배우고 성장하는 힘,<br/>그 시작은 ‘하루의 루틴’입니다.</h2>
                        <div className="space-y-8 relative">
                             <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-300"></div>
                             {[{ step: "Plan", text: "오늘의 목표 설정" }, { step: "Do", text: "몰입 학습 및 활동" }, { step: "Review", text: "하루 성찰 및 피드백" }].map((s, i) => (
                                 <div key={i} className="relative flex items-center gap-6 pl-12">
                                     <div className="absolute left-2 w-4 h-4 rounded-full ring-4 ring-white" style={{backgroundColor: THEME.primary}}></div>
                                     <div><span className="text-xs font-bold text-slate-400 uppercase">{s.step}</span><p className="text-lg font-medium text-slate-800">{s.text}</p></div>
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
      </Section>

      {/* --- 9. Partners & Documents --- */}
      <Section className="py-16 bg-white border-t border-slate-100">
        <Container>
            <h3 className="text-center text-slate-400 font-bold uppercase tracking-widest mb-10 text-sm">Trusted Partners</h3>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 mb-16">
                {partners.map((partner, index) => (
                    <a 
                      key={index} 
                      href={partner.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-24 w-[30%] md:w-auto flex flex-col items-center justify-center rounded-xl hover:bg-blue-50 transition-all cursor-pointer group px-2 transform hover:scale-105 duration-300"
                    >
                        <img src={partner.logo} alt={`${partner.name} Logo`} className="h-16 md:h-20 object-contain transition-transform duration-300 group-hover:scale-110" />
                    </a>
                ))}
            </div>

            {/* Documents Download */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Download size={20} /> Downloads
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <button className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-blue-400 hover:shadow-md transition group text-left">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded text-blue-600"><FileText size={20} /></div>
                            <div><div className="font-bold text-sm text-gray-800">Camp Contract</div></div>
                        </div>
                    </button>
                    <button className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-blue-400 hover:shadow-md transition group text-left">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded text-blue-600"><FileText size={20} /></div>
                            <div><div className="font-bold text-sm text-gray-800">Privacy Consent Form</div></div>
                        </div>
                    </button>
                    <button className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-blue-400 hover:shadow-md transition group text-left">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded text-blue-600"><FileText size={20} /></div>
                            <div><div className="font-bold text-sm text-gray-800">Other Documents</div></div>
                        </div>
                    </button>
                </div>
            </div>
        </Container>
      </Section>

      {/* --- 10. Gallery --- */}
      <Section className="py-24" style={{ backgroundColor: THEME.light }}>
        <Container>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-6" style={{ color: THEME.primary }}>사진 & 후기</h2>
                <div className="inline-flex bg-white p-1 rounded-full shadow-sm border border-slate-200">
                    <button 
                        onClick={() => setActiveTab('class')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'class' ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                        style={activeTab === 'class' ? { backgroundColor: THEME.primary } : {}}
                    >
                        수업 장면
                    </button>
                    <button 
                        onClick={() => setActiveTab('culture')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'culture' ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                        style={activeTab === 'culture' ? { backgroundColor: THEME.primary } : {}}
                    >
                        문화체험
                    </button>
                    <button 
                        onClick={() => setActiveTab('reviews')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'reviews' ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                        style={activeTab === 'reviews' ? { backgroundColor: THEME.primary } : {}}
                    >
                        학생 후기
                    </button>
                </div>
            </div>
            
            {activeTab === 'class' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeIn_0.5s_ease-out]">
                    {classImages.map((img, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden shadow-md h-64 group relative">
                             <img src={img} alt="Class scene" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                    ))}
                </div>
            )}
            
            {activeTab === 'culture' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeIn_0.5s_ease-out]">
                     {cultureImages.map((img, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden shadow-md h-64 group relative">
                             <img src={img} alt="Culture scene" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                    ))}
                </div>
            )}

             {activeTab === 'reviews' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeIn_0.5s_ease-out]">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4" style={{ borderColor: THEME.primary }}>
                        <p className="text-slate-600 italic mb-4">"처음에는 영어가 두려웠지만, 선생님들이 친절하게 알려주셔서 자신감이 생겼어요."</p>
                        <h4 className="font-bold text-slate-900">- Jimin Park</h4>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4" style={{ borderColor: THEME.primary }}>
                        <p className="text-slate-600 italic mb-4">"매일 저녁 코칭 시간에 하루를 돌아보면서 스스로 계획을 세우는 법을 배웠습니다."</p>
                        <h4 className="font-bold text-slate-900">- Minjun Kim</h4>
                    </div>
                     <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4" style={{ borderColor: THEME.primary }}>
                        <p className="text-slate-600 italic mb-4">"숙소가 정말 좋았고 수영장에서 친구들과 노는 시간이 즐거웠어요."</p>
                        <h4 className="font-bold text-slate-900">- Seoyoon Lee</h4>
                    </div>
                </div>
            )}
        </Container>
      </Section>

      {/* --- 11. FAQ & Inquiry --- */}
      <Section id="contact" className="py-24 bg-white">
        <Container>
            <div className="flex flex-col lg:flex-row gap-16">
                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-8" style={{ color: THEME.primary }}>문의 (Q&A)</h2>
                    <div className="space-y-4">
                        {[
                            { q: "항공권과 비자 준비는 어떻게 하나요?", a: "항공권은 지정된 여행사를 통해 단체 발권하며, 비자는 캠프 참가 확정 후 일괄 안내해 드립니다." },
                            { q: "아이의 안전 관리는 어떻게 이루어지나요?", a: "24시간 한국인 인솔자와 현지 생활 및 통역 코디네이터가 상주하며 학생의 안전과 교육을 책임지며, 하루 매일 학생별 활동에 대한 사진, 영상 및 관찰일지를 매니저가 개별적으로 매일 업로드합니다. 궁금하신 점이나 부탁하실 점은 24시간 언제든지 전화주시면 됩니다." },
                            { q: "영어 실력이 부족해도 참여 가능한가요?", a: "네, 가능합니다. 입소 전 레벨 테스트를 통해 수준별 반 편성이 이루어지며, 이중언어 선생님이 생활 관리를 돕습니다." }
                        ].map((item, i) => (
                            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                                <button onClick={() => toggleFaq(i)} className="w-full flex justify-between items-center p-6 bg-slate-50 hover:bg-slate-100 text-left font-bold text-slate-800 transition-colors">{item.q}<ChevronDown size={20} className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} /></button>
                                {openFaq === i && <div className="p-6 bg-white text-slate-600 leading-relaxed border-t border-slate-100 animate-[fadeIn_0.3s_ease-out]">{item.a}</div>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="rounded-3xl p-8 md:p-10 text-white shadow-2xl" style={{backgroundColor: THEME.primary}}>
                        <h3 className="text-2xl font-bold mb-2">상담 신청하기</h3>
                        <p className="text-blue-200 mb-8 text-sm">궁금한 점을 남겨주시면 24시간 이내에 답변 드립니다.</p>
                        {formStatus === 'success' ? (
                          <div className="bg-white/10 p-6 rounded-xl text-center">
                            <Check size={24} className="mx-auto mb-4 text-white" />
                            <h4 className="text-xl font-bold mb-2">문의가 접수되었습니다!</h4>
                            <button onClick={() => setFormStatus('idle')} className="underline text-blue-200">다른 문의하기</button>
                          </div>
                        ) : (
                          <form onSubmit={handleNetlifySubmit} name="contact" data-netlify="true" className="space-y-4">
                            <input type="hidden" name="form-name" value="contact" />
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">Student Name</label>
                                <input 
                                  type="text" name="name" className="w-full bg-black/20 border border-blue-400/50 rounded-lg p-3 text-white focus:outline-none" placeholder="이름"
                                  value={formName} onChange={(e) => setFormName(e.target.value)} required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">Grade</label>
                                    <select name="grade" className="w-full bg-black/20 border border-blue-400/50 rounded-lg p-3 text-white focus:outline-none" value={formGrade} onChange={(e) => setFormGrade(e.target.value)}>
                                      <option className="text-slate-900">초등 3학년</option>
                                      <option className="text-slate-900">초등 4학년</option>
                                      <option className="text-slate-900">초등 5학년</option>
                                      <option className="text-slate-900">초등 6학년</option>
                                      <option className="text-slate-900">중등 1학년</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">Phone</label>
                                    <input type="tel" name="phone" className="w-full bg-black/20 border border-blue-400/50 rounded-lg p-3 text-white focus:outline-none" placeholder="010-XXXX-XXXX" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} required />
                                  </div>
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">Message</label>
                                <textarea name="message" className="w-full bg-black/20 border border-blue-400/50 rounded-lg p-3 text-white focus:outline-none h-24" placeholder="내용" value={formMessage} onChange={(e) => setFormMessage(e.target.value)} required></textarea>
                              </div>
                              <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-white font-bold py-4 rounded-lg hover:bg-blue-50 transition-colors mt-4 shadow-lg" style={{color: THEME.primary}}>
                                {formStatus === 'submitting' ? '전송 중...' : '문의하기'}
                              </button>
                          </form>
                        )}
                    </div>
                </div>
            </div>
        </Container>
      </Section>

      {/* --- 12. Footer --- */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">EduOne Global Camp</h2>
                    <p className="font-serif italic mb-6">"Where English becomes the language of creativity and growth."</p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contact Info</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2"><Phone size={16} className="text-blue-500"/> 010-8274-1282</li>
                        <li className="flex items-center gap-2"><Mail size={16} className="text-blue-500"/> whatsedu1@gmail.com</li>
                        <li className="flex items-center gap-2"><MessageSquare size={16} className="text-blue-500"/> ID: whatsedu</li>
                    </ul>
                </div>
                 <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company Info</h4>
                    <ul className="space-y-2 text-sm">
                        <li><span className="text-slate-500">Company:</span> What'sEdu (ATC)</li>
                        <li><span className="text-slate-500">CEO:</span> Jeong Ha-na</li>
                        <li><span className="text-slate-500">Biz Reg No:</span> 473-06-02057</li>
                        <li className="mt-2 pt-2 border-t border-slate-800">
                           <div className="text-yellow-500 font-bold">KakaoBank: 3333354499100</div>
                           <div className="text-xs">(왓츠에듀 / 정하나)</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-900 pt-8 text-center text-xs">
                <p>&copy; 2026 EduOne Global Camp. All rights reserved.</p>
            </div>
        </Container>
      </footer>
    </div>
  );
}