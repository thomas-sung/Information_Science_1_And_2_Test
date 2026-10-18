/**
 * 高職資訊科 統測專業科目測驗系統 - 核心應用程式邏輯 (app.js)
 */

(function () {
  'use strict';

  // ==========================================
  // 全域狀態 (State Management)
  // ==========================================
  const state = {
    selectedSubject: 'subject1', // 'subject1' | 'subject2' | 'all'
    selectedScope: 'all',        // 'all' | 'mock1' | 'mock2' | 'mock3' | 'mock4' | 'past_exam'
    examMode: 'standard',        // 'standard' (模擬考) | 'practice' (刷題練習) | 'wrong_review' (錯題複習)
    questionCountLimit: 10,      // 題數限制 (10, 20, 'all')
    timeLimitMinutes: 60,        // 考試時間 (分鐘)
    
    currentQuestions: [],        // 當前測驗抽取的題目
    currentIndex: 0,             // 當前題號 (0-indexed)
    answers: {},                 // 使用者作答 { [qIndex]: optionIndex }
    flagged: {},                 // 標記複核 { [qIndex]: boolean }
    
    timeRemaining: 0,            // 剩餘秒數
    timerInterval: null,         // 計時器定時器
    examStartTime: null,         // 開始作答時間
    
    examHistory: [],             // 歷次成績記錄
    wrongQuestionIds: new Set(), // 歷史錯題庫 ID 集合
    
    resultFilter: 'all',         // 'all' | 'wrong' | 'correct'
    isDarkTheme: false,          // 暗黑模式
    
    // 學生身分登入紀錄
    currentUser: {
      name: '',
      studentId: ''
    },
    pendingStartAction: null     // 登入後預備執行的動作
  };

  // ==========================================
  // DOM 元素引用
  // ==========================================
  const elements = {
    // 學生身分與登入彈窗
    userProfileBtn: document.getElementById('user-profile-btn'),
    userDisplayName: document.getElementById('user-display-name'),
    loginModal: document.getElementById('login-modal'),
    loginModalCloseBtn: document.getElementById('login-modal-close-btn'),
    loginForm: document.getElementById('login-form'),
    inputStudentName: document.getElementById('input-student-name'),
    inputStudentId: document.getElementById('input-student-id'),
    btnSubmitLogin: document.getElementById('btn-submit-login'),

    // 主題與面板
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    historyBtn: document.getElementById('history-btn'),
    historyModal: document.getElementById('history-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    
    viewSetup: document.getElementById('view-setup'),
    viewExam: document.getElementById('view-exam'),
    viewResult: document.getElementById('view-result'),
    
    // 設定區
    subjectCards: document.querySelectorAll('.subject-card'),
    scopeSelect: document.getElementById('scope-select'),
    scopeDescBox: document.getElementById('scope-desc-box'),
    modeSelect: document.getElementById('mode-select'),
    countSelect: document.getElementById('count-select'),
    timeSelect: document.getElementById('time-select'),
    btnStartExam: document.getElementById('btn-start-exam'),
    wrongReviewBtn: document.getElementById('btn-wrong-review'),
    wrongCountBadge: document.getElementById('wrong-count-badge'),
    
    // 考試區
    examSubjectTitle: document.getElementById('exam-subject-title'),
    examModeBadge: document.getElementById('exam-mode-badge'),
    examCandidateName: document.getElementById('exam-candidate-name'),
    examTimerBox: document.getElementById('exam-timer-box'),
    examTimerText: document.getElementById('exam-timer-text'),
    
    qIndexNum: document.getElementById('q-index-num'),
    qTotalNum: document.getElementById('q-total-num'),
    qCategoryTag: document.getElementById('q-category-tag'),
    btnFlagQuestion: document.getElementById('btn-flag-question'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    practiceExplanation: document.getElementById('practice-explanation'),
    practiceExplanationContent: document.getElementById('practice-explanation-content'),
    btnTogglePracticeExp: document.getElementById('btn-toggle-practice-exp'),
    
    btnPrevQuestion: document.getElementById('btn-prev-question'),
    btnNextQuestion: document.getElementById('btn-next-question'),
    sheetGrid: document.getElementById('sheet-grid'),
    answeredCountText: document.getElementById('answered-count-text'),
    totalCountText: document.getElementById('total-count-text'),
    btnSubmitExam: document.getElementById('btn-submit-exam'),
    
    // 結果區
    resultCandidateName: document.getElementById('result-candidate-name'),
    resultTimestamp: document.getElementById('result-timestamp'),
    scoreNumber: document.getElementById('score-number'),
    gradeBadge: document.getElementById('grade-badge'),
    statCorrect: document.getElementById('stat-correct'),
    statWrong: document.getElementById('stat-wrong'),
    statRate: document.getElementById('stat-rate'),
    statTime: document.getElementById('stat-time'),
    categoryBreakdown: document.getElementById('category-breakdown'),
    filterTabs: document.querySelectorAll('.filter-btn'),
    reviewList: document.getElementById('review-list'),
    btnRetakeExam: document.getElementById('btn-retake-exam'),
    btnBackHome: document.getElementById('btn-back-home'),
    
    // 瀏覽全題庫
    browseAllBtn: document.getElementById('browse-all-btn'),
    btnHomeBrowse: document.getElementById('btn-home-browse'),
    mobileNavSelect: document.getElementById('mobile-nav-select'),
    mobileSetupActionSelect: document.getElementById('mobile-setup-action-select'),
    mobileWrongCountBadge: document.getElementById('mobile-wrong-count-badge'),
    viewBrowse: document.getElementById('view-browse'),
    btnBrowseBackHome: document.getElementById('btn-browse-back-home'),
    browseYearFilter: document.getElementById('browse-year-filter'),
    browseSubjectFilter: document.getElementById('browse-subject-filter'),
    browseCategoryFilter: document.getElementById('browse-category-filter'),
    browseScopeFilter: document.getElementById('browse-scope-filter'),
    browseSearchInput: document.getElementById('browse-search-input'),
    browseTotalCount: document.getElementById('browse-total-count'),
    browseQuestionsContainer: document.getElementById('browse-questions-container'),
    
    // 歷史彈窗
    historyTableBody: document.getElementById('history-table-body'),
    historyEmptyState: document.getElementById('history-empty-state'),
    btnClearHistory: document.getElementById('btn-clear-history'),
    btnExportData: document.getElementById('btn-export-data'),
    importFileInput: document.getElementById('import-file-input')
  };

  // ==========================================
  // 初始化 (Initialization)
  // ==========================================
  function init() {
    loadLocalData();
    updateUserDisplay();
    setupEventListeners();
    updateWrongCountDisplay();
    applyTheme(state.isDarkTheme);
  }

  // 讀取 LocalStorage
  function loadLocalData() {
    try {
      const savedUser = localStorage.getItem('vcs_current_user');
      if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
      }
      const savedHistory = localStorage.getItem('vcs_exam_history');
      if (savedHistory) {
        state.examHistory = JSON.parse(savedHistory);
      }
      const savedWrongs = localStorage.getItem('vcs_wrong_bank');
      if (savedWrongs) {
        state.wrongQuestionIds = new Set(JSON.parse(savedWrongs));
      }
      const savedTheme = localStorage.getItem('vcs_theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        state.isDarkTheme = true;
      }
    } catch (e) {
      console.error('載入本機資料失敗:', e);
    }
  }

  // 考生身分顯示與登入管理
  function updateUserDisplay() {
    if (state.currentUser && state.currentUser.name) {
      const label = state.currentUser.name + (state.currentUser.studentId ? ` (${state.currentUser.studentId})` : '');
      elements.userDisplayName.textContent = label;
      elements.userProfileBtn.title = `目前登入考生：${label} (點擊修改或切換)`;
    } else {
      elements.userDisplayName.textContent = '訪客 (點擊登入)';
      elements.userProfileBtn.title = '點擊設定或登入考生身分';
    }
  }

  function openLoginModal(actionCallback) {
    state.pendingStartAction = actionCallback || null;
    if (state.currentUser) {
      elements.inputStudentName.value = state.currentUser.name || '';
      elements.inputStudentId.value = state.currentUser.studentId || '';
    }
    elements.loginModal.classList.add('active');
    setTimeout(() => {
      elements.inputStudentName.focus();
    }, 100);
  }

  function closeLoginModal() {
    elements.loginModal.classList.remove('active');
    state.pendingStartAction = null;
  }

  function handleLoginSubmit() {
    const name = elements.inputStudentName.value.trim();
    const studentId = elements.inputStudentId.value.trim();

    if (!name) {
      alert('請輸入學生姓名！');
      elements.inputStudentName.focus();
      return;
    }

    state.currentUser = { name, studentId };
    try {
      localStorage.setItem('vcs_current_user', JSON.stringify(state.currentUser));
    } catch (e) {
      console.error(e);
    }

    updateUserDisplay();
    elements.loginModal.classList.remove('active');

    if (typeof state.pendingStartAction === 'function') {
      const cb = state.pendingStartAction;
      state.pendingStartAction = null;
      cb();
    }
  }

  // 儲存資料到 LocalStorage
  function persistHistory() {
    try {
      localStorage.setItem('vcs_exam_history', JSON.stringify(state.examHistory));
      localStorage.setItem('vcs_wrong_bank', JSON.stringify(Array.from(state.wrongQuestionIds)));
    } catch (e) {
      console.error('儲存本機資料失敗:', e);
    }
  }

  // 更新首頁錯題本數量
  function updateWrongCountDisplay() {
    if (elements.wrongCountBadge) {
      elements.wrongCountBadge.textContent = state.wrongQuestionIds.size;
      if (state.wrongQuestionIds.size === 0) {
        if (elements.wrongReviewBtn) elements.wrongReviewBtn.disabled = true;
      } else {
        if (elements.wrongReviewBtn) elements.wrongReviewBtn.disabled = false;
      }
    }
  }

  // 主題切換
  function applyTheme(isDark) {
    state.isDarkTheme = isDark;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      elements.themeToggleBtn.innerHTML = '☀️';
      elements.themeToggleBtn.title = '切換淺色模式';
    } else {
      document.documentElement.removeAttribute('data-theme');
      elements.themeToggleBtn.innerHTML = '🌙';
      elements.themeToggleBtn.title = '切換深色模式';
    }
    localStorage.setItem('vcs_theme', isDark ? 'dark' : 'light');
  }

  // 切換畫面
  function switchView(viewName) {
    elements.viewSetup.classList.remove('active');
    elements.viewExam.classList.remove('active');
    elements.viewResult.classList.remove('active');
    if (elements.viewBrowse) elements.viewBrowse.classList.remove('active');

    if (viewName === 'setup') {
      elements.viewSetup.classList.add('active');
      updateWrongCountDisplay();
    } else if (viewName === 'exam') {
      elements.viewExam.classList.add('active');
    } else if (viewName === 'result') {
      elements.viewResult.classList.add('active');
    } else if (viewName === 'browse') {
      if (elements.viewBrowse) {
        elements.viewBrowse.classList.add('active');
        renderBrowseQuestions();
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // 事件監聽 (Event Listeners)
  // ==========================================
  function setupEventListeners() {
    // 主題切換
    elements.themeToggleBtn.addEventListener('click', () => {
      applyTheme(!state.isDarkTheme);
    });

    // 歷次成績彈窗
    elements.historyBtn.addEventListener('click', openHistoryModal);
    elements.modalCloseBtn.addEventListener('click', closeHistoryModal);
    elements.historyModal.addEventListener('click', (e) => {
      if (e.target === elements.historyModal) closeHistoryModal();
    });

    // 首頁科目選擇卡片
    elements.subjectCards.forEach(card => {
      card.addEventListener('click', () => {
        elements.subjectCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.selectedSubject = card.getAttribute('data-subject');
      });
    });

    // 開始測驗按鈕
    elements.btnStartExam.addEventListener('click', () => {
      startExam('standard');
    });

    // 專攻錯題按鈕
    const handleDropdownMenuAction = (val) => {
      if (!val) return;
      if (val === 'profile') {
        openLoginModal();
      } else if (val === 'browse') {
        switchView('browse');
      } else if (val === 'history') {
        openHistoryModal();
      } else if (val === 'wrong') {
        if (state.wrongQuestionIds.size === 0) {
          alert('目前沒有歷史錯題紀錄喔！先進行一次測驗吧。');
          return;
        }
        startExam('wrong_review');
      }
    };

    if (elements.mobileNavSelect) {
      elements.mobileNavSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        e.target.value = '';
        handleDropdownMenuAction(val);
      });
    }

    if (elements.mobileSetupActionSelect) {
      elements.mobileSetupActionSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        e.target.value = '';
        handleDropdownMenuAction(val);
      });
    }

    if (elements.wrongReviewBtn) {
      elements.wrongReviewBtn.addEventListener('click', () => {
        if (state.wrongQuestionIds.size === 0) {
          alert('目前沒有歷史錯題紀錄喔！先進行一次測驗吧。');
          return;
        }
        startExam('wrong_review');
      });
    }

    // 考試頁面導航
    elements.btnPrevQuestion.addEventListener('click', () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderCurrentQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    elements.btnNextQuestion.addEventListener('click', () => {
      if (state.currentIndex < state.currentQuestions.length - 1) {
        state.currentIndex++;
        renderCurrentQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // 標記複核
    elements.btnFlagQuestion.addEventListener('click', () => {
      const qIndex = state.currentIndex;
      state.flagged[qIndex] = !state.flagged[qIndex];
      updateFlagButtonState();
      renderSheetGrid();
    });

    // 刷題模式即時看詳解切換
    if (elements.btnTogglePracticeExp) {
      elements.btnTogglePracticeExp.addEventListener('click', () => {
        elements.practiceExplanation.classList.toggle('show');
      });
    }

    // 交卷按鈕
    elements.btnSubmitExam.addEventListener('click', promptSubmitExam);

    // 結果頁按鈕
    elements.btnRetakeExam.addEventListener('click', () => {
      startExam(state.examMode);
    });

    elements.btnBackHome.addEventListener('click', () => {
      switchView('setup');
    });

    // 結果篩選 Tab
    elements.filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        elements.filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.resultFilter = tab.getAttribute('data-filter');
        renderReviewList();
      });
    });

    // 考生身分登入事件
    if (elements.userProfileBtn) {
      elements.userProfileBtn.addEventListener('click', () => {
        openLoginModal();
      });
    }
    if (elements.loginModalCloseBtn) {
      elements.loginModalCloseBtn.addEventListener('click', closeLoginModal);
    }
    if (elements.loginModal) {
      elements.loginModal.addEventListener('click', (e) => {
        if (e.target === elements.loginModal) closeLoginModal();
      });
    }
    if (elements.loginForm) {
      elements.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLoginSubmit();
      });
    }
    if (elements.btnSubmitLogin) {
      elements.btnSubmitLogin.addEventListener('click', (e) => {
        e.preventDefault();
        handleLoginSubmit();
      });
    }

    // 清除歷史
    if (elements.scopeSelect) {
      elements.scopeSelect.addEventListener('change', updateScopeDescription);
    }
    elements.btnClearHistory.addEventListener('click', () => {
      if (confirm('確定要清除所有歷史成績與錯題紀錄嗎？此動作無法復原。')) {
        state.examHistory = [];
        state.wrongQuestionIds.clear();
        persistHistory();
        renderHistoryTable();
        updateWrongCountDisplay();
      }
    });

    // 匯出資料
    elements.btnExportData.addEventListener('click', exportDataAsJson);

    // 匯入資料
    elements.importFileInput.addEventListener('change', importDataFromJson);

    // 瀏覽全題庫與詳解導航按鈕
    if (elements.browseAllBtn) {
      elements.browseAllBtn.addEventListener('click', () => {
        switchView('browse');
      });
    }
    if (elements.btnHomeBrowse) {
      elements.btnHomeBrowse.addEventListener('click', () => {
        switchView('browse');
      });
    }
    if (elements.btnBrowseBackHome) {
      elements.btnBrowseBackHome.addEventListener('click', () => {
        switchView('setup');
      });
    }

    // 瀏覽篩選器與搜尋
    if (elements.browseYearFilter) {
      elements.browseYearFilter.addEventListener('change', renderBrowseQuestions);
    }
    if (elements.browseSubjectFilter) {
      elements.browseSubjectFilter.addEventListener('change', renderBrowseQuestions);
    }
    if (elements.browseCategoryFilter) {
      elements.browseCategoryFilter.addEventListener('change', renderBrowseQuestions);
    }
    if (elements.browseScopeFilter) {
      elements.browseScopeFilter.addEventListener('change', renderBrowseQuestions);
    }
    if (elements.browseSearchInput) {
      elements.browseSearchInput.addEventListener('input', renderBrowseQuestions);
    }
  }

  // ==========================================
  // 考試啟動與準備 (Start Exam)
  // ==========================================
    function updateScopeDescription() {
    if (!elements.scopeDescBox || !elements.scopeSelect) return;
    const val = elements.scopeSelect.value;
    const descMap = {
      all: '💡 <strong>統測全範圍總複習：</strong>收錄 109~114 年六大年度所有專業科目單元，共 300 題（專一 150 題 + 專二 150 題），完整涵蓋電路圖、程式碼與詳細解析！',
      year_114: '💡 <strong>114 年度試卷：</strong>包含最新年度 50 題全卷模擬與衝刺試題（專一 25 題 + 專二 25 題）。',
      year_113: '💡 <strong>113 年度試卷：</strong>包含 113 年度統測與各次模考精選 50 題（專一 25 題 + 專二 25 題）。',
      year_112: '💡 <strong>112 年度試卷：</strong>包含 112 年度統測與各次模考精選 50 題（專一 25 題 + 專二 25 題）。',
      year_111: '💡 <strong>111 年度試卷：</strong>包含 111 年度統測與各次模考精選 50 題（專一 25 題 + 專二 25 題）。',
      year_110: '💡 <strong>110 年度試卷：</strong>包含 110 年度統測真題與模擬考全卷 50 題（專一 25 題 + 專二 25 題）。',
      year_109: '💡 <strong>109 年度試卷：</strong>包含 109 年度統測真題與精選全卷 50 題（專一 25 題 + 專二 25 題）。',
      mock1: '💡 <strong>第一次模考進度：</strong>涵蓋基電 1~4章、電子 1~4章、微處 1~3章、數邏 1~4章、程式 1~4章，共 95 題（專一 41 題 + 專二 54 題）。',
      mock2: '💡 <strong>第二次模考進度（累計涵蓋第 1 次＋第 2 次）：</strong>涵蓋基電 1~7章、電子 1~7章、微處 1~6章、數邏 1~6章、程式 1~7章，題庫共 173 題（含第 1 次 95 題 ＋ 第 2 次新增 78 題，練習與考試均會包含第 1 次題目）。',
      mock3: '💡 <strong>第三次模考進度（累計涵蓋第 1~3 次）：</strong>涵蓋基電 1~10章、電子 1~10章、微處 1~7章、數邏 1~7章、程式 1~8章，題庫共 249 題。',
      mock4: '💡 <strong>第四、五次模考 / 統測總複習：</strong>各考科全部單元完整範圍，題庫共 300 題。',
      past_exam: '💡 <strong>歷屆統測真題精選：</strong>歷年統測經典命題與代表性考題精華。'
    };
    elements.scopeDescBox.innerHTML = descMap[val] || descMap.all;
  }

