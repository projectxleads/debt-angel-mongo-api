import { Request, Response } from 'express';

class LeadController {
  getLead(req: Request, res: Response) {
    res.send('Get Leads');
  }  

  getLeadById(req: Request, res: Response) {
    res.send('Get Lead by id');
  }

  addLead(req: Request, res: Response) {
    res.status(201).location(req.url).send('Add Lead');
  }

  updateLead(req: Request, res: Response) {
    res.send('Update Lead');
  }

  deleteLead(req: Request, res: Response) {
    res.send('Delete Lead');
  }
}

export default LeadController;