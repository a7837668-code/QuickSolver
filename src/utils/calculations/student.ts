// Student calculation utilities

export interface CourseGradeItem {
  id: string;
  name: string;
  credits: number;
  gradePoint: number;
}

export type GPACourse = CourseGradeItem;

export interface SemesterItem {
  id: string;
  semesterName: string;
  credits: number;
  gpa: number;
}

export type SemesterData = SemesterItem;

export interface WeightedAssessment {
  id: string;
  name: string;
  weight: number; // percentage, e.g. 30%
  score: number; // percentage obtained, e.g. 85%
}

export type GradeComponent = WeightedAssessment;

export const GRADE_POINTS: Record<string, number> = {
  'A+': 4.33,
  A: 4.0,
  'A-': 3.67,
  'B+': 3.33,
  B: 3.0,
  'B-': 2.67,
  'C+': 2.33,
  C: 2.0,
  'C-': 1.67,
  'D+': 1.33,
  D: 1.0,
  F: 0.0,
};

export function calculateGPA(courses: CourseGradeItem[]): {
  success: boolean;
  gpa?: number;
  totalCredits?: number;
  totalGradePoints?: number;
  error?: string;
} {
  if (!courses || courses.length === 0) {
    return { success: false, error: 'Please add at least one course.' };
  }

  let totalCredits = 0;
  let totalGradePoints = 0;

  for (const course of courses) {
    if (isNaN(course.credits) || isNaN(course.gradePoint)) {
      return { success: false, error: 'Invalid numeric value in course credit or grade point.' };
    }
    if (course.credits < 0) {
      return { success: false, error: 'Course credits cannot be negative.' };
    }
    if (course.gradePoint < 0 || course.gradePoint > 4.33) {
      return { success: false, error: 'Grade points must be between 0.00 and 4.33.' };
    }

    totalCredits += course.credits;
    totalGradePoints += course.credits * course.gradePoint;
  }

  if (totalCredits === 0) {
    return { success: false, error: 'Total credits cannot be zero.' };
  }

  const gpa = totalGradePoints / totalCredits;
  return {
    success: true,
    gpa: Number(gpa.toFixed(3)),
    totalCredits,
    totalGradePoints: Number(totalGradePoints.toFixed(2)),
  };
}

export function calculateCGPA(semesters: SemesterItem[]): {
  success: boolean;
  cgpa?: number;
  totalCredits?: number;
  error?: string;
} {
  if (!semesters || semesters.length === 0) {
    return { success: false, error: 'Please enter at least one semester.' };
  }

  let totalCredits = 0;
  let totalPoints = 0;

  for (const sem of semesters) {
    if (isNaN(sem.credits) || isNaN(sem.gpa)) {
      return { success: false, error: 'Invalid numeric value in credits or semester GPA.' };
    }
    if (sem.credits < 0) {
      return { success: false, error: 'Credits cannot be negative.' };
    }
    if (sem.gpa < 0 || sem.gpa > 10.0) {
      return { success: false, error: 'GPA must be non-negative and realistic (up to 10.0 scale).' };
    }

    totalCredits += sem.credits;
    totalPoints += sem.credits * sem.gpa;
  }

  if (totalCredits === 0) {
    return { success: false, error: 'Total credits across semesters cannot be zero.' };
  }

  const cgpa = totalPoints / totalCredits;
  return {
    success: true,
    cgpa: Number(cgpa.toFixed(3)),
    totalCredits,
  };
}

export function calculateMarksPercentage(
  obtainedMarks: number,
  totalMarks: number
): {
  success: boolean;
  percentage?: number;
  letterGrade?: string;
  isPassing?: boolean;
  error?: string;
} {
  if (isNaN(obtainedMarks) || isNaN(totalMarks)) {
    return { success: false, error: 'Please enter valid numbers.' };
  }
  if (totalMarks <= 0) {
    return { success: false, error: 'Total marks must be greater than zero.' };
  }
  if (obtainedMarks < 0) {
    return { success: false, error: 'Obtained marks cannot be negative.' };
  }
  if (obtainedMarks > totalMarks) {
    return { success: false, error: 'Obtained marks cannot exceed maximum total marks.' };
  }

  const percentage = (obtainedMarks / totalMarks) * 100;
  let letterGrade = 'F';
  if (percentage >= 90) letterGrade = 'A+';
  else if (percentage >= 80) letterGrade = 'A';
  else if (percentage >= 70) letterGrade = 'B';
  else if (percentage >= 60) letterGrade = 'C';
  else if (percentage >= 50) letterGrade = 'D';

  return {
    success: true,
    percentage: Number(percentage.toFixed(2)),
    letterGrade,
    isPassing: percentage >= 50,
  };
}

