import { ToolMetadata } from '../types';

export const TOOLS: ToolMetadata[] = [
  // ==========================================
  // FINANCE (8 tools)
  // ==========================================
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    category: 'finance',
    name: 'Percentage Calculator',
    shortDescription: 'Calculate percentages, percentage change, and percentage differences instantly.',
    metaDescription: 'Free online percentage calculator. Compute what is X% of Y, find percentage increase or decrease, and calculate ratios with high precision.',
    icon: 'Percent',
    featured: true,
    popular: true,
    tags: ['percentage', 'math', 'ratio', 'fraction', 'discount', 'percent change'],
    formulaTitle: 'Percentage Formulas',
    formula: 'P = (Value / Total) × 100  |  Change % = ((New - Old) / |Old|) × 100',
    calculationLogic: [
      'To calculate "X% of Y": Multiply Y by (X / 100).',
      'To calculate "X is what % of Y": Divide X by Y and multiply by 100.',
      'To calculate percentage change: Subtract old value from new value, divide by absolute old value, and multiply by 100.',
    ],
    assumptions: ['Total and initial values must be non-zero when used as divisors.'],
    faqs: [
      {
        question: 'How do I calculate percentage increase?',
        answer: 'Subtract the original value from the new value, divide that difference by the original value, and multiply by 100.',
      },
      {
        question: 'Can percentages exceed 100%?',
        answer: 'Yes, any quantity larger than the reference base produces a percentage greater than 100%.',
      },
      {
        question: 'Is this calculator free to use?',
        answer: 'Yes, QuickSolve percentage calculator is 100% free with zero ads or limits.',
      },
    ],
    relatedSlugs: ['discount-calculator', 'profit-loss-calculator', 'salary-calculator', 'gpa-calculator'],
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    category: 'finance',
    name: 'Discount Calculator',
    shortDescription: 'Calculate sale prices, total savings, and sales tax after discounts.',
    metaDescription: 'Calculate the discounted price, savings, and final price with tax using our free online discount calculator.',
    icon: 'Tag',
    popular: true,
    tags: ['discount', 'sale', 'shopping', 'tax', 'savings', 'retail'],
    formulaTitle: 'Discount Calculation',
    formula: 'Savings = Price × (Discount % / 100)  |  Final = (Price - Savings) × (1 + Tax % / 100)',
    calculationLogic: [
      'Compute raw savings by multiplying initial price by discount percentage.',
      'Subtract savings to get discounted subtotal.',
      'Apply any applicable regional sales tax to the discounted subtotal to reach the final checkout amount.',
    ],
    assumptions: ['Original price cannot be negative.', 'Discount must fall between 0% and 100%.'],
    faqs: [
      {
        question: 'Is sales tax applied before or after discount?',
        answer: 'In most jurisdictions, sales tax is assessed on the final discounted price that the customer pays.',
      },
      {
        question: 'How do I calculate a double discount?',
        answer: 'Apply the first discount percentage, then apply the second percentage on the resulting intermediate price.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'profit-loss-calculator', 'split-bill-calculator'],
  },
  {
    id: 'profit-loss-calculator',
    slug: 'profit-loss-calculator',
    category: 'finance',
    name: 'Profit / Loss Calculator',
    shortDescription: 'Determine net profit, loss, markup percentage, and profit margins.',
    metaDescription: 'Determine financial net gain or loss, profit margin, and percentage markup based on cost and selling price.',
    icon: 'TrendingUp',
    tags: ['profit', 'loss', 'margin', 'markup', 'business', 'commerce'],
    formulaTitle: 'Profit and Margin Formulas',
    formula: 'Profit = Selling Price - Cost Price  |  Margin % = (Profit / Selling Price) × 100  |  Markup % = (Profit / Cost) × 100',
    calculationLogic: [
      'Net result = Selling Price minus Cost Price.',
      'If positive, you have generated a gross profit.',
      'If negative, the transaction represents a financial loss.',
    ],
    assumptions: ['Cost price must be greater than zero.'],
    faqs: [
      {
        question: 'What is the difference between margin and markup?',
        answer: 'Markup is the percentage added to cost to reach selling price. Margin is the percentage of selling price that represents profit.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'discount-calculator', 'salary-calculator'],
  },
  {
    id: 'salary-calculator',
    slug: 'salary-calculator',
    category: 'finance',
    name: 'Salary Calculator',
    shortDescription: 'Convert hourly, weekly, monthly, and annual wages with tax deductions.',
    metaDescription: 'Free salary paycheck converter. Convert between hourly wage, daily pay, bi-weekly checks, monthly salary, and annual gross/net income.',
    icon: 'Coins',
    featured: true,
    tags: ['salary', 'wage', 'paycheck', 'hourly', 'income', 'tax'],
    formulaTitle: 'Salary Conversion Formula',
    formula: 'Annual = Hourly × Hours/Week × 52  |  Monthly = Annual / 12  |  Net = Gross × (1 - Tax Rate)',
    calculationLogic: [
      'Normalizes any compensation rate into an annual baseline using work hours per week.',
      'Computes bi-weekly, weekly, daily, and hourly breakdowns based on 52 work weeks per year.',
      'Deducts estimated tax rate to project take-home earnings.',
    ],
    assumptions: ['Standard 52 working weeks per calendar year.'],
    faqs: [
      {
        question: 'How many work hours are in a typical full-time year?',
        answer: 'A standard 40-hour work week equals 2,080 working hours annually (40 × 52).',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'emi-calculator', 'compound-interest-calculator'],
  },
  {
    id: 'emi-calculator',
    slug: 'emi-calculator',
    category: 'finance',
    name: 'EMI / Loan Calculator',
    shortDescription: 'Calculate monthly loan payments, interest breakdown, and total cost.',
    metaDescription: 'Accurate loan EMI calculator. Calculate monthly payments, total interest, and total repayment amount for mortgages, auto loans, and personal loans.',
    icon: 'Landmark',
    featured: true,
    popular: true,
    tags: ['emi', 'loan', 'mortgage', 'interest', 'car loan', 'home loan'],
    formulaTitle: 'Equated Monthly Installment (EMI) Formula',
    formula: 'EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]',
    calculationLogic: [
      'P = Principal loan amount.',
      'r = Monthly interest rate (Annual rate / 12 / 100).',
      'n = Tenure in months.',
      'Total payment = EMI × n.',
      'Total Interest = Total Payment - Principal.',
    ],
    assumptions: ['Interest is compounded monthly with regular equal payments.'],
    faqs: [
      {
        question: 'What is EMI?',
        answer: 'EMI stands for Equated Monthly Installment: a fixed payment amount made by a borrower to a lender at a specified date each calendar month.',
      },
      {
        question: 'How does loan tenure affect total interest?',
        answer: 'A longer tenure reduces your monthly payment but significantly increases total cumulative interest paid over the life of the loan.',
      },
    ],
    relatedSlugs: ['compound-interest-calculator', 'salary-calculator', 'percentage-calculator'],
  },
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    category: 'finance',
    name: 'Compound Interest Calculator',
    shortDescription: 'Simulate long-term investment growth with recurring monthly contributions.',
    metaDescription: 'Visualize your investment growth with our free compound interest calculator. Support for annual, quarterly, and monthly compounding with contributions.',
    icon: 'LineChart',
    popular: true,
    tags: ['investment', 'interest', 'savings', 'wealth', 'compound', 'retirement'],
    formulaTitle: 'Compound Interest Formula',
    formula: 'A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]',
    calculationLogic: [
      'A = Future value.',
      'P = Initial deposit.',
      'r = Annual interest rate (decimal).',
      'n = Number of times interest is compounded per year.',
      't = Number of years.',
      'PMT = Recurring addition.',
    ],
    assumptions: ['Interest rate remains constant throughout the entire investment horizon.'],
    faqs: [
      {
        question: 'What is the power of compounding?',
        answer: 'Compounding earns interest on both your initial principal and previous accumulated interest, causing exponential wealth growth over time.',
      },
    ],
    relatedSlugs: ['emi-calculator', 'salary-calculator', 'percentage-calculator'],
  },
  {
    id: 'tip-calculator',
    slug: 'tip-calculator',
    category: 'finance',
    name: 'Tip Calculator',
    shortDescription: 'Calculate tips and easily split bills among friends.',
    metaDescription: 'Fast tip calculator. Easily calculate tip percentages (10%, 15%, 18%, 20%) and evenly split bills among dining parties.',
    icon: 'Receipt',
    tags: ['tip', 'gratuity', 'restaurant', 'dining', 'bill', 'service'],
    formulaTitle: 'Tip Calculation',
    formula: 'Tip = Bill × (Tip % / 100)  |  Total = Bill + Tip  |  Per Person = Total / People',
    calculationLogic: [
      'Multiply bill by tip percentage.',
      'Add tip to original bill.',
      'Divide final total by number of contributors.',
    ],
    assumptions: ['Bill and headcount must be positive integers or decimal amounts.'],
    faqs: [
      {
        question: 'What is the standard tipping rate?',
        answer: 'In the United States and Canada, 15% to 20% of pre-tax bill is standard for good restaurant dining service.',
      },
    ],
    relatedSlugs: ['split-bill-calculator', 'discount-calculator', 'percentage-calculator'],
  },
  {
    id: 'split-bill-calculator',
    slug: 'split-bill-calculator',
    category: 'finance',
    name: 'Split Bill Calculator',
    shortDescription: 'Evenly split dining, rental, or group bills with sales tax and gratuity.',
    metaDescription: 'Free group bill splitter. Split restaurant bills, shared expenses, and group travel costs with customized tax and tip percentages.',
    icon: 'Users',
    tags: ['split', 'bill', 'group', 'dinner', 'roommates', 'expenses'],
    formulaTitle: 'Split Bill Formula',
    formula: 'Tax = Bill × (Tax % / 100)  |  Tip = Bill × (Tip % / 100)  |  Total / People',
    calculationLogic: [
      'Calculates tax and tip based on base expenditure.',
      'Sums base + tax + tip.',
      'Evenly divides overall expense by party count.',
    ],
    assumptions: ['Headcount must be at least 1 person.'],
    faqs: [
      {
        question: 'Can I include tax in the split?',
        answer: 'Yes, you can enter sales tax percentage alongside gratuity for complete accuracy.',
      },
    ],
    relatedSlugs: ['tip-calculator', 'discount-calculator', 'percentage-calculator'],
  },

  // ==========================================
  // STUDENTS (6 tools)
  // ==========================================
  {
    id: 'gpa-calculator',
    slug: 'gpa-calculator',
    category: 'students',
    name: 'GPA Calculator',
    shortDescription: 'Calculate college and high school GPA on a 4.0 or 4.33 weighted scale.',
    metaDescription: 'Free online GPA calculator. Compute your weighted or unweighted college GPA based on course credit hours and letter grades.',
    icon: 'GraduationCap',
    featured: true,
    popular: true,
    tags: ['gpa', 'grades', 'college', 'university', 'credits', 'academic'],
    formulaTitle: 'Grade Point Average Formula',
    formula: 'GPA = Σ (Credit Hours × Grade Points) / Σ (Credit Hours)',
    calculationLogic: [
      'Multiply each course credit hour by its assigned grade point.',
      'Sum all earned grade points.',
      'Divide by total attempted credit hours.',
    ],
    assumptions: ['Standard 4.0 grade point scale (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0).'],
    faqs: [
      {
        question: 'What is the standard 4.0 GPA scale?',
        answer: 'A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D = 1.0, F = 0.0.',
      },
    ],
    relatedSlugs: ['cgpa-calculator', 'grade-calculator', 'percentage-marks-calculator', 'attendance-calculator'],
  },
  {
    id: 'cgpa-calculator',
    slug: 'cgpa-calculator',
    category: 'students',
    name: 'CGPA Calculator',
    shortDescription: 'Calculate Cumulative GPA across multiple semesters and academic terms.',
    metaDescription: 'Calculate your Cumulative Grade Point Average (CGPA) across semesters. Weighted credit calculation for college and university degree tracking.',
    icon: 'Award',
    popular: true,
    tags: ['cgpa', 'cumulative gpa', 'semesters', 'college', 'transcript'],
    formulaTitle: 'Cumulative GPA Formula',
    formula: 'CGPA = Σ (Semester Credits × Semester GPA) / Σ (Total Semester Credits)',
    calculationLogic: [
      'Multiply each term credit count by semester GPA.',
      'Divide cumulative point sum by total degree credits earned to date.',
    ],
    assumptions: ['All semesters use the same grade scale rating.'],
    faqs: [
      {
        question: 'What is the difference between GPA and CGPA?',
        answer: 'GPA represents your performance in a single term or semester, while CGPA measures your cumulative average across all completed semesters.',
      },
    ],
    relatedSlugs: ['gpa-calculator', 'grade-calculator', 'percentage-marks-calculator'],
  },
  {
    id: 'percentage-marks-calculator',
    slug: 'percentage-marks-calculator',
    category: 'students',
    name: 'Percentage / Marks Calculator',
    shortDescription: 'Convert test exam scores into percentages and letter grades.',
    metaDescription: 'Convert test scores into percentage grades. Instant marks calculation with grading boundary conversion.',
    icon: 'BookOpen',
    tags: ['marks', 'exam', 'score', 'percentage', 'test', 'grades'],
    formulaTitle: 'Marks Percentage Formula',
    formula: 'Percentage = (Obtained Marks / Total Maximum Marks) × 100',
    calculationLogic: [
      'Divide marks obtained by total possible marks.',
      'Multiply result by 100 to yield percentage.',
      'Maps to standard grade classification (A+, A, B, C, D, F).',
    ],
    assumptions: ['Obtained marks cannot exceed maximum possible total marks.'],
    faqs: [
      {
        question: 'How do I convert marks to percentage?',
        answer: 'Take your score, divide it by the maximum score, and multiply by 100.',
      },
    ],
    relatedSlugs: ['gpa-calculator', 'grade-calculator', 'required-marks-calculator'],
  },
  {
    id: 'attendance-calculator',
    slug: 'attendance-calculator',
    category: 'students',
    name: 'Attendance Calculator',
    shortDescription: 'Find out how many classes you must attend or can safely skip.',
    metaDescription: 'Free student attendance calculator. Determine required classes to reach 75% or 85% attendance, or how many lectures you can miss.',
    icon: 'Clock',
    featured: true,
    popular: true,
    tags: ['attendance', 'college', 'bunk', 'classes', 'lectures', 'student'],
    formulaTitle: 'Attendance Requirement Formula',
    formula: 'Current % = (Attended / Total) × 100  |  Needed = ⌈(Target × Total - Attended) / (1 - Target)⌉',
    calculationLogic: [
      'Computes present attendance percentage.',
      'If below threshold, calculates minimum consecutive classes to reach compliance.',
      'If above threshold, calculates maximum safe classes that can be missed.',
    ],
    assumptions: ['Attended classes cannot exceed total classes conducted.'],
    faqs: [
      {
        question: 'Why is 75% attendance often required in colleges?',
        answer: 'Most universities enforce a 75% minimum attendance rule to ensure students participate consistently before qualifying for final examinations.',
      },
    ],
    relatedSlugs: ['gpa-calculator', 'required-marks-calculator', 'grade-calculator'],
  },
  {
    id: 'required-marks-calculator',
    slug: 'required-marks-calculator',
    category: 'students',
    name: 'Required Marks Calculator',
    shortDescription: 'Calculate the score needed on your final exam to get your desired grade.',
    metaDescription: 'Find out what grade you need on your final exam to pass the class or get an A. Weighted final exam grade calculator.',
    icon: 'HelpCircle',
    tags: ['final exam', 'target grade', 'required score', 'study', 'class'],
    formulaTitle: 'Final Exam Required Score Formula',
    formula: 'Final Score = [Target - Current × (1 - Final Weight)] / Final Weight',
    calculationLogic: [
      'Assesses current coursework standing and remaining final exam weight.',
      'Solves for the exact score required on the final exam to secure target course grade.',
    ],
    assumptions: ['Final exam weight must be between 1% and 99%.'],
    faqs: [
      {
        question: 'What if the calculator says I need over 100%?',
        answer: 'If the required score exceeds 100%, it means your previous coursework weighting prevents reaching that target without extra credit.',
      },
    ],
    relatedSlugs: ['grade-calculator', 'gpa-calculator', 'percentage-marks-calculator'],
  },
  {
    id: 'grade-calculator',
    slug: 'grade-calculator',
    category: 'students',
    name: 'Grade Calculator',
    shortDescription: 'Calculate weighted average course grades from homework, quizzes, and exams.',
    metaDescription: 'Calculate your overall course grade with weighted assignments, quizzes, midterms, and final projects.',
    icon: 'CheckSquare',
    tags: ['grade', 'weighted grade', 'assignments', 'exams', 'syllabus'],
    formulaTitle: 'Weighted Grade Formula',
    formula: 'Overall Grade = Σ (Assignment Score × Weight) / Σ (Weights)',
    calculationLogic: [
      'Multiply each component grade by its respective syllabus percentage weight.',
      'Sum all weighted components and normalize against total assigned weight.',
    ],
    assumptions: ['Scores and weights must be non-negative values.'],
    faqs: [
      {
        question: 'What happens if weights do not add up to 100%?',
        answer: 'The calculator automatically normalizes your grade based on the active completed weight proportion.',
      },
    ],
    relatedSlugs: ['gpa-calculator', 'required-marks-calculator', 'percentage-marks-calculator'],
  },

  // ==========================================
  // DATE & TIME (4 tools)
  // ==========================================
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    category: 'date-time',
    name: 'Age Calculator',
    shortDescription: 'Calculate exact age in years, months, days, hours, and countdown to next birthday.',
    metaDescription: 'Free accurate age calculator. Calculate your exact age in years, months, days, minutes, and find the day of week you were born.',
    icon: 'Calendar',
    featured: true,
    popular: true,
    tags: ['age', 'birthday', 'chronological age', 'date of birth', 'calendar'],
    formulaTitle: 'Chronological Age Calculation',
    formula: 'Years = Y2 - Y1  |  Months = M2 - M1  |  Days = D2 - D1 (with month-borrow logic)',
    calculationLogic: [
      'Calculates full years elapsed between birth date and reference date.',
      'Adjusts for specific month day counts, handling leap years and variable month lengths.',
      'Projects total elapsed days, hours, minutes, and exact days until your upcoming birthday.',
    ],
    assumptions: ['Valid Gregorian calendar date of birth.'],
    faqs: [
      {
        question: 'Does this account for leap years?',
        answer: 'Yes! All leap years (including February 29th) are accurately counted in total days and elapsed intervals.',
      },
    ],
    relatedSlugs: ['date-difference-calculator', 'days-between-dates', 'time-duration-calculator'],
  },
  {
    id: 'date-difference-calculator',
    slug: 'date-difference-calculator',
    category: 'date-time',
    name: 'Date Difference Calculator',
    shortDescription: 'Calculate exact duration between two dates in years, months, days, and business days.',
    metaDescription: 'Calculate the exact difference between two dates. Get total days, weeks, months, years, and working business days count.',
    icon: 'CalendarDays',
    popular: true,
    tags: ['date difference', 'calendar', 'duration', 'business days', 'interval'],
    formulaTitle: 'Date Span Formula',
    formula: 'Span = End Date - Start Date (broken into Y, M, D, and Working Days)',
    calculationLogic: [
      'Measures exact calendar difference between any two dates.',
      'Tallies working days (Monday-Friday) versus weekends (Saturday-Sunday).',
      'Provides option to include or exclude the final boundary date.',
    ],
    assumptions: ['End date cannot precede the start date.'],
    faqs: [
      {
        question: 'Can I exclude weekends?',
        answer: 'Yes, our breakdown clearly separates regular business days from weekend days.',
      },
    ],
    relatedSlugs: ['days-between-dates', 'age-calculator', 'time-duration-calculator'],
  },
  {
    id: 'days-between-dates',
    slug: 'days-between-dates',
    category: 'date-time',
    name: 'Days Between Dates',
    shortDescription: 'Quickly count the exact number of days and weeks between two calendar dates.',
    metaDescription: 'Fast day counter tool. Find total days between two dates, number of weeks, and percentage of the year passed.',
    icon: 'CalendarRange',
    tags: ['days between', 'day counter', 'countdown', 'weeks', 'calendar'],
    formulaTitle: 'Day Count Formula',
    formula: 'Total Days = (Date2 - Date1) in Milliseconds / (1000 × 60 × 60 × 24)',
    calculationLogic: [
      'Converts dates to UTC timestamp zero-hour.',
      'Computes difference in 24-hour day units.',
      'Calculates weeks, remainder days, and annual percentage.',
    ],
    assumptions: ['Standard calendar days.'],
    faqs: [
      {
        question: 'Does it count the starting day?',
        answer: 'By default it counts elapsed whole days; you can toggle the checkbox to include the end date.',
      },
    ],
    relatedSlugs: ['date-difference-calculator', 'age-calculator', 'time-duration-calculator'],
  },
  {
    id: 'time-duration-calculator',
    slug: 'time-duration-calculator',
    category: 'date-time',
    name: 'Time Duration Calculator',
    shortDescription: 'Calculate elapsed hours and minutes between start and end times.',
    metaDescription: 'Calculate time duration between two timestamps. Ideal for work shift timesheets, track hours, minutes, and decimal hours.',
    icon: 'Watch',
    tags: ['time', 'duration', 'timesheet', 'hours', 'minutes', 'elapsed'],
    formulaTitle: 'Time Span Formula',
    formula: 'Duration = End Time - Start Time (supports overnight shifts)',
    calculationLogic: [
      'Converts clock hours and minutes to total minutes.',
      'Supports night shifts that cross midnight.',
      'Outputs both hours + minutes and decimal hours for payroll.',
    ],
    assumptions: ['24-hour clock or standard AM/PM time notation.'],
    faqs: [
      {
        question: 'Does this support overnight work shifts?',
        answer: 'Yes, checking "Crosses midnight" automatically calculates overnight shifts accurately.',
      },
    ],
    relatedSlugs: ['date-difference-calculator', 'salary-calculator', 'days-between-dates'],
  },

  // ==========================================
  // CONVERTERS (6 tools)
  // ==========================================
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    category: 'converters',
    name: 'Unit Converter',
    shortDescription: 'Universal multi-category conversion for length, weight, speed, temperature, and time.',
    metaDescription: 'Free universal unit converter. Convert metrics and imperial units across length, weight, temperature, speed, and time.',
    icon: 'ArrowLeftRight',
    featured: true,
    popular: true,
    tags: ['unit converter', 'metric', 'imperial', 'measurements', 'conversion'],
    formulaTitle: 'General Unit Normalization',
    formula: 'Converted = (Value × Source Base Rate) / Target Base Rate',
    calculationLogic: [
      'Converts source value to standard SI base unit.',
      'Converts from SI base unit to destination unit using high-precision coefficients.',
    ],
    assumptions: ['Measurement values must be physically valid.'],
    faqs: [
      {
        question: 'Which measurement systems are supported?',
        answer: 'Both the International Metric System (SI) and US Imperial / Customary units.',
      },
    ],
    relatedSlugs: ['temperature-converter', 'length-converter', 'weight-converter', 'speed-converter'],
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    category: 'converters',
    name: 'Temperature Converter',
    shortDescription: 'Convert between Celsius (°C), Fahrenheit (°F), Kelvin (K), and Rankine (°R).',
    metaDescription: 'Instant temperature conversion between Celsius, Fahrenheit, Kelvin, and Rankine with step-by-step formulas.',
    icon: 'Thermometer',
    popular: true,
    tags: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'weather', 'physics'],
    formulaTitle: 'Temperature Conversion Formulas',
    formula: '°F = (°C × 9/5) + 32  |  °C = (°F - 32) × 5/9  |  K = °C + 273.15',
    calculationLogic: [
      'Converts input temperature to Kelvin.',
      'Checks against Absolute Zero constraint (0 K / -273.15 °C).',
      'Converts Kelvin to requested output scale.',
    ],
    assumptions: ['Cannot calculate temperatures below Absolute Zero.'],
    faqs: [
      {
        question: 'At what temperature are Celsius and Fahrenheit equal?',
        answer: '-40° Celsius is exactly equal to -40° Fahrenheit.',
      },
    ],
    relatedSlugs: ['unit-converter', 'length-converter', 'speed-converter'],
  },
  {
    id: 'length-converter',
    slug: 'length-converter',
    category: 'converters',
    name: 'Length Converter',
    shortDescription: 'Convert between meters, kilometers, centimeters, millimeters, feet, inches, yards, and miles.',
    metaDescription: 'Convert length and distance between metric and imperial: meters, feet, inches, kilometers, miles, and yards.',
    icon: 'Ruler',
    tags: ['length', 'distance', 'meters', 'feet', 'inches', 'miles', 'metric'],
    formulaTitle: 'Length Conversion Ratio',
    formula: 'Meters = Value × Unit Factor  |  1 ft = 0.3048 m  |  1 in = 0.0254 m',
    calculationLogic: ['Normalizes to base meter standard, then converts to destination scale.'],
    assumptions: ['Length cannot be negative.'],
    faqs: [
      {
        question: 'How many inches in a foot?',
        answer: 'There are exactly 12 inches in one foot.',
      },
    ],
    relatedSlugs: ['unit-converter', 'weight-converter', 'speed-converter'],
  },
  {
    id: 'weight-converter',
    slug: 'weight-converter',
    category: 'converters',
    name: 'Weight Converter',
    shortDescription: 'Convert between kilograms, grams, milligrams, pounds (lbs), ounces (oz), and stones.',
    metaDescription: 'Convert weight and mass between kilograms, grams, pounds, ounces, and metric tons.',
    icon: 'Scale',
    tags: ['weight', 'mass', 'kilograms', 'pounds', 'lbs', 'grams', 'ounces'],
    formulaTitle: 'Mass Conversion Ratio',
    formula: 'Kilograms = Value × Mass Factor  |  1 lb = 0.45359237 kg',
    calculationLogic: ['Normalizes mass to kilograms, then divides by target unit ratio.'],
    assumptions: ['Mass must be non-negative.'],
    faqs: [
      {
        question: 'How many pounds are in a kilogram?',
        answer: '1 kilogram is approximately 2.20462 pounds.',
      },
    ],
    relatedSlugs: ['unit-converter', 'length-converter', 'temperature-converter'],
  },
  {
    id: 'speed-converter',
    slug: 'speed-converter',
    category: 'converters',
    name: 'Speed Converter',
    shortDescription: 'Convert velocity between km/h, mph, m/s, knots, and feet per second.',
    metaDescription: 'Convert velocity between kilometers per hour (km/h), miles per hour (mph), knots, and meters per second.',
    icon: 'Gauge',
    tags: ['speed', 'velocity', 'kmh', 'mph', 'knots', 'mps', 'travel'],
    formulaTitle: 'Velocity Conversion Ratio',
    formula: '1 m/s = 3.6 km/h = 2.23694 mph = 1.94384 knots',
    calculationLogic: ['Normalizes velocity to meters per second, then converts to output scale.'],
    assumptions: ['Speed magnitude must be non-negative.'],
    faqs: [
      {
        question: 'What is a knot?',
        answer: 'One knot is one nautical mile per hour, equivalent to 1.852 km/h or approximately 1.15078 mph.',
      },
    ],
    relatedSlugs: ['unit-converter', 'length-converter', 'time-converter'],
  },
  {
    id: 'time-converter',
    slug: 'time-converter',
    category: 'converters',
    name: 'Time Converter',
    shortDescription: 'Convert between seconds, minutes, hours, days, weeks, months, and years.',
    metaDescription: 'Convert time units instantly: seconds, minutes, hours, days, weeks, and calendar years.',
    icon: 'Timer',
    tags: ['time', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'conversion'],
    formulaTitle: 'Time Normalization',
    formula: 'Seconds = Value × Time Factor  |  1 Day = 86,400 Seconds',
    calculationLogic: ['Converts time unit to base seconds, then converts to requested unit.'],
    assumptions: ['Time values must be positive.'],
    faqs: [
      {
        question: 'How many seconds in a year?',
        answer: 'A standard calendar year contains 31,536,000 seconds (365 days × 86,400 s).',
      },
    ],
    relatedSlugs: ['time-duration-calculator', 'unit-converter', 'speed-converter'],
  },

  // ==========================================
  // TEXT (9 tools)
  // ==========================================
  {
    id: 'word-counter',
    slug: 'word-counter',
    category: 'text',
    name: 'Word Counter',
    shortDescription: 'Count words, characters, sentences, paragraphs, and estimated reading time.',
    metaDescription: 'Free online word counter tool. Real-time count of words, characters with/without spaces, sentences, paragraphs, and reading speed.',
    icon: 'AlignLeft',
    featured: true,
    popular: true,
    tags: ['word counter', 'character count', 'reading time', 'essay', 'writing', 'copywriting'],
    formulaTitle: 'Word and Text Metrics',
    formula: 'Words = Alphanumeric Sequences  |  Reading Time = Words / 225 WPM',
    calculationLogic: [
      'Scans text for word tokens using unicode-aware regex.',
      'Calculates total characters, characters without spaces, sentence count, and paragraphs.',
      'Estimates silent reading time (225 words/min) and speech duration (140 words/min).',
    ],
    assumptions: ['Standard reading and speaking speeds apply.'],
    faqs: [
      {
        question: 'Do spaces count as characters?',
        answer: 'We provide both character counts: total with spaces and total excluding spaces.',
      },
    ],
    relatedSlugs: ['character-counter', 'sentence-counter', 'reading-time-calculator', 'case-converter'],
  },
  {
    id: 'character-counter',
    slug: 'character-counter',
    category: 'text',
    name: 'Character Counter',
    shortDescription: 'Inspect exact character counts with and without spaces for social media limits.',
    metaDescription: 'Free character counter. Monitor text length for Twitter/X (280), meta descriptions (160), Instagram, and SMS limits.',
    icon: 'Type',
    popular: true,
    tags: ['characters', 'letters', 'length', 'social media', 'twitter', 'seo'],
    formulaTitle: 'Character Count',
    formula: 'Length = String.length  |  Without Spaces = regex replace \\s',
    calculationLogic: ['Counts total UTF-16 code units and tracks against popular character limits.'],
    assumptions: ['Unicode emoji may count as multiple code units.'],
    faqs: [
      {
        question: 'What is the character limit for Twitter / X?',
        answer: 'Standard Twitter posts allow up to 280 characters.',
      },
    ],
    relatedSlugs: ['word-counter', 'sentence-counter', 'reading-time-calculator'],
  },
  {
    id: 'sentence-counter',
    slug: 'sentence-counter',
    category: 'text',
    name: 'Sentence Counter',
    shortDescription: 'Count total sentences and evaluate sentence structure readability.',
    metaDescription: 'Count sentences in articles, essays, and reports. Analyze sentence density and paragraph readability.',
    icon: 'Pilcrow',
    tags: ['sentence', 'readability', 'structure', 'grammar', 'writing'],
    formulaTitle: 'Sentence Analysis',
    formula: 'Sentences = Matches of [.!?] followed by whitespace or end of string',
    calculationLogic: ['Detects terminal punctuation marks representing valid grammatical sentences.'],
    assumptions: ['Standard sentence-ending punctuation used.'],
    faqs: [
      {
        question: 'How are sentences detected?',
        answer: 'Sentences are identified by period, exclamation, or question marks followed by spacing.',
      },
    ],
    relatedSlugs: ['word-counter', 'character-counter', 'reading-time-calculator'],
  },
  {
    id: 'reading-time-calculator',
    slug: 'reading-time-calculator',
    category: 'text',
    name: 'Reading Time Calculator',
    shortDescription: 'Estimate silent reading and spoken presentation times for any article or speech.',
    metaDescription: 'Estimate reading time and speaking duration for articles, blogs, and presentations based on word count.',
    icon: 'Hourglass',
    tags: ['reading time', 'speaking time', 'presentation', 'speech', 'blog'],
    formulaTitle: 'Reading Time Formula',
    formula: 'Silent Time = Words / 225 WPM  |  Speaking Time = Words / 140 WPM',
    calculationLogic: ['Calculates duration in minutes and seconds based on average human comprehension benchmarks.'],
    assumptions: ['Average adult reading speed is 200–250 words per minute.'],
    faqs: [
      {
        question: 'What is the average reading speed?',
        answer: 'An average adult reads English text silently at approximately 200 to 250 words per minute.',
      },
    ],
    relatedSlugs: ['word-counter', 'character-counter', 'case-converter'],
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    category: 'text',
    name: 'Case Converter',
    shortDescription: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.',
    metaDescription: 'Free text case converter. Easily convert between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.',
    icon: 'CaseSensitive',
    popular: true,
    tags: ['case converter', 'uppercase', 'lowercase', 'title case', 'camelcase', 'kebab-case'],
    formulaTitle: 'String Case Transformation',
    formula: 'Text regex transformation matching word boundaries and delimiters',
    calculationLogic: ['Splits string by delimiters/case boundaries and reconstructs with desired casing rules.'],
    assumptions: ['Latin and standard alphanumeric characters supported.'],
    faqs: [
      {
        question: 'What is Title Case?',
        answer: 'Title Case capitalizes the first letter of every word while keeping remaining letters lowercase.',
      },
    ],
    relatedSlugs: ['word-counter', 'slug-generator', 'text-cleaner'],
  },
  {
    id: 'remove-duplicate-lines',
    slug: 'remove-duplicate-lines',
    category: 'text',
    name: 'Remove Duplicate Lines',
    shortDescription: 'Deduplicate text lists, clean line breaks, and count removed duplicates.',
    metaDescription: 'Remove duplicate lines from text lists. Fast, case-sensitive or insensitive list deduplication tool.',
    icon: 'Filter',
    tags: ['duplicate', 'deduplicate', 'unique', 'lines', 'cleaner', 'lists'],
    formulaTitle: 'Set Deduplication',
    formula: 'Filtered = Unique items matching Set(lines)',
    calculationLogic: ['Iterates lines, adds to a lookup Set, and preserves first-seen order while dropping repeats.'],
    assumptions: ['Line breaks determined by standard LF or CRLF.'],
    faqs: [
      {
        question: 'Can I perform case-insensitive deduplication?',
        answer: 'Yes, you can toggle case sensitivity in the settings option.',
      },
    ],
    relatedSlugs: ['text-sorter', 'text-cleaner', 'slug-generator'],
  },
  {
    id: 'text-sorter',
    slug: 'text-sorter',
    category: 'text',
    name: 'Text Sorter',
    shortDescription: 'Sort lines alphabetically (A-Z, Z-A), by length, or naturally.',
    metaDescription: 'Sort text lines alphabetically from A to Z, reverse Z to A, or by character length with natural number sorting.',
    icon: 'ArrowDownAZ',
    tags: ['sort', 'alphabetical', 'ordering', 'list', 'a-z', 'z-a'],
    formulaTitle: 'Lexicographical Sorting',
    formula: 'lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))',
    calculationLogic: ['Sorts lines using standard or natural numeric locale comparison.'],
    assumptions: ['Lines are delimited by newline characters.'],
    faqs: [
      {
        question: 'What is natural sorting?',
        answer: 'Natural sorting orders numbers logically (e.g., Item 2 comes before Item 10, instead of Item 10 coming before Item 2).',
      },
    ],
    relatedSlugs: ['remove-duplicate-lines', 'text-cleaner', 'case-converter'],
  },
  {
    id: 'text-cleaner',
    slug: 'text-cleaner',
    category: 'text',
    name: 'Text Cleaner',
    shortDescription: 'Strip HTML tags, remove extra whitespace, trim lines, and erase empty rows.',
    metaDescription: 'Clean messy text by stripping HTML tags, extra tabs, multiple spaces, and blank lines instantly.',
    icon: 'Sparkles',
    tags: ['cleaner', 'whitespace', 'strip html', 'trim', 'format text'],
    formulaTitle: 'Text Normalization',
    formula: 'regex replace multiple whitespace and HTML tags',
    calculationLogic: ['Applies selectable cleaning filters: HTML strip, line trimming, space collapse, and blank line removal.'],
    assumptions: ['Preserves original text content while removing superfluous formatting.'],
    faqs: [
      {
        question: 'Does this strip HTML tags safely?',
        answer: 'Yes, it strips tag markup using regex without executing any scripts.',
      },
    ],
    relatedSlugs: ['remove-duplicate-lines', 'case-converter', 'slug-generator'],
  },
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    category: 'text',
    name: 'Slug Generator',
    shortDescription: 'Generate clean, URL-friendly slugs for articles, blogs, and products.',
    metaDescription: 'Generate SEO-friendly URL slugs. Converts titles into lowercase, hyphen-separated, accent-stripped URL paths.',
    icon: 'Link',
    tags: ['slug', 'url', 'seo', 'permalink', 'blog', 'clean url'],
    formulaTitle: 'URL Slug Normalization',
    formula: 'decompose diacritics -> lowercase -> replace non-alphanumeric with hyphens',
    calculationLogic: ['Normalizes Unicode characters, removes diacritics, replaces spaces/symbols with hyphens, and trims edges.'],
    assumptions: ['Outputs clean ASCII web-safe characters.'],
    faqs: [
      {
        question: 'What is a URL slug?',
        answer: 'A slug is the human-readable, SEO-friendly part of a web address that identifies a specific page.',
      },
    ],
    relatedSlugs: ['case-converter', 'text-cleaner', 'url-encoder-decoder'],
  },

  // ==========================================
  // DEVELOPER (7 tools)
  // ==========================================
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    category: 'developer',
    name: 'JSON Formatter',
    shortDescription: 'Prettify, format, indent, minify, and sort keys in JSON documents.',
    metaDescription: 'Free online JSON formatter and prettifier. Indent JSON by 2 or 4 spaces, minify, sort object keys, and copy clean output.',
    icon: 'Braces',
    featured: true,
    popular: true,
    tags: ['json', 'formatter', 'prettifier', 'minify', 'developer', 'syntax'],
    formulaTitle: 'JSON Formatting',
    formula: 'JSON.stringify(JSON.parse(input), null, indent)',
    calculationLogic: [
      'Parses input using standard ECMAScript JSON engine.',
      'Validates syntax correctness.',
      'Formats into 2-space, 4-space, tab, or minified output with optional sorted keys.',
    ],
    assumptions: ['Input must adhere to standard JSON grammar (double quotes for keys/strings).'],
    faqs: [
      {
        question: 'Can this minify JSON?',
        answer: 'Yes! Selecting "Minify" removes all whitespace and line breaks to minimize payload size.',
      },
    ],
    relatedSlugs: ['json-validator', 'base64-encoder', 'url-encoder-decoder'],
  },
  {
    id: 'json-validator',
    slug: 'json-validator',
    category: 'developer',
    name: 'JSON Validator',
    shortDescription: 'Validate JSON syntax with detailed error messages and line-level inspections.',
    metaDescription: 'Free online JSON validator. Find syntax errors, check data types, count keys, and verify RFC 8259 compliance.',
    icon: 'CheckCircle2',
    popular: true,
    tags: ['json', 'validator', 'syntax', 'linter', 'rfc8259', 'debug'],
    formulaTitle: 'JSON Schema Validation',
    formula: 'Syntax verification via ECMAScript JSON parser',
    calculationLogic: ['Parses input and provides exact error description and structural metrics.'],
    assumptions: ['Follows standard JSON specifications.'],
    faqs: [
      {
        question: 'Why does JSON fail on single quotes?',
        answer: 'The official JSON specification (RFC 8259) strictly requires double quotes for all string literals and object keys.',
      },
    ],
    relatedSlugs: ['json-formatter', 'base64-encoder', 'regex-tester'],
  },
  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    category: 'developer',
    name: 'Base64 Encoder / Decoder',
    shortDescription: 'Encode and decode strings and data to and from Base64 with UTF-8 support.',
    metaDescription: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 strings with full UTF-8 support.',
    icon: 'Binary',
    popular: true,
    tags: ['base64', 'encoder', 'decoder', 'binary', 'utf-8', 'developer'],
    formulaTitle: 'Base64 Encoding Algorithm',
    formula: 'Encodes 3 8-bit bytes into 4 6-bit Base64 index characters (RFC 4648)',
    calculationLogic: [
      'Uses TextEncoder to safely convert UTF-8 characters to binary byte streams.',
      'Converts bytes to standard Base64 character alphabet [A-Za-z0-9+/=].',
    ],
    assumptions: ['UTF-8 encoding standard.'],
    faqs: [
      {
        question: 'Is Base64 encryption?',
        answer: 'No. Base64 is a binary-to-text encoding scheme, not encryption. It provides zero cryptographic security.',
      },
    ],
    relatedSlugs: ['url-encoder-decoder', 'json-formatter', 'uuid-generator'],
  },
  {
    id: 'url-encoder-decoder',
    slug: 'url-encoder-decoder',
    category: 'developer',
    name: 'URL Encoder / Decoder',
    shortDescription: 'Encode special characters into percent-encoded URI strings and decode query params.',
    metaDescription: 'Free online URL encoder and decoder. Convert URLs and query parameters using standard percent-encoding.',
    icon: 'Globe',
    tags: ['url encoder', 'decode uri', 'percent encoding', 'query parameter', 'web'],
    formulaTitle: 'Percent-Encoding (RFC 3986)',
    formula: 'Replaces reserved URI characters with % followed by two hex digits',
    calculationLogic: ['Applies standard encodeURIComponent or decodeURIComponent routines.'],
    assumptions: ['RFC 3986 URL character guidelines.'],
    faqs: [
      {
        question: 'What is percent-encoding?',
        answer: 'Percent-encoding is a mechanism for encoding characters in a Uniform Resource Identifier (URI) under certain circumstances.',
      },
    ],
    relatedSlugs: ['base64-encoder', 'slug-generator', 'json-formatter'],
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    category: 'developer',
    name: 'UUID Generator',
    shortDescription: 'Generate cryptographically random UUID v4 identifiers in bulk.',
    metaDescription: 'Generate cryptographically secure UUID v4 / GUID identifiers. Support for bulk generation, uppercase, and without hyphens.',
    icon: 'Fingerprint',
    popular: true,
    tags: ['uuid', 'guid', 'v4', 'random', 'identifier', 'crypto'],
    formulaTitle: 'UUID Version 4 (RFC 4122)',
    formula: '128-bit number with 122 bits of cryptographic randomness',
    calculationLogic: ['Generates cryptographically strong random values using Web Crypto API.'],
    assumptions: ['Browser Web Cryptography API support.'],
    faqs: [
      {
        question: 'Can two UUID v4 values collide?',
        answer: 'The probability of generating duplicate UUID v4 identifiers is virtually zero (1 in 2^122).',
      },
    ],
    relatedSlugs: ['unix-timestamp-converter', 'base64-encoder', 'json-formatter'],
  },
  {
    id: 'unix-timestamp-converter',
    slug: 'unix-timestamp-converter',
    category: 'developer',
    name: 'Unix Timestamp Converter',
    shortDescription: 'Convert epoch seconds and milliseconds to human-readable dates and UTC times.',
    metaDescription: 'Free Unix timestamp converter. Convert epoch seconds and milliseconds into UTC, local date times, and relative intervals.',
    icon: 'Clock',
    tags: ['unix', 'timestamp', 'epoch', 'seconds', 'utc', 'date'],
    formulaTitle: 'Epoch Time Conversion',
    formula: 'Time elapsed since January 1, 1970 00:00:00 UTC',
    calculationLogic: [
      'Detects 10-digit seconds vs 13-digit milliseconds.',
      'Converts to UTC string, ISO 8601, and localized date-time representation.',
      'Calculates human-readable relative time distance (e.g. 5 minutes ago).',
    ],
    assumptions: ['Unix standard epoch start date.'],
    faqs: [
      {
        question: 'What is the Year 2038 problem?',
        answer: 'On January 19, 2038, 32-bit signed integers will overflow past their maximum value (2,147,483,647). Modern 64-bit systems are unaffected.',
      },
    ],
    relatedSlugs: ['date-difference-calculator', 'time-duration-calculator', 'uuid-generator'],
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    category: 'developer',
    name: 'Regex Tester',
    shortDescription: 'Test regular expressions in real-time with pattern flags and capture group highlighting.',
    metaDescription: 'Free online regex tester. Test regular expressions in real time, view match counts, capture groups, and syntax error explanations.',
    icon: 'Code2',
    featured: true,
    popular: true,
    tags: ['regex', 'regular expression', 'tester', 'pattern', 'matcher', 'javascript'],
    formulaTitle: 'Regular Expression Matcher',
    formula: 'Executes RegExp(pattern, flags) against input text',
    calculationLogic: [
      'Compiles regex pattern with selected flags (g, i, m, s).',
      'Catches syntax errors and provides readable diagnostic messages.',
      'Extracts match indices and named/numbered capture groups.',
    ],
    assumptions: ['Standard ECMAScript RegExp engine specifications.'],
    faqs: [
      {
        question: 'What does the "g" flag do?',
        answer: 'The "g" (global) flag finds all matches rather than stopping after the first occurrence.',
      },
    ],
    relatedSlugs: ['json-validator', 'text-cleaner', 'word-counter'],
  },

  // ==========================================
  // IMAGE (6 tools)
  // ==========================================
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    category: 'image',
    name: 'Image Compressor',
    shortDescription: 'Compress JPG, PNG, and WebP images directly in your browser with zero server upload.',
    metaDescription: 'Free online image compressor. Reduce image file size by up to 80% without losing quality. 100% private client-side processing.',
    icon: 'Minimize2',
    featured: true,
    popular: true,
    tags: ['image compressor', 'compress', 'optimize', 'shrink', 'jpg', 'png', 'webp'],
    formulaTitle: 'Canvas Quality Compression',
    formula: 'Draw to HTML5 Canvas -> canvas.toBlob(type, quality)',
    calculationLogic: [
      'Loads image locally in the browser into an off-screen HTML5 Canvas.',
      'Re-encodes bitmap with customizable compression quality factor.',
      'Calculates exact bytes saved and provides immediate instant download.',
    ],
    assumptions: ['All image data remains 100% on the user device.'],
    faqs: [
      {
        question: 'Are my images uploaded to any server?',
        answer: 'No! QuickSolve processes all images 100% client-side inside your browser for complete privacy.',
      },
      {
        question: 'Does compression reduce image dimensions?',
        answer: 'You can keep original dimensions or optionally scale max width/height for even smaller file sizes.',
      },
    ],
    relatedSlugs: ['image-resizer', 'webp-converter', 'png-to-jpg', 'image-cropper'],
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    category: 'image',
    name: 'Image Resizer',
    shortDescription: 'Resize images to custom width and height while maintaining aspect ratio.',
    metaDescription: 'Free online image resizer. Resize photos by pixels or percentage while maintaining aspect ratio. Fast and private.',
    icon: 'Maximize2',
    popular: true,
    tags: ['image resizer', 'resize', 'scale', 'dimensions', 'width', 'height'],
    formulaTitle: 'Bilinear Image Rescaling',
    formula: 'New Width / Original Width = New Height / Original Height (when locked)',
    calculationLogic: [
      'Inspects natural width and height of uploaded image file.',
      'Computes proportional dimensions when aspect ratio lock is enabled.',
      'Renders high-quality smoothed graphic onto target canvas dimensions.',
    ],
    assumptions: ['Input dimensions must be positive pixel integers.'],
    faqs: [
      {
        question: 'Will resizing distort my photo?',
        answer: 'Keeping the "Maintain Aspect Ratio" checkbox checked ensures your image never stretches or distorts.',
      },
    ],
    relatedSlugs: ['image-compressor', 'image-cropper', 'webp-converter'],
  },
  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    category: 'image',
    name: 'JPG to PNG Converter',
    shortDescription: 'Convert JPG / JPEG photos to lossless PNG format with transparent canvas support.',
    metaDescription: 'Convert JPG images to PNG format online for free. Lossless quality conversion directly in your browser.',
    icon: 'FileImage',
    tags: ['jpg to png', 'jpeg', 'png', 'converter', 'image format'],
    formulaTitle: 'Format Transcoding',
    formula: 'JPG Bitmap -> PNG Lossless Compression',
    calculationLogic: ['Decodes JPEG image and writes lossless PNG binary stream.'],
    assumptions: ['JPEG photos do not contain native alpha transparency.'],
    faqs: [
      {
        question: 'Why convert JPG to PNG?',
        answer: 'PNG uses lossless compression, meaning it preserves sharp lines, text, and graphics without compression artifacts.',
      },
    ],
    relatedSlugs: ['png-to-jpg', 'webp-converter', 'image-compressor'],
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    category: 'image',
    name: 'PNG to JPG Converter',
    shortDescription: 'Convert transparent or heavy PNG files to optimized, compact JPG images.',
    metaDescription: 'Convert PNG images to JPG online for free. Set custom background color for transparency and adjust quality.',
    icon: 'FileImage',
    tags: ['png to jpg', 'png', 'jpg', 'jpeg', 'converter'],
    formulaTitle: 'Format Transcoding with Background Matte',
    formula: 'Fill Background Matte -> Draw PNG -> Export JPEG',
    calculationLogic: [
      'Renders selectable background color (default white) behind transparent areas.',
      'Encodes into high-performance JPEG format.',
    ],
    assumptions: ['JPEG does not support alpha transparency; transparent pixels are rendered on solid background.'],
    faqs: [
      {
        question: 'What happens to transparency when converting to JPG?',
        answer: 'Because JPG cannot store transparency, transparent areas are filled with a clean background color (white by default).',
      },
    ],
    relatedSlugs: ['jpg-to-png', 'webp-converter', 'image-compressor'],
  },
  {
    id: 'webp-converter',
    slug: 'webp-converter',
    category: 'image',
    name: 'WebP Converter',
    shortDescription: 'Convert JPG, PNG, and GIF images to modern next-gen Google WebP format.',
    metaDescription: 'Convert photos to modern WebP format. Reduce image load times on websites by up to 35% compared to JPG/PNG.',
    icon: 'Layers',
    popular: true,
    tags: ['webp', 'convert webp', 'next-gen image', 'seo image', 'speed'],
    formulaTitle: 'WebP Transcoding',
    formula: 'Bitmap -> canvas.toBlob("image/webp", quality)',
    calculationLogic: ['Converts any image file into next-generation WebP format for fast web delivery.'],
    assumptions: ['Supported by all modern browsers.'],
    faqs: [
      {
        question: 'Why use WebP format?',
        answer: 'WebP provides superior lossless and lossy compression, resulting in 25-35% smaller file sizes than comparable JPGs and PNGs.',
      },
    ],
    relatedSlugs: ['image-compressor', 'jpg-to-png', 'png-to-jpg'],
  },
  {
    id: 'image-cropper',
    slug: 'image-cropper',
    category: 'image',
    name: 'Image Cropper',
    shortDescription: 'Crop photos with aspect ratio presets (1:1, 4:3, 16:9) or custom free selection.',
    metaDescription: 'Free online image cropper. Crop photos with popular aspect ratios: square (1:1), 4:3, 16:9, or freehand custom rectangle.',
    icon: 'Crop',
    featured: true,
    tags: ['crop', 'image cropper', 'aspect ratio', 'square', '16:9', 'photo'],
    formulaTitle: 'Coordinate Cropping Matrix',
    formula: 'ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight)',
    calculationLogic: [
      'Allows user to select crop bounds and aspect ratio preset.',
      'Slices precise source pixel bounds and outputs cropped graphic.',
    ],
    assumptions: ['Crop bounding box must be within original image dimensions.'],
    faqs: [
      {
        question: 'Can I crop to a square for profile avatars?',
        answer: 'Yes, select the 1:1 preset to lock a perfect square crop box.',
      },
    ],
    relatedSlugs: ['image-resizer', 'image-compressor', 'webp-converter'],
  },
];

// Helper accessors
export function getAllTools(): ToolMetadata[] {
  return TOOLS;
}

export function getToolBySlug(slug: string): ToolMetadata | undefined {
  const clean = slug.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
  // Also handle category-prefixed paths like "calculators/percentage-calculator" or "students/gpa-calculator"
  const parts = clean.split('/');
  const target = parts[parts.length - 1];
  return TOOLS.find(t => t.slug === target || t.id === target);
}

export function getToolsByCategory(category: string): ToolMetadata[] {
  return TOOLS.filter(t => t.category === category);
}

export function getFeaturedTools(): ToolMetadata[] {
  return TOOLS.filter(t => t.featured);
}

export function getPopularTools(): ToolMetadata[] {
  return TOOLS.filter(t => t.popular);
}

export function searchTools(query: string): ToolMetadata[] {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  return TOOLS.filter(t => {
    return (
      t.name.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    );
  });
}
