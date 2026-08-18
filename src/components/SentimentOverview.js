"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TrendingUp, Minus, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function SentimentOverview({ stats }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!stats || !chartRef.current) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    const width = chartRef.current.clientWidth;
    const height = 40;
    const margin = { left: 10, right: 10 };

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .style('overflow', 'visible');

    // AFINN scores practically fall between -3 and 3 for averages
    const xScale = d3.scaleLinear()
      .domain([-3, 3])
      .range([margin.left, width - margin.right])
      .clamp(true);

    // Draw the background track (gradient)
    const defs = svg.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'vibe-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    linearGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ef4444'); // rose-500
    linearGradient.append('stop').attr('offset', '50%').attr('stop-color', '#64748b'); // slate-500
    linearGradient.append('stop').attr('offset', '100%').attr('stop-color', '#10b981'); // emerald-500

    svg.append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', height / 2)
      .attr('y2', height / 2)
      .attr('stroke', 'url(#vibe-gradient)')
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round')
      .attr('opacity', 0.5);

    // Draw the center tick
    svg.append('line')
      .attr('x1', xScale(0))
      .attr('x2', xScale(0))
      .attr('y1', height / 2 - 8)
      .attr('y2', height / 2 + 8)
      .attr('stroke', '#64748b')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'round');

    // Draw the indicator circle
    const indicator = svg.append('circle')
      .attr('cx', xScale(0)) // Start at center for animation
      .attr('cy', height / 2)
      .attr('r', 8)
      .attr('fill', '#ffffff')
      .attr('stroke', '#0f172a') // slate-900 border
      .attr('stroke-width', 2);

    // Animate to actual value
    indicator.transition()
      .duration(1000)
      .ease(d3.easeCubicOut)
      .attr('cx', xScale(stats.averageScore));

    // Cleanup on unmount/resize
    const handleResize = () => {
      if (chartRef.current) {
        const newWidth = chartRef.current.clientWidth;
        xScale.range([margin.left, newWidth - margin.right]);
        
        svg.select('line').attr('x2', newWidth - margin.right);
        svg.select('line:nth-child(3)').attr('x1', xScale(0)).attr('x2', xScale(0));
        indicator.attr('cx', xScale(stats.averageScore));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [stats]);

  if (!stats) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-8 grid gap-4 lg:grid-cols-3"
    >
      <div className="rounded-2xl border border-white/5 bg-slate-800/50 p-8 lg:col-span-2 flex flex-col justify-center">
        <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">Overall Vibe</h2>
        <div className="mt-2 flex items-baseline gap-3">
          <h3 className="text-3xl font-bold tracking-tight text-white">{stats.vibe}</h3>
          <span className="text-sm font-medium text-slate-300">
            {stats.averageScore > 0 ? '+' : ''}{stats.averageScore.toFixed(2)} average
          </span>
        </div>
        
        <div className="mt-8">
          <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
            <span>Negative</span>
            <span>Mixed</span>
            <span>Positive</span>
          </div>
          <div ref={chartRef} className="w-full h-[40px]"></div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-slate-800/50 p-8 flex flex-col justify-center">
        <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase mb-6">Distribution</h2>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="font-medium text-slate-200">Positive</span>
            </div>
            <span className="font-bold text-white text-lg">{stats.positivePercent}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500/10 text-slate-400">
                <Minus className="h-4 w-4" />
              </div>
              <span className="font-medium text-slate-200">Neutral</span>
            </div>
            <span className="font-bold text-white text-lg">{stats.neutralPercent}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <TrendingDown className="h-4 w-4" />
              </div>
              <span className="font-medium text-slate-200">Negative</span>
            </div>
            <span className="font-bold text-white text-lg">{stats.negativePercent}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
