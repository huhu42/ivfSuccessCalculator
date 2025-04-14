import { Test, TestingModule } from '@nestjs/testing';
import { FormulaParserService } from './formula-parser.service';
import * as fs from 'fs';

// Mock fs module
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('FormulaParserService', () => {
  let service: FormulaParserService;
  
  // Sample CSV content for testing
  const mockCsvContent = `param_using_own_eggs,param_attempted_ivf_previously,param_is_reason_for_infertility_known,cdc_formula,formula_intercept,formula_age_linear_coefficient,formula_age_power_coefficient,formula_age_power_factor,formula_bmi_linear_coefficient,formula_bmi_power_coefficient,formula_bmi_power_factor,formula_tubal_factor_true_value,formula_tubal_factor_false_value,formula_male_factor_infertility_true_value,formula_male_factor_infertility_false_value,formula_endometriosis_true_value,formula_endometriosis_false_value,formula_ovulatory_disorder_true_value,formula_ovulatory_disorder_false_value,formula_diminished_ovarian_reserve_true_value,formula_diminished_ovarian_reserve_false_value,formula_uterine_factor_true_value,formula_uterine_factor_false_value,formula_other_reason_true_value,formula_other_reason_false_value,formula_unexplained_infertility_true_value,formula_unexplained_infertility_false_value,formula_prior_pregnancies_0_value,formula_prior_pregnancies_1_value,formula_prior_pregnancies_2+_value,formula_prior_live_births_0_value,formula_prior_live_births_1_value,formula_prior_live_births_2+_value
TRUE,FALSE,TRUE,1-3,-6.8392144,0.3347309,-0.0003249,2.763313,0.06997997,-0.0015045,2,0.09373152,0,0.24104423,0,0.02773216,0,0.27949598,0,-0.5780511,0,-0.1354896,0,-0.1018557,0,0.2252616,0,0,0.03514055,-0.0059006,0,0.15787934,0.03077479
TRUE,FALSE,FALSE,4-6,-7.5545223,0.37931798,-0.0003752,2.763313,0.08057661,-0.0015304,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.02240271,-0.054699,0,0.16421628,0.05435658
TRUE,TRUE,TRUE,7-8,-8.102508,0.37506646,-0.0003171,2.784619,0.04565965,-0.0008793,2,0.06858044,0,0.23958731,0,-0.0128023,0,0.27559287,0,-0.4806452,0,-0.1649105,0,-0.0770044,0,0.18150326,0,0,0.15884291,0.16420575,0,0.32698183,0.21325721`;

  beforeEach(async () => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock the readFile implementation
    require('fs/promises').readFile.mockResolvedValue(mockCsvContent);
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormulaParserService],
    }).compile();

    service = module.get<FormulaParserService>(FormulaParserService);
    
    // Manually call onModuleInit since it's not automatically called in tests
    await service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loadFormulas', () => {
    it('should load and parse CSV data correctly', async () => {
      // Trigger loadFormulas (already called in onModuleInit)
      await service.loadFormulas();
      
      // Check if readFile was called
      expect(require('fs/promises').readFile).toHaveBeenCalled();
      
      // Check if formulas were loaded
      const formulas = service.getFormulas();
      expect(formulas).toHaveLength(3);
      
      // Check if data was parsed correctly
      expect(formulas[0].cdc_formula).toBe('1-3');
      expect(formulas[0].formula_intercept).toBe(-6.8392144);
      expect(formulas[0].param_using_own_eggs).toBe(true);
      expect(formulas[0].param_attempted_ivf_previously).toBe(false);
    });
  });

  describe('findMatchingFormula', () => {
    it('should find formula for using own eggs, no previous IVF, known reason', () => {
      const formula = service.findMatchingFormula(true, false, true);
      expect(formula).toBeDefined();
      expect(formula?.cdc_formula).toBe('1-3');
    });

    it('should find formula for using own eggs, no previous IVF, unknown reason', () => {
      const formula = service.findMatchingFormula(true, false, false);
      expect(formula).toBeDefined();
      expect(formula?.cdc_formula).toBe('4-6');
    });

    it('should find formula for using own eggs, previous IVF, known reason', () => {
      const formula = service.findMatchingFormula(true, true, true);
      expect(formula).toBeDefined();
      expect(formula?.cdc_formula).toBe('7-8');
    });

    it('should return null when no matching formula is found', () => {
      // Test with a combination not in our mock data
      const formula = service.findMatchingFormula(false, false, false);
      expect(formula).toBeNull();
    });
  });
});