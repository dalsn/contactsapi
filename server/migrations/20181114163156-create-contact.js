/* eslint quote-props: 0 */
/* eslint sort-keys: 0 */
/* eslint max-len: 0 */

"use strict";

module.exports = {
    "up": (queryInterface, Sequelize) => queryInterface.createTable("Contacts", {
        "id": {
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true,
            "type": Sequelize.INTEGER
        },
        "userId": {
            "type": Sequelize.INTEGER
        },
        "name": {
            "type": Sequelize.STRING
        },
        "email": {
            "type": Sequelize.STRING
        },
        "phone": {
            "type": Sequelize.STRING
        },
        "starred": {
            "type": Sequelize.BOOLEAN,
            "defaultValue": false
        },
        "createdAt": {
            "allowNull": false,
            "type": Sequelize.DATE
        },
        "updatedAt": {
            "allowNull": false,
            "type": Sequelize.DATE
        }
    }),
    "down": (queryInterface) => queryInterface.dropTable("Contacts")
};
