"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("../users/entity");
let Game = class Game extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Game.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Game.prototype, "round", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", entity_1.default)
], Game.prototype, "winner", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Player, player => player.game, { eager: true }),
    __metadata("design:type", Array)
], Game.prototype, "players", void 0);
Game = __decorate([
    typeorm_1.Entity()
], Game);
exports.Game = Game;
let Player = class Player extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Player.prototype, "positionX", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Player.prototype, "positionY", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Player.prototype, "velocityX", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Player.prototype, "velocityY", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Player.prototype, "mass", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Player.prototype, "puckSize", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.default, user => user.players),
    __metadata("design:type", entity_1.default)
], Player.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => Game, game => game.players),
    __metadata("design:type", Game)
], Player.prototype, "game", void 0);
Player = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Index(['game', 'user'], { unique: true })
], Player);
exports.Player = Player;
let Puck = class Puck extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Puck.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Puck.prototype, "positionX", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Puck.prototype, "positionY", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Puck.prototype, "velocityX", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Puck.prototype, "velocityY", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Puck.prototype, "mass", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Puck.prototype, "puckSize", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.default, user => user.players),
    __metadata("design:type", entity_1.default)
], Puck.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => Game, game => game.players),
    __metadata("design:type", Game)
], Puck.prototype, "game", void 0);
Puck = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Index(['game', 'user'], { unique: true })
], Puck);
exports.Puck = Puck;
//# sourceMappingURL=entities.js.map