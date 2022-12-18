export interface StudentPersonalInfo {
  email_address: string | null;
  first_name: string | null;
  last_name: string | null;
}

export interface ParsedStudentInfo extends StudentPersonalInfo {
  [key: string]: any;
}

export interface TransformedStudentInfo extends StudentPersonalInfo {
  challenges: number[];
}

interface Challenge {
  [key: string]: string | null;
}

export type StudentPersonalInfoKey = keyof StudentPersonalInfo;
