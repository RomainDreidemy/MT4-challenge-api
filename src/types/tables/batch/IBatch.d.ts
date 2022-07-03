export interface IBatch {
  id: number;
  name: string;
}

export type IBatchCreate = Omit<IBatch, 'id'>;
export type IBatchUpdate = Partial<IBatchCreate>;
export type IBatchRO = Readonly<IBatch>;
