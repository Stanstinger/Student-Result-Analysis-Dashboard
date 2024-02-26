export class Student {
  constructor(
    public studentId: number,
    public studentName: string,
    public studentClass: string,
    public grades: {
      subject: string;
      term1: number;
      term2: number;
      term3: number;
    }[]
  ) {}
}
