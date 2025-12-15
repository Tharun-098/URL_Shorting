import dotenv from 'dotenv';

dotenv.config();

const env={
    mongodb_url:process.env.MONGODB_URL,
    port:process.env.PORT||3000,
    node_env:process.env.NODE_ENV||'development',
}

export default env;