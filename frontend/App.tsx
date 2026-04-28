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
  UserCircle2,
  ShieldCheck,
  BrainCircuit,
  TrendingUp,
  Lock,
  X,
  ChevronRight
} from 'lucide-react';
import { WordItem, SentenceItem, QuizItem } from './types';

// ⚠️ 해커톤 팁: 백엔드 서버 IP를 입력하세요.
const SERVER_URL = 'http://192.168.0.xxx:3000'; 
const socket = io(SERVER_URL, { autoConnect: false });

const App: React.FC = () => {
  // --- 상태 관리 ---
  const [activeTab, setActiveTab] = useState<string>('words'); // 첫 탭을 단어장으로 변경
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [xp, setXp] = useState<number>(75);
  const [streak, setStreak] = useState<number>(5);
  const [selectedShow, setSelectedShow] = useState<string | 'ALL'>('ALL');
  const [wordSourceFilter, setWordSourceFilter] = useState<'all' | 'user' | 'ai'>('all');
  const [showMentorBubble, setShowMentorBubble] = useState<boolean>(true);

  // --- 동적 데이터 (TV 연동) ---
  const [words, setWords] = useState<WordItem[]>([
    { id: 1, word: 'Serendipity', meaning: '뜻밖의 발견, 운 좋은 우연', favorite: false, level: 'B2', showName: 'Emily in Paris', source: 'user', context: 'It was pure serendipity that we met.' },
    { id: 2, word: 'Resilient', meaning: '회복력 있는, 탄력 있는', favorite: true, level: 'C1', showName: 'Stranger Things', source: 'ai', context: 'She is a very resilient young woman.' },
    { id: 3, word: 'Persistent', meaning: '끈기 있는, 집요한', favorite: false, level: 'B1', showName: 'Stranger Things', source: 'user', context: 'He was persistent in his efforts.' },
    { id: 4, word: 'Eloquent', meaning: '유창한, 설득력 있는', favorite: false, level: 'C2', showName: 'The Crown', source: 'ai', context: 'The queen gave an eloquent speech.' },
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
    <div className="flex items-center justify-center w-full h-full bg-slate-200 p-4">
      {/* Tablet Wrapper - Fixed aspect ratio for tablet (1024x768 landscape) */}
      <div className="w-full h-full max-w-[1024px] max-h-[768px] bg-slate-50 rounded-[2rem] shadow-2xl flex relative overflow-hidden border-[12px] border-slate-900">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
          {/* Profile Section */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-indigo-900/50 backdrop-blur-md border border-indigo-400/30 flex items-center justify-center overflow-hidden shadow-inner">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-md border border-indigo-400/50">
                  <BrainCircuit size={12} className="text-indigo-100" />
                </div>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold tracking-tight leading-tight flex items-center gap-1.5 whitespace-nowrap">
                  김지훈 <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded-md border border-indigo-400/20 shrink-0">15세</span>
                </h1>
                <p className="text-indigo-200/80 text-[11px] font-medium flex items-center mt-0.5 whitespace-nowrap truncate">
                  KnoxEdu
                </p>
              </div>
            </div>
            
            <div className="bg-black/30 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-semibold text-indigo-200 uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                  <TrendingUp size={10} className="shrink-0" /> AI 복습왕
                </span>
                <span className="text-xs font-black text-indigo-300 whitespace-nowrap">Top 1%</span>
              </div>
              <div className="w-full bg-indigo-950/50 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-1000 ease-out"
                  style={{ width: `99%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'words', icon: BookOpen, label: '단어장' },
              { id: 'quiz', icon: Sparkles, label: '퀴즈쇼' },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if(tab.id !== 'quiz') { setQuizAnswered(false); setSelectedOption(null); }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <tab.icon size={18} className="shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Settings */}
          <div className="p-4 border-t border-slate-800">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all">
              <Settings size={18} className="shrink-0" />
              <span className="whitespace-nowrap">설정</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          
          {/* Top Status Bar (Tablet Style) */}
          <header className="h-14 bg-white/80 backdrop-blur-md border-b border-slate-200 flex justify-between items-center px-6 shrink-0 z-20">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-800 tracking-wider whitespace-nowrap">9:41 AM</span>
              <div className="h-4 w-[1px] bg-slate-300 shrink-0"></div>
              <span className="text-sm font-bold text-slate-500 whitespace-nowrap">목요일, 10월 26일</span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Knox Security Indicator */}
              <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full shrink-0">
                <ShieldCheck size={14} className="text-indigo-600 shrink-0" />
                <span className="text-[10px] font-bold text-slate-600 tracking-wide uppercase whitespace-nowrap">Knox Secured</span>
              </div>
              
              {/* TV Sync Indicator */}
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1 rounded-full shrink-0">
                <Tv size={14} className="text-green-600 shrink-0" />
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></span>
                <span className="text-[10px] font-bold text-green-700 tracking-wide uppercase whitespace-nowrap">TV Sync</span>
              </div>

              <div className="flex gap-2 items-center text-slate-400 shrink-0">
                <Wifi size={16} />
                <div className="w-5 h-3 bg-slate-400 rounded-sm relative">
                  <div className="absolute right-[-3px] top-1 w-1 h-1 bg-slate-400 rounded-r-sm"></div>
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-8 bg-slate-50 no-scrollbar relative">
            
            {/* Word List Tab */}
            {activeTab === 'words' && (
              <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* --- TV Sync Active Banner --- */}
                <div className="bg-slate-900 rounded-[2rem] p-6 relative overflow-hidden shadow-xl shadow-slate-900/10">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
                  <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md shrink-0">
                        <Tv className="text-indigo-300" size={32} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-bold text-xl tracking-tight whitespace-nowrap">거실 Samsung TV</span>
                          <span className="relative flex h-3 w-3 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                        </div>
                        <p className="text-indigo-200/80 text-sm font-medium whitespace-nowrap">실시간 자막 분석 및 동기화 중...</p>
                      </div>
                    </div>

                    {/* Hackathon Demo Buttons */}
                    <div className="flex gap-3 shrink-0">
                      <button onClick={simulateTvSync} className="bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-400/30 text-indigo-100 text-sm font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap">
                        <Plus size={16} className="shrink-0" /> 단어 추출
                      </button>
                      <button onClick={simulateQuizGen} className="bg-purple-500/20 hover:bg-purple-500/40 border border-purple-400/30 text-purple-100 text-sm font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap">
                        <Flame size={16} className="shrink-0" /> 퀴즈 생성
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content Filter Section */}
                {uniqueShows.length > 0 && (
                  <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm w-full overflow-hidden">
                    <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto no-scrollbar pb-1 xl:pb-0">
                      <div className="flex items-center gap-2 px-2 shrink-0">
                        <Film size={18} className="text-indigo-500 shrink-0" />
                        <span className="text-sm font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">콘텐츠</span>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedShow('ALL')}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                            selectedShow === 'ALL'
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          전체보기
                        </button>
                        {uniqueShows.map(show => (
                          <button
                            key={show}
                            onClick={() => setSelectedShow(show)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                              selectedShow === show
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            <Tv size={14} className={`shrink-0 ${selectedShow === show ? 'text-indigo-200' : 'text-slate-400'}`} />
                            {show}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Header with Source Filter and Sort */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 gap-4">
                  <h2 className="font-extrabold text-slate-800 text-xl whitespace-nowrap">
                    {selectedShow === 'ALL' ? '단어 목록' : `'${selectedShow}'`}
                    <span className="ml-2 text-indigo-500 text-lg">{filteredWords.length}</span>
                  </h2>
                  
                  <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
                    {/* Source Filter */}
                    <div className="bg-slate-100 p-1 rounded-xl flex shrink-0">
                      <button 
                        className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                          wordSourceFilter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                        onClick={() => setWordSourceFilter('all')}
                      >
                        전체 단어
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                          wordSourceFilter === 'user' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                        onClick={() => setWordSourceFilter('user')}
                      >
                        <UserCircle2 size={14} className="shrink-0" /> 내가 저장한 단어
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                          wordSourceFilter === 'ai' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                        onClick={() => setWordSourceFilter('ai')}
                      >
                        <Bot size={14} className="shrink-0" /> AI 추천 단어
                      </button>
                    </div>

                    <button className="bg-white text-sm font-bold text-slate-600 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 shadow-sm hover:bg-slate-50 whitespace-nowrap shrink-0">
                      최신순 <ChevronDown size={14} className="shrink-0" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredWords.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-slate-400 text-lg font-medium bg-white rounded-3xl border border-slate-200">
                      조건에 맞는 단어가 없습니다.
                    </div>
                  ) : (
                    filteredWords.map(item => (
                      <div key={item.id} className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4 w-full min-w-0">
                            <div className="w-14 h-14 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 font-bold text-sm group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors border border-slate-100">
                              {item.level || 'New'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <div className="text-xl font-bold text-slate-900 truncate">{item.word}</div>
                                {/* Source Badge */}
                                {item.source === 'ai' ? (
                                  <span className="bg-purple-50 text-purple-600 text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 border border-purple-100 shrink-0 whitespace-nowrap">
                                    <Bot size={12} className="shrink-0" /> AI 추천
                                  </span>
                                ) : item.source === 'user' ? (
                                  <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 border border-indigo-100 shrink-0 whitespace-nowrap">
                                    <UserCircle2 size={12} className="shrink-0" /> 직접 저장
                                  </span>
                                ) : null}
                              </div>
                              <div className="text-sm text-slate-500 font-medium truncate">{item.meaning}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 shrink-0 ml-2">
                            <button className={`p-2 rounded-full transition-all ${item.favorite ? 'text-yellow-400' : 'text-slate-300 hover:text-slate-400'}`}>
                              <Star size={24} fill={item.favorite ? "currentColor" : "none"} />
                            </button>
                            <button className="p-2 rounded-full text-indigo-500 hover:bg-indigo-50 active:bg-indigo-100 transition-all">
                              <Volume2 size={24} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-auto">
                          {/* Show Tag */}
                          {selectedShow === 'ALL' && item.showName && (
                            <div className="mb-3 inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                              <Film size={14} className="text-slate-500 shrink-0" />
                              <span className="text-xs font-bold text-slate-600 whitespace-nowrap">{item.showName}</span>
                            </div>
                          )}

                          {/* TV Context Section */}
                          {item.context && (
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                              <p className="text-xs text-slate-500 font-bold mb-2 flex items-center gap-1.5 uppercase tracking-widest whitespace-nowrap">
                                <Tv size={14} className="text-indigo-500 shrink-0" /> TV에서 들은 문장
                              </p>
                              <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
                                "{item.context}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && (
              <div className="max-w-3xl mx-auto flex flex-col items-center animate-in zoom-in-95 duration-500 py-10">
                {quizList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-96 opacity-80 bg-white w-full rounded-[3rem] border border-slate-200 shadow-sm">
                    <div className="w-24 h-24 bg-purple-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-purple-100">
                      <Sparkles className="text-purple-500" size={40} />
                    </div>
                    <p className="text-center text-slate-600 font-medium text-lg leading-relaxed mb-8">
                      TV 시청이 종료되면<br/>학습한 단어를 바탕으로 맞춤형 퀴즈가 생성됩니다.
                    </p>
                    <button onClick={simulateQuizGen} className="bg-purple-600 text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 whitespace-nowrap">
                      시연용 퀴즈 생성하기
                    </button>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="w-full mb-8 px-2">
                      <div className="flex justify-between text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">
                        <span className="whitespace-nowrap">In Progress</span>
                        <span className="text-indigo-600 whitespace-nowrap">1 / {quizList.length}</span>
                      </div>
                      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden p-1">
                        <div className="bg-indigo-600 h-full w-[20%] rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                      </div>
                    </div>

                    <div className="bg-white w-full rounded-[3rem] p-10 border border-slate-200 shadow-xl shadow-indigo-500/5 text-center mb-8 relative border-b-8 border-b-slate-100">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-black px-6 py-2 rounded-full shadow-lg uppercase tracking-widest whitespace-nowrap">
                        AI 맞춤 퀴즈
                      </div>
                      
                      <div className="mt-6 mb-10">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-snug">
                          {quizList[0].question}
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {quizList[0].options.map((option, idx) => {
                          let baseClass = "flex items-center justify-between w-full py-5 px-6 border-2 rounded-2xl transition-all font-bold text-lg active:scale-[0.98]";
                          let statusClass = "border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50";
                          let icon = <div className="w-6 h-6 rounded-full border-2 border-slate-300 shrink-0"></div>;

                          if (quizAnswered) {
                            if (option === quizList[0].answer) {
                              statusClass = "border-green-500 bg-green-50 text-green-700 ring-4 ring-green-100";
                              icon = <CheckCircle2 size={24} className="text-green-500 shrink-0" />;
                            } else if (selectedOption === option) {
                              statusClass = "border-rose-400 bg-rose-50 text-rose-600";
                              icon = <XCircle size={24} className="text-rose-500 shrink-0" />;
                            } else {
                              statusClass = "border-slate-100 text-slate-400 opacity-50";
                              icon = <div className="w-6 h-6 rounded-full border-2 border-slate-200 shrink-0"></div>;
                            }
                          }

                          return (
                            <button 
                              key={idx}
                              disabled={quizAnswered}
                              onClick={() => handleQuizChoice(option, quizList[0].answer)}
                              className={`${baseClass} ${statusClass}`}
                            >
                              <span className="text-left">{option}</span>
                              {icon}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                      
                    <button 
                      className={`w-full py-5 rounded-2xl font-black text-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 whitespace-nowrap ${
                        quizAnswered 
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 translate-y-0' 
                        : 'bg-slate-200 text-slate-400 translate-y-2 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      다음 문제 <Plus size={24} className="rotate-45 shrink-0" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Floating AI Mentor Bubble */}
            {showMentorBubble && (
              <div className="absolute bottom-8 right-8 max-w-sm animate-in slide-in-from-bottom-8 fade-in duration-500 z-50">
                {/* Outer Glow Effect */}
                <div className="absolute -inset-4 bg-indigo-500/30 rounded-3xl blur-xl animate-pulse-slow pointer-events-none"></div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl rounded-br-sm p-5 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.25)] border-2 border-indigo-200 relative overflow-hidden">
                  {/* Subtle inner glow effect */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <button 
                    onClick={() => setShowMentorBubble(false)}
                    className="absolute top-2 right-2 text-indigo-300 hover:text-indigo-600 transition-colors z-10"
                  >
                    <X size={16} />
                  </button>
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
                      <Bot size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-extrabold text-indigo-900 text-sm whitespace-nowrap">Gemini Nano 멘토</h3>
                        <span className="bg-indigo-100 text-indigo-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider border border-indigo-200 whitespace-nowrap">On-Device</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        "지훈아, 오늘 예정된 수학 인강 진도보다 더 시급한 문제가 있어. 어제 푼 모의고사 데이터를 분석해보니, 12살 때부터 누적된 <strong className="text-indigo-600 font-bold">'공간지각력'</strong> 개념 누수가 고등 기하 성적의 발목을 잡고 있어. 이대로면 목표하는 최상위권 대학 진학에 치명적이야. 오늘은 진도를 멈추고 내가 추출한 맞춤형 3D 기하 훈련부터 확실히 끝내자."
                      </p>
                      <div className="mt-3 flex gap-2 w-full">
                        <button className="flex-1 bg-indigo-600 text-white text-[10px] font-bold px-2 py-2 rounded-lg shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors active:scale-95 whitespace-nowrap">
                          3D 훈련 시작하기
                        </button>
                        <button className="flex-1 bg-white text-indigo-600 border border-indigo-200 text-[10px] font-bold px-2 py-2 rounded-lg hover:bg-indigo-50 transition-colors active:scale-95 whitespace-nowrap">
                          원래 진도 계속하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
