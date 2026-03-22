// import { useState } from 'react';
// import { Trophy, Map as MapIcon, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// // Mock data for Solapur Wards
// const wardStats = [
//   { id: 1, name: 'Ward 1 (City North)', complaints: 24, resolution: 85, status: 'good' },
//   { id: 2, name: 'Ward 2 (City South)', complaints: 42, resolution: 45, status: 'bad' },
//   { id: 3, name: 'Ward 3 (Bale)', complaints: 12, resolution: 92, status: 'excellent' },
//   { id: 4, name: 'Ward 4 (Karmala)', complaints: 38, resolution: 30, status: 'critical' },
//   { id: 5, name: 'Ward 5 (Barshi)', complaints: 18, resolution: 70, status: 'good' },
//   { id: 6, name: 'Ward 6 (Pandharpur)', complaints: 55, resolution: 20, status: 'critical' },
// ];

// export default function WardAnalytics() {
//   const [selectedWard, setSelectedWard] = useState(wardStats[0]);

//   // Sorting for Leaderboard
//   const leaderboard = [...wardStats].sort((a, b) => b.resolution - a.resolution);

//   return (
//     <div className="space-y-6 animate-fade-in text-left">
//       <div>
//         <h1 className="text-2xl font-bold text-[#25304F]">Geospatial Insights</h1>
//         <p className="text-muted-foreground">Interactive performance map of Solapur District wards</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* --- MAP SECTION --- */}
//         <Card className="lg:col-span-2 overflow-hidden border-2 border-[#25304F]/10">
//           <CardHeader className="bg-slate-50 border-b">
//             <CardTitle className="text-sm font-medium flex items-center gap-2">
//               <MapIcon className="h-4 w-4 text-[#25304F]" /> Interactive Ward Map
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-10 flex flex-col items-center justify-center min-h-[400px]">
//             {/* Mock SVG Map for Solapur */}
//             <svg viewBox="0 0 500 400" className="w-full max-w-md drop-shadow-xl cursor-pointer">
//               {wardStats.map((ward, index) => {
//                 // Determine color based on resolution
//                 const color = ward.resolution > 80 ? '#10b981' : ward.resolution > 50 ? '#3b82f6' : '#ef4444';
                
//                 return (
//                   <path
//                     key={ward.id}
//                     d={`M${100 + (index * 60)},${100 + (index % 2 * 50)} L${180 + (index * 60)},${80 + (index % 2 * 50)} L${200 + (index * 60)},${150 + (index % 2 * 50)} L${120 + (index * 60)},${180 + (index % 2 * 50)} Z`}
//                     fill={color}
//                     stroke="white"
//                     strokeWidth="3"
//                     className={cn(
//                       "transition-all duration-300 hover:opacity-80 hover:scale-[1.02]",
//                       selectedWard.id === ward.id ? "stroke-black stroke-[4px]" : ""
//                     )}
//                     onClick={() => setSelectedWard(ward)}
//                   />
//                 );
//               })}
//             </svg>
//             <div className="mt-8 flex gap-6 text-xs font-semibold">
//               <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-emerald-500" /> High Performance</div>
//               <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-blue-500" /> On Track</div>
//               <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-red-500" /> Critical Attention</div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* --- LEADERBOARD SECTION --- */}
//         <div className="space-y-6">
//           <Card className="border-t-4 border-t-yellow-500 shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <Trophy className="h-5 w-5 text-yellow-500" /> Performance Leaderboard
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-0">
//               {leaderboard.map((ward, index) => (
//                 <div 
//                   key={ward.id} 
//                   className={cn(
//                     "flex items-center justify-between p-4 border-b last:border-0",
//                     index === 0 ? "bg-yellow-50/50" : ""
//                   )}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="font-bold text-slate-400 w-4">{index + 1}</span>
//                     <div>
//                       <p className="text-sm font-bold">{ward.name}</p>
//                       <p className="text-[10px] text-muted-foreground uppercase">{ward.complaints} Pending</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-bold">{ward.resolution}%</span>
//                     {index === 0 && <Trophy className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* --- WARD QUICK VIEW --- */}
//           <Card className="bg-[#25304F] text-white">
//             <CardContent className="p-6">
//               <p className="text-xs uppercase tracking-widest text-slate-300 font-bold mb-1">Selected Ward Details</p>
//               <h3 className="text-xl font-bold mb-4">{selectedWard.name}</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="p-3 bg-white/10 rounded-lg">
//                   <TrendingUp className="h-4 w-4 mb-2 text-emerald-400" />
//                   <p className="text-xs">Resolution</p>
//                   <p className="text-lg font-bold">{selectedWard.resolution}%</p>
//                 </div>
//                 <div className="p-3 bg-white/10 rounded-lg">
//                   <AlertTriangle className="h-4 w-4 mb-2 text-orange-400" />
//                   <p className="text-xs">Complaints</p>
//                   <p className="text-lg font-bold">{selectedWard.complaints}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { Flame, Info, AlertTriangle } from 'lucide-react';
// import { cn } from '@/lib/utils';

