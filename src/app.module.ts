import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

const dbStrng =
  'mongodb+srv://marcio:marcio@sandbox.r5laqxf.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(dbStrng),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
