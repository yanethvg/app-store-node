import { Router, Request, Response } from "express";
import Postgres from "../postgres/Postgres";

const router = Router();

router.get("/heroes", (req: Request, res: Response) => {
  const query = `
    SELECT * 
    FROM users;
  `;
  Postgres.ejecutarQuery(query, (err: any, users: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    } else {
      res.json({
        ok: true,
        users,
      });
    }
  });
});

export default router;
