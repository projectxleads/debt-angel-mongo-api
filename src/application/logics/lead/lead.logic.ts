import LeadDto from '../../models/dtos/lead.dto';
import Lead from '../../../domain/lead/lead.model';

class LeadLogic {
  public getLeads(): Promise<LeadDto[]> {
    return Lead.find().then((leads: any) => {
      return leads as LeadDto[];
    });
  }

  public addLead(leadDto: LeadDto) {
    const lead = new Lead({
      firstName: leadDto.firstName,
      lastName: leadDto.lastName,
      phoneNumber: leadDto.phoneNumber,
      email: leadDto.email,
      alternativePhoneNumber: leadDto.alternativePhoneNumber,
      communication: leadDto.communication
    })
    return lead.save();
  }
}

export default LeadLogic;