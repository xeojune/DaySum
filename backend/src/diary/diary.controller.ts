import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import type { CreateDiaryDto } from './diary.service';
import type { DiaryDocument } from './schema/diary.schema';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  // POST /diary - Create a new diary entry
  @Post()
  async createDiary(@Body() createDiaryDto: CreateDiaryDto): Promise<DiaryDocument> {
    return this.diaryService.createDiary(createDiaryDto);
  }

  // GET /diary/user/:userId - Get all diaries for a user
  @Get('user/:userId')
  async getDiariesByUserId(@Param('userId') userId: string): Promise<DiaryDocument[]> {
    return this.diaryService.getDiariesByUserId(userId);
  }

  // GET /diary/user/:userId/date - Get diaries for a user on a specific date
  @Get('user/:userId/date')
  async getDiariesByUserIdAndDate(
    @Param('userId') userId: string,
    @Query('date') date: string,
  ): Promise<DiaryDocument[]> {
    const dateObj = new Date(date);
    return this.diaryService.getDiariesByUserIdAndDate(userId, dateObj);
  }

  // GET /diary/:id - Get a single diary entry by ID
  @Get(':id')
  async getDiaryById(@Param('id') id: string): Promise<DiaryDocument | null> {
    return this.diaryService.getDiaryById(id);
  }

  // PUT /diary/:id - Update a diary entry
  @Put(':id')
  async updateDiary(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<DiaryDocument | null> {
    return this.diaryService.updateDiary(id, title, content);
  }

  // DELETE /diary/:id - Delete a diary entry
  @Delete(':id')
  async deleteDiary(@Param('id') id: string): Promise<DiaryDocument | null> {
    return this.diaryService.deleteDiary(id);
  }
}