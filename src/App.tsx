import React, { useState } from 'react';
import { Language, SolarCalculationInputs } from './types';
import { calculateSolarSystem } from './utils/solarCalculations';
import { Header } from './components/Header';
import { StepByStepFormulaCard } from './components/StepByStepFormulaCard';
import { MainCalculator } from './components/MainCalculator';
import { SystemRecommendationCard } from './components/SystemRecommendationCard';
import { SavingsROISection } from './components/SavingsROISection';
import { SolarFaqAndGuide } from './components/SolarFaqAndGuide';
import { ApplianceEstimatorModal } from './components/ApplianceEstimatorModal';
import { ExportSummaryModal } from './components/ExportSummaryModal';
import { Sun, Heart, Sparkles, ShieldCheck } from 'lucide-react';

const DEFAULT_INPUTS: SolarCalculationInputs = {
  monthlyKwh: 0, // Exact user prompt default
  daysInMonth: 30,
  psh: 4.5, // Peak Sun Hours
  systemLossPercent: 20, // 20% system loss -> 80% efficiency
  panelWattage: 650, // 650W Tier-1 N-Type Mono
  electricityRatePhp: 16, // Updated DU residential tariff
  systemCostPerWattPhp: 42, // Turnkey cost per watt in PH
  targetOffsetPercent: 100, // 100% Net zero
  selectedRegionId: 'ncr',
  roofType: 'gi_sheet',
};

export default function App() {
  const [lang, setLang] = useState<Language>('tl');
  const [inputs, setInputs] = useState<SolarCalculationInputs>(DEFAULT_INPUTS);
  const [isApplianceModalOpen, setIsApplianceModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Reactive calculations
  const results = calculateSolarSystem(inputs);

  const handleInputChange = (updated: Partial<SolarCalculationInputs>) => {
    setInputs((prev) => ({ ...prev, ...updated }));
  };

  const handlePresetSelect = (monthlyKwh: number, rate: number) => {
    setInputs((prev) => ({
      ...prev,
      monthlyKwh,
      electricityRatePhp: rate,
    }));
  };

  const handleResetToDefault = () => {
    setInputs(DEFAULT_INPUTS);
  };

  const handleApplyApplianceKwh = (calculatedKwh: number) => {
    setInputs((prev) => ({
      ...prev,
      monthlyKwh: calculatedKwh,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Sticky Header */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        onSelectPreset={handlePresetSelect}
        onOpenApplianceEstimator={() => setIsApplianceModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        currentKwh={inputs.monthlyKwh}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8">
        
        {/* 1. Exact Step-by-Step Formula Card (Direct translation of user request) */}
        <section aria-label="Step by step formula">
          <StepByStepFormulaCard
            lang={lang}
            results={results}
            inputs={inputs}
            days={inputs.daysInMonth}
            psh={inputs.psh}
            systemLossPercent={inputs.systemLossPercent}
          />
        </section>

        {/* 2. Main Calculator Inputs & System Recommendation Layout */}
        <section aria-label="Calculator inputs and recommendation" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <MainCalculator
              lang={lang}
              inputs={inputs}
              onChange={handleInputChange}
              onResetToDefault={handleResetToDefault}
            />
          </div>

          <div className="lg:col-span-7">
            <SystemRecommendationCard
              lang={lang}
              results={results}
              inputs={inputs}
            />
          </div>
        </section>

        {/* 3. Savings & ROI Section */}
        <section aria-label="Savings and ROI">
          <SavingsROISection
            lang={lang}
            results={results}
            inputs={inputs}
          />
        </section>

        {/* 4. Solar FAQ & Engineering Guide */}
        <section aria-label="Solar guide and FAQ">
          <SolarFaqAndGuide lang={lang} />
        </section>

      </main>

      {/* Modals */}
      <ApplianceEstimatorModal
        isOpen={isApplianceModalOpen}
        onClose={() => setIsApplianceModalOpen(false)}
        lang={lang}
        onApplyKwh={handleApplyApplianceKwh}
        electricityRate={inputs.electricityRatePhp}
      />

      <ExportSummaryModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        lang={lang}
        results={results}
        inputs={inputs}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/80 py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sun className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-300">
              5A Solar PV Calculator
            </span>
          </div>

          <div>
            <span>
              {lang === 'tl'
                ? 'Dinisenyo ayon sa Philippine Renewable Energy Act (RA 9513) at pamantayang Solar PV Sizing.'
                : 'Designed adhering to Philippine Renewable Energy standards & PEC solar codes.'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <span>Powered by 5A Developer & 5A Solar Engineering</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
