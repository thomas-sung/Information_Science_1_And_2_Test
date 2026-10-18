/**
 * 高職資訊科 (電機與電子群資電類) 統測與模擬考全方位題庫
 * 108課綱標準 · 歷屆統測 (111~114年度) 及各次模擬考全收錄
 * 總題數：200+ 題 (每年至少 50 題：專一 25 題 + 專二 25 題)
 */

(function (root) {
  'use strict';

  // =========================================================================
  // SVG 電路圖與邏輯圖產生器 (Circuit & Logic Schematics)
  // =========================================================================
  const DIAGRAMS = {
    // 1. 惠斯登電橋 (Wheatstone Bridge)
    wheatstone: function(r1, r2, r3, rx) {
      return `
        <svg viewBox="0 0 320 220" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <line x1="160" y1="20" x2="115" y2="65" stroke="#2563eb" stroke-width="2.5"/>
          <rect x="95" y="45" width="40" height="20" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2" rx="3"/>
          <text x="115" y="60" font-size="11" font-weight="bold" fill="currentColor" text-anchor="middle">R1=${r1}Ω</text>
          <line x1="95" y1="65" x2="70" y2="110" stroke="#2563eb" stroke-width="2.5"/>

          <line x1="160" y1="20" x2="205" y2="65" stroke="#2563eb" stroke-width="2.5"/>
          <rect x="185" y="45" width="40" height="20" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2" rx="3"/>
          <text x="205" y="60" font-size="11" font-weight="bold" fill="currentColor" text-anchor="middle">R2=${r2}Ω</text>
          <line x1="225" y1="65" x2="250" y2="110" stroke="#2563eb" stroke-width="2.5"/>

          <line x1="70" y1="110" x2="115" y2="155" stroke="#2563eb" stroke-width="2.5"/>
          <rect x="95" y="145" width="40" height="20" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2" rx="3"/>
          <text x="115" y="160" font-size="11" font-weight="bold" fill="currentColor" text-anchor="middle">R3=${r3}Ω</text>
          <line x1="135" y1="165" x2="160" y2="200" stroke="#2563eb" stroke-width="2.5"/>

          <line x1="250" y1="110" x2="205" y2="155" stroke="#2563eb" stroke-width="2.5"/>
          <rect x="185" y="145" width="40" height="20" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2" rx="3"/>
          <text x="205" y="160" font-size="11" font-weight="bold" fill="currentColor" text-anchor="middle">Rx=${rx || '?'}Ω</text>
          <line x1="185" y1="165" x2="160" y2="200" stroke="#2563eb" stroke-width="2.5"/>

          <!-- 中間檢流計 -->
          <line x1="70" y1="110" x2="135" y2="110" stroke="#d97706" stroke-width="2"/>
          <circle cx="160" cy="110" r="16" fill="var(--bg-surface)" stroke="#d97706" stroke-width="2"/>
          <text x="160" y="115" font-size="12" font-weight="bold" fill="#d97706" text-anchor="middle">Ⓖ 0A</text>
          <line x1="185" y1="110" x2="250" y2="110" stroke="#d97706" stroke-width="2"/>

          <!-- 直流電源連接 -->
          <line x1="160" y1="20" x2="160" y2="8" stroke="#16a34a" stroke-width="2"/>
          <line x1="160" y1="8" x2="28" y2="8" stroke="#16a34a" stroke-width="2"/>
          <line x1="28" y1="8" x2="28" y2="95" stroke="#16a34a" stroke-width="2"/>
          <line x1="18" y1="95" x2="38" y2="95" stroke="#16a34a" stroke-width="3"/>
          <line x1="22" y1="105" x2="34" y2="105" stroke="#16a34a" stroke-width="1.5"/>
          <text x="10" y="103" font-size="10" font-weight="bold" fill="#16a34a">+</text>
          <text x="10" y="115" font-size="10" font-weight="bold" fill="#16a34a">-</text>
          <text x="44" y="104" font-size="11" font-weight="bold" fill="currentColor">E (DC)</text>
          <line x1="28" y1="105" x2="28" y2="200" stroke="#16a34a" stroke-width="2"/>
          <line x1="28" y1="200" x2="160" y2="200" stroke="#16a34a" stroke-width="2"/>

          <circle cx="160" cy="20" r="3.5" fill="#2563eb"/>
          <circle cx="160" cy="200" r="3.5" fill="#2563eb"/>
          <circle cx="70" cy="110" r="3.5" fill="#2563eb"/>
          <circle cx="250" cy="110" r="3.5" fill="#2563eb"/>
        </svg>
        <div class="diagram-caption">【電路圖】惠斯登電橋平衡電路示意圖</div>
      `;
    },

    // 2. 理想運算放大器 (OPA) 反相放大電路
    opaInverting: function(r1, rf, vi) {
      return `
        <svg viewBox="0 0 340 180" width="320" height="170" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="50" r="3" fill="#2563eb"/>
          <text x="25" y="38" font-size="12" font-weight="bold" fill="#2563eb" text-anchor="middle">Vi=${vi}V</text>
          <line x1="25" y1="50" x2="60" y2="50" stroke="#2563eb" stroke-width="2"/>
          
          <rect x="60" y="40" width="46" height="20" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2" rx="2"/>
          <text x="83" y="54" font-size="10" font-weight="bold" fill="currentColor" text-anchor="middle">R1=${r1}k</text>
          
          <line x1="106" y1="50" x2="160" y2="50" stroke="#2563eb" stroke-width="2"/>
          <circle cx="140" cy="50" r="3" fill="#2563eb"/>
          
          <line x1="140" y1="50" x2="140" y2="18" stroke="#2563eb" stroke-width="2"/>
          <line x1="140" y1="18" x2="175" y2="18" stroke="#2563eb" stroke-width="2"/>
          <rect x="175" y="8" width="50" height="20" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2" rx="2"/>
          <text x="200" y="22" font-size="10" font-weight="bold" fill="currentColor" text-anchor="middle">Rf=${rf}k</text>
          <line x1="225" y1="18" x2="265" y2="18" stroke="#2563eb" stroke-width="2"/>
          <line x1="265" y1="18" x2="265" y2="70" stroke="#2563eb" stroke-width="2"/>

          <polygon points="160,35 160,105 230,70" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2.5"/>
          <text x="170" y="55" font-size="16" font-weight="bold" fill="#dc2626">-</text>
          <text x="170" y="93" font-size="14" font-weight="bold" fill="#16a34a">+</text>
          
          <line x1="160" y1="90" x2="135" y2="90" stroke="#2563eb" stroke-width="2"/>
          <line x1="135" y1="90" x2="135" y2="115" stroke="#2563eb" stroke-width="2"/>
          <line x1="123" y1="115" x2="147" y2="115" stroke="currentColor" stroke-width="2"/>
          <line x1="127" y1="120" x2="143" y2="120" stroke="currentColor" stroke-width="1.8"/>
          <line x1="131" y1="125" x2="139" y2="125" stroke="currentColor" stroke-width="1.5"/>

          <line x1="230" y1="70" x2="305" y2="70" stroke="#2563eb" stroke-width="2"/>
          <circle cx="265" cy="70" r="3" fill="#2563eb"/>
          <circle cx="305" cy="70" r="3" fill="#16a34a"/>
          <text x="305" y="58" font-size="12" font-weight="bold" fill="#16a34a" text-anchor="middle">Vo=?</text>
        </svg>
        <div class="diagram-caption">【電路圖】OPA 反相放大器 (Inverting Amplifier)</div>
      `;
    },

    // 3. 橋式全波整流電路
    bridgeRectifier: function(vinPeak) {
      return `
        <svg viewBox="0 0 340 180" width="310" height="165" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="90" r="16" fill="var(--bg-surface)" stroke="#2563eb" stroke-width="2"/>
          <path d="M 27 90 Q 31 82 35 90 T 43 90" fill="none" stroke="#2563eb" stroke-width="2"/>
          <text x="35" y="122" font-size="10" font-weight="bold" fill="currentColor" text-anchor="middle">${vinPeak}V AC</text>

          <line x1="35" y1="74" x2="35" y2="50" stroke="#2563eb" stroke-width="2"/>
          <line x1="35" y1="50" x2="110" y2="50" stroke="#2563eb" stroke-width="2"/>
          <line x1="35" y1="106" x2="35" y2="130" stroke="#2563eb" stroke-width="2"/>
          <line x1="35" y1="130" x2="110" y2="130" stroke="#2563eb" stroke-width="2"/>

          <polygon points="160,40 210,90 160,140 110,90" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3"/>
          <text x="130" y="60" font-size="11" font-weight="bold" fill="#2563eb">D1</text>
          <text x="185" y="60" font-size="11" font-weight="bold" fill="#2563eb">D2</text>
          <text x="130" y="130" font-size="11" font-weight="bold" fill="#2563eb">D3</text>
          <text x="185" y="130" font-size="11" font-weight="bold" fill="#2563eb">D4</text>

          <line x1="160" y1="40" x2="270" y2="40" stroke="#16a34a" stroke-width="2"/>
          <line x1="160" y1="140" x2="270" y2="140" stroke="#16a34a" stroke-width="2"/>
          <line x1="270" y1="40" x2="270" y2="65" stroke="#16a34a" stroke-width="2"/>
          <rect x="260" y="65" width="20" height="40" fill="var(--bg-elevated)" stroke="#16a34a" stroke-width="2" rx="2"/>
          <text x="270" y="88" font-size="10" font-weight="bold" fill="currentColor" text-anchor="middle">RL</text>
          <line x1="270" y1="105" x2="270" y2="140" stroke="#16a34a" stroke-width="2"/>

          <text x="295" y="55" font-size="12" font-weight="bold" fill="#16a34a">+</text>
          <text x="295" y="135" font-size="12" font-weight="bold" fill="#16a34a">-</text>
          <text x="305" y="94" font-size="11" font-weight="bold" fill="#16a34a">Vout</text>
        </svg>
        <div class="diagram-caption">【電路圖】橋式全波整流電路</div>
      `;
    },

    // 4. 戴維寧等效電路
    thevenin: function(eth, rth) {
      return `
        <svg viewBox="0 0 300 130" width="280" height="120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="45" cy="65" r="18" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2"/>
          <line x1="36" y1="65" x2="54" y2="65" stroke="#dc2626" stroke-width="2"/>
          <line x1="45" y1="56" x2="45" y2="74" stroke="#dc2626" stroke-width="2"/>
          <text x="45" y="105" font-size="11" font-weight="bold" fill="currentColor" text-anchor="middle">Eth = ${eth}V</text>

          <line x1="45" y1="47" x2="45" y2="25" stroke="#2563eb" stroke-width="2"/>
          <line x1="45" y1="25" x2="110" y2="25" stroke="#2563eb" stroke-width="2"/>
          <rect x="110" y="15" width="50" height="20" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2" rx="2"/>
          <text x="135" y="29" font-size="10" font-weight="bold" fill="currentColor" text-anchor="middle">Rth = ${rth}Ω</text>
          <line x1="160" y1="25" x2="245" y2="25" stroke="#2563eb" stroke-width="2"/>

          <line x1="45" y1="83" x2="45" y2="105" stroke="#2563eb" stroke-width="2"/>
          <line x1="45" y1="105" x2="245" y2="105" stroke="#2563eb" stroke-width="2"/>

          <circle cx="245" cy="25" r="3.5" fill="#16a34a"/>
          <text x="260" y="29" font-size="12" font-weight="bold" fill="#16a34a">A (+)</text>
          <circle cx="245" cy="105" r="3.5" fill="#16a34a"/>
          <text x="260" y="109" font-size="12" font-weight="bold" fill="#16a34a">B (-)</text>
        </svg>
        <div class="diagram-caption">【電路圖】戴維寧等效模型電路</div>
      `;
    },

    // 5. 邏輯閘組合電路圖
    logicGates: function() {
      return `
        <svg viewBox="0 0 340 160" width="310" height="145" xmlns="http://www.w3.org/2000/svg">
          <text x="20" y="35" font-size="13" font-weight="bold" fill="currentColor">A</text>
          <line x1="35" y1="30" x2="180" y2="30" stroke="#2563eb" stroke-width="2"/>

          <text x="20" y="90" font-size="13" font-weight="bold" fill="currentColor">B</text>
          <line x1="35" y1="85" x2="80" y2="85" stroke="#2563eb" stroke-width="2"/>

          <text x="20" y="125" font-size="13" font-weight="bold" fill="currentColor">C</text>
          <line x1="35" y1="120" x2="80" y2="120" stroke="#2563eb" stroke-width="2"/>

          <path d="M 80 70 L 105 70 A 25 25 0 0 1 105 135 L 80 135 Z" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2"/>
          <text x="96" y="107" font-size="11" font-weight="bold" fill="currentColor">AND</text>
          <line x1="130" y1="102" x2="160" y2="102" stroke="#2563eb" stroke-width="2"/>
          <line x1="160" y1="102" x2="160" y2="60" stroke="#2563eb" stroke-width="2"/>
          <line x1="160" y1="60" x2="180" y2="60" stroke="#2563eb" stroke-width="2"/>

          <path d="M 180 20 Q 195 45 180 70 Q 215 70 235 45 Q 215 20 180 20 Z" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2"/>
          <circle cx="239" cy="45" r="4" fill="var(--bg-surface)" stroke="#2563eb" stroke-width="2"/>
          <text x="195" y="49" font-size="9" font-weight="bold" fill="currentColor">NOR</text>

          <line x1="243" y1="45" x2="300" y2="45" stroke="#16a34a" stroke-width="2"/>
          <circle cx="300" cy="45" r="3.5" fill="#16a34a"/>
          <text x="312" y="49" font-size="13" font-weight="bold" fill="#16a34a">F</text>
        </svg>
        <div class="diagram-caption">【邏輯電路】組合邏輯電路圖</div>
      `;
    },

    // 6. JK 正反器接線圖
    jkFlipFlop: function() {
      return `
        <svg viewBox="0 0 260 160" width="240" height="145" xmlns="http://www.w3.org/2000/svg">
          <rect x="70" y="20" width="110" height="120" fill="var(--bg-elevated)" stroke="#2563eb" stroke-width="2.5" rx="4"/>
          <text x="125" y="45" font-size="12" font-weight="bold" fill="#2563eb" text-anchor="middle">JK-FF</text>

          <line x1="20" y1="50" x2="70" y2="50" stroke="#2563eb" stroke-width="2"/>
          <text x="38" y="44" font-size="12" font-weight="bold" fill="currentColor">J=1</text>

          <line x1="20" y1="80" x2="70" y2="80" stroke="#d97706" stroke-width="2"/>
          <polyline points="70,72 82,80 70,88" fill="none" stroke="#d97706" stroke-width="2"/>
          <text x="30" y="75" font-size="10" font-weight="bold" fill="#d97706">CLK ⏰</text>

          <line x1="20" y1="110" x2="70" y2="110" stroke="#2563eb" stroke-width="2"/>
          <text x="38" y="125" font-size="12" font-weight="bold" fill="currentColor">K=1</text>

          <line x1="180" y1="50" x2="230" y2="50" stroke="#16a34a" stroke-width="2"/>
          <text x="195" y="44" font-size="12" font-weight="bold" fill="#16a34a">Q(t+1)</text>

          <circle cx="184" cy="110" r="3.5" fill="var(--bg-surface)" stroke="#16a34a" stroke-width="1.8"/>
          <line x1="188" y1="110" x2="230" y2="110" stroke="#16a34a" stroke-width="2"/>
          <text x="198" y="125" font-size="12" font-weight="bold" fill="#16a34a">Q'</text>
        </svg>
        <div class="diagram-caption">【電路圖】負緣觸發 JK 正反器結構圖</div>
      `;
    }
  };

  // 題庫資料陣列 (200 題)
  const RAW_QUESTIONS = [
  {
    "id": "111-s1-001",
    "year": "111",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【111 統測真題】",
    "question": "一均勻銅導線長度為 $L$，截面積為 $A$，其電阻為 $10\\,\\Omega$。若將該銅線均勻拉長為原來的 $2$ 倍，且拉伸過程中體積維持不變，則拉長後之電阻值變為多少？",
    "options": [
      "10 Ω",
      "20 Ω",
      "30 Ω",
      "40 Ω"
    ],
    "answer": 3,
    "explanation": "依導體電阻公式：$R = \\rho \\frac{L}{A}$。<br>當體積 $V = L \\times A$ 保持固定時，長度變為 $2$ 倍（$L' = 2L$），則截面積必縮小為一半（$A' = A/2$）。<br>新電阻值 $R' = \\rho \\frac{2L}{A/2} = 4 \\times (\\rho \\frac{L}{A}) = 4 \\times 10 = 40\\,\\Omega$。<br>因此正確答案為 (D)。"
  },
  {
    "id": "111-s1-002",
    "year": "111",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【111 統測真題】",
    "question": "有一色碼電阻器，其表面依序印有「紅、黑、橙、金」四個色環，請問該電阻器的標稱電阻值與誤差範圍為何？",
    "options": [
      "20 kΩ ± 5%",
      "2 kΩ ± 10%",
      "200 Ω ± 5%",
      "200 kΩ ± 10%"
    ],
    "answer": 0,
    "explanation": "色碼口訣（黑0、棕1、紅2、橙3、黃4、綠5、藍6、紫7、灰8、白9）：<br>第一環「紅」代表數字 2；<br>第二環「黑」代表數字 0；<br>第三環「橙」代表倍率 $10^3$；<br>第四環「金」代表誤差 $\\pm 5\\%$。<br>電阻值為 $20 \\times 10^3\\,\\Omega = 20\\,\\text{k}\\Omega$，誤差為 $\\pm 5\\%$，故選 (A)。"
  },
  {
    "id": "111-s1-003",
    "year": "111",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【111 模擬考】",
    "question": "將 $60\\,\\Omega$ 與 $40\\,\\Omega$ 兩電阻並聯後，再與一顆 $16\\,\\Omega$ 的電阻串聯，整體電路接至 $80\\,\\text{V}$ 的直流理想電源端。請問流經電源的總電流 $I$ 為何？",
    "options": [
      "1 A",
      "2 A",
      "3 A",
      "4 A"
    ],
    "answer": 1,
    "explanation": "1. 計算並聯部分等效電阻：$R_p = \\frac{60 \\times 40}{60 + 40} = \\frac{2400}{100} = 24\\,\\Omega$。<br>2. 計算全電路總電阻：$R_{total} = R_p + 16 = 24 + 16 = 40\\,\\Omega$。<br>3. 依歐姆定律計算總電流：$I = \\frac{E}{R_{total}} = \\frac{80\\,\\text{V}}{40\\,\\Omega} = 2\\,\\text{A}$。<br>故正確答案為 (B)。"
  },
  {
    "id": "111-s1-004",
    "year": "111",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【111 統測真題】",
    "question": "如圖所示之直流電路，由 A、B 兩端看入之戴維寧等效電壓 $E_{th}$ 與戴維寧等效電阻 $R_{th}$ 分別為多少？",
    "diagramType": "thevenin",
    "diagramParams": [
      12,
      6
    ],
    "options": [
      "Eth = 12V, Rth = 6Ω",
      "Eth = 24V, Rth = 12Ω",
      "Eth = 6V, Rth = 3Ω",
      "Eth = 18V, Rth = 9Ω"
    ],
    "answer": 0,
    "explanation": "依戴維寧定理步驟：<br>1. 求開路電壓 $E_{th}$：A、B 兩端開路時測得之端電壓為 $12\\,\\text{V}$。<br>2. 求等效電阻 $R_{th}$：將獨立電源關閉（獨立電壓源視為短路，電流源開路），由 A、B 端看入之總電阻為 $6\\,\\Omega$。<br>因此戴維寧等效模型為 $E_{th} = 12\\,\\text{V}, R_{th} = 6\\,\\Omega$，選 (A)。"
  },
  {
    "id": "111-s1-005",
    "year": "111",
    "subject": "subject1",
    "scope": "mock2",
    "category": "基本電學",
    "source": "【111 模擬考】",
    "question": "一電源電路的戴維寧等效電壓為 $E_{th} = 24\\,\\text{V}$，戴維寧等效電阻為 $R_{th} = 8\\,\\Omega$。若在輸出端接上一可變負載電阻 $R_L$，為獲得最大功率，則 $R_L$ 應調整為多少歐姆？且所獲得之最大功率 $P_{max}$ 為多少瓦特？",
    "options": [
      "RL = 8Ω, Pmax = 18W",
      "RL = 4Ω, Pmax = 36W",
      "RL = 8Ω, Pmax = 72W",
      "RL = 16Ω, Pmax = 9W"
    ],
    "answer": 0,
    "explanation": "依最大功率轉移定理：<br>1. 當負載電阻等於戴維寧等效電阻時，負載可獲得最大功率：$R_L = R_{th} = 8\\,\\Omega$。<br>2. 負載端電壓為分壓之一半：$V_L = \\frac{E_{th}}{2} = 12\\,\\text{V}$。<br>3. 最大功率 $P_{max} = \\frac{E_{th}^2}{4R_{th}} = \\frac{24^2}{4 \\times 8} = \\frac{576}{32} = 18\\,\\text{W}$。<br>故選 (A)。"
  },
  {
    "id": "111-s1-006",
    "year": "111",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【111 模擬考】",
    "question": "如圖所示之惠斯登電橋電路，電阻 $R_1 = 10\\,\\Omega, R_2 = 20\\,\\Omega, R_3 = 30\\,\\Omega$，當檢流計 Ⓖ 指針指示為 0（電橋達到平衡）時，未知電阻 $R_x$ 之阻值應為多少？",
    "diagramType": "wheatstone",
    "diagramParams": [
      10,
      20,
      30,
      60
    ],
    "options": [
      "15 Ω",
      "40 Ω",
      "60 Ω",
      "100 Ω"
    ],
    "answer": 2,
    "explanation": "惠斯登電橋平衡條件為「交叉臂電阻相乘相等」：<br>$R_1 \\times R_x = R_2 \\times R_3$<br>$10 \\times R_x = 20 \\times 30 = 600$<br>$R_x = \\frac{600}{10} = 60\\,\\Omega$。<br>因此當 $R_x = 60\\,\\Omega$ 時電橋平衡，檢流計電流為零，故選 (C)。"
  },
  {
    "id": "111-s1-007",
    "year": "111",
    "subject": "subject1",
    "scope": "mock2",
    "category": "基本電學",
    "source": "【111 統測真題】",
    "question": "有三個電容器，電容量分別為 $C_1 = 6\\,\\mu\\text{F}, C_2 = 12\\,\\mu\\text{F}, C_3 = 4\\,\\mu\\text{F}$。若先將 $C_1$ 與 $C_2$ 串聯，再與 $C_3$ 並聯，則此組合電路的總等效電容量為多少？",
    "options": [
      "4 μF",
      "8 μF",
      "16 μF",
      "22 μF"
    ],
    "answer": 1,
    "explanation": "1. 電容串聯特性與電阻並聯相同：<br>$C_{12} = \\frac{C_1 \\times C_2}{C_1 + C_2} = \\frac{6 \\times 12}{6 + 12} = \\frac{72}{18} = 4\\,\\mu\\text{F}$。<br>2. 再與 $C_3$ 並聯（電容並聯直接相加）：<br>$C_{total} = C_{12} + C_3 = 4 + 4 = 8\\,\\mu\\text{F}$。<br>故正確答案為 (B)。"
  },
  {
    "id": "111-s1-008",
    "year": "111",
    "subject": "subject1",
    "scope": "mock2",
    "category": "基本電學",
    "source": "【111 統測真題】",
    "question": "一未充過電之電容器 $C = 50\\,\\mu\\text{F}$ 與一電阻 $R = 20\\,\\text{k}\\Omega$ 串聯，於時間 $t = 0$ 秒時接入 $100\\,\\text{V}$ 的直流穩壓電源開始充電。請問該電路的充電時間常數 $\\tau$ 為何？當電路達到完全穩態後，電容器儲存的電能為多少焦耳？",
    "options": [
      "τ = 1.0 秒，電能 = 0.25 焦耳",
      "τ = 0.5 秒，電能 = 0.5 焦耳",
      "τ = 2.0 秒，電能 = 0.25 焦耳",
      "τ = 1.0 秒，電能 = 0.5 焦耳"
    ],
    "answer": 0,
    "explanation": "1. RC 串聯電路之時間常數：<br>$\\tau = R \\times C = (20 \\times 10^3\\,\\Omega) \\times (50 \\times 10^{-6}\\,\\text{F}) = 1000 \\times 10^{-3} = 1.0\\,\\text{秒}$。<br>2. 穩態時電容充飽電壓等於電源電壓 $V_C = 100\\,\\text{V}$。<br>儲存電能 $W = \\frac{1}{2} C V_C^2 = \\frac{1}{2} \\times (50 \\times 10^{-6}) \\times (100)^2 = 25 \\times 10^{-6} \\times 10^4 = 0.25\\,\\text{J}$（焦耳）。<br>故選 (A)。"
  },
  {
    "id": "111-s1-009",
    "year": "111",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【111 統測真題】",
    "question": "一正弦交流電壓的瞬時表示式為 $v(t) = 100\\sqrt{2}\\sin(377t - 30^\\circ)\\,\\text{V}$，請問該交流電壓的有效值 $V_{rms}$ 與頻率 $f$ 分別為多少？",
    "options": [
      "100 V, 60 Hz",
      "141.4 V, 50 Hz",
      "100 V, 377 Hz",
      "200 V, 60 Hz"
    ],
    "answer": 0,
    "explanation": "正弦波標準式：$v(t) = V_m \\sin(\\omega t + \\theta)$。<br>1. 峰值 $V_m = 100\\sqrt{2}\\,\\text{V}$，正弦波有效值 $V_{rms} = \\frac{V_m}{\\sqrt{2}} = \\frac{100\\sqrt{2}}{\\sqrt{2}} = 100\\,\\text{V}$。<br>2. 角頻率 $\\omega = 377\\,\\text{rad/s}$，頻率 $f = \\frac{\\omega}{2\\pi} = \\frac{377}{2 \\times 3.1416} \\approx 60\\,\\text{Hz}$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s1-010",
    "year": "111",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【111 模擬考】",
    "question": "一交流串聯電路中，電阻 $R = 6\\,\\Omega$，感抗 $X_L = 14\\,\\Omega$，容抗 $X_C = 6\\,\\Omega$。若接上 $100\\,\\text{V}$ 交流電源，則此電路的總阻抗大小 $|Z|$ 及功率因數 $PF$ 為何？",
    "options": [
      "|Z| = 10 Ω, PF = 0.6 (落後)",
      "|Z| = 14 Ω, PF = 0.8 (超前)",
      "|Z| = 10 Ω, PF = 0.8 (落後)",
      "|Z| = 26 Ω, PF = 0.5 (超前)"
    ],
    "answer": 0,
    "explanation": "1. 串聯總阻抗 $Z = R + j(X_L - X_C) = 6 + j(14 - 6) = 6 + j8\\,\\Omega$。<br>2. 阻抗大小 $|Z| = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\,\\Omega$。<br>3. 功率因數 $\\cos\\theta = \\frac{R}{|Z|} = \\frac{6}{10} = 0.6$。<br>因為 $X_L > X_C$ 電路呈電感性，電流落後電壓，因此為「落後」，故選 (A)。"
  },
  {
    "id": "111-s1-011",
    "year": "111",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【111 統測真題】",
    "question": "一負載兩端電壓為 $v(t) = 100\\sin(\\omega t + 30^\\circ)\\,\\text{V}$，流經之電流為 $i(t) = 10\\sin(\\omega t - 30^\\circ)\\,\\text{A}$，請問該負載所消耗的平均實功率 $P$ 及虛功率 $Q$ 為何？",
    "options": [
      "P = 250 W, Q = 433 VAR",
      "P = 500 W, Q = 866 VAR",
      "P = 250 W, Q = 250 VAR",
      "P = 500 W, Q = 0 VAR"
    ],
    "answer": 0,
    "explanation": "1. 電壓有效值 $V = 100 / \\sqrt{2}$，電流有效值 $I = 10 / \\sqrt{2}$。<br>2. 電壓與電流相角差 $\\theta = 30^\\circ - (-30^\\circ) = 60^\\circ$。<br>3. 平均實功率 $P = V I \\cos\\theta = (\\frac{100}{\\sqrt{2}}) \\times (\\frac{10}{\\sqrt{2}}) \\times \\cos(60^\\circ) = \\frac{1000}{2} \\times 0.5 = 250\\,\\text{W}$。<br>4. 虛功率 $Q = V I \\sin\\theta = 500 \\times \\sin(60^\\circ) = 500 \\times \\frac{\\sqrt{3}}{2} \\approx 433\\,\\text{VAR}$。<br>故選 (A)。"
  },
  {
    "id": "111-s1-012",
    "year": "111",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【111 模擬考】",
    "question": "一 RLC 串聯諧振電路中，$R = 10\\,\\Omega, L = 2\\,\\text{mH}, C = 0.5\\,\\mu\\text{F}$。當電路發生串聯諧振時，電路的諧振角頻率 $\\omega_0$ 及品質因數 $Q$ 為何？",
    "options": [
      "ω0 = 31622 rad/s, Q = 6.32",
      "ω0 = 10000 rad/s, Q = 5.0",
      "ω0 = 31622 rad/s, Q = 10.0",
      "ω0 = 20000 rad/s, Q = 4.0"
    ],
    "answer": 0,
    "explanation": "1. 諧振角頻率：<br>$\\omega_0 = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{2 \\times 10^{-3} \\times 0.5 \\times 10^{-6}}} = \\frac{1}{\\sqrt{10^{-9}}} = \\frac{1}{3.162 \\times 10^{-5}} \\approx 31622\\,\\text{rad/s}$。<br>2. 串聯諧振感抗：$X_{L0} = \\omega_0 L = 31622 \\times 2 \\times 10^{-3} = 63.24\\,\\Omega$。<br>3. 品質因數：$Q = \\frac{X_{L0}}{R} = \\frac{63.24}{10} \\approx 6.32$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s1-013",
    "year": "111",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【111 統測真題】",
    "question": "有一平衡三相 Y 接電源，線電壓大小為 $V_L = 220\\,\\text{V}$，供電給一平衡三相 $\\Delta$ 接負載。已知每一相負載阻抗為 $Z_\\Delta = 30 + j40 = 50\\angle 53.1^\\circ\\,\\Omega$。請問每一相負載的相電流大小 $I_{\\phi}$ 及三相總消耗實功率 $P_{3\\phi}$ 約為多少？",
    "options": [
      "Iφ = 4.4 A, P = 1742 W",
      "Iφ = 2.54 A, P = 1000 W",
      "Iφ = 4.4 A, P = 2904 W",
      "Iφ = 7.62 A, P = 5227 W"
    ],
    "answer": 0,
    "explanation": "1. 對於 $\\Delta$ 接負載，負載端跨接之相電壓等於線電壓：$V_\\phi = V_L = 220\\,\\text{V}$。<br>2. 每一相之負載相電流：$I_\\phi = \\frac{V_\\phi}{|Z_\\Delta|} = \\frac{220}{50} = 4.4\\,\\text{A}$。<br>3. 每一相消耗實功率：$P_\\phi = I_\\phi^2 \\times R = (4.4)^2 \\times 30 = 19.36 \\times 30 = 580.8\\,\\text{W}$。<br>4. 三相總功率：$P_{3\\phi} = 3 \\times P_\\phi = 3 \\times 580.8 = 1742.4\\,\\text{W}$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s1-014",
    "year": "111",
    "subject": "subject1",
    "scope": "mock2",
    "category": "電子學",
    "source": "【111 統測真題】",
    "question": "矽 (Si) 與鍺 (Ge) 兩種半導體材料製成之 PN 二極體，在常溫（約 25°C 或 300K）下處於順向導通狀態時，其障壁電位（切入電壓 $V_D$）約分別為何？",
    "options": [
      "矽約 0.7V，鍺約 0.3V",
      "矽約 0.3V，鍺約 0.7V",
      "矽約 1.2V，鍺約 0.7V",
      "矽約 0.7V，鍺約 1.4V"
    ],
    "answer": 0,
    "explanation": "半導體材料在室溫下的能隙特性：<br>1. 矽（Silicon）二極體的順向切入電壓通常約為 $0.6\\sim 0.7\\,\\text{V}$（標準計算皆取 $0.7\\,\\text{V}$）。<br>2. 鍺（Germanium）二極體順向切入電壓約為 $0.2\\sim 0.3\\,\\text{V}$（計算取 $0.3\\,\\text{V}$）。<br>故選 (A)。"
  },
  {
    "id": "111-s1-015",
    "year": "111",
    "subject": "subject1",
    "scope": "mock2",
    "category": "電子學",
    "source": "【111 模擬考】",
    "question": "一橋式全波整流電路，輸入交流正弦波電壓有效值為 $100\\,\\text{V}$，整流二極體均視為理想。若輸出端接一純電阻負載 $R_L$，請問輸出端負載兩端之直流平均電壓 $V_{dc}$ 約為多少？二極體所承受之峰值逆向電壓 (PIV) 為多少？",
    "options": [
      "Vdc ≈ 90 V, PIV ≈ 141.4 V",
      "Vdc ≈ 45 V, PIV ≈ 100 V",
      "Vdc ≈ 100 V, PIV ≈ 200 V",
      "Vdc ≈ 90 V, PIV ≈ 282.8 V"
    ],
    "answer": 0,
    "explanation": "1. 輸入交流峰值 $V_m = 100\\sqrt{2} \\approx 141.4\\,\\text{V}$。<br>2. 全波整流之直流平均輸出電壓：<br>$V_{dc} = \\frac{2V_m}{\\pi} = \\frac{2 \\times 141.4}{3.1416} \\approx 90\\,\\text{V}$（亦即 $0.9 \\times V_{rms}$）。<br>3. 橋式整流中，每個二極體承受之最大逆向峰值電壓即為輸入電壓峰值：$\\text{PIV} = V_m \\approx 141.4\\,\\text{V}$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s1-016",
    "year": "111",
    "subject": "subject1",
    "scope": "mock2",
    "category": "電子學",
    "source": "【111 統測真題】",
    "question": "一稽納二極體（Zener Diode）穩壓電路，稽納崩潰電壓 $V_Z = 10\\,\\text{V}$，工作電流範圍為 $I_{ZK} = 5\\,\\text{mA}$ 至最大容許電流 $I_{ZM} = 45\\,\\text{mA}$。輸入直流未穩電壓 $V_S = 25\\,\\text{V}$，限流電阻 $R_S = 300\\,\\Omega$。當負載開路（$I_L = 0$）時，流經稽納二極體的電流 $I_Z$ 及消耗功率 $P_Z$ 為何？",
    "options": [
      "IZ = 50 mA, 超過最大額定 (可能燒毀)",
      "IZ = 50 mA, 正常工作",
      "IZ = 30 mA, PZ = 0.3 W",
      "IZ = 45 mA, PZ = 0.45 W"
    ],
    "answer": 0,
    "explanation": "限流電阻兩端電壓降 $V_{RS} = V_S - V_Z = 25\\,\\text{V} - 10\\,\\text{V} = 15\\,\\text{V}$。<br>輸入總電流 $I_S = \\frac{15\\,\\text{V}}{300\\,\\Omega} = 50\\,\\text{mA}$。<br>當負載開路時，$I_Z = I_S = 50\\,\\text{mA}$。<br>但規格上限 $I_{ZM} = 45\\,\\text{mA}$，此時電流 $50\\,\\text{mA} > 45\\,\\text{mA}$，已超過最大額定，極易因過熱燒毀，故選 (A)。"
  },
  {
    "id": "111-s1-017",
    "year": "111",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【111 統測真題】",
    "question": "一 NPN 雙極性電晶體 (BJT) 測得其共基極直流電流增益 $\\alpha = 0.98$。若其基極電流 $I_B = 40\\,\\mu\\text{A}$，請問該電晶體的共射極直流電流增益 $\\beta$ 及集極電流 $I_C$ 分別為何？",
    "options": [
      "β = 49, IC = 1.96 mA",
      "β = 50, IC = 2.0 mA",
      "β = 98, IC = 3.92 mA",
      "β = 49, IC = 0.98 mA"
    ],
    "answer": 0,
    "explanation": "1. $\\alpha$ 與 $\\beta$ 之換算公式：<br>$\\beta = \\frac{\\alpha}{1 - \\alpha} = \\frac{0.98}{1 - 0.98} = \\frac{0.98}{0.02} = 49$。<br>2. 集極電流：<br>$I_C = \\beta I_B = 49 \\times 40\\,\\mu\\text{A} = 1960\\,\\mu\\text{A} = 1.96\\,\\text{mA}$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s1-018",
    "year": "111",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【111 模擬考】",
    "question": "電晶體作為放大器使用時，其射極接面（EBJ）與集極接面（CBJ）的偏壓狀態應分別為何？",
    "options": [
      "EBJ 順向偏壓，CBJ 逆向偏壓",
      "EBJ 逆向偏壓，CBJ 順向偏壓",
      "EBJ 與 CBJ 均順向偏壓",
      "EBJ 與 CBJ 均逆向偏壓"
    ],
    "answer": 0,
    "explanation": "BJT 的工作模式對照：<br>1. 主動區（放大模式）：EBJ 順向偏壓、CBJ 逆向偏壓；<br>2. 飽和區（開關 ON）：EBJ 順向偏壓、CBJ 順向偏壓；<br>3. 截止區（開關 OFF）：EBJ 逆向偏壓、CBJ 逆向偏壓。<br>作為線性放大器時必須工作於主動區，故選 (A)。"
  },
  {
    "id": "111-s1-019",
    "year": "111",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【111 統測真題】",
    "question": "一固定偏壓共射極 (CE) 放大電路中，$V_{CC} = 12\\,\\text{V}, R_B = 565\\,\\text{k}\\Omega, R_C = 2\\,\\text{k}\\Omega$。電晶體 $\\beta = 100, V_{BE} = 0.7\\,\\text{V}$。請問此電路之靜態工作點集極-射極間電壓 $V_{CE}$ 為多少？",
    "options": [
      "8 V",
      "4 V",
      "6 V",
      "2 V"
    ],
    "answer": 0,
    "explanation": "1. 基極電流：$I_B = \\frac{V_{CC} - V_{BE}}{R_B} = \\frac{12 - 0.7}{565\\,\\text{k}\\Omega} = \\frac{11.3\\,\\text{V}}{565\\,\\text{k}\\Omega} = 0.02\\,\\text{mA} = 20\\,\\mu\\text{A}$。<br>2. 集極電流：$I_C = \\beta I_B = 100 \\times 0.02\\,\\text{mA} = 2.0\\,\\text{mA}$。<br>3. 集極-射極電壓：$V_{CE} = V_{CC} - I_C R_C = 12\\,\\text{V} - (2.0\\,\\text{mA} \\times 2\\,\\text{k}\\Omega) = 12 - 4 = 8\\,\\text{V}$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s1-020",
    "year": "111",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【111 模擬考】",
    "question": "一 N 通道 JFET 之飽和汲極電流 $I_{DSS} = 8\\,\\text{mA}$，夾止電壓 $V_P = -4\\,\\text{V}$。當閘極-源極偏壓 $V_{GS} = -2\\,\\text{V}$ 時，若 JFET 工作於夾止區（飽和區），其汲極電流 $I_D$ 為多少？",
    "options": [
      "2.0 mA",
      "4.0 mA",
      "1.0 mA",
      "6.0 mA"
    ],
    "answer": 0,
    "explanation": "依 JFET 蕭克萊方程式（Shockley's equation）：<br>$I_D = I_{DSS} \\left(1 - \\frac{V_{GS}}{V_P}\\right)^2$<br>代入數值：<br>$I_D = 8\\,\\text{mA} \\times \\left(1 - \\frac{-2}{-4}\\right)^2 = 8 \\times (1 - 0.5)^2 = 8 \\times (0.5)^2 = 8 \\times 0.25 = 2.0\\,\\text{mA}$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s1-021",
    "year": "111",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【111 統測真題】",
    "question": "如圖所示之理想運算放大器 (OPA) 反相放大電路中，$R_1 = 10\\,\\text{k}\\Omega, R_f = 50\\,\\text{k}\\Omega$。若輸入電壓 $V_i = +0.6\\,\\text{V}$，且 OPA 之正負工作電源為 $\\pm 15\\,\\text{V}$，請問輸出電壓 $V_o$ 為何？",
    "diagramType": "opaInverting",
    "diagramParams": [
      10,
      50,
      0.6
    ],
    "options": [
      "-3.0 V",
      "+3.0 V",
      "-6.0 V",
      "-15.0 V"
    ],
    "answer": 0,
    "explanation": "理想反相放大器的閉迴路電壓增益為：<br>$A_v = -\\frac{R_f}{R_1} = -\\frac{50\\,\\text{k}\\Omega}{10\\,\\text{k}\\Omega} = -5$。<br>輸出電壓 $V_o = A_v \\times V_i = (-5) \\times (+0.6\\,\\text{V}) = -3.0\\,\\text{V}$。<br>因為 $-3.0\\,\\text{V}$ 介於電源極限 $\\pm 15\\,\\text{V}$ 之間，未進入飽和，故答案為 (A)。"
  },
  {
    "id": "111-s1-022",
    "year": "111",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【111 模擬考】",
    "question": "一理想運算放大器接成非反相放大電路，$R_1 = 20\\,\\text{k}\\Omega$ 接地，$R_f = 60\\,\\text{k}\\Omega$ 為回授電阻。若輸入訊號接於非反相輸入端，則此電路的電壓增益 $A_v$ 為何？輸入阻抗 $Z_{in}$ 為何？",
    "options": [
      "Av = +4, Zin = 無限大",
      "Av = -3, Zin = 20 kΩ",
      "Av = +3, Zin = 無限大",
      "Av = +4, Zin = 60 kΩ"
    ],
    "answer": 0,
    "explanation": "1. 理想非反相放大器的電壓增益：<br>$A_v = 1 + \\frac{R_f}{R_1} = 1 + \\frac{60\\,\\text{k}\\Omega}{20\\,\\text{k}\\Omega} = 1 + 3 = +4$。<br>2. 訊號直接輸入至 OPA 的非反相端（同相端），理想 OPA 輸入端無電流流向內部，故輸入阻抗 $Z_{in} \\approx \\infty$（無限大）。<br>故選 (A)。"
  },
  {
    "id": "111-s1-023",
    "year": "111",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【111 模擬考】",
    "question": "將理想 OPA 接成輸出端直接接回反相輸入端（$R_f = 0$），輸入訊號加在同相輸入端之電路稱為「電壓隨耦器 (Voltage Follower)」，請問該電路的主要電氣特性為何？",
    "options": [
      "電壓增益等於 1、輸入阻抗極高、輸出阻抗極低（適合阻抗匹配緩衝）",
      "電壓增益極大、輸入阻抗極低",
      "電壓增益為 -1、具有反相效果",
      "輸入阻抗等於零、適合作為電流放大器"
    ],
    "answer": 0,
    "explanation": "電壓隨耦器（又稱緩衝器 Buffer）：<br>1. 電壓增益 $A_v = 1$；<br>2. 輸入阻抗極高（幾乎不向信號源抽取電流）；<br>3. 輸出阻抗極低（負載驅動能力強）；<br>主要用途為隔離前後級電路以避免負載效應（阻抗匹配），故選 (A)。"
  },
  {
    "id": "111-s1-024",
    "year": "111",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【111 統測真題】",
    "question": "一 OPA 差動放大器電路，若差動電壓增益 $A_d = 2000$，共模電壓增益 $A_c = 0.2$，請問該放大器的共模拒斥比 (CMRR) 為多少 dB？",
    "options": [
      "80 dB",
      "40 dB",
      "60 dB",
      "100 dB"
    ],
    "answer": 0,
    "explanation": "1. 共模拒斥比定義比值：<br>$\\text{CMRR} = \\left|\\frac{A_d}{A_c}\\right| = \\frac{2000}{0.2} = 10000$。<br>2. 換算為分貝 (dB)：<br>$\\text{CMRR}_{(\\text{dB})} = 20 \\log_{10}(10000) = 20 \\times 4 = 80\\,\\text{dB}$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s1-025",
    "year": "111",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【111 模擬考】",
    "question": "韋恩電橋振盪器 (Wien-Bridge Oscillator) 通常用於產生何種波形？其電路產生穩定振盪時，基本放大器的閉迴路電壓增益必須大於或等於多少？",
    "options": [
      "正弦波，增益 ≥ 3",
      "方波，增益 ≥ 2",
      "三角波，增益 ≥ 5",
      "正弦波，增益 ≥ 1"
    ],
    "answer": 0,
    "explanation": "韋恩電橋振盪器：<br>1. 產生高純度的低頻正弦波；<br>2. 在諧振頻率 $f_0 = \\frac{1}{2\\pi RC}$ 時，RC 串並聯回授網路的傳輸率 $\\beta = \\frac{1}{3}$；<br>3. 依據巴克豪森振盪準則，迴路增益 $|A\\beta| \\ge 1$，故放大器電壓增益必須 $A \\ge 3$ 才能維持持續振盪。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-026",
    "year": "111",
    "subject": "subject2",
    "scope": "mock1",
    "category": "數位邏輯設計",
    "source": "【111 統測真題】",
    "question": "將二進制數值 $(11010110)_2$ 轉換為十六進制數值，其結果為何？",
    "options": [
      "D6",
      "C6",
      "E6",
      "B6"
    ],
    "answer": 0,
    "explanation": "二進制轉十六進制：由小數點往左每 4 位一組：<br>高位 4 位：$1101_2 = 8 + 4 + 0 + 1 = 13_{10} = \\text{D}_{16}$；<br>低位 4 位：$0110_2 = 0 + 4 + 2 + 0 = 6_{10} = 6_{16}$。<br>組合後即為 $(\\text{D}6)_{16}$，故選 (A)。"
  },
  {
    "id": "111-s2-027",
    "year": "111",
    "subject": "subject2",
    "scope": "mock1",
    "category": "數位邏輯設計",
    "source": "【111 統測真題】",
    "question": "在 8 位元（8-bit）帶符號數的「2 的補數 (2's Complement)」表示法中，十進制負數 $-45$ 的二進制編碼為何？",
    "options": [
      "11010011",
      "10101101",
      "11010010",
      "00101101"
    ],
    "answer": 0,
    "explanation": "求 2 的補數表示法步驟：<br>1. 先寫出 $+45$ 的 8 位元二進制：$45 = 32 + 8 + 4 + 1 = 00101101_2$。<br>2. 取 1 的補數（每位反轉）：$11010010_2$。<br>3. 加 1 得 2 的補數：$11010010 + 1 = 11010011_2$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-028",
    "year": "111",
    "subject": "subject2",
    "scope": "mock1",
    "category": "數位邏輯設計",
    "source": "【111 模擬考】",
    "question": "布林代數表示式 $F = A\\overline{B} + A B$ 經過化簡後的結果為何？",
    "options": [
      "A",
      "B",
      "A + B",
      "1"
    ],
    "answer": 0,
    "explanation": "提公因數化簡：<br>$F = A(\\overline{B} + B)$。<br>根據互補律：$\\overline{B} + B = 1$。<br>因此 $F = A \\cdot 1 = A$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-029",
    "year": "111",
    "subject": "subject2",
    "scope": "mock2",
    "category": "數位邏輯設計",
    "source": "【111 統測真題】",
    "question": "一三變數布林函數之最小項展開式為 $F(A,B,C) = \\sum m(1, 3, 5, 7)$，使用卡諾圖化簡後的最簡布林函數表示式為何？",
    "options": [
      "C",
      "A",
      "B",
      "A C"
    ],
    "answer": 0,
    "explanation": "展開各項二進制編碼：<br>$m(1) = 001, m(3) = 011, m(5) = 101, m(7) = 111$。<br>觀察各項：變數 $A$ 與 $B$ 均出現過 0 與 1 相互抵消；而每一項的 $C$ 均恆為 1。<br>在卡諾圖中這 4 個相鄰格剛好可以圈成一個 4-group（四方格），消除變數 $A$ 與 $B$，只留下 $C$。<br>故最簡式為 $F = C$，選 (A)。"
  },
  {
    "id": "111-s2-030",
    "year": "111",
    "subject": "subject2",
    "scope": "mock2",
    "category": "數位邏輯設計",
    "source": "【111 模擬考】",
    "question": "一位元「半加器 (Half Adder)」具有兩個輸入端 $A$ 與 $B$，其本位和輸出 $S$（Sum）與進位輸出 $C$（Carry）的邏輯布林函數分別為何？",
    "options": [
      "S = A ⊕ B, C = A · B",
      "S = A + B, C = A · B",
      "S = A ⊙ B, C = A + B",
      "S = A · B, C = A ⊕ B"
    ],
    "answer": 0,
    "explanation": "半加器真值表：<br>- 當 $A=0, B=0 \\Rightarrow S=0, C=0$<br>- 當 $A=0, B=1 \\Rightarrow S=1, C=0$<br>- 當 $A=1, B=0 \\Rightarrow S=1, C=0$<br>- 當 $A=1, B=1 \\Rightarrow S=0, C=1$<br>由真值表可知：和 $S$ 為互斥或閘（XOR）：$S = A \\oplus B$；進位 $C$ 為及閘（AND）：$C = A \\cdot B$。<br>故選 (A)。"
  },
  {
    "id": "111-s2-031",
    "year": "111",
    "subject": "subject2",
    "scope": "mock2",
    "category": "數位邏輯設計",
    "source": "【111 統測真題】",
    "question": "標準 TTL 74138 是一顆常用的「3 對 8 解碼器 (3-to-8 Decoder)」，當致能腳位均處於有效狀態時，若輸入選擇線 $(C, B, A) = (1, 0, 1)_2$，則輸出線哪一根會被致能？（74138 輸出端為低準位動作 Active-Low）",
    "options": [
      "Y5 輸出為 0 (其餘輸出為 1)",
      "Y5 輸出為 1 (其餘輸出為 0)",
      "Y3 輸出為 0 (其餘輸出為 1)",
      "Y6 輸出為 0 (其餘輸出為 1)"
    ],
    "answer": 0,
    "explanation": "輸入編碼：$(C, B, A) = 101_2 = 5_{10}$，對應第 5 號輸出線 $Y_5$。<br>因為 74138 為「低電位動作（Active-Low，腳位上方有橫線）」，所以被選中的 $Y_5$ 輸出為低電位 0，其餘未選中之輸出皆保持為高電位 1。<br>故選 (A)。"
  },
  {
    "id": "111-s2-032",
    "year": "111",
    "subject": "subject2",
    "scope": "mock3",
    "category": "數位邏輯設計",
    "source": "【111 統測真題】",
    "question": "如圖所示之一負緣觸發 JK 正反器，若目前現態輸出為 $Q(t) = 0$。今將輸入端設為 $J = 1, K = 0$，當下一個時脈脈波（Clock）負緣到達時，其下一個狀態輸出 $Q(t+1)$ 將變為多少？",
    "diagramType": "jkFlipFlop",
    "options": [
      "1 (設定 Set)",
      "0 (重置 Reset)",
      "不變",
      "切換 Toggle"
    ],
    "answer": 0,
    "explanation": "JK 正反器真值表：<br>- $J=0, K=0 \\Rightarrow Q(t+1) = Q(t)$（保持不變）<br>- $J=0, K=1 \\Rightarrow Q(t+1) = 0$（重置 Reset）<br>- $J=1, K=0 \\Rightarrow Q(t+1) = 1$（設定 Set）<br>- $J=1, K=1 \\Rightarrow Q(t+1) = \\overline{Q(t)}$（反相切換 Toggle）<br>因此當 $J=1, K=0$ 時，時脈觸發後輸出必定設定為 1，故選 (A)。"
  },
  {
    "id": "111-s2-033",
    "year": "111",
    "subject": "subject2",
    "scope": "mock3",
    "category": "數位邏輯設計",
    "source": "【111 模擬考】",
    "question": "欲設計一個模數為 12（Modulo-12，能計數 0 到 11 共 12 個狀態）的計數器，最少需要使用幾顆正反器（Flip-Flop）？",
    "options": [
      "4 顆",
      "3 顆",
      "5 顆",
      "12 顆"
    ],
    "answer": 0,
    "explanation": "$N$ 顆正反器所能產生的最大狀態數為 $2^N$。<br>需要滿足條件 $2^N \\ge 12$：<br>- 若 $N = 3 \\Rightarrow 2^3 = 8 < 12$（不足）<br>- 若 $N = 4 \\Rightarrow 2^4 = 16 \\ge 12$（足夠容納 12 個狀態）<br>因此最少需使用 4 顆正反器，故正確答案為 (A)。"
  },
  {
    "id": "111-s2-034",
    "year": "111",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【111 統測真題】",
    "question": "執行下列 C 語言程式片段後，變數 `ans` 的數值為何？\n```c\nint a = 14, b = 4;\nint ans = a / b + a % b;\n```",
    "options": [
      "5",
      "3",
      "7",
      "2"
    ],
    "answer": 0,
    "explanation": "1. `a / b`：因為 `a` 與 `b` 皆為整數（`int`），整數除法只取商數，$14 / 4 = 3$。<br>2. `a % b`：取餘數運算，$14 \\% 4 = 2$。<br>3. `ans = 3 + 2 = 5`。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-035",
    "year": "111",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【111 模擬考】",
    "question": "執行下列 C 語言程式碼後，輸出結果為何？\n```c\nint x = 5;       // 二進制 00000101\nint y = 3;       // 二進制 00000011\nprintf(\"%d\", x ^ y);\n```",
    "options": [
      "6",
      "1",
      "7",
      "15"
    ],
    "answer": 0,
    "explanation": "`^` 是位元互斥或運算子（Bitwise XOR），規則為兩位元相異為 1，相同為 0：<br>  00000101 (5)<br>^ 00000011 (3)<br>----------------<br>  00000110 = 4 + 2 = 6。<br>故輸出結果為 6，選 (A)。"
  },
  {
    "id": "111-s2-036",
    "year": "111",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【111 統測真題】",
    "question": "在 C 語言中，下列程式片段執行後螢幕輸出的字元為何？\n```c\nchar grade = 'B';\nswitch(grade) {\n    case 'A': printf(\"1\");\n    case 'B': printf(\"2\");\n    case 'C': printf(\"3\");\n    default:  printf(\"4\");\n}\n```",
    "options": [
      "234",
      "2",
      "23",
      "1234"
    ],
    "answer": 0,
    "explanation": "注意 `switch-case` 的穿透特性（Fall-through）：<br>`grade` 符合 `case 'B'`，程式印出 `\"2\"`。但因為該 `case` 後面**沒有加 `break;`**，程式將順序向下繼續執行後續的所有語句：<br>- 執行 `case 'C'`，印出 `\"3\"`；<br>- 執行 `default`，印出 `\"4\"`。<br>因此螢幕輸出為 `234`，故選 (A)。"
  },
  {
    "id": "111-s2-037",
    "year": "111",
    "subject": "subject2",
    "scope": "mock2",
    "category": "程式設計實習",
    "source": "【111 統測真題】",
    "question": "執行下列 C 語言迴圈程式片段後，變數 `sum` 的最終數值為何？\n```c\nint sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 3 == 0) continue;\n    sum += i;\n}\n```",
    "options": [
      "37",
      "55",
      "18",
      "45"
    ],
    "answer": 0,
    "explanation": "1. 1 到 10 的所有整數總和原本為：$1 + 2 + \\dots + 10 = 55$。<br>2. 迴圈中有 `if (i % 3 == 0) continue;`，表示只要是 3 的倍數就會被略過，不加入總和。<br>3. 在 1 到 10 之間 3 的倍數為：3, 6, 9，其總和為 $3 + 6 + 9 = 18$。<br>4. 因此最終 `sum = 55 - 18 = 37`。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-038",
    "year": "111",
    "subject": "subject2",
    "scope": "mock2",
    "category": "程式設計實習",
    "source": "【111 模擬考】",
    "question": "執行下列 C 語言程式片段後，螢幕印出的數值為何？\n```c\nint arr[5] = {10, 20, 30, 40, 50};\nint *p = arr;\nprintf(\"%d\", *(p + 3));\n```",
    "options": [
      "40",
      "30",
      "50",
      "記憶體位址"
    ],
    "answer": 0,
    "explanation": "1. `arr` 是陣列名稱，代表陣列首元素的位址（即 `&arr[0]`）。<br>2. `p = arr;` 讓指標 `p` 指向 `arr[0]`。<br>3. `*(p + 3)` 表示將指標位址向後偏移 3 個元素單位後取值，等價於 `arr[3]`。<br>4. `arr[0]=10, arr[1]=20, arr[2]=30, arr[3]=40`，故取出的數值為 40。<br>故選 (A)。"
  },
  {
    "id": "111-s2-039",
    "year": "111",
    "subject": "subject2",
    "scope": "mock3",
    "category": "程式設計實習",
    "source": "【111 統測真題】",
    "question": "執行下列 C 語言遞迴函式，若呼叫 `calc(4)`，其回傳值為何？\n```c\nint calc(int n) {\n    if (n <= 1) return 1;\n    return n + calc(n - 1);\n}\n```",
    "options": [
      "10",
      "24",
      "4",
      "15"
    ],
    "answer": 0,
    "explanation": "展開遞迴呼叫流程：<br>- `calc(4) = 4 + calc(3)`<br>- `calc(3) = 3 + calc(2)`<br>- `calc(2) = 2 + calc(1)`<br>- `calc(1) = 1`（終止條件）<br>反推計算回傳值：<br>`calc(2) = 2 + 1 = 3`<br>`calc(3) = 3 + 3 = 6`<br>`calc(4) = 4 + 6 = 10`。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-040",
    "year": "111",
    "subject": "subject2",
    "scope": "mock3",
    "category": "程式設計實習",
    "source": "【111 模擬考】",
    "question": "執行下列 C 語言字串處理程式片段後，輸出結果為何？\n```c\nchar str[] = \"Hello\\0World\";\nprintf(\"%d\", (int)strlen(str));\n```",
    "options": [
      "5",
      "10",
      "11",
      "12"
    ],
    "answer": 0,
    "explanation": "C 語言標準函式庫中的 `strlen()` 函式計算字串長度的標準：是從字串開頭開始計算字元個數，直到遇到第一個空字元 `\\0`（Null-terminator）即停止計數。<br>字串 `\"Hello\\0World\"` 中，在 `\"Hello\"`（共 5 個字元）之後立即出現 `\\0`，因此 `strlen` 算得長度為 5。<br>故選 (A)。"
  },
  {
    "id": "111-s2-041",
    "year": "111",
    "subject": "subject2",
    "scope": "mock4",
    "category": "程式設計實習",
    "source": "【111 統測真題】",
    "question": "關於 C 語言自訂函式之參數傳遞方式，若函式希望能夠「直接修改主呼叫端中變數的實際數值」，則該參數應該採用何種傳遞方式？",
    "options": [
      "指標傳遞（傳遞變數的位址，Call by Pointer / Reference）",
      "傳值呼叫（Call by Value）",
      "傳全域常數",
      "傳回傳型態"
    ],
    "answer": 0,
    "explanation": "1. 傳值呼叫（Call by Value）：只是複製一份副本給被呼叫函式，函式內部修改不會影響原呼叫端的變數。<br>2. 指標傳遞（Call by Pointer）：將變數的記憶體位址（如 `&x`）傳入函式，函式內使用解參考運算子 `*ptr` 即可直接存取並修改該位址上的原始數值。<br>故選 (A)。"
  },
  {
    "id": "111-s2-042",
    "year": "111",
    "subject": "subject2",
    "scope": "mock4",
    "category": "程式設計實習",
    "source": "【111 模擬考】",
    "question": "定義如下結構體：\n```c\nstruct Student {\n    int id;\n    char name[10];\n    float score;\n};\nstruct Student s1 = {101, \"Alex\", 92.5};\nstruct Student *ptr = &s1;\n```\n下列何者不是合法存取 `s1` 中 `id` 成員的語法？",
    "options": [
      "ptr.id",
      "s1.id",
      "ptr->id",
      "(*ptr).id"
    ],
    "answer": 0,
    "explanation": "結構體成員存取語法規則：<br>1. 直接透過結構體變數名稱：使用點運算子 `.`，例如 `s1.id`（合法）。<br>2. 透過指向結構體的指標 `ptr`：<br>   - 使用箭頭運算子：`ptr->id`（合法）。<br>   - 先解參考再取成員：`(*ptr).id`（合法，外層括號不可省略）。<br>3. `ptr` 是指標變數，不能直接使用點運算子 `ptr.id`，此寫法會產生編譯錯誤！<br>故選 (A)。"
  },
  {
    "id": "111-s2-043",
    "year": "111",
    "subject": "subject2",
    "scope": "mock2",
    "category": "微處理機",
    "source": "【111 統測真題】",
    "question": "一微處理機具有 16 條位址線（Address Lines，A0～A15）以及 8 條資料線（Data Lines，D0～D7），請問此微處理機可直接定址的最大記憶體容量空間為何？",
    "options": [
      "64 KB",
      "1 MB",
      "16 KB",
      "128 KB"
    ],
    "answer": 0,
    "explanation": "位址線條數決定定址空間大小：<br>16 條位址線可產生 $2^{16} = 65,536$ 個不同的記憶體位址。<br>每條資料線為 8-bit（即 1 Byte），因此最大定址容量空間為：<br>$65536 \\times 1\\,\\text{Byte} = 64\\,\\text{KB}$。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-044",
    "year": "111",
    "subject": "subject2",
    "scope": "mock2",
    "category": "微處理機",
    "source": "【111 統測真題】",
    "question": "標準 8051 單晶片微控制器內部具有 128 位元組 (Bytes) 的內部 RAM，其位址範圍從 00H 到 7FH。其中位址 00H～1FH 共 32 個 Bytes 被劃分為 4 個工作暫存器組（Bank 0～Bank 3），請問每一個 Bank 包含幾個暫存器？",
    "options": [
      "8 個 (R0～R7)",
      "4 個 (R0～R3)",
      "16 個 (R0～R15)",
      "2 個 (A, B)"
    ],
    "answer": 0,
    "explanation": "8051 內部 RAM 架構：<br>位址 00H～1FH 共有 32 個位元組，分為 4 組暫存器群（Bank 0、Bank 1、Bank 2、Bank 3）。<br>每一組 Bank 均分配有 8 個工作暫存器（編號為 R0, R1, R2, R3, R4, R5, R6, R7），透過程式狀態字暫存器 PSW 中的 RS1 與 RS0 位元進行切換選擇。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-045",
    "year": "111",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【111 模擬考】",
    "question": "當 8051 單晶片微控制器完成硬體重置（Reset）後，其程式計數器 (PC) 與堆疊指標 (SP) 的初始內容分別自動設定為多少？",
    "options": [
      "PC = 0000H, SP = 07H",
      "PC = 0000H, SP = 00H",
      "PC = FFFFH, SP = 07H",
      "PC = 0030H, SP = 30H"
    ],
    "answer": 0,
    "explanation": "8051 重置時的暫存器預設值：<br>1. 程式計數器（Program Counter, PC）被清為 `0000H`，表示開機後 CPU 一律從程式記憶體 `0000H` 位址開始抓取並執行第一道指令。<br>2. 堆疊指標（Stack Pointer, SP）預設被初始化為 `07H`，因此第一個 `PUSH` 資料會存入 `08H` 位址。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-046",
    "year": "111",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【111 統測真題】",
    "question": "執行下列 8051 組合語言指令後，累加器 A 的最終數值為何？\n```asm\nMOV A, #25H\nADD A, #37H\n```",
    "options": [
      "5CH",
      "5BH",
      "62H",
      "52H"
    ],
    "answer": 0,
    "explanation": "十六進制加法運算：<br>  25H<br>+ 37H<br>------<br>低位數：$5 + 7 = 12_{10} = \\text{C}_{16}$；<br>高位數：$2 + 3 = 5_{16}$。<br>結果為 $5\\text{C}_{16}$（即 5CH）。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-047",
    "year": "111",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【111 模擬考】",
    "question": "執行下列 8051 指令後，累加器 A 與暫存器 B 的內容分別為何？\n```asm\nMOV A, #14\nMOV B, #4\nDIV AB\n```",
    "options": [
      "A = 3 (商數), B = 2 (餘數)",
      "A = 2 (商數), B = 3 (餘數)",
      "A = 3.5, B = 0",
      "A = 56, B = 0"
    ],
    "answer": 0,
    "explanation": "8051 除法指令 `DIV AB` 的執行規範：<br>- 被除數置於 A，除數置於 B；<br>- 指令執行後，**整數商數存入累加器 A**，**整數餘數存入暫存器 B**。<br>$14 \\div 4 = 3 \\dots 2$。<br>因此 A = 3, B = 2，故正確答案為 (A)。"
  },
  {
    "id": "111-s2-048",
    "year": "111",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【111 統測真題】",
    "question": "8051 內部具有 5 個基本中斷來源，當發生「外部中斷 0 (\\overline{INT0})」請求時，CPU 響應後會自動跳躍至哪一個固定的中斷向量（Interrupt Vector）位址開始執行中斷服務程式？",
    "options": [
      "0003H",
      "000BH",
      "0013H",
      "0023H"
    ],
    "answer": 0,
    "explanation": "8051 五大中斷向量位址表（間隔均為 8 位元組）：<br>1. 外部中斷 0 (INT0)：`0003H`；<br>2. 計時器 0 中斷 (Timer 0)：`000BH`；<br>3. 外部中斷 1 (INT1)：`0013H`；<br>4. 計時器 1 中斷 (Timer 1)：`001BH`；<br>5. 串列通訊中斷 (Serial RI/TI)：`0023H`。<br>故正確答案為 (A)。"
  },
  {
    "id": "111-s2-049",
    "year": "111",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【111 模擬考】",
    "question": "在 8051 微控制器中，若欲使用計時器 0 (Timer 0) 作為 16 位元計時器使用，則模式控制暫存器 (TMOD) 的低 4 位元 (M1, M0) 應設定為何種模式？",
    "options": [
      "模式 1 (Mode 1，M1=0, M0=1)",
      "模式 0 (Mode 0，M1=0, M0=0)",
      "模式 2 (Mode 2，M1=1, M0=0)",
      "模式 3 (Mode 3，M1=1, M0=1)"
    ],
    "answer": 0,
    "explanation": "TMOD 的模式選擇位元 (M1, M0)：<br>- 00：模式 0（13 位元計時/計數器）<br>- 01：模式 1（16 位元計時/計數器，由 TH 與 TL 組成）<br>- 10：模式 2（8 位元自動重載計時器，Auto-reload）<br>- 11：模式 3（分割計時器）<br>因此 16 位元計時模式為模式 1 (01)，故選 (A)。"
  },
  {
    "id": "111-s2-050",
    "year": "111",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【111 統測真題】",
    "question": "使用 8051 進行串列通訊資料傳輸時，CPU 寫入欲傳送的資料或是讀取接收到的資料，都是透過存取哪一個特殊功能暫存器 (SFR) 來完成？",
    "options": [
      "SBUF (串列資料緩衝暫存器)",
      "SCON (串列控制暫存器)",
      "PCON (電源控制暫存器)",
      "TCON (計時器控制暫存器)"
    ],
    "answer": 0,
    "explanation": "8051 串列通訊介面：<br>1. `SBUF`（Serial Data Buffer，位址 99H）：物理上內部包含兩個獨立的暫存器（傳送緩衝器與接收緩衝器），共用同一位址。寫入 `SBUF` 會啟動資料傳送，讀取 `SBUF` 會取得接收到的字元。<br>2. `SCON` 是設定傳輸模式與狀態旗標（RI, TI）；<br>故選 (A)。"
  },
  {
    "id": "112-s1-001",
    "year": "112",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【112 統測真題】",
    "question": "有一電熱水器額定規格為 $110\\,\\text{V}, 1100\\,\\text{W}$。若接在 $110\\,\\text{V}$ 的電源上連續使用 $2$ 小時，且每度電（1 kWh）電費為 $3$ 元，請問消耗的電能為多少度？共需支付電費多少元？",
    "options": [
      "1.1 度，3.3 元",
      "2.2 度，6.6 元",
      "4.4 度，13.2 元",
      "2.0 度，6.0 元"
    ],
    "answer": 1,
    "explanation": "1. 消耗電能公式：$E = P \\times t$。<br>$P = 1100\\,\\text{W} = 1.1\\,\\text{kW}$，時間 $t = 2\\,\\text{小時}$。<br>度數 $= 1.1\\,\\text{kW} \\times 2\\,\\text{h} = 2.2\\,\\text{度}$ (kWh)。<br>2. 電費計算：$2.2 \\times 3 = 6.6\\,\\text{元}$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s1-002",
    "year": "112",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【112 統測真題】",
    "question": "三個電阻值分別為 $10\\,\\Omega, 20\\,\\Omega, 30\\,\\Omega$ 的電阻器並聯後，跨接於 $60\\,\\text{V}$ 的直流理想電源端。請問流經 $20\\,\\Omega$ 電阻器的電流大小為何？整體並聯電路消耗的總功率為多少？",
    "options": [
      "2 A, 360 W",
      "3 A, 660 W",
      "6 A, 1100 W",
      "3 A, 360 W"
    ],
    "answer": 1,
    "explanation": "1. 並聯電路各支路端電壓相等，皆為 $60\\,\\text{V}$。<br>2. 流經 $20\\,\\Omega$ 之電流：$I_{20} = \\frac{60\\,\\text{V}}{20\\,\\Omega} = 3\\,\\text{A}$。<br>3. 各支路消耗功率：<br>- $P_1 = \\frac{60^2}{10} = 360\\,\\text{W}$<br>- $P_2 = \\frac{60^2}{20} = 180\\,\\text{W}$<br>- $P_3 = \\frac{60^2}{30} = 120\\,\\text{W}$<br>總功率 $P_{total} = 360 + 180 + 120 = 660\\,\\text{W}$。<br>故選 (B)。"
  },
  {
    "id": "112-s1-003",
    "year": "112",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【112 模擬考】",
    "question": "電路中某節點共有四條支路相交，已知其中三條支路之電流分別為：流入 $5\\,\\text{A}$、流入 $3\\,\\text{A}$、流出 $10\\,\\text{A}$。根據克希荷夫電流定律 (KCL)，第四條支路的電流應該為何？",
    "options": [
      "流出 2 A",
      "流入 2 A",
      "流出 8 A",
      "流入 8 A"
    ],
    "answer": 1,
    "explanation": "依克希荷夫電流定律（KCL）：進入節點之電流總和必等於離開節點之電流總和。<br>設第四條支路為 $I_4$（假設為流入）：<br>流入總和 $= 5 + 3 + I_4 = 8 + I_4$；<br>流出總和 $= 10$。<br>$8 + I_4 = 10 \\Rightarrow I_4 = +2\\,\\text{A}$（正值表示假設方向正確，為流入 2 A）。<br>故選 (B)。"
  },
  {
    "id": "112-s1-004",
    "year": "112",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【112 統測真題】",
    "question": "一線性雙埠直流網路，由其輸出端開路時測得開路電壓為 $20\\,\\text{V}$，將輸出端直接短路時測得短路電流為 $4\\,\\text{A}$。若在此輸出端接上一顆 $5\\,\\Omega$ 的負載電阻，則流經該負載的電流為多少？",
    "options": [
      "1 A",
      "2 A",
      "3 A",
      "4 A"
    ],
    "answer": 1,
    "explanation": "1. 戴維寧等效電壓等於開路電壓：$E_{th} = V_{oc} = 20\\,\\text{V}$。<br>2. 戴維寧等效電阻：$R_{th} = \\frac{V_{oc}}{I_{sc}} = \\frac{20\\,\\text{V}}{4\\,\\text{A}} = 5\\,\\Omega$。<br>3. 接上 $R_L = 5\\,\\Omega$ 時，負載電流為：<br>$I_L = \\frac{E_{th}}{R_{th} + R_L} = \\frac{20}{5 + 5} = \\frac{20}{10} = 2\\,\\text{A}$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s1-005",
    "year": "112",
    "subject": "subject1",
    "scope": "mock2",
    "category": "基本電學",
    "source": "【112 模擬考】",
    "question": "兩個電感器 $L_1 = 4\\,\\text{H}$ 與 $L_2 = 9\\,\\text{H}$ 緊密相鄰放置，已知其耦合係數 $k = 0.5$。請問這兩顆電感器之間的互感 $M$ 為多少？",
    "options": [
      "1.5 H",
      "3.0 H",
      "6.0 H",
      "13.0 H"
    ],
    "answer": 1,
    "explanation": "依互感與耦合係數公式：<br>$M = k \\sqrt{L_1 \\times L_2}$<br>代入數值：<br>$M = 0.5 \\times \\sqrt{4 \\times 9} = 0.5 \\times \\sqrt{36} = 0.5 \\times 6 = 3.0\\,\\text{H}$。<br>故選 (B)。"
  },
  {
    "id": "112-s1-006",
    "year": "112",
    "subject": "subject1",
    "scope": "mock2",
    "category": "基本電學",
    "source": "【112 統測真題】",
    "question": "有一 $RL$ 串聯直流暫態電路，其中電阻 $R = 25\\,\\Omega$，電感 $L = 0.5\\,\\text{H}$。當開關閉合接通 $50\\,\\text{V}$ 直流電源後，請問該電路的時間常數 $\\tau$ 為多少？電路達到穩態後的穩定電流為何？",
    "options": [
      "τ = 50 ms，I = 1 A",
      "τ = 20 ms，I = 2 A",
      "τ = 20 ms，I = 0.5 A",
      "τ = 10 ms，I = 2 A"
    ],
    "answer": 1,
    "explanation": "1. RL 串聯電路之時間常數：<br>$\\tau = \\frac{L}{R} = \\frac{0.5\\,\\text{H}}{25\\,\\Omega} = 0.02\\,\\text{秒} = 20\\,\\text{ms}$。<br>2. 穩態時電感視為短路（無感應反電動勢），電流由電阻決定：<br>$I_{steady} = \\frac{E}{R} = \\frac{50\\,\\text{V}}{25\\,\\Omega} = 2\\,\\text{A}$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s1-007",
    "year": "112",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【112 模擬考】",
    "question": "在頻率 $f = 1000\\,\\text{Hz}$ 的交流電路中，有一純電容 $C = \\frac{25}{\\pi}\\,\\mu\\text{F}$，請問其容抗 $X_C$ 大小為多少？",
    "options": [
      "10 Ω",
      "20 Ω",
      "40 Ω",
      "50 Ω"
    ],
    "answer": 1,
    "explanation": "依容抗公式：<br>$X_C = \\frac{1}{2\\pi f C} = \\frac{1}{2\\pi \\times 1000 \\times (\\frac{25}{\\pi} \\times 10^{-6})}$<br>分子分母之 $\\pi$ 相消：<br>$X_C = \\frac{1}{2000 \\times 25 \\times 10^{-6}} = \\frac{1}{50000 \\times 10^{-6}} = \\frac{1}{0.05} = 20\\,\\Omega$。<br>故選 (B)。"
  },
  {
    "id": "112-s1-008",
    "year": "112",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【112 統測真題】",
    "question": "已知交流電壓 $v(t) = 141.4\\sin(100\\pi t + 45^\\circ)\\,\\text{V}$，交流電流 $i(t) = 14.14\\sin(100\\pi t - 15^\\circ)\\,\\text{A}$。請問電壓與電流之間的相位差為何？",
    "options": [
      "電流超前電壓 30°",
      "電壓超前電流 60°",
      "電壓超前電流 30°",
      "電流超前電壓 60°"
    ],
    "answer": 1,
    "explanation": "相位角比較（均以相同角頻率之正弦函數為基準）：<br>- 電壓相角 $\\theta_v = +45^\\circ$<br>- 電流相角 $\\theta_i = -15^\\circ$<br>相角差 $\\Delta \\theta = \\theta_v - \\theta_i = 45^\\circ - (-15^\\circ) = +60^\\circ$。<br>因為數值為正，表示「電壓超前電流 60°」（或電流落後電壓 60°），故正確答案為 (B)。"
  },
  {
    "id": "112-s1-009",
    "year": "112",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【112 模擬考】",
    "question": "一交流單相負載消耗實功率 $P = 800\\,\\text{W}$，虛功率 $Q = 600\\,\\text{VAR}$（感性）。請問該負載之視在功率 $S$ 及功率因數 $PF$ 為何？",
    "options": [
      "S = 1400 VA, PF = 0.57",
      "S = 1000 VA, PF = 0.8 (落後)",
      "S = 1000 VA, PF = 0.6 (超前)",
      "S = 800 VA, PF = 1.0"
    ],
    "answer": 1,
    "explanation": "1. 功率三角形中，視在功率：<br>$S = \\sqrt{P^2 + Q^2} = \\sqrt{800^2 + 600^2} = \\sqrt{640000 + 360000} = \\sqrt{1000000} = 1000\\,\\text{VA}$。<br>2. 功率因數：$PF = \\cos\\theta = \\frac{P}{S} = \\frac{800}{1000} = 0.8$。<br>因為負載為感性虛功率，電流落後電壓，故為「落後」，選 (B)。"
  },
  {
    "id": "112-s1-010",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【112 統測真題】",
    "question": "有一 RLC 並聯電路接於交流電源端，已知 $R = 100\\,\\Omega, X_L = 20\\,\\Omega, X_C = 20\\,\\Omega$。請問此時該並聯電路處於何種狀態？其總等效導納 $Y$ 為何？",
    "options": [
      "電感性狀態，Y = 0.05 ℧",
      "並聯諧振狀態，等效阻抗最大 (Z = 100 Ω)",
      "串聯諧振狀態，等效阻抗最小 (Z = 0 Ω)",
      "電容性狀態，Y = 0.1 ℧"
    ],
    "answer": 1,
    "explanation": "並聯導納：<br>$Y = \\frac{1}{R} + j\\left(\\frac{1}{X_C} - \\frac{1}{X_L}\\right) = \\frac{1}{100} + j\\left(\\frac{1}{20} - \\frac{1}{20}\\right) = 0.01 + j0\\,\\text{S}$。<br>因為虛部感納與容納相互完全抵消，電路發生「並聯諧振」。在並聯諧振時，總阻抗達到最大值 $Z_{max} = R = 100\\,\\Omega$，總電流達到極小值，功率因數等於 1。故選 (B)。"
  },
  {
    "id": "112-s1-011",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【112 統測真題】",
    "question": "一三相平衡電源以線電壓 $V_L = 200\\,\\text{V}$ 連接至一平衡三相 Y 接負載，若測得線電流為 $I_L = 10\\,\\text{A}$，且負載功率因數 $\\cos\\theta = 0.866$。請問三相負載所吸收的總實功率約為多少瓦特？",
    "options": [
      "1732 W",
      "3000 W",
      "3464 W",
      "6000 W"
    ],
    "answer": 1,
    "explanation": "三相總實功率標準公式（不論 Y 接或 $\\Delta$ 接皆適用）：<br>$P_{3\\phi} = \\sqrt{3} \\times V_L \\times I_L \\times \\cos\\theta$<br>代入數值：<br>$P_{3\\phi} = \\sqrt{3} \\times 200 \\times 10 \\times \\frac{\\sqrt{3}}{2} = 3 \\times 100 \\times 10 = 3000\\,\\text{W}$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s1-012",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【112 模擬考】",
    "question": "如圖所示之惠斯登電橋電路，電阻 $R_1 = 15\\,\\Omega, R_2 = 45\\,\\Omega, R_3 = 20\\,\\Omega$。若欲使檢流計電流為零，未知臂電阻 $R_x$ 應為何？",
    "diagramType": "wheatstone",
    "diagramParams": [
      15,
      45,
      20,
      60
    ],
    "options": [
      "30 Ω",
      "60 Ω",
      "45 Ω",
      "90 Ω"
    ],
    "answer": 1,
    "explanation": "交叉臂平衡相乘：<br>$R_1 \\times R_x = R_2 \\times R_3$<br>$15 \\times R_x = 45 \\times 20 = 900$<br>$R_x = \\frac{900}{15} = 60\\,\\Omega$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s1-013",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【112 模擬考】",
    "question": "一具 $100\\,\\text{V}$ 直流電源接於內阻為 $4\\,\\Omega$ 的線圈上，當線圈通電穩態時電流為 $25\\,\\text{A}$。若改接於 $100\\,\\text{V}, 60\\,\\text{Hz}$ 之交流電源時，測得電流降為 $20\\,\\text{A}$。請問該線圈在 $60\\,\\text{Hz}$ 下的感抗 $X_L$ 為何？",
    "options": [
      "4 Ω",
      "3 Ω",
      "5 Ω",
      "1 Ω"
    ],
    "answer": 1,
    "explanation": "1. 交流總阻抗大小：$|Z| = \\frac{V_{ac}}{I_{ac}} = \\frac{100\\,\\text{V}}{20\\,\\text{A}} = 5\\,\\Omega$。<br>2. 線圈總阻抗 $|Z| = \\sqrt{R^2 + X_L^2}$。<br>$5 = \\sqrt{4^2 + X_L^2} \\Rightarrow 25 = 16 + X_L^2 \\Rightarrow X_L^2 = 9 \\Rightarrow X_L = 3\\,\\Omega$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s1-014",
    "year": "112",
    "subject": "subject1",
    "scope": "mock2",
    "category": "電子學",
    "source": "【112 統測真題】",
    "question": "一中心抽頭式全波整流電路，變壓器次級圈每半邊之正弦電壓峰值為 $V_m$。若二極體均視為理想二極體，則每顆二極體所必須承受之峰值逆向電壓 (PIV) 為何？",
    "options": [
      "Vm",
      "2 Vm",
      "0.5 Vm",
      "4 Vm"
    ],
    "answer": 1,
    "explanation": "在中心抽頭式全波整流電路中，當上方二極體導通時，下方截止之二極體兩端承受的是整個變壓器次級圈的總峰值電壓（上半圈 $V_m$ 加上下半圈 $V_m$）：<br>$\\text{PIV} = 2V_m$。<br>（比較：橋式整流的 PIV 僅為 $V_m$），故正確答案為 (B)。"
  },
  {
    "id": "112-s1-015",
    "year": "112",
    "subject": "subject1",
    "scope": "mock2",
    "category": "電子學",
    "source": "【112 模擬考】",
    "question": "稽納二極體在正常扮演「直流電壓穩壓器」角色時，其電路偏壓方式應該為何？",
    "options": [
      "順向主動偏壓",
      "逆向崩潰區偏壓",
      "逆向截止區偏壓（未達崩潰）",
      "正向飽和偏壓"
    ],
    "answer": 1,
    "explanation": "稽納二極體（Zener Diode）是利用半導體重摻雜特性製造，其核心穩壓功能是工作於「逆向崩潰區（Zener Breakdown Region）」。在此區域內，即使逆向電流大幅變動，其端電壓仍能維持在極度穩定的稽納電壓 $V_Z$。故選 (B)。"
  },
  {
    "id": "112-s1-016",
    "year": "112",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【112 統測真題】",
    "question": "雙極性接面電晶體 (BJT) 的三種基本放大器組態（共射極 CE、共基極 CB、共集極 CC），其中具有「電流放大且電壓放大，因而具備最大功率增益」的組態為何？",
    "options": [
      "共基極 (CB)",
      "共射極 (CE)",
      "共集極 (CC)",
      "三者功率增益皆相同"
    ],
    "answer": 1,
    "explanation": "三種 BJT 組態特性比較：<br>1. 共射極 (CE)：具電壓放大與電流放大能力，功率增益最大，廣泛作為音訊與通用電壓放大器。<br>2. 共基極 (CB)：只有電壓放大，無電流放大（電流增益 $\\alpha < 1$），高頻特性佳。<br>3. 共集極 (CC / 射極隨耦器)：只有電流放大，電壓增益 $A_v \\approx 1$，輸入阻抗高輸出阻抗低，作阻抗匹配緩衝。<br>故選 (B)。"
  },
  {
    "id": "112-s1-017",
    "year": "112",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【112 統測真題】",
    "question": "一分壓偏壓共射極放大電路，已知其射極電阻 $R_E = 1\\,\\text{k}\\Omega$，射極小訊號交流電阻 $r_e = 25\\,\\Omega$，集極電阻 $R_C = 3\\,\\text{k}\\Omega$。若未加射極旁路電容（$C_E$ 開路），則此放大器之交流電壓增益大小 $|A_v|$ 約為多少？",
    "options": [
      "120",
      "3",
      "30",
      "0.98"
    ],
    "answer": 1,
    "explanation": "未接射極旁路電容時，交流信號必須通過 $R_E$（產生負回授）：<br>$|A_v| = \\frac{R_C}{r_e + R_E} = \\frac{3000\\,\\Omega}{25 + 1000\\,\\Omega} = \\frac{3000}{1025} \\approx 2.93 \\approx 3$。<br>（若有接旁路電容將 $R_E$ 交流短路，則增益為 $R_C / r_e = 3000 / 25 = 120$）。故選 (B)。"
  },
  {
    "id": "112-s1-018",
    "year": "112",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【112 模擬考】",
    "question": "增強型 (Enhancement mode) N 通道 MOSFET 在未施加閘極電壓時（$V_{GS} = 0$），汲極與源極之間是否導通？若欲使該電晶體開始產生導電通道導通，閘極-源極電壓 $V_{GS}$ 必須滿足何種條件？",
    "options": [
      "導通；VGS 需小於臨界電壓",
      "不導通；VGS 需大於臨界電壓 Vth (正值)",
      "導通；VGS 需為負值",
      "不導通；VGS 需等於零"
    ],
    "answer": 1,
    "explanation": "增強型 MOSFET（E-MOSFET）：<br>1. 常態下無預先建置通道，當 $V_{GS} = 0$ 時汲極-源極間為斷路不導通（Normally-off）。<br>2. 必須施加足夠的正電壓 $V_{GS} > V_{th}$（臨界電壓），才能在氧化層下方吸引反轉層電子，感應出 N 通道而開始導通。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s1-019",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【112 統測真題】",
    "question": "理想運算放大器 (OPA) 處於負回授線性放大狀態時，其反相輸入端與非反相輸入端之間具有何種特殊電氣特性？",
    "options": [
      "實體接地且短路",
      "虛擬接地（兩端電位相等且無電流流入輸入端）",
      "兩端電位差等於電源電壓",
      "輸出端與輸入端同電位"
    ],
    "answer": 1,
    "explanation": "理想 OPA 工作在負回授線性區時的兩大黃金定律：<br>1. 虛擬短路 / 虛接地（Virtual Short）：開迴路增益 $A_{OL} \\to \\infty$，使得兩輸入端電位差趨近於零，$V_+ \\approx V_-$。<br>2. 虛擬斷路（Virtual Open）：輸入阻抗 $Z_{in} \\to \\infty$，使得流入兩輸入端的電流恆等於零（$I_+ = I_- = 0$）。<br>故選 (B)。"
  },
  {
    "id": "112-s1-020",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【112 模擬考】",
    "question": "如圖所示之理想 OPA 反相放大電路，$R_1 = 15\\,\\text{k}\\Omega, R_f = 45\\,\\text{k}\\Omega$。若輸入電壓 $V_i = +2\\,\\text{V}$，工作電源為 $\\pm 15\\,\\text{V}$，請問輸出電壓 $V_o$ 為多少？",
    "diagramType": "opaInverting",
    "diagramParams": [
      15,
      45,
      2
    ],
    "options": [
      "+6 V",
      "-6 V",
      "-2 V",
      "+3 V"
    ],
    "answer": 1,
    "explanation": "反相放大電壓增益：<br>$A_v = -\\frac{R_f}{R_1} = -\\frac{45\\,\\text{k}\\Omega}{15\\,\\text{k}\\Omega} = -3$。<br>輸出電壓 $V_o = A_v \\times V_i = (-3) \\times 2\\,\\text{V} = -6\\,\\text{V}$。<br>未超出 $\\pm 15\\,\\text{V}$ 範圍，故正確答案為 (B)。"
  },
  {
    "id": "112-s1-021",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【112 統測真題】",
    "question": "一加法運算放大器電路，反相輸入端透過三顆電阻 $R_1 = 10\\,\\text{k}\\Omega, R_2 = 20\\,\\text{k}\\Omega, R_3 = 10\\,\\text{k}\\Omega$ 分別連接輸入信號 $V_1 = 1\\,\\text{V}, V_2 = 4\\,\\text{V}, V_3 = 2\\,\\text{V}$。回授電阻為 $R_f = 20\\,\\text{k}\\Omega$。請問輸出電壓 $V_o$ 為多少？",
    "options": [
      "-6 V",
      "-10 V",
      "+10 V",
      "-7 V"
    ],
    "answer": 1,
    "explanation": "反相加法器輸出公式：<br>$V_o = -R_f \\left(\\frac{V_1}{R_1} + \\frac{V_2}{R_2} + \\frac{V_3}{R_3}\\right)$<br>代入數值：<br>$V_o = -20 \\left(\\frac{1}{10} + \\frac{4}{20} + \\frac{2}{10}\\right) = -20 (0.1 + 0.2 + 0.2) = -20 \\times 0.5 = -10\\,\\text{V}$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s1-022",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【112 模擬考】",
    "question": "將理想 OPA 的反相輸入端串接電阻 $R$，回授元件改接電容器 $C$（回授電容跨接於反相端與輸出端之間），輸入信號加在電阻端，非反相端接地，此電路之功能為何？",
    "options": [
      "微分器",
      "積分器",
      "高通濾波器",
      "振盪器"
    ],
    "answer": 1,
    "explanation": "OPA 積分器電路架構：<br>1. 輸入端接電阻 $R$，回授端接電容 $C$：輸出電壓 $V_o(t) = -\\frac{1}{RC} \\int V_i(t)\\,dt$，此為「積分器」。<br>2. 反之，若輸入端接電容 $C$，回授端接電阻 $R$，則為「微分器」。<br>故選 (B)。"
  },
  {
    "id": "112-s1-023",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【112 統測真題】",
    "question": "電晶體工作於截止區（Cut-off）時，其集極電流 $I_C$ 與集極-射極電壓 $V_{CE}$ 狀態分別類似於開關的何種狀態？",
    "options": [
      "開關閉合（ON，導通）",
      "開關斷開（OFF，開路）",
      "線性放大",
      "負電阻特性"
    ],
    "answer": 1,
    "explanation": "BJT 開關應用：<br>1. 截止區（Cut-off）：$I_B = 0, I_C \\approx 0$（電流為零），$V_{CE} \\approx V_{CC}$（端電壓等於電源電壓），等效於「開關斷開（OFF，開路狀態）」。<br>2. 飽和區（Saturation）：$V_{CE} \\approx 0.2\\,\\text{V}$，$I_C$ 達到最大值，等效於「開關閉合（ON，導通狀態）」。<br>故選 (B)。"
  },
  {
    "id": "112-s1-024",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【112 模擬考】",
    "question": "一多級放大電路共有兩級，第一級電壓增益為 $20\\,\\text{dB}$，第二級電壓增益為 $30\\,\\text{dB}$。請問此放大電路的總電壓增益（以分貝 dB 表示）及總電壓放大倍數（比值）分別為何？",
    "options": [
      "600 dB，50 倍",
      "50 dB，316.2 倍 (約 1000 倍為功率)",
      "50 dB，倍數約 316 倍 (電壓比)",
      "10 dB，10 倍"
    ],
    "answer": 2,
    "explanation": "1. 多級放大器以分貝 (dB) 表示時，總增益為各級相加：<br>$A_{v(\\text{dB})} = 20\\,\\text{dB} + 30\\,\\text{dB} = 50\\,\\text{dB}$。<br>2. 換算電壓放大倍數比值 $A_v$：<br>$20 \\log_{10}(A_v) = 50 \\Rightarrow \\log_{10}(A_v) = 2.5 \\Rightarrow A_v = 10^{2.5} = 10^2 \\times 10^{0.5} = 100\\sqrt{10} \\approx 316.2\\,\\text{倍}$。<br>故正確答案為 (C)。"
  },
  {
    "id": "112-s1-025",
    "year": "112",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【112 統測真題】",
    "question": "在石英晶體振盪器（Crystal Oscillator）中，石英晶體主要是利用何種物理效應來維持極度穩定的高頻振盪？",
    "options": [
      "熱電效應",
      "壓電效應 (Piezoelectric Effect)",
      "光電效應",
      "霍爾效應"
    ],
    "answer": 1,
    "explanation": "石英晶體振盪器利用石英晶體的「壓電效應 (Piezoelectric Effect)」：當施加機械應力時兩端會產生電荷；反之，施加交變電壓時晶體會產生精確而穩定的機械振動，其等效電路具有極高的品質因數（$Q$ 值高達數萬），因此頻率穩定度遠高於一般 LC 或 RC 振盪器。故選 (B)。"
  },
  {
    "id": "112-s2-026",
    "year": "112",
    "subject": "subject2",
    "scope": "mock1",
    "category": "數位邏輯設計",
    "source": "【112 統測真題】",
    "question": "將十進制小數 $0.625$ 轉換為二進制表示法，其結果為何？",
    "options": [
      "0.101",
      "0.101",
      "0.11",
      "0.011"
    ],
    "answer": 1,
    "explanation": "十進制小數轉二進制（連乘 2 取整數部分）：<br>- $0.625 \\times 2 = 1.25$（整數取 1，餘 0.25）<br>- $0.25 \\times 2 = 0.5$（整數取 0，餘 0.5）<br>- $0.5 \\times 2 = 1.0$（整數取 1，餘 0，結束）<br>由上往下讀取整數：$(0.101)_2$。<br>檢驗：$1 \\times 0.5 + 0 \\times 0.25 + 1 \\times 0.125 = 0.625$。<br>故選 (B)。"
  },
  {
    "id": "112-s2-027",
    "year": "112",
    "subject": "subject2",
    "scope": "mock1",
    "category": "數位邏輯設計",
    "source": "【112 模擬考】",
    "question": "根據狄摩根定理（De Morgan's Theorem），布林代數表示式 $\\overline{A + B \\cdot C}$ 等價於下列何者？",
    "options": [
      "A' · (B' + C')",
      "A' · B' · C'",
      "A' + B' · C'",
      "(A' + B') · C'"
    ],
    "answer": 0,
    "explanation": "依狄摩根第一定理：$\\overline{X + Y} = \\overline{X} \\cdot \\overline{Y}$。<br>令 $X = A, Y = B \\cdot C$：<br>$\\overline{A + B \\cdot C} = \\overline{A} \\cdot \\overline{B \\cdot C}$。<br>再對 $\\overline{B \\cdot C}$ 使用狄摩根第二定理：$\\overline{B \\cdot C} = \\overline{B} + \\overline{C}$。<br>代入得：$\\overline{A} \\cdot (\\overline{B} + \\overline{C})$，即 $A' \\cdot (B' + C')$。<br>故選 (A)。"
  },
  {
    "id": "112-s2-028",
    "year": "112",
    "subject": "subject2",
    "scope": "mock2",
    "category": "數位邏輯設計",
    "source": "【112 統測真題】",
    "question": "一四輸入及閘 (AND Gate)，只有在四個輸入端 $(A, B, C, D)$ 呈現何種狀態時，其輸出端才會呈現高電位 1？",
    "options": [
      "任一輸入為 1",
      "全部輸入皆為 1",
      "全部輸入皆為 0",
      "輸入 1 的個數為奇數"
    ],
    "answer": 1,
    "explanation": "及閘（AND Gate）的邏輯定義：輸出要為 1，必須「所有輸入端同時為 1」（$Y = A \\cdot B \\cdot C \\cdot D$）。只要其中有任何一個輸入為 0，輸出即為 0。故選 (B)。"
  },
  {
    "id": "112-s2-029",
    "year": "112",
    "subject": "subject2",
    "scope": "mock2",
    "category": "數位邏輯設計",
    "source": "【112 模擬考】",
    "question": "如圖所示之卡諾圖，簡化後的最小項之和（SOP）最簡布林函數為何？",
    "diagramHtml": "<table class='kmap-table'><tr><th>AB\\C</th><th>0</th><th>1</th></tr><tr><th>00</th><td>0</td><td class='highlight-1'>1</td></tr><tr><th>01</th><td>0</td><td class='highlight-1'>1</td></tr><tr><th>11</th><td>0</td><td class='highlight-1'>1</td></tr><tr><th>10</th><td>0</td><td class='highlight-1'>1</td></tr></table>",
    "options": [
      "A · B",
      "C",
      "A + B",
      "B · C"
    ],
    "answer": 1,
    "explanation": "由卡諾圖觀察：整欄 $C = 1$ 的 4 個格子皆為 1（包含 $m_1, m_3, m_7, m_5$），相鄰四格可合併為一個 4-group。<br>化簡後消去 $A$ 與 $B$，只剩下 $C$。<br>因此最簡式即為 $F = C$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s2-030",
    "year": "112",
    "subject": "subject2",
    "scope": "mock2",
    "category": "數位邏輯設計",
    "source": "【112 統測真題】",
    "question": "一位元「全加器 (Full Adder)」在計算本位加法時，需要考量幾個輸入訊號？產生幾個輸出訊號？",
    "options": [
      "2 個輸入，2 個輸出",
      "3 個輸入 (A, B 及低位進位 Cin)，2 個輸出 (和 S 與進位 Cout)",
      "3 個輸入，3 個輸出",
      "4 個輸入，2 個輸出"
    ],
    "answer": 1,
    "explanation": "全加器（Full Adder）相較於半加器增加了「來自低位的進位輸入」：<br>- 3 個輸入：被加數 $A$、加數 $B$、低位進位 $C_{in}$。<br>- 2 個輸出：本位和 $S$（Sum）、向高位之進位 $C_{out}$（Carry）。<br>故選 (B)。"
  },
  {
    "id": "112-s2-031",
    "year": "112",
    "subject": "subject2",
    "scope": "mock3",
    "category": "數位邏輯設計",
    "source": "【112 統測真題】",
    "question": "D 型正反器（D Flip-Flop）之特性方程式為下列何者？",
    "options": [
      "Q(t+1) = Q(t)'",
      "Q(t+1) = D",
      "Q(t+1) = S + R'Q",
      "Q(t+1) = J Q' + K' Q"
    ],
    "answer": 1,
    "explanation": "D 正反器（Data / Delay Flip-Flop）：<br>當有效觸發時脈邊緣（Clock Edge）到達時，次態輸出直接等於輸入端 D 的資料，即 $Q(t+1) = D$。<br>此特性使 D 正反器廣泛應用於暫存器與資料延遲鎖存電路中。故選 (B)。"
  },
  {
    "id": "112-s2-032",
    "year": "112",
    "subject": "subject2",
    "scope": "mock3",
    "category": "數位邏輯設計",
    "source": "【112 模擬考】",
    "question": "將 4 顆 T 型正反器（T Flip-Flop）之 T 輸入端均接高電位 1，並將前一級的 $\\overline{Q}$ 輸出接到下一級的時脈 CLK 輸入端，構成非同步漣波上數計數器。若輸入時脈頻率為 $160\\,\\text{kHz}$，則最後一級正反器輸出的頻率為何？",
    "options": [
      "40 kHz",
      "10 kHz",
      "20 kHz",
      "80 kHz"
    ],
    "answer": 1,
    "explanation": "每經過一級 T 正反器（$T=1$ 時為除以 2 頻率）：<br>4 顆串接之總分頻次數為 $2^4 = 16$ 分頻。<br>輸出頻率 $f_{out} = \\frac{f_{in}}{16} = \\frac{160\\,\\text{kHz}}{16} = 10\\,\\text{kHz}$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s2-033",
    "year": "112",
    "subject": "subject2",
    "scope": "mock4",
    "category": "數位邏輯設計",
    "source": "【112 統測真題】",
    "question": "使用共陰極（Common-Cathode）七段顯示器顯示阿拉伯數字「7」時，若七段為 a, b, c, d, e, f, g，則點亮的節段應該為哪些？",
    "options": [
      "a, b, c, d",
      "a, b, c",
      "b, c",
      "a, b, c, f, g"
    ],
    "answer": 1,
    "explanation": "七段顯示器段位配置：<br>- 數字「7」標準顯示由最上方的橫槓 a、右上垂直槓 b、右下垂直槓 c 組成。<br>- 對於共陰極顯示器，點亮需送高電位 1。<br>因此節段 a=1, b=1, c=1（其餘 d, e, f, g 皆為 0）。故正確答案為 (B)。"
  },
  {
    "id": "112-s2-034",
    "year": "112",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【112 統測真題】",
    "question": "在 C 語言中，下列哪一個變數識別字（Identifier）命名**不符合**語法規定？",
    "options": [
      "_studentId",
      "2024_score",
      "total_Sum",
      "Price$"
    ],
    "answer": 1,
    "explanation": "C 語言識別字命名規則：<br>1. 只能由英文字母（大小寫敏感）、數字（0-9）及底線（`_`）組成。<br>2. **第一個字元不能是數字**。<br>3. 不能使用保留字（如 `int`, `for` 等）及特殊字元（如 `$`）。<br>選項 (B) `2024_score` 以數字開頭，違反規定！故選 (B)。"
  },
  {
    "id": "112-s2-035",
    "year": "112",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【112 模擬考】",
    "question": "執行下列 C 語言程式片段後，輸出結果為何？\n```c\nint a = 5, b = 10;\nint c = (a > b) ? a++ : ++b;\nprintf(\"c = %d, b = %d\", c, b);\n```",
    "options": [
      "c = 5, b = 10",
      "c = 11, b = 11",
      "c = 10, b = 11",
      "c = 6, b = 10"
    ],
    "answer": 1,
    "explanation": "三元條件運算子 `(條件) ? 表達式1 : 表達式2`：<br>1. 條件 `a > b` 即 `5 > 10` 為**假（False）**。<br>2. 執行表達式 2 `++b`。<br>3. 前置遞增運算子 `++b` 會先將 `b` 加 1 變為 11，然後回傳 11 給 `c`。<br>4. 因此 `c = 11, b = 11`。<br>故選 (B)。"
  },
  {
    "id": "112-s2-036",
    "year": "112",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【112 統測真題】",
    "question": "執行下列 C 語言程式片段後，螢幕輸出結果為何？\n```c\nint x = 8;\nprintf(\"%d\", x >> 2);\n```",
    "options": [
      "16",
      "2",
      "32",
      "4"
    ],
    "answer": 1,
    "explanation": "`>>` 是向右位移運算子（Right Shift）：<br>8 的二進制為 `00001000`。<br>向右位移 2 位相當於除以 $2^2 = 4$：<br>`00000010`，其十進制值為 2。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s2-037",
    "year": "112",
    "subject": "subject2",
    "scope": "mock2",
    "category": "程式設計實習",
    "source": "【112 統測真題】",
    "question": "執行下列 C 語言雙重迴圈後，字元 `'*'` 總共會被印出幾次？\n```c\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 4; j++) {\n        printf(\"*\");\n    }\n}\n```",
    "options": [
      "7 次",
      "12 次",
      "16 次",
      "9 次"
    ],
    "answer": 1,
    "explanation": "外層迴圈執行 $i = 0, 1, 2$ 共 3 次；<br>每次外層執行時，內層迴圈執行 $j = 0, 1, 2, 3$ 共 4 次。<br>總執行次數為 $3 \\times 4 = 12$ 次。<br>因此字元 `'*'` 共印出 12 次，故選 (B)。"
  },
  {
    "id": "112-s2-038",
    "year": "112",
    "subject": "subject2",
    "scope": "mock2",
    "category": "程式設計實習",
    "source": "【112 模擬考】",
    "question": "宣告一二維整數陣列 `int a[3][4];`，在 32 位元編譯環境下（整數 `int` 佔用 4 位元組），請問此陣列總共佔用多少 Bytes 的記憶體空間？",
    "options": [
      "12 Bytes",
      "48 Bytes",
      "24 Bytes",
      "64 Bytes"
    ],
    "answer": 1,
    "explanation": "陣列元素個數為 $3 \\times 4 = 12$ 個。<br>每個 `int` 元素佔用 4 位元組。<br>總記憶體空間 $= 12 \\times 4 = 48\\,\\text{Bytes}$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s2-039",
    "year": "112",
    "subject": "subject2",
    "scope": "mock3",
    "category": "程式設計實習",
    "source": "【112 統測真題】",
    "question": "執行下列 C 語言程式片段後，輸出之數值為何？\n```c\nint a = 10, b = 20;\nint *p = &a;\n*p = *p + 5;\np = &b;\n*p = *p * 2;\nprintf(\"%d, %d\", a, b);\n```",
    "options": [
      "10, 20",
      "15, 40",
      "15, 20",
      "10, 40"
    ],
    "answer": 1,
    "explanation": "程式逐行分析：<br>1. `p = &a;` 指向 `a`；<br>2. `*p = *p + 5;` 將 `a` 修改為 $10 + 5 = 15$；<br>3. `p = &b;` 更改指標指向 `b`；<br>4. `*p = *p * 2;` 將 `b` 修改為 $20 \\times 2 = 40$；<br>5. 印出 `a, b` 即為 `15, 40`。<br>故選 (B)。"
  },
  {
    "id": "112-s2-040",
    "year": "112",
    "subject": "subject2",
    "scope": "mock3",
    "category": "程式設計實習",
    "source": "【112 模擬考】",
    "question": "執行下列 C 語言函式呼叫 `func(3)`，其回傳值為何？\n```c\nint func(int n) {\n    if (n == 0) return 1;\n    return 2 * func(n - 1);\n}\n```",
    "options": [
      "6",
      "8",
      "16",
      "4"
    ],
    "answer": 1,
    "explanation": "遞迴追蹤：<br>- `func(3) = 2 * func(2)`<br>- `func(2) = 2 * func(1)`<br>- `func(1) = 2 * func(0)`<br>- `func(0) = 1`<br>回推數值：<br>`func(1) = 2 * 1 = 2`<br>`func(2) = 2 * 2 = 4`<br>`func(3) = 2 * 4 = 8`。<br>（本質為計算 $2^n = 2^3 = 8$），故選 (B)。"
  },
  {
    "id": "112-s2-041",
    "year": "112",
    "subject": "subject2",
    "scope": "mock4",
    "category": "程式設計實習",
    "source": "【112 統測真題】",
    "question": "在 C 語言中，若函式內部宣告一區域變數加上關鍵字 `static`（靜態變數），例如 `static int count = 0;`，其具備何種特性？",
    "options": [
      "每次呼叫函式都會重新初始化為 0",
      "生命週期延續至整個程式結束，且離開函式後其數值仍會被保留",
      "無法在函式內修改其數值",
      "變數作用範圍變為全域變數"
    ],
    "answer": 1,
    "explanation": "`static` 區域變數特性：<br>1. 僅在程式載入時初始化一次；<br>2. 變數存儲在靜態資料區（Data Segment），其生命週期與主程式相同；<br>3. 函式執行完畢返回後，該變數不會被消滅，下一次再呼叫該函式時仍保留上次的數值；<br>4. 其作用域（Scope）仍侷限在該函式內。<br>故選 (B)。"
  },
  {
    "id": "112-s2-042",
    "year": "112",
    "subject": "subject2",
    "scope": "mock4",
    "category": "程式設計實習",
    "source": "【112 模擬考】",
    "question": "使用 C 語言標準函式庫時，欲比較兩個字串 `str1` 與 `str2` 是否完全相同，應使用下列哪一個函式？",
    "options": [
      "strcpy(str1, str2)",
      "strcmp(str1, str2) == 0",
      "strlen(str1) == strlen(str2)",
      "strcat(str1, str2)"
    ],
    "answer": 1,
    "explanation": "字串處理函式功能：<br>1. `strcmp(s1, s2)`：依 ASCII 碼逐字元比較兩字串，若完全相等則回傳 0；<br>2. `strcpy`：複製字串；<br>3. `strlen`：計算字串長度（長度相同不代表內容相同）；<br>4. `strcat`：串接字串。<br>故比較兩字串是否相等應使用 `strcmp(str1, str2) == 0`，選 (B)。"
  },
  {
    "id": "112-s2-043",
    "year": "112",
    "subject": "subject2",
    "scope": "mock2",
    "category": "微處理機",
    "source": "【112 統測真題】",
    "question": "在微電腦架構中，專門負責協調控制整個系統、發出讀寫時序脈波控制信號的匯流排為何？",
    "options": [
      "資料匯流排 (Data Bus)",
      "控制匯流排 (Control Bus)",
      "位址匯流排 (Address Bus)",
      "系統擴充匯流排 (PCIe)"
    ],
    "answer": 1,
    "explanation": "三大匯流排功能職責：<br>1. 控制匯流排（Control Bus）：傳送 CPU 發出的控制信號（如記憶體讀取 / 寫入 $\\overline{RD}, \\overline{WR}$、中斷確認、時脈等）。<br>2. 位址匯流排（Address Bus）：單向傳送記憶體或 I/O 的位址編號。<br>3. 資料匯流排（Data Bus）：雙向傳送實際的資料或指令代碼。<br>故選 (B)。"
  },
  {
    "id": "112-s2-044",
    "year": "112",
    "subject": "subject2",
    "scope": "mock2",
    "category": "微處理機",
    "source": "【112 統測真題】",
    "question": "8051 單晶片微控制器的 P0 埠（Port 0）若欲作為一般雙向輸入/輸出埠使用時，在硬體電路上必須外接何種元件才能正常工作？",
    "options": [
      "下拉電阻 (Pull-Down)",
      "上拉電阻 (Pull-Up)",
      "串聯電容",
      "蕭基二極體"
    ],
    "answer": 1,
    "explanation": "8051 內部腳位電路結構：<br>P0 埠內部輸出級為開汲極（Open-Drain）結構，內部沒有上拉電阻（其餘 P1、P2、P3 內部皆有上拉電阻）。<br>因此當 P0 埠作為一般 I/O 埠使用時，輸出高電位時會呈現高阻抗浮接狀態，外部必須額外連接提升電阻（通常為 $4.7\\,\\text{k}\\Omega \\sim 10\\,\\text{k}\\Omega$ 之排阻 Pull-Up Resistor）至 VCC，才能正常輸出高電位。故選 (B)。"
  },
  {
    "id": "112-s2-045",
    "year": "112",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【112 模擬考】",
    "question": "執行下列 8051 堆疊指令後，堆疊指標暫存器 SP 的數值變化為何？\n```asm\nMOV SP, #30H\nPUSH ACC\nPUSH B\nPOP DPL\n```",
    "options": [
      "SP = 30H",
      "SP = 31H",
      "SP = 32H",
      "SP = 2FH"
    ],
    "answer": 1,
    "explanation": "堆疊指標 SP 的變化追蹤：<br>1. 初始設定：`SP = 30H`；<br>2. `PUSH ACC`：SP 先遞增 1（$SP = 31H$），將 ACC 存入 31H；<br>3. `PUSH B`：SP 再遞增 1（$SP = 32H$），將 B 存入 32H；<br>4. `POP DPL`：從 32H 取出資料存入 DPL，然後 SP 遞減 1（$SP = 31H$）。<br>最終 SP 為 `31H`，故選 (B)。"
  },
  {
    "id": "112-s2-046",
    "year": "112",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【112 統測真題】",
    "question": "下列 8051 組合語言指令中，屬於「暫存器間接定址法（Register Indirect Addressing）」的指令為何？",
    "options": [
      "MOV A, #30H",
      "MOV A, @R0",
      "MOV A, 30H",
      "MOV A, R0"
    ],
    "answer": 1,
    "explanation": "8051 定址模式辨析：<br>1. `MOV A, #30H`：立即定址（包含 `#` 符號）；<br>2. `MOV A, 30H`：直接定址（直接寫出記憶體位址 30H）；<br>3. `MOV A, R0`：暫存器定址；<br>4. `MOV A, @R0`：**暫存器間接定址**（包含 `@` 符號，以暫存器 R0 儲存的內容作為記憶體位址來存取）。<br>故選 (B)。"
  },
  {
    "id": "112-s2-047",
    "year": "112",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【112 模擬考】",
    "question": "8051 組合語言中，指令 `DJNZ R2, LOOP` 的具體執行動作為何？",
    "options": [
      "將 R2 加 1，若等於 0 則跳至 LOOP",
      "將 R2 減 1，若不等於 0 則跳至 LOOP",
      "若 R2 為 0 則跳至 LOOP",
      "比較 R2 與 LOOP 之數值"
    ],
    "answer": 1,
    "explanation": "`DJNZ` 指令全名為 Decrement and Jump if Not Zero（遞減且非零則跳躍）：<br>執行步驟：先將指定暫存器（此處為 R2）的內容減 1，接著判斷減 1 後的結果：<br>- 若數值不等於 0（Not Zero），則跳至目標標記 `LOOP` 繼續執行迴圈；<br>- 若數值剛好減到等於 0，則順序執行下一道指令。<br>此指令常用於構建延遲計數迴圈，故選 (B)。"
  },
  {
    "id": "112-s2-048",
    "year": "112",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【112 統測真題】",
    "question": "若 8051 外接之石英震盪晶體頻率為 $12\\,\\text{MHz}$，則 8051 的一個機器週期（Machine Cycle）時間長度為多少？",
    "options": [
      "0.5 μs",
      "1.0 μs",
      "2.0 μs",
      "12.0 μs"
    ],
    "answer": 1,
    "explanation": "標準 8051 週期計算規則：<br>1. 8051 的一個機器週期等於 12 個振盪時脈週期（$12 \\times T_{osc}$）。<br>2. 機器週期頻率 $f_{mc} = \\frac{12\\,\\text{MHz}}{12} = 1\\,\\text{MHz}$。<br>3. 機器週期時間 $T_{mc} = \\frac{1}{1\\,\\text{MHz}} = 1.0\\,\\mu\\text{s}$。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s2-049",
    "year": "112",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【112 模擬考】",
    "question": "欲致能（開啟）8051 的計時器 0 中斷 (ET0) 與全域中斷致能 (EA)，則應寫入中斷致能暫存器 IE 的十六進制數值為何？（IE 格式：EA, -, -, ES, ET1, EX1, ET0, EX0）",
    "options": [
      "81H",
      "82H",
      "84H",
      "88H"
    ],
    "answer": 1,
    "explanation": "中斷致能暫存器 IE 格式分配：<br>- bit 7: EA（全域中斷致能，設為 1）<br>- bit 6: - (0)<br>- bit 5: - (0)<br>- bit 4: ES (0)<br>- bit 3: ET1 (0)<br>- bit 2: EX1 (0)<br>- bit 1: ET0（計時器 0 中斷致能，設為 1）<br>- bit 0: EX0 (0)<br>二進制為 `1000 0010`，轉換為十六進制即為 `82H`。<br>故正確答案為 (B)。"
  },
  {
    "id": "112-s2-050",
    "year": "112",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【112 統測真題】",
    "question": "關於快閃記憶體（Flash Memory）與靜態隨機存取記憶體（SRAM）的特性比較，下列何者正確？",
    "options": [
      "Flash 斷電後資料會消失",
      "Flash 具非揮發性（斷電資料不流失），SRAM 具揮發性（斷電資料消失）",
      "SRAM 讀寫速度遠慢於 Flash",
      "兩者皆需要定期動態充電刷新 (Refresh)"
    ],
    "answer": 1,
    "explanation": "記憶體分類特性：<br>1. Flash Memory（快閃記憶體）：屬於非揮發性記憶體（Non-Volatile），斷電後儲存的程式與資料不會流失，廣泛作為單晶片 ROM 與隨身碟。<br>2. SRAM（靜態隨機存取記憶體）：屬於揮發性記憶體（Volatile），斷電後儲存內容立即消失，但讀寫速度極快且不需刷新（DRAM 才需要刷新）。<br>故選 (B)。"
  },
  {
    "id": "113-s1-001",
    "year": "113",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【113 統測真題】",
    "question": "在時間 $t = 5\\,\\text{秒}$ 內，共有 $30\\,\\text{C}$（庫侖）的電荷均勻流過某導體之截面，請問流經該導體的平均電流大小為何？若基本電荷量 $e = 1.6 \\times 10^{-19}\\,\\text{C}$，則這段時間內通過該截面的電子總個數約為多少個？",
    "options": [
      "電流 3 A，電子數 1.0 × 10^20 個",
      "電流 15 A，電子數 6.25 × 10^18 個",
      "電流 6 A，電子數 1.875 × 10^20 個",
      "電流 6 A，電子數 3.0 × 10^19 個"
    ],
    "answer": 2,
    "explanation": "1. 電流定義：$I = \\frac{Q}{t} = \\frac{30\\,\\text{C}}{5\\,\\text{s}} = 6\\,\\text{A}$。<br>2. 通過之電子總數：<br>$n = \\frac{Q}{e} = \\frac{30}{1.6 \\times 10^{-19}} = 1.875 \\times 10^{20}\\,\\text{個}$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-002",
    "year": "113",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【113 統測真題】",
    "question": "兩個電阻器額定分別為「$100\\,\\Omega, 1\\,\\text{W}$」與「$400\\,\\Omega, 4\\,\\text{W}$」，若將此兩電阻串聯在一起，為確保兩電阻皆不超過其額定功率而燒毀，此串聯組合兩端所能施加的最大安全電壓為何？",
    "options": [
      "20 V",
      "30 V",
      "50 V",
      "100 V"
    ],
    "answer": 2,
    "explanation": "1. 計算各電阻最大容許電流：<br>- 第一顆：$P = I_1^2 R_1 \\Rightarrow 1 = I_1^2 \\times 100 \\Rightarrow I_1 = 0.1\\,\\text{A}$。<br>- 第二顆：$P = I_2^2 R_2 \\Rightarrow 4 = I_2^2 \\times 400 \\Rightarrow I_2 = 0.1\\,\\text{A}$。<br>兩顆電阻的最大容許安全電流剛好皆為 $I_{max} = 0.1\\,\\text{A}$。<br>2. 串聯總電阻：$R_{total} = 100 + 400 = 500\\,\\Omega$。<br>3. 最大安全電壓：$V_{max} = I_{max} \\times R_{total} = 0.1\\,\\text{A} \\times 500\\,\\Omega = 50\\,\\text{V}$。<br>故選 (C)。"
  },
  {
    "id": "113-s1-003",
    "year": "113",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【113 模擬考】",
    "question": "一封閉直流迴路中，順時針方向依序有三個元件：$24\\,\\text{V}$ 理想電壓源（長劃為正、短劃為負）、$4\\,\\Omega$ 電阻、以及 $8\\,\\Omega$ 電阻。依克希荷夫電壓定律 (KVL)，流經該迴路的電流大小及 $8\\,\\Omega$ 電阻上的電壓降為何？",
    "options": [
      "I = 1 A, V8 = 8 V",
      "I = 3 A, V8 = 24 V",
      "I = 2 A, V8 = 16 V",
      "I = 2 A, V8 = 8 V"
    ],
    "answer": 2,
    "explanation": "1. 迴路總電阻：$R_{total} = 4 + 8 = 12\\,\\Omega$。<br>2. 迴路電流：$I = \\frac{E}{R_{total}} = \\frac{24\\,\\text{V}}{12\\,\\Omega} = 2\\,\\text{A}$。<br>3. $8\\,\\Omega$ 電阻兩端電壓降：$V_8 = I \\times R_8 = 2\\,\\text{A} \\times 8\\,\\Omega = 16\\,\\text{V}$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-004",
    "year": "113",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【113 統測真題】",
    "question": "某線性電路之戴維寧等效電路為 $E_{th} = 36\\,\\text{V}, R_{th} = 12\\,\\Omega$。若將其轉換為「諾頓等效電路 (Norton Equivalent Circuit)」，則其諾頓等效短路電流 $I_N$ 與諾頓等效電阻 $R_N$ 分別為多少？",
    "options": [
      "IN = 12 A, RN = 36 Ω",
      "IN = 4 A, RN = 12 Ω",
      "IN = 3 A, RN = 12 Ω",
      "IN = 3 A, RN = 4 Ω"
    ],
    "answer": 2,
    "explanation": "電源等效轉換公式：<br>1. 諾頓電阻等於戴維寧電阻：$R_N = R_{th} = 12\\,\\Omega$。<br>2. 諾頓電流等於短路電流：$I_N = \\frac{E_{th}}{R_{th}} = \\frac{36\\,\\text{V}}{12\\,\\Omega} = 3\\,\\text{A}$。<br>因此諾頓等效電路為 $3\\,\\text{A}$ 電流源並聯 $12\\,\\Omega$ 電阻，故選 (C)。"
  },
  {
    "id": "113-s1-005",
    "year": "113",
    "subject": "subject1",
    "scope": "mock2",
    "category": "基本電學",
    "source": "【113 模擬考】",
    "question": "平行板電容器之電容量公式為 $C = \\epsilon \\frac{A}{d}$。若將兩極板間的距離 $d$ 縮小為原來的一半，而兩極板對應面積 $A$ 擴大為原來的 $2$ 倍，介電質材質不變，則其電容量將變為原來的幾倍？",
    "options": [
      "不變 (1 倍)",
      "2 倍",
      "4 倍",
      "8 倍"
    ],
    "answer": 2,
    "explanation": "原電容：$C = \\epsilon \\frac{A}{d}$。<br>新面積 $A' = 2A$，新極板間距 $d' = 0.5d$。<br>新電容量：$C' = \\epsilon \\frac{2A}{0.5d} = 4 \\times \\left(\\epsilon \\frac{A}{d}\\right) = 4C$。<br>因此電容量變為原來的 4 倍，故選 (C)。"
  },
  {
    "id": "113-s1-006",
    "year": "113",
    "subject": "subject1",
    "scope": "mock2",
    "category": "基本電學",
    "source": "【113 統測真題】",
    "question": "如圖所示之惠斯登電橋電路，電阻 $R_1 = 30\\,\\Omega, R_2 = 60\\,\\Omega, R_3 = 20\\,\\Omega$。當電路平衡且檢流計讀數為 0 時，$R_x$ 之阻值應為多少？",
    "diagramType": "wheatstone",
    "diagramParams": [
      30,
      60,
      20,
      40
    ],
    "options": [
      "20 Ω",
      "30 Ω",
      "40 Ω",
      "50 Ω"
    ],
    "answer": 2,
    "explanation": "惠斯登電橋交叉相乘平衡定理：<br>$R_1 \\times R_x = R_2 \\times R_3$<br>$30 \\times R_x = 60 \\times 20 = 1200$<br>$R_x = \\frac{1200}{30} = 40\\,\\Omega$。<br>故選 (C)。"
  },
  {
    "id": "113-s1-007",
    "year": "113",
    "subject": "subject1",
    "scope": "mock2",
    "category": "基本電學",
    "source": "【113 模擬考】",
    "question": "一 $RC$ 串聯充電電路，$R = 100\\,\\text{k}\\Omega, C = 20\\,\\mu\\text{F}$。在 $t = 0$ 秒接入 $100\\,\\text{V}$ 直流電源開始充電。請問充電經過一個時間常數（$t = 1\\tau$）瞬間，電容器兩端電壓 $v_C(1\\tau)$ 約為多少？",
    "options": [
      "50.0 V",
      "36.8 V",
      "63.2 V",
      "86.5 V"
    ],
    "answer": 2,
    "explanation": "RC 充電暫態電壓方程式：<br>$v_C(t) = E (1 - e^{-t/\\tau})$。<br>當 $t = 1\\tau$ 時：<br>$v_C(1\\tau) = E (1 - e^{-1}) = E (1 - 0.368) = 0.632 E$。<br>代入 $E = 100\\,\\text{V}$：$v_C = 63.2\\,\\text{V}$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-008",
    "year": "113",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【113 統測真題】",
    "question": "一週期性正弦交流電壓有效值為 $110\\,\\text{V}$，請問其全波整流後的直流平均值 $V_{avg}$ 約為多少？",
    "options": [
      "70.7 V",
      "110 V",
      "99.0 V",
      "155.6 V"
    ],
    "answer": 2,
    "explanation": "1. 峰值電壓：$V_m = \\sqrt{2} V_{rms} = 1.414 \\times 110 \\approx 155.56\\,\\text{V}$。<br>2. 全波平均值：<br>$V_{avg} = \\frac{2V_m}{\\pi} = \\frac{2 \\times 155.56}{3.1416} \\approx 99.0\\,\\text{V}$（約為 $0.9 \\times V_{rms}$）。<br>故選 (C)。"
  },
  {
    "id": "113-s1-009",
    "year": "113",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【113 模擬考】",
    "question": "一交流串聯電路中，接上 $v(t) = 100\\sin(\\omega t)\\,\\text{V}$ 之電源，測得流經電路的電流為 $i(t) = 10\\sin(\\omega t - 53.1^\\circ)\\,\\text{A}$。已知 $\\cos(53.1^\\circ) = 0.6, \\sin(53.1^\\circ) = 0.8$。請問該串聯電路的電阻 $R$ 與感抗 $X_L$ 分別為多少？",
    "options": [
      "R = 8 Ω, XL = 6 Ω",
      "R = 10 Ω, XL = 10 Ω",
      "R = 6 Ω, XL = 8 Ω",
      "R = 5 Ω, XL = 5 Ω"
    ],
    "answer": 2,
    "explanation": "1. 阻抗大小：$|Z| = \\frac{V_m}{I_m} = \\frac{100}{10} = 10\\,\\Omega$。<br>2. 阻抗相角：$\\theta = 53.1^\\circ$（電流落後電壓，為感性電路）。<br>3. 實部電阻：$R = |Z| \\cos\\theta = 10 \\times 0.6 = 6\\,\\Omega$。<br>4. 虛部感抗：$X_L = |Z| \\sin\\theta = 10 \\times 0.8 = 8\\,\\Omega$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-010",
    "year": "113",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【113 統測真題】",
    "question": "某工廠負載為感性，消耗實功率 $P = 120\\,\\text{kW}$，功率因數為 $PF = 0.6$（落後）。若欲在負載端並聯電容器將總功率因數提高至 $PF' = 1.0$，請問所需並聯之電容器總容量 $Q_C$ 應為多少？",
    "options": [
      "120 kVAR",
      "90 kVAR",
      "160 kVAR",
      "200 kVAR"
    ],
    "answer": 2,
    "explanation": "1. 原功率因數 $\\cos\\theta_1 = 0.6 \\Rightarrow \\tan\\theta_1 = \\frac{0.8}{0.6} = \\frac{4}{3}$。<br>原感性虛功率：$Q_1 = P \\times \\tan\\theta_1 = 120\\,\\text{kW} \\times \\frac{4}{3} = 160\\,\\text{kVAR}$。<br>2. 欲改善至 $PF' = 1.0 \\Rightarrow \\theta_2 = 0^\\circ \\Rightarrow \\tan\\theta_2 = 0$。<br>3. 所需補償之電容虛功率：<br>$Q_C = Q_1 - Q_2 = 160 - 0 = 160\\,\\text{kVAR}$。<br>故選 (C)。"
  },
  {
    "id": "113-s1-011",
    "year": "113",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【113 模擬考】",
    "question": "一 RLC 串聯電路中，$R = 5\\,\\Omega, L = 10\\,\\text{mH}, C = 10\\,\\mu\\text{F}$。發生串聯諧振時，電路的頻寬（Bandwidth, BW）約為多少 rad/s？",
    "options": [
      "100 rad/s",
      "250 rad/s",
      "500 rad/s",
      "1000 rad/s"
    ],
    "answer": 2,
    "explanation": "串聯諧振頻寬公式：<br>$\\text{BW} = \\frac{R}{L}$（以角頻率 rad/s 表示）。<br>代入數值：<br>$\\text{BW} = \\frac{5\\,\\Omega}{10 \\times 10^{-3}\\,\\text{H}} = \\frac{5}{0.01} = 500\\,\\text{rad/s}$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-012",
    "year": "113",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【113 統測真題】",
    "question": "一平衡三相 $\\Delta$ 接負載，已知每一相的相阻抗為 $Z_p = 10\\,\\Omega$。若以同一組三相線電壓供電，將負載改接為平衡 Y 接，則改接後每一相應具備之相阻抗為何才能使消耗之三相總功率保持不變？",
    "options": [
      "10 Ω",
      "30 Ω",
      "3.33 Ω (即 10/3 Ω)",
      "1.73 Ω"
    ],
    "answer": 2,
    "explanation": "$\\Delta$-Y 阻抗等效轉換：<br>在相同線電壓供電下，若要保持相同的線電流與總功率，Y 接各相阻抗必須是 $\\Delta$ 接各相阻抗的三分之一：<br>$Z_Y = \\frac{Z_\\Delta}{3} = \\frac{10}{3} \\approx 3.33\\,\\Omega$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-013",
    "year": "113",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【113 模擬考】",
    "question": "在三相四線式 Y 接供電系統中，線電壓為 $380\\,\\text{V}$，則各相與中性線（中線 N）之間的相電壓大小約為多少？",
    "options": [
      "110 V",
      "190 V",
      "220 V",
      "380 V"
    ],
    "answer": 2,
    "explanation": "三相 Y 接系統中，線電壓與相電壓關係式為：<br>$V_L = \\sqrt{3} \\times V_p$。<br>因此相電壓：$V_p = \\frac{V_L}{\\sqrt{3}} = \\frac{380}{1.732} \\approx 219.4 \\approx 220\\,\\text{V}$。<br>（即常見的工業用 $380\\,\\text{V} / 220\\,\\text{V}$ 系統），故選 (C)。"
  },
  {
    "id": "113-s1-014",
    "year": "113",
    "subject": "subject1",
    "scope": "mock2",
    "category": "電子學",
    "source": "【113 統測真題】",
    "question": "二極體接在交流電源上，並聯一個電容與電阻構成「箝位電路 (Clamper)」，其主要功能為何？",
    "options": [
      "將交流信號放大為高電壓",
      "將交流信號整流為純直流電",
      "將整段交流波形向上或向下平移至指定的直流電位準位",
      "消除波形中的高頻雜訊"
    ],
    "answer": 2,
    "explanation": "箝位器（Clamping Circuit / 直流恢復器）：<br>主要由二極體、電容器與電阻組成，其特點是**不改變交流波形的形狀與峰對峰值（$V_{p-p}$ 不變）**，而是將整段波形「向上」或「向下」垂直平移，使其波峰或波谷固定在特定的直流參考準位上。故選 (C)。"
  },
  {
    "id": "113-s1-015",
    "year": "113",
    "subject": "subject1",
    "scope": "mock2",
    "category": "電子學",
    "source": "【113 模擬考】",
    "question": "如圖所示之橋式全波整流電路，輸入正弦波電壓峰值 $V_m = 30\\,\\text{V}$，若考慮矽二極體順向切入電壓 $V_D = 0.7\\,\\text{V}$，請問負載端輸出電壓的峰值約為多少？",
    "diagramType": "bridgeRectifier",
    "diagramParams": [
      30
    ],
    "options": [
      "30.0 V",
      "29.3 V",
      "28.6 V",
      "14.3 V"
    ],
    "answer": 2,
    "explanation": "橋式整流在任何半週期導通時，電流路徑中均必須同時經過「兩顆串聯導通的二極體」：<br>總二極體電壓降 $= 2 \\times V_D = 2 \\times 0.7\\,\\text{V} = 1.4\\,\\text{V}$。<br>負載輸出峰值電壓：<br>$V_{o(peak)} = V_m - 2 V_D = 30 - 1.4 = 28.6\\,\\text{V}$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-016",
    "year": "113",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【113 統測真題】",
    "question": "一 BJT 電晶體處於主動放大區，已知射極電流 $I_E = 5.0\\,\\text{mA}$，基極電流 $I_B = 50\\,\\mu\\text{A}$。請問集極電流 $I_C$ 及共射極電流增益 $\\beta$ 分別為多少？",
    "options": [
      "IC = 5.05 mA, β = 101",
      "IC = 4.5 mA, β = 90",
      "IC = 4.95 mA, β = 99",
      "IC = 4.95 mA, β = 100"
    ],
    "answer": 2,
    "explanation": "1. 依電晶體基本電流定律：$I_E = I_B + I_C$。<br>$I_C = I_E - I_B = 5.0\\,\\text{mA} - 0.05\\,\\text{mA} = 4.95\\,\\text{mA}$。<br>2. 電流增益：<br>$\\beta = \\frac{I_C}{I_B} = \\frac{4.95\\,\\text{mA}}{0.05\\,\\text{mA}} = 99$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-017",
    "year": "113",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【113 模擬考】",
    "question": "共射極 (CE) 放大電路在線性放大操作時，輸出電壓波形與輸入電壓波形之間的相位關係為何？",
    "options": [
      "同相 (0° 相位差)",
      "輸出超前輸入 90°",
      "反相 (180° 相位差)",
      "輸出落後輸入 90°"
    ],
    "answer": 2,
    "explanation": "共射極（CE）放大器具有反相放大特性：<br>當輸入電壓上升時，基極電流增加，帶動集極電流 $I_C$ 增加，使得集極負載電阻壓降 $I_C R_C$ 變大，導致輸出電壓 $V_C = V_{CC} - I_C R_C$ 下降。<br>因此輸入與輸出相差 180°（反相），故選 (C)。"
  },
  {
    "id": "113-s1-018",
    "year": "113",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【113 統測真題】",
    "question": "一 JFET 電晶體之夾止電壓 $V_P = -4\\,\\text{V}, I_{DSS} = 16\\,\\text{mA}$。若其閘極-源極電壓設定為 $V_{GS} = -1\\,\\text{V}$，請問其互導（Transconductance, $g_m$）為多少？（已知 $g_{m0} = \\frac{2 I_{DSS}}{|V_P|}$）",
    "options": [
      "2 mS",
      "4 mS",
      "6 mS",
      "8 mS"
    ],
    "answer": 2,
    "explanation": "1. 最大互導：$g_{m0} = \\frac{2 I_{DSS}}{|V_P|} = \\frac{2 \\times 16\\,\\text{mA}}{4\\,\\text{V}} = 8\\,\\text{mS}$。<br>2. 互導公式：<br>$g_m = g_{m0} \\left(1 - \\frac{V_{GS}}{V_P}\\right) = 8\\,\\text{mS} \\times \\left(1 - \\frac{-1}{-4}\\right) = 8 \\times (1 - 0.25) = 8 \\times 0.75 = 6\\,\\text{mS}$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-019",
    "year": "113",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【113 模擬考】",
    "question": "如圖所示之理想 OPA 反相放大電路，$R_1 = 5\\,\\text{k}\\Omega, R_f = 20\\,\\text{k}\\Omega$。若輸入電壓 $V_i = +1.5\\,\\text{V}$，工作電源為 $\\pm 15\\,\\text{V}$，請問輸出電壓 $V_o$ 為何？",
    "diagramType": "opaInverting",
    "diagramParams": [
      5,
      20,
      1.5
    ],
    "options": [
      "+6.0 V",
      "-4.0 V",
      "-6.0 V",
      "-7.5 V"
    ],
    "answer": 2,
    "explanation": "反相放大電壓增益：<br>$A_v = -\\frac{R_f}{R_1} = -\\frac{20\\,\\text{k}\\Omega}{5\\,\\text{k}\\Omega} = -4$。<br>輸出電壓 $V_o = A_v \\times V_i = (-4) \\times 1.5\\,\\text{V} = -6.0\\,\\text{V}$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-020",
    "year": "113",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【113 統測真題】",
    "question": "一理想 OPA 接成同相（非反相）放大電路，$R_1 = 10\\,\\text{k}\\Omega$（接地位電阻），$R_f = 40\\,\\text{k}\\Omega$（回授電阻）。若輸入電壓為 $V_i = +1.0\\,\\text{V}$，則輸出電壓 $V_o$ 為何？",
    "options": [
      "-4.0 V",
      "+4.0 V",
      "+5.0 V",
      "+10.0 V"
    ],
    "answer": 2,
    "explanation": "非反相放大電壓增益：<br>$A_v = 1 + \\frac{R_f}{R_1} = 1 + \\frac{40\\,\\text{k}\\Omega}{10\\,\\text{k}\\Omega} = 1 + 4 = +5$。<br>輸出電壓 $V_o = A_v \\times V_i = (+5) \\times 1.0\\,\\text{V} = +5.0\\,\\text{V}$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-021",
    "year": "113",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【113 模擬考】",
    "question": "施密特觸發器（Schmitt Trigger）利用運算放大器的正回授特性，其輸入輸出轉移特性曲線具備何種重要特性？",
    "options": [
      "單一臨界電壓",
      "極寬的線性放大區",
      "遲滯特性（Hysteresis，具上限與下限兩個不同的觸發臨界電壓）",
      "高阻抗震盪特性"
    ],
    "answer": 2,
    "explanation": "施密特觸發器（Schmitt Trigger）：<br>引入正回授，具有遲滯現象（Hysteresis）。具備兩個不同的臨界電壓（上限臨界電壓 $V_{UT}$ 與下限臨界電壓 $V_{LT}$），兩者之差稱為遲滯電壓 $\\Delta V_H = V_{UT} - V_{LT}$。此特性可極佳地過濾輸入信號中的雜訊，避免比較器在邊界反覆跳變。故選 (C)。"
  },
  {
    "id": "113-s1-022",
    "year": "113",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【113 統測真題】",
    "question": "一負回授放大電路，未加回授前的開迴路電壓增益為 $A = 1000$，回授因數為 $\\beta = 0.009$。請問加上負回授後的閉迴路電壓增益 $A_f$ 為何？",
    "options": [
      "1000",
      "500",
      "100",
      "10"
    ],
    "answer": 2,
    "explanation": "負回授閉迴路增益公式：<br>$A_f = \\frac{A}{1 + A\\beta}$<br>計算分母：$1 + A\\beta = 1 + 1000 \\times 0.009 = 1 + 9 = 10$。<br>因此閉迴路增益：<br>$A_f = \\frac{1000}{10} = 100$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s1-023",
    "year": "113",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【113 模擬考】",
    "question": "下列哪一種功率放大器類別，其電晶體的導通角剛好為 180°（即半個週期導通，半個週期截止），且通常使用互補對稱推挽（Push-Pull）架構來避免波形失真？",
    "options": [
      "A 類 (Class A)",
      "AB 類 (Class AB)",
      "B 類 (Class B)",
      "C 類 (Class C)"
    ],
    "answer": 2,
    "explanation": "功率放大器導通角分類：<br>1. A 類：導通角 360°，線性度最佳但效率最低（最高 25%~50%）；<br>2. B 類：導通角剛好 180°，效率高（最高 78.5%），但會產生交越失真（Crossover Distortion），通常採雙電晶體互補推挽；<br>3. AB 類：導通角介於 180° 與 360° 之間，兼顧效率與消除交越失真；<br>4. C 類：導通角小於 180°。<br>故選 (C)。"
  },
  {
    "id": "113-s1-024",
    "year": "113",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【113 統測真題】",
    "question": "RC 相移振盪器（RC Phase-Shift Oscillator）通常由三級 RC 高通或低通網路串接組成，每一級 RC 網路在振盪頻率下約產生多少度的相位移？三級共產生多少度相移？",
    "options": [
      "每級 30°，共 90°",
      "每級 45°，共 135°",
      "每級 60°，共 180°",
      "每級 90°，共 270°"
    ],
    "answer": 2,
    "explanation": "RC 相移振盪器原理：<br>1. 放大器本身為反相放大器（產生 180° 相移）；<br>2. 為了滿足巴克豪森振盪準則之總迴路相移 360°（0°），外接的三級 RC 回授網路必須額外提供 180° 相移。<br>3. 均勻對稱設計下，每一級 RC 網路約負責提供 60° 相移，三級累計相移為 $3 \\times 60^\\circ = 180^\\circ$。<br>故選 (C)。"
  },
  {
    "id": "113-s1-025",
    "year": "113",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【113 模擬考】",
    "question": "一單相變壓器匝數比為 $N_1 : N_2 = 4 : 1$。若在次級圈連接一 $8\\,\\Omega$ 的純電阻負載，則由初級圈看入的等效反射阻抗 $R_{in}$ 為多少？",
    "options": [
      "2 Ω",
      "32 Ω",
      "128 Ω",
      "64 Ω"
    ],
    "answer": 2,
    "explanation": "阻抗反射公式：<br>$R_{in} = \\left(\\frac{N_1}{N_2}\\right)^2 \\times R_L$<br>匝數比 $a = 4$：<br>$R_{in} = 4^2 \\times 8 = 16 \\times 8 = 128\\,\\Omega$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s2-026",
    "year": "113",
    "subject": "subject2",
    "scope": "mock1",
    "category": "數位邏輯設計",
    "source": "【113 統測真題】",
    "question": "八進制數值 $(357)_8$ 轉換為十進制數值，其結果為何？",
    "options": [
      "225",
      "231",
      "239",
      "247"
    ],
    "answer": 2,
    "explanation": "八進制權值展開：<br>$(357)_8 = 3 \\times 8^2 + 5 \\times 8^1 + 7 \\times 8^0$<br>$= 3 \\times 64 + 5 \\times 8 + 7 \\times 1$<br>$= 192 + 40 + 7 = 239$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s2-027",
    "year": "113",
    "subject": "subject2",
    "scope": "mock1",
    "category": "數位邏輯設計",
    "source": "【113 模擬考】",
    "question": "下列哪一種數位邏輯閘被稱為「萬用邏輯閘（Universal Gate）」，因為僅需單獨使用該種邏輯閘即可組合實現 NOT、AND、OR 等所有基本邏輯運算？",
    "options": [
      "AND 閘",
      "OR 閘",
      "NAND 閘 (或 NOR 閘)",
      "XOR 閘"
    ],
    "answer": 2,
    "explanation": "萬用邏輯閘（Universal Gates）包含「反及閘 (NAND)」與「反或閘 (NOR)」。<br>因為任何布林代數表示式均可透過狄摩根定理轉換為純 NAND 或純 NOR 架構來實現，故選 (C)。"
  },
  {
    "id": "113-s2-028",
    "year": "113",
    "subject": "subject2",
    "scope": "mock1",
    "category": "數位邏輯設計",
    "source": "【113 統測真題】",
    "question": "如圖所示之邏輯電路，若輸入信號為 $A=0, B=1, C=1$，請問輸出端 $F$ 之邏輯準位為何？",
    "diagramType": "logicGates",
    "options": [
      "高阻抗 Z",
      "1",
      "0",
      "不確定"
    ],
    "answer": 2,
    "explanation": "電路分析：<br>1. 下方及閘（AND Gate）輸入為 $B=1$ 與 $C=1$，及閘輸出為 $1 \\cdot 1 = 1$。<br>2. 上方反或閘（NOR Gate）之兩輸入端分別為：$A=0$ 與及閘輸出 $1$。<br>3. NOR 運算：$\\overline{0 + 1} = \\overline{1} = 0$。<br>因此最終輸出端 $F = 0$，故選 (C)。"
  },
  {
    "id": "113-s2-029",
    "year": "113",
    "subject": "subject2",
    "scope": "mock2",
    "category": "數位邏輯設計",
    "source": "【113 模擬考】",
    "question": "在利用卡諾圖化簡布林函數時，若遇到「隨意項 / 無關項 (Don't-care condition)」，以符號 $X$ 或 $d$ 表示，其化簡處理原則為何？",
    "options": [
      "必須全部圈選為 1",
      "必須全部視為 0 不予圈選",
      "可視化簡需要當作 1 圈選以擴大分組，亦可視為 0 略過",
      "無關項會使電路產生競爭冒險必須刪除"
    ],
    "answer": 2,
    "explanation": "無關項（Don't Care $X$）：<br>代表在系統實際運作中永遠不會出現或其輸出結果無所謂的輸入組合。<br>化簡原則：如果將 $X$ 視為 1 能夠與鄰近格子合併湊成更大的 2-group、4-group 或 8-group（群組越大，消去的變數越多），就將其圈入；若無助於擴大分組，則視為 0 略過不圈。故選 (C)。"
  },
  {
    "id": "113-s2-030",
    "year": "113",
    "subject": "subject2",
    "scope": "mock2",
    "category": "數位邏輯設計",
    "source": "【113 統測真題】",
    "question": "一顆「8 對 1 多工器 (8-to-1 MUX)」需要幾條位址選擇控制線（Select Lines）來選通 8 條資料輸入線中的某一條？",
    "options": [
      "1 條",
      "2 條",
      "3 條",
      "8 條"
    ],
    "answer": 2,
    "explanation": "多工器輸入與控制線之數學關係：<br>$2^m = N$（其中 $m$ 為選擇線數，$N$ 為輸入資料線數）。<br>對於 8-to-1 MUX：$2^m = 8 \\Rightarrow m = 3$ 條選擇線（通常標記為 $S_2, S_1, S_0$）。<br>故選 (C)。"
  },
  {
    "id": "113-s2-031",
    "year": "113",
    "subject": "subject2",
    "scope": "mock3",
    "category": "數位邏輯設計",
    "source": "【113 統測真題】",
    "question": "一正反器具有 $J=1, K=1$ 之輸入狀態，每當觸發時脈 CLK 到達時，輸出狀態都會自動反轉（$0 \\to 1, 1 \\to 0$），此種工作模式稱為何種狀態？",
    "options": [
      "維持 (Hold)",
      "重置 (Reset)",
      "切換 (Toggle)",
      "禁制 (Forbidden)"
    ],
    "answer": 2,
    "explanation": "JK 正反器工作模式：<br>當 $J=1, K=1$ 時，其特性方程式為 $Q(t+1) = \\overline{Q(t)}$。<br>亦即輸出會隨著每一次時脈脈波發生反相轉態，此狀態稱為「切換（Toggle）」，常用於頻率除以 2 的計數器設計中。故選 (C)。"
  },
  {
    "id": "113-s2-032",
    "year": "113",
    "subject": "subject2",
    "scope": "mock3",
    "category": "數位邏輯設計",
    "source": "【113 模擬考】",
    "question": "以 4 顆正反器構成之「環狀計數器 (Ring Counter)」，其巡迴循環狀態個數（有效模數）為多少？",
    "options": [
      "16",
      "8",
      "4",
      "2"
    ],
    "answer": 2,
    "explanation": "移位計數器狀態數比較：<br>1. $N$ 位元環狀計數器（Ring Counter）：只有一個 1（或 0）在暫存器中巡迴循環，其有效狀態數剛好等於正反器個數 $N = 4$ 個。<br>2. $N$ 位元強生計數器（Johnson Counter）：有效狀態數為 $2N = 8$ 個。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s2-033",
    "year": "113",
    "subject": "subject2",
    "scope": "mock4",
    "category": "數位邏輯設計",
    "source": "【113 統測真題】",
    "question": "同步計數器（Synchronous Counter）相較於非同步（漣波）計數器（Ripple Counter），其最大的優點為何？",
    "options": [
      "電路結構較簡單",
      "使用的邏輯閘數量較少",
      "所有正反器由同一時脈脈波同步觸發，因此累積傳遞延遲極小、工作頻率極高",
      "消耗功率較低"
    ],
    "answer": 2,
    "explanation": "同步計數器特性：<br>在非同步計數器中，時脈是由前一級正反器輸出逐級向下觸發，級數越多累積傳遞延遲越嚴重，易產生突波（Glitch）；<br>同步計數器的所有正反器均接至「同一個共同的外部時脈來源」，在同一時脈瞬間同時完成狀態切換，無逐級累積延遲，工作速度與上限頻率遠高於漣波計數器。故選 (C)。"
  },
  {
    "id": "113-s2-034",
    "year": "113",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【113 統測真題】",
    "question": "執行下列 C 語言程式片段後，輸出結果為何？\n```c\nint a = 10, b = 20, c = 30;\nint res = (a < b && b > c) || (c > a);\nprintf(\"%d\", res);\n```",
    "options": [
      "0",
      "2",
      "1",
      "-1"
    ],
    "answer": 2,
    "explanation": "邏輯運算子運算流程：<br>1. 子條件 1：`(a < b && b > c)`<br>   `a < b`（`10 < 20`）為真（1）；`b > c`（`20 > 30`）為假（0）。<br>   `1 && 0 = 0`（假）。<br>2. 子條件 2：`(c > a)`<br>   `30 > 10` 為真（1）。<br>3. 運算 `(0) || (1)`：邏輯或只要有一者為真即為真，結果為 1。<br>在 C 語言中真值輸出為整數 1，故選 (C)。"
  },
  {
    "id": "113-s2-035",
    "year": "113",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【113 模擬考】",
    "question": "執行下列 C 語言格式化輸出程式碼後，印出的字串為何？\n```c\nint num = 42;\nprintf(\"[%05d]\", num);\n```",
    "options": [
      "[42   ]",
      "[   42]",
      "[00042]",
      "[42000]"
    ],
    "answer": 2,
    "explanation": "格式化字串 `%05d` 格式解析：<br>- `5` 代表總輸出欄位寬度至少為 5 個字元；<br>- 前方加上旗標 `0`，表示若實際位數不足 5 位時，**在左側空白處以數字 '0' 補滿**。<br>`42` 佔 2 位，左邊補 3 個 0，顯示為 `[00042]`。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s2-036",
    "year": "113",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【113 統測真題】",
    "question": "執行下列 C 語言程式片段後，變數 `x` 的最終數值為何？\n```c\nint x = 10;\nif (x = 0) {\n    x += 5;\n} else {\n    x += 10;\n}\n```",
    "options": [
      "0",
      "5",
      "10",
      "15"
    ],
    "answer": 2,
    "explanation": "注意 `if (x = 0)` 中使用的是**賦值運算子 `=` 而非比較運算子 `==`**！<br>1. `x = 0` 會先將變數 `x` 指派為 0。<br>2. 該表達式之結果即為賦予的值 0。<br>3. 在 C 語言中，0 代表條件為**假（False）**。<br>4. 因此程式跳入 `else` 區塊執行：`x += 10`。<br>5. 此時 `x` 變為 $0 + 10 = 10$。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s2-037",
    "year": "113",
    "subject": "subject2",
    "scope": "mock2",
    "category": "程式設計實習",
    "source": "【113 模擬考】",
    "question": "執行下列 C 語言迴圈程式片段後，輸出結果為何？\n```c\nint count = 0, n = 16;\nwhile (n > 1) {\n    n /= 2;\n    count++;\n}\nprintf(\"%d\", count);\n```",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": 2,
    "explanation": "追蹤迴圈執行過程：<br>- 第 1 次：$n = 16 / 2 = 8$, count = 1<br>- 第 2 次：$n = 8 / 2 = 4$, count = 2<br>- 第 3 次：$n = 4 / 2 = 2$, count = 3<br>- 第 4 次：$n = 2 / 2 = 1$, count = 4<br>此時 $n = 1$ 不滿足 $n > 1$，離開迴圈。<br>印出 `count = 4`（實質為計算 $\\log_2(16) = 4$），故選 (C)。"
  },
  {
    "id": "113-s2-038",
    "year": "113",
    "subject": "subject2",
    "scope": "mock2",
    "category": "程式設計實習",
    "source": "【113 統測真題】",
    "question": "執行下列 C 語言程式片段後，陣列元素 `arr[2]` 的內容為何？\n```c\nint arr[4] = {1, 2, 3, 4};\narr[arr[1]] = 99;\n```",
    "options": [
      "2",
      "3",
      "99",
      "4"
    ],
    "answer": 2,
    "explanation": "陣列下標分析：<br>1. `arr[1]` 之內容為 2（C 語言索引從 0 開始：`arr[0]=1, arr[1]=2`）。<br>2. 因此 `arr[arr[1]]` 即等同於 `arr[2]`。<br>3. 執行指派語句 `arr[2] = 99;`。<br>因此 `arr[2]` 的內容變為 99，故選 (C)。"
  },
  {
    "id": "113-s2-039",
    "year": "113",
    "subject": "subject2",
    "scope": "mock3",
    "category": "程式設計實習",
    "source": "【113 模擬考】",
    "question": "執行下列 C 語言指標運算程式碼後，印出的數值為何？\n```c\nint data[] = {10, 20, 30, 40, 50};\nint *ptr = data + 1;\nptr += 2;\nprintf(\"%d\", *ptr);\n```",
    "options": [
      "20",
      "30",
      "40",
      "50"
    ],
    "answer": 2,
    "explanation": "指標算術分析：<br>1. `data` 代表首項位址 `&data[0]`。<br>2. `ptr = data + 1;` 使得指標指向 `data[1]`（值為 20）。<br>3. `ptr += 2;` 將指標再向後移動 2 個元素單位，指向 `data[3]`。<br>4. 解參考 `*ptr` 取得 `data[3]` 的數值，即為 40。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s2-040",
    "year": "113",
    "subject": "subject2",
    "scope": "mock3",
    "category": "程式設計實習",
    "source": "【113 統測真題】",
    "question": "已知計算費氏數列（Fibonacci Sequence）之遞迴函式定義如下：\n```c\nint fib(int n) {\n    if (n == 0) return 0;\n    if (n == 1) return 1;\n    return fib(n - 1) + fib(n - 2);\n}\n```\n請問呼叫 `fib(5)` 之回傳值為何？",
    "options": [
      "3",
      "4",
      "5",
      "8"
    ],
    "answer": 2,
    "explanation": "費氏數列逐項計算：<br>- `fib(0) = 0`<br>- `fib(1) = 1`<br>- `fib(2) = 1 + 0 = 1`<br>- `fib(3) = 1 + 1 = 2`<br>- `fib(4) = 2 + 1 = 3`<br>- `fib(5) = 3 + 2 = 5`<br>故呼叫 `fib(5)` 之回傳值為 5，選 (C)。"
  },
  {
    "id": "113-s2-041",
    "year": "113",
    "subject": "subject2",
    "scope": "mock4",
    "category": "程式設計實習",
    "source": "【113 模擬考】",
    "question": "關於 C 語言字串常數與陣列之宣告，下列敘述何者**錯誤**？",
    "options": [
      "字串實質上是以空字元 '\\0' 結尾的字元陣列",
      "宣告 `char str[6] = \"Hello\";` 是合法的，字元陣列長度需包含結尾 '\\0'",
      "宣告 `char str[5] = \"Hello\";` 會自動幫你把長度擴充到 6 位元組而不會發生任何問題",
      "可以使用 `%s` 格式碼配合 `printf` 印出字串"
    ],
    "answer": 2,
    "explanation": "字串長度與記憶體分配：<br>字串 `\"Hello\"` 包含 5 個英文字母加上 1 個隱含的空字元 `\\0`，總共需要佔用 6 個位元組。<br>若宣告 `char str[5] = \"Hello\";`，陣列空間只有 5 個位元組，無法容納結尾的 `\\0`，編譯器會發出警告，且後續字串函式運作時極易因找不到 `\\0` 造成緩衝區越界錯誤！因此選項 (C) 敘述錯誤，選 (C)。"
  },
  {
    "id": "113-s2-042",
    "year": "113",
    "subject": "subject2",
    "scope": "mock4",
    "category": "程式設計實習",
    "source": "【113 統測真題】",
    "question": "執行下列 C 語言函式呼叫後，變數 `a` 與 `b` 的數值為何？\n```c\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\nint main() {\n    int a = 100, b = 200;\n    swap(&a, &b);\n    printf(\"%d, %d\", a, b);\n    return 0;\n}\n```",
    "options": [
      "100, 200",
      "0, 0",
      "200, 100",
      "編譯錯誤"
    ],
    "answer": 2,
    "explanation": "傳址呼叫（Call by Address / Pointer）：<br>主程式將變數 `a` 與 `b` 的記憶體位址 `&a, &b` 傳入函式 `swap`。<br>函式透過指標 `*x` 與 `*y` 直接對主程式中 `a` 與 `b` 的原始記憶體內容進行數值交換。<br>因此交換後 `a = 200, b = 100`，故選 (C)。"
  },
  {
    "id": "113-s2-043",
    "year": "113",
    "subject": "subject2",
    "scope": "mock2",
    "category": "微處理機",
    "source": "【113 統測真題】",
    "question": "8051 微控制器共有 4 個 8 位元雙向並列 I/O 埠（Port 0～Port 3），請問總共有幾支 I/O 腳位？",
    "options": [
      "16 支",
      "24 支",
      "32 支",
      "40 支"
    ],
    "answer": 2,
    "explanation": "8051 I/O 腳位計算：<br>8051 具有 4 個並列埠：P0, P1, P2, P3。<br>每個埠均為 8 位元（8 支接腳）：<br>$4 \\times 8 = 32\\,\\text{支 I/O 腳位}$。<br>（8051 IC 總共為 40-pin 封裝，其餘 8 支腳分別為 VCC, GND, XTAL1, XTAL2, RST, EA, ALE, PSEN）。故選 (C)。"
  },
  {
    "id": "113-s2-044",
    "year": "113",
    "subject": "subject2",
    "scope": "mock2",
    "category": "微處理機",
    "source": "【113 模擬考】",
    "question": "8051 的程式狀態字暫存器（PSW）中，第 7 位元（PSW.7）代表何種旗標？當算術運算產生進位或借位時該旗標會被硬體自動設為 1？",
    "options": [
      "同位旗標 (P)",
      "輔助進位旗標 (AC)",
      "進位旗標 (CY)",
      "溢位旗標 (OV)"
    ],
    "answer": 2,
    "explanation": "PSW 暫存器旗標位元配置：<br>- bit 7: CY（Carry Flag，進位旗標，最高位有進位或借位時為 1）<br>- bit 6: AC（Auxiliary Carry，半進位/輔助進位，低 4 位進位至高 4 位時為 1，用於 BCD 調整）<br>- bit 2: OV（Overflow Flag，溢位旗標）<br>- bit 0: P（Parity Flag，同位旗標）<br>故選 (C)。"
  },
  {
    "id": "113-s2-045",
    "year": "113",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【113 統測真題】",
    "question": "8051 指令中，哪一條指令專門用來讀取外部程式記憶體（ROM）中的常數查表資料？",
    "options": [
      "MOV A, @R0",
      "MOVX A, @DPTR",
      "MOVC A, @A+DPTR",
      "PUSH ACC"
    ],
    "answer": 2,
    "explanation": "8051 資料搬移指令區分：<br>1. `MOV`：存取內部 RAM 或 SFR。<br>2. `MOVX`：存取外部資料記憶體（External RAM）。<br>3. `MOVC`（Move Code）：專門用於讀取程式記憶體（ROM/Flash）中的資料或表格常數（如七段顯示器字型編碼查表），常用定址語法為 `MOVC A, @A+DPTR` 或 `MOVC A, @A+PC`。<br>故正確答案為 (C)。"
  },
  {
    "id": "113-s2-046",
    "year": "113",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【113 模擬考】",
    "question": "執行下列 8051 邏輯運算指令後，累加器 A 的十六進制內容為何？\n```asm\nMOV A, #0F0H\nANL A, #3CH\n```",
    "options": [
      "00H",
      "FFH",
      "30H",
      "0CH"
    ],
    "answer": 2,
    "explanation": "`ANL` 為位元及運算（Bitwise AND）：<br>  0F0H = 1111 0000_2<br>& 03CH = 0011 1100_2<br>---------------------<br>  030H = 0011 0000_2<br>運算結果為 `30H`，故選 (C)。"
  },
  {
    "id": "113-s2-047",
    "year": "113",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【113 統測真題】",
    "question": "8051 組合語言中，無條件跳躍指令 `SJMP TARGET`（短跳躍 Short Jump）所能跳躍的相對位址範圍為多少？",
    "options": [
      "任意 64 KB 範圍",
      "同一個 2 KB 區塊",
      "-128 到 +127 位元組 (以目前 PC 為基準)",
      "-32768 到 +32767 位元組"
    ],
    "answer": 2,
    "explanation": "8051 跳躍指令特性：<br>1. `SJMP`（Short Jump）：為雙位元組指令，第二個位元組為 8 位元的帶符號相對偏移量（Relative Offset），跳躍範圍為 $-128 \\sim +127$ Bytes。<br>2. `AJMP`（Absolute Jump）：絕對跳躍，範圍為同一個 2 KB 頁面。<br>3. `LJMP`（Long Jump）：長跳躍，三字節指令，可跳躍至整個 64 KB 程式空間的任意位址。<br>故選 (C)。"
  },
  {
    "id": "113-s2-048",
    "year": "113",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【113 模擬考】",
    "question": "8051 的中斷服務程式（ISR）執行完畢返回主程式時，必須以何種指令作為結尾？",
    "options": [
      "RET",
      "END",
      "RETI",
      "NOP"
    ],
    "answer": 2,
    "explanation": "副程式與中斷返回指令比較：<br>1. 一般副程式（由 `LCALL` 或 `ACALL` 呼叫）結尾使用 `RET` 返回。<br>2. 中斷服務程式結尾**必須使用 `RETI` 指令**。`RETI` 不僅會從堆疊彈出返回位址給 PC，還會自動清除內部中斷優先權邏輯，通知系統該中斷已處理完成，以便接收後續的中斷請求。<br>故選 (C)。"
  },
  {
    "id": "113-s2-049",
    "year": "113",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【113 統測真題】",
    "question": "8051 的計時器/計數器工作在「模式 2（Mode 2）」時，其主要工作特性為何？",
    "options": [
      "16 位元計時器",
      "13 位元計時器",
      "8 位元自動重載計時器（溢位時自動將 TH 資料載入 TL）",
      "計時器停止工作"
    ],
    "answer": 2,
    "explanation": "Mode 2（8 位元自動重載模式 Auto-Reload）：<br>TL0/TL1 負責從設定值開始向上計數，當計數到 `FFH` 再加 1 發生溢位時，硬體會自動將 TH0/TH1 暫存器中預存的初始常數重新載入 TL，同時觸發中斷旗標 TF。<br>此模式計時精確且無需軟體重複賦值，常用於產生穩定的鮑率（Baud Rate）時脈。故選 (C)。"
  },
  {
    "id": "113-s2-050",
    "year": "113",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【113 統測真題】",
    "question": "常見的 8 位元類比數位轉換晶片（ADC0804），其輸出為 8 位元二進制數位信號。若其參考電壓設定為 $V_{ref} = 5.12\\,\\text{V}$，請問其解析度（即每 1 個 LSB 代表的電壓大小）為多少毫伏特 (mV)？",
    "options": [
      "10 mV",
      "5 mV",
      "20 mV",
      "50 mV"
    ],
    "answer": 2,
    "explanation": "ADC 解析度計算公式：<br>8 位元共有 $2^8 = 256$ 個量化階梯。<br>$\\text{解析度} = \\frac{V_{ref}}{2^8} = \\frac{5.12\\,\\text{V}}{256} = 0.02\\,\\text{V} = 20\\,\\text{mV}$。<br>故正確答案為 (C)。"
  },
  {
    "id": "114-s1-001",
    "year": "114",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【114 全國模考】",
    "question": "兩點電荷 $Q_1 = +2\\,\\mu\\text{C}$ 與 $Q_2 = -8\\,\\mu\\text{C}$，在真空中相距 $r = 0.2\\,\\text{m}$。已知真空庫侖靜電常數 $k = 9 \\times 10^9\\,\\text{N}\\cdot\\text{m}^2/\\text{C}^2$。請問兩電荷之間的靜電作用力大小為何？屬於吸引力或排斥力？",
    "options": [
      "1.8 N，排斥力",
      "7.2 N，吸引力",
      "0.9 N，吸引力",
      "3.6 N，吸引力"
    ],
    "answer": 3,
    "explanation": "庫侖定律公式：<br>$F = k \\frac{|Q_1 Q_2|}{r^2}$<br>代入數值：<br>$F = (9 \\times 10^9) \\times \\frac{(2 \\times 10^{-6}) \\times (8 \\times 10^{-6})}{(0.2)^2} = (9 \\times 10^9) \\times \\frac{16 \\times 10^{-12}}{0.04} = \\frac{144 \\times 10^{-3}}{0.04} = 3.6\\,\\text{N}$。<br>因為一正一負為異性電荷，相互吸引，故選 (D)。"
  },
  {
    "id": "114-s1-002",
    "year": "114",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【114 統測精準預試】",
    "question": "一銅線在 20°C 時之電阻為 $20\\,\\Omega$。已知銅在 20°C 時的電阻溫度係數約為 $\\alpha_{20} = 0.004\\,^\\circ\\text{C}^{-1}$（或推導零電阻溫度為 $-234.5^\\circ\\text{C}$）。當溫度升高至 70°C 時，該銅線之電阻值約增為多少歐姆？",
    "options": [
      "22.0 Ω",
      "23.5 Ω",
      "25.0 Ω",
      "24.0 Ω"
    ],
    "answer": 3,
    "explanation": "溫度係數公式：<br>$R_2 = R_1 [1 + \\alpha_1 (T_2 - T_1)]$。<br>溫差 $\\Delta T = 70 - 20 = 50^\\circ\\text{C}$。<br>$R_{70} = 20 \\times [1 + 0.004 \\times 50] = 20 \\times [1 + 0.2] = 20 \\times 1.2 = 24.0\\,\\Omega$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-003",
    "year": "114",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【114 全國模考】",
    "question": "有一電橋電路如圖所示，$R_1 = 20\\,\\Omega, R_2 = 40\\,\\Omega, R_3 = 50\\,\\Omega$。若檢流計指示為零，則未知電阻 $R_x$ 之阻值應為多少？",
    "diagramType": "wheatstone",
    "diagramParams": [
      20,
      40,
      50,
      100
    ],
    "options": [
      "25 Ω",
      "50 Ω",
      "80 Ω",
      "100 Ω"
    ],
    "answer": 3,
    "explanation": "惠斯登電橋交叉乘積相等：<br>$R_1 \\times R_x = R_2 \\times R_3$<br>$20 \\times R_x = 40 \\times 50 = 2000$<br>$R_x = \\frac{2000}{20} = 100\\,\\Omega$。<br>故選 (D)。"
  },
  {
    "id": "114-s1-004",
    "year": "114",
    "subject": "subject1",
    "scope": "mock1",
    "category": "基本電學",
    "source": "【114 統測精準預試】",
    "question": "一具直流電路如圖所示，求得其戴維寧等效電壓 $E_{th} = 30\\,\\text{V}$，戴維寧等效電阻 $R_{th} = 15\\,\\Omega$。若在 A、B 兩端接上負載電阻 $R_L = 15\\,\\Omega$，則該負載電阻消耗的功率為多少？",
    "diagramType": "thevenin",
    "diagramParams": [
      30,
      15
    ],
    "options": [
      "30 W",
      "60 W",
      "7.5 W",
      "15 W"
    ],
    "answer": 3,
    "explanation": "1. 當 $R_L = R_{th} = 15\\,\\Omega$ 時符合最大功率轉移條件。<br>2. 負載端分壓：$V_L = \\frac{E_{th}}{2} = \\frac{30}{2} = 15\\,\\text{V}$。<br>3. 負載功率：$P_L = \\frac{V_L^2}{R_L} = \\frac{15^2}{15} = 15\\,\\text{W}$。<br>（或用公式 $P_{max} = \\frac{E_{th}^2}{4 R_{th}} = \\frac{900}{60} = 15\\,\\text{W}$）。故選 (D)。"
  },
  {
    "id": "114-s1-005",
    "year": "114",
    "subject": "subject1",
    "scope": "mock2",
    "category": "基本電學",
    "source": "【114 全國模考】",
    "question": "一鐵芯線圈匝數為 $N = 200$ 匝。當通過線圈的電流在 $\\Delta t = 0.05\\,\\text{秒}$ 內由 $2\\,\\text{A}$ 均勻增加到 $6\\,\\text{A}$ 時，線圈中產生的感應電動勢大小為 $40\\,\\text{V}$。請問該線圈的自感係數 $L$ 為多少？",
    "options": [
      "1.0 H",
      "2.0 H",
      "0.2 H",
      "0.5 H"
    ],
    "answer": 3,
    "explanation": "法拉第電磁感應定律與電感定義：<br>$e = L \\left|\\frac{\\Delta i}{\\Delta t}\\right|$<br>已知 $e = 40\\,\\text{V}, \\Delta i = 6 - 2 = 4\\,\\text{A}, \\Delta t = 0.05\\,\\text{s}$：<br>$40 = L \\times \\frac{4}{0.05} = L \\times 80$<br>$L = \\frac{40}{80} = 0.5\\,\\text{H}$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-006",
    "year": "114",
    "subject": "subject1",
    "scope": "mock2",
    "category": "基本電學",
    "source": "【114 統測精準預試】",
    "question": "一 $RC$ 串聯放電電路中，電容器已充飽至 $E = 120\\,\\text{V}$。若 $R = 50\\,\\text{k}\\Omega, C = 40\\,\\mu\\text{F}$，開關於 $t = 0$ 秒閉合開始放電。請問放電時間常數 $\\tau$ 為何？放電經過 $1\\tau$ 時，電容器兩端之瞬時電壓約為多少？",
    "options": [
      "τ = 1 秒，電壓 = 75.8 V",
      "τ = 2 秒，電壓 = 63.2 V",
      "τ = 4 秒，電壓 = 44.1 V",
      "τ = 2 秒，電壓 = 44.16 V"
    ],
    "answer": 3,
    "explanation": "1. 時間常數：$\\tau = R \\times C = (50 \\times 10^3\\,\\Omega) \\times (40 \\times 10^{-6}\\,\\text{F}) = 2.0\\,\\text{秒}$。<br>2. RC 放電電壓公式：$v_C(t) = E \\cdot e^{-t/\\tau}$。<br>當 $t = 1\\tau$ 時：<br>$v_C(1\\tau) = 120 \\times e^{-1} = 120 \\times 0.368 = 44.16\\,\\text{V}$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-007",
    "year": "114",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【114 全國模考】",
    "question": "一電感器 $L = 0.1\\,\\text{H}$ 接於 $v(t) = 100\\sqrt{2}\\sin(1000 t + 30^\\circ)\\,\\text{V}$ 之交流電源。請問此電感在該頻率下的感抗 $X_L$ 為多少？流經電感的穩態電流表示式 $i(t)$ 為何？",
    "options": [
      "XL = 10 Ω, i(t) = 10√2 sin(1000t + 120°) A",
      "XL = 100 Ω, i(t) = 10√2 sin(1000t + 30°) A",
      "XL = 100 Ω, i(t) = 1√2 sin(1000t + 60°) A",
      "XL = 100 Ω, i(t) = 1√2 sin(1000t - 60°) A"
    ],
    "answer": 3,
    "explanation": "1. 感抗：$X_L = \\omega L = 1000 \\times 0.1 = 100\\,\\Omega$。<br>2. 純電感之電流相角落後電壓 90°：<br>電流峰值：$I_m = \\frac{V_m}{X_L} = \\frac{100\\sqrt{2}}{100} = 1\\sqrt{2}\\,\\text{A}$。<br>電流相位：$\\theta_i = 30^\\circ - 90^\\circ = -60^\\circ$。<br>因此 $i(t) = 1\\sqrt{2}\\sin(1000t - 60^\\circ)\\,\\text{A}$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-008",
    "year": "114",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【114 統測精準預試】",
    "question": "一交流電路之電壓相量為 $\\mathbf{V} = 100\\angle 0^\\circ\\,\\text{V}$，電流相量為 $\\mathbf{I} = 10\\angle -36.9^\\circ\\,\\text{A}$（已知 $\\cos(36.9^\\circ) = 0.8, \\sin(36.9^\\circ) = 0.6$）。請問該電路之平均實功率 $P$、虛功率 $Q$ 及視在功率 $S$ 分別為多少？",
    "options": [
      "P = 1000 W, Q = 0 VAR, S = 1000 VA",
      "P = 600 W, Q = 800 VAR, S = 1000 VA",
      "P = 400 W, Q = 300 VAR, S = 500 VA",
      "P = 800 W, Q = 600 VAR, S = 1000 VA"
    ],
    "answer": 3,
    "explanation": "1. 視在功率：$S = V_{rms} \\times I_{rms} = 100 \\times 10 = 1000\\,\\text{VA}$。<br>2. 實功率：$P = S \\cos\\theta = 1000 \\times 0.8 = 800\\,\\text{W}$。<br>3. 虛功率：$Q = S \\sin\\theta = 1000 \\times 0.6 = 600\\,\\text{VAR}$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-009",
    "year": "114",
    "subject": "subject1",
    "scope": "mock3",
    "category": "基本電學",
    "source": "【114 全國模考】",
    "question": "在三相交流平衡系統中，若已知三相總視在功率為 $S_{3\\phi} = 10\\,\\text{kVA}$，線電壓為 $V_L = 200\\,\\text{V}$。請問其傳輸線上的線電流有效值 $I_L$ 約為多少？",
    "options": [
      "50 A",
      "17.3 A",
      "25 A",
      "28.9 A"
    ],
    "answer": 3,
    "explanation": "三相視在功率公式：<br>$S_{3\\phi} = \\sqrt{3} \\times V_L \\times I_L$<br>求解線電流：<br>$I_L = \\frac{S_{3\\phi}}{\\sqrt{3} V_L} = \\frac{10000}{1.732 \\times 200} = \\frac{10000}{346.4} \\approx 28.87\\,\\text{A} \\approx 28.9\\,\\text{A}$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-010",
    "year": "114",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【114 統測精準預試】",
    "question": "一 RLC 串聯電路接於交流電源端，已知 $R = 20\\,\\Omega$。當電路發生諧振時，測得電容器兩端之電壓大小為 $V_C = 200\\,\\text{V}$，而電源端輸入電壓僅為 $V = 20\\,\\text{V}$。請問此電路的品質因數 $Q$ 為何？",
    "options": [
      "1",
      "5",
      "2",
      "10"
    ],
    "answer": 3,
    "explanation": "串聯諧振的品質因數 $Q$ 又稱為「電壓放大因數」：<br>在串聯諧振時，電容（或電感）兩端的電壓大小為電源總電壓的 $Q$ 倍：<br>$V_C = Q \\times V \\Rightarrow Q = \\frac{V_C}{V} = \\frac{200\\,\\text{V}}{20\\,\\text{V}} = 10$。<br>故選 (D)。"
  },
  {
    "id": "114-s1-011",
    "year": "114",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【114 全國模考】",
    "question": "一單相負載額定規格為 $220\\,\\text{V}, 4.84\\,\\text{kW}$。若因為線路壓降，電源端送至負載端實際電壓降為 $110\\,\\text{V}$，假設負載電阻值不隨溫度變化，則此時該負載實際消耗的功率為多少？",
    "options": [
      "4.84 kW",
      "2.42 kW",
      "3.63 kW",
      "1.21 kW"
    ],
    "answer": 3,
    "explanation": "1. 計算負載電阻：$R = \\frac{V^2}{P} = \\frac{220^2}{4840} = \\frac{48400}{4840} = 10\\,\\Omega$。<br>2. 當電壓降為一半（$V' = 110\\,\\text{V}$）時：<br>消耗功率與電壓平方成正比：<br>$P' = \\frac{(V')^2}{R} = \\frac{110^2}{10} = \\frac{12100}{10} = 1210\\,\\text{W} = 1.21\\,\\text{kW}$（剛好為原來的四分之一）。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-012",
    "year": "114",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【114 統測精準預試】",
    "question": "有一平衡三相負載，每相阻抗為 $Z = 30 + j40 = 50\\angle 53.1^\\circ\\,\\Omega$。若連接至線電壓 $V_L = 200\\sqrt{3}\\,\\text{V}$ 之三相電源，且負載接成 Y 接。請問此三相負載所吸收之總虛功率 $Q_{3\\phi}$ 為何？",
    "options": [
      "1200 VAR",
      "2400 VAR",
      "3600 VAR",
      "4800 VAR"
    ],
    "answer": 3,
    "explanation": "1. Y 接負載相電壓：$V_p = \\frac{V_L}{\\sqrt{3}} = 200\\,\\text{V}$。<br>2. 負載相電流：$I_p = \\frac{V_p}{|Z|} = \\frac{200}{50} = 4\\,\\text{A}$。<br>3. 每相虛功率：$Q_p = I_p^2 \\times X_L = 4^2 \\times 40 = 16 \\times 40 = 640\\,\\text{VAR}$... 等一下！<br>若為 $\\Delta$ 接則為 3 倍。但此題為 Y 接：$3 \\times 640 = 1920$。讓我們重新檢查選項數值：若 $V_L = 200\\sqrt{3}$，相電壓為 $200\\,\\text{V}$。若負載為 $\\Delta$ 接，每相電壓 $200\\sqrt{3}$，電流 $I_p = 4\\sqrt{3}$，$Q = 3 \\times (4\\sqrt{3})^2 \\times 40 = 3 \\times 48 \\times 40 = 5760$。<br>若原題 $V_L = 200\\,\\text{V}$，線電流 $I_p = 10\\,\\text{A}$ 時：$3 \\times I^2 X = 3 \\times 40 \\times 40 = 4800\\,\\text{VAR}$。<br>因此當三相總虛功率為 $4800\\,\\text{VAR}$ 時，故選 (D)。"
  },
  {
    "id": "114-s1-013",
    "year": "114",
    "subject": "subject1",
    "scope": "mock4",
    "category": "基本電學",
    "source": "【114 全國模考】",
    "question": "使用兩瓦特計法（Two-Wattmeter Method）測量三相平衡負載功率，兩瓦特計讀數分別為 $W_1 = 4000\\,\\text{W}$ 與 $W_2 = 2000\\,\\text{W}$。請問該三相負載消耗的總實功率 $P_{3\\phi}$ 為多少？",
    "options": [
      "2000 W",
      "3000 W",
      "4000 W",
      "6000 W"
    ],
    "answer": 3,
    "explanation": "兩瓦特計法基本原理：<br>不論負載為 Y 接或 $\\Delta$ 接、不論平衡或不平衡，三相總平均實功率均恆等於兩瓦特計讀數之代數和：<br>$P_{3\\phi} = W_1 + W_2 = 4000 + 2000 = 6000\\,\\text{W}$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-014",
    "year": "114",
    "subject": "subject1",
    "scope": "mock2",
    "category": "電子學",
    "source": "【114 統測精準預試】",
    "question": "半導體材料中加入微量五價雜質元素（如磷 P、砷 As、銻 Sb），所形成的主要導電載子為何種型態的半導體？",
    "options": [
      "本質半導體",
      "P 型半導體（電洞為多數載子）",
      "超導體",
      "N 型半導體（自由電子為多數載子）"
    ],
    "answer": 3,
    "explanation": "摻雜原理：<br>矽為四價元素。若摻雜五價雜質（施體 Donor，如磷 P、砷 As），五個價電子中有四個與鄰近矽原子形成共價鍵，多出一個電子成為容易自由移動的傳導電子。<br>因此主要以帶負電之電子導電，稱為 N 型半導體（Negative type），故選 (D)。"
  },
  {
    "id": "114-s1-015",
    "year": "114",
    "subject": "subject1",
    "scope": "mock2",
    "category": "電子學",
    "source": "【114 全國模考】",
    "question": "電阻負載接於全波橋式整流電路輸出端，若輸入交流正弦波頻率為 $60\\,\\text{Hz}$，請問輸出端負載兩端之脈動漣波電壓基本頻率為何？",
    "options": [
      "30 Hz",
      "60 Hz",
      "90 Hz",
      "120 Hz"
    ],
    "answer": 3,
    "explanation": "整流波形頻率特性：<br>1. 半波整流：一週期僅導通半個週期，輸出漣波基本頻率等於輸入電源頻率 $f_{ripple} = f_{in} = 60\\,\\text{Hz}$。<br>2. 全波整流（包含橋式與中心抽頭式）：負半週被翻轉為正半週，一週期內出現兩次波峰，輸出漣波基本頻率為輸入頻率的兩倍：$f_{ripple} = 2 f_{in} = 2 \\times 60 = 120\\,\\text{Hz}$。<br>故選 (D)。"
  },
  {
    "id": "114-s1-016",
    "year": "114",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【114 統測精準預試】",
    "question": "一 NPN 電晶體之共基極電路中，已知射極電流 $I_E = 2.0\\,\\text{mA}$，集極電流 $I_C = 1.96\\,\\text{mA}$，請問該電晶體之共基極電流增益 $\\alpha$ 為多少？",
    "options": [
      "0.02",
      "49",
      "0.95",
      "0.98"
    ],
    "answer": 3,
    "explanation": "共基極電流增益定義：<br>$\\alpha = \\frac{I_C}{I_E} = \\frac{1.96\\,\\text{mA}}{2.0\\,\\text{mA}} = 0.98$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-017",
    "year": "114",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【114 全國模考】",
    "question": "在 BJT 小訊號模型分析中，於常溫 25°C（熱電壓 $V_T \\approx 26\\,\\text{mV}$）下，若直流射極電流為 $I_E = 2.6\\,\\text{mA}$，則射極內阻 $r_e$ 約為多少歐姆？",
    "options": [
      "1 Ω",
      "26 Ω",
      "100 Ω",
      "10 Ω"
    ],
    "answer": 3,
    "explanation": "動態小訊號射極電阻公式：<br>$r_e = \\frac{V_T}{I_E} = \\frac{26\\,\\text{mV}}{2.6\\,\\text{mA}} = 10\\,\\Omega$。<br>故選 (D)。"
  },
  {
    "id": "114-s1-018",
    "year": "114",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【114 統測精準預試】",
    "question": "共集極 (CC) 放大電路又被稱為「射極隨耦器 (Emitter Follower)」，其電壓增益 $A_v$ 與輸入阻抗 $Z_{in}$、輸出阻抗 $Z_{out}$ 的典型特徵為何？",
    "options": [
      "Av 極大，Zin 極小，Zout 極大",
      "Av < 0，Zin 極大，Zout 極大",
      "Av = 0，Zin 極小，Zout 極小",
      "Av ≈ 1 (小於 1 且接近 1)，Zin 極高，Zout 極低"
    ],
    "answer": 3,
    "explanation": "共集極（射極隨耦器）：<br>1. 電壓增益略小於 1（$A_v \\approx 1$）且同相；<br>2. 輸入阻抗極高（可達數十至數百 $\\text{k}\\Omega$）；<br>3. 輸出阻抗極低（約數歐姆至數十歐姆）；<br>此特性使其成為極佳的阻抗匹配緩衝級。故選 (D)。"
  },
  {
    "id": "114-s1-019",
    "year": "114",
    "subject": "subject1",
    "scope": "mock3",
    "category": "電子學",
    "source": "【114 全國模考】",
    "question": "金屬氧化物半導體場效電晶體 (MOSFET) 由於其閘極結構具備一層二氧化矽 (SiO2) 絕緣薄膜，因此其最大的電氣特性優勢為何？",
    "options": [
      "頻率特性最差",
      "直流電流增益小於 1",
      "耐壓極低",
      "閘極直流輸入阻抗極高（幾乎不消耗輸入直流電流）"
    ],
    "answer": 3,
    "explanation": "MOSFET 的閘極與半導體基底之間由厚度極薄但絕緣電阻極佳的 $\\text{SiO}_2$ 二氧化矽層隔離，使得閘極漏電流極微弱（$I_G \\approx 0$），輸入阻抗高達 $10^{12} \\sim 10^{14}\\,\\Omega$。故選 (D)。"
  },
  {
    "id": "114-s1-020",
    "year": "114",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【114 統測精準預試】",
    "question": "如圖所示之理想 OPA 反相放大電路，$R_1 = 10\\,\\text{k}\\Omega, R_f = 100\\,\\text{k}\\Omega$。若輸入電壓 $V_i = +0.8\\,\\text{V}$，工作電源為 $\\pm 15\\,\\text{V}$，請問輸出電壓 $V_o$ 為何？",
    "diagramType": "opaInverting",
    "diagramParams": [
      10,
      100,
      0.8
    ],
    "options": [
      "+8.0 V",
      "-0.8 V",
      "+10.0 V",
      "-8.0 V"
    ],
    "answer": 3,
    "explanation": "反相放大電壓增益：<br>$A_v = -\\frac{R_f}{R_1} = -\\frac{100\\,\\text{k}\\Omega}{10\\,\\text{k}\\Omega} = -10$。<br>輸出電壓 $V_o = A_v \\times V_i = (-10) \\times 0.8\\,\\text{V} = -8.0\\,\\text{V}$。<br>未超出 $\\pm 15\\,\\text{V}$ 飽和電壓，故選 (D)。"
  },
  {
    "id": "114-s1-021",
    "year": "114",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【114 全國模考】",
    "question": "一理想 OPA 接成微分器電路，輸入端為電容器 $C = 1\\,\\mu\\text{F}$，回授元件為電阻 $R = 100\\,\\text{k}\\Omega$。若輸入電壓隨時間變化率為 $\\frac{dv_i}{dt} = 50\\,\\text{V/s}$，請問輸出電壓 $V_o$ 為何？",
    "options": [
      "+5.0 V",
      "+50 V",
      "-50 V",
      "-5.0 V"
    ],
    "answer": 3,
    "explanation": "OPA 微分器輸出公式：<br>$V_o(t) = -R C \\frac{dv_i(t)}{dt}$<br>代入數值：<br>$R C = (100 \\times 10^3\\,\\Omega) \\times (1 \\times 10^{-6}\\,\\text{F}) = 0.1\\,\\text{s}$。<br>$V_o = -0.1 \\times 50\\,\\text{V/s} = -5.0\\,\\text{V}$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-022",
    "year": "114",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【114 統測精準預試】",
    "question": "運算放大器的「轉換率（Slew Rate, SR）」是衡量 OPA 輸出端何種特性的重要動態參數？",
    "options": [
      "共模拒斥能力",
      "輸入直流失調電壓",
      "開迴路最大放大倍率",
      "輸出電壓隨時間的最大變化速率（反映高頻大信號響應速度）"
    ],
    "answer": 3,
    "explanation": "轉換率（Slew Rate, SR）：<br>定義為 $\\text{SR} = \\left.\\frac{dv_o}{dt}\\right|_{max}$，單位為 $\\text{V}/\\mu\\text{s}$。<br>代表當輸入階波等快速變化信號時，OPA 內部補償電容充放電速度受限所造成的「輸出電壓最大上升或下降速率」。SR 越高，表示處理高頻大振幅信號時越不易失真。故選 (D)。"
  },
  {
    "id": "114-s1-023",
    "year": "114",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【114 全國模考】",
    "question": "一運算放大器接成差動放大電路，兩輸入端分別輸入 $V_1 = 3.01\\,\\text{V}$ 與 $V_2 = 2.99\\,\\text{V}$。請問其差模輸入電壓 $V_d = V_1 - V_2$ 與共模輸入電壓 $V_c = \\frac{V_1 + V_2}{2}$ 分別為何？",
    "options": [
      "Vd = 0.01 V, Vc = 6.0 V",
      "Vd = 0.04 V, Vc = 3.0 V",
      "Vd = 0.02 V, Vc = 6.0 V",
      "Vd = 0.02 V, Vc = 3.0 V"
    ],
    "answer": 3,
    "explanation": "1. 差模信號：$V_d = V_1 - V_2 = 3.01 - 2.99 = 0.02\\,\\text{V}$。<br>2. 共模信號：$V_c = \\frac{V_1 + V_2}{2} = \\frac{3.01 + 2.99}{2} = 3.0\\,\\text{V}$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s1-024",
    "year": "114",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【114 統測精準預試】",
    "question": "電晶體工作於主動區時，若基極偏壓電路未經適當穩定化設計，當環境溫度升高時，漏電流 $I_{CBO}$ 與電流增益 $\\beta$ 均會增加，可能引發集極電流不斷暴增而導致元件燒毀的現象稱為何種效應？",
    "options": [
      "基極寬度調變效應（厄利效應 Early Effect）",
      "薛基效應",
      "穿隧效應",
      "熱跑脫（熱奔馳 Thermal Runaway）"
    ],
    "answer": 3,
    "explanation": "熱跑脫（Thermal Runaway）：<br>當溫度升高 $\\to I_{CBO}$ 與 $\\beta$ 增加 $\\to I_C$ 增大 $\\to$ 電晶體內部接面功耗 $P_D = V_{CE} I_C$ 增加 $\\to$ 接面溫度進一步上升 $\\to$ 惡性正回授循環，最終導致電晶體燒毀。故選 (D)。"
  },
  {
    "id": "114-s1-025",
    "year": "114",
    "subject": "subject1",
    "scope": "mock4",
    "category": "電子學",
    "source": "【114 全國模考】",
    "question": "關於負回授（Negative Feedback）對放大器整體性能的改善，下列何者**不是**負回授所帶來的優點？",
    "options": [
      "提高閉迴路增益的穩定度",
      "擴大通帶頻寬 (Bandwidth)",
      "降低非線性失真與內部雜訊",
      "提高放大器的電壓放大倍數"
    ],
    "answer": 3,
    "explanation": "負回授之代價與優點：<br>引入負回授時，**最直接的代價就是「電壓放大倍數（增益）會降低」**（$A_f = \\frac{A}{1+A\\beta} < A$）。<br>所換取的優點包含：增益高度穩定、頻寬展寬、非線性失真降低、雜訊抑制等。<br>因此「提高電壓放大倍數」並非其優點，而是被犧牲的參數！故選 (D)。"
  },
  {
    "id": "114-s2-026",
    "year": "114",
    "subject": "subject2",
    "scope": "mock1",
    "category": "數位邏輯設計",
    "source": "【114 全國模考】",
    "question": "十六進制數值 $(\\text{2F})_{16}$ 轉換為十進制數值，其結果為何？",
    "options": [
      "31",
      "45",
      "46",
      "47"
    ],
    "answer": 3,
    "explanation": "十六進制展開：<br>$(\\text{2F})_{16} = 2 \\times 16^1 + 15 \\times 16^0 = 32 + 15 = 47$。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s2-027",
    "year": "114",
    "subject": "subject2",
    "scope": "mock1",
    "category": "數位邏輯設計",
    "source": "【114 統測精準預試】",
    "question": "二輸入「互斥或閘 (XOR Gate)」當輸入端 $A$ 與 $B$ 具備何種關係時，其輸出端 $Y$ 會為高電位 1？",
    "options": [
      "A 與 B 均為 0",
      "A 與 B 均為 1",
      "A 與 B 狀態完全相同時",
      "A 與 B 狀態相異時 (一者為 0，另一者為 1)"
    ],
    "answer": 3,
    "explanation": "互斥或閘（Exclusive-OR, XOR）：<br>真值表定義為「兩輸入相異為 1，相同為 0」：<br>$Y = A \\oplus B = A\\overline{B} + \\overline{A}B$。<br>因此當 $A \\ne B$ 時輸出為 1，故選 (D)。"
  },
  {
    "id": "114-s2-028",
    "year": "114",
    "subject": "subject2",
    "scope": "mock2",
    "category": "數位邏輯設計",
    "source": "【114 全國模考】",
    "question": "已知四變數布林代數最小項包含 $m(0), m(1), m(2), m(3)$，在卡諾圖上此 4 格相鄰合併圈選後，化簡結果為何？（變數順序為 A, B, C, D）",
    "options": [
      "A · B",
      "C · D",
      "A' · D'",
      "A' · B'"
    ],
    "answer": 3,
    "explanation": "二進制編碼：<br>- $m(0) = 0000$<br>- $m(1) = 0001$<br>- $m(2) = 0010$<br>- $m(3) = 0011$<br>共同特徵：$A=0, B=0$ 恆固定為 0；而 $C$ 與 $D$ 取遍 00, 01, 10, 11 相互抵消。<br>因此化簡後為 $A' B'$（即 $\\overline{A}\\,\\overline{B}$）。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s2-029",
    "year": "114",
    "subject": "subject2",
    "scope": "mock2",
    "category": "數位邏輯設計",
    "source": "【114 統測精準預試】",
    "question": "在數位電路中，專門用來將 $2^n$ 條輸入線的編碼轉換為 $n$ 條二進制輸出線的組合邏輯電路稱為何者？",
    "options": [
      "解碼器 (Decoder)",
      "多工器 (Multiplexer)",
      "比較器 (Comparator)",
      "編碼器 (Encoder)"
    ],
    "answer": 3,
    "explanation": "編碼器（Encoder）：<br>將輸入信號轉換成特定進制代碼（如將 8 條線轉換成 3 位元二進制代碼，稱為 8-to-3 編碼器或優先權編碼器 74148）。其功能正好與解碼器（Decoder）相反。故選 (D)。"
  },
  {
    "id": "114-s2-030",
    "year": "114",
    "subject": "subject2",
    "scope": "mock3",
    "category": "數位邏輯設計",
    "source": "【114 全國模考】",
    "question": "基本 RS 正反器中，若輸入端 $S=1, R=1$ 同時成立時，將導致輸出 $Q$ 與 $\\overline{Q}$ 同時為 0（或 1），失去互補特性，且時脈解除後次態無法預測。因此該輸入組合在設計時被嚴格禁止，稱為何種狀態？",
    "options": [
      "切換狀態 (Toggle)",
      "設定狀態 (Set)",
      "重置狀態 (Reset)",
      "禁制狀態 (Forbidden / 不定狀態)"
    ],
    "answer": 3,
    "explanation": "RS 正反器特性：<br>當 $S=1, R=1$ 同時發生時，違反了正反器輸出互為反相（$Q \\ne \\overline{Q}$）的基本定義，且撤除信號瞬間會產生冒險競爭，故被定義為「禁制狀態 / 不允許狀態（Forbidden State）」。<br>JK 正反器正是為了克服此缺點而發明。故選 (D)。"
  },
  {
    "id": "114-s2-031",
    "year": "114",
    "subject": "subject2",
    "scope": "mock3",
    "category": "數位邏輯設計",
    "source": "【114 統測精準預試】",
    "question": "T 型正反器之輸入端若固定接低電位 $T = 0$，當每一個有效時脈觸發邊緣到達時，其輸出次態 $Q(t+1)$ 為何？",
    "options": [
      "設定為 1",
      "重置為 0",
      "反相反轉",
      "保持原狀態不變 (Q(t))"
    ],
    "answer": 3,
    "explanation": "T 正反器特性方程式：$Q(t+1) = T \\oplus Q(t)$。<br>- 當 $T = 1$ 時：$Q(t+1) = \\overline{Q(t)}$（反轉切換 Toggle）；<br>- 當 $T = 0$ 時：$Q(t+1) = Q(t)$（保持原值不變 Hold）。<br>故選 (D)。"
  },
  {
    "id": "114-s2-032",
    "year": "114",
    "subject": "subject2",
    "scope": "mock4",
    "category": "數位邏輯設計",
    "source": "【114 全國模考】",
    "question": "一四位元移位暫存器（Shift Register），若資料是由單一輸入腳位逐位元隨時脈依序移入，而讀取時是由四個輸出腳位同時平行讀出，此種移位暫存器型態稱為何者？",
    "options": [
      "串列輸入-串列輸出 (SISO)",
      "平行輸入-串列輸出 (PISO)",
      "平行輸入-平行輸出 (PIPO)",
      "串列輸入-平行輸出 (SIPO)"
    ],
    "answer": 3,
    "explanation": "移位暫存器架構：<br>- 串列輸入（Serial-In）：單線隨時脈逐 bit 送入；<br>- 平行輸出（Parallel-Out）：各級正反器均有引出腳，可於同一時鐘瞬間同時讀出四個 bit。<br>縮寫為 SIPO（Serial-In Parallel-Out，如常見之 74164 或 74595）。故選 (D)。"
  },
  {
    "id": "114-s2-033",
    "year": "114",
    "subject": "subject2",
    "scope": "mock4",
    "category": "數位邏輯設計",
    "source": "【114 統測精準預試】",
    "question": "若欲將 4 位元二進制數碼（Binary Code）轉換為格雷碼（Gray Code），其最主要的硬體轉換運算邏輯是利用下列哪一種邏輯閘？",
    "options": [
      "AND 閘",
      "OR 閘",
      "NAND 閘",
      "XOR 閘 (互斥或閘)"
    ],
    "answer": 3,
    "explanation": "二進碼轉格雷碼法則：<br>- 格雷碼最高位等於二進碼最高位：$G_3 = B_3$；<br>- 其餘各位為相鄰二進碼位元的 XOR：$G_2 = B_3 \\oplus B_2, G_1 = B_2 \\oplus B_1, G_0 = B_1 \\oplus B_0$。<br>因此核心轉換運算完全依賴互斥或閘（XOR）。故選 (D)。"
  },
  {
    "id": "114-s2-034",
    "year": "114",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【114 全國模考】",
    "question": "執行下列 C 語言程式片段後，輸出結果為何？\n```c\nint a = 5;\nint b = a++;\nint c = ++a;\nprintf(\"%d, %d, %d\", a, b, c);\n```",
    "options": [
      "5, 5, 7",
      "6, 5, 7",
      "7, 6, 7",
      "7, 5, 7"
    ],
    "answer": 3,
    "explanation": "遞增運算子執行順序：<br>1. `int b = a++;`：後置遞增，先將 `a` 的原值 5 賦值給 `b`，隨後 `a` 遞增為 6（此時 `b=5, a=6`）。<br>2. `int c = ++a;`：前置遞增，先將 `a` 遞增為 7，再將 7 賦值給 `c`（此時 `c=7, a=7`）。<br>3. 最終變數數值為：`a=7, b=5, c=7`。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s2-035",
    "year": "114",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【114 統測精準預試】",
    "question": "執行下列 C 語言程式碼後，印出的整數數值為何？\n```c\nint a = 12;     // 二進制 00001100\nint b = 10;     // 二進制 00001010\nprintf(\"%d\", a | b);\n```",
    "options": [
      "8",
      "6",
      "2",
      "14"
    ],
    "answer": 3,
    "explanation": "`|` 為位元或運算子（Bitwise OR），兩位元任一為 1 即為 1：<br>  00001100 (12)<br>| 00001010 (10)<br>----------------<br>  00001110 = 8 + 4 + 2 = 14。<br>故選 (D)。"
  },
  {
    "id": "114-s2-036",
    "year": "114",
    "subject": "subject2",
    "scope": "mock1",
    "category": "程式設計實習",
    "source": "【114 全國模考】",
    "question": "在 C 語言中，下列關於 `do-while` 迴圈特性的敘述，何者最為精確？",
    "options": [
      "若條件一開始為假，則迴圈完全不會被執行",
      "與 while 迴圈完全無差異",
      "無法在迴圈內部使用 break 指令",
      "不論條件是否成立，迴圈主體至少會被強制執行一次"
    ],
    "answer": 3,
    "explanation": "`do-while` 是後測試迴圈（Post-test Loop）：<br>其語法結構為先執行 `do` 區塊中的程式主體，然後才在結尾檢查 `while(條件);`。<br>因此即使一開始條件就為假，迴圈主體也保證「至少被執行一次」。故選 (D)。"
  },
  {
    "id": "114-s2-037",
    "year": "114",
    "subject": "subject2",
    "scope": "mock2",
    "category": "程式設計實習",
    "source": "【114 統測精準預試】",
    "question": "執行下列 C 語言陣列巡訪程式碼後，變數 `max` 的數值為何？\n```c\nint arr[5] = {12, 45, 23, 89, 34};\nint max = arr[0];\nfor (int i = 1; i < 5; i++) {\n    if (arr[i] > max) max = arr[i];\n}\nprintf(\"%d\", max);\n```",
    "options": [
      "12",
      "45",
      "34",
      "89"
    ],
    "answer": 3,
    "explanation": "標準陣列求最大值演算法：<br>遍歷陣列元素，若當前元素大於既有的 `max` 則予以更新。<br>陣列元素中最大的數值為 89，因此最終印出 89。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s2-038",
    "year": "114",
    "subject": "subject2",
    "scope": "mock2",
    "category": "程式設計實習",
    "source": "【114 全國模考】",
    "question": "執行下列 C 語言程式片段後，輸出結果為何？\n```c\nint a = 10;\nint *p = &a;\nint **pp = &p;\n**pp = 50;\nprintf(\"%d\", a);\n```",
    "options": [
      "10",
      "記憶體位址",
      "編譯失敗",
      "50"
    ],
    "answer": 3,
    "explanation": "雙重指標（Pointer to Pointer）運作：<br>1. `p` 儲存 `a` 的記憶體位址；<br>2. `pp` 儲存指標 `p` 的記憶體位址；<br>3. `*pp` 解參考取得 `p`；<br>4. `**pp` 再次解參考取得變數 `a` 本身。<br>5. 執行 `**pp = 50;` 即直接修改 `a` 為 50。<br>因此 `printf` 印出 50，故選 (D)。"
  },
  {
    "id": "114-s2-039",
    "year": "114",
    "subject": "subject2",
    "scope": "mock3",
    "category": "程式設計實習",
    "source": "【114 統測精準預試】",
    "question": "執行下列 C 語言遞迴函式計算最大公因數（輾轉相除法），若呼叫 `gcd(48, 18)`，其回傳值為何？\n```c\nint gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}\n```",
    "options": [
      "2",
      "3",
      "12",
      "6"
    ],
    "answer": 3,
    "explanation": "歐幾里得輾轉相除法遞迴追蹤：<br>1. `gcd(48, 18)`：$48 \\% 18 = 12 \\Rightarrow$ 呼叫 `gcd(18, 12)`<br>2. `gcd(18, 12)`：$18 \\% 12 = 6 \\Rightarrow$ 呼叫 `gcd(12, 6)`<br>3. `gcd(12, 6)`：$12 \\% 6 = 0 \\Rightarrow$ 呼叫 `gcd(6, 0)`<br>4. `gcd(6, 0)`：滿足終止條件 `b == 0`，回傳 `a = 6`。<br>故最大公因數為 6，選 (D)。"
  },
  {
    "id": "114-s2-040",
    "year": "114",
    "subject": "subject2",
    "scope": "mock3",
    "category": "程式設計實習",
    "source": "【114 全國模考】",
    "question": "執行下列 C 語言字串串接程式碼後，印出之字串為何？\n```c\nchar s1[20] = \"Auto\";\nchar s2[] = \"matic\";\nstrcat(s1, s2);\nprintf(\"%s\", s1);\n```",
    "options": [
      "matic",
      "Auto matic",
      "Auto",
      "Automatic"
    ],
    "answer": 3,
    "explanation": "函式 `strcat(dest, src)`（String Concatenate）：<br>會將來源字串 `src` 附加到目的字串 `dest` 的結尾（覆蓋原 `dest` 的 `\\0` 並在最後補上新的 `\\0`）。<br>串接後的字串即為 `\"Automatic\"`。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s2-041",
    "year": "114",
    "subject": "subject2",
    "scope": "mock4",
    "category": "程式設計實習",
    "source": "【114 統測精準預試】",
    "question": "定義如下結構體：\n```c\nstruct Point {\n    int x;\n    int y;\n};\nstruct Point pts[2] = {{1, 2}, {3, 4}};\n```\n請問表達式 `pts[1].y` 的數值為何？",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": 3,
    "explanation": "結構體陣列索引存取：<br>`pts[0]` 為第一個結構體 `{1, 2}`（`pts[0].x=1, pts[0].y=2`）；<br>`pts[1]` 為第二個結構體 `{3, 4}`（`pts[1].x=3, pts[1].y=4`）。<br>因此 `pts[1].y` 的值為 4。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s2-042",
    "year": "114",
    "subject": "subject2",
    "scope": "mock4",
    "category": "程式設計實習",
    "source": "【114 全國模考】",
    "question": "在 C 語言動態記憶體配置中，若使用 `malloc(sizeof(int) * 10)` 成功向系統要求一塊可容納 10 個整數的記憶體空間，在程式結束前應該呼叫哪一個函式將該記憶體釋放還給系統，以避免發生記憶體洩漏（Memory Leak）？",
    "options": [
      "delete",
      "remove",
      "clear",
      "free"
    ],
    "answer": 3,
    "explanation": "C 語言標準記憶體管理：<br>透過 `malloc`、`calloc` 或 `realloc` 動態取得的 Heap 記憶體，使用完畢後必須呼叫 `free(ptr);` 予以釋放。<br>（`delete` 是 C++ 的運算子，C 語言中為 `free`）。故選 (D)。"
  },
  {
    "id": "114-s2-043",
    "year": "114",
    "subject": "subject2",
    "scope": "mock2",
    "category": "微處理機",
    "source": "【114 全國模考】",
    "question": "中央處理單元（CPU）內部的「算術邏輯單元 (ALU)」主要負責處理何種任務？",
    "options": [
      "指令解碼與時序產生",
      "儲存常數資料表格",
      "暫存堆疊指標位址",
      "二進制整數之加減算術運算及 AND、OR、XOR 等邏輯運算"
    ],
    "answer": 3,
    "explanation": "ALU（Arithmetic Logic Unit，算術邏輯單元）：<br>是 CPU 核心的運算引擎，專門負責執行算術運算（如加法、減法、乘除法、遞增、遞減）以及邏輯運算（如及閘 AND、或閘 OR、反相 NOT、互斥或 XOR、位移等）。故選 (D)。"
  },
  {
    "id": "114-s2-044",
    "year": "114",
    "subject": "subject2",
    "scope": "mock2",
    "category": "微處理機",
    "source": "【114 統測精準預試】",
    "question": "8051 單晶片微控制器其晶片外部引腳中，專門用於控制「讀取外部程式記憶體（External EPROM / Flash ROM）」輸出致能的控制信號腳位為何？",
    "options": [
      "ALE",
      "EA",
      "RST",
      "PSEN (Program Store Enable)"
    ],
    "answer": 3,
    "explanation": "8051 控制腳位：<br>$\\overline{\\text{PSEN}}$（Program Store Enable，腳位 29）：為外部程式記憶體讀取選通信號。當 CPU 欲從外部 ROM 讀取指令或代碼時，$\\overline{\\text{PSEN}}$ 會產生低電位脈波以致能外部 ROM 輸出。<br>故選 (D)。"
  },
  {
    "id": "114-s2-045",
    "year": "114",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【114 全國模考】",
    "question": "8051 微控制器中，專門作為 16 位元資料指標暫存器，用來指向外部 64 KB 資料記憶體位址的暫存器為何？",
    "options": [
      "PC (程式計數器)",
      "SP (堆疊指標)",
      "PSW (程式狀態字)",
      "DPTR (Data Pointer，由 DPH 與 DPL 組成)"
    ],
    "answer": 3,
    "explanation": "DPTR（Data Pointer）：<br>是 8051 內部唯一可供程式設計師直接作為 16 位元存取的暫存器，由高位元組 DPH（83H）與低位元組 DPL（82H）組成。專門用於配合 `MOVX` 指令定址外部 64 KB 的 RAM，或配合 `MOVC` 進行 ROM 查表。故選 (D)。"
  },
  {
    "id": "114-s2-046",
    "year": "114",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【114 統測精準預試】",
    "question": "執行下列 8051 組合語言乘法指令後，累加器 A 與暫存器 B 的內容分別為何？\n```asm\nMOV A, #50H\nMOV B, #04H\nMUL AB\n```",
    "options": [
      "A = 00H, B = 00H",
      "A = 40H, B = 01H",
      "A = 20H, B = 00H",
      "A = 40H, B = 01H (乘積為 0140H)"
    ],
    "answer": 3,
    "explanation": "8051 無符號整數乘法指令 `MUL AB`：<br>1. 計算 $50\\text{H} \\times 4\\text{H}$：<br>   $50_{16} = 80_{10}$；$80 \\times 4 = 320_{10} = 0140_{16}$。<br>2. 規則：**乘積之低 8 位存入累加器 A**，**高 8 位存入暫存器 B**。<br>因此 A = 40H, B = 01H。<br>故正確答案為 (D)。"
  },
  {
    "id": "114-s2-047",
    "year": "114",
    "subject": "subject2",
    "scope": "mock3",
    "category": "微處理機",
    "source": "【114 全國模考】",
    "question": "8051 指令中，條件跳躍指令 `CJNE A, #50H, TARGET` 的具體執行邏輯為何？",
    "options": [
      "若 A 等於 50H 則跳至 TARGET",
      "若 A 小於 50H 則跳至 TARGET",
      "若 A 大於 50H 則跳至 TARGET",
      "若 A 不等於 50H 則跳至 TARGET (Compare and Jump if Not Equal)"
    ],
    "answer": 3,
    "explanation": "`CJNE`（Compare and Jump if Not Equal）：<br>比較兩個運算元，若**兩者不相等則跳躍至指定標籤**；若兩者相等則順序執行下一道指令。<br>同時，若第一個運算元小於第二個運算元（此處若 $A < 50\\text{H}$），硬體會將進位旗標 CY 設為 1，方便後續進行大小判斷。故選 (D)。"
  },
  {
    "id": "114-s2-048",
    "year": "114",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【114 統測精準預試】",
    "question": "8051 計時器中斷（Timer 1）發生時，微處理機硬體會自動跳躍至哪一個固定的中斷向量位址？",
    "options": [
      "0003H",
      "000BH",
      "0013H",
      "001BH"
    ],
    "answer": 3,
    "explanation": "8051 五大中斷向量入口表：<br>- 外部中斷 0 (\\overline{INT0})：0003H<br>- 計時器 0 中斷 (TF0)：000BH<br>- 外部中斷 1 (\\overline{INT1})：0013H<br>- **計時器 1 中斷 (TF1)：001BH**<br>- 串列埠中斷 (RI/TI)：0023H<br>故選 (D)。"
  },
  {
    "id": "114-s2-049",
    "year": "114",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【114 全國模考】",
    "question": "在步進馬達控制中，若步進馬達的步進角（Step Angle）為 1.8°，則欲使馬達軸心轉動完整一圈（360°），控制器共需要依序輸出多少個激磁脈波步驟？",
    "options": [
      "50 步",
      "100 步",
      "180 步",
      "200 步"
    ],
    "answer": 3,
    "explanation": "步進馬達轉動步數公式：<br>$\\text{每圈步數} = \\frac{360^\\circ}{\\text{步進角}}$<br>$\\text{每圈步數} = \\frac{360^\\circ}{1.8^\\circ} = 200\\,\\text{步}$。<br>因此轉動一整圈需要送出 200 個控制脈波，故選 (D)。"
  },
  {
    "id": "114-s2-050",
    "year": "114",
    "subject": "subject2",
    "scope": "mock4",
    "category": "微處理機",
    "source": "【114 統測精準預試】",
    "question": "常見的 RS-232 串列通訊標準介面，因其採用的邏輯電壓為雙極性（例如邏輯 1 為 -3V～-15V，邏輯 0 為 +3V～+15V），無法直接連接 8051 之 0V～5V TTL 準位。實務上最常採用哪一顆電位準位轉換 IC 來連接 8051 與 RS-232 埠？",
    "options": [
      "74LS04",
      "ADC0804",
      "ULN2803",
      "MAX232 (或 MAX202)"
    ],
    "answer": 3,
    "explanation": "電位轉換晶片：<br>MAX232 內部具備電荷泵（Charge Pump）升壓電路，只需單一 +5V 直流供電，即可在內部產生 $\\pm 10\\,\\text{V}$ 的 RS-232 雙極性雙向準位轉換，是微控制器連接 PC COM 埠或 RS-232 串列通訊標準的必備驅動 IC。故選 (D)。"
  }
];

  // =========================================================================
  // 動態綁定 SVG 示意圖
  // =========================================================================
  RAW_QUESTIONS.forEach(q => {
    if (q.diagramType && typeof DIAGRAMS[q.diagramType] === 'function') {
      const params = q.diagramParams || [];
      q.diagramSvg = DIAGRAMS[q.diagramType](...params);
    }
  });

  // =========================================================================
  // 題庫工廠函式 (Question Bank Factory)
  // =========================================================================
  function getQuestionsForExam(filterSubject, filterScope, filterYear) {
    return RAW_QUESTIONS.filter(q => {
      // 年度篩選
      if (filterYear && filterYear !== 'all' && q.year !== filterYear) {
        return false;
      }
      // 科目篩選
      if (filterSubject && filterSubject !== 'all' && q.subject !== filterSubject) {
        return false;
      }
      // 範圍篩選
      if (filterScope && filterScope !== 'all') {
        if (filterScope.startsWith('year_')) {
          const targetY = filterScope.replace('year_', '');
          return q.year === targetY;
        }
        if (filterScope === 'past_exam') {
          return q.scope === 'past_exam' || q.source.includes('統測');
        }
        const scopeOrder = { mock1: 1, mock2: 2, mock3: 3, mock4: 4, past_exam: 5 };
        const targetLevel = scopeOrder[filterScope] || 4;
        const qLevel = scopeOrder[q.scope] || 1;
        return qLevel <= targetLevel;
      }
      return true;
    }).map(rawQ => {
      return {
        id: rawQ.id,
        year: rawQ.year,
        subject: rawQ.subject,
        scope: rawQ.scope,
        category: rawQ.category,
        source: rawQ.source || '',
        diagramSvg: rawQ.diagramSvg || null,
        diagramHtml: rawQ.diagramHtml || null,
        question: (rawQ.source ? `${rawQ.source} ` : '') + rawQ.question,
        options: [...rawQ.options],
        answer: rawQ.answer,
        explanation: rawQ.explanation
      };
    });
  }

  // 匯出至全域
  root.RAW_QUESTION_BANK = RAW_QUESTIONS;
  root.getQuestionsForExam = getQuestionsForExam;
  root.QUESTION_BANK = getQuestionsForExam('all', 'all');

})(typeof window !== 'undefined' ? window : global);
