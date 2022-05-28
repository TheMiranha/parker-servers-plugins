const app = require('express')();
const cors = require('cors');
const Github = require('./Github')
app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send({status: 'OK!'});
});

app.get('/plugins', async(req, res) => {
	var plugins = await Github.getPlugins();
	res.send(plugins);
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor aberto!')
})