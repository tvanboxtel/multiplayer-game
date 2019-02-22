"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const DefaultNamingStrategy_1 = require("typeorm/naming-strategy/DefaultNamingStrategy");
const StringUtils_1 = require("typeorm/util/StringUtils");
const entity_1 = require("../src/users/entity");
const entities_1 = require("../src/games/entities");
class CustomNamingStrategy extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    tableName(targetName, userSpecifiedName) {
        return userSpecifiedName ? userSpecifiedName : StringUtils_1.snakeCase(targetName) + 's';
    }
    columnName(propertyName, customName, embeddedPrefixes) {
        return StringUtils_1.snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
    }
    columnNameCustomized(customName) {
        return customName;
    }
    relationName(propertyName) {
        return StringUtils_1.snakeCase(propertyName);
    }
}
exports.default = () => typeorm_1.createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/air-hockey',
    entities: [
        entity_1.default,
        entities_1.Game,
        entities_1.Player,
        entities_1.Puck
    ],
    synchronize: true,
    logging: true,
    namingStrategy: new CustomNamingStrategy()
})
    .then(_ => console.log('Connected to Postgres with TypeORM'));
//# sourceMappingURL=db.js.map