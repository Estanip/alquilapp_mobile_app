export enum StepStatus {
  DONE = 'DONE',
  PENDING = 'PENDING',
}

export interface IStep {
  _date: StepStatus;
  _schedule: StepStatus;
  _court: StepStatus;
  _players: StepStatus;
}

export interface IField {
  id: string;
  label: string;
  value: number | string;
}

export interface IMultiSelectField {
  id: string;
  name: string;
}

export enum SurfaceTypes_ES {
  CLAY = 'Polvo de Ladrillo',
  HARD = 'Cemento',
}

export enum SurfaceTypes_EN {
  CLAY = 'Clay',
  HARD = 'Hard',
}
export interface IFieldsData {
  courtNumbers: IField[];
  availableSchedules: IField[];
  players: IMultiSelectField[];
}
