/*
  Authors: 
  Luis Ignacio Ferro Salinas

  Description:
  The description of the table to use in dynamoDb to store the
  authentication status of the end clients.

  Last update: 
  June 10th
*/


import dynamodb from '../services/dynamoService';
import joi from 'joi';
import { PREFIX_TABLE } from '../config';

const CallsStatusModel = dynamodb.define('callsStatus', {
    hashKey: 'phoneNumber',
    timestamps: true,
    schema: {
        phoneNumber: joi.string().required(),
		authenticationType: joi.string().required()
    },
    tableName: `CallsStatus${PREFIX_TABLE}`
});

dynamodb.createTables((err: any)=>{
    if(err)
        return console.log("Error creating dynamoDB table", err);
    console.log("dynamoDB table created succesfully");
});

export default CallsStatusModel;