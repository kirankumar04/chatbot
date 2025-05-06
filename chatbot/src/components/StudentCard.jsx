import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Phone, Mail } from "lucide-react";
import { Progress } from "../components/ui/progress";

const StudentCard = ({ student, detailed=false }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
    <Card className= 'overflow-hidden transition-all duration-300 hover:shadow-lg'>
      <CardHeader className="pb-4 flex flex-row justify-between items-start">
        <div className="flex items-center space-x-6">
          {/* Profile Picture */}
          <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
            <AvatarImage src={student.profileImg} alt={student.name} />
            <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
          </Avatar>

          {/* Name and Contact Information */}
          <div>
            <CardTitle className="text-xl font-semibold">{student.name}</CardTitle>
            <div className="space-y-1">
              <CardDescription className="text-sm text-muted-foreground">
                {student.regNo}
              </CardDescription>
              <CardDescription className="text-sm text-muted-foreground">
                {student.email}
              </CardDescription>
            </div>
          </div>
        </div>

        {/* Department Badge */}
        <Badge variant="outline" className="text-sm px-3 py-1 border-college-light bg-college-light text-college-primary">
          {student.department}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-3">
        {/* Attendance Section */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Attendance</div>
          <div className="flex items-center space-x-2">
            <div className="font-medium text-lg">{student.performance.attendance}%</div>
            <div className={`h-2 w-2 rounded-full ${getAttendanceColor(student.performance.attendance)}`} />
          </div>
        </div>
        <Progress
          value={student.performance.attendance}
          className="h-1.5 rounded-xl"
          indicatorClassName={getAttendanceColor(student.performance.attendance)}
        />

        {/* CGPA Section */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">CGPA</div>
          <div className="flex items-center space-x-2">
            <div className="font-medium text-lg">{student.performance.cgpa}</div>
            <div className={`h-2 w-2 rounded-full ${getCGPAColor(student.performance.cgpa)}`} />
          </div>
        </div>
        <Progress
          value={student.performance.cgpa * 10}
          className="h-1.5 rounded-xl"
          indicatorClassName={getCGPAColor(student.performance.cgpa)}
        />

        {/* Fees Status */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Fees Status</div>
          <Badge
            variant="outline"
            className={`capitalize text-sm px-3 py-1 ${student.performance.feesStatus === "paid"
              ? "border-green-200 bg-green-50 text-green-700"
              : student.performance.feesStatus === "partial"
                ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                : "border-red-200 bg-red-50 text-red-700"
              }`}
          >
            {student.performance.feesStatus}
          </Badge>
        </div>
      </CardContent>

      {/* Detailed Info */}
      {detailed && (
        <CardFooter className="pt-4 border-t border-dashed border-gray-200">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm truncate">{student.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">{student.phone}</span>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default StudentCard;
