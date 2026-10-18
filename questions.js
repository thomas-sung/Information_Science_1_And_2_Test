/**
 * 高職資訊科 (電機與電子群資電類) 統測全方位題庫
 * 
 * 108課綱標準：
 * 【專業科目(一)】：基本電學、基本電學實習、電子學、電子學實習
 * 【專業科目(二)】：微處理機、數位邏輯設計、程式設計實習
 * 
 * 支援格式：
 * - 支援程式碼 Markdown 區塊 (```c ... ```)
 * - 支援多行排版與數學公式格式
 * - 答案索引 answer: 0 代表 A, 1 代表 B, 2 代表 C, 3 代表 D
 */

window.QUESTION_BANK = [
  // =========================================================================
  // 【專業科目(一)】基本電學 (Subject 1 - Basic Electricity)
  // =========================================================================
  {
    id: "s1-001",
    subject: "subject1",
    category: "基本電學",
    question: "有一電阻器之色碼依序為「紅、紫、橙、金」，若其兩端加上 54V 之直流電壓，則流經該電阻器的電流最接近下列何者？",
    options: [
      "1.0 mA",
      "2.0 mA",
      "3.0 mA",
      "4.0 mA"
    ],
    answer: 1,
    explanation: "【考點：色碼電阻讀法與歐姆定律】\n1. 色碼數值對應：\n   • 紅 = 2\n   • 紫 = 7\n   • 橙 = 第三環倍率為 10³ = 1000\n   • 金 = 誤差 ±5%\n   因此電阻標稱值為 27 × 10³ Ω = 27 kΩ。\n2. 根據歐姆定律 I = V / R：\n   I = 54V / 27kΩ = 2 mA。\n故答案選 (B)。"
  },
  {
    id: "s1-002",
    subject: "subject1",
    category: "基本電學",
    question: "在直流電路中，將三個阻值分別為 6Ω、12Ω 與 4Ω 的電阻並聯後，連接至 24V 的理想直流電源。試求此電源所供給的總電流為多少？",
    options: [
      "6 A",
      "8 A",
      "12 A",
      "24 A"
    ],
    answer: 2,
    explanation: "【考點：並聯等效電阻與歐姆定律】\n方法一：求等效並聯電阻 Req\n1/Req = 1/6 + 1/12 + 1/4 = 2/12 + 1/12 + 3/12 = 6/12 = 1/2\n⇒ Req = 2 Ω。\n總電流 I = E / Req = 24V / 2Ω = 12 A。\n\n方法二：各分路電流相加\nI = (24/6) + (24/12) + (24/4) = 4 + 2 + 6 = 12 A。\n故答案選 (C)。"
  },
  {
    id: "s1-003",
    subject: "subject1",
    category: "基本電學",
    question: "如欲將一個線性有源單埠網路化簡為「戴維寧等效電路」，若測得該開路端電壓為 18V，將該埠短路時之電流為 3A，則其戴維寧等效電阻 Rth 與戴維寧等效電壓 Eth 分別為何？",
    options: [
      "Eth = 18V, Rth = 6Ω",
      "Eth = 18V, Rth = 54Ω",
      "Eth = 6V, Rth = 18Ω",
      "Eth = 3V, Rth = 6Ω"
    ],
    answer: 0,
    explanation: "【考點：戴維寧等效電路分析】\n1. 戴維寧等效電壓 Eth 等於開路端電壓 Voc：\n   Eth = Voc = 18 V\n2. 戴維寧等效電阻 Rth 等於開路電壓除以短路電流 Isc：\n   Rth = Voc / Isc = 18V / 3A = 6 Ω。\n故等效電路為 Eth = 18V 串聯 Rth = 6Ω，答案選 (A)。"
  },
  {
    id: "s1-004",
    subject: "subject1",
    category: "基本電學",
    question: "有一個 100μF 的電容器充電至 200V，試問該電容器所儲存的靜電能量為多少焦耳 (J)？",
    options: [
      "1 J",
      "2 J",
      "4 J",
      "20 J"
    ],
    answer: 1,
    explanation: "【考點：電容器儲能公式】\n電容儲能公式 Wc = (1/2) × C × V²\n代入數據：\nC = 100 μF = 100 × 10⁻⁶ F = 10⁻⁴ F\nV = 200 V ⇒ V² = 40000 = 4 × 10⁴\nWc = (1/2) × 10⁻⁴ × (4 × 10⁴) = 2 焦耳 (J)。\n故答案選 (B)。"
  },
  {
    id: "s1-005",
    subject: "subject1",
    category: "基本電學",
    question: "一個 RC 串聯直流充電電路中，已知 R = 50 kΩ，C = 20 μF。此電路的充電時間常數 (τ) 為何？",
    options: [
      "0.5 秒",
      "1.0 秒",
      "2.5 秒",
      "10 秒"
    ],
    answer: 1,
    explanation: "【考點：RC 暫態電路之時間常數】\nRC 串聯電路的時間常數 τ = R × C\n代入數值：\nR = 50 kΩ = 50 × 10³ Ω\nC = 20 μF = 20 × 10⁻⁶ F\nτ = (50 × 10³) × (20 × 10⁻⁶) = 1000 × 10⁻³ = 1 秒。\n通常約經過 5τ (即 5 秒) 可達到 99.3% 穩態。\n故答案選 (B)。"
  },
  {
    id: "s1-006",
    subject: "subject1",
    category: "基本電學",
    question: "交流正弦波電壓之數學表示式為 v(t) = 141.4 sin(377t - 30°) V，則該電壓的有效值 (Vrms) 及頻率 (f) 分別約為多少？",
    options: [
      "Vrms = 100V, f = 50 Hz",
      "Vrms = 100V, f = 60 Hz",
      "Vrms = 141.4V, f = 60 Hz",
      "Vrms = 200V, f = 377 Hz"
    ],
    answer: 1,
    explanation: "【考點：交流正弦波有效值與角頻率】\n1. 最大值 Vm = 141.4 V\n   有效值 Vrms = Vm / √2 = 141.4 / 1.414 ≈ 100 V。\n2. 角頻率 ω = 2πf = 377 rad/s\n   f = 377 / (2 × 3.1416) ≈ 60 Hz (台灣家用電力常用頻率)。\n故答案選 (B)。"
  },
  {
    id: "s1-007",
    subject: "subject1",
    category: "基本電學",
    question: "在交流 RLC 串聯電路中，已知電阻 R = 10Ω、感抗 XL = 30Ω、容抗 XC = 10Ω。若施加 100V 的交流電壓，則此電路的總阻抗大小 |Z| 及功率因數 (PF) 分別為何？",
    options: [
      "|Z| = 14.14Ω, PF = 0.5 (落後)",
      "|Z| = 22.36Ω, PF = 0.447 (落後)",
      "|Z| = 22.36Ω, PF = 0.8 (超前)",
      "|Z| = 40Ω, PF = 0.25 (落後)"
    ],
    answer: 1,
    explanation: "【考點：交流 RLC 串聯阻抗與功率因數】\n1. 複數阻抗 Z = R + j(XL - XC) = 10 + j(30 - 10) = 10 + j20 Ω\n2. 總阻抗大小 |Z| = √(10² + 20²) = √(100 + 400) = √500 = 10√5 ≈ 22.36 Ω\n3. 功率因數 PF = cos θ = R / |Z| = 10 / 22.36 ≈ 0.447\n4. 因 XL > XC (感抗大於容抗)，故電流相位落後電壓，為「落後功率因數」。\n故答案選 (B)。"
  },
  {
    id: "s1-008",
    subject: "subject1",
    category: "基本電學",
    question: "直流電源供應器其內部等效電壓為 20V，內部等效內阻為 5Ω。當負載電阻 RL 為下列何值時，負載可獲得「最大功率輸出」，且此時獲得之最大功率 Pmax 為多少？",
    options: [
      "RL = 5Ω, Pmax = 20W",
      "RL = 5Ω, Pmax = 40W",
      "RL = 10Ω, Pmax = 10W",
      "RL = 2.5Ω, Pmax = 80W"
    ],
    answer: 0,
    explanation: "【考點：最大功率轉移定理】\n1. 最大功率轉移條件：負載電阻 RL = 內部等效電阻 Rth = 5 Ω。\n2. 當 RL = Rth 時，負載兩端電壓為電源之一半 VL = E / 2 = 20 / 2 = 10 V。\n3. 最大功率 Pmax = (VL)² / RL = 10² / 5 = 100 / 5 = 20 W。\n(或直接公式：Pmax = E² / (4 × Rth) = 20² / (4 × 5) = 400 / 20 = 20 W)。\n故答案選 (A)。"
  },

  // =========================================================================
  // 【專業科目(一)】電子學 (Subject 1 - Electronics)
  // =========================================================================
  {
    id: "s1-009",
    subject: "subject1",
    category: "電子學",
    question: "矽 (Si) 二極體在常溫下順向偏壓導通時，其障壁電壓 (切入電壓 Vγ) 大約為多少伏特？",
    options: [
      "0.2 V ~ 0.3 V",
      "0.6 V ~ 0.7 V",
      "1.2 V ~ 1.4 V",
      "2.0 V ~ 2.5 V"
    ],
    answer: 1,
    explanation: "【考點：半導體二極體基本特性】\n• 鍺 (Ge) 二極體障壁電壓約 0.2V ~ 0.3V\n• 矽 (Si) 二極體障壁電壓約 0.6V ~ 0.7V\n• 發光二極體 (LED) 依發光顏色約 1.8V ~ 3.5V\n故答案選 (B)。"
  },
  {
    id: "s1-010",
    subject: "subject1",
    category: "電子學",
    question: "有關雙極性接面電晶體 (BJT) 操作在「線性放大區 (Active Region)」的偏壓條件，下列何者正確？",
    options: [
      "基極-射極接面 (B-E) 逆向偏壓，基極-集極接面 (B-C) 順向偏壓",
      "基極-射極接面 (B-E) 逆向偏壓，基極-集極接面 (B-C) 逆向偏壓",
      "基極-射極接面 (B-E) 順向偏壓，基極-集極接面 (B-C) 逆向偏壓",
      "基極-射極接面 (B-E) 順向偏壓，基極-集極接面 (B-C) 順向偏壓"
    ],
    answer: 2,
    explanation: "【考點：BJT 電晶體工作區域偏壓判斷】\n• 放大區 (Active Mode)：B-E 接面順偏 (Forward)，B-C 接面逆偏 (Reverse)\n• 飽和區 (Saturation Mode)：B-E 接面順偏，B-C 接面順偏 (開關 ON)\n• 截止區 (Cutoff Mode)：B-E 接面逆偏，B-C 接面逆偏 (開關 OFF)\n• 逆轉區 (Inverted Mode)：B-E 接面逆偏，B-C 接面順偏\n故答案選 (C)。"
  },
  {
    id: "s1-011",
    subject: "subject1",
    category: "電子學",
    question: "理想運算放大器 (Ideal OPA) 的特性中，下列敘述何者錯誤？",
    options: [
      "差動電壓增益 Ad 趨近於無限大 (∞)",
      "輸入阻抗 Rin 趨近於無限大 (∞)",
      "輸出阻抗 Ro 趨近於無限大 (∞)",
      "頻寬 (Bandwidth) 趨近於無限大 (∞)"
    ],
    answer: 2,
    explanation: "【考點：理想運算放大器特性】\n理想 OPA 特性：\n1. 輸入阻抗 Rin = ∞ (不吸取輸入電流，虛接地概念基礎)\n2. 輸出阻抗 Ro = 0 (而非無限大！以提供理想電壓源特性)\n3. 開迴路增益 Avo = ∞\n4. 頻寬 BW = ∞\n5. 共模拒斥比 CMRR = ∞\n因此選項 (C) 輸出阻抗應為 0，敘述錯誤，選 (C)。"
  },
  {
    id: "s1-012",
    subject: "subject1",
    category: "電子學",
    question: "一個反相放大器電路中，輸入電阻 R1 = 10 kΩ，回授電阻 Rf = 100 kΩ，若輸入電壓 Vi = 0.5V，則輸出電壓 Vo 為多少？",
    options: [
      "-5.0 V",
      "+5.0 V",
      "-5.5 V",
      "+5.5 V"
    ],
    answer: 0,
    explanation: "【考點：OPA 反相放大器公式】\n反相放大器電壓增益 Av = Vo / Vi = - (Rf / R1)\n代入數值：\nAv = - (100 kΩ / 10 kΩ) = -10\n輸出電壓 Vo = Av × Vi = (-10) × 0.5V = -5.0 V。\n故答案選 (A)。"
  },
  {
    id: "s1-013",
    subject: "subject1",
    category: "電子學",
    question: "橋式全波整流電路輸入交流電源為 110V 有效值，若二極體均視為理想二極體，則負載端輸出直流電壓峰值 (Vdc,peak) 及二極體之最高逆向耐壓 (PIV) 分別約為多少？",
    options: [
      "Vdc,peak ≈ 110V, PIV ≈ 110V",
      "Vdc,peak ≈ 155.5V, PIV ≈ 155.5V",
      "Vdc,peak ≈ 155.5V, PIV ≈ 311V",
      "Vdc,peak ≈ 70.7V, PIV ≈ 155.5V"
    ],
    answer: 1,
    explanation: "【考點：橋式整流電路特性】\n1. 輸入峰值電壓 Vm = Vrms × √2 = 110 × 1.414 ≈ 155.5 V。\n2. 橋式整流在每半周有兩顆二極體導通，負載輸出峰值即為 Vm ≈ 155.5 V。\n3. 橋式整流中每顆截止二極體承受的最大逆向峰值電壓 PIV = Vm ≈ 155.5 V。\n故答案選 (B)。"
  },
  {
    id: "s1-014",
    subject: "subject1",
    category: "電子學",
    question: "共射極 (Common Emitter, CE) 放大電路在小訊號操作時，其輸入交流信號與輸出交流信號之間的相位關係為何？",
    options: [
      "同相位 (0°)",
      "反相 (180°)",
      "輸出超前 90°",
      "輸出落後 90°"
    ],
    answer: 1,
    explanation: "【考點：三種 BJT 放大器組態特性比較】\n• 共射極 (CE)：輸出由集極取出，輸出與輸入信號「反相 180°」，具有高電壓增益與電流增益。\n• 共集極 (CC，射極隨耦器)：輸出由射極取出，輸出與輸入信號「同相 0°」，電壓增益 ≈ 1，輸入阻抗高。\n• 共基極 (CB)：輸出由集極取出，輸出與輸入信號「同相 0°」，高頻特性佳。\n故答案選 (B)。"
  },

  // =========================================================================
  // 【專業科目(二)】微處理機 (Subject 2 - Microprocessor)
  // =========================================================================
  {
    id: "s2-001",
    subject: "subject2",
    category: "微處理機",
    question: "CPU 中用來存放「下一個即將被讀取並執行之指令記憶體位址」的暫存器是下列哪一個？",
    options: [
      "累加器 (Accumulator, ACC)",
      "指令暫存器 (Instruction Register, IR)",
      "程式計數器 (Program Counter, PC)",
      "堆疊指標 (Stack Pointer, SP)"
    ],
    answer: 2,
    explanation: "【考點：微處理機 CPU 核心暫存器功能】\n• 程式計數器 (PC)：存放下一個欲讀取並執行的指令記憶體位址。\n• 指令暫存器 (IR)：存放「正在執行」或剛抓取出來解碼的指令。\n• 累加器 (ACC)：存放運算元或算術邏輯運算 (ALU) 的暫存結果。\n• 堆疊指標 (SP)：存放系統堆疊 (Stack) 頂端的記憶體位址。\n故答案選 (C)。"
  },
  {
    id: "s2-002",
    subject: "subject2",
    category: "微處理機",
    question: "若某微處理機具有 24 條位址線 (Address Bus) 與 16 條資料線 (Data Bus)，則此處理機最大的記憶體定址空間 (Byte Addressing) 為多少？",
    options: [
      "1 MB",
      "4 MB",
      "16 MB",
      "64 MB"
    ],
    answer: 2,
    explanation: "【考點：記憶體定址空間計算】\n以位元組為定址單位 (Byte Addressing) 時：\n最大可定址空間 = 2^(位址線數量) Bytes\n= 2²⁴ Bytes\n= 2⁴ × 2²⁰ Bytes\n= 16 × 1 MB = 16 MB。\n(資料線條數影響一次存取的寬度，定址能力則由位址線決定)。\n故答案選 (C)。"
  },
  {
    id: "s2-003",
    subject: "subject2",
    category: "微處理機",
    question: "當微處理機發生「中斷 (Interrupt)」請求並被接受時，CPU 在跳往中斷服務程式 (ISR) 之前，硬體會自動將下列何者先推入堆疊 (Push into Stack)？",
    options: [
      "程式計數器 (PC) 與旗標暫存器 (Flags)",
      "指令暫存器 (IR) 與累加器",
      "中斷向量表 (Vector Table)",
      "資料匯流排上的數值"
    ],
    answer: 0,
    explanation: "【考點：中斷處理程序 (Context Saving)】\n當 CPU 接收到中斷並響應時，為了在中斷處理程式 (ISR) 執行完畢執行 RETI 指令後能正確返回中斷點繼續執行：\n1. CPU 硬體必須自動將「返回位址」(即 PC 目前指向的下一條指令位址) 與「狀態旗標 (Program Status Word / Flags)」推入堆疊中保護。\n2. ISR 內部再視需要保護其餘通用暫存器。\n故答案選 (A)。"
  },
  {
    id: "s2-004",
    subject: "subject2",
    category: "微處理機",
    question: "在微處理機通訊介面中，I2C (Inter-Integrated Circuit) 匯流排標準在基本通訊時需要幾條主要訊號線？",
    options: [
      "1 條 (1-Wire)",
      "2 條 (SDA 與 SCL)",
      "3 條 (TX, RX, GND)",
      "4 條 (MOSI, MISO, SCK, CS)"
    ],
    answer: 1,
    explanation: "【考點：微處理機串列傳輸介面比較】\n• I2C：雙線式串列通訊，包含 SDA (串列資料線) 與 SCL (串列時脈線)，採 Open-Drain 需外接上拉電阻。\n• SPI：4 線式同步通訊，包含 MOSI、MISO、SCK、CS/SS。\n• UART：非同步全雙工通訊，基本線路包含 TXD、RXD (及接地線)。\n故答案選 (B)。"
  },

  // =========================================================================
  // 【專業科目(二)】數位邏輯設計 (Subject 2 - Digital Logic)
  // =========================================================================
  {
    id: "s2-005",
    subject: "subject2",
    category: "數位邏輯設計",
    question: "將二進位數值 (11010110)₂ 轉換為十六進位 (Hexadecimal) 表示法，其結果為下列何者？",
    options: [
      "(D6)₁₆",
      "(B6)₁₆",
      "(A6)₁₆",
      "(C6)₁₆"
    ],
    answer: 0,
    explanation: "【考點：二進位與十六進位進位轉換】\n二進位轉十六進位：由低位元往高位元，每 4 位一組：\n• 高 4 位：1101₂ = 8 + 4 + 0 + 1 = 13 = D₁₆\n• 低 4 位：0110₂ = 0 + 4 + 2 + 0 = 6₁₆\n合併得 (D6)₁₆。\n故答案選 (A)。"
  },
  {
    id: "s2-006",
    subject: "subject2",
    category: "數位邏輯設計",
    question: "依據狄摩根定律 (De Morgan's Laws)，邏輯式 F = (A + B · C)' 化簡後的等效布林代數表示式為何？",
    options: [
      "A' · (B' + C')",
      "A' + B' · C'",
      "A' · B' + C'",
      "(A' + B') · C'"
    ],
    answer: 0,
    explanation: "【考點：狄摩根定律化簡】\n1. 狄摩根基本公式：\n   • (X + Y)' = X' · Y'\n   • (X · Y)' = X' + Y'\n2. 令 X = A，Y = (B · C)，則：\n   F = (A + (B · C))' = A' · (B · C)'\n3. 再對 (B · C)' 展開：\n   (B · C)' = B' + C'\n4. 代回式子：\n   F = A' · (B' + C')。\n故答案選 (A)。"
  },
  {
    id: "s2-007",
    subject: "subject2",
    category: "數位邏輯設計",
    question: "有關 JK 正反器 (JK Flip-Flop) 的狀態切換特性，當輸入控制腳 J = 1 且 K = 1 時，在時脈 (Clock) 觸發後，其輸出次態 Q(t+1) 為何？",
    options: [
      "保持原態 Q(t)",
      "重置為 0 (Reset)",
      "設定為 1 (Set)",
      "原態反相 Q'(t) (Toggle)"
    ],
    answer: 3,
    explanation: "【考點：JK 正反器真值表特性】\nJK 正反器的次態特性方程式為 Q(t+1) = J·Q' + K'·Q：\n• J = 0, K = 0 ⇒ Q(t+1) = Q(t) (保持 Hold)\n• J = 0, K = 1 ⇒ Q(t+1) = 0 (重置 Reset)\n• J = 1, K = 0 ⇒ Q(t+1) = 1 (設定 Set)\n• J = 1, K = 1 ⇒ Q(t+1) = Q'(t) (反相 Toggle)\n故答案選 (D)。"
  },
  {
    id: "s2-008",
    subject: "subject2",
    category: "數位邏輯設計",
    question: "欲設計一個模數為 12 (MOD-12) 的二進位計數器，最少需要使用多少個正反器 (Flip-Flops)？",
    options: [
      "3 個",
      "4 個",
      "5 個",
      "6 個"
    ],
    answer: 1,
    explanation: "【考點：計數器模數 (Modulus) 與正反器數量】\n若需要計數 N 個狀態 (MOD-N)，所需之正反器數目 n 必須滿足：\n2^(n-1) < N ≤ 2^n\n對於 MOD-12：\n• n = 3 ⇒ 2³ = 8 < 12 (不夠用)\n• n = 4 ⇒ 2⁴ = 16 ≥ 12 (足夠容納 12 個狀態，即 0000 ~ 1011)\n因此最少需要 4 個正反器。\n故答案選 (B)。"
  },

  // =========================================================================
  // 【專業科目(二)】程式設計實習 (Subject 2 - Programming)
  // =========================================================================
  {
    id: "s2-009",
    subject: "subject2",
    category: "程式設計實習",
    question: "執行下列 C 語言程式碼片段後，輸出螢幕上的數值為何？\n```c\nint sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 3 == 0) continue;\n    if (i > 7) break;\n    sum += i;\n}\nprintf(\"%d\", sum);\n```",
    options: [
      "16",
      "19",
      "22",
      "28"
    ],
    answer: 1,
    explanation: "【考點：迴圈流程控制 (continue 與 break)】\n逐步追蹤 i 的變化：\n• i = 1: 1%3!=0, 1<=7 ⇒ sum = 0 + 1 = 1\n• i = 2: 2%3!=0, 2<=7 ⇒ sum = 1 + 2 = 3\n• i = 3: 3%3==0 ⇒ 觸發 continue，跳過累加\n• i = 4: 4%3!=0, 4<=7 ⇒ sum = 3 + 4 = 7\n• i = 5: 5%3!=0, 5<=7 ⇒ sum = 7 + 5 = 12\n• i = 6: 6%3==0 ⇒ 觸發 continue\n• i = 7: 7%3!=0, 7<=7 ⇒ sum = 12 + 7 = 19\n• i = 8: 8 > 7 成立 ⇒ 觸發 break，直接終止迴圈！\n最終累加和 sum = 1 + 2 + 4 + 5 + 7 = 19。\n故答案選 (B)。"
  },
  {
    id: "s2-010",
    subject: "subject2",
    category: "程式設計實習",
    question: "執行下列 C 語言程式碼後，變數 y 的值為多少？\n```c\nint arr[5] = {10, 20, 30, 40, 50};\nint *ptr = arr + 2;\nint y = *(ptr + 1) + *ptr;\n```",
    options: [
      "50",
      "70",
      "90",
      "30"
    ],
    answer: 1,
    explanation: "【考點：指標與陣列位址運算】\n1. arr 為陣列開頭位址 &arr[0]：\n   • arr[0] = 10, arr[1] = 20, arr[2] = 30, arr[3] = 40, arr[4] = 50\n2. ptr = arr + 2 指向 arr[2]，所以 *ptr = 30\n3. *(ptr + 1) 即指向 arr[3]，值為 40\n4. y = *(ptr + 1) + *ptr = 40 + 30 = 70。\n故答案選 (B)。"
  },
  {
    id: "s2-011",
    subject: "subject2",
    category: "程式設計實習",
    question: "執行下列遞迴函式呼叫 `calc(4)` 後，回傳值為何？\n```c\nint calc(int n) {\n    if (n <= 1) return 1;\n    return n * 2 + calc(n - 1);\n}\n```",
    options: [
      "19",
      "20",
      "21",
      "24"
    ],
    answer: 0,
    explanation: "【考點：遞迴函式呼叫堆疊展開】\n展開遞迴函式呼叫：\n• calc(4) = 4 * 2 + calc(3) = 8 + calc(3)\n• calc(3) = 3 * 2 + calc(2) = 6 + calc(2)\n• calc(2) = 2 * 2 + calc(1) = 4 + calc(1)\n• calc(1) = 1 (抵達基本終止條件 n <= 1)\n逐步向上回傳計算：\n• calc(2) = 4 + 1 = 5\n• calc(3) = 6 + 5 = 11\n• calc(4) = 8 + 11 = 19。\n故答案選 (A)。"
  },
  {
    id: "s2-012",
    subject: "subject2",
    category: "程式設計實習",
    question: "在 C 語言中，若宣告 `int a = 12, b = 5;`，則運算式 `a / b * 2 + a % b` 的計算結果為多少？",
    options: [
      "4",
      "6",
      "6.8",
      "7"
    ],
    answer: 1,
    explanation: "【考點：整數除法與運算子優先順序】\n在 C 語言中：\n1. 整數除法 `a / b`：12 / 5 = 2 (小數被無條件截斷)\n2. `*` 與 `/` 同優先權，由左至右結合：(12 / 5) * 2 = 2 * 2 = 4\n3. 取餘數 `a % b`：12 % 5 = 2 (餘數為 2)\n4. 加法運算：4 + 2 = 6。\n故答案選 (B)。"
  },
  {
    id: "s2-013",
    subject: "subject2",
    category: "程式設計實習",
    question: "執行下列 C 語言位元運算程式碼後，輸出變數 z 的值為多少？\n```c\nint x = 6;  // 0110 in binary\nint y = 3;  // 0011 in binary\nint z = (x ^ y) << 1;\nprintf(\"%d\", z);\n```",
    options: [
      "5",
      "10",
      "14",
      "18"
    ],
    answer: 1,
    explanation: "【考點：位元運算子 (XOR 與向左位移)】\n1. 二進位表示：\n   • x = 6₁₀ = (0110)₂\n   • y = 3₁₀ = (0011)₂\n2. 執行互斥或 (XOR `^`) 運算（相同為 0，不同為 1）：\n   0110 ^ 0011 = 0101₂ = 5₁₀\n3. 執行向左位移 (`<< 1`)（相當於乘以 2）：\n   0101₂ << 1 = 1010₂ = 10₁₀\n故答案選 (B)。"
  },
  {
    id: "s2-014",
    subject: "subject2",
    category: "程式設計實習",
    question: "在 C 語言中，給定二維陣列宣告 `int matrix[3][4];`，若每個整數佔用 4 個位元組 (Bytes)，且陣列首位址 `matrix` (即 `&matrix[0][0]`) 為 1000，則元素 `&matrix[2][1]` 的記憶體位址為多少？",
    options: [
      "1024",
      "1036",
      "1040",
      "1044"
    ],
    answer: 1,
    explanation: "【考點：二維陣列以列為主 (Row-Major) 的位址計算】\n在 C 語言中二維陣列採用 Row-Major 存放：\n公式：Address(matrix[i][j]) = Base + (i × 列長度 + j) × 單位大小\n1. matrix 為 3 列 4 行 (每列有 4 個元素)\n2. 目標為 matrix[2][1]：\n   前面已經排滿了 2 整列 (2 × 4 = 8 個元素)，加上當前列的第 1 個 (0-indexed 第 1 個，即 1 個元素)\n   偏移個數 = 2 × 4 + 1 = 9 個元素\n3. 偏移位元組 = 9 × 4 Bytes = 36 Bytes\n4. 記憶體位址 = 1000 + 36 = 1036。\n故答案選 (B)。"
  }
];
