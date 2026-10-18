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

    if (viewName === 'setup') {
      elements.viewSetup.classList.add('active');
      updateWrongCountDisplay();
    } else if (viewName === 'exam') {
      elements.viewExam.classList.add('active');
    } else if (viewName === 'result') {
      elements.viewResult.classList.add('active');
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
      }
    });

    elements.btnNextQuestion.addEventListener('click', () => {
      if (state.currentIndex < state.currentQuestions.length - 1) {
        state.currentIndex++;
        renderCurrentQuestion();
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
  }

  // ==========================================
  // 考試啟動與準備 (Start Exam)
  // ==========================================
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
    state.questionCountLimit = elements.countSelect.value;
    state.timeLimitMinutes = parseInt(elements.timeSelect.value, 10);
    
    let candidateQuestions = [];

    if (state.examMode === 'wrong_review') {
      // 錯題重練模式：挑選錯題庫中的題目
      candidateQuestions = window.QUESTION_BANK.filter(q => state.wrongQuestionIds.has(q.id));
      if (candidateQuestions.length === 0) {
        alert('錯題庫中目前沒有相應題目！');
        return;
      }
    } else {
      // 依選定科目篩選
      if (state.selectedSubject === 'all') {
        candidateQuestions = [...window.QUESTION_BANK];
      } else {
        candidateQuestions = window.QUESTION_BANK.filter(q => q.subject === state.selectedSubject);
      }
    }

    if (candidateQuestions.length === 0) {
      alert('該科目目前沒有題庫可測驗！');
      return;
    }

    // 隨機打散抽題
    shuffleArray(candidateQuestions);

    let count = candidateQuestions.length;
    if (state.questionCountLimit !== 'all') {
      count = Math.min(parseInt(state.questionCountLimit, 10), candidateQuestions.length);
    }
    state.currentQuestions = candidateQuestions.slice(0, count);

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

    // 更新介面題頭資訊
    let subjectTitleText = '高職資訊科 專業科目測驗';
    if (state.selectedSubject === 'subject1') subjectTitleText = '專業科目(一)：基本電學、電子學';
    else if (state.selectedSubject === 'subject2') subjectTitleText = '專業科目(二)：微處理機、數位邏輯、程式設計實習';
    else if (state.examMode === 'wrong_review') subjectTitleText = '歷史錯題專攻複習';

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

    // 題幹文字與程式碼處理
    elements.questionText.innerHTML = formatContentWithCode(q.question);

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
      subjectName: getSubjectLabel(state.selectedSubject, state.examMode),
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

      itemDiv.innerHTML = `
        <div class="review-header">
          <div class="question-meta">
            <span class="q-num">第 ${idx + 1} 題</span>
            <span class="q-cat">${escapeHtml(q.category)}</span>
          </div>
          ${statusHtml}
        </div>
        <div class="review-question">${formatContentWithCode(q.question)}</div>
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
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function getSubjectLabel(subjectKey, mode) {
    if (mode === 'wrong_review') return '歷史錯題重練';
    if (subjectKey === 'subject1') return '專業科目(一)';
    if (subjectKey === 'subject2') return '專業科目(二)';
    return '專一與專二綜合測驗';
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
