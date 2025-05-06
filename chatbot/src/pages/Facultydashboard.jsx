import React from "react";
import { Link } from "react-router-dom"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import StudentCard from "../components/StudentCard";
import PerformanceChart from "../components/PerformanceChart";
import { useParams } from "react-router-dom";
import data from "../data/studentData.json";
import { Button } from "../components/ui/button";
import ChatbotButton from "../components/ChatbotButton";
import Navbar from "../components/Navbar";

const FacultyDashboard = () => {
  const { id } = useParams();

  const faculty = data.faculty.find(f => f.id === id);
  const name = faculty.name;
  const studentsData = data.students.filter(s => s.facultyId === id);

  const getLatestPerformance = (student) => {
    const semesters = Object.values(student.semesters || {});
    return semesters[semesters.length - 1];
  };

  const studentsWithPerformance = studentsData.map(student => {
    const latest = getLatestPerformance(student);
    return {
      ...student,
      performance: {
        attendance: latest?.attendance ?? 0,
        cgpa: latest?.cgpa ?? 0,
        feesStatus: latest?.feesStatus ?? "unknown"
      }
    };
  });

  const avgCgpa = (
    studentsWithPerformance.reduce((acc, student) => acc + (student.performance.cgpa || 0), 0) /
    studentsWithPerformance.length
  ).toFixed(2);

  const attentionStudents = studentsWithPerformance.filter((student) => {
    const perf = student.performance;
    return perf.attendance < 75 || perf.cgpa < 7.0 || perf.feesStatus !== "paid";
  });

  const performanceData = [
    {
      name: "Attendance <75%",
      value: attentionStudents.filter(s => s.performance.attendance < 75).length,
    },
    {
      name: "CGPA <7.0",
      value: attentionStudents.filter(s => s.performance.cgpa < 7.0).length,
    },
    {
      name: "Fees Unpaid/Partial",
      value: attentionStudents.filter(s => s.performance.feesStatus !== "paid").length,
    },
    {
      name: "Good Standing",
      value: studentsWithPerformance.length - attentionStudents.length,
    },
  ];

  const avgPerformanceData = studentsWithPerformance.map(student => ({
    subject: student.name,
    attendance: student.performance.attendance,
    cgpa: student.performance.cgpa * 10,
  }));

  return (
    <>
      <Navbar />
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Welcome {name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {faculty && (
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{faculty.name}</CardTitle>
              <CardDescription>{faculty.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={faculty.profileImg}
                alt={faculty.name}
                className="w-24 h-24 rounded-full mx-auto"
              />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Students</CardTitle>
            <CardDescription>Under your mentorship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsWithPerformance.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average CGPA</CardTitle>
            <CardDescription>All mentees (latest sem)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCgpa}/10</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Attention Required</CardTitle>
            <CardDescription>Students needing follow-up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attentionStudents.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="mb-8">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentsWithPerformance.map(student => (
              <div key={student.id}>
                <StudentCard student={student} />
                {/* Add View Details button below each student */}
                <CardFooter className="pt-1">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full text-college-primary hover:text-college-secondary hover:bg-college-light"
                  >
                    <Link to={`/student/${student.id}`}>
                      <span>View Details</span>
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparative Performance</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <PerformanceChart
                  data={avgPerformanceData}
                  dataKey="cgpa"
                  secondaryDataKey="attendance"
                  xAxisKey="subject"
                  color="#0055FF"
                  secondaryColor="#00C2FF"
                  chartType="bar"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      {/* Chatbot Button */}
      <ChatbotButton />
    </div>
    </>
  );
};

export default FacultyDashboard;
