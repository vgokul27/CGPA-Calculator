import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Course } from "./CourseForm";

interface Semester {
  id: string;
  number: number;
  courses: Course[];
}

interface GPADisplayProps {
  semesters: Semester[];
}

export default function GPADisplay({ semesters }: GPADisplayProps) {
  const calculateGPA = (courses: Course[]) => {
    const validCourses = courses.filter(course => 
      course.credits > 0 && course.grade && course.gradePoint !== undefined
    );
    
    if (validCourses.length === 0) return 0;

    const totalGradePoints = validCourses.reduce((sum, course) => 
      sum + (course.credits * course.gradePoint), 0
    );
    const totalCredits = validCourses.reduce((sum, course) => sum + course.credits, 0);

    return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  };

  const calculateCGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    semesters.forEach(semester => {
      semester.courses.forEach(course => {
        if (course.credits > 0 && course.grade && course.gradePoint !== undefined) {
          totalGradePoints += course.credits * course.gradePoint;
          totalCredits += course.credits;
        }
      });
    });

    return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  };

  const cgpa = calculateCGPA();

  const getGradeClass = (gpa: number) => {
    if (gpa >= 9) return "text-success border-success/20 bg-success/5";
    if (gpa >= 8) return "text-primary border-primary/20 bg-primary/5";
    if (gpa >= 7) return "text-warning border-warning/20 bg-warning/5";
    if (gpa >= 6) return "text-accent border-accent/20 bg-accent/5";
    if (gpa >= 5) return "text-muted-foreground border-muted/20 bg-muted/5";
    return "text-destructive border-destructive/20 bg-destructive/5";
  };

  const getGradeLabel = (gpa: number) => {
    if (gpa >= 9) return "Outstanding";
    if (gpa >= 8) return "Excellent";
    if (gpa >= 7) return "Very Good";
    if (gpa >= 6) return "Good";
    if (gpa >= 5) return "Average";
    return "Poor";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* CGPA Display */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-glow border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Cumulative GPA</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="text-6xl font-bold mb-2"
          >
            {cgpa.toFixed(2)}
          </motion.div>
          <Badge 
            variant="secondary" 
            className="text-lg px-4 py-1 bg-primary-foreground/20 text-primary-foreground border-0"
          >
            {getGradeLabel(cgpa)}
          </Badge>
        </CardContent>
      </Card>

      {/* Semester-wise GPA */}
      <Card className="bg-gradient-card shadow-elegant border-0">
        <CardHeader>
          <CardTitle className="text-primary">Semester-wise GPA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {semesters.map((semester, index) => {
              const gpa = calculateGPA(semester.courses);
              const totalCredits = semester.courses.reduce((sum, course) => 
                course.credits > 0 && course.grade ? sum + course.credits : sum, 0
              );

              return (
                <motion.div
                  key={semester.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Semester {semester.number}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {semester.courses.length} courses, {totalCredits} credits
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {gpa.toFixed(2)}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getGradeClass(gpa)}`}
                    >
                      {getGradeLabel(gpa)}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {semesters.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Add semesters and courses to see your GPA calculations.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}