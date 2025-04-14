export class CalculatorInputDto {
  // Formula selection parameters
  using_own_eggs: boolean;
  attempted_ivf_previously: boolean;
  is_reason_for_infertility_known: boolean;

  // Personal information
  age: number;
  weight_lbs: number;
  height_ft: number;
  height_in: number;

  // Infertility reasons
  tubal_factor: boolean;
  male_factor_infertility: boolean;
  endometriosis: boolean;
  ovulatory_disorder: boolean;
  diminished_ovarian_reserve: boolean;
  uterine_factor: boolean;
  other_reason: boolean;
  unexplained_infertility: boolean;

  // Prior pregnancies and live births
  prior_pregnancies: number;
  prior_live_births: number;
}