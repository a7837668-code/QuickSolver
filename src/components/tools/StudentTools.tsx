import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CopyButton } from '../common/CopyButton';
import {
  calculateGPA,
  calculateCGPA,
  calculateMarksPercentage,
  calculateAttendance,
  calculateRequiredMarks,
  calculateGrade,
  GRADE_POINTS,
  GPACourse,
  SemesterData,
  GradeComponent,
} from '../../utils/calculations/student';

interface StudentToolsProps {
  toolSlug: string;
}

export const StudentTools: React.FC<StudentToolsProps> = ({ toolSlug }) => {
  // 1. GPA State
  const [courses, setCourses] = useState<GPACourse[]>([
    { id: '1', name: 'Mathematics I', credits: 4, gradePoint: 4.0 },
    { id: '2', name: 'Introduction to CS', credits: 3, gradePoint: 3.7 },
    { id: '3', name: 'Physics Mechanics', credits: 4, gradePoint: 3.3 },
    { id: '4', name: 'English Composition', credits: 3, gradePoint: 4.0 },
  ]);

  // 2. CGPA State
  const [semesters, setSemesters] = useState<SemesterData[]>([
    { id: '1', semesterName: 'Semester 1', credits: 16, gpa: 3.65 },
    { id: '2', semesterName: 'Semester 2', credits: 18, gpa: 3.8 },
    { id: '3', semesterName: 'Semester 3', credits: 15, gpa: 3.75 },
  ]);

  // 3. Percentage Marks State
  const [marksObtained, setMarksObtained] = useState<string>('442');
  const [totalMarks, setTotalMarks] = useState<string>('500');

  // 4. Attendance State
  const [attAttended, setAttAttended] = useState<string>('38');
  const [attTotal, setAttTotal] = useState<string>('48');
  const [attTarget, setAttTarget] = useState<string>('75');

  // 5. Required Marks State
  const [reqCurrent, setReqCurrent] = useState<string>('78');
  const [reqTarget, setReqTarget] = useState<string>('85');
  const [reqWeight, setReqWeight] = useState<string>('30');

  // 6. Grade Calculator Weighted State
  const [components, setComponents] = useState<GradeComponent[]>([
    { id: '1', name: 'Assignments & Homework', weight: 20, score: 95 },
    { id: '2', name: 'Midterm Exam', weight: 30, score: 82 },
    { id: '3', name: 'Final Project', weight: 20, score: 90 },
    { id: '4', name: 'Final Exam', weight: 30, score: 88 },
  ]);

  // --- 1. GPA Calculator ---
  if (toolSlug === 'gpa-calculator') {
    const res = calculateGPA(courses);

    const addCourse = () => {
      setCourses(prev => [
        ...prev,
        { id: Date.now().toString(), name: `Course ${prev.length + 1}`, credits: 3, gradePoint: 4.0 },
      ]);
    };

    const removeCourse = (id: string) => {
      if (courses.length <= 1) return;
      setCourses(prev => prev.filter(c => c.id !== id));
    };

    const updateCourse = (id: string, field: keyof GPACourse, value: any) => {
      setCourses(prev =>
        prev.map(c => (c.id === id ? { ...c, [field]: value } : c))
      );
    };

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 pr-2">Course Name</th>
                <th className="pb-3 px-2 w-28">Credits</th>
                <th className="pb-3 px-2 w-36">Grade</th>
                <th className="pb-3 pl-2 w-12 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {courses.map(course => (
                <tr key={course.id}>
                  <td className="py-2.5 pr-2">
                    <input
                      type="text"
                      value={course.name}
                      onChange={e => updateCourse(course.id, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2.5 px-2">
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={course.credits}
                      onChange={e => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2.5 px-2">
                    <select
                      value={course.gradePoint}
                      onChange={e => updateCourse(course.id, 'gradePoint', parseFloat(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {Object.entries(GRADE_POINTS).map(([letter, points]) => (
                        <option key={letter} value={points}>
                          {letter} ({points.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2.5 pl-2 text-right">
                    <button
                      type="button"
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length <= 1}
                      className="p-1.5 text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Remove course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={addCourse}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>

        {/* GPA Result Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700">
          {res.success ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  Cumulative Term GPA
                </span>
                <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {res.gpa?.toFixed(3)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Total Credits: <span className="font-semibold text-slate-700 dark:text-slate-300">{res.totalCredits}</span> | Grade Points: <span className="font-semibold text-slate-700 dark:text-slate-300">{res.totalGradePoints?.toFixed(1)}</span>
                </div>
              </div>
              <CopyButton text={`GPA: ${res.gpa?.toFixed(3)} (Credits: ${res.totalCredits})`} />
            </div>
          ) : (
            <p className="text-sm text-rose-500 font-medium">{res.error}</p>
          )}
        </div>
      </div>
    );
  }

  // 2. CGPA Calculator
  if (toolSlug === 'cgpa-calculator') {
    const res = calculateCGPA(semesters);

    const addSemester = () => {
      setSemesters(prev => [
        ...prev,
        { id: Date.now().toString(), semesterName: `Semester ${prev.length + 1}`, credits: 16, gpa: 3.5 },
      ]);
    };

    const removeSemester = (id: string) => {
      if (semesters.length <= 1) return;
      setSemesters(prev => prev.filter(s => s.id !== id));
    };

    const updateSemester = (id: string, field: keyof SemesterData, value: any) => {
      setSemesters(prev =>
        prev.map(s => (s.id === id ? { ...s, [field]: value } : s))
      );
    };

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 pr-2">Semester / Term</th>
                <th className="pb-3 px-2 w-32">Credits</th>
                <th className="pb-3 px-2 w-36">Semester GPA</th>
                <th className="pb-3 pl-2 w-12 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {semesters.map(sem => (
                <tr key={sem.id}>
                  <td className="py-2.5 pr-2">
                    <input
                      type="text"
                      value={sem.semesterName}
                      onChange={e => updateSemester(sem.id, 'semesterName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="py-2.5 px-2">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={sem.credits}
                      onChange={e => updateSemester(sem.id, 'credits', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="py-2.5 px-2">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      value={sem.gpa}
                      onChange={e => updateSemester(sem.id, 'gpa', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="py-2.5 pl-2 text-right">
                    <button
                      type="button"
                      onClick={() => removeSemester(sem.id)}
                      disabled={semesters.length <= 1}
                      className="p-1.5 text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={addSemester}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Semester</span>
        </button>

        {/* CGPA Result Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700">
          {res.success ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  Overall Cumulative CGPA
                </span>
                <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {res.cgpa?.toFixed(3)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Total Completed Credits: <span className="font-semibold text-slate-700 dark:text-slate-300">{res.totalCredits}</span>
                </div>
              </div>
              <CopyButton text={`CGPA: ${res.cgpa?.toFixed(3)} (Credits: ${res.totalCredits})`} />
            </div>
          ) : (
            <p className="text-sm text-rose-500 font-medium">{res.error}</p>
          )}
        </div>
      </div>
    );
  }

  // 3. Percentage Marks Calculator
  if (toolSlug === 'percentage-marks-calculator') {
    const res = calculateMarksPercentage(parseFloat(marksObtained), parseFloat(totalMarks));

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Marks Obtained
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={marksObtained}
              onChange={e => setMarksObtained(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Maximum Total Marks
            </label>
            <input
              type="number"
              min="1"
              step="any"
              value={totalMarks}
              onChange={e => setTotalMarks(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {res.success ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-400">Calculated Percentage</span>
                <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{res.percentage}%</div>
              </div>
              <CopyButton text={`${res.percentage}% (Grade: ${res.letterGrade})`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400">Letter Grade</span>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{res.letterGrade}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Result Status</span>
                <div
                  className={`text-xl font-bold ${
                    res.isPassing ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {res.isPassing ? 'Passed ✓' : 'Failed ✗'}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 4. Attendance Calculator
  if (toolSlug === 'attendance-calculator') {
    const res = calculateAttendance(
      parseFloat(attAttended),
      parseFloat(attTotal),
      parseFloat(attTarget)
    );

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Attended
            </label>
            <input
              type="number"
              min="0"
              value={attAttended}
              onChange={e => setAttAttended(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Total Held
            </label>
            <input
              type="number"
              min="1"
              value={attTotal}
              onChange={e => setAttTotal(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Target %
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={attTarget}
              onChange={e => setAttTarget(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {res.success ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Current Attendance</span>
                <div
                  className={`text-3xl font-extrabold ${
                    (res.currentPercentage || 0) >= parseFloat(attTarget)
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {res.currentPercentage}%
                </div>
              </div>
              <CopyButton text={`Attendance: ${res.currentPercentage}%. ${res.message}`} />
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              {res.message}
            </p>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 5. Required Marks Calculator
  if (toolSlug === 'required-marks-calculator') {
    const res = calculateRequiredMarks(
      parseFloat(reqCurrent),
      parseFloat(reqTarget),
      parseFloat(reqWeight)
    );

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Current Grade (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={reqCurrent}
              onChange={e => setReqCurrent(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Target Grade (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={reqTarget}
              onChange={e => setReqTarget(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Final Exam Weight (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={reqWeight}
              onChange={e => setReqWeight(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {res.success ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Score Needed on Final Exam</span>
                <div
                  className={`text-3xl font-extrabold ${
                    res.isPossible ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {res.requiredFinalScore}%
                </div>
              </div>
              <CopyButton text={`Needed on Final: ${res.requiredFinalScore}%`} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {res.statusMessage}
            </p>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 6. Grade Calculator (Weighted Assessment)
  if (toolSlug === 'grade-calculator') {
    const res = calculateGrade(components);

    const addComponent = () => {
      setComponents(prev => [
        ...prev,
        { id: Date.now().toString(), name: `Assessment ${prev.length + 1}`, weight: 10, score: 90 },
      ]);
    };

    const removeComponent = (id: string) => {
      if (components.length <= 1) return;
      setComponents(prev => prev.filter(c => c.id !== id));
    };

    const updateComponent = (id: string, field: keyof GradeComponent, value: any) => {
      setComponents(prev =>
        prev.map(c => (c.id === id ? { ...c, [field]: value } : c))
      );
    };

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 pr-2">Assignment / Assessment</th>
                <th className="pb-3 px-2 w-28">Weight (%)</th>
                <th className="pb-3 px-2 w-28">Score (%)</th>
                <th className="pb-3 pl-2 w-12 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {components.map(comp => (
                <tr key={comp.id}>
                  <td className="py-2.5 pr-2">
                    <input
                      type="text"
                      value={comp.name}
                      onChange={e => updateComponent(comp.id, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="py-2.5 px-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={comp.weight}
                      onChange={e => updateComponent(comp.id, 'weight', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="py-2.5 px-2">
                    <input
                      type="number"
                      min="0"
                      max="200"
                      value={comp.score}
                      onChange={e => updateComponent(comp.id, 'score', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="py-2.5 pl-2 text-right">
                    <button
                      type="button"
                      onClick={() => removeComponent(comp.id)}
                      disabled={components.length <= 1}
                      className="p-1.5 text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={addComponent}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Assessment</span>
        </button>

        {res.success ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Total Weighted Grade</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                {res.finalGrade}% ({res.letterGrade})
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Total Weight Counted: {res.totalWeight}%
              </div>
            </div>
            <CopyButton text={`Grade: ${res.finalGrade}% (${res.letterGrade})`} />
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  return <div>Select a student tool.</div>;
};
