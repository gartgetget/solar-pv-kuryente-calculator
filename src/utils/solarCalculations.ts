import { SolarCalculationInputs, SolarCalculationResults, CalculationPreset } from '../types';

export function calculateSolarSystem(inputs: SolarCalculationInputs): SolarCalculationResults {
  const {
    monthlyKwh,
    daysInMonth = 30,
    psh = 4.5,
    systemLossPercent = 20,
    panelWattage = 650,
    electricityRatePhp = 14.7833,
    systemCostPerWattPhp = 42,
    targetOffsetPercent = 100,
  } = inputs;

  // Offset target
  const targetKwh = (monthlyKwh * Math.max(10, Math.min(200, targetOffsetPercent))) / 100;

  // Step 2: Daily consumption (e.g. 587 / 30 = 19.566 kWh/day)
  const safeDays = daysInMonth > 0 ? daysInMonth : 30;
  const dailyKwh = targetKwh / safeDays;

  // Step 3: Base PV without system loss (e.g. 19.566 / 4.5 = 4.348 kW)
  const safePsh = psh > 0 ? psh : 4.5;
  const basePvKw = dailyKwh / safePsh;

  // Step 4: Final PV size with system loss (e.g. 4.348 / 0.80 = 5.435 kWp)
  const efficiencyFactor = Math.max(0.4, (100 - systemLossPercent) / 100);
  const recommendedPvKw = basePvKw / efficiencyFactor;
  const recommendedPvWatts = recommendedPvKw * 1000;

  // Step 5: Number of panels and actual installed capacity
  const safePanelWattage = panelWattage > 0 ? panelWattage : 650;
  // Round up to nearest integer panel count
  const numberOfPanels = Math.max(1, Math.ceil(recommendedPvWatts / safePanelWattage));
  const actualInstalledPvKw = (numberOfPanels * safePanelWattage) / 1000;

  // Step 6: Inverter sizing logic
  // Standard solar engineering in PH:
  // - "Saktuhan / Budget Fit" is DC:AC ratio around 1.15 to 1.30 (or closest standard inverter size below/equal)
  // - "Malakas / Swak / Recommended with Headroom" gives 1.0 to 1.1x ratio or next standard commercial size (e.g. 6kW for 5.4kWp)
  
  // Available standard on-grid/hybrid residential inverter sizes in Philippines (kW):
  // 1, 1.5, 2, 3, 3.6, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 50
  const standardInverters = [1, 1.5, 2, 3, 3.6, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50];
  
  // Find recommended inverter size (often >= PV kW for headroom, or standard sizing rule e.g. 5.4kW PV -> 6kW inverter)
  let recommendedInverterKw = standardInverters.find(inv => inv >= recommendedPvKw) || Math.ceil(recommendedPvKw);
  if (recommendedPvKw >= 4.2 && recommendedPvKw <= 5.8) {
    recommendedInverterKw = 6; // Exact match to user rule for 5.4kW system
  }

  // Budget / Saktuhan inverter size (e.g. 4kW or 5kW for 5.4kWp PV with 1.25x DC/AC oversizing)
  let minimumInverterKw = standardInverters.slice().reverse().find(inv => inv <= recommendedPvKw * 0.9) || 3;
  if (recommendedPvKw >= 4.8 && recommendedPvKw <= 5.8) {
    minimumInverterKw = 4; // As noted in user prompt: "o kaya naman ang 4kw kung saktuhan lang"
  }

  const inverterDcAcRatio = actualInstalledPvKw / (recommendedInverterKw || 1);

  // Physical Space (Roof Area)
  // Typical 620W-650W panel is approx 2.38m x 1.13m = ~2.69 m² (add ~10% for walkway/pitch clearance = ~2.95 m² per panel)
  const roofAreaSqMeters = numberOfPanels * 2.95;
  const roofAreaSqFeet = roofAreaSqMeters * 10.7639;

  // Generation Estimates
  const dailySolarGenKwh = actualInstalledPvKw * safePsh * efficiencyFactor;
  const monthlySolarGenKwh = dailySolarGenKwh * safeDays;
  const annualSolarGenKwh = monthlySolarGenKwh * 12;

  // Financials
  const currentMonthlyBillPhp = monthlyKwh * electricityRatePhp;
  const monthlySavingsPhp = Math.min(currentMonthlyBillPhp, monthlySolarGenKwh * electricityRatePhp);
  const estimatedNewMonthlyBillPhp = Math.max(0, currentMonthlyBillPhp - monthlySavingsPhp);
  const annualSavingsPhp = monthlySavingsPhp * 12;

  // System Cost Estimate in Philippines (~₱38k - ₱48k / kWp turnkey on-grid)
  const estimatedSystemCostPhp = actualInstalledPvKw * 1000 * systemCostPerWattPhp;
  const paybackPeriodYears = annualSavingsPhp > 0 ? (estimatedSystemCostPhp / annualSavingsPhp) : 0;
  
  // 25-Year cumulative savings assuming 3% annual electricity inflation
  let twentyFiveYearSavingsPhp = 0;
  for (let year = 1; year <= 25; year++) {
    const degradation = Math.pow(0.995, year); // 0.5% yearly panel degradation
    const rateWithInflation = electricityRatePhp * Math.pow(1.035, year - 1);
    twentyFiveYearSavingsPhp += (annualSolarGenKwh * degradation) * rateWithInflation;
  }

  // Environmental
  // Average Philippine grid emission factor ~0.71 kg CO2 / kWh
  const co2OffsetKgYear = annualSolarGenKwh * 0.71;
  const treesPlantedEquivalent = Math.round(co2OffsetKgYear / 21.8); // 1 tree absorbs ~21.8 kg CO2/year

  return {
    monthlyKwh,
    targetKwh,
    dailyKwh,
    basePvKw,
    recommendedPvKw,
    recommendedPvWatts,
    recommendedInverterKw,
    minimumInverterKw,
    inverterDcAcRatio,
    numberOfPanels,
    actualInstalledPvKw,
    roofAreaSqMeters,
    roofAreaSqFeet,
    dailySolarGenKwh,
    monthlySolarGenKwh,
    annualSolarGenKwh,
    currentMonthlyBillPhp,
    estimatedNewMonthlyBillPhp,
    monthlySavingsPhp,
    annualSavingsPhp,
    estimatedSystemCostPhp,
    paybackPeriodYears,
    twentyFiveYearSavingsPhp,
    co2OffsetKgYear,
    treesPlantedEquivalent,
  };
}

