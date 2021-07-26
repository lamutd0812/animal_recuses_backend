import { ROLES_KEY, ERole } from './../../config/constants';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Roles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);

export const Authorization = () =>
  applyDecorators(UseGuards(AuthGuard('jwt'), RolesGuard), ApiBearerAuth());
