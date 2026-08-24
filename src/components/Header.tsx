import React from 'react';
import { Sun, Zap, Calculator, SlidersHorizontal, Sparkles, FileText, Check } from 'lucide-react';
import { Language } from '../types';
import { POPULAR_PRESETS } from '../utils/solarCalculations';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectPreset: (monthlyKwh: number, rate: number) => void;
  onOpenApplianceEstimator: () => void;
  onOpenExportModal: () => void;
  currentKwh: number;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onSelectPreset,
  onOpenApplianceEstimator,
  onOpenExportModal,
  currentKwh,
}) => {
  const isTl = lang === 'tl';

  return (
    <header id="main-header" className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950">
              <Sun className="w-6 h-6 animate-[spin_16s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>5A Solar Calculator</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Pilipinas
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isTl
                  ? 'Kalkulahin ang Solar PV (kWp), Inverter (kW), Bilang ng Panels, at Matitipid'
                  : 'Calculate Solar PV (kWp), Inverter Size, Panel Count, & Bill Savings'}
              </p>
            </div>
          </div>

          {/* Actions & Tools */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Appliance Estimator Button */}
            <button
              id="btn-open-appliance-estimator"
              onClick={onOpenApplianceEstimator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors shadow-sm cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>{isTl ? 'Kalkulador ng Gamit' : 'Appliance Estimator'}</span>
            </button>

            {/* Export Summary Button */}
            <button
              id="btn-open-export"
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-md shadow-amber-500/20 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{isTl ? 'I-export / I-print' : 'Export / Print'}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                id="btn-lang-tl"
                onClick={() => onLanguageChange('tl')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  isTl ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🇵🇭 Tagalog
              </button>
              <button
                id="btn-lang-en"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  !isTl ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🇺🇸 English
              </button>
            </div>
          </div>
        </div>

        {/* Quick Example Selector Pill Strip */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {isTl ? 'Mabilisang Halimbawa:' : 'Quick Presets:'}
          </span>
          {POPULAR_PRESETS.map((preset) => {
            const isSelected = Math.abs(currentKwh - preset.monthlyKwh) < 1;
            return (
              <button
                key={preset.id}
                id={`btn-preset-${preset.id}`}
                onClick={() => onSelectPreset(preset.monthlyKwh, preset.electricityRate)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer font-medium ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 ring-1 ring-amber-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                <span>{isTl ? preset.titleTl : preset.titleEn}</span>
                {preset.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-400 text-slate-950 font-bold rounded-full">
                    {preset.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
