import React from 'react';
import { 
  Cpu, 
  Layers, 
  Maximize2, 
  Sun, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Activity,
  ArrowUpRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Language, SolarCalculationResults, SolarCalculationInputs } from '../types';
import { formatNumber, formatPhp } from '../utils/solarCalculations';

interface SystemRecommendationCardProps {
  lang: Language;
  results: SolarCalculationResults;
  inputs: SolarCalculationInputs;
}

export const SystemRecommendationCard: React.FC<SystemRecommendationCardProps> = ({
  lang,
  results,
  inputs,
}) => {
  const isTl = lang === 'tl';

  return (
    <div id="system-recommendation-card" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6 relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isTl ? 'Rekomendadong Sistema' : 'System Recommendation'}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isTl ? 'Kabuuang Disenyo ng Solar PV System' : 'Complete Solar PV System Specification'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {isTl
              ? 'Tugma sa inyong buwanang kuryente at pamantayan sa Pilipinas'
              : 'Engineered for your monthly energy demand & Philippine climate'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-mono">
            {isTl ? 'Uri:' : 'Type:'} <strong className="text-amber-400">Hybrid / Grid-Tie</strong>
          </span>
        </div>
      </div>

      {/* Hero Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Recommended PV Capacity */}
        <div className="bg-gradient-to-br from-amber-500/15 via-slate-800/80 to-slate-900 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-amber-300 mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Sun className="w-4 h-4 text-amber-400" />
              {isTl ? 'PV Capacity' : 'PV Capacity'}
            </span>
            <span className="text-[11px] bg-amber-400/20 text-amber-300 font-mono px-1.5 py-0.5 rounded">
              DC Peak
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono flex items-baseline gap-1">
              <span>{formatNumber(results.recommendedPvKw, 2)}</span>
              <span className="text-sm font-semibold text-amber-400">kWp</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {isTl
                ? `Aktwal na ikakabit: ${formatNumber(results.actualInstalledPvKw, 2)} kWp`
                : `Actual installed: ${formatNumber(results.actualInstalledPvKw, 2)} kWp`}
            </div>
          </div>
        </div>

        {/* 2. Inverter Sizes */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span className="font-semibold flex items-center gap-1 text-sky-400">
              <Cpu className="w-4 h-4" />
              {isTl ? 'Sukat ng Inverter' : 'Inverter Choice'}
            </span>
            <span className="text-[11px] bg-sky-950 border border-sky-800 text-sky-300 font-mono px-1.5 py-0.5 rounded">
              AC Power
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-sky-400 font-mono flex items-baseline gap-1">
              <span>{results.recommendedInverterKw}</span>
              <span className="text-sm font-semibold text-slate-300">kW</span>
              <span className="text-xs text-slate-400 font-normal">
                ({isTl ? 'o ' : 'or '}
                <span className="text-amber-300 font-bold">{results.minimumInverterKw} kW</span>)
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
              <span>{isTl ? '6kW (Swak) / 4kW (Saktuhan)' : '6kW (Optimal) / 4kW (Budget)'}</span>
            </div>
          </div>
        </div>

        {/* 3. Panel Count */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span className="font-semibold flex items-center gap-1 text-emerald-400">
              <Layers className="w-4 h-4" />
              {isTl ? 'Bilang ng Panels' : 'Solar Panels'}
            </span>
            <span className="text-[11px] bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono px-1.5 py-0.5 rounded">
              {inputs.panelWattage}W bawat isa
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono flex items-baseline gap-1">
              <span>{results.numberOfPanels}</span>
              <span className="text-sm font-normal text-slate-400">piraso (pcs)</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {isTl
                ? `${results.numberOfPanels} × ${inputs.panelWattage}W = ${formatNumber(results.actualInstalledPvKw, 2)} kWp`
                : `${results.numberOfPanels} × ${inputs.panelWattage}W = ${formatNumber(results.actualInstalledPvKw, 2)} kWp`}
            </div>
          </div>
        </div>

        {/* 4. Roof Area Needed */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span className="font-semibold flex items-center gap-1 text-purple-400">
              <Maximize2 className="w-4 h-4" />
              {isTl ? 'Laki sa Bubong' : 'Roof Space'}
            </span>
            <span className="text-[11px] bg-purple-950 border border-purple-800 text-purple-300 font-mono px-1.5 py-0.5 rounded">
              Est. Area
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-purple-400 font-mono flex items-baseline gap-1">
              <span>{formatNumber(results.roofAreaSqMeters, 1)}</span>
              <span className="text-sm font-semibold text-slate-300">m²</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              ≈ {formatNumber(results.roofAreaSqFeet, 0)} sq ft na espasyo sa bubong
            </div>
          </div>
        </div>

      </div>

      {/* Inverter Comparison Detailed Breakdown */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/80">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-amber-400" />
          <span>{isTl ? 'Paghahambing ng Sukat ng Inverter:' : 'Inverter Sizing Comparison:'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Option A: 6kW Recommended Inverter */}
          <div className="bg-slate-900/90 p-4 rounded-xl border-2 border-amber-500/40 relative shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                {results.recommendedInverterKw} kW String Inverter
              </span>
              <span className="text-[11px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                {isTl ? '★ Mas Swak at Malakas' : '★ Recommended Choice'}
              </span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 mt-2.5">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  {isTl
                    ? 'Kayang i-handle ang buong peak output ng solar panels kahit napakainit ng sikat ng araw (No Inverter Clipping).'
                    : 'Handles full DC peak solar output with zero clipping losses on sunny days.'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  {isTl
                    ? 'May allowance para magdagdag ng 1-4 panels o baterya sa hinaharap kapag bumili ng bagong aircon.'
                    : 'Headroom to add more panels or upgrade to hybrid battery storage later.'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  {isTl
                    ? 'Mas malamig ang takbo ng inverter dahil hindi ito laging sagad sa 100% capacity.'
                    : 'Inverter runs cooler and enjoys extended lifespan due to moderate thermal load.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Option B: 4kW Budget Saktuhan Inverter */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-200">
                {results.minimumInverterKw} kW String Inverter
              </span>
              <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                {isTl ? 'Saktuhan / Budget Fit' : 'Budget-Friendly Fit'}
              </span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 mt-2.5">
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400 font-bold">•</span>
                <span>
                  {isTl
                    ? `Mas mababa ang paunang gastos ng inverter unit. DC:AC ratio ay ~${formatNumber(results.actualInstalledPvKw / results.minimumInverterKw, 2)}x.`
                    : `Lower upfront cost. Operating at a standard ~${formatNumber(results.actualInstalledPvKw / results.minimumInverterKw, 2)}x DC/AC ratio.`}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400 font-bold">•</span>
                <span>
                  {isTl
                    ? 'Sapat na para sa karaniwang daytime load ng bahay nang walang labis na kapasidad.'
                    : 'Good for standard daytime residential consumption.'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400/80 font-bold">⚠</span>
                <span>
                  {isTl
                    ? 'Maaaring mag-clip (malimitahan ang output) sa tanghaling tapat kapag lumagpas sa 4.0 kW ang produksyon ng panels.'
                    : 'Minor clipping may occur at peak noon sun when DC output exceeds 4 kW.'}
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Visual Solar Panels Array Rack */}
      <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            {isTl ? 'Visual Layout ng Solar Panels sa Bubong:' : 'Visual Solar Panel Array Layout:'}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {results.numberOfPanels} panels ({inputs.panelWattage}W each)
          </span>
        </div>

        {/* Panel Grid Visualizer */}
        <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800/80 flex flex-col items-center justify-center">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-w-full overflow-x-auto p-2">
            {Array.from({ length: results.numberOfPanels }).map((_, idx) => (
              <div
                key={idx}
                className="w-10 h-16 sm:w-12 sm:h-20 bg-gradient-to-b from-blue-900 via-sky-950 to-slate-900 border border-sky-400/40 rounded flex flex-col items-center justify-between p-1 shadow-sm hover:border-sky-300 transition-colors group cursor-default"
                title={`Panel #${idx + 1}: ${inputs.panelWattage}W Mono`}
              >
                <div className="w-full h-1 bg-sky-400/30 rounded-xs" />
                <div className="grid grid-cols-2 grid-rows-3 gap-0.5 w-full h-full my-0.5 opacity-60">
                  <div className="border border-sky-500/20 bg-sky-900/30" />
                  <div className="border border-sky-500/20 bg-sky-900/30" />
                  <div className="border border-sky-500/20 bg-sky-900/30" />
                  <div className="border border-sky-500/20 bg-sky-900/30" />
                  <div className="border border-sky-500/20 bg-sky-900/30" />
                  <div className="border border-sky-500/20 bg-sky-900/30" />
                </div>
                <span className="text-[9px] font-mono text-sky-300 font-semibold group-hover:text-white">
                  #{idx + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800 w-full justify-center flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-sky-500 rounded-full inline-block" />
              {isTl ? '2 Strings (Hal: 2 strings ng tig-5 panels)' : '2 PV Strings Configuration'}
            </span>
            <span>•</span>
            <span>
              {isTl ? 'Kabuuang Laki:' : 'Total Area:'} <strong className="text-slate-200">{formatNumber(results.roofAreaSqMeters, 1)} m²</strong>
            </span>
            <span>•</span>
            <span>
              {isTl ? 'Tilt Angle sa PH:' : 'PH Tilt Angle:'} <strong className="text-slate-200">10° - 15° Harap sa Timog (South)</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Safety & Electrical Components Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/60 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-200 block">
              {isTl ? 'Proteksyon sa DC Side' : 'DC Protection'}
            </span>
            <span className="text-slate-400 text-[11px]">
              1000V DC Breaker / Isolator, 600V-1000V DC SPD (Surge Protection Device), 4mm² - 6mm² Solar PV Cables.
            </span>
          </div>
        </div>

        <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/60 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-200 block">
              {isTl ? 'Proteksyon sa AC Side' : 'AC Protection'}
            </span>
            <span className="text-slate-400 text-[11px]">
              32A 2-Pole AC MCB / RCBO Breaker, AC Surge Protector, Manual AC Isolator Switch malapit sa metro.
            </span>
          </div>
        </div>

        <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/60 flex items-start gap-2.5">
          <Activity className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-200 block">
              {isTl ? 'Grounding & Monitoring' : 'Earthing & Smart WiFi'}
            </span>
            <span className="text-slate-400 text-[11px]">
              Copper Grounding Rod (&lt;5 Ohms), Solar Panel Earthing Lugs, WiFi Smart App para sa real-time solar stats.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
