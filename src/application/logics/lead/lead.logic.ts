import LeadDto from "../../models/dtos/lead.dto";
import Lead from "../../../domain/lead/lead.model";
import { EmailLogic } from "../email/email.logic";
import { stringify } from "querystring";

class LeadLogic {
  private emailLogic: EmailLogic;

  constructor() {
    this.emailLogic = new EmailLogic();
  }
  public getLeads(): Promise<LeadDto[]> {
    return Lead.find().then((leads: any) => {
      return leads as LeadDto[];
    });
  }

  public addLead = (leadDto: LeadDto) => {
    const lead = new Lead({
      firstName: leadDto.firstName,
      lastName: leadDto.lastName,
      phoneNumber: leadDto.phoneNumber,
      email: leadDto.email,
      alternativePhoneNumber: leadDto.alternativePhoneNumber,
      communication: leadDto.communication,
      termsAndCondition: leadDto.termsAndCondition,
      createdDate: new Date(),
      updatedDate: new Date()
    });
    return lead.save().then((lead: any) => {
      const html =
        `<h1>Lead Added:</h1>
      <p>First Name: ${lead.firstName}</p>
      <p>Last Name: ${lead.lastName}</p>
      <p>Phone Number: ${lead.phoneNumber}</p>
      <p>Email: ${lead.email}</p>
      <p>Alternative Phone Numnber: ${lead.alternativePhoneNumber}</p>
      <p>Communication Type: ${lead.communication}</p>
      <p>Terms and Condition: ${lead.termsAndCondition}</p>
      <p>Updated Date: ${lead.updatedDate}</p>
      <p>Created Date: ${lead.createdDate}</p>
      `
      this.emailLogic.sendEmail("mihendricks1@gmail.com", "info@debtangels.co.za",
        `New Lead: ${lead.firstName} ${lead.lastName}`, html);
      return lead;
    });
  }
}

export default LeadLogic;
