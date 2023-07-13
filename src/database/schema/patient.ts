import { DYNAMODB_TABLE_NAMES } from '../constants';

const Patient = {
  AttributeDefinitions: [
    {
      AttributeName: 'Id',
      AttributeType: 'S',
    },
    {
      AttributeName: 'Name',
      AttributeType: 'S',
    },
    {
      AttributeName: 'Identifier',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'Id',
      KeyType: 'HASH',
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'Disease-index',
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        WriteCapacityUnits: 5,
        ReadCapacityUnits: 5,
      },
      KeySchema: [
        {
          KeyType: 'HASH',
          AttributeName: 'Identifier',
        },
        {
          KeyType: 'RANGE',
          AttributeName: 'Name',
        },
      ],
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  TableName: DYNAMODB_TABLE_NAMES.PATIENT_TABLE,
  StreamSpecification: {
    StreamEnabled: true,
    StreamViewType: 'NEW_AND_OLD_IMAGES', // Add this line to specify the stream view type
  },
};

export const PatientSchema = Patient;
