import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

// 常量定义
const CONSTANTS = { STARTUP_FEE: 20, POST_PROCESS_FEE: 3 };

// 材料数据库
const materialsDB = {
  "PA12": { wRate: 0.20, vRate: 0.25, density: 1.01 },
  "PA11": { wRate: 0.40, vRate: 0.45, density: 1.04 },
  "PA6":  { wRate: 0.50, vRate: 0.55, density: 1.13 },
  "PPS":  { wRate: 0.80, vRate: 0.85, density: 1.35 },
  "PEEK": { wRate: 2.00, vRate: 2.05, density: 1.31 },
  "TPU":  { wRate: 0.30, vRate: 0.35, density: 1.20 },
  "TPA":  { wRate: 0.30, vRate: 0.35, density: 1.01 }
};

// 定义数据类型
interface PartItem {
  id: number;
  name: string;
  matKey: string;
  L: number;
  W: number;
  H: number;
  realVol: number;
  weight: number;
  qty: number;
}

interface PriceLogicResult {
  boxVolumeCm3: string;
  realVol: string;
  calcWeight: string;
  weightCost: number;
  boxCost: number;
  isVolDominant: boolean;
  unitPrice: string;
  rates: {
    wRate: number;
    vRate: number;
    density: number;
  };
}

export default function Quote() {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  
  // 状态管理
  const [currentList, setCurrentList] = useState<PartItem[]>([]);
  const [selectedMatKey, setSelectedMatKey] = useState("PA12");
  
  // 表单状态
  const [partName, setPartName] = useState('');
  const [dimL, setDimL] = useState('');
  const [dimW, setDimW] = useState('');
  const [dimH, setDimH] = useState('');
  const [realVol, setRealVol] = useState('');
  const [weight, setWeight] = useState('');
  const [qty, setQty] = useState('1');
  
  // 预览状态
  const [previewVisible, setPreviewVisible] = useState(false);
  const [prePrice, setPrePrice] = useState('$0.00');
  
  // 动画变体
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const slideIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // 页面加载时初始化
  useEffect(() => {
    initMaterialCards();
  }, []);

  // 初始化材料卡片（虚拟函数，因为我们使用React组件而不是DOM操作）
  function initMaterialCards() {
    // 在React中，我们通过状态和组件渲染来实现，不需要DOM操作
  }

  // 选择材料
  function selectMaterial(key: string) {
    setSelectedMatKey(key);
    calculatePreview();
  }

  // 核心价格计算逻辑
  function getPriceLogic(realVol: number, volL: number, volW: number, volH: number, matKey: string): PriceLogicResult {
    const rates = materialsDB[matKey] || materialsDB["PA12"];
    
    // 包围盒体积费
    const boxVolumeCm3 = (volL * volW * volH) / 1000;
    const boxCost = boxVolumeCm3 * rates.vRate;

    // 重量费
    const calcWeight = realVol * rates.density; 
    const weightCost = calcWeight * rates.wRate;
    
    const isVolDominant = boxCost > weightCost;
    const basePrice = Math.max(weightCost, boxCost);
    const unitPrice = basePrice + CONSTANTS.POST_PROCESS_FEE;

    return {
      boxVolumeCm3: boxVolumeCm3.toFixed(2),
      realVol: parseFloat(realVol).toFixed(2),
      calcWeight: calcWeight.toFixed(2),
      weightCost,
      boxCost,
      isVolDominant,
      unitPrice: unitPrice.toFixed(2),
      rates
    };
  }

  // 实时预览计算
  function calculatePreview() {
    const L = parseFloat(dimL) || 0;
    const W = parseFloat(dimW) || 0;
    const H = parseFloat(dimH) || 0;
    const vol = parseFloat(realVol) || 0;
    const qtyValue = parseInt(qty) || 1;

    if (realVol) {
      const density = materialsDB[selectedMatKey].density;
      const calcWeight = (vol * density).toFixed(2);
      setWeight(calcWeight);
    } else {
      setWeight('');
    }

    if (L && W && H && vol) {
      const logic = getPriceLogic(vol, L, W, H, selectedMatKey);
      setPreviewVisible(true);
      setPrePrice('$' + logic.unitPrice);
    } else {
      setPreviewVisible(false);
    }
  }

  // 添加零件到报价单
  function addPart() {
    const name = partName || (isEnglish ? 'Unnamed Part' : '未命名零件');
    const L = parseFloat(dimL) || 0;
    const W = parseFloat(dimW) || 0;
    const H = parseFloat(dimH) || 0;
    const vol = parseFloat(realVol) || 0;
    const quantity = parseInt(qty) || 1;

    if (!L || !W || !H || !vol) {
      toast.error(isEnglish ? "Please fill in Dimensions and Actual Volume." : "请填写尺寸和实际体积");
      return;
    }

    const density = materialsDB[selectedMatKey].density;
    const calculatedWeight = parseFloat((vol * density).toFixed(2));

    setCurrentList(prev => [...prev, {
      id: Date.now(),
      name, 
      matKey: selectedMatKey, 
      L, 
      W, 
      H, 
      realVol: vol, 
      weight: calculatedWeight, 
      qty: quantity
    }]);

    // 清空输入框
    setPartName('');
    setRealVol('');
    setWeight('');
    
    calculatePreview();
  }

  // 从报价单中移除零件
  function removePart(id: number) {
    setCurrentList(prev => prev.filter(item => item.id !== id));
  }

  // 清空当前报价单
  function clearCurrentList() {
    if(currentList.length > 0 && window.confirm(isEnglish ? "Clear all items?" : "确定清空所有项目吗？")) {
      setCurrentList([]);
    }
  }

  // 导出到CSV
  function exportToCSV() {
    if (currentList.length === 0) return;
    
    let csv = "data:text/csv;charset=utf-8,\uFEFF"; 
    csv += isEnglish 
      ? "PartName,Material,Density,Qty,ActualVol(cm3),Weight(g),BoxVol(cm3),Logic,UnitPrice($),Subtotal($)\n"
      : "零件名称,材料,密度,数量,实际体积(cm3),重量(g),包围盒体积(cm3),计费逻辑,单价($),小计($)\n";
    
    currentList.forEach(item => {
      const logic = getPriceLogic(item.realVol, item.L, item.W, item.H, item.matKey);
      const mode = logic.isVolDominant ? "Box Volume" : "Weight";
      const subtotal = (parseFloat(logic.unitPrice) * item.qty).toFixed(2);
      csv += `${item.name},${item.matKey},${logic.rates.density},${item.qty},${item.realVol},${item.weight},${logic.boxVolumeCm3},${mode},${logic.unitPrice},${subtotal}\n`;
    });
    
    csv += `\n,,,Startup Fee,,,,,,$${CONSTANTS.STARTUP_FEE}\n`;
    
    const partsTotal = calculatePartsTotal();
    const grandTotal = partsTotal + CONSTANTS.STARTUP_FEE;
    
    csv += `\n,,,GRAND TOTAL,,,,,,$${grandTotal.toFixed(2)}\n`;
    
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `Quote_${new Date().toISOString().slice(0,10)}.csv`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(isEnglish ? "Quote exported successfully!" : "报价单导出成功！");
  }

  // 计算零件总价
  function calculatePartsTotal(): number {
    return currentList.reduce((total, item) => {
      const logic = getPriceLogic(item.realVol, item.L, item.W, item.H, item.matKey);
      return total + parseFloat(logic.unitPrice) * item.qty;
    }, 0);
  }

  // 计算总计
  function calculateGrandTotal(): { partsTotal: string; startupTotal: string; grandTotal: string } {
    const partsTotal = calculatePartsTotal();
    const startupFee = currentList.length > 0 ? CONSTANTS.STARTUP_FEE : 0;
    const grandTotal = partsTotal + startupFee;
    
    return {
      partsTotal: '$' + partsTotal.toFixed(2),
      startupTotal: '$' + startupFee.toFixed(2),
      grandTotal: '$' + grandTotal.toFixed(2)
    };
  }

  // 强制计算总计
  const { partsTotal, startupTotal, grandTotal } = calculateGrandTotal();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {isEnglish ? '3D Printing Intelligent Quotation System' : '3D打印智能报价系统'}
              </h1>
              <p className="text-xl text-gray-300">
                {isEnglish 
                  ? 'Quickly calculate the cost of your SLS 3D printing project' 
                  : '快速计算您的SLS 3D打印项目成本，获取精准报价'}
              </p>
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-7xl mx-auto"
            >
              <div className="space-y-6">
                {/* Add Model Section */}
                <motion.div 
                  variants={slideIn}
                  className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-600"
                >
                  <div className="flex justify-between items-center mb-5 border-b pb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      <h2 className="text-xl font-bold text-gray-800">{isEnglish ? 'Add Model' : '添加模型'}</h2>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-sm text-indigo-800">
                      {isEnglish ? 'Startup Fee: ' : '开机费: '}<span className="font-bold">$20 / Order</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Material Selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{isEnglish ? 'Select Material' : '选择材料'}</label>
                      <div id="materialGrid" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {Object.entries(materialsDB).map(([key, val]) => (
                          <div
                            key={key}
                            id={`mat-card-${key}`}
                            className={`cursor-pointer border rounded-md p-2 transition-all duration-200 bg-white hover:border-indigo-400 flex flex-col items-center justify-center text-center h-28 relative ${selectedMatKey === key ? 'mat-card-selected' : ''}`}
                            onClick={() => selectMaterial(key)}
                          >
                            <div className="font-bold text-base text-gray-800 mat-name mb-1">{key}</div>
                            <div className="text-[10px] text-gray-400 leading-tight space-y-0.5">
                              <div>${val.wRate}/g</div>
                              <div>${val.vRate}/cm³</div>
                            </div>
                            <div className="mt-1.5 bg-gray-100 text-[9px] text-gray-500 px-1.5 py-0.5 rounded">
                              ρ: {val.density}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Model Details Input */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        
                        <div className="md:col-span-3">
                          <label className="block text-xs font-bold text-gray-500 mb-1">{isEnglish ? 'Part Name' : '零件名称'}</label>
                          <input 
                            type="text" 
                            id="partName" 
                            placeholder={isEnglish ? "e.g. Housing" : "例如：外壳"} 
                            className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-indigo-500 transition"
                            value={partName}
                            onChange={(e) => setPartName(e.target.value)}
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-xs font-bold text-gray-400 mb-1">{isEnglish ? 'Bounding Box (L / W / H mm)' : '包围盒尺寸 (长/宽/高 mm)'}</label>
                          <div className="grid grid-cols-3 gap-1">
                            <input 
                              type="number" 
                              id="dimL" 
                              placeholder="L" 
                              className="w-full border border-gray-300 p-2.5 rounded" 
                              value={dimL}
                              onChange={(e) => {
                                setDimL(e.target.value);
                                calculatePreview();
                              }}
                            />
                            <input 
                              type="number" 
                              id="dimW" 
                              placeholder="W" 
                              className="w-full border border-gray-300 p-2.5 rounded" 
                              value={dimW}
                              onChange={(e) => {
                                setDimW(e.target.value);
                                calculatePreview();
                              }}
                            />
                            <input 
                              type="number" 
                              id="dimH" 
                              placeholder="H" 
                              className="w-full border border-gray-300 p-2.5 rounded" 
                              value={dimH}
                              onChange={(e) => {
                                setDimH(e.target.value);
                                calculatePreview();
                              }}
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-blue-600 mb-1">{isEnglish ? 'Model Actual Vol (cm³)' : '模型实际体积 (cm³)'}</label>
                          <input 
                            type="number" 
                            id="realVol" 
                            placeholder={isEnglish ? "From CAD" : "从CAD获取"} 
                            className="w-full border border-blue-300 p-2.5 rounded font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 bg-white" 
                            value={realVol}
                            onChange={(e) => {
                              setRealVol(e.target.value);
                              calculatePreview();
                            }}
                          />
                        </div>

                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-gray-400 mb-1">{isEnglish ? 'Weight (g)' : '重量 (g)'}</label>
                          <input 
                            type="number" 
                            id="weight" 
                            placeholder={isEnglish ? "Auto" : "自动"} 
                            readOnly 
                            className="w-full border border-gray-200 p-2.5 rounded font-bold text-gray-500" 
                            value={weight}
                          />
                        </div>

                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-gray-500 mb-1">{isEnglish ? 'Qty' : '数量'}</label>
                          <input 
                            type="number" 
                            id="qty" 
                            value={qty} 
                            className="w-full border border-gray-300 p-2.5 rounded" 
                            onChange={(e) => {
                              setQty(e.target.value);
                              calculatePreview();
                            }}
                          />
                        </div>

                        <div className="md:col-span-2 flex gap-2">
                          <div id="previewBox" className={`${previewVisible ? '' : 'hidden'} flex-grow bg-white border border-indigo-200 rounded px-2 py-1 flex flex-col justify-center text-right shadow-sm`}>
                            <div className="text-[10px] text-gray-400 uppercase">{isEnglish ? 'Est. Unit Price' : '预估单价'}</div>
                            <div className="font-bold text-indigo-600 leading-none" id="prePrice">{prePrice}</div>
                          </div>
                          
                          <button 
                            onClick={addPart}
                            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 px-4 rounded shadow transition duration-200 flex items-center justify-center"
                          >
                            {isEnglish ? 'ADD' : '添加'}
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 text-[10px] text-gray-400 flex gap-4">
                        <span>* {isEnglish ? 'Weight = Actual Vol × Density' : '重量 = 实际体积 × 密度'}</span>
                        <span>* {isEnglish ? 'Bounding Box Volume is calculated from L × W × H' : '包围盒体积 = 长 × 宽 × 高'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Quote Details Section */}
                <motion.div 
                  variants={slideIn}
                  className="bg-white p-6 rounded-lg shadow-md h-auto min-h-[400px] flex flex-col"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      <h2 className="text-xl font-bold text-gray-800">{isEnglish ? 'Quote Details' : '报价详情'}</h2>
                      <span className="ml-2 bg-orange-100 text-orange-700 border border-orange-200 px-2 py-1 rounded text-xs font-semibold tracking-wide" title={isEnglish ? "Pricing is based on the greater of Material Cost or Volume Cost" : "价格基于材料成本或体积成本的较大值"}>
                        ⚡ {isEnglish ? 'The Maximum Value Principle' : '最大值原则'}
                      </span>
                    </div>
                    <div className="space-x-3">
                      <span id="itemCountBadge" className="bg-gray-100 text-gray-500 text-xs px-3 py-1.5 rounded-full font-medium">
                        {currentList.length} {isEnglish ? 'items' : '个项目'}
                      </span>
                      <button 
                        onClick={clearCurrentList}
                        className="text-gray-400 hover:text-red-500 text-sm underline transition"
                      >
                        {isEnglish ? 'Clear List' : '清空列表'}
                      </button>
                      <button 
                        onClick={exportToCSV}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded font-medium shadow transition"
                      >
                        {isEnglish ? 'Download Excel' : '导出Excel'}
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto flex-grow rounded-lg border border-gray-100 mb-6">
                    <table className="min-w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-xs tracking-wider">
                        <tr>
                          <th className="px-6 py-4">{isEnglish ? 'Part Name' : '零件名称'}</th>
                          <th className="px-6 py-4">{isEnglish ? 'Material' : '材料'}</th>
                          <th className="px-6 py-4 text-right">{isEnglish ? 'Dims / Vol' : '尺寸/体积'}</th>
                          <th className="px-6 py-4 text-right">{isEnglish ? 'Calc. Weight' : '计算重量'}</th>
                          <th className="px-6 py-4 text-center">{isEnglish ? 'Logic' : '逻辑'}</th>
                          <th className="px-6 py-4 text-right">{isEnglish ? 'Unit Price' : '单价'}</th>
                          <th className="px-6 py-4 text-right">{isEnglish ? 'Subtotal' : '小计'}</th>
                          <th className="px-6 py-4 text-center">{isEnglish ? 'Action' : '操作'}</th>
                        </tr>
                      </thead>
                      <tbody id="orderTableBody" className="divide-y divide-gray-100 bg-white">
                        {currentList.length > 0 ? (
                          currentList.map(item => {
                            const logic = getPriceLogic(item.realVol, item.L, item.W, item.H, item.matKey);
                            const subtotal = (parseFloat(logic.unitPrice) * item.qty).toFixed(2);
                            
                            const badgeClass = logic.isVolDominant ? 'highlight-vol' : 'highlight-wt';
                            const badgeText = logic.isVolDominant ? 'BOX VOL' : 'WEIGHT';
                            
                            return (
                              <tr key={item.id} className="hover:bg-gray-50 transition group border-b border-gray-50 last:border-0">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                  {item.name}
                                  <div className="text-xs text-gray-400">{isEnglish ? 'Qty: ' : '数量: '}{item.qty}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold">{item.matKey}</span>
                                  <div className="text-[10px] text-gray-400 mt-0.5">ρ: {logic.rates.density}</div>
                                </td>
                                <td className="px-6 py-4 text-right text-xs text-gray-500 font-mono">
                                  <div>{isEnglish ? 'Box: ' : '包围盒: '}{logic.boxVolumeCm3} cm³</div>
                                  <div className="text-blue-600 font-bold">{isEnglish ? 'Act: ' : '实际: '}{item.realVol} cm³</div>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-gray-700 font-bold">
                                  {item.weight} g
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>{badgeText}</span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-gray-600">${logic.unitPrice}</td>
                                <td className="px-6 py-4 text-right font-bold text-gray-800">${subtotal}</td>
                                <td className="px-6 py-4 text-center">
                                  <button 
                                    onClick={() => removePart(item.id)}
                                    className="text-gray-300 hover:text-red-500 font-bold transition px-2"
                                  >
                                    ×
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={8} className="px-6 py-16 text-center text-gray-400">
                              <p className="text-lg">{isEnglish ? 'No parts added yet.' : '暂无添加的零件'}</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div id="emptyState" className={`${currentList.length > 0 ? 'hidden' : ''} text-center py-16 text-gray-400 bg-gray-50/50`}>
                      <p className="text-lg">{isEnglish ? 'No parts added yet.' : '暂无添加的零件'}</p>
                    </div>
                  </div>

                  <div className="flex justify-end items-center gap-12 pb-8 border-b border-gray-200">
                    <div className="text-right">
                      <div className="text-xs text-gray-400 uppercase tracking-wide">{isEnglish ? 'Parts Cost' : '零件成本'}</div>
                      <div className="font-medium text-gray-700" id="partsTotal">{partsTotal}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 uppercase tracking-wide">{isEnglish ? 'Startup Fee' : '开机费'}</div>
                      <div className="font-medium text-gray-700" id="startupTotal">{startupTotal}</div>
                    </div>
                    <div className="text-right pl-12 border-l">
                      <div className="text-xs text-indigo-500 uppercase tracking-wide font-bold">{isEnglish ? 'Grand Total' : '总计'}</div>
                      <div className="text-4xl font-bold text-gray-900 leading-none mt-1" id="grandTotal">{grandTotal}</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-slate-50 border border-slate-200 rounded p-5 text-sm text-gray-600">
                    <h3 className="font-bold text-gray-800 mb-3 uppercase text-xs tracking-wider flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                      {isEnglish ? 'Shipping Information' : '运输信息'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="font-semibold text-gray-800">DHL/UPS Express Delivery</div>
                        <div className="text-xs mt-1 text-gray-500">
                          {isEnglish ? 'Calculated at official rates, delivery in 3-5 business days.' : '按官方价格计算，3-5个工作日送达。'}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{isEnglish ? 'Standard Delivery' : '标准配送'}</div>
                        <div className="text-xs mt-1 text-gray-500">
                          {isEnglish ? 'Save 50% or more on shipping costs, delivery in 5-7 business days.' : '节省50%或更多运费，5-7个工作日送达。'}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-[11px] text-gray-400 italic pt-3 border-t border-slate-200">
                      * {isEnglish ? 'Actual shipping costs will be calculated based on package weight, volume and destination.' : '实际运费将根据包裹重量、体积和目的地计算。'}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
     </div>
  );
}