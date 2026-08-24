import React from 'react';
import { 
  TrendingUp, 
  PhilippinePeso, 
  Clock, 
  PiggyBank, 
  Leaf, 
  Trees, 
  Sparkles, 
  PartyPopper,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, SolarCalculationResults, SolarCalculationInputs } from '../types';
import { formatPhp, formatNumber } from '../utils/solarCalculations';

interface SavingsROISectionProps {
  lang: Language;
  results: SolarCalculationResults;
  inputs: SolarCalculationInputs;
}

export const SavingsROISection: React.FC<SavingsROISectionProps> = ({
  lang,
  results,
  inputs,
}) => {
  const isTl = lang === 'tl';

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#38bdf8', '#fbbf24'],
    });
  };

  // 25-Year Bar Chart Data generator
  const projectionPoints = [1, 5, 10, 15, 20, 25].map((year) => {
    let cumulative = 0;
    for (let y = 1; y <= year; y++) {
      const degradation = Math.pow(0.995, y);
      const rate = inputs.electricityRatePhp * Math.pow(1.035, y - 1);
      cumulative += results.annualSolarGenKwh * degradation * rate;
    }
    return {
      year,
      savings: cumulative,
      costWithoutSolar: results.currentMonthlyBillPhp * 12 * year * Math.pow(1.035, year / 2),
    };
  });

  return (
    <div id="savings-roi-section" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
            <PiggyBank className="w-3.5 h-3.5" />
            <span>{isTl ? 'Pera at ROI Analysis' : 'Financial & ROI Forecast'}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isTl ? 'Tinatayang Matitipid sa Kuryente at Payback Period' : 'Estimated Electric Bill Savings & Payback'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {isTl
              ? `Base sa taripa na ₱${inputs.electricityRatePhp.toFixed(2)}/kWh at 25-taong buhay ng solar panels`
              : `Based on ₱${inputs.electricityRatePhp.toFixed(2)}/kWh tariff rate and 25-year panel lifespan`}
          </p>
        </div>

        <button
          id="btn-celebrate-savings"
          onClick={triggerConfetti}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/10 transition-all cursor-pointer self-start sm:self-center active:scale-95"
        >
          <PartyPopper className="w-4 h-4" />
          <span>{isTl ? 'I-celebrate ang Matitipid!' : 'Celebrate Savings!'}</span>
        </button>
      </div>

      {/* Primary Financial Numbers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Monthly Savings */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
            <PiggyBank className="w-4 h-4" />
            {isTl ? 'Buwanang Tipid' : 'Monthly Savings'}
          </span>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-white font-mono">
              {formatPhp(results.monthlySavingsPhp)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {isTl ? 'Bawas sa buwanang bayarin' : 'Off your monthly electric bill'}
            </div>
          </div>
          <div className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded px-2 py-1 flex items-center justify-between">
            <span>{isTl ? 'Dating Bill:' : 'Prev Bill:'} {formatPhp(results.currentMonthlyBillPhp)}</span>
            <span>➔ <strong>{formatPhp(results.estimatedNewMonthlyBillPhp)}</strong></span>
          </div>
        </div>

        {/* Annual Savings */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {isTl ? 'Taunang Tipid' : 'Annual Savings'}
          </span>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">
              {formatPhp(results.annualSavingsPhp)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {isTl ? 'Kabuuang maiipon kada 12 buwan' : 'Total accumulated per year'}
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            {isTl
              ? `Produksyon: ~${formatNumber(results.annualSolarGenKwh, 0)} kWh/taon`
              : `Solar output: ~${formatNumber(results.annualSolarGenKwh, 0)} kWh/yr`}
          </div>
        </div>

        {/* Payback Period (ROI) */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-semibold text-sky-400 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {isTl ? 'Payback Period (ROI)' : 'Payback Period (ROI)'}
          </span>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-sky-400 font-mono flex items-baseline gap-1">
              <span>{formatNumber(results.paybackPeriodYears, 1)}</span>
              <span className="text-sm font-semibold text-slate-300">
                {isTl ? 'Taon' : 'Years'}
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {isTl
                ? `Bawi na ang puhunan sa loob ng ~${Math.round(results.paybackPeriodYears * 12)} buwan`
                : `Full capital recovered in ~${Math.round(results.paybackPeriodYears * 12)} months`}
            </div>
          </div>
          <div className="text-[11px] text-sky-300/80">
            {isTl ? 'Bawi agad ang puhunan!' : 'Rapid capital return in PH!'}
          </div>
        </div>

        {/* 25-Year Net Benefit */}
        <div className="bg-gradient-to-br from-amber-500/10 via-slate-800/80 to-slate-900 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {isTl ? '25-Year Kabuuang Tipid' : '25-Year Total Savings'}
          </span>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              {formatPhp(results.twentyFiveYearSavingsPhp)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {isTl ? 'Kasamang 3.5% taunang inflation ng kuryente' : 'Includes 3.5% yearly electricity inflation'}
            </div>
          </div>
          <div className="text-[11px] text-amber-300 font-medium">
            {isTl ? 'Libreng kuryente matapos mabawi ang ROI' : 'Pure profit after payback period'}
          </div>
        </div>

      </div>

      {/* Estimated System Cost & Turnkey Package details */}
      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {isTl ? 'Tinatayang Halaga ng Kumpletong Sistema (Turnkey Installed):' : 'Estimated Complete Turnkey System Cost:'}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {formatPhp(results.estimatedSystemCostPhp)}
            </span>
            <span className="text-xs text-slate-400">
              (@ ₱{inputs.systemCostPerWattPhp}/Watt para sa {formatNumber(results.actualInstalledPvKw, 2)} kWp)
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {isTl
              ? 'Kasama na ang Tier-1 Solar Panels, Inverter, Aluminum Railing Mounts, DC/AC Protection, Cables, at Propesyonal na Pagkakabit.'
              : 'Includes Tier-1 Panels, Inverter, Mounting Racks, DC/AC Switchgear, Solar Cables, and Installation.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 bg-slate-900 p-3 rounded-lg border border-slate-800">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">{isTl ? 'Kikitain Pagkatapos ng ROI:' : 'Net Profit After ROI:'}</span>
            <span className="text-base font-bold font-mono text-emerald-400">
              {formatPhp(results.twentyFiveYearSavingsPhp - results.estimatedSystemCostPhp)}
            </span>
          </div>
        </div>
      </div>

      {/* 25-Year Projection Chart (SVG Visualizer) */}
      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>{isTl ? 'Proyeksyon ng Matitipid sa Loob ng 25 Taon:' : '25-Year Cumulative Savings Growth:'}</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {isTl ? '25-Taong Warranted Life' : '25-Yr Lifetime'}
          </span>
        </div>

        {/* Visual Comparison Bar Chart */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
          {projectionPoints.map((pt) => {
            const maxSavings = projectionPoints[projectionPoints.length - 1].savings;
            const heightPercent = Math.max(15, Math.round((pt.savings / maxSavings) * 100));
            return (
              <div
                key={pt.year}
                className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex flex-col justify-between items-center text-center hover:border-emerald-500/40 transition-colors"
              >
                <span className="text-xs font-semibold text-slate-400">
                  {isTl ? `Taon ${pt.year}` : `Year ${pt.year}`}
                </span>

                <div className="w-full h-24 flex items-end justify-center my-2">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-8 bg-gradient-to-t from-emerald-600 to-amber-400 rounded-t transition-all"
                  />
                </div>

                <div className="font-mono text-xs font-bold text-emerald-400">
                  {formatPhp(pt.savings)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Environmental Contribution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-950/20 border border-emerald-800/30 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">
              {isTl ? 'Bawas sa CO2 Karbon Kada Taon:' : 'Annual CO2 Carbon Avoided:'}
            </span>
            <span className="text-lg font-bold font-mono text-emerald-400">
              {formatNumber(results.co2OffsetKgYear, 0)} kg CO₂ / taon
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Trees className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">
              {isTl ? 'Katumbas ng Itinanim na Puno:' : 'Equivalent Trees Planted:'}
            </span>
            <span className="text-lg font-bold font-mono text-emerald-400">
              ≈ {results.treesPlantedEquivalent} puno bawat taon
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
