import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('analytics')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('dashboard')
  async getDashboardData() {
    return this.appService.getDashboardData();
  }

  @Get('reports/:type')
  async getReport(@Param('type') type: string, @Query() query: any) {
    return this.appService.getReport(type, query);
  }

  @Post('events')
  async trackEvent(@Body() eventData: any) {
    return this.appService.trackEvent(eventData);
  }

  // Kafka message handlers
  @MessagePattern('analytics.track')
  async handleTrackEvent(@Payload() data: any) {
    return this.appService.trackEvent(data);
  }

  @MessagePattern('analytics.report')
  async handleGetReport(@Payload() data: { type: string; query: any }) {
    return this.appService.getReport(data.type, data.query);
  }

  @MessagePattern('analytics.dashboard')
  async handleGetDashboard(@Payload() data: any) {
    return this.appService.getDashboardData();
  }
} 