function startExam(modeOverride) {
    if (!window.QUESTION_BANK || window.QUESTION_BANK.length === 0) {
      alert('題庫尚未載入完成，請確認 questions.js 是否存在！');
      return;
    }

    // 檢查是否已填寫考生姓名，若尚未登記則引導登入
    if (!state.currentUser || !state.currentUser.name) {
      openLoginModal(() => {
        startExam(modeOverride);
      });
      return;
    }

    state.examMode = modeOverride || elements.modeSelect.value;
    state.selectedScope = elements.scopeSelect ? elements.scopeSelect.value : 'all';
    state.questionCountLimit = elements.countSelect.value;
    state.timeLimitMinutes = parseInt(elements.timeSelect.value, 10);
    
    let candidateQuestions = [];

    if (state.examMode === 'wrong_review') {
      // 錯題重練模式：挑選錯題庫中的題目
      const allQ = window.getQuestionsForExam ? window.getQuestionsForExam('all', 'all') : (window.QUESTION_BANK || []);
      candidateQuestions = allQ.filter(q => state.wrongQuestionIds.has(q.id));
      if (candidateQuestions.length === 0) {
        alert('錯題庫中目前沒有相應題目！');
        return;
      }
    } else {
      // 依選定科目與模擬考次別篩選出題 (包含動態好算數字生成)
      if (typeof window.getQuestionsForExam === 'function') {
        candidateQuestions = window.getQuestionsForExam(state.selectedSubject, state.selectedScope);
      } else {
        candidateQuestions = (window.QUESTION_BANK || []).filter(q => q.subject === state.selectedSubject);
      }
    }

    if (candidateQuestions.length === 0) {
      alert('該範圍目前沒有符合條件的題庫！請嘗試選擇「統測全範圍」或其他科目。');
      return;
    }

    // 計算抽題數量
    let count = candidateQuestions.length;
    if (state.questionCountLimit !== 'all') {
      count = Math.min(parseInt(state.questionCountLimit, 10), candidateQuestions.length);
    }

    // 智能多樣性抽題（防止同次測試概念題目重複、跨次歷次優先抽新題）
    state.currentQuestions = selectDiverseQuestions(candidateQuestions, count);

    // 記錄本次測驗題目至 Session 歷次題庫池，避免連續測驗重複出題
    addSessionTestedIds(state.currentQuestions.map(q => q.id));

    // 重設狀態
    state.currentIndex = 0;
    state.answers = {};
    state.flagged = {};
    state.examStartTime = new Date();

    // 設定計時器
    clearInterval(state.timerInterval);
    if (state.examMode === 'practice') {
      // 刷題模式不限時，顯示正計時
      state.timeRemaining = 0;
      elements.examTimerBox.classList.remove('warning');
      elements.examTimerText.textContent = '00:00';
      state.timerInterval = setInterval(() => {
        state.timeRemaining++;
        elements.examTimerText.textContent = formatTime(state.timeRemaining);
      }, 1000);
      elements.btnTogglePracticeExp.style.display = 'inline-flex';
    } else {
      // 模擬考/正式考：倒數計時
      state.timeRemaining = state.timeLimitMinutes * 60;
      elements.btnTogglePracticeExp.style.display = 'none';
      elements.practiceExplanation.classList.remove('show');
      updateTimerDisplay();

      state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        updateTimerDisplay();

        if (state.timeRemaining <= 0) {
          clearInterval(state.timerInterval);
          alert('測驗時間到！系統已自動為您交卷結算成績。');
          finishExam();
        }
      }, 1000);
    }

    // 更新介面題頭資訊 (包含模考次別標籤)
    let scopeLabel = '統測全範圍';
    if (elements.scopeSelect && elements.scopeSelect.selectedIndex >= 0) {
      scopeLabel = elements.scopeSelect.options[elements.scopeSelect.selectedIndex].text.split('(')[0].trim().replace(/^[^\s]+\s*/, '');
    }

    let subjectTitleText = '高職資訊科 專業科目測驗';
    if (state.examMode === 'wrong_review') {
      subjectTitleText = '歷史錯題專攻複習';
    } else if (state.selectedSubject === 'subject1') {
      subjectTitleText = `專業科目(一) · ${scopeLabel}`;
    } else if (state.selectedSubject === 'subject2') {
      subjectTitleText = `專業科目(二) · ${scopeLabel}`;
    }

    elements.examSubjectTitle.textContent = subjectTitleText;
    elements.examModeBadge.textContent = state.examMode === 'practice' ? '刷題模式' : '模擬考模式';

    const candidateStr = state.currentUser && state.currentUser.name
      ? state.currentUser.name + (state.currentUser.studentId ? ` (${state.currentUser.studentId})` : '')
      : '訪客';
    if (elements.examCandidateName) {
      elements.examCandidateName.textContent = candidateStr;
    }

    // 渲染答題卡與第一題
    renderSheetGrid();
    renderCurrentQuestion();

    // 切換到考試面板
    switchView('exam');
  }

  // 時間格式轉換 (秒數 -> mm:ss 或 hh:mm:ss)
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // 更新計時器顯示
  function updateTimerDisplay() {
    elements.examTimerText.textContent = formatTime(state.timeRemaining);
    if (state.timeRemaining <= 300) { // 剩餘 5 分鐘警示
      elements.examTimerBox.classList.add('warning');
    } else {
      elements.examTimerBox.classList.remove('warning');
    }
  }

  // ==========================================
  // 題目渲染與作答互動 (Question Rendering)
  // ==========================================
  function renderCurrentQuestion() {
    const q = state.currentQuestions[state.currentIndex];
    if (!q) return;

    elements.qIndexNum.textContent = state.currentIndex + 1;
    elements.qTotalNum.textContent = state.currentQuestions.length;
    elements.qCategoryTag.textContent = q.category;

    // 題幹文字與程式碼處理 (若有附圖則一併渲染電路圖或邏輯圖)
    let contentHtml = formatContentWithCode(q.question);
    if (q.diagramSvg || q.diagramHtml) {
      contentHtml += `<div class="question-diagram-wrapper">${q.diagramSvg || q.diagramHtml}</div>`;
    }
    elements.questionText.innerHTML = contentHtml;

    // 標記複核按鈕狀態
    updateFlagButtonState();

    // 選項渲染
    elements.optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((optText, optIndex) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      if (state.answers[state.currentIndex] === optIndex) {
        btn.classList.add('selected');
      }

      btn.innerHTML = `
        <span class="option-letter">${letters[optIndex]}</span>
        <span class="option-text">${escapeHtml(optText)}</span>
      `;

      btn.addEventListener('click', () => {
        selectOption(optIndex);
      });

      elements.optionsContainer.appendChild(btn);
    });

    // 刷題練習模式即時詳解更新
    if (state.examMode === 'practice') {
      elements.practiceExplanationContent.innerHTML = formatContentWithCode(q.explanation);
      // 如果還沒作答過，預設隱藏，若使用者主動打開過則保留
      if (state.answers[state.currentIndex] !== undefined) {
        elements.practiceExplanation.classList.add('show');
      } else {
        elements.practiceExplanation.classList.remove('show');
      }
    } else {
      elements.practiceExplanation.classList.remove('show');
    }

    // 導航按鈕狀態
    elements.btnPrevQuestion.disabled = state.currentIndex === 0;
    elements.btnNextQuestion.disabled = state.currentIndex === state.currentQuestions.length - 1;

    // 更新答題卡高亮
    renderSheetGrid();
  }

  // 選取選項
  function selectOption(optionIndex) {
    state.answers[state.currentIndex] = optionIndex;
    
    // 更新選項 UI 高亮
    const optionBtns = elements.optionsContainer.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, idx) => {
      if (idx === optionIndex) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // 刷題模式下自動展開詳解
    if (state.examMode === 'practice') {
      elements.practiceExplanation.classList.add('show');
    }

    renderSheetGrid();
  }

  // 更新標記按鈕樣式
  function updateFlagButtonState() {
    if (state.flagged[state.currentIndex]) {
      elements.btnFlagQuestion.classList.add('active');
      elements.btnFlagQuestion.innerHTML = '★ 已標記複核';
    } else {
      elements.btnFlagQuestion.classList.remove('active');
      elements.btnFlagQuestion.innerHTML = '☆ 標記複核';
    }
  }

  // 渲染答題卡九宮格
  function renderSheetGrid() {
    elements.sheetGrid.innerHTML = '';
    let answeredCount = 0;

    state.currentQuestions.forEach((_, idx) => {
      const isAnswered = state.answers[idx] !== undefined;
      if (isAnswered) answeredCount++;

      const numBtn = document.createElement('button');
      numBtn.className = 'sheet-num-btn';
      numBtn.textContent = idx + 1;

      if (idx === state.currentIndex) {
        numBtn.classList.add('current');
      }
      if (isAnswered) {
        numBtn.classList.add('answered');
      }
      if (state.flagged[idx]) {
        numBtn.classList.add('flagged');
      }

      numBtn.addEventListener('click', () => {
        state.currentIndex = idx;
        renderCurrentQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      elements.sheetGrid.appendChild(numBtn);
    });

    elements.answeredCountText.textContent = answeredCount;
    elements.totalCountText.textContent = state.currentQuestions.length;
  }

  // 交卷確認提示
  function promptSubmitExam() {
    const answeredCount = Object.keys(state.answers).length;
    const totalCount = state.currentQuestions.length;
    const unansweredCount = totalCount - answeredCount;

    let confirmMsg = `您已作答 ${answeredCount} / ${totalCount} 題。\n`;
    if (unansweredCount > 0) {
      confirmMsg += `⚠️ 尚有 ${unansweredCount} 題未作答！\n`;
    }
    confirmMsg += `確定現在要交卷並查看成績與詳細解析嗎？`;

    if (confirm(confirmMsg)) {
      clearInterval(state.timerInterval);
      finishExam();
    }
  }

  // ==========================================
  // 交卷結算與成績詳解 (Finish Exam & Results)
  // ==========================================
  function finishExam() {
    clearInterval(state.timerInterval);

    const totalQuestions = state.currentQuestions.length;
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const categoryStats = {}; // { [catName]: { total: 0, correct: 0 } }

    state.currentQuestions.forEach((q, idx) => {
      const userChoice = state.answers[idx];
      const isCorrect = userChoice === q.answer;

      // 分類統計
      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0 };
      }
      categoryStats[q.category].total++;

      if (userChoice === undefined) {
        unansweredCount++;
        wrongCount++;
        state.wrongQuestionIds.add(q.id); // 未作答視為錯題加入複習
      } else if (isCorrect) {
        correctCount++;
        categoryStats[q.category].correct++;
        // 若以前錯過，答對後可從錯題庫移除
        state.wrongQuestionIds.delete(q.id);
      } else {
        wrongCount++;
        state.wrongQuestionIds.add(q.id); // 加入錯題庫
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const accuracyRate = Math.round((correctCount / totalQuestions) * 100);

    const timeSpentSeconds = state.examMode === 'practice'
      ? state.timeRemaining
      : (state.timeLimitMinutes * 60) - state.timeRemaining;

    // 考生身分字串
    const candidateStr = state.currentUser && state.currentUser.name
      ? state.currentUser.name + (state.currentUser.studentId ? ` (${state.currentUser.studentId})` : '')
      : '訪客';

    // 建立歷史紀錄物件
    const record = {
      id: 'rec_' + Date.now(),
      studentName: state.currentUser && state.currentUser.name ? state.currentUser.name : '訪客',
      studentId: state.currentUser && state.currentUser.studentId ? state.currentUser.studentId : '',
      candidateLabel: candidateStr,
      date: new Date().toLocaleString('zh-TW', { hour12: false }),
      subjectName: getSubjectLabel(state.selectedSubject, state.examMode, state.selectedScope),
      score: score,
      correct: correctCount,
      total: totalQuestions,
      accuracy: accuracyRate,
      timeSpent: formatTime(timeSpentSeconds)
    };

    state.examHistory.unshift(record);
    persistHistory();

    // 渲染成績資訊
    if (elements.resultCandidateName) elements.resultCandidateName.textContent = candidateStr;
    if (elements.resultTimestamp) elements.resultTimestamp.textContent = record.date;
    elements.scoreNumber.textContent = score;
    elements.statCorrect.textContent = correctCount;
    elements.statWrong.textContent = wrongCount;
    elements.statRate.textContent = `${accuracyRate}%`;
    elements.statTime.textContent = formatTime(timeSpentSeconds);

    // 等第標籤
    let gradeText = '表現優異，實力堅強！';
    let gradeClass = 'grade-excellent';
    if (score >= 90) {
      gradeText = '精熟（90分以上）：統測高分圈！';
      gradeClass = 'grade-excellent';
    } else if (score >= 75) {
      gradeText = '良好（75-89分）：掌握核心觀念，繼續保持！';
      gradeClass = 'grade-good';
    } else if (score >= 60) {
      gradeText = '及格（60-74分）：基礎尚穩，建議針對弱點科目加強。';
      gradeClass = 'grade-fair';
    } else {
      gradeText = '待加強（未滿60分）：建議細讀各題詳解，並使用錯題本重練！';
      gradeClass = 'grade-poor';
    }
    elements.gradeBadge.textContent = gradeText;
    elements.gradeBadge.className = `grade-badge ${gradeClass}`;

    // 渲染分項雷達統計
    renderCategoryBreakdown(categoryStats);

    // 預設篩選「全部」
    state.resultFilter = 'all';
    elements.filterTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-filter') === 'all');
    });

    // 渲染詳細解析清單
    renderReviewList();

    // 切換至結果視圖
    switchView('result');
  }

  // 渲染考科細項掌握度
  function renderCategoryBreakdown(stats) {
    elements.categoryBreakdown.innerHTML = '';
    for (const [catName, data] of Object.entries(stats)) {
      const pct = Math.round((data.correct / data.total) * 100);
      const div = document.createElement('div');
      div.className = 'stat-item';
      div.innerHTML = `
        <div class="stat-val ${pct >= 70 ? 'correct' : 'wrong'}">${data.correct}/${data.total}</div>
        <div class="stat-lbl">${escapeHtml(catName)} (${pct}%)</div>
      `;
      elements.categoryBreakdown.appendChild(div);
    }
  }

  // 渲染詳解題目列表
  function renderReviewList() {
    elements.reviewList.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    state.currentQuestions.forEach((q, idx) => {
      const userChoice = state.answers[idx];
      const isCorrect = userChoice === q.answer;

      // 篩選過濾
      if (state.resultFilter === 'wrong' && isCorrect) return;
      if (state.resultFilter === 'correct' && !isCorrect) return;

      const itemDiv = document.createElement('div');
      itemDiv.className = `review-item ${isCorrect ? 'is-correct' : 'is-wrong'}`;

      // 狀態標籤
      let statusHtml = '';
      if (userChoice === undefined) {
        statusHtml = `<span class="status-tag wrong">未作答</span>`;
      } else if (isCorrect) {
        statusHtml = `<span class="status-tag correct">✓ 答對</span>`;
      } else {
        statusHtml = `<span class="status-tag wrong">✕ 答錯</span>`;
      }

      // 選項清單
      let optionsHtml = '';
      q.options.forEach((optText, optIdx) => {
        let optClass = 'review-opt';
        let badge = '';

        if (optIdx === q.answer && optIdx === userChoice) {
          optClass += ' is-user-correct';
          badge = ' (您的答案 / 正確答案)';
        } else if (optIdx === q.answer) {
          optClass += ' is-correct-answer';
          badge = ' (正確答案)';
        } else if (optIdx === userChoice) {
          optClass += ' is-user-choice';
          badge = ' (您的選擇)';
        }

        optionsHtml += `
          <div class="${optClass}">
            <strong>${letters[optIdx]}.</strong>
            <span>${escapeHtml(optText)}${badge}</span>
          </div>
        `;
      });

      let reviewContentHtml = formatContentWithCode(q.question);
      if (q.diagramSvg || q.diagramHtml) {
        reviewContentHtml += `<div class="question-diagram-wrapper">${q.diagramSvg || q.diagramHtml}</div>`;
      }

      itemDiv.innerHTML = `
        <div class="review-header">
          <div class="question-meta">
            <span class="q-num">第 ${idx + 1} 題</span>
            <span class="q-cat">${escapeHtml(q.category)}</span>
          </div>
          ${statusHtml}
        </div>
        <div class="review-question">${reviewContentHtml}</div>
        <div class="review-options">${optionsHtml}</div>
        <div class="explanation-box">
          <div class="explanation-title">💡 詳細解析與核心考點：</div>
          <div class="explanation-body">${formatContentWithCode(q.explanation)}</div>
        </div>
      `;

      elements.reviewList.appendChild(itemDiv);
    });

    if (elements.reviewList.children.length === 0) {
      elements.reviewList.innerHTML = `<div style="text-align:center; padding: 2rem; color: var(--text-muted);">此篩選條件下沒有題目。</div>`;
    }
  }

  // ==========================================
  // 全題庫與詳細解析瀏覽模式 (Browse All Mode)
  // ==========================================
  const browseInstancesCache = new Map();

  function getBrowseInstance(rawQ) {
    if (rawQ.isDynamic && typeof rawQ.generate === 'function') {
      if (!browseInstancesCache.has(rawQ.id)) {
        browseInstancesCache.set(rawQ.id, rawQ.generate());
      }
      return browseInstancesCache.get(rawQ.id);
    }
    return {
      question: (rawQ.source ? `${rawQ.source} ` : '') + rawQ.question,
      options: rawQ.options,
      answer: rawQ.answer,
      explanation: rawQ.explanation,
      diagramSvg: rawQ.diagramSvg || null,
      diagramHtml: rawQ.diagramHtml || null
    };
  }

  function rerollBrowseQuestion(qId) {
    const rawBank = window.RAW_QUESTION_BANK || [];
    const rawQ = rawBank.find(q => q.id === qId);
    if (rawQ && rawQ.isDynamic && typeof rawQ.generate === 'function') {
      browseInstancesCache.set(rawQ.id, rawQ.generate());
      renderBrowseQuestions();
    }
  }

  function getScopeLabelText(scopeKey) {
    const map = {
      mock1: '第1次模考',
      mock2: '第2次模考',
      mock3: '第3次模考',
      mock4: '第4次模考',
      past_exam: '歷屆統測真題'
    };
    return map[scopeKey] || '統測範圍';
  }

  function renderBrowseQuestions() {
    if (!elements.browseQuestionsContainer) return;

    const rawBank = window.RAW_QUESTION_BANK || [];
    const filterYear = elements.browseYearFilter ? elements.browseYearFilter.value : 'all';
    const filterSubject = elements.browseSubjectFilter ? elements.browseSubjectFilter.value : 'all';
    const filterCategory = elements.browseCategoryFilter ? elements.browseCategoryFilter.value : 'all';
    const filterScope = elements.browseScopeFilter ? elements.browseScopeFilter.value : 'all';
    const searchQuery = elements.browseSearchInput ? elements.browseSearchInput.value.trim().toLowerCase() : '';

    const letters = ['A', 'B', 'C', 'D'];

    // 篩選題目
    const matched = rawBank.filter(rawQ => {
      // 年度過濾
      if (filterYear !== 'all' && rawQ.year !== filterYear) {
        return false;
      }
      // 科目過濾
      if (filterSubject !== 'all' && rawQ.subject !== filterSubject) {
        return false;
      }
      // 單元過濾
      if (filterCategory !== 'all' && rawQ.category !== filterCategory) {
        return false;
      }
      // 範圍過濾
      if (filterScope !== 'all') {
        if (filterScope === 'past_exam') {
          if (rawQ.scope !== 'past_exam' && (!rawQ.source || !rawQ.source.includes('統測'))) return false;
        } else if (filterScope.endsWith('_only')) {
          const baseScope = filterScope.replace('_only', '');
          if (rawQ.scope !== baseScope) return false;
        } else {
          const scopeOrder = { mock1: 1, mock2: 2, mock3: 3, mock4: 4, past_exam: 5 };
          const targetLevel = scopeOrder[filterScope] || 4;
          const qLevel = scopeOrder[rawQ.scope] || 1;
          if (qLevel > targetLevel) return false;
        }
      }

      // 關鍵字搜尋
      if (searchQuery) {
        const inst = getBrowseInstance(rawQ);
        const searchPool = [
          rawQ.id,
          rawQ.category,
          rawQ.source || '',
          inst.question,
          inst.explanation,
          ...(inst.options || [])
        ].join(' ').toLowerCase();

        if (!searchPool.includes(searchQuery)) {
          return false;
        }
      }

      return true;
    });

    if (elements.browseTotalCount) {
      elements.browseTotalCount.textContent = matched.length;
    }

    elements.browseQuestionsContainer.innerHTML = '';

    if (matched.length === 0) {
      elements.browseQuestionsContainer.innerHTML = `
        <div style="text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-color); color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-primary);">查無符合條件的題目與詳解</h4>
          <p>請嘗試放寬科目、單元或範圍篩選，或嘗試不同的關鍵字（例如：「OPA」、「戴維寧」、「指標」等）。</p>
        </div>
      `;
      return;
    }

    // 依序渲染題目卡片
    matched.forEach((rawQ, index) => {
      const inst = getBrowseInstance(rawQ);
      const card = document.createElement('div');
      card.className = 'browse-item-card';

      const subjectBadgeText = rawQ.subject === 'subject1' ? '專一' : '專二';
      const scopeBadgeText = getScopeLabelText(rawQ.scope);
      const yearBadgeHtml = rawQ.year ? `<span class="status-tag" style="background: var(--bg-elevated); color: var(--text-primary); font-size: 0.75rem; font-weight: 700; border: 1px solid var(--border-color);">${rawQ.year} 年度</span>` : '';
      const sourceBadgeHtml = rawQ.source ? `<span style="font-size: 0.75rem; background: var(--bg-elevated); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid var(--border-color);">${escapeHtml(rawQ.source)}</span>` : '';

      // 題幹文字與電路/邏輯圖
      let questionHtml = formatContentWithCode(inst.question);
      if (inst.diagramSvg || inst.diagramHtml) {
        questionHtml += `<div class="question-diagram-wrapper">${inst.diagramSvg || inst.diagramHtml}</div>`;
      }

      // 選項列表 (清晰標註正確答案)
      let optionsHtml = '<div class="review-options" style="margin-top: 1.25rem;">';
      inst.options.forEach((optText, optIdx) => {
        const isCorrect = optIdx === inst.answer;
        const optClass = isCorrect ? 'review-opt is-correct-answer' : 'review-opt';
        const badge = isCorrect ? ' <strong style="color: var(--success); font-weight: 700;">(✓ 正確答案)</strong>' : '';

        optionsHtml += `
          <div class="${optClass}">
            <strong style="margin-right: 0.35rem;">${letters[optIdx]}.</strong>
            <span>${escapeHtml(optText)}${badge}</span>
          </div>
        `;
      });
      optionsHtml += '</div>';

      // 隨機題換數字按鈕
      let rerollBtnHtml = '';
      if (rawQ.isDynamic) {
        rerollBtnHtml = `
          <button class="btn-clean-number-reroll" data-qid="${rawQ.id}" title="點擊切換一組漂亮好算的數值與對應推導步驟">
            🎲 換組好算數字
          </button>
        `;
      }

      // 詳細解析區塊
      const explanationHtml = `
        <div class="explanation-box" style="margin-top: 1.25rem;">
          <div class="explanation-title" style="color: var(--primary); font-weight: 700; display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.6rem;">
            <span>💡</span>
            <span>【題目詳解與破題關鍵】：</span>
          </div>
          <div class="explanation-body" style="color: var(--text-primary); line-height: 1.7;">
            ${formatContentWithCode(inst.explanation)}
          </div>
        </div>
      `;

      card.innerHTML = `
        <div class="review-header" style="flex-wrap: wrap; gap: 0.6rem; align-items: flex-start;">
          <div class="question-meta" style="flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <span class="q-num">#${index + 1}</span>
            ${yearBadgeHtml}
            <span class="exam-badge" style="font-size: 0.78rem;">${subjectBadgeText}</span>
            <span class="q-cat">${escapeHtml(rawQ.category)}</span>
            <span class="status-tag" style="background: var(--primary-light); color: var(--primary); font-size: 0.75rem;">${scopeBadgeText}</span>
            ${sourceBadgeHtml}
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            ${rerollBtnHtml}
          </div>
        </div>

        <div class="review-question" style="font-size: 1.02rem; line-height: 1.6; margin-top: 0.75rem;">
          ${questionHtml}
        </div>

        ${optionsHtml}
        ${explanationHtml}
      `;

      // 綁定動態換數字事件
      if (rawQ.isDynamic) {
        const rerollBtn = card.querySelector('.btn-clean-number-reroll');
        if (rerollBtn) {
          rerollBtn.addEventListener('click', () => {
            rerollBrowseQuestion(rawQ.id);
          });
        }
      }

      elements.browseQuestionsContainer.appendChild(card);
    });
  }

  // ==========================================
  // 歷史成績管理 (History Modal & Operations)
  // ==========================================
  function openHistoryModal() {
    renderHistoryTable();
    elements.historyModal.classList.add('active');
  }

  function closeHistoryModal() {
    elements.historyModal.classList.remove('active');
  }

  function renderHistoryTable() {
    if (state.examHistory.length === 0) {
      elements.historyEmptyState.style.display = 'block';
      elements.historyTableBody.parentElement.style.display = 'none';
      return;
    }

    elements.historyEmptyState.style.display = 'none';
    elements.historyTableBody.parentElement.style.display = 'table';
    elements.historyTableBody.innerHTML = '';

    state.examHistory.forEach((rec, idx) => {
      const tr = document.createElement('tr');
      const scoreColor = rec.score >= 80 ? 'var(--success)' : (rec.score >= 60 ? 'var(--primary)' : 'var(--danger)');
      const candidate = rec.candidateLabel || rec.studentName || '訪客';
      tr.innerHTML = `
        <td>${rec.date}</td>
        <td><strong>${escapeHtml(candidate)}</strong></td>
        <td><strong>${escapeHtml(rec.subjectName)}</strong></td>
        <td><strong style="color: ${scoreColor}; font-size: 1.1rem;">${rec.score}</strong> 分</td>
        <td>${rec.correct} / ${rec.total} (${rec.accuracy}%)</td>
        <td>${rec.timeSpent}</td>
      `;
      elements.historyTableBody.appendChild(tr);
    });
  }

  // 匯出資料為 JSON 檔案
  function exportDataAsJson() {
    const backupData = {
      exportDate: new Date().toISOString(),
      version: '1.1',
      currentUser: state.currentUser,
      examHistory: state.examHistory,
      wrongQuestionIds: Array.from(state.wrongQuestionIds)
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `統測高職資訊科測驗紀錄_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // 匯入 JSON 資料
  function importDataFromJson(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.currentUser && imported.currentUser.name) {
          state.currentUser = imported.currentUser;
          try {
            localStorage.setItem('vcs_current_user', JSON.stringify(state.currentUser));
          } catch (e) {}
          updateUserDisplay();
        }
        if (Array.isArray(imported.examHistory)) {
          state.examHistory = imported.examHistory;
        }
        if (Array.isArray(imported.wrongQuestionIds)) {
          state.wrongQuestionIds = new Set(imported.wrongQuestionIds);
        }
        persistHistory();
        renderHistoryTable();
        updateWrongCountDisplay();
        alert('紀錄匯入成功！');
      } catch (err) {
        alert('匯入失敗，請確認檔案格式是否正確。');
        console.error(err);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // 重設 input
  }

  // ==========================================
  // 輔助工具函式 (Utility Functions)
  // ==========================================
  // 取得題目概念簽章 (Topic Signature)，用於同次測驗概念去重
  function getQuestionTopicSignature(q) {
    const text = ((q.category || '') + ' ' + (q.question || '')).toLowerCase();
    if (/重疊定理/.test(text)) return 'circuit_superposition';
    if (/戴維寧/.test(text)) return 'circuit_thevenin';
    if (/諾頓/.test(text)) return 'circuit_norton';
    if (/節點電壓/.test(text)) return 'circuit_node_voltage';
    if (/迴路電流|網目/.test(text)) return 'circuit_mesh_current';
    if (/最大功率/.test(text)) return 'circuit_max_power';
    if (/惠斯登|電橋/.test(text)) return 'circuit_bridge';
    if (/串聯諧振/.test(text)) return 'ac_series_resonance';
    if (/並聯諧振/.test(text)) return 'ac_parallel_resonance';
    if (/兩瓦特|三相/.test(text)) return 'ac_three_phase';
    if (/時間常數|暫態|充放電/.test(text)) return 'circuit_transient';
    if (/濾波器|截止頻率/.test(text)) return 'filter_frequency';
    if (/非反相放大/.test(text)) return 'opa_non_inverting';
    if (/反相加法/.test(text)) return 'opa_summing';
    if (/差動放大|減法/.test(text)) return 'opa_diff';
    if (/反相放大/.test(text)) return 'opa_inverting';
    if (/史密特|比較器|磁滯/.test(text)) return 'opa_schmitt';
    if (/電壓隨耦|電壓追隨/.test(text)) return 'opa_follower';
    if (/齊納|穩壓二極體/.test(text)) return 'diode_zener';
    if (/整流|截波|箝位/.test(text)) return 'diode_application';
    if (/bjt|電晶體|工作區|共射極|共基極/.test(text)) return 'transistor_bjt';
    if (/fet|mosfet|汲極|夾止/.test(text)) return 'transistor_fet';
    if (/卡諾圖/.test(text)) return 'logic_karnaugh';
    if (/布林代數|狄摩根/.test(text)) return 'logic_boolean';
    if (/正反器|正反器計數器|jk|d型/.test(text)) return 'logic_flipflop';
    if (/多工器|解多工器|編碼器|解碼器/.test(text)) return 'logic_msi';
    if (/進制轉換|補數/.test(text)) return 'logic_number_systems';
    if (/計數器|模數/.test(text)) return 'logic_counter';
    if (/strlen|strcpy|字串/.test(text)) return 'c_string';
    if (/指標|\*p|&/.test(text)) return 'c_pointer';
    if (/二維陣列|一維陣列|arr\[/.test(text)) return 'c_array';
    if (/遞迴|recursion/.test(text)) return 'c_recursion';
    if (/switch|case/.test(text)) return 'c_switch';
    if (/for|while|迴圈/.test(text)) return 'c_loop';
    if (/位元運算|>>|<<|\^|&|~/.test(text)) return 'c_bitwise';
    if (/結構體|struct/.test(text)) return 'c_struct';
    if (/div ab|mul ab|乘法|除法/.test(text)) return 'mcu_arithmetic';
    if (/tmod|tcon|計時器|定時器/.test(text)) return 'mcu_timer';
    if (/中斷|ie|ip|中斷向量/.test(text)) return 'mcu_interrupt';
    if (/scon|串列|鮑率|uart|max232/.test(text)) return 'mcu_serial';
    if (/dptr|movx|movc|定址模式/.test(text)) return 'mcu_addressing';
    if (/8051|微處理機|微控制器/.test(text)) return 'mcu_general';
    return q.category || 'general';
  }

  // 讀取當前 Session 已測題目 ID
  function getSessionTestedIds() {
    try {
      const raw = sessionStorage.getItem('vcs_session_tested_qids');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  // 記錄已測題目 ID（滑動窗口保留最近 200 題）
  function addSessionTestedIds(ids) {
    try {
      const existing = getSessionTestedIds();
      const idSet = new Set(existing);
      (ids || []).forEach(id => idSet.add(id));
      const updated = Array.from(idSet);
      if (updated.length > 200) {
        updated.splice(0, updated.length - 200);
      }
      sessionStorage.setItem('vcs_session_tested_qids', JSON.stringify(updated));
    } catch (e) {}
  }

  // 智能多樣性抽題核心演算法（同次測試概念不重複、跨次優先出新題）
  function selectDiverseQuestions(candidates, count) {
    // 1. 嚴格依題目 ID 去重，排除任何重複項
    const uniqueMap = new Map();
    (candidates || []).forEach(q => {
      if (q && q.id && !uniqueMap.has(q.id)) {
        uniqueMap.set(q.id, q);
      }
    });
    const pool = Array.from(uniqueMap.values());
    const actualCount = Math.min(count, pool.length);
    if (actualCount <= 0) return [];

    // 2. 歷次/跨次測試防重複：區分未測與已測題目
    const testedSet = new Set(getSessionTestedIds());
    const unseen = pool.filter(q => !testedSet.has(q.id));
    const seen = pool.filter(q => testedSet.has(q.id));

    let priorityPool = [];
    if (unseen.length >= actualCount) {
      priorityPool = shuffleArray([...unseen]);
    } else {
      // 若未測題目不足，未測題全取，剩餘由已測題目亂序補足
      priorityPool = shuffleArray([...unseen]).concat(shuffleArray([...seen]));
    }

    // 3. 同次測試防題型概念重複 (Topic Signature Diversity)
    const topicMap = new Map();
    priorityPool.forEach(q => {
      const topic = getQuestionTopicSignature(q);
      if (!topicMap.has(topic)) topicMap.set(topic, []);
      topicMap.get(topic).push(q);
    });

    const selected = [];
    const selectedIds = new Set();
    const topics = shuffleArray(Array.from(topicMap.keys()));

    // 第一階段：每個概念主題最多抽 1 題，確保概念完全不撞題
    for (const topic of topics) {
      if (selected.length >= actualCount) break;
      const qList = topicMap.get(topic);
      if (qList && qList.length > 0) {
        const q = qList.shift();
        selected.push(q);
        selectedIds.add(q.id);
      }
    }

    // 第二階段：若所需題數超過主題數量，從剩餘題目中補足，並保持 ID 唯一
    if (selected.length < actualCount) {
      for (const q of priorityPool) {
        if (selected.length >= actualCount) break;
        if (!selectedIds.has(q.id)) {
          selected.push(q);
          selectedIds.add(q.id);
        }
      }
    }

    // 再次洗牌，使題目順序自然分布
    return shuffleArray(selected);
  }
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function getSubjectLabel(subjectKey, mode, scope) {
    if (mode === 'wrong_review') return '歷史錯題重練';
    const subj = subjectKey === 'subject1' ? '專業科目(一)' : (subjectKey === 'subject2' ? '專業科目(二)' : '專一與專二綜合');
    const scopeNames = {
      year_114: '114年度試卷',
      year_113: '113年度試卷',
      year_112: '112年度試卷',
      year_111: '111年度試卷',
      year_110: '110年度試卷',
      year_109: '109年度試卷',
      mock1: '第1次模考',
      mock2: '第2次模考',
      mock3: '第3次模考',
      mock4: '第4次模考',
      past_exam: '歷屆統測真題',
      all: '統測全範圍'
    };
    const sc = scopeNames[scope] || '全範圍';
    return `${subj} [${sc}]`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 格式化包含 Markdown 程式碼區塊 (```c ... ```) 的文字
  function formatContentWithCode(text) {
    if (!text) return '';
    
    // 匹配 ```c 或 ``` 開頭的程式碼區塊
    const codeBlockRegex = /```(?:c|cpp|python|asm)?\n([\s\S]*?)```/g;
    let formatted = text.replace(codeBlockRegex, (match, code) => {
      return `<pre class="code-snippet"><code>${escapeHtml(code.trim())}</code></pre>`;
    });

    // 匹配行內行內代碼 `code`
    const inlineCodeRegex = /`([^`]+)`/g;
    formatted = formatted.replace(inlineCodeRegex, (match, code) => {
      return `<code style="background:var(--bg-elevated); padding: 0.15rem 0.4rem; border-radius: 4px; font-family:var(--font-mono); font-size: 0.9em; border: 1px solid var(--border-color);">${escapeHtml(code)}</code>`;
    });

    // 換行轉成 <br> (若非在 pre 中)
    // 簡單將純換行替換為 <br>
    return formatted.replace(/\n/g, '<br>');
  }

  // 網頁加載完成後啟動
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
