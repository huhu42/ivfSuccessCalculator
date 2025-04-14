import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'csv-parse/sync';
import { IvfFormula } from './models/formula.model';

@Injectable()
export class FormulaParserService implements OnModuleInit {
  private formulas: IvfFormula[] = [];

  async onModuleInit() {
    await this.loadFormulas();
  }

  async loadFormulas() {
    try {
      const filePath = join(process.cwd(), '..', 'ivf_success_formulas.csv');
      const fileContent = await readFile(filePath, 'utf8');
      
      // Parse CSV content
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        cast: (value, context) => {
          // Convert string values to appropriate types
          if (value === 'TRUE') return true;
          if (value === 'FALSE') return false;
          if (value === 'N/A') return 'N/A';
          
          // Try to convert to number if it looks like a number
          if (value !== '' && !isNaN(Number(value))) {
            return Number(value);
          }
          
          return value;
        },
      });
      
      this.formulas = records;
      console.log(`Loaded ${this.formulas.length} formulas`);
    } catch (error) {
      console.error('Error loading formulas:', error);
    }
  }

  getFormulas(): IvfFormula[] {
    return this.formulas;
  }

  findMatchingFormula(
    usingOwnEggs: boolean,
    attemptedIvfPreviously: boolean,
    isReasonForInfertilityKnown: boolean,
  ): IvfFormula | null {
    // Convert attempted_ivf_previously to 'N/A' if needed for donor eggs
    const attemptedIvf = !usingOwnEggs ? 'N/A' : attemptedIvfPreviously;

    const formula = this.formulas.find(
      (f) =>
        f.param_using_own_eggs === usingOwnEggs &&
        f.param_attempted_ivf_previously === attemptedIvf &&
        f.param_is_reason_for_infertility_known === isReasonForInfertilityKnown,
    );

    return formula || null;
  }
}