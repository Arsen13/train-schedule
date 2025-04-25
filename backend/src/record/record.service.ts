import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class RecordService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecordDto: CreateRecordDto, userId: number) {
    const isRecordExist = await this.prisma.trainRecord.findFirst({
      where: {
        trainNumber: createRecordDto.trainNumber,
        departureStation: createRecordDto.departureStation,
        arrivalStation: createRecordDto.arrivalStation,
        departureTime: createRecordDto.departureTime,
      },
    });
    if (isRecordExist) {
      throw new BadRequestException('This record already exist');
    }

    return await this.prisma.trainRecord.create({
      data: {
        userId,
        trainNumber: createRecordDto.trainNumber,
        railwayNumber: createRecordDto.railwayNumber,
        departureStation: createRecordDto.departureStation,
        arrivalStation: createRecordDto.arrivalStation,
        arrivalTime: createRecordDto.arrivalTime,
        departureTime: createRecordDto.departureTime,
      },
    });
  }
}
