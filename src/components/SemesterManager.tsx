import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CourseForm, { Course } from "./CourseForm";

export interface Semester {
  id: string;
  number: number;
  courses: Course[];
}

interface SemesterManagerProps {
  semesters: Semester[];
  onSemestersChange: (semesters: Semester[]) => void;
}

export default function SemesterManager({ semesters, onSemestersChange }: SemesterManagerProps) {
  const [openSemesters, setOpenSemesters] = useState<string[]>([]);

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      number: semesters.length + 1,
      courses: [],
    };
    onSemestersChange([...semesters, newSemester]);
    setOpenSemesters([...openSemesters, newSemester.id]);
  };

  const removeSemester = (id: string) => {
    const updatedSemesters = semesters.filter(semester => semester.id !== id);
    // Renumber semesters
    const renumberedSemesters = updatedSemesters.map((semester, index) => ({
      ...semester,
      number: index + 1,
    }));
    onSemestersChange(renumberedSemesters);
    setOpenSemesters(openSemesters.filter(semId => semId !== id));
  };

  const updateSemesterCourses = (semesterId: string, courses: Course[]) => {
    onSemestersChange(semesters.map(semester =>
      semester.id === semesterId ? { ...semester, courses } : semester
    ));
  };

  const toggleSemester = (semesterId: string) => {
    setOpenSemesters(prev =>
      prev.includes(semesterId)
        ? prev.filter(id => id !== semesterId)
        : [...prev, semesterId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Academic Semesters</h2>
        <Button
          onClick={addSemester}
          className="gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          <Plus className="h-5 w-5" />
          Add Semester
        </Button>
      </div>

      <AnimatePresence>
        {semesters.map((semester, index) => {
          const isOpen = openSemesters.includes(semester.id);
          const totalCredits = semester.courses.reduce((sum, course) => 
            course.credits > 0 && course.grade ? sum + course.credits : sum, 0
          );
          const completedCourses = semester.courses.filter(course => 
            course.credits > 0 && course.grade
          ).length;

          return (
            <motion.div
              key={semester.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="bg-gradient-card shadow-elegant border-0 overflow-hidden">
                <Collapsible open={isOpen} onOpenChange={() => toggleSemester(semester.id)}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="h-5 w-5 text-primary" />
                          </motion.div>
                          <CardTitle className="text-xl text-primary">
                            Semester {semester.number}
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right text-sm text-muted-foreground">
                            <div>{completedCourses} courses</div>
                            <div>{totalCredits} credits</div>
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSemester(semester.id);
                            }}
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        <CourseForm
                          courses={semester.courses}
                          onCoursesChange={(courses) => updateSemesterCourses(semester.id, courses)}
                          semesterNumber={semester.number}
                        />
                      </CardContent>
                    </motion.div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {semesters.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-muted-foreground mb-4">
            <p className="text-lg">No semesters added yet.</p>
            <p>Click "Add Semester" to start tracking your academic progress.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}