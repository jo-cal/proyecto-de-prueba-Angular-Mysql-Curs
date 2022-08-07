import {Request, Response} from 'express';

import pool from '../database';

class GamesControllers {

   public async list ( req:Request, res: Response) {
        const games = await pool.query('SELECT * FROM gamess');
        //pool.query('DESCRIBE gamess' );
        //res.json({ text:'listando juego' + req.params [0]});
        res.json(games);
    } 

    public async getOne (req: Request, res: Response): Promise<any>{
        //res.json({ text:'este es el juego' + req.params.id});
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM gamess WHERE id = ?' , [id]);
        //console.log(games);
        //res.json({text:'juego encontrado'});
        if (games.length > 0) {
            return res.json(games[0]);
        } 
        res.status(404).json({ text: 'ese juego no existe'});


    }

    public async  create (req: Request, res: Response): Promise<void> {
        //console.log(req.body);
       await pool.query('INSERT INTO gamess set ?', [req.body]);
        res.json(  { message: 'juego guardado'  }  );
    }

    public async update (req: Request, res: Response): Promise<void>{
        //res.json(  { text: 'actualizando un juego' + req.params.id } );
        const { id } = req.params;
        await pool.query('UPDATE gamess set ? WHERE id = ?' , [req.body, id]);
        res.json({ message:'el juego fue actualizado'});
    } 

    public async delete (req: Request, res: Response):Promise<void> {
        //res.json( { text: 'eliminando un juego' + req.params.id } );
        const { id } = req.params;
        await pool.query('DELETE  FROM gamess WHERE id = ?' , [id]);
        res.json({ message:'el juego fue eliminado'});

    }

    
}

const gamesControllers = new GamesControllers();
export default gamesControllers;



