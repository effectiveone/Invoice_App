import { Controller, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { KontrahenciService } from './kontrahenci.service';

@ApiTags('kontrahenci')
@Controller('kontrahenci')
export class KontrahenciController {
  constructor(private readonly kontrahenciService: KontrahenciService) {}

  @Post()
  @ApiOperation({ summary: 'Dodawanie nowego kontrahenta' })
  @ApiResponse({ status: 201, description: 'Kontrahent został dodany' })
  async createKontrahent(@Body() kontrahentData: any): Promise<any> {
    console.log(
      '🔧 KontrahenciController - POST /kontrahenci:',
      kontrahentData,
    );
    return this.kontrahenciService.createKontrahent(kontrahentData);
  }

  @Post('read')
  @ApiOperation({ summary: 'Pobieranie kontrahentów użytkownika' })
  @ApiResponse({ status: 200, description: 'Lista kontrahentów' })
  async getKontrahenci(@Body() userData: any): Promise<any> {
    console.log('📥 KontrahenciController - POST /kontrahenci/read:', userData);
    const { userEmail } = userData;
    return this.kontrahenciService.getKontrahenciByUserEmail(userEmail);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Aktualizacja kontrahenta' })
  @ApiResponse({ status: 200, description: 'Kontrahent zaktualizowany' })
  async updateKontrahent(
    @Param('id') id: string,
    @Body() updateData: any,
  ): Promise<any> {
    console.log(
      '🔧 KontrahenciController - PUT /kontrahenci/' + id,
      updateData,
    );
    return this.kontrahenciService.updateKontrahent(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuwanie kontrahenta' })
  @ApiResponse({ status: 200, description: 'Kontrahent usunięty' })
  async deleteKontrahent(
    @Param('id') id: string,
    @Body() userData: any,
  ): Promise<any> {
    console.log(
      '🗑️ KontrahenciController - DELETE /kontrahenci/' + id,
      userData,
    );
    const { userEmail } = userData;
    return this.kontrahenciService.deleteKontrahent(id, userEmail);
  }
}
