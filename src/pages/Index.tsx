import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calculator, BookOpen } from "lucide-react";
import SemesterManager, { Semester } from "@/components/SemesterManager";
import GPADisplay from "@/components/GPADisplay";
import GradeTable from "@/components/GradeTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-primary text-primary-foreground shadow-glow"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">GPA Calculator</h1>
          </div>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto">
            Calculate your semester-wise GPA and cumulative CGPA using the 2025 RIT grade classification system
          </p>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="calculator" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-card shadow-sm">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Grades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SemesterManager
                semesters={semesters}
                onSemestersChange={setSemesters}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GPADisplay semesters={semesters} />
            </motion.div>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GradeTable />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16 py-8 bg-muted/30 border-t border-border"
      >
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 GPA Calculator - Built for RIT 2025 Standards</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
