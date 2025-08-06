import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const gradeData = [
  { letter: "O", point: 10, description: "Outstanding" },
  { letter: "A+", point: 9, description: "Excellent" },
  { letter: "A", point: 8, description: "Very Good" },
  { letter: "B+", point: 7, description: "Good" },
  { letter: "B", point: 6, description: "Above Average" },
  { letter: "C", point: 5, description: "Average" },
  { letter: "U", point: 0, description: "Fail" },
];

export default function GradeTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-card shadow-elegant border-0">
        <CardHeader>
          <CardTitle className="text-primary font-semibold">
            RIT Grade Classification (2025)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Letter Grade</th>
                  <th className="px-4 py-3 text-left font-medium">Grade Point</th>
                  <th className="px-4 py-3 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {gradeData.map((grade, index) => (
                  <motion.tr
                    key={grade.letter}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      border-b border-border transition-colors hover:bg-muted/50
                      ${grade.letter === 'U' ? 'bg-destructive/5' : ''}
                      ${grade.letter === 'O' ? 'bg-success/5' : ''}
                    `}
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {grade.letter}
                    </td>
                    <td className="px-4 py-3 font-medium text-primary">
                      {grade.point}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {grade.description}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}