export interface CourseType {
    name: string
    exerciseCount: number
  }

export interface CourseInterface extends CoursePartBase {
    description: string;
}

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  
  interface CoursePartBasic extends CourseInterface {
    //description: string;
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackround extends CourseInterface {
    //description: string;
    backroundMaterial: string;
    kind: "background"
  }

  interface CourseSpecial extends CourseInterface {
    requirements: string[];
    kind: "special"
  }


  
 export type CoursePart = CoursePartBasic | CourseSpecial | CoursePartGroup | CoursePartBackround ;