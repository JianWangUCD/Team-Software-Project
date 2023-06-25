import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();

app.use(cors());

app.get('/products', (req, res) =>{
    res.send(data.products);
})

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = data.products.find((product) => product.id === productId);
    res.send(product);
  });

app.post('/product', (req, res) => {
    const newProduct = req.body; 
  
    // 在这里将新产品添加到 data.products 中
    data.products.push(newProduct);
  
    res.status(201).send(newProduct); // 发送添加的产品作为响应
  });


app.get('/', (req, res) =>{
    res.send('Server is ready');
});

const port = process.env.PORT || 8000

app.listen(port, ()=> {
    console.log(`Server at http://localhost:${port}`);
});