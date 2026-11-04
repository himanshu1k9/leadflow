import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('leads')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  getLeads() {
    return {
      success: true,
      message: 'Leads fetched successfully.',
      data: [
        {
          id: 1,
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
          status: 'new',
        },
        {
          id: 2,
          name: 'Priya Patel',
          email: 'priya@example.com',
          status: 'converted',
        },
      ],
    };
  }
}
