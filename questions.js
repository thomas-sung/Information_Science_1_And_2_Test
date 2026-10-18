/**
 * 高職資訊科 (電機與電子群資電類) 統測與模擬考全方位題庫
 * 108課綱標準 · 模考分級範圍 · 支援隨機漂亮數字 (Clean Numbers) 動態出題
 * 
 * 模考分級 (scope):
 * - 'mock1': 第一次模擬考範圍
 * - 'mock2': 第二次模擬考範圍
 * - 'mock3': 第三次模擬考範圍
 * - 'mock4': 第四次模擬考 / 統測總複習
 * - 'past_exam': 歷屆統測 108 課綱精選真題 (111~114年度)
 */

(function (root) {
  'use strict';

  // 輔助函式：從陣列隨機挑選一個元素
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // 輔助函式：打散陣列並重排答案索引
  function shuffleOptions(opts, correctIdx) {
    const correctText = opts[correctIdx];
    const shuffled = [...opts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const newAnswerIdx = shuffled.indexOf(correctText);
    return { options: shuffled, answer: newAnswerIdx };
  }

  // =========================================================================
  // SVG 電路圖與邏輯圖產生器 (Circuit & Logic Schematics)
  // 專為統測與模擬考繪製，支援自適應響應式與深淺色主題
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
          <text x="205" y="160" font-size="11" font-weight="bold" fill="currentColor" text-anchor="middle">Rx=?</text>
          <line x1="185" y1="165" x2="160" y2="200" stroke="#2563eb" stroke-width="2.5"/>

          <!-- 中間檢流計 (Galvanometer) -->
          <line x1="70" y1="110" x2="135" y2="110" stroke="#d97706" stroke-width="2"/>
          <circle cx="160" cy="110" r="16" fill="var(--bg-surface)" stroke="#d97706" stroke-width="2"/>
          <text x="160" y="115" font-size="12" font-weight="bold" fill="#d97706" text-anchor="middle">Ⓖ 0A</text>
          <line x1="185" y1="110" x2="250" y2="110" stroke="#d97706" stroke-width="2"/>

          <!-- 直流電源連接 (上下端) -->
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
        <div class="diagram-caption">【圖 1】惠斯登電橋平衡電路示意圖</div>
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
        <div class="diagram-caption">【圖 2】OPA 反相放大器 (Inverting Amplifier) 電路圖</div>
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
        <div class="diagram-caption">【圖 3】橋式全波整流電路圖</div>
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
        <div class="diagram-caption">【圖 4】戴維寧等效模型電路圖</div>
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
        <div class="diagram-caption">【圖 5】組合邏輯電路示意圖</div>
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
        <div class="diagram-caption">【圖 6】負緣觸發 JK 正反器結構圖</div>
      `;
    }
  };

  // ==========================================
  // 原始題庫結構 (Raw Question Bank)
  // ==========================================
  const RAW_QUESTIONS = [

    // -----------------------------------------------------------------------
    // 【第一次模擬考範圍】專一：基本電學 (基本概念、電阻、串並聯、直流網路)
    // -----------------------------------------------------------------------
    {
      id: "s1-m1-001",
      subject: "subject1",
      scope: "mock1",
      category: "基本電學",
      source: "【第一次模考】",
      isDynamic: true,
      generate: function () {
        // 隨機整數色碼題 (紅/橙/黃/綠/藍搭配乾淨電壓)
        const candidates = [
          { c1: "紅", c2: "紫", c3: "橙", mult: 1000, rVal: 27, v: 54, i: 2 },
          { c1: "棕", c2: "黑", c3: "橙", mult: 1000, rVal: 10, v: 40, i: 4 },
          { c1: "橙", c2: "白", c3: "橙", mult: 1000, rVal: 39, v: 78, i: 2 },
          { c1: "黃", c2: "紫", c3: "橙", mult: 1000, rVal: 47, v: 94, i: 2 },
          { c1: "綠", c2: "藍", c3: "橙", mult: 1000, rVal: 56, v: 112, i: 2 },
          { c1: "棕", c2: "綠", c3: "橙", mult: 1000, rVal: 15, v: 45, i: 3 }
        ];
        const item = pick(candidates);
        const correctStr = `${item.i}.0 mA`;
        const wrongOpts = [
          `${item.i + 1}.0 mA`,
          `${Math.max(1, item.i - 1)}.0 mA`,
          `${item.i * 2}.0 mA`
        ];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `有一四環電阻器之色碼依序為「${item.c1}、${item.c2}、${item.c3}、金」，若在其兩端施加 ${item.v}V 之直流電壓，則流經該電阻器的電流為多少？`,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：色碼電阻讀法與歐姆定律】\n1. 色碼數值對應：\n   • 第一環 (${item.c1}) 與第二環 (${item.c2}) 對應數值為 ${item.rVal}\n   • 第三環 (${item.c3}) 倍率為 10³ = 1000\n   • 第四環 (金) 誤差為 ±5%\n   因此電阻阻值為 ${item.rVal} × 10³ Ω = ${item.rVal} kΩ。\n2. 根據歐姆定律 I = V / R：\n   I = ${item.v}V / ${item.rVal}kΩ = ${item.i} mA。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s1-m1-002",
      subject: "subject1",
      scope: "mock1",
      category: "基本電學",
      source: "【第一次模考】",
      isDynamic: true,
      generate: function () {
        // 並聯好算整數組合
        const combos = [
          { r1: 6, r2: 12, r3: 4, req: 2, v: 24, i: 12 },
          { r1: 10, r2: 15, r3: 30, req: 5, v: 30, i: 6 },
          { r1: 12, r2: 24, r3: 8, req: 4, v: 48, i: 12 },
          { r1: 20, r2: 30, r3: 60, req: 10, v: 50, i: 5 },
          { r1: 8, r2: 24, r3: 12, req: 4, v: 36, i: 9 }
        ];
        const c = pick(combos);
        const correctStr = `${c.i} A`;
        const wrongOpts = [`${c.i + 2} A`, `${Math.max(1, c.i - 3)} A`, `${c.i * 2} A`];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `在直流電路中，將三個阻值分別為 ${c.r1}Ω、${c.r2}Ω 與 ${c.r3}Ω 的電阻並聯後，連接至 ${c.v}V 的理想直流電源。試求此電源所供給的總電流 I 為多少？`,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：並聯等效電阻與歐姆定律】\n1. 求三個電阻之並聯等效電阻 Req：\n   1/Req = 1/${c.r1} + 1/${c.r2} + 1/${c.r3}\n   通分計算得 Req = ${c.req} Ω。\n2. 依據歐姆定律：\n   總電流 I = E / Req = ${c.v}V / ${c.req}Ω = ${c.i} A。\n故正確答案為 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s1-m1-003",
      subject: "subject1",
      scope: "mock1",
      category: "基本電學",
      source: "【第一次模考】",
      isDynamic: true,
      generate: function () {
        const pairs = [
          { voc: 18, isc: 3, rth: 6 },
          { voc: 24, isc: 4, rth: 6 },
          { voc: 36, isc: 3, rth: 12 },
          { voc: 20, isc: 5, rth: 4 },
          { voc: 30, isc: 6, rth: 5 }
        ];
        const p = pick(pairs);
        const correctStr = `Eth = ${p.voc}V, Rth = ${p.rth}Ω`;
        const wrongOpts = [
          `Eth = ${p.voc}V, Rth = ${p.voc * p.isc}Ω`,
          `Eth = ${p.rth}V, Rth = ${p.voc}Ω`,
          `Eth = ${p.isc}V, Rth = ${p.rth}Ω`
        ];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `如圖所示之戴維寧等效模型電路，若測得該電路之開路端電壓為 ${p.voc}V，將兩端短路時測得短路電流為 ${p.isc}A，則其戴維寧等效電壓 Eth 與等效電阻 Rth 分別為何？`,
          diagramSvg: DIAGRAMS.thevenin(p.voc, p.rth),
          options: res.options,
          answer: res.answer,
          explanation: `【考點：戴維寧等效電路分析】\n1. 戴維寧等效電壓 Eth 等於負載開路時的開路端電壓 Voc：\n   Eth = Voc = ${p.voc} V。\n2. 戴維寧等效電阻 Rth 等於開路電壓除以短路電流 Isc：\n   Rth = Voc / Isc = ${p.voc}V / ${p.isc}A = ${p.rth} Ω。\n故等效電路為 Eth = ${p.voc}V 串聯 Rth = ${p.rth}Ω，答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s1-m1-004",
      subject: "subject1",
      scope: "mock1",
      category: "基本電學",
      source: "【第一次模考】",
      isDynamic: false,
      question: "如圖所示之惠斯登電橋 (Wheatstone Bridge) 電路，已知 R1 = 100Ω、R2 = 200Ω、R3 = 300Ω。若電橋達到平衡（檢流計讀數為 0A），則第四個電阻 Rx 的阻值不可能為下列何者（視電阻相對位置而定）？",
      diagramSvg: DIAGRAMS.wheatstone(100, 200, 300, 'Rx'),
      options: [
        "150 Ω",
        "600 Ω",
        "66.7 Ω",
        "850 Ω"
      ],
      answer: 3,
      explanation: "【考點：惠斯登電橋平衡條件】\n電橋平衡條件為「對角電阻乘積相等」：\n1. 若 R1 × Rx = R2 × R3 ⇒ Rx = (200 × 300) / 100 = 600 Ω\n2. 若 R2 × Rx = R1 × R3 ⇒ Rx = (100 × 300) / 200 = 150 Ω\n3. 若 R3 × Rx = R1 × R2 ⇒ Rx = (100 × 200) / 300 = 66.7 Ω\n因此 850 Ω 不可能為平衡電阻值，答案選 (D)。"
    },

    // -----------------------------------------------------------------------
    // 【第一次模擬考範圍】專二：數位邏輯 (邏輯閘、布林代數、卡諾圖) + 程式設計 (基礎、條件)
    // -----------------------------------------------------------------------
    {
      id: "s2-m1-001",
      subject: "subject2",
      scope: "mock1",
      category: "數位邏輯設計",
      source: "【第一次模考】",
      isDynamic: true,
      generate: function () {
        const hexMap = [
          { bin: "11010110", hex: "D6", b4h: "1101 (13=D)", b4l: "0110 (6)" },
          { bin: "10110101", hex: "B5", b4h: "1011 (11=B)", b4l: "0101 (5)" },
          { bin: "11100100", hex: "E4", b4h: "1110 (14=E)", b4l: "0100 (4)" },
          { bin: "10101111", hex: "AF", b4h: "1010 (10=A)", b4l: "1111 (15=F)" },
          { bin: "11001001", hex: "C9", b4h: "1100 (12=C)", b4l: "1001 (9)" }
        ];
        const item = pick(hexMap);
        const correctStr = `(${item.hex})₁₆`;
        const wrongOpts = [
          `(${item.hex.split('').reverse().join('')})₁₆`,
          `(${item.hex.replace(/[A-F]/, 'A')})₁₆`,
          `(${item.hex.replace(/[0-9]/, '8')})₁₆`
        ];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `將二進位數值 (${item.bin})₂ 轉換為十六進位 (Hexadecimal) 表示法，其結果為下列何者？`,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：二進位與十六進位進位制轉換】\n二進位轉十六進位：由右至左每 4 位一組：\n• 高 4 位：${item.b4h}\n• 低 4 位：${item.b4l}\n合併得 (${item.hex})₁₆。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s2-m1-002",
      subject: "subject2",
      scope: "mock1",
      category: "數位邏輯設計",
      source: "【第一次模考】",
      isDynamic: false,
      question: "如圖所示之邏輯閘組合電路，輸入端為 A、B、C，經由 AND 閘與 NOR 閘後輸出為 F，則該電路輸出之等效布林代數表示式為何？",
      diagramSvg: DIAGRAMS.logicGates(),
      options: [
        "A' · (B' + C')",
        "A' + B' · C'",
        "A' · B' + C'",
        "(A' + B') · C'"
      ],
      answer: 0,
      explanation: "【考點：邏輯閘電路推導與狄摩根定律】\n1. 觀察電路圖：\n   • B 與 C 輸入至 AND 閘，輸出為 (B · C)\n   • A 與 (B · C) 輸入至 NOR 閘，輸出為 F = (A + B · C)'\n2. 依狄摩根定律展開：\n   F = (A + B · C)' = A' · (B · C)' = A' · (B' + C')。\n故答案選 (A)。"
    },
    {
      id: "s2-m1-005",
      subject: "subject2",
      scope: "mock1",
      category: "數位邏輯設計",
      source: "【第一次模考】",
      isDynamic: false,
      question: "如圖所示為四變數布林函數之卡諾圖 (Karnaugh Map)，試求化簡後的最簡乘積之和 (SOP) 表示式為下列何者？",
      diagramHtml: `
        <table class="kmap-table">
          <tr><th>AB \\ CD</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
          <tr><th>00</th><td>0</td><td class="highlight-1">1</td><td class="highlight-1">1</td><td>0</td></tr>
          <tr><th>01</th><td>0</td><td class="highlight-1">1</td><td class="highlight-1">1</td><td>0</td></tr>
          <tr><th>11</th><td>0</td><td>0</td><td>0</td><td>0</td></tr>
          <tr><th>10</th><td>0</td><td>0</td><td>0</td><td>0</td></tr>
        </table>
        <div class="diagram-caption">【圖】四變數卡諾圖 (Karnaugh Map)</div>
      `,
      options: [
        "F = A' · D",
        "F = A' · B' · D",
        "F = B · C",
        "F = A + D'"
      ],
      answer: 0,
      explanation: "【考點：4 變數卡諾圖圈選化簡】\n1. 觀察卡諾圖中值為 1 的最小項位置：\n   • m(1) = 0001\n   • m(3) = 0011\n   • m(5) = 0101\n   • m(7) = 0111\n2. 這 4 個 1 構成一個 2×2 的相鄰矩形 (列 00, 01 與 行 01, 11 相交處)。\n3. 觀察共通變數：\n   • 列 AB (00 與 01)：A 維持為 0 (即 A')，B 由 0 變 1 消除。\n   • 行 CD (01 與 11)：C 由 0 變 1 消除，D 維持為 1 (即 D)。\n4. 化簡結果為 F = A' · D。\n故答案選 (A)。"
    },
    {
      id: "s2-m1-003",
      subject: "subject2",
      scope: "mock1",
      category: "程式設計實習",
      source: "【第一次模考】",
      isDynamic: true,
      generate: function () {
        const valCombos = [
          { a: 14, b: 4, div: 3, mul: 6, mod: 2, ans: 8 },
          { a: 17, b: 5, div: 3, mul: 6, mod: 2, ans: 8 },
          { a: 19, b: 4, div: 4, mul: 8, mod: 3, ans: 11 },
          { a: 22, b: 6, div: 3, mul: 6, mod: 4, ans: 10 },
          { a: 13, b: 5, div: 2, mul: 4, mod: 3, ans: 7 }
        ];
        const v = pick(valCombos);
        const correctStr = `${v.ans}`;
        const wrongOpts = [`${v.ans + 1}`, `${v.ans - 2}`, `${v.div * 2}`];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `在 C 語言程式中，若宣告變數 \`int a = ${v.a}, b = ${v.b};\`，則運算式 \`a / b * 2 + a % b\` 的計算結果為多少？`,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：整數除法與算術運算子優先順序】\n在 C 語言中整數相除會無條件捨去小數：\n1. \`a / b\` = ${v.a} / ${v.b} = ${v.div} (整數除法截斷)\n2. 同優先權由左至右：\`${v.div} * 2\` = ${v.mul}\n3. 取餘數 \`a % b\` = ${v.a} % ${v.b} = ${v.mod}\n4. 兩者相加：${v.mul} + ${v.mod} = ${v.ans}。\n故正確答案為 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s2-m1-004",
      subject: "subject2",
      scope: "mock1",
      category: "程式設計實習",
      source: "【第一次模考】",
      isDynamic: true,
      generate: function () {
        const bitOps = [
          { x: 6, y: 3, xor: 5, shift: 1, ans: 10 },
          { x: 5, y: 2, xor: 7, shift: 1, ans: 14 },
          { x: 7, y: 4, xor: 3, shift: 2, ans: 12 },
          { x: 9, y: 5, xor: 12, shift: 1, ans: 24 }
        ];
        const b = pick(bitOps);
        const correctStr = `${b.ans}`;
        const wrongOpts = [`${b.xor}`, `${b.ans + 2}`, `${b.ans - 1}`];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `執行下列 C 語言位元運算程式碼片段後，輸出變數 z 的值為多少？\n\`\`\`c\nint x = ${b.x};\nint y = ${b.y};\nint z = (x ^ y) << ${b.shift};\nprintf("%d", z);\n\`\`\``,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：位元運算子 (XOR 與向左位移)】\n1. 互斥或運算 (XOR \`^\`)：相同為 0，相異為 1。\n   ${b.x}₁₀ ^ ${b.y}₁₀ = ${b.xor}₁₀\n2. 向左位移 (\`<< ${b.shift}\`)：相當於乘以 2^${b.shift}\n   ${b.xor} << ${b.shift} = ${b.ans}。\n故輸出數值為 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },

    // -----------------------------------------------------------------------
    // 【第二次模擬考範圍】專一：電容電感、暫態、電子學二極體與整流
    // -----------------------------------------------------------------------
    {
      id: "s1-m2-001",
      subject: "subject1",
      scope: "mock2",
      category: "基本電學",
      source: "【第二次模考】",
      isDynamic: true,
      generate: function () {
        // 電容儲能漂亮數字
        const capList = [
          { cUf: 100, cVal: 100e-6, v: 200, energy: 2 },
          { cUf: 50,  cVal: 50e-6,  v: 200, energy: 1 },
          { cUf: 200, cVal: 200e-6, v: 100, energy: 1 },
          { cUf: 80,  cVal: 80e-6,  v: 100, energy: 0.4 },
          { cUf: 50,  cVal: 50e-6,  v: 400, energy: 4 }
        ];
        const item = pick(capList);
        const correctStr = `${item.energy} J`;
        const wrongOpts = [
          `${item.energy * 2} J`,
          `${(item.energy / 2).toFixed(1)} J`,
          `${item.energy * 10} J`
        ];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `有一個容量為 ${item.cUf} μF 的電容器，將其充電至直流電壓 ${item.v}V 後，試問該電容器內部所儲存的靜電能量為多少焦耳 (J)？`,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：電容器儲能公式】\n電容儲能公式：Wc = (1/2) × C × V²\n代入數值：\n• C = ${item.cUf} μF = ${item.cUf} × 10⁻⁶ F\n• V = ${item.v} V ⇒ V² = ${item.v * item.v}\n• Wc = (1/2) × (${item.cUf} × 10⁻⁶) × (${item.v * item.v}) = ${item.energy} 焦耳 (J)。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s1-m2-002",
      subject: "subject1",
      scope: "mock2",
      category: "基本電學",
      source: "【第二次模考】",
      isDynamic: true,
      generate: function () {
        const rcCombos = [
          { rK: 50, cU: 20, tau: 1.0 },
          { rK: 20, cU: 50, tau: 1.0 },
          { rK: 100, cU: 20, tau: 2.0 },
          { rK: 40, cU: 25, tau: 1.0 },
          { rK: 10, cU: 50, tau: 0.5 }
        ];
        const rc = pick(rcCombos);
        const correctStr = `${rc.tau.toFixed(1)} 秒`;
        const wrongOpts = [
          `${(rc.tau * 2).toFixed(1)} 秒`,
          `${(rc.tau * 5).toFixed(1)} 秒`,
          `${(rc.tau / 2).toFixed(1)} 秒`
        ];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `一個 RC 串聯直流充電電路中，已知電阻 R = ${rc.rK} kΩ，電容 C = ${rc.cU} μF。此電路的充電時間常數 (τ) 為何？`,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：RC 暫態時間常數計算】\nRC 充電時間常數公式：τ = R × C\n代入數值：\n• R = ${rc.rK} kΩ = ${rc.rK} × 10³ Ω\n• C = ${rc.cU} μF = ${rc.cU} × 10⁻⁶ F\n• τ = (${rc.rK} × 10³) × (${rc.cU} × 10⁻⁶) = ${rc.tau.toFixed(1)} 秒。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s1-m2-003",
      subject: "subject1",
      scope: "mock2",
      category: "電子學",
      source: "【第二次模考】",
      isDynamic: false,
      question: "有關矽 (Si) 二極體與鍺 (Ge) 二極體在常溫下的順向導通障壁電壓 (Barrier Potential)，下列比較何者正確？",
      options: [
        "矽約為 0.6V ~ 0.7V，鍺約為 0.2V ~ 0.3V",
        "矽約為 0.2V ~ 0.3V，鍺約為 0.6V ~ 0.7V",
        "兩者皆固定為 0.5V",
        "矽約為 1.2V，鍺約為 0.8V"
      ],
      answer: 0,
      explanation: "【考點：半導體二極體基本特性】\n常溫 (約 25°C ~ 300K) 下：\n• 矽 (Silicon, Si) 二極體的障壁電壓約 0.6V ~ 0.7V。\n• 鍺 (Germanium, Ge) 二極體的障壁電壓約 0.2V ~ 0.3V。\n故答案選 (A)。"
    },
    {
      id: "s1-m2-004",
      subject: "subject1",
      scope: "mock2",
      category: "電子學",
      source: "【第二次模考】",
      isDynamic: true,
      generate: function () {
        const voltages = [110, 220];
        const v = pick(voltages);
        const peak = (v * 1.414).toFixed(1);
        const correctStr = `Vdc,peak ≈ ${peak}V, PIV ≈ ${peak}V`;
        const wrongOpts = [
          `Vdc,peak ≈ ${v}V, PIV ≈ ${v}V`,
          `Vdc,peak ≈ ${peak}V, PIV ≈ ${(v * 1.414 * 2).toFixed(1)}V`,
          `Vdc,peak ≈ ${(v * 0.707).toFixed(1)}V, PIV ≈ ${peak}V`
        ];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `如圖所示之橋式全波整流電路，輸入交流電源為 ${v}V 有效值，若二極體皆視為理想二極體，則負載端輸出直流電壓峰值 (Vdc,peak) 及每顆二極體所承受之最高逆向耐壓 (PIV) 分別約為多少？`,
          diagramSvg: DIAGRAMS.bridgeRectifier(v),
          options: res.options,
          answer: res.answer,
          explanation: `【考點：橋式全波整流電路分析】\n1. 輸入峰值電壓 Vm = Vrms × √2 = ${v} × 1.414 ≈ ${peak} V。\n2. 橋式整流在半週期導通兩顆二極體，若視為理想二極體，輸出峰值即為 Vm ≈ ${peak} V。\n3. 橋式整流中截止二極體承受的最大逆向峰值電壓 PIV = Vm ≈ ${peak} V。\n(對比：中間抽頭全波整流之 PIV = 2Vm)。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },

    // -----------------------------------------------------------------------
    // 【第二次模擬考範圍】專二：組合邏輯電路、C語言迴圈陣列、微處理機基礎
    // -----------------------------------------------------------------------
    {
      id: "s2-m2-001",
      subject: "subject2",
      scope: "mock2",
      category: "數位邏輯設計",
      source: "【第二次模考】",
      isDynamic: false,
      question: "有關全加器 (Full Adder, FA) 與半加器 (Half Adder, HA) 的結構比較，下列敘述何者正確？",
      options: [
        "一個全加器可由兩個半加器與一個 OR 閘組合而成",
        "一個全加器僅能由三個半加器組合而成",
        "半加器具有進位輸入 (Cin) 腳位",
        "全加器只具有一個輸出端"
      ],
      answer: 0,
      explanation: "【考點：加法器電路結構】\n• 半加器 (HA)：只能相加兩個 1-bit 輸入 (A, B)，輸出和 (Sum) 與進位 (Cout)，無進位輸入 Cin。\n• 全加器 (FA)：可相加 A、B 與前一級進位 Cin 三個輸入。\n• 結構上：1 個全加器 = 2 個半加器 + 1 個 OR 閘。\n故正確答案選 (A)。"
    },
    {
      id: "s2-m2-002",
      subject: "subject2",
      scope: "mock2",
      category: "微處理機",
      source: "【第二次模考】",
      isDynamic: true,
      generate: function () {
        const busCombos = [
          { addrLines: 20, size: "1 MB", calc: "2²⁰ = 1 MB" },
          { addrLines: 24, size: "16 MB", calc: "2²⁴ = 2⁴ × 2²⁰ = 16 MB" },
          { addrLines: 16, size: "64 KB", calc: "2¹⁶ = 2⁶ × 2¹⁰ = 64 KB" },
          { addrLines: 32, size: "4 GB", calc: "2³² = 2² × 2³⁰ = 4 GB" }
        ];
        const b = pick(busCombos);
        const correctStr = `${b.size}`;
        const wrongOpts = ["256 KB", "8 MB", "128 MB"].filter(s => s !== b.size);
        const res = shuffleOptions([correctStr, ...wrongOpts.slice(0, 3)], 0);

        return {
          question: `若某微控制器具有 ${b.addrLines} 條位址線 (Address Bus) 與 16 條資料線 (Data Bus)，以位元組為定址單位 (Byte Addressing)，則該處理機能夠直接定址的最大記憶體容量為多少？`,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：記憶體定址空間推算】\n以位元組為單位時，最大定址空間僅由「位址線數量」決定：\n定址容量 = 2^(${b.addrLines}) 位元組 = ${b.calc} = ${b.size}。\n(資料線條數影響單次資料存取的位元寬度，不影響位址空間大小)。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s2-m2-003",
      subject: "subject2",
      scope: "mock2",
      category: "程式設計實習",
      source: "【第二次模考】",
      isDynamic: true,
      generate: function () {
        // 迴圈 continue 與 break 動態追蹤題
        const traces = [
          { limit: 10, mod: 3, brk: 7, sum: 12, expr: "1 + 2 + 4 + 5 = 12" },
          { limit: 10, mod: 2, brk: 8, sum: 16, expr: "1 + 3 + 5 + 7 = 16" },
          { limit: 12, mod: 4, brk: 9, sum: 24, expr: "1 + 2 + 3 + 5 + 6 + 7 = 24" }
        ];
        const t = pick(traces);
        const correctStr = `${t.sum}`;
        const wrongOpts = [`${t.sum + 3}`, `${t.sum - 4}`, `${t.sum + 7}`];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `執行下列 C 語言程式碼後，印出的變數 sum 數值為何？\n\`\`\`c\nint sum = 0;\nfor (int i = 1; i <= ${t.limit}; i++) {\n    if (i % ${t.mod} == 0) continue;\n    if (i >= ${t.brk}) break;\n    sum += i;\n}\nprintf("%d", sum);\n\`\`\``,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：迴圈流程控制 continue 與 break】\n追蹤迴圈每圈 i 變化：\n• 當 i % ${t.mod} == 0 時觸發 continue，跳過後續加總\n• 當 i >= ${t.brk} 時觸發 break，直接中斷離開迴圈\n實際參與累加的項目：${t.expr}\n累加總和 sum = ${t.sum}。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },

    // -----------------------------------------------------------------------
    // 【第三次模擬考範圍】專一：交流電路RLC、BJT放大器；專二：正反器計數器、指標函式
    // -----------------------------------------------------------------------
    {
      id: "s1-m3-001",
      subject: "subject1",
      scope: "mock3",
      category: "基本電學",
      source: "【第三次模考】",
      isDynamic: false,
      question: "交流正弦波電壓表示式為 v(t) = 141.4 sin(377t - 30°) V，則該電壓的有效值 (Vrms) 及電源頻率 (f) 分別約為多少？",
      options: [
        "Vrms = 100V, f = 60 Hz",
        "Vrms = 100V, f = 50 Hz",
        "Vrms = 141.4V, f = 60 Hz",
        "Vrms = 200V, f = 377 Hz"
      ],
      answer: 0,
      explanation: "【考點：正弦波交流電參數分析】\n1. 最大峰值電壓 Vm = 141.4 V\n   有效值 Vrms = Vm / √2 = 141.4 / 1.414 ≈ 100 V。\n2. 角頻率 ω = 2πf = 377 rad/s\n   頻率 f = 377 / (2 × 3.1416) ≈ 60 Hz。\n故答案選 (A)。"
    },
    {
      id: "s1-m3-002",
      subject: "subject1",
      scope: "mock3",
      category: "電子學",
      source: "【第三次模考】",
      isDynamic: false,
      question: "雙極性接面電晶體 (BJT) 操作在「線性放大區 (Active Region)」時，其兩個 PN 接面的偏壓條件為何？",
      options: [
        "基極-射極接面 (B-E) 順向偏壓，基極-集極接面 (B-C) 逆向偏壓",
        "基極-射極接面 (B-E) 逆向偏壓，基極-集極接面 (B-C) 順向偏壓",
        "B-E 接面順向偏壓，B-C 接面順向偏壓",
        "B-E 接面逆向偏壓，B-C 接面逆向偏壓"
      ],
      answer: 0,
      explanation: "【考點：BJT 電晶體工作區偏壓判斷】\n• 放大區 (Active)：B-E 順偏 (導通)，B-C 逆偏 (集極收集載子)\n• 飽和區 (Saturation)：B-E 順偏，B-C 順偏 (充當閉合開關)\n• 截止區 (Cutoff)：B-E 逆偏，B-C 逆偏 (充當斷開開關)\n故正確答案為 (A)。"
    },
    {
      id: "s2-m3-001",
      subject: "subject2",
      scope: "mock3",
      category: "數位邏輯設計",
      source: "【第三次模考】",
      isDynamic: true,
      generate: function () {
        const modCombos = [
          { mod: 10, n: 4, range: "2³=8 < 10 ≤ 2⁴=16" },
          { mod: 12, n: 4, range: "2³=8 < 12 ≤ 2⁴=16" },
          { mod: 24, n: 5, range: "2⁴=16 < 24 ≤ 2⁵=32" },
          { mod: 50, n: 6, range: "2⁵=32 < 50 ≤ 2⁶=64" },
          { mod: 6,  n: 3, range: "2²=4 < 6 ≤ 2³=8" }
        ];
        const m = pick(modCombos);
        const correctStr = `${m.n} 個`;
        const wrongOpts = [`${m.n - 1} 個`, `${m.n + 1} 個`, `${m.n + 2} 個`];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `欲設計一個模數為 ${m.mod} (MOD-${m.mod}) 的非同步二進位計數器，最少需要使用多少個正反器 (Flip-Flops)？`,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：計數器模數與正反器數量關係】\n若模數為 N，所需正反器數量 n 必須滿足關係式：\n2^(n-1) < N ≤ 2^n\n對於 MOD-${m.mod}：\n${m.range}\n因此最少需要 ${m.n} 個正反器。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s2-m3-002",
      subject: "subject2",
      scope: "mock3",
      category: "程式設計實習",
      source: "【第三次模考】",
      isDynamic: true,
      generate: function () {
        const ptrCombos = [
          { arr: [10, 20, 30, 40, 50], offset: 2, add: 1, ans: 70 }, // *(arr+3)=40 + *(arr+2)=30 = 70
          { arr: [5, 15, 25, 35, 45], offset: 1, add: 2, ans: 50 },  // *(arr+3)=35 + *(arr+1)=15 = 50
          { arr: [12, 24, 36, 48, 60], offset: 2, add: 1, ans: 84 }  // *(arr+3)=48 + *(arr+2)=36 = 84
        ];
        const p = pick(ptrCombos);
        const correctStr = `${p.ans}`;
        const wrongOpts = [`${p.ans - 10}`, `${p.ans + 15}`, `${p.ans / 2}`];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `執行下列 C 語言指標運算程式碼後，變數 y 的值為多少？\n\`\`\`c\nint arr[5] = {${p.arr.join(', ')}};\nint *ptr = arr + ${p.offset};\nint y = *(ptr + ${p.add}) + *ptr;\n\`\`\``,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：指標加減與陣列位址存取】\n1. \`ptr = arr + ${p.offset}\` 指向 \`arr[${p.offset}]\`，因此 \`*ptr\` = ${p.arr[p.offset]}\n2. \`ptr + ${p.add}\` 指向 \`arr[${p.offset + p.add}]\`，因此 \`*(ptr + ${p.add})\` = ${p.arr[p.offset + p.add]}\n3. \`y = ${p.arr[p.offset + p.add]} + ${p.arr[p.offset]} = ${p.ans}\`。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },

    // -----------------------------------------------------------------------
    // 【第四次模擬考 / 統測全範圍】專一：諧振OPA；專二：遞迴結構體、串列中斷
    // -----------------------------------------------------------------------
    {
      id: "s1-m4-001",
      subject: "subject1",
      scope: "mock4",
      category: "電子學",
      source: "【第四次模考】",
      isDynamic: true,
      generate: function () {
        // 反相放大器 OPA 漂亮整數增益
        const opaList = [
          { r1: 10, rf: 100, vi: 0.5, vo: -5.0, av: -10 },
          { r1: 20, rf: 100, vi: 1.0, vo: -5.0, av: -5 },
          { r1: 10, rf: 50,  vi: 0.6, vo: -3.0, av: -5 },
          { r1: 15, rf: 60,  vi: 0.5, vo: -2.0, av: -4 }
        ];
        const o = pick(opaList);
        const correctStr = `${o.vo.toFixed(1)} V`;
        const wrongOpts = [
          `${(-o.vo).toFixed(1)} V`,
          `${(o.vo - 1).toFixed(1)} V`,
          `${(-o.vo + 1).toFixed(1)} V`
        ];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `如圖所示之理想運算放大器 (Ideal OPA) 反相放大電路，輸入電阻 R1 = ${o.r1} kΩ，回授電阻 Rf = ${o.rf} kΩ。若在輸入端輸入直流電壓 Vi = ${o.vi}V，則輸出端電壓 Vo 為多少？`,
          diagramSvg: DIAGRAMS.opaInverting(o.r1, o.rf, o.vi),
          options: res.options,
          answer: res.answer,
          explanation: `【考點：OPA 反相放大器增益公式】\n反相放大器閉迴路增益：Av = Vo / Vi = - (Rf / R1)\n代入數值：\n• Av = - (${o.rf} kΩ / ${o.r1} kΩ) = ${o.av}\n• Vo = Av × Vi = (${o.av}) × ${o.vi}V = ${o.vo.toFixed(1)} V。\n(注意：反相放大器輸出極性為負)。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s1-m4-002",
      subject: "subject1",
      scope: "mock4",
      category: "基本電學",
      source: "【第四次模考】",
      isDynamic: true,
      generate: function () {
        // 最大功率轉移
        const pwrList = [
          { eth: 20, rth: 5, rl: 5, pmax: 20 },
          { eth: 24, rth: 6, rl: 6, pmax: 24 },
          { eth: 30, rth: 10, rl: 10, pmax: 22.5 },
          { eth: 40, rth: 8, rl: 8, pmax: 50 }
        ];
        const p = pick(pwrList);
        const correctStr = `RL = ${p.rl}Ω, Pmax = ${p.pmax}W`;
        const wrongOpts = [
          `RL = ${p.rl * 2}Ω, Pmax = ${(p.pmax / 2).toFixed(1)}W`,
          `RL = ${p.rl}Ω, Pmax = ${p.pmax * 2}W`,
          `RL = ${(p.rl / 2).toFixed(1)}Ω, Pmax = ${p.pmax}W`
        ];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `一直流電源電路之戴維寧等效電壓為 ${p.eth}V，等效內阻為 ${p.rth}Ω。外接負載電阻 RL，當 RL 為下列何值時，負載可獲得「最大功率輸出」，且此最大功率 Pmax 為多少？`,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：直流最大功率轉移定理】\n1. 最大功率轉移條件：負載電阻 RL = 電源內阻 Rth = ${p.rl} Ω。\n2. 當 RL = Rth 時，負載獲得之最大功率公式：\n   Pmax = (Eth)² / (4 × Rth) = (${p.eth})² / (4 × ${p.rth}) = ${p.eth * p.eth} / ${4 * p.rth} = ${p.pmax} W。\n故正確答案為 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s2-m4-001",
      subject: "subject2",
      scope: "mock4",
      category: "程式設計實習",
      source: "【第四次模考】",
      isDynamic: true,
      generate: function () {
        const recList = [
          { n: 4, factor: 2, base: 1, ans: 19, calc: "calc(4)=8+calc(3)=8+6+calc(2)=8+6+4+1 = 19" },
          { n: 4, factor: 3, base: 1, ans: 28, calc: "calc(4)=12+9+6+1 = 28" },
          { n: 3, factor: 2, base: 2, ans: 12, calc: "calc(3)=6+calc(2)=6+4+2 = 12" }
        ];
        const r = pick(recList);
        const correctStr = `${r.ans}`;
        const wrongOpts = [`${r.ans + 3}`, `${r.ans - 2}`, `${r.ans * 2}`];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `執行下列 C 語言遞迴函式呼叫 \`calc(${r.n})\` 後，函式回傳值為何？\n\`\`\`c\nint calc(int n) {\n    if (n <= 1) return ${r.base};\n    return n * ${r.factor} + calc(n - 1);\n}\n\`\`\``,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：遞迴函式展開與呼叫堆疊】\n依序展開遞迴呼叫：\n${r.calc}。\n抵達終止條件 n <= 1 回傳 ${r.base}，逐層回傳累加後結果為 ${r.ans}。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s2-m4-002",
      subject: "subject2",
      scope: "mock4",
      category: "微處理機",
      source: "【第四次模考】",
      isDynamic: false,
      question: "當微處理機接受中斷請求跳往中斷服務常式 (ISR) 前，硬體必須自動將下列何者優先推入堆疊 (Push into Stack) 保護，以利日後中斷返回？",
      options: [
        "程式計數器 (PC) 與狀態旗標 (Flags/PSW)",
        "指令暫存器 (IR) 與累加器",
        "中斷向量表所有位址",
        "所有資料快取記憶體 (Cache)"
      ],
      answer: 0,
      explanation: "【考點：微處理機中斷保存機制 (Context Saving)】\n當響應中斷時，CPU 必須保留目前主程式被中斷瞬間的執行位置與運算狀態，因此硬體會自動將「程式計數器 (PC，儲存下一條指令位址)」與「狀態暫存器 (PSW / Flags)」推入堆疊中。\n故答案選 (A)。"
    },

    // -----------------------------------------------------------------------
    // 【歷屆統測真題精選】108課綱 111~114 年統測代表題
    // -----------------------------------------------------------------------
    {
      id: "s1-past-112-01",
      subject: "subject1",
      scope: "past_exam",
      category: "基本電學",
      source: "【112 統測真題】",
      isDynamic: false,
      question: "在交流 RLC 串聯電路中，已知電阻 R = 10Ω、感抗 XL = 30Ω、容抗 XC = 10Ω。若施加 100V 的交流電壓，則此電路的總阻抗大小 |Z| 及功率因數 (PF) 分別為何？",
      options: [
        "|Z| = 22.36Ω, PF = 0.447 (落後)",
        "|Z| = 14.14Ω, PF = 0.5 (落後)",
        "|Z| = 22.36Ω, PF = 0.8 (超前)",
        "|Z| = 40Ω, PF = 0.25 (落後)"
      ],
      answer: 0,
      explanation: "【考點：交流 RLC 串聯阻抗與功率因數】\n1. 複數阻抗 Z = R + j(XL - XC) = 10 + j(30 - 10) = 10 + j20 Ω\n2. 總阻抗大小 |Z| = √(10² + 20²) = √500 ≈ 22.36 Ω\n3. 功率因數 PF = cos θ = R / |Z| = 10 / 22.36 ≈ 0.447\n4. 因感抗大於容抗 (XL > XC)，電流相位落後電壓，為「落後功率因數」。\n故答案選 (A)。"
    },
    {
      id: "s1-past-113-02",
      subject: "subject1",
      scope: "past_exam",
      category: "電子學",
      source: "【113 統測真題】",
      isDynamic: false,
      question: "有關三種雙極性電晶體 (BJT) 放大器組態（共射極 CE、共集極 CC、共基極 CB）的特性比較，下列敘述何者錯誤？",
      options: [
        "共射極 (CE) 放大電路之輸出信號與輸入信號為同相位 (0°)",
        "共集極 (CC) 放大電路又稱射極隨耦器，其電壓增益約略小於 1",
        "共基極 (CB) 放大電路具有優異的高頻響應特性",
        "共射極 (CE) 同時具備顯著的電壓增益與電流增益"
      ],
      answer: 0,
      explanation: "【考點：BJT 三種放大器組態特性】\n• CE (共射極)：輸出取自集極，輸入由基極輸入，兩者之間具有「180度反相」特性！因此選項 (A) 敘述為同相位是錯誤的。\n• CC (共集極)：同相，輸入阻抗高、輸出阻抗低，增益接近 1。\n• CB (共基極)：同相，電流增益 < 1，高頻響應極佳。\n故錯誤選項為 (A)。"
    },
    {
      id: "s2-past-112-01",
      subject: "subject2",
      scope: "past_exam",
      category: "數位邏輯設計",
      source: "【112 統測真題】",
      isDynamic: false,
      question: "如圖所示之 JK 正反器 (JK Flip-Flop)，當輸入控制腳 J = 1 且 K = 1 時，在時脈 (Clock) 觸發後，其輸出次態 Q(t+1) 為何？",
      diagramSvg: DIAGRAMS.jkFlipFlop(),
      options: [
        "原態反相 Q'(t) (Toggle)",
        "保持原態 Q(t)",
        "重置為 0 (Reset)",
        "設定為 1 (Set)"
      ],
      answer: 0,
      explanation: "【考點：JK 正反器次態方程式】\nJK 正反器特性方程：Q(t+1) = J · Q' + K' · Q\n• J = 1, K = 1 時，次態 Q(t+1) = 1·Q' + 0·Q = Q'(t)，即輸出狀態翻轉 (Toggle)。\n故答案選 (A)。"
    },
    {
      id: "s2-past-113-03",
      subject: "subject2",
      scope: "past_exam",
      category: "程式設計實習",
      source: "【113 統測真題】",
      isDynamic: true,
      generate: function () {
        const matrixList = [
          { rows: 3, cols: 4, i: 2, j: 1, base: 1000, size: 4, ans: 1036 },
          { rows: 4, cols: 5, i: 1, j: 3, base: 2000, size: 4, ans: 2032 },
          { rows: 3, cols: 3, i: 1, j: 2, base: 1000, size: 2, ans: 1010 }
        ];
        const m = pick(matrixList);
        const correctStr = `${m.ans}`;
        const wrongOpts = [`${m.ans - m.size}`, `${m.ans + m.size * 2}`, `${m.base + (m.i * m.rows + m.j) * m.size}`];
        const res = shuffleOptions([correctStr, ...wrongOpts], 0);

        return {
          question: `在 C 語言中，給定二維整數陣列宣告 \`int matrix[${m.rows}][${m.cols}];\`，若每個整數佔用 ${m.size} 個位元組 (Bytes)，且陣列起始位址 \`matrix\` 為 ${m.base}，則元素 \`&matrix[${m.i}][${m.j}]\` 的記憶體位址為多少？`,
          options: res.options,
          answer: res.answer,
          explanation: `【考點：二維陣列以列為主 (Row-Major) 位址推算】\nC 語言二維陣列採用 Row-Major 存放：\n位址公式：Address(matrix[i][j]) = Base + (i × 每列元素數 + j) × 單位大小\n1. matrix 每列有 ${m.cols} 個元素\n2. 前方完整列偏移 = ${m.i} × ${m.cols} = ${m.i * m.cols} 個元素\n3. 當前列行偏移 = ${m.j} 個元素\n4. 總元素偏移 = ${m.i * m.cols + m.j} 個\n5. 記憶體位址 = ${m.base} + (${m.i * m.cols + m.j} × ${m.size}) = ${m.ans}。\n故答案選 (${['A','B','C','D'][res.answer]})。`
        };
      }
    },
    {
      id: "s2-past-113-04",
      subject: "subject2",
      scope: "past_exam",
      category: "微處理機",
      source: "【113 統測真題】",
      isDynamic: false,
      question: "在微控制器串列通訊標準中，I2C (Inter-Integrated Circuit) 匯流排在雙向資料傳輸時，至少需要幾條訊號線（不含地線與電源線）？",
      options: [
        "2 條 (SDA 串列資料線與 SCL 串列時脈線)",
        "1 條 (1-Wire 雙向單線)",
        "4 條 (MOSI, MISO, SCK, CS)",
        "3 條 (TXD, RXD, RTS)"
      ],
      answer: 0,
      explanation: "【考點：微處理機常用串列匯流排線路比較】\n• I2C：雙線式串列匯流排，僅需 SDA (Serial Data) 與 SCL (Serial Clock) 兩條線。\n• SPI：4 線式 (MOSI, MISO, SCLK, SS/CS)。\n• UART：基本傳輸為 TXD 與 RXD。\n故答案選 (A)。"
    }
  ];

  // =========================================================================
  // 題庫工廠函式 (Question Bank Factory)
  // 當出題引擎呼叫時，動態實例化並產生漂亮乾淨數字
  // =========================================================================
  function getQuestionsForExam(filterSubject, filterScope) {
    return RAW_QUESTIONS.filter(q => {
      // 科目篩選
      if (filterSubject && filterSubject !== 'all' && q.subject !== filterSubject) {
        return false;
      }
      // 模考範圍篩選
      if (filterScope && filterScope !== 'all') {
        if (filterScope === 'past_exam') {
          return q.scope === 'past_exam';
        }
        // 若選 mock1，包含 mock1；若選 mock2，包含 mock1+mock2；若選 mock3 包含 1~3；若選 mock4 包含 1~4
        const scopeOrder = { mock1: 1, mock2: 2, mock3: 3, mock4: 4, past_exam: 5 };
        const targetLevel = scopeOrder[filterScope] || 4;
        const qLevel = scopeOrder[q.scope] || 1;
        return qLevel <= targetLevel;
      }
      return true;
    }).map(rawQ => {
      // 若為動態題目，執行生成器產生乾淨數值
      if (rawQ.isDynamic && typeof rawQ.generate === 'function') {
        const generated = rawQ.generate();
        return {
          id: rawQ.id,
          subject: rawQ.subject,
          scope: rawQ.scope,
          category: rawQ.category,
          source: rawQ.source || '',
          diagramSvg: generated.diagramSvg || rawQ.diagramSvg || null,
          diagramHtml: generated.diagramHtml || rawQ.diagramHtml || null,
          question: (rawQ.source ? `${rawQ.source} ` : '') + generated.question,
          options: generated.options,
          answer: generated.answer,
          explanation: generated.explanation
        };
      }
      // 靜態題目直接回傳複本
      return {
        id: rawQ.id,
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
  // 保持相容性
  root.QUESTION_BANK = getQuestionsForExam('all', 'all');

})(window);
