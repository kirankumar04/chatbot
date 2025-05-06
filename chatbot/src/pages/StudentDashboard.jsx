import React, { useState } from "react";
import { useParams } from "react-router-dom"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import StudentCard from "../components/StudentCard";
import PerformanceChart from "../components/PerformanceChart";
import data from "../data/studentData.json"; 
import Navbar from "../components/Navbar";
import ChatbotButton from "../components/ChatbotButton";

const StudentDashboard = () => {
  const { id } = useParams(); 
  const student = data.students.find(s => s.id === parseInt(id));
  // console.log(student)
  const name = student.name;

  const [selectedSemester, setSelectedSemester] = useState("semester8");

  if (!student) {
    return <div className="text-center mt-10 text-red-500 font-bold">Student not found.</div>;
  }

  const current = student.semesters[selectedSemester];

  const performanceData = current.subjects.map((s) => ({
    subject: s.subject,
    marks: s.marks,
    average: s.average,
  }));

  const attendanceData = current.attendanceHistory;

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return "bg-green-500";
    if (attendance >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getCGPAColor = (cgpa) => {
    if (cgpa >= 8.5) return "bg-green-500";
    if (cgpa >= 7.0) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <>
      <Navbar />
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Welcome {name}</h1>

      {/* Semester Selector */}
      <div className="mb-4">
        <label htmlFor="semester" className="font-medium mr-2">
          Select Semester:
        </label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="border p-2 rounded"
        >
          {Object.keys(student.semesters).map((sem) => (
            <option key={sem} value={sem}>
              {sem.replace("semester", "Semester ")}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Attendance</CardTitle>
            <CardDescription>Selected semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{current.attendance}%</span>
              <div className={`h-3 w-3 rounded-full ${getAttendanceColor(current.attendance)}`} />
            </div>
            <Progress
              value={current.attendance}
              className="h-2"
              indicatorClassName={getAttendanceColor(current.attendance)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">CGPA</CardTitle>
            <CardDescription>Cumulative</CardDescription>
          </CardHeader>
          <CardContent>
          <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{current.cgpa}/10</span>
              <div className={`h-3 w-3 rounded-full ${getCGPAColor(current.cgpa)}`} />
            </div>
            <Progress
              value={current.cgpa * 10}
              className="h-2 mt-2"
              indicatorClassName={getCGPAColor(current.cgpa)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Fees Status</CardTitle>
            <CardDescription>Selected semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{current.feesStatus}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Charts and Details */}
      <Tabs defaultValue="overview" className="mb-8 p-2">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <StudentCard
                student={{
                  ...student,
                  performance: {
                    attendance: current.attendance,
                    cgpa: current.cgpa,
                    feesStatus: current.feesStatus,
                    subjectPerformance: current.subjects,
                  },
                }}
                detailed
              />
            </div>
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    data={performanceData}
                    dataKey="marks"
                    secondaryDataKey="average"
                    xAxisKey="subject"
                    chartType="bar"
                    color="#0055FF"
                    secondaryColor="#00C2FF"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PerformanceChart
                    data={attendanceData}
                    dataKey="percentage"
                    xAxisKey="month"
                    chartType="line"
                    color="#0055FF"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {current.subjects.map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{subject.subject}</span>
                        <span className="text-sm font-medium">
                          {85 + Math.floor(Math.random() * 10)}%
                        </span>
                      </div>
                      <Progress value={85 + Math.floor(Math.random() * 10)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PerformanceChart
                    data={performanceData}
                    dataKey="marks"
                    xAxisKey="subject"
                    chartType="bar"
                    color="#0055FF"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Detailed Marks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {current.subjects.map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{subject.subject}</span>
                        <span className="text-sm font-medium">
                          {subject.marks}/{subject.maxMarks}
                        </span>
                      </div>
                      <Progress
                        value={(subject.marks / subject.maxMarks) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
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

export default StudentDashboard;
