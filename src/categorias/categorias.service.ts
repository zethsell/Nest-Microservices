import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AtualizarCategoriaDto, CriarCategoriaDto } from './dtos';
import { Categoria } from './interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService,
  ) {}

  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncontrada) {
      throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
    }

    const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
    return await categoriaCriada.save();
  }

  async consultarTodasCategorias(): Promise<Categoria[]> {
    return await this.categoriaModel.find().populate('jogadores').exec();
  }

  async consultarCategoriaPeloId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    if (categoriaEncontrada) return categoriaEncontrada;
    throw new NotFoundException(`Categoria com ID ${categoria} não encontrada`);
  }

  async consultarCategoriaDoJogador(idJogador: any): Promise<Categoria> {
    const jogadores = await this.jogadoresService.consultarTodosJogadores();

    const jogadorFilter = jogadores.filter(
      (jogador) => jogador._id == idJogador,
    );

    if (jogadorFilter.length == 0) {
      throw new BadRequestException(`O id ${idJogador} não é um jogador!`);
    }

    return await this.categoriaModel
      .findOne()
      .where('jogadores')
      .in(idJogador)
      .exec();
  }

  async atualizarCategoria(
    categoria: string,
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<void> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria}, Não encontrada`);
    }
    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto })
      .exec();
  }

  async atribuirCategoriaJogador(params: string[]): Promise<void> {
    const categoria = params['categoria'];
    const idJogador = params['idJogador'];

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!categoriaEncontrada) {
      throw new BadRequestException(`Categoria ${categoria} não cadastrada!`);
    }

    const jogadorEncontrado =
      await this.jogadoresService.consultarJogadoresPeloId(idJogador);

    if (!jogadorEncontrado) {
      throw new BadRequestException(`Jogador não cadastrado!`);
    }

    const jogadorCadastradoCategoria = await this.categoriaModel
      .find({ categoria })
      .where('jogadores')
      .in(idJogador)
      .exec();

    if (jogadorCadastradoCategoria.length > 0) {
      throw new BadRequestException(
        `Jogador ${idJogador} já cadastrado na Categoria ${categoria}`,
      );
    }

    categoriaEncontrada.jogadores.push(idJogador);
    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: categoriaEncontrada })
      .exec();
  }

  async deletarCategoria(_id: string): Promise<any> {
    return await this.categoriaModel.findOneAndDelete({ _id }).exec();
  }
}
