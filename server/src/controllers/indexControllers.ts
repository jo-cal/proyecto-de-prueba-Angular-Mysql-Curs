import {Request, Response} from 'express';

class IndexControllers {

   public index (req:Request, res:Response) {  
        res.json(  {  Text:  'API IS /api/games'  }  );
    } 
    
}

export const indexControllers = new IndexControllers();


