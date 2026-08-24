import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Sun, 
  FileText, 
  Share2, 
  CheckCircle2,
  Calendar,
  Layers,
  Cpu,
  PiggyBank
} from 'lucide-react';
import { Language, SolarCalculationResults, SolarCalculationInputs } from '../types';
import { formatNumber, formatPhp } from '../utils/solarCalculations';

interface ExportSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  results: SolarCalculationResults;
  inputs: SolarCalculationInputs;
}

export const ExportSummaryModal: React.FC<ExportSummaryModalProps> = ({
  isOpen,
  onClose,
  lang,
  results,
  inputs,
}) => {
  if (!isOpen) return null;

  const isTl = lang === 'tl';
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date().toLocaleDateString(isTl ? 'fil-PH' : 'en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getProposalText = () => {
    if (isTl) {
      return `☀️ SOLAR PV SIZING & KURYENTE PROPOSAL SUMMARY ☀️
Petsa: ${formattedDate}

1. MGA DATOS NG KONSUMO (MERALCO / BILL)
• Buwanang Konsumo: ${formatNumber(results.monthlyKwh, 0)} kWh / buwan
• Araw-araw na Konsumo: ${formatNumber(results.dailyKwh, 2)} kWh / araw
• Kasalukuyang Buwanang Bill: ${formatPhp(results.currentMonthlyBillPhp)} / buwan
• Presyo ng Kuryente: ₱${inputs.electricityRatePhp.toFixed(2)} / kWh
• Peak Sun Hours (PSH): ${inputs.psh} hrs/day
• System Loss Derating: ${inputs.systemLossPercent}% (80% Efficiency)

2. REKOMENDADONG SOLAR SYSTEM DESIGN
• Base PV Capacity: ${formatNumber(results.basePvKw, 3)} kW
• Rekomendadong PV Size: ${formatNumber(results.recommendedPvKw, 2)} kWp
• Aktwal na Ikakabit na PV: ${formatNumber(results.actualInstalledPvKw, 2)} kWp
• Bilang ng Solar Panels: ${results.numberOfPanels} piraso × ${inputs.panelWattage}W Mono
• Rekomendadong Inverter (Swak/Malakas): ${results.recommendedInverterKw} kW String Inverter
• Saktuhan / Budget Inverter: ${results.minimumInverterKw} kW String Inverter
• Tinatayang Sukat sa Bubong: ${formatNumber(results.roofAreaSqMeters, 1)} m² (${formatNumber(results.roofAreaSqFeet, 0)} sq ft)

3. MATITIPID AT ROI (FINANCIAL ANALYSIS)
• Buwanang Tipid: ${formatPhp(results.monthlySavingsPhp)} / buwan
• Taunang Tipid: ${formatPhp(results.annualSavingsPhp)} / taon
• Tinatayang Halaga ng Sistema: ${formatPhp(results.estimatedSystemCostPhp)} (Turnkey)
• Payback Period (ROI): ~${formatNumber(results.paybackPeriodYears, 1)} Taon
• 25-Taong Kabuuang Tipid: ${formatPhp(results.twentyFiveYearSavingsPhp)}

Kinalkula gamit ang Solar PV & Kuryente Calculator (Pilipinas)`;
    } else {
      return `☀️ SOLAR PV SIZING & ELECTRICITY PROPOSAL SUMMARY ☀️
Date: ${formattedDate}

1. CONSUMPTION & BASELINE DATA
• Monthly Consumption: ${formatNumber(results.monthlyKwh, 0)} kWh / month
• Daily Consumption: ${formatNumber(results.dailyKwh, 2)} kWh / day
• Current Monthly Bill: ${formatPhp(results.currentMonthlyBillPhp)} / month
• Tariff Rate: ₱${inputs.electricityRatePhp.toFixed(2)} / kWh
• Peak Sun Hours (PSH): ${inputs.psh} hrs/day
• System Loss Factor: ${inputs.systemLossPercent}% (80% Efficiency)

2. RECOMMENDED SYSTEM SPECIFICATION
• Base PV Capacity: ${formatNumber(results.basePvKw, 3)} kW
• Recommended PV Size: ${formatNumber(results.recommendedPvKw, 2)} kWp
• Actual Installed PV: ${formatNumber(results.actualInstalledPvKw, 2)} kWp
• Solar Panels: ${results.numberOfPanels} pcs × ${inputs.panelWattage}W Tier-1 Mono
• Recommended Inverter: ${results.recommendedInverterKw} kW Inverter (Optimal Headroom)
• Budget Inverter Fit: ${results.minimumInverterKw} kW Inverter
• Roof Space Required: ${formatNumber(results.roofAreaSqMeters, 1)} m² (${formatNumber(results.roofAreaSqFeet, 0)} sq ft)

3. FINANCIAL RETURN & SAVINGS
• Monthly Savings: ${formatPhp(results.monthlySavingsPhp)} / month
• Annual Savings: ${formatPhp(results.annualSavingsPhp)} / year
• Estimated System Cost: ${formatPhp(results.estimatedSystemCostPhp)} (Turnkey)
• Payback Period: ~${formatNumber(results.paybackPeriodYears, 1)} Years
• 25-Year Cumulative Savings: ${formatPhp(results.twentyFiveYearSavingsPhp)}

Generated via Solar PV & Kuryente Calculator (Philippines)`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getProposalText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="export-summary-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isTl ? 'I-export o I-print ang Solar Proposal' : 'Export or Print Solar Proposal'}
              </h2>
              <p className="text-xs text-slate-400">
                {isTl
                  ? 'I-print o kopyahin ang detalye upang maipadala sa inyong Solar Installer / Kliyente'
                  : 'Print or copy spec breakdown for your solar installer or quotation'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Preview */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 scrollbar-thin print:p-0">
          
          {/* Paper Sheet Preview */}
          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
            {getProposalText()}
          </div>

          {/* Quick info note */}
          <div className="flex items-center gap-2 text-xs text-slate-400 px-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {isTl
                ? 'Handa nang i-paste sa Messenger, Viber, o i-print bilang PDF file.'
                : 'Ready to paste into Messenger, Viber, or print directly as PDF.'}
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            {isTl ? 'Isara' : 'Close'}
          </button>

          <div className="flex items-center gap-2">
            {/* Copy Button */}
            <button
              id="btn-copy-proposal-text"
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">{isTl ? 'Na-kopya na!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isTl ? 'Kopyahin ang Teksto' : 'Copy Text'}</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              id="btn-print-proposal"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isTl ? 'I-print / PDF' : 'Print / PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
