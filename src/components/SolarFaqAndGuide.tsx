import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sun, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Compass, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Language } from '../types';

interface SolarFaqAndGuideProps {
  lang: Language;
}

interface FaqItem {
  id: string;
  icon: any;
  questionTl: string;
  questionEn: string;
  answerTl: string;
  answerEn: string;
}

export const SolarFaqAndGuide: React.FC<SolarFaqAndGuideProps> = ({ lang }) => {
  const isTl = lang === 'tl';
  const [openId, setOpenId] = useState<string | null>('psh_faq');

  const faqs: FaqItem[] = [
    {
      id: 'psh_faq',
      icon: Sun,
      questionTl: 'Ano ang Peak Sun Hours (PSH) at bakit 4.5 ang karaniwang gamit sa Pilipinas?',
      questionEn: 'What is Peak Sun Hours (PSH) and why 4.5 hrs/day in the Philippines?',
      answerTl:
        'Ang Peak Sun Hours (PSH) ay hindi basta bilang ng oras na may araw, kundi ang katumbas na oras kung kailan ang sikat ng araw ay nasa lakas na 1,000 Watts bawat metro kuwadrado (1 kW/m²). Sa Pilipinas, ang karaniwang PSH sa buong taon ay 4.5 hanggang 5.0 oras bawat araw dahil sa ating tropikal na lokasyon malapit sa ekwador.',
      answerEn:
        'Peak Sun Hours (PSH) is not just daylight hours, but the equivalent hours when solar irradiance reaches 1,000 W/m². In the Philippines, the annual average is 4.5 to 5.0 hours/day across regions due to our tropical equatorial location.',
    },
    {
      id: 'system_loss_faq',
      icon: ShieldCheck,
      questionTl: 'Bakit kailangan hatiin sa 80% (20% System Loss)?',
      questionEn: 'Why do we account for 20% System Loss (dividing by 0.80)?',
      answerTl:
        'Sa totoong kondisyon, hindi 100% ng enerhiya mula sa solar panels ang nagiging kuryente. May 20% pagkawala (system derating) dahil sa: (1) sobrang init ng panahon sa bubong na nagpapababa ng efficiency ng panels (~8-10%), (2) resistance sa solar wires at kable (~2-3%), (3) alikabok at dumi sa salamin (~3-5%), at (4) DC-to-AC conversion efficiency ng inverter (~2-4%). Kaya hinahati sa 80% (0.80) para makuha ang totoong kailangan nating laki ng PV.',
      answerEn:
        'Real-world solar systems experience ~20% derating due to: (1) high ambient & roof temperature lowering panel efficiency (~8-10%), (2) DC & AC cable resistance (~2-3%), (3) dust/soiling (~3-5%), and (4) inverter DC-to-AC conversion losses (~2-4%). Dividing by 80% ensures the system reliably generates your target kWh.',
    },
    {
      id: 'inverter_size_faq',
      icon: Cpu,
      questionTl: 'Ano ang pagkakaiba ng 6 kW (Swak at Malakas) vs 4 kW (Saktuhan) na Inverter?',
      questionEn: 'What is the difference between a 6 kW (Optimal) and 4 kW (Budget) Inverter?',
      answerTl:
        'Para sa 5.43 kWp na Solar PV: Ang 6 kW Inverter ay "swak at malakas" dahil walang "inverter clipping" (kayang ilabas ang buong peak wattage kahit napakatirik ng araw), mas malamig ang takbo, at may allowance pa kapag nagdagdag ka ng 1 hanggang 4 panels o baterya sa hinaharap. Samantala, ang 4 kW Inverter naman ay "saktuhan lang" (DC/AC ratio na ~1.35x) na mas mura ang presyo ngunit may kaunting clipping sa tanghaling tapat.',
      answerEn:
        'For a 5.43 kWp PV system: A 6 kW inverter eliminates clipping, runs at cooler temperatures, and provides expansion headroom for more panels or batteries. A 4 kW inverter operates at a standard ~1.35x DC/AC oversizing ratio with lower upfront cost but slight noon clipping.',
    },
    {
      id: 'net_metering_faq',
      icon: Zap,
      questionTl: 'Paano gumagana ang Net Metering sa Meralco / Electric Cooperatives?',
      questionEn: 'How does Net Metering work with Meralco & Electric Cooperatives in the Philippines?',
      answerTl:
        'Sa ilalim ng Philippine Renewable Energy Act (RA 9513), ang mga kabahayan na may solar na hanggang 100 kW ay pwedeng mag-apply ng Net Metering. Ang labis na kuryente na hindi mo nagamit sa araw ay ie-export pabalik sa grid, at bibigyan ka ng credit (bawas) sa iyong monthly Meralco bill batay sa blended generation rate.',
      answerEn:
        'Under Philippine RA 9513 (Renewable Energy Act), systems up to 100 kW can export excess daytime power to the grid. Your distribution utility (e.g. Meralco, VECO) applies generation-cost credits against your night-time consumption.',
    },
    {
      id: 'roof_orientation_faq',
      icon: Compass,
      questionTl: 'Saan direksyon dapat nakaharap ang Solar Panels sa Pilipinas?',
      questionEn: 'Which roof direction and tilt angle is best in the Philippines?',
      answerTl:
        'Dahil ang Pilipinas ay nasa Northern Hemisphere (Hilagang Hemispero sa pagitan ng 4° hanggang 21° North Latitude), ang pinakamainam na direksyon ay nakaharap sa TIMOG (True South) na may tilt angle na 10° hanggang 15°. Kung hindi maiiwasan, ang Silangan (East) at Kanluran (West) ay maganda rin.',
      answerEn:
        'Since the Philippines is in the Northern Hemisphere (4° to 21° N Latitude), the optimal orientation is facing TRUE SOUTH with a 10° to 15° tilt angle for maximum yearly solar harvest and self-cleaning rain drainage.',
    },
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="solar-faq-and-guide" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {isTl ? 'Gabay at Madalas Itanong (Solar FAQ sa Pilipinas)' : 'Solar Engineering Guide & FAQ'}
          </h2>
          <p className="text-xs text-slate-400">
            {isTl
              ? 'Lahat ng kailangan mong malaman tungkol sa PSH, inverter sizing, at solar sa Pilipinas'
              : 'Everything you need to know about PSH, inverter sizing, and Philippine solar standards'}
          </p>
        </div>
      </div>

      {/* Accordion FAQ list */}
      <div className="space-y-2.5 pt-1">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          const Icon = faq.icon;
          return (
            <div
              key={faq.id}
              className={`rounded-xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-slate-800/80 border-amber-500/30'
                  : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isOpen ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-200">
                    {isTl ? faq.questionTl : faq.questionEn}
                  </span>
                </div>

                <div className="text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-700/60 leading-relaxed bg-slate-900/40">
                  <p>{isTl ? faq.answerTl : faq.answerEn}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
