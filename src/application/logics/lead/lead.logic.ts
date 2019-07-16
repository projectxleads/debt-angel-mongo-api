import LeadDto from "../../models/dtos/lead.dto";
import Lead from "../../../domain/lead/lead.model";
import { EmailLogic } from "../email/email.logic";
import { GmailLogic } from "../email/gmail.logic";
import { stringify } from "querystring";

class LeadLogic {
  private emailLogic: EmailLogic;
  private gmailLogic: GmailLogic;

  constructor() {
    this.emailLogic = new EmailLogic();
    this.gmailLogic = new GmailLogic();
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
    return lead.save().then((result: any) => {
      const html =
        `<h1>Lead Added:</h1>
      <p>First Name: ${result.firstName}</p>
      <p>Last Name: ${result.lastName}</p>
      <p>Phone Number: ${result.phoneNumber}</p>
      <p>Email: ${result.email}</p>
      <p>Alternative Phone Numnber: ${result.alternativePhoneNumber}</p>
      <p>Communication Type: ${result.communication}</p>
      <p>Terms and Condition: ${result.termsAndCondition}</p>
      <p>Updated Date: ${result.updatedDate}</p>
      <p>Created Date: ${result.createdDate}</p>
      `;
      this.emailLogic.sendEmail("salesourcect@gmail.com", "info@debtangels.co.za",
        `New Lead: ${result.firstName} ${result.lastName}`, html);
      return result;
    });
  }
}

export default LeadLogic;
