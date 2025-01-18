import express, { Request, Response } from 'express';
import cors from 'cors';
import {products} from './data/products';


const app = express();
const PORT = 3000;


app.use(cors());
// Define a route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/products',(req: Request, res: Response) => {
    res.json(products);
})



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
