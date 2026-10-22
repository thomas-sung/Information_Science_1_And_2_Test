const { CONCEPT_NAMES } = require('./concept_dict.js');

/**
 * 產生 109~114 各年度專一新增 25 題 (YYY-s1-026 ~ YYY-s1-050)
 * 包含 12 題基本電學 (026~037) 與 13 題電子學 (038~050)
 * 6 年 × 25 = 150 題
 */
function generateS1Questions() {
  const years = ['109', '110', '111', '112', '113', '114'];
  const questions = [];

  years.forEach(year => {
    // ----------------------------------------------------
    // 基本電學 (026 ~ 037，共 12 題)
    // ----------------------------------------------------
    
    // 026: 庫侖定律 (mock1)
    questions.push({
      id: `${year}-s1-026`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock1',
      concept: 'ee_coulomb_law',
      conceptName: CONCEPT_NAMES.ee_coulomb_law,
      source: `【${year} 統測真題】`,
      question: `在真空中兩靜止點電荷 $Q_1 = +4\\,\\mu\\text{C}$ 與 $Q_2 = -9\\,\\mu\\text{C}$ 相距 $r = 0.3\\,\\text{m}$。已知真空庫侖常數 $k = 9 \\times 10^9\\,\\text{N}\\cdot\\text{m}^2/\\text{C}^2$，則兩電荷間之靜電力大小與性質為何？`,
      options: [
        '3.6 N，吸引力',
        '3.6 N，排斥力',
        '1.2 N，吸引力',
        '1.2 N，排斥力'
      ],
      answer: 0,
      explanation: `庫侖定律公式：$F = k \\frac{|Q_1 Q_2|}{r^2}$。<br>代入數值：$F = 9 \\times 10^9 \\times \\frac{(4 \\times 10^{-6}) \\times (9 \\times 10^{-6})}{(0.3)^2} = 9 \\times 10^9 \\times \\frac{3.6 \\times 10^{-11}}{0.09} = 3.6\\,\\text{N}$。<br>由於一正一負電荷異性相吸，故受力性質為吸引力。正確答案為 (A)。`
    });

    // 027: 電阻串聯與分壓 (mock1)
    questions.push({
      id: `${year}-s1-027`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock1',
      concept: 'ee_resistor_series',
      conceptName: CONCEPT_NAMES.ee_resistor_series,
      source: `【${year} 模擬考】`,
      question: `將三個電阻 $R_1 = 10\\,\\Omega$、$R_2 = 20\\,\\Omega$、$R_3 = 30\\,\\Omega$ 串聯後接至 $120\\,\\text{V}$ 直流理想電源。請問電阻 $R_2$ 兩端所分得之電壓 $V_2$ 為多少伏特？`,
      options: ['20 V', '40 V', '60 V', '10 V'],
      answer: 1,
      explanation: `串聯總電阻：$R_T = R_1 + R_2 + R_3 = 10 + 20 + 30 = 60\\,\\Omega$。<br>依分壓定則：$V_2 = V \\times \\frac{R_2}{R_T} = 120 \\times \\frac{20}{60} = 40\\,\\text{V}$。<br>故正確答案為 (B)。`
    });

    // 028: 節點電壓法 (mock1)
    questions.push({
      id: `${year}-s1-028`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock1',
      concept: 'ee_node_voltage',
      conceptName: CONCEPT_NAMES.ee_node_voltage,
      source: `【${year} 統測真題】`,
      question: `一節點電路中，主要節點電位為 $V_A$。該節點分別透過 $2\\,\\Omega$ 電阻接至 $12\\,\\text{V}$ 電源、透過 $4\\,\\Omega$ 電阻接至 $24\\,\\text{V}$ 電源，並透過 $4\\,\\Omega$ 電阻接地 ($0\\,\\text{V}$)。請問節點電位 $V_A$ 為何？`,
      options: ['12 V', '8 V', '16 V', '6 V'],
      answer: 0,
      explanation: `在節點 A 列出 KCL 流出電流總和為 0：<br>$\\frac{V_A - 12}{2} + \\frac{V_A - 24}{4} + \\frac{V_A - 0}{4} = 0$<br>同乘以 4：$2(V_A - 12) + (V_A - 24) + V_A = 0$<br>$4V_A - 24 - 24 = 0 \\implies 4V_A = 48 \\implies V_A = 12\\,\\text{V}$。<br>故選 (A)。`
    });

    // 029: 網目電流法 (mock1)
    questions.push({
      id: `${year}-s1-029`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock1',
      concept: 'ee_mesh_current',
      conceptName: CONCEPT_NAMES.ee_mesh_current,
      source: `【${year} 模擬考】`,
      question: `在雙網目直流電路中，網目 1 電流為 $I_1$ 順時針，網目 2 電流為 $I_2$ 順時針。若兩網目共用之路徑包含一個 $5\\,\\Omega$ 的公共電阻，且已知 $I_1 = 4\\,\\text{A}$ 向下，$I_2 = 1\\,\\text{A}$ 向上。請問該 $5\\,\\Omega$ 電阻上向下流動的實際淨電流為何？`,
      options: ['3 A', '5 A', '1 A', '4 A'],
      answer: 0,
      explanation: `共用支路之淨電流等於各網目電流在該支路方向之代數和：<br>向下淨電流 $I = I_1 - I_2 = 4\\,\\text{A} - 1\\,\\text{A} = 3\\,\\text{A}$。<br>故正確答案為 (A)。`
    });

    // 030: Δ-Y 轉換 (mock1)
    questions.push({
      id: `${year}-s1-030`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock1',
      concept: 'ee_delta_wye',
      conceptName: CONCEPT_NAMES.ee_delta_wye,
      source: `【${year} 統測真題】`,
      question: `有一三相對稱 Δ 型（三角形）電阻網路，三邊電阻值皆相等為 $R_\\Delta = 36\\,\\Omega$。若欲等效轉換為 Y 型（星形）電阻網路，則轉換後之各分支電阻值 $R_Y$ 應為多少？`,
      options: ['12 Ω', '108 Ω', '18 Ω', '36 Ω'],
      answer: 0,
      explanation: `對稱電阻網路轉換公式：$R_Y = \\frac{R_\\Delta}{3}$。<br>$R_Y = \\frac{36}{3} = 12\\,\\Omega$。<br>故正確答案為 (A)。`
    });

    // 031: 電容器儲能 (mock2)
    questions.push({
      id: `${year}-s1-031`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock2',
      concept: 'ee_capacitor_energy',
      conceptName: CONCEPT_NAMES.ee_capacitor_energy,
      source: `【${year} 模擬考】`,
      question: `一電容量 $C = 200\\,\\mu\\text{F}$ 的電容器，兩端跨接 $50\\,\\text{V}$ 的直流電壓充滿電。請問該電容器內部電場儲存的靜電能量為何？`,
      options: ['0.25 J', '0.5 J', '0.05 J', '0.1 J'],
      answer: 0,
      explanation: `電容儲能公式：$W_C = \\frac{1}{2} C V^2$。<br>代入數值：$W_C = \\frac{1}{2} \\times (200 \\times 10^{-6}) \\times (50)^2 = 10^{-4} \\times 2500 = 0.25\\,\\text{J}$（焦耳）。<br>故選 (A)。`
    });

    // 032: 電感器儲能 (mock2)
    questions.push({
      id: `${year}-s1-032`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock2',
      concept: 'ee_inductor_energy',
      conceptName: CONCEPT_NAMES.ee_inductor_energy,
      source: `【${year} 統測真題】`,
      question: `一電感線圈之電感值 $L = 50\\,\\text{mH}$，當流過該線圈的直流電流為 $4\\,\\text{A}$ 時，線圈內部磁場儲存的磁能為多少？`,
      options: ['0.4 J', '0.8 J', '0.2 J', '0.1 J'],
      answer: 0,
      explanation: `電感磁能公式：$W_L = \\frac{1}{2} L I^2$。<br>代入數值：$W_L = \\frac{1}{2} \\times (50 \\times 10^{-3}) \\times (4)^2 = 25 \\times 10^{-3} \\times 16 = 0.4\\,\\text{J}$。<br>故選 (A)。`
    });

    // 033: RL 暫態電路 (mock2)
    questions.push({
      id: `${year}-s1-033`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock2',
      concept: 'ee_rl_transient',
      conceptName: CONCEPT_NAMES.ee_rl_transient,
      source: `【${year} 模擬考】`,
      question: `一 RL 串聯電路中，$R = 25\\,\\Omega$，$L = 100\\,\\text{mH}$。接至 $50\\,\\text{V}$ 直流電源接通開關後，該電路之充電時間常數 $\\tau$ 與穩態電流 $I_{max}$ 分別為何？`,
      options: [
        'τ = 4 ms, Imax = 2 A',
        'τ = 2.5 ms, Imax = 4 A',
        'τ = 4 ms, Imax = 50 A',
        'τ = 25 ms, Imax = 2 A'
      ],
      answer: 0,
      explanation: `RL 暫態時間常數：$\\tau = \\frac{L}{R} = \\frac{100 \\times 10^{-3}}{25} = 4 \\times 10^{-3}\\,\\text{s} = 4\\,\\text{ms}$。<br>穩態時電感視為短路：$I_{max} = \\frac{E}{R} = \\frac{50}{25} = 2\\,\\text{A}$。<br>故正確答案為 (A)。`
    });

    // 034: 交流電路相位差 (mock3)
    questions.push({
      id: `${year}-s1-034`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock3',
      concept: 'ee_ac_phase',
      conceptName: CONCEPT_NAMES.ee_ac_phase,
      source: `【${year} 統測真題】`,
      question: `已知一電路兩端之交流電壓為 $v(t) = 100\\sin(\\omega t + 30^\\circ)\\,\\text{V}$，流過電流為 $i(t) = 5\\sin(\\omega t - 30^\\circ)\\,\\text{A}$。請問該電路之電壓與電流相位關係為何？`,
      options: [
        '電壓超前電流 60°，負載呈電感性',
        '電流超前電壓 60°，負載呈電容性',
        '電壓與電流同相，負載呈純電阻性',
        '電壓超前電流 30°，負載呈電感性'
      ],
      answer: 0,
      explanation: `電壓相角 $\\theta_v = +30^\\circ$，電流相角 $\\theta_i = -30^\\circ$。<br>相位差：$\\theta = \\theta_v - \\theta_i = 30^\\circ - (-30^\\circ) = 60^\\circ > 0$。<br>表示電壓波形超前電流波形 60°，電流落後電壓，此為感性負載（RL）之典型特性。故選 (A)。`
    });

    // 035: RLC 交流串聯阻抗 (mock3)
    questions.push({
      id: `${year}-s1-035`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock3',
      concept: 'ee_rlc_impedance',
      conceptName: CONCEPT_NAMES.ee_rlc_impedance,
      source: `【${year} 模擬考】`,
      question: `一 RLC 串聯電路接於 $100\\,\\text{V}$ 交流電源，已知電阻 $R = 6\\,\\Omega$，電感抗 $X_L = 15\\,\\Omega$，電容抗 $X_C = 7\\,\\Omega$。請問該電路之總阻抗大小 $|Z|$ 與電路總電流為何？`,
      options: [
        '|Z| = 10 Ω, I = 10 A',
        '|Z| = 14 Ω, I = 7.14 A',
        '|Z| = 8 Ω, I = 12.5 A',
        '|Z| = 28 Ω, I = 3.57 A'
      ],
      answer: 0,
      explanation: `RLC 串聯總阻抗：$Z = R + j(X_L - X_C) = 6 + j(15 - 7) = 6 + j8\\,\\Omega$。<br>阻抗大小：$|Z| = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = 10\\,\\Omega$。<br>總電流：$I = \\frac{V}{|Z|} = \\frac{100}{10} = 10\\,\\text{A}$。<br>故選 (A)。`
    });

    // 036: RLC 並聯諧振 (mock3)
    questions.push({
      id: `${year}-s1-036`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock3',
      concept: 'ee_ac_parallel_resonance',
      conceptName: CONCEPT_NAMES.ee_ac_parallel_resonance,
      source: `【${year} 統測真題】`,
      question: `關於理想 RLC 並聯諧振電路（電阻 R、電感 L、電容 C 並聯），當電源頻率達到諧振頻率 $f_0$ 時，下列敘述何者正確？`,
      options: [
        '電路總阻抗達到最大值（純電阻性 R），電源端總電流達到最小值',
        '電路總阻抗達到最小值（等於 0），電源端總電流達到最大值',
        '電路呈現純電容性，功率因數超前',
        '電感電流與電容電流相互抵消，電路兩端端電壓降為 0'
      ],
      answer: 0,
      explanation: `RLC 並聯諧振特性：<br>在諧振時電感支路導納與電容支路導納大小相等相位相反相互抵消 ($B_L = B_C$)，總導納最小 $Y = G = 1/R$，因此總阻抗最大 $Z_{max} = R$。<br>電源端供應之總電流最小 $I_{min} = V/R$，功率因數 $PF = 1$。故選 (A)。`
    });

    // 037: 三相 Y-Δ 接線關係 (mock4)
    questions.push({
      id: `${year}-s1-037`,
      year,
      subject: 'subject1',
      category: '基本電學',
      scope: 'mock4',
      concept: 'ee_three_phase_system',
      conceptName: CONCEPT_NAMES.ee_three_phase_system,
      source: `【${year} 全國模考】`,
      question: `在三相對稱平衡系統中，若負載接成 Δ（三角形）接法，已知電源提供的線電壓為 $V_L = 220\\,\\text{V}$，流入負載之相電流為 $I_p = 10\\,\\text{A}$。請問該負載之相電壓 $V_p$ 與線電流 $I_L$ 分別為何？`,
      options: [
        'Vp = 220 V, IL = 17.32 A (10√3 A)',
        'Vp = 127 V, IL = 10 A',
        'Vp = 380 V, IL = 17.32 A',
        'Vp = 220 V, IL = 5.77 A'
      ],
      answer: 0,
      explanation: `Δ 接法特性：<br>1. 相電壓等於線電壓：$V_p = V_L = 220\\,\\text{V}$。<br>2. 線電流為相電流的 $\\sqrt{3}$ 倍：$I_L = \\sqrt{3} I_p = \\sqrt{3} \\times 10 \\approx 17.32\\,\\text{A}$。<br>故正確答案為 (A)。`
    });

    // ----------------------------------------------------
    // 電子學 (038 ~ 050，共 13 題)
    // ----------------------------------------------------

    // 038: 本質半導體與載子 (mock1)
    questions.push({
      id: `${year}-s1-038`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock1',
      concept: 'el_semiconductor_basics',
      conceptName: CONCEPT_NAMES.el_semiconductor_basics,
      source: `【${year} 統測真題】`,
      question: `在純矽（Si）本質半導體中，若摻雜五價元素（如磷 P、砷 As、銻 Sb），所形成的外質半導體種類及其主要導電載子（多數載子）為何？`,
      options: [
        'N 型半導體，自由電子',
        'P 型半導體，電洞',
        'N 型半導體，電洞',
        'P 型半導體，自由電子'
      ],
      answer: 0,
      explanation: `五價元素摻雜後提供多餘的自由電子作為導電載子，稱為施體（Donor），形成 N 型（Negative）半導體。<br>其多數載子為自由電子，少數載子為電洞。故選 (A)。`
    });

    // 039: 二極體障壁電壓與特性 (mock1)
    questions.push({
      id: `${year}-s1-039`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock1',
      concept: 'el_diode_characteristic',
      conceptName: CONCEPT_NAMES.el_diode_characteristic,
      source: `【${year} 模擬考】`,
      question: `在室溫（約 25°C）常溫下，一般常用的矽（Si）二極體與鍺（Ge）二極體，其順向導通之障壁電壓（切入電壓 $V_\\gamma$）分別大約為何？`,
      options: [
        '矽約 0.7 V，鍺約 0.3 V',
        '矽約 0.3 V，鍺約 0.7 V',
        '矽約 1.2 V，鍺約 0.7 V',
        '矽與鍺皆約為 0.7 V'
      ],
      answer: 0,
      explanation: `半導體能隙不同：<br>- 矽二極體順向切入電壓常溫下約為 0.6～0.7 V；<br>- 鍺二極體切入電壓約為 0.2～0.3 V。<br>故選 (A)。`
    });

    // 040: 全波橋式整流 (mock1)
    questions.push({
      id: `${year}-s1-040`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock1',
      concept: 'el_rectifier_half_full',
      conceptName: CONCEPT_NAMES.el_rectifier_half_full,
      source: `【${year} 統測真題】`,
      question: `一全波橋式整流電路，輸入端為有效值 $V_{rms} = 100\\,\\text{V}$ 之正弦波交流電源。若忽略二極體順向壓降，則輸出直流平均電壓 $V_{dc}$ 大約為何？`,
      options: ['90 V', '45 V', '63.6 V', '141.4 V'],
      answer: 0,
      explanation: `全波整流平均輸出電壓公式：$V_{dc} = \\frac{2 V_m}{\\pi} = \\frac{2 \\sqrt{2} V_{rms}}{\\pi} \\approx 0.9 V_{rms}$。<br>代入數值：$V_{dc} = 0.9 \\times 100 = 90\\,\\text{V}$。<br>故選 (A)。`
    });

    // 041: 電容濾波器漣波電壓 (mock1)
    questions.push({
      id: `${year}-s1-041`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock1',
      concept: 'el_diode_filter',
      conceptName: CONCEPT_NAMES.el_diode_filter,
      source: `【${year} 模擬考】`,
      question: `在全波整流電容濾波電路中，若負載電阻 $R_L$ 固定不變，為了使輸出直流電壓更平滑、降低漣波電壓（Ripple Voltage），下列哪一項做法是有效的？`,
      options: [
        '增大濾波電容器的電容量 C',
        '減小濾波電容器的電容量 C',
        '降低輸入交流電之頻率',
        '減小負載電阻 RL 的阻值'
      ],
      answer: 0,
      explanation: `全波濾波峰對峰漣波電壓公式：$V_r(p-p) = \\frac{I_{dc}}{2 f C} = \\frac{V_{dc}}{2 f R_L C}$。<br>由公式可知，增大濾波電容值 C（或增大負載電阻 $R_L$、提高頻率 f）可有效減小漣波電壓，提升輸出平滑度。故選 (A)。`
    });

    // 042: 二極體截波電路 (mock1)
    questions.push({
      id: `${year}-s1-042`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock1',
      concept: 'el_clipper_circuit',
      conceptName: CONCEPT_NAMES.el_clipper_circuit,
      source: `【${year} 統測真題】`,
      question: `一並聯正截波電路，輸入正弦波峰值為 $V_m = 10\\,\\text{V}$，並聯支路由理想二極體陽極朝上串聯一個 $+4\\,\\text{V}$ 的直流偏壓源構成。當輸入電壓超過 $+4\\,\\text{V}$ 時二極體導通。請問其輸出電壓的最大值會被截斷限制在多少？`,
      options: ['+4 V', '+10 V', '-10 V', '+6 V'],
      answer: 0,
      explanation: `並聯截波電路：當輸入電壓 $v_i > 4\\,\\text{V}$ 時，二極體呈現順偏導通，輸出端電壓被箝制在支路直流偏壓值 $+4\\,\\text{V}$，高於 4V 的正半周峰值波形被削去。故選 (A)。`
    });

    // 043: 二極體箝位電路 (mock1)
    questions.push({
      id: `${year}-s1-043`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock1',
      concept: 'el_clamper_circuit',
      conceptName: CONCEPT_NAMES.el_clamper_circuit,
      source: `【${year} 模擬考】`,
      question: `一輸入為峰對峰值 $V_{p-p} = 20\\,\\text{V}$（$-10\\,\\text{V} \\sim +10\\,\\text{V}$）的方波信號，經過負箝位電路處理後，其輸出波形的峰對峰值與最高電位分別為何？`,
      options: [
        '峰對峰值仍為 20 V，最高電位被箝制在 0 V',
        '峰對峰值減半為 10 V，最高電位為 +10 V',
        '峰對峰值倍增為 40 V，最高電位為 +20 V',
        '波形變成純直流電壓 -10 V'
      ],
      answer: 0,
      explanation: `箝位電路（Clamper）特性：<br>箝位電路僅改變交流信號的直流位準，而不改變波形的形狀與峰對峰值（$V_{p-p}$ 保持不變為 20 V）。負箝位將波形頂部箝位在 0 V，波形整體下移至 $0\\,\\text{V} \\sim -20\\,\\text{V}$。故選 (A)。`
    });

    // 044: 倍壓電路 (mock1)
    questions.push({
      id: `${year}-s1-044`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock1',
      concept: 'el_voltage_multiplier',
      conceptName: CONCEPT_NAMES.el_voltage_multiplier,
      source: `【${year} 統測真題】`,
      question: `在半波二倍壓整流電路中，輸入端正弦波電壓之最大值為 $V_m$。當電路達到穩態且忽略二極體切入壓降時，輸出端之直流空載電壓大小約為何？`,
      options: ['2 Vm', 'Vm', '√2 Vm', '4 Vm'],
      answer: 0,
      explanation: `半波二倍壓原理：負半周時第一顆二極體導通對第一顆電容充電至 $V_m$；正半周時電源與第一顆電容串聯同相疊加，經第二顆二極體對輸出電容充電至 $2V_m$。故選 (A)。`
    });

    // 045: BJT 工作區判別 (mock2)
    questions.push({
      id: `${year}-s1-045`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock2',
      concept: 'el_bjt_operating_regions',
      conceptName: CONCEPT_NAMES.el_bjt_operating_regions,
      source: `【${year} 模擬考】`,
      question: `一 NPN 型雙極性接面電晶體（BJT）在電路中量測得各極電位分別為：基極 $V_B = 2.7\\,\\text{V}$，射極 $V_E = 2.0\\,\\text{V}$，集極 $V_C = 8.0\\,\\text{V}$。請問此電晶體目前工作於何種區域？`,
      options: ['主動區 (Active Region)', '飽和區 (Saturation Region)', '截止區 (Cutoff Region)', '倒置區 (Inverted Region)'],
      answer: 0,
      explanation: `接面偏壓判別：<br>1. 基射極電壓：$V_{BE} = V_B - V_E = 2.7 - 2.0 = 0.7\\,\\text{V} > 0$（基射接面順向偏壓）。<br>2. 基集極電壓：$V_{BC} = V_B - V_C = 2.7 - 8.0 = -5.3\\,\\text{V} < 0$（基集接面逆向偏壓）。<br>滿足「射極接面順偏、集極接面逆偏」，此為電晶體放大之「主動區（Active）」。故選 (A)。`
    });

    // 046: BJT 共基極 CB 組態 (mock2)
    questions.push({
      id: `${year}-s1-046`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock2',
      concept: 'el_bjt_ac_cb_cc',
      conceptName: CONCEPT_NAMES.el_bjt_ac_cb_cc,
      source: `【${year} 統測真題】`,
      question: `在 BJT 的三種基本放大組態中，「共基極放大電路（CB）」相較於共射極（CE），其最顯著的電氣特性與常見應用為何？`,
      options: [
        '輸入阻抗極低、輸出阻抗極高、電流增益略小於 1，常用於高頻或射頻 (RF) 放大',
        '輸入阻抗極高、輸出阻抗極低，常用作緩衝器',
        '電壓增益與電流增益皆極大，為最廣泛使用的音頻放大器',
        '輸入輸出信號相位相反，反相 180°'
      ],
      answer: 0,
      explanation: `共基極（CB）特性：電流增益 $\\alpha \\approx 0.99 < 1$，輸入阻抗極小（約數十歐姆），輸出阻抗高，無密勒效應（Miller effect），高頻頻寬最寬，常用於高頻天線阻抗匹配。故選 (A)。`
    });

    // 047: BJT 射極隨耦器 CC 組態 (mock2)
    questions.push({
      id: `${year}-s1-047`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock2',
      concept: 'el_bjt_ac_cb_cc',
      conceptName: CONCEPT_NAMES.el_bjt_ac_cb_cc,
      source: `【${year} 模擬考】`,
      question: `關於 BJT「共集極放大電路（CC，又稱射極隨耦器 Emitter Follower）」，下列敘述何者正確？`,
      options: [
        '電壓增益 Av 略小於 1（接近 1）、輸入阻抗極高、輸出阻抗極低，輸入與輸出信號同相位',
        '電壓增益 Av 極大、輸出阻抗極大',
        '輸入信號由射極送入，輸出信號由基極取出',
        '輸入信號與輸出信號相位相反 180°'
      ],
      answer: 0,
      explanation: `共集極（CC）特性：輸出由射極取出，射極電位跟隨基極輸入電位變化（同相且 $A_v \\approx 1$），具有高輸入阻抗、低輸出阻抗，常用於多級放大電路前後級間的「阻抗匹配緩衝器（Buffer）」。故選 (A)。`
    });

    // 048: MOSFET 增強型特性 (mock2)
    questions.push({
      id: `${year}-s1-048`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock2',
      concept: 'el_mosfet_types',
      conceptName: CONCEPT_NAMES.el_mosfet_types,
      source: `【${year} 統測真題】`,
      question: `一 N 通道增強型 MOSFET（N-channel E-MOSFET），其臨限電壓（Threshold Voltage）為 $V_{th} = +2\\,\\text{V}$。若欲使其在汲極與源極間形成導電通道並有汲極電流 $I_D$ 流動，閘源極電壓 $V_{GS}$ 必須滿足何種條件？`,
      options: [
        'VGS 必須大於臨限電壓 (VGS > +2 V)',
        'VGS 必須小於 0 V (VGS < 0 V)',
        'VGS 必須固定接至接地電位 (VGS = 0 V)',
        'VGS 必須介於 0 V 與 +2 V 之間'
      ],
      answer: 0,
      explanation: `增強型 MOSFET（E-MOSFET）在 $V_{GS} = 0\\,\\text{V}$ 時為常開（Normally-OFF）無通道。必須施加 $V_{GS} > V_{th}$ 的正電壓吸引足夠電子感應出反轉層（Inversion Layer），通道才會開啟導通。故選 (A)。`
    });

    // 049: OPA 反相加法放大 (mock3)
    questions.push({
      id: `${year}-s1-049`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock3',
      concept: 'el_opa_summing',
      conceptName: CONCEPT_NAMES.el_opa_summing,
      source: `【${year} 模擬考】`,
      question: `一以理想運算放大器構成的反相加法放大器，回授電阻為 $R_f = 20\\,\\text{k}\\Omega$。兩輸入端電阻分別為 $R_1 = 10\\,\\text{k}\\Omega$（接 $v_1 = +2\\,\\text{V}$）與 $R_2 = 20\\,\\text{k}\\Omega$（接 $v_2 = -3\\,\\text{V}$）。請問輸出電壓 $v_o$ 為何？`,
      options: ['-1 V', '+1 V', '-7 V', '+5 V'],
      answer: 0,
      explanation: `反相加法器輸出公式：$v_o = -\\left( \\frac{R_f}{R_1} v_1 + \\frac{R_f}{R_2} v_2 \\right)$。<br>代入數值：$v_o = -\\left( \\frac{20}{10} \\times 2 + \\frac{20}{20} \\times (-3) \\right) = -(4 - 3) = -1\\,\\text{V}$。<br>故正確答案為 (A)。`
    });

    // 050: OPA 差動放大器 CMRR (mock3)
    questions.push({
      id: `${year}-s1-050`,
      year,
      subject: 'subject1',
      category: '電子學',
      scope: 'mock3',
      concept: 'el_opa_difference',
      conceptName: CONCEPT_NAMES.el_opa_difference,
      source: `【${year} 統測真題】`,
      question: `一差動放大器（Differential Amplifier）之差模電壓增益為 $A_d = 2000$，共模電壓增益為 $A_c = 0.2$。請問該差動放大器之共模拒斥比（CMRR，以分貝 dB 表示）為何？`,
      options: ['80 dB', '40 dB', '100 dB', '60 dB'],
      answer: 0,
      explanation: `共模拒斥比定義：$\\text{CMRR} = \\frac{|A_d|}{|A_c|} = \\frac{2000}{0.2} = 10000 = 10^4$。<br>換算成分貝：$\\text{CMRR}_{dB} = 20 \\log_{10}(10^4) = 20 \\times 4 = 80\\,\\text{dB}$。<br>故選 (A)。`
    });

  });

  return questions;
}

module.exports = { generateS1Questions };
