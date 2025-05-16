"use client";
import React from "react";
import { Typography, Container, Box } from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", expenses: 400, income: 800 },
  { month: "Feb", expenses: 460, income: 750 },
  { month: "Mar", expenses: 420, income: 820 },
  { month: "Apr", expenses: 500, income: 900 },
  { month: "May", expenses: 480, income: 950 },
  { month: "Jun", expenses: 510, income: 990 },
];

const debtToIncome = [
  { month: "Jan", debt: 400, income: 800 },
  { month: "Feb", debt: 460, income: 750 },
  { month: "Mar", debt: 420, income: 820 },
  { month: "Apr", debt: 500, income: 900 },
  { month: "May", debt: 480, income: 950 },
  { month: "Jun", debt: 510, income: 990 },
];

const aiData = [
  { month: "Jan", actualIncome: 800, aiRecommendedUsage: 720 },
  { month: "Feb", actualIncome: 750, aiRecommendedUsage: 690 },
  { month: "Mar", actualIncome: 820, aiRecommendedUsage: 760 },
  { month: "Apr", actualIncome: 900, aiRecommendedUsage: 840 },
  { month: "May", actualIncome: 950, aiRecommendedUsage: 870 },
  { month: "Jun", actualIncome: 990, aiRecommendedUsage: 910 },
];

export default function FinanceHomePage() {
  return (
    <Container maxWidth="lg">
      <Box mt={8} mb={6} textAlign="center">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          📊 Your Finance Dashboard
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={4}>
          A clear visual summary of your income, expenses, and smart usage
        </Typography>

        {/* Flex container for charts */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={4}
        >
          {/* Chart 1: Income vs Expenses */}
          <Box flex="1 1 48%">
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
            >
              📈 Income vs Expenses
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#4caf50"
                  strokeWidth={2}
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#f44336"
                  strokeWidth={2}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Chart 2: Income vs Debt */}
          <Box flex="1 1 48%">
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
            >
              🧱 Income vs Debt
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={debtToIncome}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="debt" fill="#81c784" name="Debt" />
                <Bar dataKey="income" fill="#e57373" name="Income" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Chart 3: AI-Informed Usage */}
          <Box flex="1 1 48%">
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
            >
              🤖 AI-Informed Usage
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={aiData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actualIncome"
                  stroke="#4caf50"
                  strokeWidth={2}
                  name="Actual Income"
                />
                <Line
                  type="monotone"
                  dataKey="aiRecommendedUsage"
                  stroke="#ff9800"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="AI Recommended Usage"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Chart 4: Expense Breakdown */}
          <Box flex="1 1 48%">
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
            >
              📉 Expense Breakdown (Sample)
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expenses" fill="#ff9800" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
