import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
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
  Search,
  Tv,
  Wifi,
  Sparkles,
  Film,
  Bot,
  UserCircle2
} from 'lucide-react';
import { WordItem, SentenceItem, QuizItem } from './types';

// ⚠️ 해커톤 팁: 백엔드 서버 IP를 입력하세요.
const SERVER_URL = 'http://192.168.0.xxx:3000'; 
const socket = io(SERVER_URL, { autoConnect: false });

const App: React.FC = () => {
  // --- 상태 관리 ---
  const [activeTab, setActiveTab] = useState<string>('words');
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [xp, setXp] = useState<number>(75);
  const [streak, setStreak] = useState<number>(5);
  const [selectedShow, setSelectedShow] = useState<string | 'ALL'>('ALL');
  const [wordSourceFilter, setWordSourceFilter] = useState<'all' | 'user' | 'ai'>('all');

  // --- 동적 데이터 (TV 연동) ---
  const [words, setWords] = useState<WordItem[]>([
    { id: 1, word: 'Serendipity', meaning: '뜻밖의 발견, 운 좋은 우연', favorite: false, level: 'B2', showName: 'Emily in Paris', source: 'user' },
    { id: 2, word: 'Resilient', meaning: '회복력 있는, 탄력 있는', favorite: true, level: 'C1', showName: 'Stranger Things', source: 'ai' },
    { id: 3, word: 'Persistent', meaning: '끈기 있는, 집요한', favorite: false, level: 'B1', showName: 'Stranger Things', source: 'user' },
    { id: 4, word: 'Eloquent', meaning: '유창한, 설득력 있는', favorite: false, level: 'C2', showName: 'The Crown', source: 'ai' },
  ]);
  const [quizList, setQuizList] = useState<QuizItem[]>([]);

  // --- 정적 데이터 ---
  const sentenceList: SentenceItem[] = [
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

  // --- 파생 데이터 (콘텐츠 및 소스 필터링) ---
  const uniqueShows = Array.from(new Set(words.map(w => w.showName).filter(Boolean))) as string[];
  
  const filteredWords = words.filter(w => {
    const showMatch = selectedShow === 'ALL' || w.showName === selectedShow;
    const sourceMatch = wordSourceFilter === 'all' || w.source === wordSourceFilter;
    return showMatch && sourceMatch;
  });

  // --- 소켓 연결 ---
  useEffect(() => {
    socket.connect();
    socket.on('receive_word', (newWord: WordItem) => {
      setWords((prev) => [newWord, ...prev]);
    });
    socket.on('receive_quiz', (newQuiz: QuizItem) => {
      setQuizList((prev) => [newQuiz, ...prev]);
    });
    return () => { socket.disconnect(); };
  }, []);

  // --- 해커톤 시연용 Mock 함수 ---
  const simulateTvSync = () => {
    const mockWord: WordItem = {
      id: Date.now().toString(),
      word: 'Seamless',
      meaning: '매끄러운, 끊김 없는',
      level: 'B2',
      favorite: false,
      context: 'A seamless AI agent turning watching into learning.',
      showName: 'Samsung Unpacked',
      source: 'user' // 시연용은 사용자가 저장한 것으로 가정
    };
    setWords((prev) => [mockWord, ...prev]);
    setSelectedShow('ALL');
    setWordSourceFilter('all');
  };

  const simulateQuizGen = () => {
    const mockQuiz: QuizItem = {
      id: Date.now().toString(),
      question: "'Seamless'의 가장 적절한 뜻은 무엇인가요?",
      options: ['복잡한', '끊김 없는', '무거운', '투명한'],
      answer: '끊김 없는',
    };
    setQuizList((prev) => [mockQuiz, ...prev]);
    setActiveTab('quiz');
    setQuizAnswered(false);
    setSelectedOption(null);
  };

  // --- 이벤트 핸들러 ---
  const handleQuizChoice = (option: string, answer: string) => {
    if (quizAnswered) return;
    setSelectedOption(option);
    setQuizAnswered(true);
    if (option === answer) {
      setXp(prev => Math.min(prev + 5, 100));
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      {/* Mobile Wrapper - Fixed aspect ratio for desktop (390x844), full screen for mobile */}
      <div className="w-full h-[100dvh] sm:w-[390px] sm:h-[844px] bg-slate-50 sm:rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden sm:border-[8px] border-slate-900">
        
        {/* Top Profile Section & Status Bar */}
        <header className="bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-800 pt-2 pb-6 px-5 text-white rounded-b-[2.5rem] shadow-lg relative overflow-hidden shrink-0">
          {/* Decorative background elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute top-20 -left-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>

          {/* Status Bar Mockup */}
          <div className="h-6 w-full flex justify-between items-center mb-4 relative z-20">
            <span className="text-[11px] font-bold text-white tracking-wider">9:41</span>
            
            {/* TV Sync Indicator (Center) */}
            <div className="flex items-center gap-1.5 bg-black/20 border border-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-md">
              <Tv size={10} className="text-green-400" />
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
              <span className="text-[9px] font-bold text-white tracking-wide uppercase">TV Sync</span>
            </div>

            <div className="flex gap-1 items-center">
              <Wifi size={12} className="text-white" />
              <div className="w-4 h-2.5 bg-white rounded-sm relative">
                <div className="absolute right-[-2px] top-1 w-0.5 h-1 bg-white rounded-r-sm"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center overflow-hidden rotate-3 shadow-inner">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
                    alt="User" 
                    className="w-full h-full object-cover -rotate-3"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-orange-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-md border border-white/20">
                  <Flame size={10} fill="currentColor" /> {streak}
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight leading-tight">김지니 님</h1>
                <p className="text-indigo-100/90 text-[11px] font-medium flex items-center mt-0.5">
                  <span className="bg-yellow-400 text-indigo-900 text-[8px] font-black px-1.5 py-0.5 rounded-sm mr-1.5 shadow-sm">LV.12</span>
                  마스터 지니
                </p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all active:scale-95">
                <Search size={16} />
              </button>
              <button className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all active:scale-95">
                <Settings size={16} />
              </button>
            </div>
          </div>

          <div className="bg-indigo-950/30 p-3.5 rounded-2xl backdrop-blur-xl border border-white/10 relative z-10">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-semibold text-indigo-100 uppercase tracking-wider">Next Level Progress</span>
              <span className="text-xs font-black text-yellow-300">{xp}%</span>
            </div>
            <div className="w-full bg-indigo-900/40 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div 
                className="bg-gradient-to-r from-yellow-300 to-orange-400 h-full rounded-full shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all duration-1000 ease-out"
                style={{ width: `${xp}%` }}
              ></div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex px-2 mt-1 sticky top-0 bg-slate-50/90 backdrop-blur-md z-10 shrink-0">
          {['words', 'sentences', 'quiz'].map((tab) => (
            <button 
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if(tab !== 'quiz') { setQuizAnswered(false); setSelectedOption(null); }
              }}
              className={`flex-1 py-3.5 text-[13px] font-bold transition-all relative ${
                activeTab === tab 
                  ? 'text-indigo-600' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'words' && '단어장'}
              {tab === 'sentences' && '문장학습'}
              {tab === 'quiz' && '퀴즈쇼'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-indigo-600 rounded-full animate-in fade-in zoom-in duration-300"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 pb-28 no-scrollbar">
          
          {/* Word List Tab */}
          {activeTab === 'words' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* --- TV Sync Active Banner --- */}
              <div className="mx-1 bg-slate-900 rounded-[1.5rem] p-4 relative overflow-hidden shadow-xl shadow-slate-900/10">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl animate-pulse-slow"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                      <Tv className="text-indigo-300" size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white font-bold text-[14px] tracking-tight">거실 Samsung TV</span>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                      </div>
                      <p className="text-indigo-200/80 text-[10px] font-medium">실시간 자막 분석 및 동기화 중...</p>
                    </div>
                  </div>

                  {/* Hackathon Demo Buttons */}
                  <div className="flex flex-col gap-1.5">
                    <button onClick={simulateTvSync} className="bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-400/30 text-indigo-100 text-[9px] font-bold px-2.5 py-1.5 rounded-lg transition-all active:scale-95 flex items-center gap-1">
                      <Plus size={10} /> 단어 추출
                    </button>
                    <button onClick={simulateQuizGen} className="bg-purple-500/20 hover:bg-purple-500/40 border border-purple-400/30 text-purple-100 text-[9px] font-bold px-2.5 py-1.5 rounded-lg transition-all active:scale-95 flex items-center gap-1">
                      <Flame size={10} /> 퀴즈 생성
                    </button>
                  </div>
                </div>
              </div>

              {/* --- Content Filter (Horizontal Scroll) --- */}
              {uniqueShows.length > 0 && (
                <div className="mt-5 mb-2">
                  <div className="flex items-center gap-1.5 px-2 mb-2.5">
                    <Film size={14} className="text-indigo-500" />
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">시청한 콘텐츠별 보기</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
                    <button
                      onClick={() => setSelectedShow('ALL')}
                      className={`shrink-0 px-4 py-2 rounded-xl text-[12px] font-bold transition-all ${
                        selectedShow === 'ALL'
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                          : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      전체보기
                    </button>
                    {uniqueShows.map(show => (
                      <button
                        key={show}
                        onClick={() => setSelectedShow(show)}
                        className={`shrink-0 px-4 py-2 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 ${
                          selectedShow === show
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                            : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <Tv size={12} className={selectedShow === show ? 'text-indigo-200' : 'text-slate-400'} />
                        {show}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* --- Source Filter (User vs AI) --- */}
              <div className="px-1 mt-4 mb-2">
                <div className="bg-slate-200/50 p-1 rounded-xl flex relative">
                  <button 
                    className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-300 z-10 flex items-center justify-center gap-1 ${
                      wordSourceFilter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                    onClick={() => setWordSourceFilter('all')}
                  >
                    전체 단어
                  </button>
                  <button 
                    className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-300 z-10 flex items-center justify-center gap-1 ${
                      wordSourceFilter === 'user' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                    onClick={() => setWordSourceFilter('user')}
                  >
                    <UserCircle2 size={12} /> 내가 저장한 단어
                  </button>
                  <button 
                    className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-300 z-10 flex items-center justify-center gap-1 ${
                      wordSourceFilter === 'ai' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                    onClick={() => setWordSourceFilter('ai')}
                  >
                    <Bot size={12} /> AI 추천 단어
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center px-1 mb-1 mt-2">
                <h2 className="font-extrabold text-slate-800 text-base">
                  {selectedShow === 'ALL' ? '목록' : `'${selectedShow}'`}
                  <span className="ml-1.5 text-indigo-500 text-sm">{filteredWords.length}</span>
                </h2>
                <button className="bg-white text-[10px] font-bold text-slate-500 px-2.5 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1 shadow-sm">
                  최신순 <ChevronDown size={10} />
                </button>
              </div>

              <div className="space-y-3">
                {filteredWords.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-sm font-medium">
                    조건에 맞는 단어가 없습니다.
                  </div>
                ) : (
                  filteredWords.map(item => (
                    <div key={item.id} className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all active:scale-[0.98]">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-10 h-10 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-bold text-[11px] group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                            {item.level || 'New'}
                          </div>
                          <div className="truncate">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <div className="text-[16px] font-bold text-slate-900 truncate">{item.word}</div>
                              {/* Source Badge */}
                              {item.source === 'ai' ? (
                                <span className="bg-purple-50 text-purple-600 text-[8px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <Bot size={8} /> AI 추천
                                </span>
                              ) : item.source === 'user' ? (
                                <span className="bg-indigo-50 text-indigo-600 text-[8px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <UserCircle2 size={8} /> 직접 저장
                                </span>
                              ) : null}
                            </div>
                            <div className="text-[12px] text-slate-500 font-medium truncate">{item.meaning}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-0.5 shrink-0">
                          <button className={`p-1.5 rounded-full transition-all ${item.favorite ? 'text-yellow-400' : 'text-slate-200 hover:text-slate-300'}`}>
                            <Star size={18} fill={item.favorite ? "currentColor" : "none"} />
                          </button>
                          <button className="p-1.5 rounded-full text-indigo-500 hover:bg-indigo-50 active:bg-indigo-100 transition-all">
                            <Volume2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Show Tag (Visible only in ALL view if showName exists) */}
                      {selectedShow === 'ALL' && item.showName && (
                        <div className="mt-2.5 inline-flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
                          <Film size={10} className="text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-500">{item.showName}</span>
                        </div>
                      )}

                      {/* TV Context Section (if available) */}
                      {item.context && (
                        <div className="mt-3 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                          <p className="text-[10px] text-slate-400 font-bold mb-1 flex items-center gap-1 uppercase tracking-widest">
                            <Tv size={10} className="text-indigo-400" /> TV에서 들은 문장
                          </p>
                          <p className="text-[13px] text-slate-700 font-medium leading-snug italic">
                            "{item.context}"
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Sentence Tab */}
          {activeTab === 'sentences' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 px-1 mb-1">
                <div className="w-1 h-5 bg-indigo-600 rounded-full"></div>
                <h2 className="font-extrabold text-slate-800 text-base">Daily Sentences</h2>
              </div>
                
              {sentenceList.map(item => (
                <div key={item.id} className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm relative group transition-all hover:shadow-md">
                  <Quote className="absolute -top-2 -left-2 text-indigo-100" size={28} />
                  <p className="text-slate-800 font-bold mb-3 leading-relaxed text-[15px] tracking-tight">
                    "{item.eng}"
                  </p>
                  <p className="text-[12px] text-slate-500 font-medium mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                    {item.kor}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center">
                        <User size={10} className="text-indigo-500" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.author}</span>
                    </div>
                    <button className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-md shadow-indigo-200 hover:scale-105 active:scale-95 transition-all">
                      <Volume2 size={12} /> Listen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quiz Tab */}
          {activeTab === 'quiz' && (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
              {quizList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 opacity-80 mt-10">
                  <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Sparkles className="text-purple-400" size={32} />
                  </div>
                  <p className="text-center text-slate-500 font-medium text-sm leading-relaxed">
                    TV 시청이 종료되면<br/>학습한 단어를 바탕으로 퀴즈가 생성됩니다.
                  </p>
                  <button onClick={simulateQuizGen} className="mt-6 bg-purple-100 text-purple-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-purple-200 transition-colors">
                    시연용 퀴즈 생성하기
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-full mb-6 px-1">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">
                      <span>In Progress</span>
                      <span className="text-indigo-600">1 / {quizList.length}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden p-0.5">
                      <div className="bg-indigo-600 h-full w-[20%] rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(79,70,229,0.3)]"></div>
                    </div>
                  </div>

                  <div className="bg-white w-full rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-indigo-500/5 text-center mb-6 relative border-b-4 border-b-slate-100">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[9px] font-black px-4 py-1 rounded-full shadow-md uppercase tracking-widest">
                      AI 맞춤 퀴즈
                    </div>
                    
                    <div className="mt-3 mb-6">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                        {quizList[0].question}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2.5 w-full">
                      {quizList[0].options.map((option, idx) => {
                        let baseClass = "flex items-center justify-between w-full py-3.5 px-5 border-2 rounded-xl transition-all font-bold text-[13px] active:scale-[0.98]";
                        let statusClass = "border-slate-100 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50";
                        let icon = <div className="w-4 h-4 rounded-full border-2 border-slate-200"></div>;

                        if (quizAnswered) {
                          if (option === quizList[0].answer) {
                            statusClass = "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-100";
                            icon = <CheckCircle2 size={18} className="text-green-500" />;
                          } else if (selectedOption === option) {
                            statusClass = "border-rose-400 bg-rose-50 text-rose-600";
                            icon = <XCircle size={18} className="text-rose-500" />;
                          } else {
                            statusClass = "border-slate-50 text-slate-300 opacity-60";
                            icon = <div className="w-4 h-4 rounded-full border-2 border-slate-100"></div>;
                          }
                        }

                        return (
                          <button 
                            key={idx}
                            disabled={quizAnswered}
                            onClick={() => handleQuizChoice(option, quizList[0].answer)}
                            className={`${baseClass} ${statusClass}`}
                          >
                            {option}
                            {icon}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                    
                  <button 
                    className={`w-full py-4 rounded-xl font-black text-[14px] transition-all transform active:scale-[0.97] flex items-center justify-center gap-2 ${
                      quizAnswered 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-y-0' 
                      : 'bg-slate-200 text-slate-400 translate-y-2 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    다음 문제 <Plus size={16} className="rotate-45" />
                  </button>
                </>
              )}
            </div>
          )}

        </main>

        {/* Bottom Navigation Bar */}
        <footer className="bg-white/90 backdrop-blur-xl border-t border-slate-100 py-3 px-6 flex justify-between items-center absolute bottom-0 w-full rounded-t-[2rem] shadow-[0_-10px_30px_rgba(0,0,0,0.04)] shrink-0 z-20 pb-6 sm:pb-3">
          <button className="flex flex-col items-center gap-1 group w-12">
            <Home size={22} className={activeTab === 'home' ? 'text-indigo-600' : 'text-slate-300 group-hover:text-indigo-400 transition-colors'} />
            <span className={`text-[9px] font-bold ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}>홈</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 group w-12">
            <BookOpen size={22} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[9px] font-bold text-slate-400">교재</span>
          </button>
          
          <div className="relative -mt-10">
            <button className="bg-indigo-600 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-400/40 hover:scale-105 active:scale-95 transition-all border-4 border-white">
              <Plus size={28} strokeWidth={3} />
            </button>
          </div>

          <button className="flex flex-col items-center gap-1 group w-12">
            <BarChart3 size={22} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[9px] font-bold text-slate-400">분석</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 group w-12">
            <User size={22} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[9px] font-bold text-slate-400">마이</span>
          </button>
        </footer>

        {/* Dynamic Notch Mockup (Desktop Only Decor) */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-6 bg-black rounded-b-3xl z-50"></div>
        {/* Home Indicator Mockup (Desktop Only Decor) */}
        <div className="hidden sm:block absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full z-50"></div>
      </div>
      
      {/* Visual Guide (Desktop Side Note) */}
      <div className="hidden lg:block ml-16 max-w-xs text-slate-500">
        <h4 className="text-slate-800 font-black mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
          <Tv size={16} className="text-indigo-600" /> SmartThings Sync
        </h4>
        <p className="text-sm leading-relaxed mb-4">
          This UI is optimized for a <strong className="text-slate-800">390x844</strong> mobile viewport. The "TV Sync" badge in the status bar indicates an active connection with a Samsung TV.
        </p>
        <ul className="text-xs space-y-3 font-medium">
          <li className="flex items-center gap-3">
            <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
            <span>Primary: Indigo 600</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span>Sync Status: Active</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
