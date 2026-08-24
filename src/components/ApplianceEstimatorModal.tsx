import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Calculator, 
  Sparkles, 
  Zap, 
  Wind, 
  Tv, 
  Monitor, 
  Lightbulb, 
  Flame, 
  Droplets, 
  Shirt, 
  Gauge, 
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { Language, ApplianceItem } from '../types';
import { DEFAULT_APPLIANCES } from '../constants/appliances';
import { formatNumber, formatPhp } from '../utils/solarCalculations';

interface ApplianceEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onApplyKwh: (calculatedKwh: number) => void;
  electricityRate: number;
}

export const ApplianceEstimatorModal: React.FC<ApplianceEstimatorModalProps> = ({
  isOpen,
  onClose,
  lang,
  onApplyKwh,
  electricityRate,
}) => {
  if (!isOpen) return null;

  const isTl = lang === 'tl';
  const [appliances, setAppliances] = useState<ApplianceItem[]>(DEFAULT_APPLIANCES);

  // Helper to get Lucide icon
  const getIcon = (name: string) => {
    switch (name) {
      case 'wind': return <Wind className="w-4 h-4 text-sky-400" />;
      case 'tv': return <Tv className="w-4 h-4 text-purple-400" />;
      case 'monitor': return <Monitor className="w-4 h-4 text-blue-400" />;
      case 'lightbulb': return <Lightbulb className="w-4 h-4 text-amber-400" />;
      case 'flame': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'droplets': return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'shirt': return <Shirt className="w-4 h-4 text-indigo-400" />;
      case 'gauge': return <Gauge className="w-4 h-4 text-emerald-400" />;
      default: return <Zap className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleUpdate = (id: string, field: 'quantity' | 'hoursPerDay' | 'wattage', val: number) => {
    setAppliances((prev) =>
      prev.map((app) => (app.id === id ? { ...app, [field]: Math.max(0, val) } : app))
    );
  };

  const handleAddCustom = () => {
    const newId = `custom_${Date.now()}`;
    const newItem: ApplianceItem = {
      id: newId,
      nameTl: 'Bagong Kagamitan',
      nameEn: 'New Appliance',
      category: 'other',
      wattage: 500,
      hoursPerDay: 4,
      quantity: 1,
      iconName: 'zap',
    };
    setAppliances([...appliances, newItem]);
  };

  const handleDelete = (id: string) => {
    setAppliances(appliances.filter((a) => a.id !== id));
  };

  const handleReset = () => {
    setAppliances(DEFAULT_APPLIANCES);
  };

  // Calculations
  const totalDailyWh = appliances.reduce(
    (sum, app) => sum + app.wattage * app.hoursPerDay * app.quantity,
    0
  );
  const totalDailyKwh = totalDailyWh / 1000;
  const totalMonthlyKwh = Math.round(totalDailyKwh * 30);
  const estimatedBillPhp = Math.round(totalMonthlyKwh * electricityRate);

  const handleApply = () => {
    onApplyKwh(totalMonthlyKwh);
    onClose();
  };

  return (
    <div id="appliance-estimator-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isTl ? 'Kalkulador ng Konsumo ng mga Gamit sa Bahay' : 'Household Appliance Load Estimator'}
              </h2>
              <p className="text-xs text-slate-400">
                {isTl
                  ? 'Kwentahin ang buwanang kWh base sa mga appliances na ginagamit sa bahay'
                  : 'Estimate your monthly kWh consumption by listing your household appliances'}
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

        {/* Modal Content / Appliances Table */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 scrollbar-thin">
          
          {/* Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block">{isTl ? 'Araw-araw na Konsumo:' : 'Daily Consumption:'}</span>
              <span className="text-xl font-bold font-mono text-sky-400">
                {formatNumber(totalDailyKwh, 2)} kWh / araw
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">{isTl ? 'Kabuuan sa Isang Buwan:' : 'Estimated Monthly Total:'}</span>
              <span className="text-2xl font-extrabold font-mono text-amber-400">
                {totalMonthlyKwh} kWh / buwan
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">{isTl ? 'Tinatayang Electric Bill:' : 'Estimated Bill Amount:'}</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {formatPhp(estimatedBillPhp)} / buwan
              </span>
            </div>
          </div>

          {/* Appliances List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <span className="font-semibold">{isTl ? 'Kagamitan (Appliance)' : 'Appliance'}</span>
              <div className="flex items-center gap-6">
                <span className="hidden sm:inline">{isTl ? 'Watts' : 'Watts'}</span>
                <span>{isTl ? 'Dami' : 'Qty'}</span>
                <span>{isTl ? 'Oras/Araw' : 'Hrs/Day'}</span>
                <span>{isTl ? 'Aksyon' : 'Action'}</span>
              </div>
            </div>

            {appliances.map((app) => {
              const dailyKwh = (app.wattage * app.hoursPerDay * app.quantity) / 1000;
              return (
                <div
                  key={app.id}
                  className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                      {getIcon(app.iconName)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-200">
                        {isTl ? app.nameTl : app.nameEn}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span>{app.wattage}W</span>
                        <span>•</span>
                        <span className="font-mono text-amber-400">
                          {formatNumber(dailyKwh * 30, 1)} kWh/mo
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {/* Watts input */}
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1"
                        max="10000"
                        value={app.wattage}
                        onChange={(e) => handleUpdate(app.id, 'wattage', Number(e.target.value) || 0)}
                        className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-right font-mono text-white"
                        title="Watts"
                      />
                      <span className="text-[11px] text-slate-500">W</span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={app.quantity}
                        onChange={(e) => handleUpdate(app.id, 'quantity', Number(e.target.value) || 0)}
                        className="w-12 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-center font-mono text-white"
                        title="Quantity"
                      />
                      <span className="text-[11px] text-slate-500">pc</span>
                    </div>

                    {/* Hours/Day */}
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        step="0.5"
                        value={app.hoursPerDay}
                        onChange={(e) => handleUpdate(app.id, 'hoursPerDay', Number(e.target.value) || 0)}
                        className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-center font-mono text-white"
                        title="Hours per day"
                      />
                      <span className="text-[11px] text-slate-500">hrs</span>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                      title="Tanggalin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Appliance & Reset Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleAddCustom}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isTl ? 'Magdagdag ng Appliance' : 'Add Custom Appliance'}</span>
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isTl ? 'Ibalik sa Default' : 'Reset List'}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {isTl ? 'Kabuuang Kinalabasan:' : 'Calculated Total:'}{' '}
            <strong className="text-amber-400 font-mono text-sm">{totalMonthlyKwh} kWh/buwan</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              {isTl ? 'Isara' : 'Close'}
            </button>
            <button
              id="btn-apply-appliance-kwh"
              onClick={handleApply}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isTl
                  ? `Ilapat ang ${totalMonthlyKwh} kWh sa Calculator`
                  : `Apply ${totalMonthlyKwh} kWh to Calculator`}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
