import { Module } from '@nestjs/common';
import { FormatService } from './format.service';

@Module({
    exports:[FormatService]
})
export class FormatModule {}