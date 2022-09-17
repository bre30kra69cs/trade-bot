import {Controller, Get, Post, Put, Delete} from '@nestjs/common';

@Controller('profiles')
export class ProfilesController {
  @Get()
  getProfiles() {}

  @Get(':id')
  getProfile() {}

  @Post()
  createProfile() {}

  @Put(':id')
  updateProfile() {}

  @Delete(':id')
  deleteProfile() {}
}
