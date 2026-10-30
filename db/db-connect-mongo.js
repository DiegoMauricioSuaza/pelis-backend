const mongoose = require('mongoose');

const getConection = async () => {

    try {

        const url = 'mongodb+srv://admin-mongo-iud:VcYM1wedQTnkKEzt@atlascluster.2jsep.mongodb.net/'

        await mongoose.connect(url);
        console.log('conexión exitosa');

    } catch (error) {
        console.log(error);
        
    }
    
}

module.exports = {
    getConection
}

