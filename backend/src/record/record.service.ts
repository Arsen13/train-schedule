import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll(userId: number) {
    return await this.prisma.trainRecord.findMany({ where: { userId } });
  }

  async delete(recordId: number, userId: number) {
    const isRecordExist = await this.prisma.trainRecord.findFirst({
      where: {
        id: recordId,
        userId,
      },
    });

    if (!isRecordExist) throw new NotFoundException('Record not found');

    await this.prisma.trainRecord.delete({
      where: {
        id: recordId,
        userId,
      },
    });

    return { message: 'Record was successfully deleted' };
  }
}
