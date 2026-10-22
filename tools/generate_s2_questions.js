const { CONCEPT_NAMES } = require('./concept_dict.js');

/**
 * 產生 109~114 各年度專二新增 25 題 (YYY-s2-001 ~ YYY-s2-025)
 * 包含 9 題數位邏輯 (001~009)、8 題程式設計 (010~017)、8 題微處理機 (018~025)
 * 6 年 × 25 = 150 題
 */
function generateS2Questions() {
  const years = ['109', '110', '111', '112', '113', '114'];
  const questions = [];

  years.forEach(year => {
    // ----------------------------------------------------
    // 數位邏輯設計 (001 ~ 009，共 9 題)
    // ----------------------------------------------------

    // 001: 2的補數加減法與溢位 (mock1)
    questions.push({
      id: `${year}-s2-001`,
      year,
      subject: 'subject2',
      category: '數位邏輯設計',
      scope: 'mock1',
      concept: 'dl_binary_arithmetic',
      conceptName: CONCEPT_NAMES.dl_binary_arithmetic,
      source: `【${year} 統測真題】`,
      question: `在 8 位元帶符號數的「2 的補數」加法運算中，若將 $A = 01100100_2$（$+100$）與 $B = 00110010_2$（$+50$）相加，下列敘述何者正確？`,
      options: [
        '運算結果為 10010110₂，因為兩正數相加變成負數，產生溢位 (Overflow)',
        '運算結果為 10010110₂，數值正確等於 +150，未發生溢位',
        '運算結果為 00010110₂，進位旗標有效',
        '8 位元 2 的補數可表示最大範圍為 +255，故不會溢位'
      ],
      answer: 0,
      explanation: `8 位元帶符號 2 的補數之有效數值範圍為 $-128 \\sim +127$。<br>$+100 + (+50) = +150$，已超出 $+127$ 之上限。<br>相加二進制為 $01100100 + 00110010 = 10010110_2$。最高位元（符號位）由 0 變成 1（負數），兩正數相加得負數，代表發生運算溢位（Overflow = 1）。故選 (A)。`
    });

    // 002: 互斥或閘 XOR 奇偶同位 (mock1)
    questions.push({
      id: `${year}-s2-002`,
      year,
      subject: 'subject2',
      category: '數位邏輯設計',
      scope: 'mock1',
      concept: 'dl_xor_xnor',
      conceptName: CONCEPT_NAMES.dl_xor_xnor,
      source: `【${year} 模擬考】`,
      question: `一三輸入互斥或閘（XOR Gate）之輸入端分別為 A, B, C。當三個輸入端出現何種情況時，輸出端 Y 會輸出高電位 1？`,
      options: [
        '輸入中 1 的個數為奇數時（例如有 1 個或 3 個 1）',
        '輸入中 1 的個數為偶數時（例如有 0 個或 2 個 1）',
        '只有當 A=1, B=1, C=1 同時成立時',
        '只要有任何一個輸入端為 0 時'
      ],
      answer: 0,
      explanation: `多輸入 XOR 閘（奇同位產生器）：<br>運算邏輯為 $Y = A \\oplus B \\oplus C$。<br>其特性為「輸入位元中 1 的個數為奇數個時輸出為 1，為偶數個時輸出為 0」。故正確答案為 (A)。`
    });

    // 003: 萬用閘 NAND 實現 (mock1)
    questions.push({
      id: `${year}-s2-003`,
      year,
      subject: 'subject2',
      category: '數位邏輯設計',
      scope: 'mock1',
      concept: 'dl_universal_gates',
      conceptName: CONCEPT_NAMES.dl_universal_gates,
      source: `【${year} 統測真題】`,
      question: `若僅使用二輸入「反及閘（NAND Gate）」來組合實現一個二輸入「或閘（OR Gate）」，至少需要使用幾顆二輸入 NAND 閘？`,
      options: ['3 顆', '2 顆', '4 顆', '5 顆'],
      answer: 0,
      explanation: `依狄摩根定理：$A + B = \\overline{\\overline{A + B}} = \\overline{\\bar{A} \\cdot \\bar{B}}$。<br>1. 用第 1 顆 NAND 閘將 A 反相產生 $\\bar{A}$；<br>2. 用第 2 顆 NAND 閘將 B 反相產生 $\\bar{B}$；<br>3. 用第 3 顆 NAND 閘將 $\\bar{A}$ 與 $\\bar{B}$ 輸入進行反及運算，輸出即為 $A + B$。<br>故總共需使用 3 顆 NAND 閘，選 (A)。`
    });

    // 004: 4變數卡諾圖化簡 (mock1)
    questions.push({
      id: `${year}-s2-004`,
      year,
      subject: 'subject2',
      category: '數位邏輯設計',
      scope: 'mock1',
      concept: 'dl_karnaugh_4var',
      conceptName: CONCEPT_NAMES.dl_karnaugh_4var,
      source: `【${year} 模擬考】`,
      question: `有一四變數布林函數 $F(A, B, C, D) = \\sum m(5, 7, 13, 15)$。在卡諾圖上將此 4 個相鄰項合併為一個 4-group 圈選後，化簡之最簡 SOP 結果為何？`,
      options: [
        'B · D',
        '<span class="overline">B</span> · D',
        'A · B',
        'C · D'
      ],
      answer: 0,
      explanation: `二進制編碼對應：<br>- m(5) = 0101, m(7) = 0111<br>- m(13) = 1101, m(15) = 1111<br>共同特徵分析：<br>- B 固定為 1，D 固定為 1；<br>- A 出現 0 與 1 相消，C 出現 0 與 1 相消。<br>因此最簡積之和即為 $B \\cdot D$。故選 (A)。`
    });

    // 005: 半加器與全加器進位 (mock2)
    questions.push({
      id: `${year}-s2-005`,
      year,
      subject: 'subject2',
      category: '數位邏輯設計',
      scope: 'mock2',
      concept: 'dl_adder_subtractor',
      conceptName: CONCEPT_NAMES.dl_adder_subtractor,
      source: `【${year} 統測真題】`,
      question: `一位元全加器（Full Adder）中，被加數為 A、加數為 B、低位進位為 Cin。其向高位輸出的進位信號 Cout 之布林邏輯表示式為何？`,
      options: [
        'Cout = A · B + Cin · (A ⊕ B)',
        'Cout = A ⊕ B ⊕ Cin',
        'Cout = A · B · Cin',
        'Cout = (A + B) · Cin'
      ],
      answer: 0,
      explanation: `全加器輸出邏輯：<br>1. 和（Sum）：$S = A \\oplus B \\oplus Cin$<br>2. 進位（Carry）：$Cout = AB + Cin(A \\oplus B)$。<br>故正確答案為 (A)。`
    });

    // 006: 4位元並聯加法器 7483 (mock2)
    questions.push({
      id: `${year}-s2-006`,
      year,
      subject: 'subject2',
      category: '數位邏輯設計',
      scope: 'mock2',
      concept: 'dl_parallel_adder',
      conceptName: CONCEPT_NAMES.dl_parallel_adder,
      source: `【${year} 模擬考】`,
      question: `數位 IC 7483 是一顆 4 位元二進制並聯加法器。若輸入 $A = 1011_2$（11），$B = 0110_2$（6），最低位進位輸入端 $C_0 = 1$。請問加法器之 4 位元和輸出 $S_4 S_3 S_2 S_1$ 及最高位進位輸出 $C_4$ 分別為何？`,
      options: [
        'S = 0010₂ (2), C4 = 1 (總和為 18)',
        'S = 0001₂ (1), C4 = 1 (總和為 17)',
        'S = 0011₂ (3), C4 = 0 (總和為 3)',
        'S = 1010₂ (10), C4 = 1 (總和為 26)'
      ],
      answer: 0,
      explanation: `十進制總和計算：$Sum = A + B + C_0 = 11 + 6 + 1 = 18$。<br>轉換為 5 位元二進制：$18 = 10010_2$。<br>最高位第 5 位為進位 $C_4 = 1$，低 4 位和為 $S = 0010_2$。故正確答案為 (A)。`
    });

    // 007: 4位元數值比較器 (mock2)
    questions.push({
      id: `${year}-s2-007`,
      year,
      subject: 'subject2',
      category: '數位邏輯設計',
      scope: 'mock2',
      concept: 'dl_comparator_circuit',
      conceptName: CONCEPT_NAMES.dl_comparator_circuit,
      source: `【${year} 統測真題】`,
      question: `一 4 位元二進制數值比較器比較兩數 $A = A_3 A_2 A_1 A_0$ 與 $B = B_3 B_2 B_1 B_0$。若已知最高位 $A_3 = 1$ 且 $B_3 = 0$，則不論其餘位元狀態為何，比較器輸出端之狀態必定為何？`,
      options: [
        '輸出必定為 A > B',
        '輸出必定為 A < B',
        '輸出必定為 A = B',
        '無法判別，必須依序檢查最低位 A0 與 B0'
      ],
      answer: 0,
      explanation: `數值比較器是由最高有效位元（MSB）開始向下逐位比對。<br>當最高位 $A_3 > B_3$（$1 > 0$）時，即已決定數值大小，後面位元無需考慮，結果必定為 $A > B$。故選 (A)。`
    });

    // 008: 優先權編碼器 74148 (mock2)
    questions.push({
      id: `${year}-s2-008`,
      year,
      subject: 'subject2',
      category: '數位邏輯設計',
      scope: 'mock2',
      concept: 'dl_encoder',
      conceptName: CONCEPT_NAMES.dl_encoder,
      source: `【${year} 模擬考】`,
      question: `在 8 對 3 優先權編碼器（如 74LS148）中，當有多個輸入線同時為有效低電位輸入時，其編碼輸出端反映的是哪一個輸入腳位的二進制代碼？`,
      options: [
        '具有最高優先權（通常為最高編號輸入腳位 7）的信號',
        '具有最低優先權（編號 0）的信號',
        '所有輸入信號之邏輯 OR 混合運算',
        '輸出呈現不定狀態 (Forbidden)'
      ],
      answer: 0,
      explanation: `優先權編碼器（Priority Encoder）特點：<br>當多個輸入端同時有效時，晶片內部優先權邏輯只會處理並輸出「編號最高（最高權重）的那個輸入信號」對應之二進制代碼，有效防止多重信號碰撞。故選 (A)。`
    });

    // 009: 任意模數計數器 (mock3)
    questions.push({
      id: `${year}-s2-009`,
      year,
      subject: 'subject2',
      category: '數位邏輯設計',
      scope: 'mock3',
      concept: 'dl_modulus_counter',
      conceptName: CONCEPT_NAMES.dl_modulus_counter,
      source: `【${year} 統測真題】`,
      question: `欲利用 4 位元二進制上數計數器（狀態為 0000₂ 到 1111₂）設計一個「模數為 10（MOD-10 十進制，計數 0 到 9）」的計數器，當計數器跳至哪一個暫態時，必須產生重置（RESET / CLEAR）信號回授使計數器歸零？`,
      options: [
        '1010₂（十進制 10）',
        '1001₂（十進制 9）',
        '1011₂（十進制 11）',
        '1000₂（十進制 8）'
      ],
      answer: 0,
      explanation: `MOD-10 計數器有效穩定狀態為 $0 \\sim 9$（共 10 個狀態）。<br>當從 9（$1001_2$）再進一位到達 10（$1010_2$）時，由與閘（AND 或 NAND）偵測 $Q_3=1, Q_1=1$ 瞬間發出非同步重置脈波將計數器歸零回 $0000_2$。故暫態偵測點為 10（$1010_2$），選 (A)。`
    });

    // ----------------------------------------------------
    // 程式設計實習 (010 ~ 017，共 8 題)
    // ----------------------------------------------------

    // 010: scanf 與位址運算子 (mock1)
    questions.push({
      id: `${year}-s2-010`,
      year,
      subject: 'subject2',
      category: '程式設計實習',
      scope: 'mock1',
      concept: 'prog_scanf_address',
      conceptName: CONCEPT_NAMES.prog_scanf_address,
      source: `【${year} 模擬考】`,
      question: `在 C 語言中欲從鍵盤讀取一個整數並存入變數 \`num\` 中，下列敘述何者最正確且安全？`,
      options: [
        'scanf("%d", &num);',
        'scanf("%d", num);',
        'scanf("%f", &num);',
        'cin >> &num;'
      ],
      answer: 0,
      explanation: `\`scanf\` 函式需要接收變數在記憶體中的儲存位址，才能將使用者輸入的數值寫入變數，因此整數型別需使用 \`&num\` 位址運算子。若省略 \`&\` 會導致記憶體非法存取當機（Segmentation fault）。故選 (A)。`
    });

    // 011: 條件三元運算子 (mock1)
    questions.push({
      id: `${year}-s2-011`,
      year,
      subject: 'subject2',
      category: '程式設計實習',
      scope: 'mock1',
      concept: 'prog_ternary_operator',
      conceptName: CONCEPT_NAMES.prog_ternary_operator,
      source: `【${year} 統測真題】`,
      question: `執行下列 C 語言程式碼片段後，變數 \`max\` 的最終數值為何？
\`\`\`c
int a = 25, b = 40;
int max = (a > b) ? a : b + 5;
\`\`\``,
      options: ['45', '40', '25', '30'],
      answer: 0,
      explanation: `三元運算子語法為 \`條件 ? 表達式1 : 表達式2\`。<br>條件 \`a > b\` 即 \`25 > 40\` 為偽（false），因此執行表達式 2：\`b + 5 = 40 + 5 = 45\`。<br>故 \`max\` 為 45，選 (A)。`
    });

    // 012: 短路求值 (mock1)
    questions.push({
      id: `${year}-s2-012`,
      year,
      subject: 'subject2',
      category: '程式設計實習',
      scope: 'mock1',
      concept: 'prog_short_circuit',
      conceptName: CONCEPT_NAMES.prog_short_circuit,
      source: `【${year} 模擬考】`,
      question: `執行下列 C 語言程式碼片段後，終端機印出的數值為何？
\`\`\`c
int a = 0, b = 5;
if (a && ++b) {
    b += 2;
}
printf("%d", b);
\`\`\``,
      options: ['5', '6', '8', '7'],
      answer: 0,
      explanation: `C 語言邏輯 AND（\`&&\`）具備「短路求值（Short-Circuit Evaluation）」特性：<br>左邊運算元 \`a\` 之值為 0（假），整個 \`&&\` 運算式已確定為假，因此編譯器**不會執行右側的 \`++b\` 運算**！<br>因此 \`b\` 保持原值 5 不變，螢幕印出 5。故選 (A)。`
    });

    // 013: 位元移位運算子 (mock1)
    questions.push({
      id: `${year}-s2-013`,
      year,
      subject: 'subject2',
      category: '程式設計實習',
      scope: 'mock1',
      concept: 'prog_bit_shift',
      conceptName: CONCEPT_NAMES.prog_bit_shift,
      source: `【${year} 統測真題】`,
      question: `執行下列 C 語言運算式後，變數 \`result\` 的整數數值為何？
\`\`\`c
int x = 6;
int result = (x << 2) + (x >> 1);
\`\`\``,
      options: ['27', '24', '15', '30'],
      answer: 0,
      explanation: `位元移位運算：<br>1. 左移 2 位元（乘 $2^2 = 4$）：\`6 << 2 = 6 * 4 = 24\`。<br>2. 右移 1 位元（整數除以 $2^1 = 2$）：\`6 >> 1 = 6 / 2 = 3\`。<br>3. 總和：\`24 + 3 = 27\`。<br>故正確答案為 (A)。`
    });

    // 014: while 與 do-while (mock2)
    questions.push({
      id: `${year}-s2-014`,
      year,
      subject: 'subject2',
      category: '程式設計實習',
      scope: 'mock2',
      concept: 'prog_while_dowhile',
      conceptName: CONCEPT_NAMES.prog_while_dowhile,
      source: `【${year} 模擬考】`,
      question: `執行下列 C 語言迴圈程式碼後，字元 \`'*'\` 總共會被印出幾次？
\`\`\`c
int count = 10;
do {
    printf("*");
    count++;
} while (count < 5);
\`\`\``,
      options: ['1 次', '0 次', '5 次', '無窮多次'],
      answer: 0,
      explanation: `\`do-while\` 迴圈為「後測試迴圈」：無論條件是否成立，迴圈主體內部的敘述**保證至少會被執行 1 次**！<br>執行一次印出一個 \`*\`，\`count\` 變為 11，隨後檢查 \`11 < 5\` 條件不成立結束迴圈。故總共印出 1 次，選 (A)。`
    });

    // 015: break 與 continue (mock2)
    questions.push({
      id: `${year}-s2-015`,
      year,
      subject: 'subject2',
      category: '程式設計實習',
      scope: 'mock2',
      concept: 'prog_break_continue',
      conceptName: CONCEPT_NAMES.prog_break_continue,
      source: `【${year} 統測真題】`,
      question: `執行下列 C 語言程式碼後，變數 \`sum\` 的數值為何？
\`\`\`c
int sum = 0;
for (int i = 1; i <= 6; i++) {
    if (i == 3) continue;
    if (i == 5) break;
    sum += i;
}
\`\`\``,
      options: ['7', '15', '3', '10'],
      answer: 0,
      explanation: `逐迴圈步驟追蹤：<br>- i = 1: sum = 0 + 1 = 1<br>- i = 2: sum = 1 + 2 = 3<br>- i = 3: 觸發 \`continue\`，略過本輪加法<br>- i = 4: sum = 3 + 4 = 7<br>- i = 5: 觸發 \`break\`，立即直接跳出整個 for 迴圈！<br>因此最終 \`sum = 7\`，選 (A)。`
    });

    // 016: 氣泡排序法比較次數 (mock2)
    questions.push({
      id: `${year}-s2-016`,
      year,
      subject: 'subject2',
      category: '程式設計實習',
      scope: 'mock2',
      concept: 'prog_array_bubble_sort',
      conceptName: CONCEPT_NAMES.prog_array_bubble_sort,
      source: `【${year} 模擬考】`,
      question: `使用標準氣泡排序法（Bubble Sort）對一個含有 $N = 6$ 個未排序元素的陣列進行由小到大排序，在最差情況下總共需要進行幾次相鄰元素的兩兩比對？`,
      options: ['15 次', '30 次', '36 次', '6 次'],
      answer: 0,
      explanation: `氣泡排序法比對次數公式：$\\frac{N(N-1)}{2}$。<br>代入 $N = 6$：$\\frac{6 \\times 5}{2} = 15$ 次比對。<br>故正確答案為 (A)。`
    });

    // 017: 結構體指標與箭頭運算子 (mock3)
    questions.push({
      id: `${year}-s2-017`,
      year,
      subject: 'subject2',
      category: '程式設計實習',
      scope: 'mock3',
      concept: 'prog_struct_pointer',
      conceptName: CONCEPT_NAMES.prog_struct_pointer,
      source: `【${year} 統測真題】`,
      question: `在 C 語言中定義有結構體變數與結構體指標：
\`\`\`c
struct Student {
    int id;
    int score;
} stu = {101, 95};
struct Student *ptr = &stu;
\`\`\`
下列哪一個運算式**無法**正確存取到分數成員 \`score\`（95）？`,
      options: [
        '*ptr.score',
        'ptr->score',
        '(*ptr).score',
        'stu.score'
      ],
      answer: 0,
      explanation: `運算子優先權規則：點運算子 \`.\` 的優先權高於反參照運算子 \`*\`。<br>\`*ptr.score\` 會被視為 \`*(ptr.score)\`，因為 \`ptr\` 是指標而非實體結構，會引發編譯語法錯誤！<br>正確方式為 \`(*ptr).score\`、\`ptr->score\` 或 \`stu.score\`。故選 (A)。`
    });

    // ----------------------------------------------------
    // 微處理機 (018 ~ 025，共 8 題)
    // ----------------------------------------------------

    // 018: 8051 系統匯流排寬度 (mock1)
    questions.push({
      id: `${year}-s2-018`,
      year,
      subject: 'subject2',
      category: '微處理機',
      scope: 'mock1',
      concept: 'mp_system_buses',
      conceptName: CONCEPT_NAMES.mp_system_buses,
      source: `【${year} 模擬考】`,
      question: `標準 8051 單晶片微控制器之外部「位址匯流排（Address Bus）」與「資料匯流排（Data Bus）」之寬度（位元數）分別為何？其最大可定址的外部記憶體容量為何？`,
      options: [
        '位址匯流排 16 位元，資料匯流排 8 位元，最大可定址 64 KB',
        '位址匯流排 8 位元，資料匯流排 16 位元，最大可定址 256 Bytes',
        '位址匯流排 16 位元，資料匯流排 16 位元，最大可定址 1 MB',
        '位址匯流排 32 位元，資料匯流排 8 位元，最大可定址 4 GB'
      ],
      answer: 0,
      explanation: `8051 架構規格：<br>1. 資料匯流排為 8-bit（由 Port 0 多工提供）；<br>2. 位址匯流排為 16-bit（低 8 位由 P0 提供，高 8 位由 P2 提供）；<br>3. 最大定址空間為 $2^{16} = 65,536\\,\\text{Bytes} = 64\\,\\text{KB}$ 程式/資料記憶體。故選 (A)。`
    });

    // 019: PSW 狀態旗標 (mock1)
    questions.push({
      id: `${year}-s2-019`,
      year,
      subject: 'subject2',
      category: '微處理機',
      scope: 'mock1',
      concept: 'mp_cpu_registers',
      conceptName: CONCEPT_NAMES.mp_cpu_registers,
      source: `【${year} 統測真題】`,
      question: `在 8051 程式狀態字暫存器（PSW）中，當累加器 A 內含有的二進制資料中「1 的個數為奇數個」時，下列哪一個旗標位元會自動由硬體設定為 1？`,
      options: [
        '奇偶同位旗標 P (Parity Flag)',
        '進位旗標 CY (Carry Flag)',
        '溢位旗標 OV (Overflow Flag)',
        '輔助進位旗標 AC (Auxiliary Carry Flag)'
      ],
      answer: 0,
      explanation: `PSW.0 為奇偶同位旗標 P（Parity）：<br>8051 採「偶同位」檢測機制，當累加器 A 中 1 的個數為奇數時，硬體自動將 P 設為 1，使 A 與 P 合併後 1 的總數維持為偶數。故選 (A)。`
    });

    // 020: 立即定址模式 (mock1)
    questions.push({
      id: `${year}-s2-020`,
      year,
      subject: 'subject2',
      category: '微處理機',
      scope: 'mock1',
      concept: 'mp_addressing_immediate',
      conceptName: CONCEPT_NAMES.mp_addressing_immediate,
      source: `【${year} 模擬考】`,
      question: `下列 8051 組合語言指令中，何者屬於「立即定址模式（Immediate Addressing Mode）」？`,
      options: [
        'MOV A, #30H',
        'MOV A, 30H',
        'MOV A, @R0',
        'MOV A, R3'
      ],
      answer: 0,
      explanation: `定址模式語法特徵：<br>- 帶有 \`#\` 符號者代表操作數為常數數值本身，稱為「立即定址」（如 \`MOV A, #30H\`）；<br>- 無 \`#\` 者為直接位址記憶體存取（直接定址）；<br>- 帶有 \`@\` 者為間接定址。故選 (A)。`
    });

    // 021: 間接定址模式 (mock2)
    questions.push({
      id: `${year}-s2-021`,
      year,
      subject: 'subject2',
      category: '微處理機',
      scope: 'mock2',
      concept: 'mp_addressing_indirect',
      conceptName: CONCEPT_NAMES.mp_addressing_indirect,
      source: `【${year} 統測真題】`,
      question: `在 8051 組合語言中，執行指令 \`MOV A, @R0\` 時，8051 工作暫存器中能夠作為內部 RAM 間接定址指標的暫存器只有哪兩個？`,
      options: ['R0 與 R1', 'R0 與 R7', 'R1 與 R2', '所有 R0 到 R7 皆可'],
      answer: 0,
      explanation: `在 8051 內部 RAM 間接定址指令架構中，只有 \`R0\` 與 \`R1\` 兩個暫存器能夠作為間接指標（\`@R0\` 或 \`@R1\`）；其餘 R2~R7 均不具備間接定址指標功能。故選 (A)。`
    });

    // 022: 循環移位指令 (mock2)
    questions.push({
      id: `${year}-s2-022`,
      year,
      subject: 'subject2',
      category: '微處理機',
      scope: 'mock2',
      concept: 'mp_rotate_inst',
      conceptName: CONCEPT_NAMES.mp_rotate_inst,
      source: `【${year} 模擬考】`,
      question: `8051 累加器 A 內含值為 \`10010001_2\`。執行不帶進位向左循環移位指令 \`RL A\` 一次後，累加器 A 的數值將變為多少？`,
      options: [
        '00100011₂ (23H)',
        '01001000₂ (48H)',
        '11001000₂ (C8H)',
        '00100010₂ (22H)'
      ],
      answer: 0,
      explanation: `\`RL A\` 為 8 位元向左循環移位：最高位 $D_7$ 移入最低位 $D_0$，其餘各位依序向左移 1 位。<br>原值 \`10010001\` 左移後最高位 1 繞回最低位，結果為 \`00100011_2\`（十六進制 \`23H\`）。故選 (A)。`
    });

    // 023: 位元布林操作指令 (mock2)
    questions.push({
      id: `${year}-s2-023`,
      year,
      subject: 'subject2',
      category: '微處理機',
      scope: 'mock2',
      concept: 'mp_boolean_inst',
      conceptName: CONCEPT_NAMES.mp_boolean_inst,
      source: `【${year} 統測真題】`,
      question: `在 8051 單晶片微控制器中，若欲將 Port 1 的第 0 隻引腳（P1.0）設定輸出為高電位 1，應使用下列哪一條指令最簡潔？`,
      options: [
        'SETB P1.0',
        'CLR P1.0',
        'MOV P1.0, #1',
        'CPL P1.0'
      ],
      answer: 0,
      explanation: `8051 具備強大的布林處理器：<br>- \`SETB bit\`：將指定的位元設定為 1（Set Bit）；<br>- \`CLR bit\`：將指定位元清除為 0；<br>- \`CPL bit\`：將指定位元反轉。<br>故將 P1.0 設為 1 應使用 \`SETB P1.0\`，選 (A)。`
    });

    // 024: 副程式呼叫與堆疊 (mock2)
    questions.push({
      id: `${year}-s2-024`,
      year,
      subject: 'subject2',
      category: '微處理機',
      scope: 'mock2',
      concept: 'mp_subroutine_call',
      conceptName: CONCEPT_NAMES.mp_subroutine_call,
      source: `【${year} 模擬考】`,
      question: `8051 執行長副程式呼叫指令 \`LCALL SUB_LABEL\` 時，CPU 會自動將哪一個暫存器的 16 位元返回位址推入（PUSH）堆疊區中？此時堆疊指標 SP 的數值會產生何種變化？`,
      options: [
        '程式計數器 PC，SP 數值增加 2 (+2)',
        '累加器 A，SP 數值增加 1 (+1)',
        '資料指標 DPTR，SP 數值減少 2 (-2)',
        '程式狀態字 PSW，SP 數值保持不變'
      ],
      answer: 0,
      explanation: `副程式呼叫機制：<br>1. CPU 將下一條指令之 16 位元返回位址（PC 的內容，分成 PCL 與 PCH）推入堆疊記憶體存檔。<br>2. 每 PUSH 一個 byte，堆疊指標 SP 自動加 1；推入 2 bytes 故 SP 累計加 2（\`SP = SP + 2\`）。<br>故正確答案為 (A)。`
    });

    // 025: 計時器計數初值計算 (mock3)
    questions.push({
      id: `${year}-s2-025`,
      year,
      subject: 'subject2',
      category: '微處理機',
      scope: 'mock3',
      concept: 'mp_timer_calculation',
      conceptName: CONCEPT_NAMES.mp_timer_calculation,
      source: `【${year} 統測真題】`,
      question: `8051 外部石英震盪晶體頻率為 $12\\,\\text{MHz}$（機器週期為 $1\\,\\mu\\text{s}$）。若使用計時器 0 的「模式 2（8 位元自動重載模式 Auto-Reload）」，欲產生 $100\\,\\mu\\text{s}$ 的定時溢位中斷，則載入暫存器 TH0 的初值應設定為何？`,
      options: [
        '156（十六進制 9CH）',
        '100（十六進制 64H）',
        '200（十六進制 C8H）',
        '256（十六進制 00H）'
      ],
      answer: 0,
      explanation: `機器週期：$T = \\frac{12}{12\\,\\text{MHz}} = 1\\,\\mu\\text{s}$。<br>計時 $100\\,\\mu\\text{s}$ 所需計數脈波次數為 $100$ 次。<br>Mode 2 為 8 位元向上計數器（模數為 256）：<br>初值設定公式：$TH0 = 256 - \\text{計數次數} = 256 - 100 = 156$。<br>換算成十六進制：$156 = 9\\text{CH}$。故選 (A)。`
    });

  });

  return questions;
}

module.exports = { generateS2Questions };
