import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IvfCalculatorModule } from './ivf-calculator/ivf-calculator.module';

@Module({
  imports: [IvfCalculatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}