const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (request, response)  {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create (request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

//Vai gerar uma id aleatorio criptografada em letras e numeros.
    const id = crypto.randomBytes(4).toString('HEX');

    // Vai comunicar com a tabela do bando de dados
    await connection('ongs').insert({
         // tabela
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

    return response.json({ id });
    }
}