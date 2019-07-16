import express from "express";

import LeadController from "../../controllers/api/lead.controller";

const leadRouter = express.Router();
const controller = new LeadController();

// leadRouter.get("", controller.getLead);
// leadRouter.get("/:id", controller.getLeadById);
leadRouter.post("", controller.addLead);
// leadRouter.put("/:id", controller.updateLead);
// leadRouter.delete("/:id", controller.deleteLead);

export default leadRouter;
