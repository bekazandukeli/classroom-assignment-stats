import {
  ParsedStudentInfo,
  StudentPersonalInfoKey,
  TransformedStudentInfo,
} from '../types/Student';

export function transformStudentData(obj: ParsedStudentInfo) {
  const newObj: TransformedStudentInfo = {
    email_address: '',
    first_name: '',
    last_name: '',
    challenges: [],
  };

  for (let key in obj) {
    if (key.includes('challenge') && newObj.challenges) {
      newObj.challenges = [
        ...newObj.challenges,
        obj[key]
      ];
    } else if (key.includes('challenge')) {
      newObj.challenges = [obj[key]];
    } else {
      newObj[key as StudentPersonalInfoKey] = obj[key];
    }
  }

  return newObj;
}
