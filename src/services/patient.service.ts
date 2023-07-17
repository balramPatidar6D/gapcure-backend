import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import DynamoDB from '@/database/dynamoDB';
import { PatientByIdParamsDto } from '@/dtos/patient.dto';
import { PatientInfOutput, PatientUpdateOutPut, patientParamsInput } from '@/interfaces/patient.interface';

class PatientService {
  public dynamoDB = new DynamoDB();

  public async findPatientById(params: PatientByIdParamsDto): Promise<PatientUpdateOutPut> {
    if (isEmpty(params?.Key?.id)) throw new HttpException(400, 'Incorrect patient id');
    const result = await this.dynamoDB.getItemById(params);
    if (result) {
      const patientData: PatientInfOutput = {
        resourceType: result.resourceType,
        identifier: result.Identifier,
        active: result.patientData.active,
        name: result.name,
        telecom: result.patientData.telecom,
        gender: result.patientData.gender,
        birthDate: result.patientData.birthDate,
        deceasedBoolean: result.patientData.deceasedBoolean,
        address: result.patientData.address,
        maritalStatus: result.patientData.maritalStatus,
        multipleBirthBoolean: result.patientData.multipleBirthBoolean,
        photo: result.patientData.photo,
        contact: result.patientData.contact,
        communication: result.patientData.communication,
        generalPractitioner: result.patientData.generalPractitioner,
        managingOrganization: result.patientData.managingOrganization,
        link: result.patientData.link,
      };

      const output: PatientUpdateOutPut = {
        patient: patientData,
      };
      return output;
    }
  }

  public async updatePatient(params: patientParamsInput): Promise<PatientUpdateOutPut> {
    const result = await this.dynamoDB.updateItem(params);
    const patientData: PatientInfOutput = {
      resourceType: result.resourceType,
      identifier: result.Identifier,
      active: result.patientData.active,
      name: result.name,
      telecom: result.patientData.telecom,
      gender: result.patientData.gender,
      birthDate: result.patientData.birthDate,
      deceasedBoolean: result.patientData.deceasedBoolean,
      address: result.patientData.address,
      maritalStatus: result.patientData.maritalStatus,
      multipleBirthBoolean: result.patientData.multipleBirthBoolean,
      photo: result.patientData.photo,
      contact: result.patientData.contact,
      communication: result.patientData.communication,
      generalPractitioner: result.patientData.generalPractitioner,
      managingOrganization: result.patientData.managingOrganization,
      link: result.patientData.link,
    };

    const output: PatientUpdateOutPut = {
      patient: patientData,
    };
    return output;
  }
}

export default PatientService;
