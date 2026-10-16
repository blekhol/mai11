import { Injectable } from '@nestjs/common';
import mysql from "mysql2/promise"
import { Macska } from './Macska.js';
import { Jatek } from './Jatek.js';

const mySqlConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "macsa_db"
})

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getMacskak() {
    const [results] = await mySqlConnection.execute(
      "SELECT id,suly,szem_szin,gazdi_id,jatek_id FROM macskak");
    
    return results as Macska[];
  }

  async getJatekok() {
    const [results] = await mySqlConnection.execute(
      "SELECT id,nev FROM jatekok");
    
    return results as Jatek[];
  }

  async macskaKeres(szemszin: string) {
    const [results] = await mySqlConnection.execute(
      "SELECT id,suly,szem_szin,gazdi_id,jatek_id FROM macskak WHERE szem_szin LIKE CONCAT('%', ?, '%')",
      [szemszin]
    )

    return results as Macska[];
  }

  async createJatek(nev: string) {
    await mySqlConnection.execute(
      "INSERT INTO jatekok(nev) VALUES (?)",
      [nev]
    )
  }
}