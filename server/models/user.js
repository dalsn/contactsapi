/* eslint quote-props: 0 */
/* eslint sort-keys: 0 */
/* eslint max-len: 0 */
/* eslint no-sync: 1 */
/* eslint no-magic-numbers: 1 */

"use strict";

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }

    });

    return User;

};
