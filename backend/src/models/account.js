module.exports = (sequelize, DataTypes) => {

    const Account = sequelize.define('Account', {
        email : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    //Não mostrar senha
    Account.prototype.toJSON = function(){
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    return Account;
}