export function calculateAttendance(
  attendedClasses: number,
  totalClasses: number,
  targetPercentage: number = 75
): {
  success: boolean;
  currentPercentage?: number;
  status?: 'meeting' | 'shortfall';
  classesNeeded?: number;
  classesCanSkip?: number;
  message?: string;
  error?: string;
} {
  if (isNaN(attendedClasses) || isNaN(totalClasses) || isNaN(targetPercentage)) {
    return { success: false, error: 'Please enter valid whole numbers.' };
  }
  if (totalClasses <= 0 || !Number.isInteger(totalClasses)) {
    return { success: false, error: 'Total classes must be a positive integer.' };
  }
  if (attendedClasses < 0 || !Number.isInteger(attendedClasses)) {
    return { success: false, error: 'Attended classes cannot be negative.' };
  }
  if (attendedClasses > totalClasses) {
    return { success: false, error: 'Attended classes cannot exceed total classes conducted.' };
  }
  if (targetPercentage <= 0 || targetPercentage > 100) {
    return { success: false, error: 'Target attendance percentage must be between 1% and 100%.' };
  }

  const currentPercentage = (attendedClasses / totalClasses) * 100;
  const target = targetPercentage / 100;

  if (currentPercentage >= targetPercentage) {
    // How many classes can be skipped:
    // attended / (total + x) >= target => total + x <= attended / target => x <= (attended / target) - total
    const maxTotal = Math.floor(attendedClasses / target);
    const classesCanSkip = Math.max(0, maxTotal - totalClasses);
    return {
      success: true,
      currentPercentage: Number(currentPercentage.toFixed(2)),
      status: 'meeting',
      classesCanSkip,
      message: classesCanSkip > 0
        ? `You can safely miss the next ${classesCanSkip} ${classesCanSkip === 1 ? 'class' : 'classes'} and still keep ${targetPercentage}% attendance.`
        : `You are right at your target! Do not miss the next class.`,
    };
  } else {
    // How many consecutive classes needed:
    // (attended + x) / (total + x) >= target
    // attended + x >= target * total + target * x
    // x * (1 - target) >= target * total - attended
    // x = ceil((target * total - attended) / (1 - target))
    if (target === 1) {
      return {
        success: true,
        currentPercentage: Number(currentPercentage.toFixed(2)),
        status: 'shortfall',
        classesNeeded: 99999,
        message: '100% attendance is impossible to attain once a class is missed.',
      };
    }
    const numerator = target * totalClasses - attendedClasses;
    const denominator = 1 - target;
    const classesNeeded = Math.ceil(numerator / denominator);

    return {
      success: true,
      currentPercentage: Number(currentPercentage.toFixed(2)),
      status: 'shortfall',
      classesNeeded: Math.max(1, classesNeeded),
      message: `You need to attend the next ${classesNeeded} consecutive ${classesNeeded === 1 ? 'class' : 'classes'} to reach ${targetPercentage}% attendance.`,
    };
  }
}

export function calculateRequiredMarks(
  currentScore: number,
  targetScore: number,
  finalExamWeight: number
): {
  success: boolean;
  requiredFinalScore?: number;
  isPossible?: boolean;
  statusMessage?: string;
  error?: string;
} {
  if (isNaN(currentScore) || isNaN(targetScore) || isNaN(finalExamWeight)) {
    return { success: false, error: 'Please enter valid numbers.' };
  }
  if (currentScore < 0 || currentScore > 100) {
    return { success: false, error: 'Current grade must be between 0% and 100%.' };
  }
  if (targetScore <= 0 || targetScore > 100) {
    return { success: false, error: 'Target grade must be between 1% and 100%.' };
  }
  if (finalExamWeight <= 0 || finalExamWeight >= 100) {
    return { success: false, error: 'Final exam weight must be between 1% and 99%.' };
  }

  // Current weight = 100 - finalExamWeight
  // overall = currentScore * (currentWeight / 100) + finalScore * (finalExamWeight / 100)
  // finalScore = (targetScore - currentScore * ((100 - finalExamWeight) / 100)) / (finalExamWeight / 100)
  const currentWeight = (100 - finalExamWeight) / 100;
  const finalWeight = finalExamWeight / 100;
  const required = (targetScore - currentScore * currentWeight) / finalWeight;

  const rounded = Number(required.toFixed(2));
  const isPossible = rounded <= 100;

  let statusMessage = '';
  if (rounded <= 0) {
    statusMessage = 'You have already locked in your target grade! You can score 0% on the final and still achieve your goal.';
  } else if (rounded > 100) {
    statusMessage = `Achieving ${targetScore}% overall is mathematically impossible (requires ${rounded}% on the final exam).`;
  } else {
    statusMessage = `You need to score at least ${rounded}% on the final exam to reach your goal of ${targetScore}%.`;
  }

  return {
    success: true,
    requiredFinalScore: rounded,
    isPossible,
    statusMessage,
  };
}

export function calculateGrade(assessments: WeightedAssessment[]): {
  success: boolean;
  finalGrade?: number;
  letterGrade?: string;
  totalWeight?: number;
  error?: string;
} {
  if (!assessments || assessments.length === 0) {
    return { success: false, error: 'Please add at least one assessment item.' };
  }

  let totalWeight = 0;
  let weightedSum = 0;

  for (const item of assessments) {
    if (isNaN(item.weight) || isNaN(item.score)) {
      return { success: false, error: 'Invalid numeric input in assessment items.' };
    }
    if (item.weight < 0) {
      return { success: false, error: 'Weights cannot be negative.' };
    }
    if (item.score < 0) {
      return { success: false, error: 'Scores cannot be negative.' };
    }
    totalWeight += item.weight;
    weightedSum += (item.score * item.weight);
  }

  if (totalWeight === 0) {
    return { success: false, error: 'Total weight cannot be 0%.' };
  }

  const finalGrade = weightedSum / totalWeight;
  let letterGrade = 'F';
  if (finalGrade >= 93) letterGrade = 'A';
  else if (finalGrade >= 90) letterGrade = 'A-';
  else if (finalGrade >= 87) letterGrade = 'B+';
  else if (finalGrade >= 83) letterGrade = 'B';
  else if (finalGrade >= 80) letterGrade = 'B-';
  else if (finalGrade >= 77) letterGrade = 'C+';
  else if (finalGrade >= 70) letterGrade = 'C';
  else if (finalGrade >= 60) letterGrade = 'D';

  return {
    success: true,
    finalGrade: Number(finalGrade.toFixed(2)),
    letterGrade,
    totalWeight: Number(totalWeight.toFixed(1)),
  };
}
