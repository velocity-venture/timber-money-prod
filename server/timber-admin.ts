import { Router, Request, Response } from "express";
import path from "path";

export const timberAdminRouter = Router();

function isAllowed(req: Request){
  const k = process.env.ADMIN_VIEW_KEY || "";
  return !!k && req.headers["x-admin-key"] === k;
}

timberAdminRouter.get("/timber", (req: Request, res: Response) => {
  if (!isAllowed(req)) return res.status(401).send("Unauthorized");
  const filePath = path.join(process.cwd(), "client/public/admin/timber.html");
  res.sendFile(filePath);
});
