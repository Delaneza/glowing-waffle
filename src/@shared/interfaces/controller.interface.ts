import { Request, Response } from "express";

export interface Controller {
  (req: Request, res: Response, next: any): Promise<any>;
}