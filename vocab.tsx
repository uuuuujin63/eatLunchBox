import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Volume2, 
  Star, 
  ChevronDown, 
  Home, 
  BookOpen, 
  Plus, 
  BarChart3, 
  CheckCircle2, 
  XCircle,
  Quote,
  Flame,
  Search
} from 'lucide-react';

const App = () => {
  // --- 상태 관리 ---
  const [activeTab, setActiveTab] = useState('words');
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [xp, setXp] = useState(75);
  const [streak, setStreak] = useState(5);

  // --- 모의 데이터 ---
  const wordList = [
    { id: 1, word: 'Serendipity', meaning: '뜻밖의 발견, 운 좋은 우연', favorite: false, level: 'B2' },
    { id: 2, word: 'Resilient', meaning: '회복력 있는, 탄력 있는', favorite: true, level: 'C1' },
    { id: 3, word: 'Persistent', meaning: '끈기 있는, 집요한', favorite: false, level: 'B1' },
    { id: 4, word: 'Eloquent', meaning: '유창한, 설득력 있는', favorite: false, level: 'C2' },
  ];

  const sentenceList = [
    { 
      id: 1, 
      eng: "The only way to do great work is to love what you do.", 
      kor: "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것입니다.",
      author: "Steve Jobs",
      tag: "Motivation"
    },
    { 
      id: 2, 
      eng: "Consistency is the key to mastering any language.", 
      kor: "일관성은 어떤 언어를 마스터하는 데 있어 핵심입니다.",
      author: "LangGenie",
      tag: "Learning"
    }
  ];

  const quizOptions = [
    { id: 1, text: '어렴풋한' },
    { id: 2, text: '피할 수 없는', correct: true },
    { id: 3, text: '투명한' },
    { id: 4, text: '복잡한' }
  ];

  // --- 이벤트 핸들러 ---
  const handleQuizChoice = (option) => {
    if (quizAnswered) return;
    setSelectedOption(option.id);
    setQuizAnswered(true);
    if (option.correct) {
      setXp(prev => Math.min(prev + 5, 100));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-0 sm:p-4">
      {/* Mobile Wrapper */}
      <div className="w-full max-w-md bg-white min-h-screen sm:min-h-[844px] sm:rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden border-8 border-slate-900 sm:border-slate-800">
        
        {/* Status Bar Mockup (Internal) */}
        <div className="h-6 w-full flex justify-between items-center px-8 pt-2">
            <span className="text-[10px] font-bold text-slate-400">9:41</span>
            <div className="flex gap-1">
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
            </div>
        </div>

        {/* Top Profile Section */}
        <header className="bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-700 p-6 pt-4 text-white rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute top-20 -left-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>

          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center overflow-hidden rotate-3 shadow-inner">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
                    alt="User" 
                    className="w-full h-full object-cover -rotate-3"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-orange-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                   <Flame size={10} fill="currentColor" /> {streak}
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">김지니 님</h1>
                <p className="text-indigo-100/80 text-xs font-medium flex items-center">
                  <span className="bg-yellow-400 text-indigo-900 text-[9px] font-black px-1.5 py-0.5 rounded-sm mr-1.5 shadow-sm">LV.12</span>
                  마스터 지니
                </p>
              </div>
            </div>
            <div className="flex gap-2">
                <button className="bg-white/10 p-2.5 rounded-xl hover:bg-white/20 transition-all active:scale-95">
                    <Search size={18} />
                </button>
                <button className="bg-white/10 p-2.5 rounded-xl hover:bg-white/20 transition-all active:scale-95">
                    <Settings size={18} />
                </button>
            </div>
          </div>

          <div className="bg-indigo-950/30 p-4 rounded-2xl backdrop-blur-xl border border-white/10 relative z-10">
            <div className="flex justify-between items-end mb-2.5">
              <span className="text-[11px] font-semibold text-indigo-100 uppercase tracking-wider">Next Level Progress</span>
              <span className="text-sm font-black text-yellow-300">{xp}%</span>
            </div>
            <div className="w-full bg-indigo-900/40 h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div 
                className="bg-gradient-to-r from-yellow-300 to-orange-400 h-full rounded-full shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all duration-1000 ease-out"
                style={{ width: `${xp}%` }}
              ></div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex px-4 mt-2 sticky top-0 bg-white/90 backdrop-blur-md z-10">
          {['words', 'sentences', 'quiz'].map((tab) => (
            <button 
              key={tab}
              onClick={() => {
                  setActiveTab(tab);
                  if(tab !== 'quiz') { setQuizAnswered(false); setSelectedOption(null); }
              }}
              className={`flex-1 py-4 text-sm font-bold transition-all relative ${
                activeTab === tab 
                  ? 'text-indigo-600' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'words' && '단어장'}
              {tab === 'sentences' && '문장학습'}
              {tab === 'quiz' && '퀴즈쇼'}
              {activeTab === tab && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-full animate-in fade-in zoom-in duration-300"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-5 pb-32 no-scrollbar">
          
          {/* Word List Tab */}
          {activeTab === 'words' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center px-1">
                <h2 className="font-extrabold text-slate-800 text-lg">
                  내 단어장 <span className="ml-1 text-indigo-500">{wordList.length}</span>
                </h2>
                <button className="bg-slate-50 text-[11px] font-bold text-slate-500 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1">
                  최신순 <ChevronDown size={12} />
                </button>
              </div>

              <div className="space-y-3">
                {wordList.map(item => (
                  <div key={item.id} className="group bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all active:scale-[0.98] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-bold text-xs group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
                        {item.level}
                      </div>
                      <div>
                        <div className="text-base font-bold text-slate-900">{item.word}</div>
                        <div className="text-xs text-slate-500 font-medium">{item.meaning}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className={`p-2 rounded-full transition-all ${item.favorite ? 'text-yellow-400' : 'text-slate-200 hover:text-slate-300'}`}>
                        <Star size={20} fill={item.favorite ? "currentColor" : "none"} />
                      </button>
                      <button className="p-2 rounded-full text-indigo-500 hover:bg-indigo-50 active:bg-indigo-100 transition-all">
                        <Volume2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sentence Tab */}
          {activeTab === 'sentences' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                <h2 className="font-extrabold text-slate-800 text-lg">Daily Sentences</h2>
              </div>
              
              {sentenceList.map(item => (
                <div key={item.id} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative group transition-all hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5">
                  <Quote className="absolute -top-2 -left-2 text-indigo-200" size={32} />
                  <p className="text-indigo-950 font-bold mb-4 leading-relaxed text-lg tracking-tight">
                    "{item.eng}"
                  </p>
                  <p className="text-sm text-slate-500 font-medium mb-5 bg-white/50 p-3 rounded-xl border border-slate-100 italic">{item.kor}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User size={12} className="text-indigo-600" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{item.author}</span>
                    </div>
                    <button className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95 transition-all">
                      <Volume2 size={14} /> Listen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quiz Tab */}
          {activeTab === 'quiz' && (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
              <div className="w-full mb-8 px-1">
                <div className="flex justify-between text-[11px] font-black text-slate-400 mb-2.5 uppercase tracking-widest">
                  <span>In Progress</span>
                  <span className="text-indigo-600">4 / 10</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div className="bg-indigo-600 h-full w-[40%] rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(79,70,229,0.3)]"></div>
                </div>
              </div>

              <div className="bg-white w-full rounded-[3rem] p-8 border border-slate-100 shadow-2xl shadow-indigo-500/10 text-center mb-8 relative border-b-8 border-b-slate-100">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-5 py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                  Quick Quiz
                </div>
                
                <div className="mt-4">
                    <h3 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">Inevitable</h3>
                    <p className="text-slate-400 text-sm mb-10 font-medium">/ɪnˈevɪtəbl/</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3.5 w-full">
                  {quizOptions.map(option => {
                    let baseClass = "flex items-center justify-between w-full py-4.5 px-6 border-2 rounded-2xl transition-all font-bold text-[15px] active:scale-[0.98]";
                    let statusClass = "border-slate-100 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50";
                    let icon = <div className="w-5 h-5 rounded-full border-2 border-slate-200"></div>;

                    if (quizAnswered) {
                      if (option.correct) {
                        statusClass = "border-green-500 bg-green-50 text-green-700 ring-4 ring-green-50";
                        icon = <CheckCircle2 size={22} className="text-green-500" />;
                      } else if (selectedOption === option.id) {
                        statusClass = "border-rose-400 bg-rose-50 text-rose-600";
                        icon = <XCircle size={22} className="text-rose-500" />;
                      } else {
                        statusClass = "border-slate-50 text-slate-300 opacity-60";
                        icon = <div className="w-5 h-5 rounded-full border-2 border-slate-100"></div>;
                      }
                    }

                    return (
                      <button 
                        key={option.id}
                        disabled={quizAnswered}
                        onClick={() => handleQuizChoice(option)}
                        className={`${baseClass} ${statusClass} py-4`}
                      >
                        {option.text}
                        {icon}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <button 
                className={`w-full py-5 rounded-2xl font-black text-base transition-all transform active:scale-[0.97] flex items-center justify-center gap-2 ${
                  quizAnswered 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 translate-y-0' 
                  : 'bg-slate-100 text-slate-400 translate-y-4 opacity-50 cursor-not-allowed'
                }`}
              >
                다음 문제 <Plus size={20} className="rotate-45" />
              </button>
            </div>
          )}

        </main>

        {/* Bottom Navigation Bar */}
        <footer className="bg-white/80 backdrop-blur-xl border-t border-slate-100 py-4 px-10 flex justify-between items-center absolute bottom-0 w-full rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          <button className="flex flex-col items-center gap-1 group">
            <Home size={24} className={activeTab === 'home' ? 'text-indigo-600' : 'text-slate-300 group-hover:text-indigo-400 transition-colors'} />
            <span className={`text-[10px] font-bold ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}>홈</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 group">
            <BookOpen size={24} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[10px] font-bold text-slate-400">교재</span>
          </button>
          
          <div className="relative -mt-16">
             <button className="bg-indigo-600 w-16 h-16 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-400/50 hover:scale-110 active:scale-90 transition-all border-4 border-white">
              <Plus size={32} strokeWidth={3} />
            </button>
          </div>

          <button className="flex flex-col items-center gap-1 group">
            <BarChart3 size={24} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[10px] font-bold text-slate-400">분석</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 group">
            <User size={24} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[10px] font-bold text-slate-400">마이</span>
          </button>
        </footer>

        {/* Dynamic Notch Mockup (Desktop Only Decor) */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-2xl z-50"></div>
      </div>
      
      {/* Visual Guide (Optional/Side note) */}
      <div className="hidden lg:block ml-12 max-w-xs text-slate-400">
          <h4 className="text-slate-800 font-bold mb-2 uppercase text-xs tracking-widest">Design Tokens</h4>
          <ul className="text-sm space-y-4">
              <li className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-indigo-600 rounded-sm"></div>
                  <span>Primary: Indigo 600</span>
              </li>
              <li className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-white border border-slate-200 rounded-sm"></div>
                  <span>Surfaces: Glassmorphism / White</span>
              </li>
              <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                  <span>Radius: 2.5rem (Super Ellipse)</span>
              </li>
          </ul>
      </div>
    </div>
  );
};

export default App;