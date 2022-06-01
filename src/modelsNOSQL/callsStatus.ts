import dynamodb from '../services/dynamoService';
import joi from 'joi';
import { PREFIX_TABLE } from '../config';

const CallsStatusModel = dynamodb.define('callsStatus',{
    hashKey:'phoneNumber',
    timestamps:true,
    schema:{
        phoneNumber: joi.string().required(),
		authenticationType: joi.string().required()
    },
    tableName:`CallsStatus${PREFIX_TABLE}`
});


dynamodb.createTables((err:any)=>{
    if(err)
        return console.log('Error al crear la tabla',err);
    console.log('Tabla creada exitosamente');
});

export default CallsStatusModel;