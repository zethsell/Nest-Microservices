import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

const dbStrng =
  'mongodb+srv://marcio:marcio@sandbox.r5laqxf.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [MongooseModule.forRoot(dbStrng), JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
