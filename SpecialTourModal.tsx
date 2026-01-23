import React from 'react';
import { X as CloseIcon, ArrowRight, Star } from 'lucide-react';

const NAVER_BLOG_URL = "https://blog.naver.com/whatsedu1/224153286321";

const SpecialTourModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleModalContentClick = () => {
    window.open(NAVER_BLOG_URL, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        onClick={handleModalContentClick}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#085BA7] rounded-3xl shadow-2xl border-4 border-white/10 animate-[fadeIn_0.3s_ease-out] cursor-pointer"
      >
        {/* Close Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
        >
          <CloseIcon size={24} />
        </button>

        {/* Modal Content - Mimicking the Image */}
        <div className="p-6 md:p-12 text-white">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
               <img src="image/EduOne Logo White.png" alt="EduOne Camp" className="h-12 object-contain" onError={(e) => {e.currentTarget.style.display='none'}} />
            </div>
            <p className="text-blue-200 font-bold mb-3 flex items-center justify-center gap-2 tracking-wide">
              <Star size={18} fill="currentColor" /> 에듀원 캠프가 진행하는
            </p>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              서울 명문대 <span className="text-blue-300">3色</span> 투어,<br/>AI 진로 마스터
            </h2>
            <p className="text-xl md:text-3xl font-bold opacity-90 tracking-tight">
              멘토 동행 명문대 투어 / 국민대 교수 직강 AI 실습
            </p>
          </div>

          {/* Quick Info & Inquiry Box */}
          <div className="flex flex-col md:flex-row gap-6 mb-10 items-stretch">
            <div className="flex-1 bg-[#FFD700] rounded-2xl p-8 text-[#085BA7] flex flex-col justify-center items-center shadow-lg transform hover:scale-105 transition-transform shrink-0">
               <span className="text-xl font-bold mb-2">참가 문의</span>
               <span className="text-3xl md:text-4xl font-black tracking-tighter whitespace-nowrap">010-8274-1282</span>
            </div>
            <div className="flex-[1.8] bg-blue-800/40 rounded-2xl p-8 border border-white/10 flex flex-col justify-center">
               <ul className="space-y-2.5 text-base md:text-lg font-medium">
                  <li className="flex gap-3"><span className="font-bold shrink-0">일정:</span> <span className="whitespace-nowrap">2026년 2월 6일 - 7일 (1박 2일)</span></li>
                  <li className="flex gap-3"><span className="font-bold shrink-0">모집연령:</span> <span className="whitespace-nowrap">예비 중등, 고등</span></li>
                  <li className="flex gap-3"><span className="font-bold shrink-0">모집정원:</span> <span className="whitespace-nowrap">25명 (선착순 마감)</span></li>
                  <li className="flex gap-3"><span className="font-bold shrink-0">참가비:</span> <span className="flex items-center gap-3 whitespace-nowrap"><span className="line-through opacity-50">80만원</span> <ArrowRight size={16}/> <span className="text-yellow-400 font-bold text-xl">65만원</span></span></li>
               </ul>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-8">
            {/* Tour */}
            <div className="bg-white rounded-2xl p-6 md:p-8 text-slate-800 shadow-xl overflow-hidden relative">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-[40%] flex items-center justify-center shrink-0">
                   <img src="image/uni tour.jpg" alt="Tour" className="rounded-xl h-50 w-full object-cover shadow-inner" />
                   <div className="flex justify-center gap-6">
                   </div>
                </div>
                <div className="flex-1">
                  <h4 className="inline-block px-5 py-1.5 rounded-md bg-rose-100 text-rose-600 font-bold mb-4 text-lg">서울대 연세대 투어</h4>
                  <ul className="space-y-3 text-base md:text-lg list-disc pl-5 text-slate-600 font-medium leading-relaxed">
                    <li>명문대 진학을 위해 중,고등이 갖춰야 할 학습 자세 and 태도를 갖게 하는 확실한 동기부여</li>
                    <li>실제 캠퍼스를 둘러보며 멘토들의 생생 후기를 듣고 미래 나의 대학 생활을 상상 해봅니다.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AI Practice */}
            <div className="bg-white rounded-2xl p-6 md:p-8 text-slate-800 shadow-xl overflow-hidden relative">
               <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-[40%] flex items-center justify-center shrink-0">
                   <img src="image/kookmin_univ.jpg" alt="Kookmin Univ" className="rounded-xl h-50 w-full object-cover shadow-inner" />
                </div>
                <div className="flex-1">
                  <h4 className="inline-block px-5 py-1.5 rounded-md bg-purple-100 text-purple-600 font-bold mb-4 text-lg">국민대 교수 연계 AI 실습</h4>
                  <ul className="space-y-3 text-base md:text-lg list-disc pl-5 text-slate-600 font-medium leading-relaxed">
                    <li>국민대 소프트웨어융합대학 이민석 교수 연사</li>
                    <li>스캐터랩 인공지능 개발 리더 (이루다 챗봇, ZETA 개발) 홍승환 강사 강연</li>
                    <li>바이브 코딩을 활용한 웹앱과 게임 만들기 실습</li>
                    <li className="font-bold text-slate-900 whitespace-nowrap md:whitespace-normal">+ AI 윤리 교육과 Gemini 활용법 - 최원희 강사</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Accommodation */}
            <div className="bg-white rounded-2xl p-6 md:p-8 text-slate-800 shadow-xl overflow-hidden relative">
               <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-[40%] flex items-center justify-center shrink-0">
                   <img src="image/myeongdong_hotel.jpg" alt="Myeongdong Hotel" className="rounded-xl h-50 w-full object-cover shadow-inner" />
                </div>
                <div className="flex-1">
                  <h4 className="inline-block px-5 py-1.5 rounded-md bg-blue-100 text-blue-600 font-bold mb-4 text-lg">명동 특급 호텔 숙박</h4>
                  <ul className="space-y-3 text-base md:text-lg list-disc pl-5 text-slate-600 font-medium leading-relaxed">
                    <li>특급 호텔 &lt;더보타닉세운명동&gt; 숙박 및 조식</li>
                    <li>최고급 룸 컨디션과 시설 : 4인 1실 혹은 3인 1실</li>
                    <li>호텔 회의룸에서 이루어지는 서울대 멘토와 질의응답 및 레크레이션 활동</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm md:text-base font-bold opacity-80 uppercase tracking-widest">
             <div className="flex items-center gap-3 hover:text-blue-200 transition-colors">더 보기 <ArrowRight size={20}/></div>
             <div className="text-white">WWW.EDUONECAMP.COM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialTourModal;
