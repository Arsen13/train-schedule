import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth/jwt-auth.guard';

@Controller('record')
@UseGuards(JwtAuthGuard)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createRecordDto: CreateRecordDto, @Req() req) {
    return this.recordService.create(createRecordDto, +req.user.id);
  }
}
