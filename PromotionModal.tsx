import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Rocket } from 'lucide-react';

const PromotionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Popup sẽ xuất hiện sau 1.5 giây khi vào trang
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all animate-in fade-in duration-300">
      <div 
        className="relative bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-300 border border-slate-100"
      >
        {/* Nút đóng (X) */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X size={20} className="text-slate-400" />
        </button>

        {/* Phần đầu trang trí màu xanh EduOne (#085BA7) */}
        <div className="h-32 bg-[#085BA7] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
            <Rocket size={40} className="text-white" />
          </div>
        </div>

        {/* Nội dung tiếng Hàn */}
        <div className="p-8 text-center">
          <div className="inline-block px-3 py-1 bg-blue-50 text-[#085BA7] text-[10px] font-bold rounded-full mb-4 uppercase tracking-widest">
            공지사항
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
            에듀원 네이버 블로그
          </h3>
          <p className="text-slate-600 mb-8 leading-relaxed text-[15px]">
            상세 일정, 활동 사진 및 최신 혜택 정보를 <br />
            에듀원 공식 블로그에서 확인해 보세요!
          </p>

          {/* Nút Call to Action */}
          <a
            href="https://blog.naver.com/whatsedu1/224153286321"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#085BA7] hover:bg-[#064a8a] text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
          >
            <span>공식 블로그 바로가기</span>
            <ExternalLink size={18} />
          </a>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="mt-5 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
          >
            다음에 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;