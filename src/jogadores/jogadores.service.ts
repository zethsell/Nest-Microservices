import { Injectable, NotFoundException } from '@nestjs/common';
import { AtualizarJogadorDto, CriarJogadorDto } from './dtos';
import { Jogador } from './interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadoresPeloId(_id: string): Promise<Jogador> {
    const jogador = await this.jogadorModel.findOne({ _id }).exec();
    if (jogador) return jogador;
    throw new NotFoundException(`Jogador com ID ${_id} não encontrado`);
  }

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDto })
      .exec();
  }

  async deletarJogador(_id: string): Promise<any> {
    return await this.jogadorModel.findOneAndDelete({ _id }).exec();
  }
}
