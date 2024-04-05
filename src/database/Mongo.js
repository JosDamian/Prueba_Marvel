const mongoose = require('mongoose');

const dbName = 'marvel';
const connectionString = `mongodb+srv://usuario1:pass01@cluster0.xh92tf2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Conexion a Atlas por mongoose.
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a Atlas'))
.catch(err => console.error('Error al conectar a Atlas', err));

module.exports = mongoose;