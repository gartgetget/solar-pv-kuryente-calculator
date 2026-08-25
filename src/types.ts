export type Language = 'tl' | 'en';

export interface PhilippineRegion {
  id: string;
  name: string;
  islandGroup: 'Luzon' | 'Visayas' | 'Mindanao';
  psh: number; // Peak Sun Hours (kWh/m²/day)
  description: string;
}

export interface SolarCalculationInputs {
  monthlyKwh: number;
  daysInMonth: number;
  psh: number;
  systemLossPercent: number; // e.g. 20 for 20% loss (80% efficiency)
  panelWattage: number; // e.g. 650W
  electricityRatePhp: number; // e.g. 16 PHP/kWh
  systemCostPerWattPhp: number; // e.g. 42 PHP/Watt turnkey
  targetOffsetPercent: number; // e.g. 100%
  selectedRegionId?: string;
  roofType: 'gi_sheet' | 'tegula_tile' | 'concrete_deck' | 'ground_mount';
}

export interface SolarCalculationResults {
  // Step 1: Input
  monthlyKwh: number;
  targetKwh: number;
  
  // Step 2: Daily consumption
  dailyKwh: number;
  
  // Step 3: Base PV without loss
  basePvKw: number;
  
  // Step 4: Final PV size with system loss
  recommendedPvKw: number;
  recommendedPvWatts: number;
  
  // Step 5: Inverter sizing
  recommendedInverterKw: number; // "Malakas / Swak / Expansion" (e.g. 6kW for 5.43kWp)
  minimumInverterKw: number; // "Saktuhan / Budget" (e.g. 4kW or 5kW)
  inverterDcAcRatio: number; // DC to AC ratio
  
  // Panel Count & Physical Size
  standardSystemSizeKw: number;
  numberOfPanels: number;
  actualInstalledPvKw: number;
  roofAreaSqMeters: number;
  roofAreaSqFeet: number;
  
  // Generation Estimates
  dailySolarGenKwh: number;
  monthlySolarGenKwh: number;
  annualSolarGenKwh: number;
  
  // Financial & Savings
  currentMonthlyBillPhp: number;
  estimatedNewMonthlyBillPhp: number;
  monthlySavingsPhp: number;
  annualSavingsPhp: number;
  estimatedSystemCostPhp: number;
  paybackPeriodYears: number;
  twentyFiveYearSavingsPhp: number;
  
  // Environmental Impact
  co2OffsetKgYear: number;
  treesPlantedEquivalent: number;
}

export interface ApplianceItem {
  id: string;
  nameTl: string;
  nameEn: string;
  category: 'cooling' | 'kitchen' | 'entertainment' | 'lighting' | 'other';
  wattage: number;
  hoursPerDay: number;
  quantity: number;
  iconName: string;
}

export interface CalculationPreset {
  id: string;
  titleTl: string;
  titleEn: string;
  descriptionTl: string;
  descriptionEn: string;
  monthlyKwh: number;
  electricityRate: number;
  badge?: string;
}
