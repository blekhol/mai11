import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UjJatekDTO } from './UjJatek.dto.js';
import { Jatek } from './Jatek.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get("macskak")
  @Render("macskak")
  async macskak() {
    return {
      macskak: await this.appService.getMacskak(),
    }
  }

  @Get("jatekok")
  @Render("jatekok")
  async jatekok() {
    return {
      jatekok: await this.appService.getJatekok()
    }
  }

  @Get("macskaKeres")
  @Render("macskaKeres")
  async macskaKeres(@Query("szemszin") szemszin: string) {
    return {
      eredmeny: await this.appService.macskaKeres(szemszin)
    }
  }

  @Get("ujJatek")
  @Render("ujJatek")
  ujJatek() {}

  @Post("ujJatek")
  @Render("ujJatek")
  async ujJatekPost(@Body() body: UjJatekDTO) {
    let j: Jatek;
    try {
      j = await this.appService.createJatek(body.nev);
    }
    catch {
      return {
        success: false
      }
    }

    return {
        success: true,
        jatek: j
    }
  }
}
