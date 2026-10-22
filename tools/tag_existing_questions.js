const { CONCEPT_NAMES } = require('./concept_dict.js');

function assignConceptToExisting(q) {
  const text = (q.category + ' ' + q.question + ' ' + (q.explanation || '')).toLowerCase();
  let c = 'unknown';

  // 基本電學
  if (q.category === '基本電學') {
    if (/重疊定理/.test(text)) c = 'ee_superposition';
    else if (/戴維寧/.test(text)) c = 'ee_thevenin';
    else if (/諾頓/.test(text)) c = 'ee_norton';
    else if (/最大功率/.test(text)) c = 'ee_max_power';
    else if (/惠斯登|電橋/.test(text)) c = 'ee_resistor_bridge';
    else if (/節點電壓/.test(text)) c = 'ee_node_voltage';
    else if (/迴路電流|網目/.test(text)) c = 'ee_mesh_current';
    else if (/Δ-y|y-Δ|delta/.test(text)) c = 'ee_delta_wye';
    else if (/色碼|色環/.test(text)) c = 'ee_resistor_color_code';
    else if (/溫度係數/.test(text)) c = 'ee_resistor_temperature';
    else if (/串聯諧振/.test(text)) c = 'ee_ac_series_resonance';
    else if (/並聯諧振/.test(text)) c = 'ee_ac_parallel_resonance';
    else if (/三相|兩瓦特/.test(text)) c = 'ee_three_phase_power';
    else if (/時間常數|暫態|充放電/.test(text)) c = 'ee_rc_transient';
    else if (/庫侖|點電荷/.test(text)) c = 'ee_coulomb_law';
    else if (/庫侖|電荷/.test(text) && /電流/.test(text)) c = 'ee_charge_current';
    else if (/平行板|電容|介電|ε/.test(text)) c = 'ee_capacitor_geometry';
    else if (/螺線管|自感|互感|電感|匝數|導磁/.test(text)) c = 'ee_inductor_geometry';
    else if (/法拉第|楞次|感應電動勢/.test(text)) c = 'ee_electromagnetic_law';
    else if (/功率因數|視在功率|虛功率|實功率/.test(text)) c = 'ee_ac_power_factor';
    else if (/阻抗|感抗|容抗|rlc|串聯電路接於/.test(text)) c = 'ee_rlc_impedance';
    else if (/正弦|交流電壓方程式|交流電流|有效值|波形/.test(text)) c = 'ee_ac_waveform';
    else if (/分壓|串聯/.test(text)) c = 'ee_resistor_series';
    else if (/並聯|分流/.test(text)) c = 'ee_resistor_parallel';
    else if (/長度|對折|剪去|截面積|電阻線/.test(text)) c = 'ee_wire_resistance';
    else if (/電功率|消耗電功率|電熱器|焦耳|電能/.test(text)) c = 'ee_power_energy';
    else if (/歐姆|克希荷夫|kcl|kvl/.test(text)) c = 'ee_kcl_kvl';
    else c = 'ee_power_energy';
  }

  // 電子學
  else if (q.category === '電子學') {
    if (/非反相/.test(text)) c = 'el_opa_non_inverting';
    else if (/反相加法/.test(text)) c = 'el_opa_summing';
    else if (/差動|減法/.test(text)) c = 'el_opa_difference';
    else if (/反相/.test(text) && /放大|opa|運算/.test(text)) c = 'el_opa_inverting';
    else if (/電壓隨耦|緩衝/.test(text)) c = 'el_opa_voltage_follower';
    else if (/史密特|遲滯|比較器/.test(text)) c = 'el_opa_schmitt';
    else if (/齊納|穩壓/.test(text)) c = 'el_diode_zener';
    else if (/截波/.test(text)) c = 'el_clipper_circuit';
    else if (/箝位/.test(text)) c = 'el_clamper_circuit';
    else if (/倍壓/.test(text)) c = 'el_voltage_multiplier';
    else if (/變壓器/.test(text)) c = 'el_transformer_impedance';
    else if (/分貝|db|多級/.test(text)) c = 'el_multistage_db';
    else if (/整流|漣波|二極體/.test(text)) c = 'el_rectifier_half_full';
    else if (/fet|mosfet|jfet|夾止|蕭克萊/.test(text)) c = 'el_fet_characteristic';
    else if (/濾波|截止頻率|bode|波德/.test(text)) c = 'el_filter_frequency_response';
    else if (/振盪|韋恩|相移/.test(text)) c = 'el_oscillator_circuit';
    else if (/ce|共射極/.test(text)) c = 'el_bjt_ac_ce';
    else if (/cb|共基極|cc|共集極/.test(text)) c = 'el_bjt_ac_cb_cc';
    else if (/偏壓|工作點|負載線|飽和|截止區|主動區|q點/.test(text)) c = 'el_bjt_dc_load_line';
    else if (/bjt|電晶體|電流放大率|β|alpha/.test(text)) c = 'el_bjt_characteristic';
    else if (/半導體|pn|載子|電洞/.test(text)) c = 'el_semiconductor_basics';
    else if (/opa|運算放大器/.test(text)) c = 'el_opa_ideal_characteristics';
    else c = 'el_bjt_characteristic';
  }

  // 數位邏輯設計
  else if (q.category === '數位邏輯設計') {
    if (/卡諾圖/.test(text)) c = 'dl_karnaugh_4var';
    else if (/狄摩根|第摩根/.test(text)) c = 'dl_demorgan_laws';
    else if (/布林|化簡/.test(text)) c = 'dl_boolean_simplification';
    else if (/隨意項|無關項|don't/.test(text)) c = 'dl_karnaugh_dont_care';
    else if (/七段/.test(text)) c = 'dl_seven_segment';
    else if (/jk|正反器|d型|t型|rs|正反器之/.test(text)) c = 'dl_jk_flipflop';
    else if (/漣波計數器|非同步計數器/.test(text)) c = 'dl_asynchronous_counter';
    else if (/同步計數器/.test(text)) c = 'dl_synchronous_counter';
    else if (/模數|計數器/.test(text)) c = 'dl_modulus_counter';
    else if (/移位暫存器|siso|sipo|piso|pipo/.test(text)) c = 'dl_shift_register';
    else if (/環形|強森|扭環/.test(text)) c = 'dl_ring_johnson_counter';
    else if (/全加器|半加器|加法器|減法器/.test(text)) c = 'dl_adder_subtractor';
    else if (/編碼器/.test(text)) c = 'dl_encoder';
    else if (/解碼器|74ls138|74138/.test(text)) c = 'dl_decoder';
    else if (/多工器|74151/.test(text)) c = 'dl_multiplexer';
    else if (/格雷碼|gray/.test(text)) c = 'dl_code_converters';
    else if (/補數|2's|1's/.test(text)) c = 'dl_complements';
    else if (/進制|轉換|十六進制/.test(text)) c = 'dl_number_conversion';
    else if (/xor|互斥或/.test(text)) c = 'dl_xor_xnor';
    else if (/萬用邏輯閘|universal/.test(text)) c = 'dl_universal_gates';
    else if (/邏輯閘|及閘|或閘|反閘/.test(text)) c = 'dl_logic_gates_truth';
    else c = 'dl_logic_gates_truth';
  }

  // 微處理機
  else if (q.category === '微處理機') {
    if (/步進馬達/.test(text)) c = 'mp_stepper_motor';
    else if (/adc|類比數位|解析度/.test(text)) c = 'mp_adc_resolution';
    else if (/中斷向量|0003h|000bh|0013h|001bh|0023h/.test(text)) c = 'mp_interrupt_vectors';
    else if (/中斷|ie|ip/.test(text)) c = 'mp_interrupt_registers';
    else if (/tmod|模式 2|mode 2|自動重載/.test(text)) c = 'mp_timer_modes';
    else if (/tcon|計時器|定時器|計時/.test(text)) c = 'mp_timer_tcon';
    else if (/鮑率|串列|scon|uart|max232/.test(text)) c = 'mp_serial_modes';
    else if (/mul|div|乘法|除法/.test(text)) c = 'mp_mul_div_inst';
    else if (/定址模式|@r0|@a\+dptr/.test(text)) c = 'mp_addressing_indexed';
    else if (/dptr|movx|movc/.test(text)) c = 'mp_data_transfer_inst';
    else if (/指令|add|subb|cjne|djnz/.test(text)) c = 'mp_branch_conditional';
    else if (/psen|ale|ea|8051|腳位|接腳/.test(text)) c = 'mp_8051_pins';
    else if (/ram|暫存器 bank|128 byte|sfr/.test(text)) c = 'mp_8051_ram_mapping';
    else if (/匯流排|bus|位址匯流排|資料匯流排/.test(text)) c = 'mp_system_buses';
    else if (/cpu|pc|sp|微電腦/.test(text)) c = 'mp_cpu_registers';
    else c = 'mp_8051_pins';
  }

  // 程式設計實習
  else if (q.category === '程式設計實習') {
    if (/strlen|strcpy|strcat|strcmp|string\.h/.test(text)) c = 'prog_string_functions';
    else if (/空字元|'0'|'\\0'|字串/.test(text)) c = 'prog_string_null_terminator';
    else if (/指標|\*p|&/.test(text)) c = 'prog_pointer_basics';
    else if (/遞迴|recursion|factorial|fibonacci/.test(text)) c = 'prog_recursion_factorial';
    else if (/switch|case/.test(text)) c = 'prog_switch_case';
    else if (/for|while|迴圈/.test(text)) c = 'prog_for_loop';
    else if (/二維陣列|一維陣列|陣列/.test(text)) c = 'prog_array_1d';
    else if (/位元運算|>>|<<|\^|&|~/.test(text)) c = 'prog_bitwise_operators';
    else if (/結構體|struct|typedef/.test(text)) c = 'prog_struct_basics';
    else if (/printf|format|%05d|%d|%f/.test(text)) c = 'prog_printf_format';
    else if (/scanf/.test(text)) c = 'prog_scanf_address';
    else if (/三元運算|條件運算/.test(text)) c = 'prog_ternary_operator';
    else if (/短路|邏輯運算/.test(text)) c = 'prog_short_circuit';
    else if (/前置|後置|\+\+|--/.test(text)) c = 'prog_increment_decrement';
    else if (/函式|function|call by/.test(text)) c = 'prog_function_basics';
    else if (/\//.test(text) && /%/.test(text)) c = 'prog_arithmetic_ops';
    else if (/if\s*\(/.test(text)) c = 'prog_if_else';
    else c = 'prog_for_loop';
  }

  q.concept = c;
  q.conceptName = CONCEPT_NAMES[c] || c;
  return q;
}

module.exports = { assignConceptToExisting };
