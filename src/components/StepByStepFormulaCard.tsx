import React from 'react';
import { 
  FileSpreadsheet, 
  Calendar, 
  SunMedium, 
  ShieldAlert, 
  Cpu, 
  ArrowRight, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { Language, SolarCalculationResults } from '../types';
import { formatNumber } from '../utils/solarCalculations';

interface StepByStepFormulaCardProps {
  lang: Language;
  results: SolarCalculationResults;
  days: number;
  psh: number;
  systemLossPercent: number;
}

export const StepByStepFormulaCard: React.FC<StepByStepFormulaCardProps> = ({
  lang,
  results,
  days,
  psh,
  systemLossPercent,
}) => {
  const isTl = lang === 'tl';
  const efficiencyPercent = 100 - systemLossPercent;

  return (
    <div id="step-by-step-formula-card" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTl ? 'Eksaktong Formula & Hakbang-hakbang' : 'Exact Step-by-Step Formula'}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {isTl ? 'Paano Kinalkula ang Sukat ng Inyong Solar System?' : 'How Your Solar System Size Is Calculated?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {isTl
              ? 'Mula sa inyong Meralco / Electric Bill (kWh) patungo sa Inverter at Solar PV Capacity'
              : 'From your monthly electricity bill (kWh) to recommended Inverter & PV capacity'}
          </p>
        </div>
      </div>

      {/* Steps Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 relative">
        
        {/* STEP 1: Monthly Consumption */}
        <div id="step-1-card" className="bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 rounded-xl p-4 flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                {isTl ? 'HAKBANG 1' : 'STEP 1'}
              </span>
              <span className="text-[11px] bg-slate-700/80 px-2 py-0.5 rounded text-slate-300">Bill</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1">
              {isTl ? 'Buwanang Konsumo' : 'Monthly Consumption'}
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              {isTl ? 'Makikita sa inyong electric bill kada buwan' : 'From your monthly electrical billing'}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-700/60">
            <div className="text-2xl font-extrabold text-white font-mono flex items-baseline gap-1">
              <span>{formatNumber(results.monthlyKwh, 0)}</span>
              <span className="text-xs font-normal text-slate-400">kWh/buwan</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {isTl ? 'Kabuuang nagamit' : 'Total power used'}
            </div>
          </div>
        </div>

        {/* STEP 2: Daily Consumption */}
        <div id="step-2-card" className="bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 rounded-xl p-4 flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-bold text-sky-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {isTl ? 'HAKBANG 2' : 'STEP 2'}
              </span>
              <span className="text-[11px] bg-sky-950/80 border border-sky-800 text-sky-300 px-1.5 py-0.5 rounded">÷ {days} araw</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1">
              {isTl ? 'Konsumo bawat Araw' : 'Daily Consumption'}
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              <code className="text-slate-300 font-mono text-[11px] bg-slate-900/80 px-1.5 py-0.5 rounded">
                {formatNumber(results.monthlyKwh, 0)} ÷ {days}
              </code>
            </p>
          </div>

          <div className="pt-2 border-t border-slate-700/60">
            <div className="text-2xl font-extrabold text-sky-400 font-mono flex items-baseline gap-1">
              <span>{formatNumber(results.dailyKwh, 2)}</span>
              <span className="text-xs font-normal text-slate-400">kWh/araw</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {isTl ? 'Araw-araw na pangangailangan' : 'Daily energy needed'}
            </div>
          </div>
        </div>

        {/* STEP 3: Peak Sun Hours (PSH) */}
        <div id="step-3-card" className="bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 rounded-xl p-4 flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <SunMedium className="w-3.5 h-3.5" />
                {isTl ? 'HAKBANG 3' : 'STEP 3'}
              </span>
              <span className="text-[11px] bg-amber-950/80 border border-amber-800 text-amber-300 px-1.5 py-0.5 rounded">÷ {psh} PSH</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1">
              {isTl ? 'Peak Sun Hours (PSH)' : 'Peak Sun Hours (PSH)'}
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              {isTl ? 'Kalakasan ng araw sa Pilipinas (hrs)' : 'Solar intensity in the Philippines'}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-700/60">
            <div className="text-2xl font-extrabold text-amber-400 font-mono flex items-baseline gap-1">
              <span>{formatNumber(results.basePvKw, 3)}</span>
              <span className="text-xs font-normal text-slate-400">kWp (Base)</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              <code className="text-[10px] text-slate-300 font-mono">
                {formatNumber(results.dailyKwh, 2)} ÷ {psh} PSH
              </code>
            </div>
          </div>
        </div>

        {/* STEP 4: System Loss (20%) */}
        <div id="step-4-card" className="bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 rounded-xl p-4 flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                {isTl ? 'HAKBANG 4' : 'STEP 4'}
              </span>
              <span className="text-[11px] bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-1.5 py-0.5 rounded">÷ {efficiencyPercent}%</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1">
              {isTl ? 'Isama ang System Loss' : 'Account for System Loss'}
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              {isTl ? `${systemLossPercent}% loss dahil sa init, kable, dumi` : `${systemLossPercent}% losses for heat & cables`}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-700/60">
            <div className="text-2xl font-extrabold text-emerald-400 font-mono flex items-baseline gap-1">
              <span>{formatNumber(results.recommendedPvKw, 2)}</span>
              <span className="text-xs font-normal text-slate-400">kWp</span>
            </div>
            <div className="text-[11px] text-emerald-300/90 font-medium mt-1">
              {isTl ? 'Rekomendadong PV Size' : 'Recommended PV Size'}
            </div>
          </div>
        </div>

        {/* STEP 5: Inverter Recommendation */}
        <div id="step-5-card" className="bg-gradient-to-b from-amber-500/10 to-slate-800/90 border-2 border-amber-500/40 rounded-xl p-4 flex flex-col justify-between shadow-lg shadow-amber-500/5">
          <div>
            <div className="flex items-center justify-between text-xs text-amber-300 mb-2">
              <span className="font-bold flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" />
                {isTl ? 'HAKBANG 5' : 'STEP 5'}
              </span>
              <span className="text-[11px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded">Inverter</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              {isTl ? 'Sukat ng Inverter' : 'Inverter Sizing'}
            </h3>
            <p className="text-xs text-slate-300 mb-3">
              {isTl ? 'Piliin ang naaayon sa badyet at plano' : 'Choose optimal vs budget fit'}
            </p>
          </div>

          <div className="pt-2 border-t border-amber-500/30 space-y-2">
            {/* Recommended 6kW option */}
            <div className="bg-slate-900/90 p-2 rounded-lg border border-amber-500/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                  {results.recommendedInverterKw} kW Inverter
                </span>
                <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                  {isTl ? 'Swak / Malakas' : 'Recommended'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {isTl
                  ? 'May sapat na allowance, mas malakas na output, pwedeng dagdagan ng panels'
                  : 'Full peak output & expansion headroom'}
              </p>
            </div>

            {/* Saktuhan / 4kW option */}
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-700/60">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  {results.minimumInverterKw} kW Inverter
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                  {isTl ? 'Saktuhan / Budget' : 'Budget Fit'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {isTl
                  ? `Saktuhan lang ang design (${formatNumber(results.actualInstalledPvKw / results.minimumInverterKw, 2)}x DC/AC ratio)`
                  : `Cost-effective design (${formatNumber(results.actualInstalledPvKw / results.minimumInverterKw, 2)}x ratio)`}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Summary Narrative Banner mirroring user's exact Tagalog text */}
      <div className="mt-4 p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-3 text-xs sm:text-sm text-slate-300">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-300">
            {isTl ? 'Paliwanag sa Kalkulasyon: ' : 'Calculation Summary: '}
          </span>
          {isTl ? (
            <span>
              Ang inyong konsumo na <strong>{formatNumber(results.monthlyKwh, 0)} kWh</strong> ay hinati sa <strong>{days} araw</strong> ng buwan para makuha ang <strong>{formatNumber(results.dailyKwh, 2)} kWh/araw</strong>. Hinati ito sa <strong>{psh} PSH</strong> (kalakasan ng araw) upang makuha ang <strong>{formatNumber(results.basePvKw, 3)} kW</strong> base PV. Isinama natin ang <strong>{systemLossPercent}% system loss</strong> (hinati sa {efficiencyPercent}%), kaya ang kailangan ninyong PV ay <strong>{formatNumber(results.recommendedPvKw, 2)} kWp</strong>. Mula rito, pwede ninyong gamitin ang <strong>{results.recommendedInverterKw} kW Inverter</strong> para mas swak at malakas, o kaya naman ang <strong>{results.minimumInverterKw} kW Inverter</strong> kung saktuhan lang ang inyong disenyo.
            </span>
          ) : (
            <span>
              Your monthly consumption of <strong>{formatNumber(results.monthlyKwh, 0)} kWh</strong> is divided by <strong>{days} days</strong> = <strong>{formatNumber(results.dailyKwh, 2)} kWh/day</strong>. Dividing this by <strong>{psh} Peak Sun Hours</strong> gives <strong>{formatNumber(results.basePvKw, 3)} kW</strong> base PV. Accounting for <strong>{systemLossPercent}% system loss</strong> (dividing by {efficiencyPercent}%) yields a recommended <strong>{formatNumber(results.recommendedPvKw, 2)} kWp</strong> Solar PV. From here, you can choose a <strong>{results.recommendedInverterKw} kW Inverter</strong> for strong headroom and peak performance, or a <strong>{results.minimumInverterKw} kW Inverter</strong> for a cost-effective budget design.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
