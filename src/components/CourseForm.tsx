import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  gradePoint: number;
}

interface CourseFormProps {
  courses: Course[];
  onCoursesChange: (courses: Course[]) => void;
  semesterNumber: number;
}

const gradeOptions = [
  { value: "O", label: "O (10)", points: 10 },
  { value: "A+", label: "A+ (9)", points: 9 },
  { value: "A", label: "A (8)", points: 8 },
  { value: "B+", label: "B+ (7)", points: 7 },
  { value: "B", label: "B (6)", points: 6 },
  { value: "C", label: "C (5)", points: 5 },
  { value: "U", label: "U (0)", points: 0 },
];

export default function CourseForm({ courses, onCoursesChange, semesterNumber }: CourseFormProps) {
  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: "",
      credits: 0,
      grade: "",
      gradePoint: 0,
    };
    onCoursesChange([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    onCoursesChange(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    onCoursesChange(courses.map(course => {
      if (course.id === id) {
        const updatedCourse = { ...course, [field]: value };
        if (field === 'grade') {
          const gradeOption = gradeOptions.find(g => g.value === value);
          updatedCourse.gradePoint = gradeOption?.points || 0;
        }
        return updatedCourse;
      }
      return course;
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-primary">
          Semester {semesterNumber} Courses
        </h3>
        <Button
          onClick={addCourse}
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      <AnimatePresence>
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Card className="bg-gradient-card shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-1">
                    <Label htmlFor={`course-name-${course.id}`} className="text-sm font-medium text-foreground">
                      Course Name
                    </Label>
                    <Input
                      id={`course-name-${course.id}`}
                      placeholder="e.g., Mathematics"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`course-credits-${course.id}`} className="text-sm font-medium text-foreground">
                      Credits
                    </Label>
                    <Input
                      id={`course-credits-${course.id}`}
                      type="number"
                      min="1"
                      max="10"
                      placeholder="4"
                      value={course.credits || ''}
                      onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`course-grade-${course.id}`} className="text-sm font-medium text-foreground">
                      Grade
                    </Label>
                    <Select
                      value={course.grade}
                      onValueChange={(value) => updateCourse(course.id, 'grade', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        {gradeOptions.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="hover:bg-muted focus:bg-muted"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Button
                      onClick={() => removeCourse(course.id)}
                      variant="outline"
                      size="sm"
                      className="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground border-destructive/30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {courses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-muted-foreground"
        >
          <p>No courses added yet. Click "Add Course" to get started.</p>
        </motion.div>
      )}
    </motion.div>
  );
}