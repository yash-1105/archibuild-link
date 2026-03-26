import { useState } from "react";
import { Plus, DollarSign, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { projects, expenses } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const categoryData = expenses.reduce((acc, e) => {
  const existing = acc.find(a => a.name === e.category);
  if (existing) existing.value += e.amount;
  else acc.push({ name: e.category, value: e.amount });
  return acc;
}, [] as { name: string; value: number }[]);

const catColors = ["hsl(230, 80%, 65%)", "hsl(270, 80%, 65%)", "hsl(152, 69%, 40%)", "hsl(38, 92%, 50%)", "hsl(0, 72%, 51%)", "hsl(217, 91%, 60%)"];

const BudgetPage = () => {
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const remaining = totalBudget - totalSpent;
  const budgetPercent = Math.round((totalSpent / totalBudget) * 100);

  const projectBudgets = projects.filter(p => p.status !== "completed").map(p => ({
    name: p.name.split(" ").slice(0, 2).join(" "),
    budget: p.budget / 1000,
    spent: p.spent / 1000,
    percent: Math.round((p.spent / p.budget) * 100),
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Budget</h1>
          <p className="text-sm text-muted-foreground mt-1">Financial overview across all projects</p>
        </div>
        <Button className="byld-gradient text-primary-foreground border-0 shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Budget</span>
          </div>
          <p className="text-3xl font-bold font-display text-foreground">${(totalBudget / 1e6).toFixed(1)}M</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-4 w-4 text-warning" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Spent</span>
          </div>
          <p className="text-3xl font-bold font-display text-warning">${(totalSpent / 1e6).toFixed(1)}M</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Remaining</span>
          </div>
          <p className="text-3xl font-bold font-display text-success">${(remaining / 1e6).toFixed(1)}M</p>
        </div>
      </div>

      <Progress value={budgetPercent} className="h-2" />
      <p className="text-xs text-muted-foreground text-center">{budgetPercent}% of total budget utilized</p>

      {/* Budget Alert */}
      {budgetPercent > 60 && (
        <div className="rounded-xl border border-warning/30 bg-warning-light p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
          <div>
            <p className="text-sm font-medium text-warning-foreground">Budget Alert</p>
            <p className="text-xs text-warning-foreground/80">Portfolio budget utilization is at {budgetPercent}%. Review upcoming expenses.</p>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <h3 className="font-display font-semibold text-foreground text-sm mb-4">Budget by Project</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={projectBudgets} barGap={4}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: 'hsl(220, 25%, 7%)', border: '1px solid hsl(220, 20%, 14%)', borderRadius: '8px', color: 'hsl(210, 20%, 92%)' }} />
              <Bar dataKey="budget" fill="hsl(220, 20%, 20%)" radius={[4, 4, 0, 0]} name="Budget ($K)" />
              <Bar dataKey="spent" fill="hsl(230, 80%, 65%)" radius={[4, 4, 0, 0]} name="Spent ($K)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <h3 className="font-display font-semibold text-foreground text-sm mb-4">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={catColors[i % catColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(220, 25%, 7%)', border: '1px solid hsl(220, 20%, 14%)', borderRadius: '8px', color: 'hsl(210, 20%, 92%)' }} formatter={(value: number) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {categoryData.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: catColors[i % catColors.length] }} />
                <span className="text-[10px] text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expense List */}
      <div>
        <h3 className="font-display font-semibold text-foreground mb-3">Recent Expenses</h3>
        <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/30">
          {expenses.map(exp => (
            <div key={exp.id} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">{exp.description}</p>
                <p className="text-xs text-muted-foreground">{exp.category} · {exp.date}</p>
              </div>
              <span className="text-sm font-semibold text-foreground">${exp.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
