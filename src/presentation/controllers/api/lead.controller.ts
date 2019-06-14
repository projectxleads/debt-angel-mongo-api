import { Request, Response } from "express";
import LeadLogic from "../../../application/logics/lead/lead.logic";

const logic = new LeadLogic();

class LeadController {
  public getLead(req: Request, res: Response) {
    logic.getLeads().then((result) => {
      res.send(result);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  }

  public getLeadById(req: Request, res: Response) {
    res.send("Get Lead by id");
  }

  public addLead(req: Request, res: Response) {
    logic.addLead(req.body).then((result) => {
      res.status(201).location(req.url).send(result);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  }

  public updateLead(req: Request, res: Response) {
    res.send("Update Lead");
  }

  public deleteLead(req: Request, res: Response) {
    res.send("Delete Lead");
  }
}

export default LeadController;
