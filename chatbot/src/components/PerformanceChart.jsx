import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "../components/ui/button";

const COLORS = ["#0055FF", "#00C2FF", "#6FD8FF", "#A9E8FF"];
const GRADES_TARGET = 80; 
const ATTENDANCE_TARGET = 85; 

const PerformanceChart = ({
  data,
  dataKey = "percentage",
  secondaryDataKey,
  xAxisKey = "name",
  color = "#0055FF",
  secondaryColor = "#FF3366",
  chartType = "bar",
  student
}) => {
  const [activeChartType, setActiveChartType] = useState(
    student ? "grades" : undefined
  );

  // If student is provided, use the student-specific chart rendering
  if (student) {
    // Transform data for the grades chart
    const gradesData = student.performance.subjectPerformance.map(subject => {
      const percentage = (subject.marks / subject.maxMarks) * 100;
      return {
        name: subject.subject,
        marks: subject.marks,
        percentage: parseFloat(percentage.toFixed(1)),
        target: GRADES_TARGET
      };
    });

    // Transform data for attendance chart
    const attendanceData = student.performance.attendanceHistory;

    // Transform data for the comparison pie chart
    const comparisonData = [
      { name: "Attendance", value: student.performance.attendance },
      { name: "CGPA", value: student.performance.cgpa * 10 } // Scale CGPA to percentage
    ];

    const renderGradesChart = () => (
      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <BarChart
            data={gradesData}
            margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis
              dataKey="name"
              fontSize={12}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none"
              }}
              formatter={(value) => [`${value}%`, "Score"]}
            />
            <Legend />
            <Bar
              dataKey="percentage"
              fill="#0055FF"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              name="Score (%)"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#FF3366"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Target"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );

    const renderAttendanceChart = () => (
      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <LineChart
            data={attendanceData}
            margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis
              dataKey="month"
              fontSize={12}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[60, 100]}
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none"
              }}
              formatter={(value) => [`${value}%`, "Attendance"]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#0055FF"
              strokeWidth={3}
              dot={{ fill: "#0055FF", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: "#001F5C" }}
              name="Attendance (%)"
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey={() => ATTENDANCE_TARGET}
              stroke="#FF3366"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );

    const renderComparisonChart = () => (
      <div className="h-[300px] w-full flex flex-col items-center">
        <ResponsiveContainer height={250}>
          <PieChart>
            <Pie
              data={comparisonData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1000}
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={false}
            >
              {comparisonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, ""]}
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none"
              }}
            />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center text-muted-foreground text-xs">
          CGPA shown as equivalent percentage
        </div>
      </div>
    );

    return (
      <div className="bg-white rounded-xl shadow-subtle p-4 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Performance Analysis</h3>
          <div className="flex space-x-2">
            <Button
              variant={activeChartType === "grades" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChartType("grades")}
              className={
                activeChartType === "grades"
                  ? "bg-college-primary hover:bg-college-secondary"
                  : ""
              }
            >
              Grades
            </Button>
            <Button
              variant={activeChartType === "attendance" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChartType("attendance")}
              className={
                activeChartType === "attendance"
                  ? "bg-college-primary hover:bg-college-secondary"
                  : ""
              }
            >
              Attendance
            </Button>
            <Button
              variant={activeChartType === "comparison" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChartType("comparison")}
              className={
                activeChartType === "comparison"
                  ? "bg-college-primary hover:bg-college-secondary"
                  : ""
              }
            >
              Overview
            </Button>
          </div>
        </div>

        {activeChartType === "grades" && renderGradesChart()}
        {activeChartType === "attendance" && renderAttendanceChart()}
        {activeChartType === "comparison" && renderComparisonChart()}
      </div>
    );
  }

  // Generic chart rendering based on props
  if (chartType === "bar") {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis
              dataKey={xAxisKey}
              fontSize={12}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <YAxis axisLine={false} tickLine={false} fontSize={12} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none"
              }}
            />
            <Legend />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
            {secondaryDataKey && (
              <Bar
                dataKey={secondaryDataKey}
                fill={secondaryColor}
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (chartType === "line") {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis
              dataKey={xAxisKey}
              fontSize={12}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <YAxis axisLine={false} tickLine={false} fontSize={12} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none"
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8 }}
              animationDuration={1000}
            />
            {secondaryDataKey && (
              <Line
                type="monotone"
                dataKey={secondaryDataKey}
                stroke={secondaryColor}
                strokeWidth={3}
                dot={{ fill: secondaryColor, strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={1000}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (chartType === "pie") {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey={dataKey}
              animationDuration={1000}
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none"
              }}
            />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Default fallback
  return null;
};

export default PerformanceChart;
