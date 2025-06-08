import { Controller, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update company data' })
  @ApiResponse({ status: 201, description: 'Company data saved successfully' })
  async createOrUpdateCompany(@Body() companyData: any) {
    console.log('📊 Company Controller - Create/Update:', companyData);
    return this.companyService.createOrUpdateCompany(companyData);
  }

  @Post('read')
  @ApiOperation({ summary: 'Get company data by user email' })
  @ApiResponse({
    status: 200,
    description: 'Company data retrieved successfully',
  })
  async getCompany(@Body() body: { userEmail: string }) {
    console.log('📊 Company Controller - Get company for:', body.userEmail);
    return this.companyService.getCompanyByUserEmail(body.userEmail);
  }
}
