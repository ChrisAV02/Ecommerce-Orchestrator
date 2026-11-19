import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

export interface HealthResponse {
  readonly status: 'ok';
  readonly service: string;
}

// ! IMPLEMENTAR Y EVALUAR MÁS A FUTURO
@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  @ApiOperation({ summary: 'Comprueba que el proceso responde' })
  @ApiOkResponse({
    description: 'Proceso activo. No implica que las dependencias estén sanas.',
    schema: {
      example: { status: 'ok', service: 'ecommerce-orchestrator' },
    },
  })
  check(): HealthResponse {
    return {
      status: 'ok',
      service: this.config.get<string>(
        'app.serviceName',
        'ecommerce-orchestrator',
      ),
    };
  }
}
