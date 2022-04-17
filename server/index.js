const app = require('./app');
require('dotenv').config();
const PORT = 8000 

console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
    console.log(`Server is awake on port ${PORT}`);
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHANDLED REJECTION !!!!!!!')
    process.exit(1)
})

process.on('uncaughtException', err => {
    console.log(err.name, err.message)
    console.log('uncaughtException !!!!!!!')
    process.exit(1)
})

