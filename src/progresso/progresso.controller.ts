import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('progresso')
export class ProgressoController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProgresso(@Request() req) {
    return { message: `Bem-vindo, usuário ${req.user.sub}` };
  }
}