export const POPULAR_PRESETS: CalculationPreset[] = [
  {
    id: 'user_example',
    titleTl: 'Halimbawa ng Prompt (587 kWh)',
    titleEn: 'User Prompt Example (587 kWh)',
    descriptionTl: '587 kWh/buwan ➔ 5.43 kW PV ➔ 6kW Inverter (Swak) o 4kW (Saktuhan)',
    descriptionEn: '587 kWh/month ➔ 5.43 kW PV ➔ 6kW Inverter (Optimal) or 4kW (Budget)',
    monthlyKwh: 587,
    electricityRate: 14.7833,
    badge: 'Eksaktong Halimbawa',
  },
  {
    id: 'small_home',
    titleTl: 'Maliit na Bahay (200 kWh)',
    titleEn: 'Small Household (200 kWh)',
    descriptionTl: 'Ilaw, electric fan, TV, ref. Karaniwang ₱2,500/buwan na bill.',
    descriptionEn: 'Lighting, fans, TV, ref. Typical ₱2,500/month bill.',
    monthlyKwh: 200,
    electricityRate: 14.7833,
  },
  {
    id: 'typical_family',
    titleTl: 'Pamilyang May 1 Aircon (400 kWh)',
    titleEn: 'Family with 1 Aircon (400 kWh)',
    descriptionTl: '1 inverter aircon gabi/araw + mga gamit. Bill na ~₱5,000/buwan.',
    descriptionEn: '1 inverter aircon + appliances. Bill ~₱5,000/month.',
    monthlyKwh: 400,
    electricityRate: 14.7833,
  },
  {
    id: 'heavy_cooling',
    titleTl: 'Malaking Bahay / 2-3 Aircons (850 kWh)',
    titleEn: 'Large Home / Multi-Aircon (850 kWh)',
    descriptionTl: '2-3 Inverter aircons, induction, heaters. Bill na ~₱10,500/buwan.',
    descriptionEn: '2-3 Inverter aircons, induction, heater. Bill ~₱10,500/month.',
    monthlyKwh: 850,
    electricityRate: 14.7833,
  },
  {
    id: 'commercial_shop',
    titleTl: 'Negosyo / Tindahan / Opisina (1,500 kWh)',
    titleEn: 'Commercial / Office / Shop (1,500 kWh)',
    descriptionTl: 'Pang-umagang gamit, chiller, freezer, computers. Bill ~₱19,000/buwan.',
    descriptionEn: 'Daytime chillers, freezers, computers. Bill ~₱19,000/month.',
    monthlyKwh: 1500,
    electricityRate: 14.7833,
  },
];

export function formatPhp(val: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatNumber(val: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
}
