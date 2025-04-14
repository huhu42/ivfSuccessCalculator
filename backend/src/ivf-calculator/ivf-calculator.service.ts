import { Injectable } from '@nestjs/common';
import { FormulaParserService } from './formula-parser.service';
import { CalculatorInputDto } from './models/calculator-input.dto';
import { IvfFormula } from './models/formula.model';

@Injectable()
export class IvfCalculatorService {
  constructor(private readonly formulaParserService: FormulaParserService) {}

  calculateSuccessRate(input: CalculatorInputDto): { 
    success_rate: number; 
    formula_used: string;
    score: number;
  } {
    // Find the matching formula
    const formula = this.formulaParserService.findMatchingFormula(
      input.using_own_eggs,
      input.attempted_ivf_previously,
      input.is_reason_for_infertility_known,
    );

    if (!formula) {
      throw new Error('No matching formula found for the provided parameters');
    }

    // Calculate BMI
    const bmi = this.calculateBMI(input.weight_lbs, input.height_ft, input.height_in);
    
    // Calculate success score
    const score = this.calculateScore(input, bmi, formula);
    
    // Convert score to success rate
    const successRate = this.convertScoreToSuccessRate(score);
    
    return {
      success_rate: successRate,
      formula_used: formula.cdc_formula,
      score: score
    };
  }

  private calculateBMI(weightLbs: number, heightFeet: number, heightInches: number): number {
    // Convert height to inches
    const totalHeightInches = heightFeet * 12 + heightInches;
    
    // BMI formula: weight (lb) / [height (in)]² x 703
    return (weightLbs / (totalHeightInches * totalHeightInches)) * 703;
  }

  private calculateScore(input: CalculatorInputDto, bmi: number, formula: IvfFormula): number {
    let score = 0;
    
    // Add intercept
    score += formula.formula_intercept;
    
    // Add age components
    score += formula.formula_age_linear_coefficient * input.age;
    score += formula.formula_age_power_coefficient * Math.pow(input.age, formula.formula_age_power_factor);
    
    // Add BMI components
    score += formula.formula_bmi_linear_coefficient * bmi;
    score += formula.formula_bmi_power_coefficient * Math.pow(bmi, formula.formula_bmi_power_factor);
    
    // Add infertility reason values
    score += input.tubal_factor 
      ? formula.formula_tubal_factor_true_value 
      : formula.formula_tubal_factor_false_value;
      
    score += input.male_factor_infertility 
      ? formula.formula_male_factor_infertility_true_value 
      : formula.formula_male_factor_infertility_false_value;
      
    score += input.endometriosis 
      ? formula.formula_endometriosis_true_value 
      : formula.formula_endometriosis_false_value;
      
    score += input.ovulatory_disorder 
      ? formula.formula_ovulatory_disorder_true_value 
      : formula.formula_ovulatory_disorder_false_value;
      
    score += input.diminished_ovarian_reserve 
      ? formula.formula_diminished_ovarian_reserve_true_value 
      : formula.formula_diminished_ovarian_reserve_false_value;
      
    score += input.uterine_factor 
      ? formula.formula_uterine_factor_true_value 
      : formula.formula_uterine_factor_false_value;
      
    score += input.other_reason 
      ? formula.formula_other_reason_true_value 
      : formula.formula_other_reason_false_value;
      
    score += input.unexplained_infertility 
      ? formula.formula_unexplained_infertility_true_value 
      : formula.formula_unexplained_infertility_false_value;
    
    // Add prior pregnancies value
    if (input.prior_pregnancies === 0) {
      score += formula.formula_prior_pregnancies_0_value;
    } else if (input.prior_pregnancies === 1) {
      score += formula.formula_prior_pregnancies_1_value;
    } else {
      score += formula['formula_prior_pregnancies_2+_value'];
    }
    
    // Add prior live births value
    if (input.prior_live_births === 0) {
      score += formula.formula_prior_live_births_0_value;
    } else if (input.prior_live_births === 1) {
      score += formula.formula_prior_live_births_1_value;
    } else {
      score += formula['formula_prior_live_births_2+_value'];
    }
    
    return score;
  }

  private convertScoreToSuccessRate(score: number): number {
    // success_rate = e^score / (1 + e^score)
    const expScore = Math.exp(score);
    const successRate = expScore / (1 + expScore);
    
    // Convert to percentage (rounded to 2 decimal places)
    return Math.round(successRate * 10000) / 100;
  }
}