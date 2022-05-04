import dynamodb from 'dynamodb';
import { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '../config';

//Configuración del SDK de AWS
dynamodb.AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    //unicamente necesario si se usa lab learner
    region: AWS_REGION
});

export default dynamodb;