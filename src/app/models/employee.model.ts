export interface Employee {
    employeeId: string;
    name: string;
    contactNumber: string;
    email: string;
    gender: string;
    skills: Skill[];
}
export interface Skill {
    skillName: string;
    experience: string;
}