// // Mock data for "Problem Zones" in Solapur
// const hotZones = [
//   { id: 1, name: 'Solapur City South', top: '40%', left: '45%', intensity: 'high', complaints: 85 },
//   { id: 2, name: 'Barshi Road Junction', top: '25%', left: '60%', intensity: 'medium', complaints: 45 },
//   { id: 3, name: 'Pandharpur Entry', top: '65%', left: '30%', intensity: 'high', complaints: 92 },
//   { id: 4, name: 'Akkalkot Road', top: '55%', left: '70%', intensity: 'low', complaints: 12 },
// ];

// export default function HeatmapView() {
//   const [activeZone, setActiveZone] = useState(hotZones[0]);

//   return (
//     <div className="space-y-6 text-left animate-in fade-in duration-500">
//       <div>
//         <h1 className="text-2xl font-bold text-[#25304F] flex items-center gap-2">
//           <Flame className="text-orange-600" /> Heatmap of Neglect
//         </h1>
//         <p className="text-muted-foreground">AI-powered predictive analysis of road degradation in Solapur District.</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* THE MAP AREA */}
//         <div className="lg:col-span-3 relative bg-slate-200 rounded-2xl overflow-hidden border-4 border-white shadow-2xl min-h-[500px]">
          
//           {/* PLACEHOLDER FOR MAP IMAGE - Replace 'src' with your actual map image path */}
//           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-40 grayscale" />
          
//           {/* HEATMAP OVERLAYS (THE GLOWING CIRCLES) */}
//           {hotZones.map((zone) => (
//             <div
//               key={zone.id}
//               style={{ top: zone.top, left: zone.left }}
//               className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
//               onClick={() => setActiveZone(zone)}
//             >
//               {/* Outer Glow Pulse */}
//               <div className={cn(
//                 "absolute inset-0 rounded-full animate-ping opacity-75",
//                 zone.intensity === 'high' ? "bg-red-500" : "bg-orange-500"
//               )} style={{ width: '60px', height: '60px' }} />
              
//               {/* Inner Solid Glow */}
//               <div className={cn(
//                 "h-8 w-8 rounded-full blur-md",
//                 zone.intensity === 'high' ? "bg-red-600" : "bg-orange-500"
//               )} />
//             </div>
//           ))}

//           {/* PREDICTIVE OVERLAY BADGE */}
//           <div className="absolute top-4 left-4 bg-black/80 text-white p-3 rounded-lg border border-orange-500 flex items-center gap-2">
//             <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
//             <span className="text-xs font-bold uppercase tracking-tighter">Predictive Mode: Active</span>
//           </div>
//         </div>

//         {/* SIDEBAR DETAILS */}
//         <div className="space-y-4">
//           <div className="bg-white p-4 rounded-xl border-2 border-orange-100 shadow-sm">
//             <h3 className="text-sm font-bold text-slate-500 uppercase">Zone Status</h3>
//             <p className="text-xl font-bold text-[#25304F]">{activeZone.name}</p>
//             <div className="mt-4 space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm">Complaint Density</span>
//                 <span className="font-bold text-red-600">{activeZone.complaints}</span>
//               </div>
//               <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                 <div 
//                   className="bg-red-500 h-full transition-all duration-1000" 
//                   style={{ width: `${(activeZone.complaints / 100) * 100}%` }} 
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="bg-orange-600 p-4 rounded-xl text-white shadow-lg">
//             <div className="flex items-center gap-2 mb-2">
//               <AlertTriangle className="h-4 w-4" />
//               <h3 className="text-sm font-bold">Predictive Alert</h3>
//             </div>
//             <p className="text-xs leading-relaxed opacity-90">
//               Based on historical rainfall data in <b>{activeZone.name}</b>, we predict a 45% increase in pothole formation over the next 14 days. 
//             </p>
//             <button className="mt-4 w-full bg-white text-orange-600 py-2 rounded-lg text-xs font-bold hover:bg-orange-50 transition-colors">
//               Deploy Preventive Maintenance
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Flame, Info, AlertTriangle, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
// Assuming you saved the image as solapur-outline.png in your assets
import solapurMap from '../../assets/solapurMap.png'

