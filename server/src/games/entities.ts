import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

// type Status = 'pending' | 'started' | 'finished'

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer')
  round: number

  @Column('text')
  winner: User

  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer')
  positionX: number

  @Column('integer')
  positionY: number

  @Column('integer')
  velocityX: number

  @Column('integer')
  velocityY: number

  @Column('integer')
  mass: 30

  @Column('integer')
  puckSize: 52

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game
}

@Entity()
@Index(['game', 'user'], {unique:true})
export class Puck extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer')
  positionX: number

  @Column('integer')
  positionY: number

  @Column('integer')
  velocityX: number

  @Column('integer')
  velocityY: number

  @Column('integer')
  mass: 15

  @Column('integer')
  puckSize: 25

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game
}