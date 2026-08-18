"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function SentimentOverview({ stats }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!stats || !chartRef.current) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    const data = [
      { label: 'Positive', value: stats.positivePercent, color: '#10b981' },
      { label: 'Neutral', value: stats.neutralPercent, color: '#64748b' },
      { label: 'Negative', value: stats.negativePercent, color: '#ef4444' }
    ].filter(d => d.value > 0);

    if (data.length === 0) return;

    const width = 240;
    const height = 240;
    const margin = 10;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(data.map(d => d.color));

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label))
      .attr('stroke', '#0f172a')
      .style('stroke-width', '4px')
      .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return arc(d);
        }
      });

  }, [stats]);

  if (!stats) return null;

  return (
    <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-6 shadow-sm backdrop-blur-sm mt-8 flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-1/2">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white mb-2">Sentiment Overview</h2>
          <div className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 border border-blue-500/20">
            Vibe: {stats.vibe}
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-zinc-400 mt-8 max-w-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-emerald-500" />
              <span className="text-base text-zinc-300">Positive</span>
            </div>
            <span className="font-bold text-white text-base">{stats.positivePercent}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-slate-500" />
              <span className="text-base text-zinc-300">Neutral</span>
            </div>
            <span className="font-bold text-white text-base">{stats.neutralPercent}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-rose-500" />
              <span className="text-base text-zinc-300">Negative</span>
            </div>
            <span className="font-bold text-white text-base">{stats.negativePercent}%</span>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
        <div ref={chartRef} className="w-64 h-64 relative drop-shadow-2xl"></div>
        {/* Center label overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-white">{stats.total}</span>
          <span className="text-xs text-zinc-400">Posts</span>
        </div>
      </div>
    </div>
  );
}
