import { registerEnumType } from '@nestjs/graphql';

export enum ResourceStatus {
  ACTIVE,
  RESIGN,
}

registerEnumType(ResourceStatus, {
  name: 'ResourceStatus',
});
