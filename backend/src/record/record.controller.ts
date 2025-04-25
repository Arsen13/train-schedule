import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { JwtAuthGuard } from 'src/auth/guards/auth/jwt-auth.guard';
import { CreateUpdateRecordDto } from './dto/create-update-record.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('record')
@UseGuards(JwtAuthGuard)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createRecordDto: CreateUpdateRecordDto, @Req() req) {
    return this.recordService.create(createRecordDto, +req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.recordService.findAll(+req.user.id);
  }

  @Get('pagination')
  @UsePipes(new ValidationPipe())
  findAllPaginated(@Req() req, @Query() query: PaginationDto) {
    return this.recordService.findAllPaginated(query, +req.user.id);
  }

  @Get('search/:station')
  search(@Param('station') arrivalStation: string, @Req() req) {
    return this.recordService.search(arrivalStation, +req.user.id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Body() updateRecordDto: CreateUpdateRecordDto,
    @Param('id') recordId: string,
    @Req() req,
  ) {
    return this.recordService.update(updateRecordDto, +recordId, +req.user.id);
  }

  @Delete(':id')
  delete(@Param('id') recordId: string, @Req() req) {
    return this.recordService.delete(+recordId, +req.user.id);
  }
}