const hotZones = [
  { id: 1, name: 'Karmala', top: '22%', left: '28%', intensity: 'medium', complaints: 34 },
  { id: 2, name: 'Barshi', top: '32%', left: '60%', intensity: 'high', complaints: 88 },
  { id: 3, name: 'Solapur City', top: '55%', left: '58%', intensity: 'high', complaints: 95 },
  { id: 4, name: 'Pandharpur', top: '58%', left: '35%', intensity: 'medium', complaints: 52 },
  { id: 5, name: 'Sangola', top: '82%', left: '28%', intensity: 'low', complaints: 12 },
  { id: 6, name: 'Akkalkot', top: '75%', left: '78%', intensity: 'high', complaints: 76 },
];

export default function HeatmapView() {
  const [activeZone, setActiveZone] = useState(hotZones[2]); // Default to Solapur City

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#25304F] flex items-center gap-2">
            <Flame className="text-orange-600 animate-pulse" /> Geospatial Insights
          </h1>
          <p className="text-muted-foreground">Spatial distribution of road damage across Solapur District tehsils.</p>
        </div>
        <div className="hidden md:block bg-slate-100 px-3 py-1 rounded-full border text-[10px] font-bold text-slate-500">
          DATA REFRESHED: JUST NOW
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* MAP CONTAINER */}
        <div className="lg:col-span-3 relative bg-white rounded-3xl border-2 border-slate-100 shadow-xl min-h-[550px] flex items-center justify-center p-8 overflow-hidden">
          
          {/* THE SOLAPUR OUTLINE IMAGE */}
         <img 
  src={solapurMap} 
  alt="Solapur District Map" 
  className="w-full h-full object-contain opacity-80"
/>
          
          {/* HEATMAP GLOW POINTS */}
          {hotZones.map((zone) => (
            <button
              key={zone.id}
              style={{ top: zone.top, left: zone.left }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 z-20 group"
              onClick={() => setActiveZone(zone)}
            >
              <div className={cn(
                "absolute inset-0 rounded-full animate-ping opacity-40",
                zone.intensity === 'high' ? "bg-red-500" : "bg-orange-500"
              )} style={{ width: '50px', height: '50px' }} />
              
              <div className={cn(
                "h-5 w-5 rounded-full border-2 border-white shadow-lg",
                zone.intensity === 'high' ? "bg-red-600" : "bg-orange-500"
              )} />
              
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#25304F] text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                {zone.name}
              </div>
            </button>
          ))}

          {/* AI OVERLAY BADGE */}
          <div className="absolute bottom-6 left-6 bg-[#25304F]/90 text-white p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-3 w-3 text-orange-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">System Status</span>
            </div>
            <p className="text-xs font-medium italic">"Analyzing soil moisture & traffic patterns..."</p>
          </div>
        </div>

        {/* SIDEBAR ANALYSIS */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-lg">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Active Analysis</h3>
            <p className="text-xl font-bold text-[#25304F]">{activeZone.name}</p>
            
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1 uppercase">
                  <span>Severity Score</span>
                  <span className={activeZone.intensity === 'high' ? 'text-red-600' : 'text-orange-600'}>
                    {activeZone.intensity === 'high' ? 'Critical' : 'Moderate'}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-700", 
                      activeZone.intensity === 'high' ? 'bg-red-500' : 'bg-orange-500')} 
                    style={{ width: `${activeZone.complaints}%` }} 
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-50">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Historical data for <b>{activeZone.name}</b> indicates a recurring degradation pattern near major arterial junctions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-5 rounded-2xl border-2 border-orange-200">
            <h3 className="text-xs font-bold text-orange-800 flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4" /> Smart Recommendation
            </h3>
            <p className="text-[11px] text-orange-900 leading-normal mb-4">
              AI suggests immediate preventive sealing in <b>{activeZone.name}</b> to avoid complete road failure before the monsoon season.
            </p>
            <button className="w-full bg-orange-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-orange-700 transition-all shadow-md active:scale-95">
              Deploy Survey Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}