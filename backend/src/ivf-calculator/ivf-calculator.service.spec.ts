import { Test, TestingModule } from '@nestjs/testing';
import { IvfCalculatorService } from './ivf-calculator.service';
import { FormulaParserService } from './formula-parser.service';
import { IvfFormula } from './models/formula.model';
import { CalculatorInputDto } from './models/calculator-input.dto';

describe('IvfCalculatorService', () => {
  let service: IvfCalculatorService;
  let formulaParserService: FormulaParserService;

  // Mock formulas based on the CSV data
  const mockFormulas: IvfFormula[] = [
    {
      param_using_own_eggs: true,
      param_attempted_ivf_previously: false,
      param_is_reason_for_infertility_known: true,
      cdc_formula: '1-3',
      formula_intercept: -6.8392144,
      formula_age_linear_coefficient: 0.3347309,
      formula_age_power_coefficient: -0.0003249,
      formula_age_power_factor: 2.763313,
      formula_bmi_linear_coefficient: 0.06997997,
      formula_bmi_power_coefficient: -0.0015045,
      formula_bmi_power_factor: 2,
      formula_tubal_factor_true_value: 0.09373152,
      formula_tubal_factor_false_value: 0,
      formula_male_factor_infertility_true_value: 0.24104423,
      formula_male_factor_infertility_false_value: 0,
      formula_endometriosis_true_value: 0.02773216,
      formula_endometriosis_false_value: 0,
      formula_ovulatory_disorder_true_value: 0.27949598,
      formula_ovulatory_disorder_false_value: 0,
      formula_diminished_ovarian_reserve_true_value: -0.5780511,
      formula_diminished_ovarian_reserve_false_value: 0,
      formula_uterine_factor_true_value: -0.1354896,
      formula_uterine_factor_false_value: 0,
      formula_other_reason_true_value: -0.1018557,
      formula_other_reason_false_value: 0,
      formula_unexplained_infertility_true_value: 0.2252616,
      formula_unexplained_infertility_false_value: 0,
      formula_prior_pregnancies_0_value: 0,
      formula_prior_pregnancies_1_value: 0.03514055,
      'formula_prior_pregnancies_2+_value': -0.0059006,
      formula_prior_live_births_0_value: 0,
      formula_prior_live_births_1_value: 0.15787934,
      'formula_prior_live_births_2+_value': 0.03077479,
    },
    {
      param_using_own_eggs: true,
      param_attempted_ivf_previously: false,
      param_is_reason_for_infertility_known: false,
      cdc_formula: '4-6',
      formula_intercept: -7.5545223,
      formula_age_linear_coefficient: 0.37931798,
      formula_age_power_coefficient: -0.0003752,
      formula_age_power_factor: 2.763313,
      formula_bmi_linear_coefficient: 0.08057661,
      formula_bmi_power_coefficient: -0.0015304,
      formula_bmi_power_factor: 2,
      formula_tubal_factor_true_value: 0,
      formula_tubal_factor_false_value: 0,
      formula_male_factor_infertility_true_value: 0,
      formula_male_factor_infertility_false_value: 0,
      formula_endometriosis_true_value: 0,
      formula_endometriosis_false_value: 0,
      formula_ovulatory_disorder_true_value: 0,
      formula_ovulatory_disorder_false_value: 0,
      formula_diminished_ovarian_reserve_true_value: 0,
      formula_diminished_ovarian_reserve_false_value: 0,
      formula_uterine_factor_true_value: 0,
      formula_uterine_factor_false_value: 0,
      formula_other_reason_true_value: 0,
      formula_other_reason_false_value: 0,
      formula_unexplained_infertility_true_value: 0,
      formula_unexplained_infertility_false_value: 0,
      formula_prior_pregnancies_0_value: 0,
      formula_prior_pregnancies_1_value: 0.02240271,
      'formula_prior_pregnancies_2+_value': -0.054699,
      formula_prior_live_births_0_value: 0,
      formula_prior_live_births_1_value: 0.16421628,
      'formula_prior_live_births_2+_value': 0.05435658,
    },
    {
      param_using_own_eggs: true,
      param_attempted_ivf_previously: true,
      param_is_reason_for_infertility_known: true,
      cdc_formula: '7-8',
      formula_intercept: -8.102508,
      formula_age_linear_coefficient: 0.37506646,
      formula_age_power_coefficient: -0.0003171,
      formula_age_power_factor: 2.784619,
      formula_bmi_linear_coefficient: 0.04565965,
      formula_bmi_power_coefficient: -0.0008793,
      formula_bmi_power_factor: 2,
      formula_tubal_factor_true_value: 0.06858044,
      formula_tubal_factor_false_value: 0,
      formula_male_factor_infertility_true_value: 0.23958731,
      formula_male_factor_infertility_false_value: 0,
      formula_endometriosis_true_value: -0.0128023,
      formula_endometriosis_false_value: 0,
      formula_ovulatory_disorder_true_value: 0.27559287,
      formula_ovulatory_disorder_false_value: 0,
      formula_diminished_ovarian_reserve_true_value: -0.4806452,
      formula_diminished_ovarian_reserve_false_value: 0,
      formula_uterine_factor_true_value: -0.1649105,
      formula_uterine_factor_false_value: 0,
      formula_other_reason_true_value: -0.0770044,
      formula_other_reason_false_value: 0,
      formula_unexplained_infertility_true_value: 0.18150326,
      formula_unexplained_infertility_false_value: 0,
      formula_prior_pregnancies_0_value: 0,
      formula_prior_pregnancies_1_value: 0.15884291,
      'formula_prior_pregnancies_2+_value': 0.16420575,
      formula_prior_live_births_0_value: 0,
      formula_prior_live_births_1_value: 0.32698183,
      'formula_prior_live_births_2+_value': 0.21325721,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IvfCalculatorService,
        {
          provide: FormulaParserService,
          useValue: {
            findMatchingFormula: jest.fn(),
            getFormulas: jest.fn().mockReturnValue(mockFormulas),
          },
        },
      ],
    }).compile();

    service = module.get<IvfCalculatorService>(IvfCalculatorService);
    formulaParserService = module.get<FormulaParserService>(FormulaParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('BMI calculation', () => {
    it('should correctly calculate BMI', () => {
      // Access the private method using type assertion
      const calculateBMI = (service as any).calculateBMI;
      
      // Test with example from README: 5'8" person weighing 150 lbs
      const bmi = calculateBMI(150, 5, 8);
      expect(bmi).toBeCloseTo(22.8, 1);
    });
  });

  describe('Example case 1: Using Own Eggs / Did Not Previously Attempt IVF / Known Infertility Reason', () => {
    it('should calculate success rate close to 62.21%', () => {
      // Mock the findMatchingFormula to return the first formula
      jest.spyOn(formulaParserService, 'findMatchingFormula').mockReturnValue(mockFormulas[0]);
      
      const input: CalculatorInputDto = {
        using_own_eggs: true,
        attempted_ivf_previously: false,
        is_reason_for_infertility_known: true,
        age: 32,
        weight_lbs: 150,
        height_ft: 5,
        height_in: 8,
        tubal_factor: false,
        male_factor_infertility: false,
        endometriosis: true,
        ovulatory_disorder: true,
        diminished_ovarian_reserve: false,
        uterine_factor: false,
        other_reason: false,
        unexplained_infertility: false,
        prior_pregnancies: 1,
        prior_live_births: 1,
      };

      const result = service.calculateSuccessRate(input);
      
      // Expected value from README example: 62.21%
      expect(result.success_rate).toBeCloseTo(62.21, 1);
      expect(result.formula_used).toBe('1-3');
    });
  });

  describe('Example case 2: Using Own Eggs / Did Not Previously Attempt IVF / Unknown Infertility Reason', () => {
    it('should calculate success rate close to 59.83%', () => {
      // Mock the findMatchingFormula to return the second formula
      jest.spyOn(formulaParserService, 'findMatchingFormula').mockReturnValue(mockFormulas[1]);
      
      const input: CalculatorInputDto = {
        using_own_eggs: true,
        attempted_ivf_previously: false,
        is_reason_for_infertility_known: false,
        age: 32,
        weight_lbs: 150,
        height_ft: 5,
        height_in: 8,
        tubal_factor: false,
        male_factor_infertility: false,
        endometriosis: false,
        ovulatory_disorder: false,
        diminished_ovarian_reserve: false,
        uterine_factor: false,
        other_reason: false,
        unexplained_infertility: false,
        prior_pregnancies: 1,
        prior_live_births: 1,
      };

      const result = service.calculateSuccessRate(input);
      
      // Expected value from README example: 59.83%
      expect(result.success_rate).toBeCloseTo(59.83, 1);
      expect(result.formula_used).toBe('4-6');
    });
  });

  describe('Example case 3: Using Own Eggs / Previously Attempted IVF / Known Infertility Reason', () => {
    it('should calculate success rate close to 40.89%', () => {
      // Mock the findMatchingFormula to return the third formula
      jest.spyOn(formulaParserService, 'findMatchingFormula').mockReturnValue(mockFormulas[2]);
      
      const input: CalculatorInputDto = {
        using_own_eggs: true,
        attempted_ivf_previously: true,
        is_reason_for_infertility_known: true,
        age: 32,
        weight_lbs: 150,
        height_ft: 5,
        height_in: 8,
        tubal_factor: true,
        male_factor_infertility: false,
        endometriosis: false,
        ovulatory_disorder: false,
        diminished_ovarian_reserve: true,
        uterine_factor: false,
        other_reason: false,
        unexplained_infertility: false,
        prior_pregnancies: 1,
        prior_live_births: 1,
      };

      const result = service.calculateSuccessRate(input);
      
      // Expected value from README example: 40.89%
      expect(result.success_rate).toBeCloseTo(40.89, 1);
      expect(result.formula_used).toBe('7-8');
    });
  });
});