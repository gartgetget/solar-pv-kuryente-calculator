import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  Sun, 
  Sliders, 
  Layers, 
  PhilippinePeso, 
  ShieldAlert, 
  Home, 
  RotateCcw,
  Sparkles,
  HelpCircle,
  Settings2
} from 'lucide-react';
import { Language, SolarCalculationInputs } from '../types';
import { PHILIPPINE_REGIONS } from '../constants/philippineRegions';
import { formatPhp } from '../utils/solarCalculations';

interface MainCalculatorProps {
  lang: Language;
  inputs: SolarCalculationInputs;
  onChange: (updated: Partial<SolarCalculationInputs>) => void;
  onResetToDefault: () => void;
}

export const MainCalculator: React.FC<MainCalculatorProps> = ({
  lang,
  inputs,
  onChange,
  onResetToDefault,
}) => {
  const isTl = lang === 'tl';
  const [inputMode, setInputMode] = useState<'kwh' | 'bill'>('kwh');
  const [billInputAmount, setBillInputAmount] = useState<number>(
    Math.round(inputs.monthlyKwh * inputs.electricityRatePhp)
  );
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Sync bill input when monthlyKwh changes
  const handleKwhChange = (kwh: number) => {
    const val = Math.max(10, kwh);
    onChange({ monthlyKwh: val });
    setBillInputAmount(Math.round(val * inputs.electricityRatePhp));
  };

  const handleBillChange = (billPhp: number) => {
    const safeBill = Math.max(100, billPhp);
    setBillInputAmount(safeBill);
    const calculatedKwh = Math.round(safeBill / (inputs.electricityRatePhp || 14.7833));
    onChange({ monthlyKwh: Math.max(10, calculatedKwh) });
  };

  const handleRegionSelect = (regionId: string) => {
    const region = PHILIPPINE_REGIONS.find((r) => r.id === regionId);
    if (region) {
      onChange({
        selectedRegionId: regionId,
        psh: region.psh,
      });
    }
  };

  return (
    <div id="main-calculator-controls" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {isTl ? 'Mga Datos ng Inyong Kuryente' : 'Electricity & Solar Inputs'}
            </h2>
            <p className="text-xs text-slate-400">
              {isTl ? 'Ilagay ang inyong konsumo o halaga ng buwanang bill' : 'Enter your monthly kWh usage or electric bill'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            id="btn-reset-calculator"
            onClick={onResetToDefault}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Ibalik sa 587 kWh default example"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isTl ? 'I-reset (587 kWh)' : 'Reset (587 kWh)'}</span>
          </button>
        </div>
      </div>

      {/* Primary Input: kWh vs Bill Amount */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>{isTl ? '1. Buwanang Konsumo sa Kuryente' : '1. Monthly Power Consumption'}</span>
          </label>

          {/* Toggle kWh vs Bill */}
          <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
            <button
              id="tab-input-kwh"
              onClick={() => setInputMode('kwh')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                inputMode === 'kwh'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚡ kWh (Kilowatt-hour)
            </button>
            <button
              id="tab-input-bill"
              onClick={() => setInputMode('bill')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                inputMode === 'bill'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ₱ Halaga ng Bill
            </button>
          </div>
        </div>

        {/* Input Box & Slider */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/80 space-y-3">
          {inputMode === 'kwh' ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400">
                  {isTl ? 'Nakalagay sa inyong Meralco / Electric Bill:' : 'Look for "Total kWh" on your bill:'}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-extrabold text-amber-400 font-mono">
                    {inputs.monthlyKwh}
                  </span>
                  <span className="text-sm font-medium text-slate-300">kWh / buwan</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="input-monthly-kwh"
                  type="number"
                  min="20"
                  max="10000"
                  step="1"
                  value={inputs.monthlyKwh}
                  onChange={(e) => handleKwhChange(Number(e.target.value) || 0)}
                  className="w-32 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-right font-mono text-base text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                />
                <span className="text-xs text-slate-400">kWh</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400">
                  {isTl ? 'Tinatayang kabuuang binabayaran kada buwan:' : 'Estimated monthly bill total:'}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-extrabold text-amber-400 font-mono">
                    {formatPhp(billInputAmount)}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    ≈ {inputs.monthlyKwh} kWh (@ ₱{inputs.electricityRatePhp}/kWh)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-semibold text-sm">₱</span>
                  <input
                    id="input-monthly-bill"
                    type="number"
                    min="500"
                    max="500000"
                    step="100"
                    value={billInputAmount}
                    onChange={(e) => handleBillChange(Number(e.target.value) || 0)}
                    className="w-36 bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-right font-mono text-base text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick Slider */}
          <div className="pt-2">
            <input
              id="slider-monthly-kwh"
              type="range"
              min="50"
              max="2000"
              step="5"
              value={inputs.monthlyKwh}
              onChange={(e) => handleKwhChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
              <span>50 kWh (₱740)</span>
              <span className="text-amber-400/80 font-semibold">587 kWh (Default)</span>
              <span>1,000 kWh (₱14.8k)</span>
              <span>2,000 kWh (₱29.6k)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Peak Sun Hours (PSH) & Region + System Loss */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Peak Sun Hours (PSH) & Location */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>{isTl ? '2. Peak Sun Hours (PSH)' : '2. Peak Sun Hours (PSH)'}</span>
            </label>
            <span className="text-base font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {inputs.psh} PSH
            </span>
          </div>

          <p className="text-xs text-slate-400">
            {isTl
              ? 'Karaniwang 4.5 PSH sa Pilipinas (Luzon/NCR: 4.5, Visayas: 4.7, Mindanao: 5.0)'
              : 'Standard 4.5 PSH in the Philippines (ranges from 4.0 to 5.2 hrs/day)'}
          </p>

          {/* Region Dropdown */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {isTl ? 'Pumili ng Rehiyon sa Pilipinas:' : 'Select Philippine Region:'}
            </span>
            <select
              id="select-ph-region"
              value={inputs.selectedRegionId || 'ncr'}
              onChange={(e) => handleRegionSelect(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {PHILIPPINE_REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.islandGroup} — {r.name} ({r.psh} PSH)
                </option>
              ))}
            </select>
          </div>

          {/* Custom PSH Slider */}
          <div className="pt-1">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isTl ? 'I-adjust ang PSH mano-mano:' : 'Fine-tune PSH slider:'}</span>
              <span className="font-mono font-bold text-amber-300">{inputs.psh} hrs/day</span>
            </div>
            <input
              id="slider-psh"
              type="range"
              min="3.5"
              max="6.0"
              step="0.1"
              value={inputs.psh}
              onChange={(e) => onChange({ psh: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* System Loss % / Efficiency */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>{isTl ? '3. System Loss & Kahusayan' : '3. System Loss & Efficiency'}</span>
            </label>
            <div className="flex items-center gap-1 text-xs">
              <span className="font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {inputs.systemLossPercent}% Loss
              </span>
              <span className="text-slate-400">({100 - inputs.systemLossPercent}% Eff.)</span>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            {isTl
              ? 'Inirerekomenda ang 20% system loss (80% efficiency) dahil sa init ng bubong sa Pilipinas, dumi, at inverter losses.'
              : 'Standard 20% derating (80% efficiency) for tropical heat, cable resistance, and inverter conversion.'}
          </p>

          {/* Loss Slider */}
          <div className="pt-2">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isTl ? 'System Loss Factor:' : 'System Loss Factor:'}</span>
              <span className="font-mono font-bold text-emerald-400">
                ÷ {100 - inputs.systemLossPercent}% ({((100 - inputs.systemLossPercent) / 100).toFixed(2)})
              </span>
            </div>
            <input
              id="slider-system-loss"
              type="range"
              min="10"
              max="35"
              step="1"
              value={inputs.systemLossPercent}
              onChange={(e) => onChange({ systemLossPercent: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
              <span>10% (Microinverter)</span>
              <span className="text-emerald-400 font-semibold">20% (Standard PH)</span>
              <span>30% (May Shading)</span>
            </div>
          </div>

          {/* Days in Month */}
          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {isTl ? 'Araw sa Isang Buwan:' : 'Days in a Month:'}
            </span>
            <div className="flex items-center gap-1.5">
              {[30, 31, 28].map((d) => (
                <button
                  key={d}
                  onClick={() => onChange({ daysInMonth: d })}
                  className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold transition-colors cursor-pointer ${
                    inputs.daysInMonth === d
                      ? 'bg-slate-700 text-white border border-slate-600'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d} araw
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Panel Wattage & Offset Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Panel Wattage Picker */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>{isTl ? '4. Sukat ng Solar Panel (Watts)' : '4. Solar Panel Wattage'}</span>
            </label>
            <span className="text-sm font-mono font-bold text-sky-400">
              {inputs.panelWattage}W Panel
            </span>
          </div>

          <p className="text-xs text-slate-400">
            {isTl
              ? 'Piliin ang wattage ng bibilhing Tier-1 N-Type o Mono PERC solar panel.'
              : 'Choose the wattage of your Tier-1 solar panels.'}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {[550, 650].map((w) => (
              <button
                key={w}
                id={`btn-panel-wattage-${w}`}
                onClick={() => onChange({ panelWattage: w })}
                className={`py-2 px-1 rounded-lg text-center font-mono font-bold text-xs transition-all cursor-pointer ${
                  inputs.panelWattage === w
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 ring-1 ring-sky-400'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {w}W
                {w === 650 && (
                  <span className="block text-[9px] font-normal uppercase mt-0.5">
                    {isTl ? 'Karaniwan' : 'Standard'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Target Solar Offset */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>{isTl ? '5. Target Solar Offset' : '5. Target Solar Offset'}</span>
            </label>
            <span className="text-sm font-mono font-bold text-purple-400">
              {inputs.targetOffsetPercent}% Offset
            </span>
          </div>

          <p className="text-xs text-slate-400">
            {isTl
              ? '100% = Sasaklawin ang buong konsumo (Net Metering). 70% = Daytime use lamang.'
              : '100% = Full Net-Zero bill offset. 70% = Daytime load only without export.'}
          </p>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { val: 70, labelTl: '70% Araw Lamang', labelEn: '70% Daytime Only' },
              { val: 100, labelTl: '100% Net Zero', labelEn: '100% Full Net Zero' },
              { val: 120, labelTl: '120% May Allowance', labelEn: '120% Future Expansion' },
            ].map((item) => (
              <button
                key={item.val}
                onClick={() => onChange({ targetOffsetPercent: item.val })}
                className={`py-2 px-1 rounded-lg text-center text-xs font-semibold transition-all cursor-pointer ${
                  inputs.targetOffsetPercent === item.val
                    ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {isTl ? item.labelTl : item.labelEn}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Advanced Pricing & Roof Settings Accordion */}
      <div className="border-t border-slate-800/80 pt-3">
        <button
          id="btn-toggle-advanced"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <Settings2 className="w-4 h-4" />
          <span>{isTl ? 'Karagdagang Setting (Presyo ng Kuryente, Bubong, at Halaga ng Solar)' : 'Advanced Settings (Tariff Rate, Roof Type, & Turnkey Cost)'}</span>
          <span className="text-[11px] font-mono text-slate-500">[{showAdvanced ? 'Itago' : 'Ipakita'}]</span>
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {/* Electricity Rate (₱/kWh) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <PhilippinePeso className="w-3.5 h-3.5 text-amber-400" />
                {isTl ? 'Kuryente Rate (₱ / kWh)' : 'Tariff Rate (₱ / kWh)'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.10"
                  min="5"
                  max="30"
                  value={inputs.electricityRatePhp}
                  onChange={(e) => onChange({ electricityRatePhp: Number(e.target.value) || 14.7833 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white"
                />
              </div>
              <span className="text-[10px] text-slate-500">
                {isTl ? 'Karaniwang taripa: ~₱14.78/kWh' : 'Average tariff: ~₱14.78/kWh'}
              </span>
            </div>

            {/* Turnkey Cost per Watt */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <PhilippinePeso className="w-3.5 h-3.5 text-emerald-400" />
                {isTl ? 'Halaga ng Solar (₱ / Watt)' : 'Turnkey Cost (₱ / Watt)'}
              </label>
              <input
                type="number"
                step="1"
                min="25"
                max="80"
                value={inputs.systemCostPerWattPhp}
                onChange={(e) => onChange({ systemCostPerWattPhp: Number(e.target.value) || 42 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white"
              />
              <span className="text-[10px] text-slate-500">
                {isTl ? 'On-Grid standard: ~₱38 - ₱48/Watt' : 'On-Grid turnkey: ~₱38 - ₱48/Watt'}
              </span>
            </div>

            {/* Roof Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-sky-400" />
                {isTl ? 'Uri ng Bubong' : 'Roof Type'}
              </label>
              <select
                value={inputs.roofType}
                onChange={(e) => onChange({ roofType: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              >
                <option value="gi_sheet">{isTl ? 'Yero / GI Sheet (Rib-type / Corrugated)' : 'GI Sheet Metal'}</option>
                <option value="tegula_tile">{isTl ? 'Tegula / Concrete Roof Tile' : 'Tile Roof'}</option>
                <option value="concrete_deck">{isTl ? 'Concrete Deck (Flat Roof)' : 'Concrete Slab Deck'}</option>
                <option value="ground_mount">{isTl ? 'Ground Mount / Lupa' : 'Ground Mount'}</option>
              </select>
              <span className="text-[10px] text-slate-500">
                {isTl ? 'Para sa tamang mounting rails & L-feet' : 'For rail & mounting hardware sizing'}
              </span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
