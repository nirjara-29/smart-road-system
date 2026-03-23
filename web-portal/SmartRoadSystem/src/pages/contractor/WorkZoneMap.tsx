// import { useState } from 'react';
// import { MapPin, CheckCircle2, Clock, AlertCircle, Navigation } from 'lucide-react';
// import { cn } from '@/lib/utils';
// // Import your Solapur map image
// import solapurMap from '@/assets/pothole.jpeg';
// const workOrders = [
//   { 
//     id: "WO-101", 
//     location: "Saat Rasta Junction", 
//     top: '55%', left: '58%', 
//     status: 'in-progress', 
//     team: 'Alpha Team',
//     eta: '2 hrs' 
//   },
//   { 
//     id: "WO-102", 
//     location: "Barshi Road (NH-52)", 
//     top: '35%', left: '62%', 
//     status: 'pending', 
//     team: 'Beta Team',
//     eta: 'Scheduled' 
//   },
//   { 
//     id: "WO-103", 
//     location: "Near Zilla Parishad", 
//     top: '48%', left: '52%', 
//     status: 'completed', 
//     team: 'Gamma Team',
//     eta: 'Done' 
//   },
// ];

// export default function WorkZoneMap() {
//   const [selectedOrder, setSelectedOrder] = useState(workOrders[0]);

//   return (
//     <div className="space-y-4 animate-in fade-in duration-700">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
//           <Navigation className="text-primary h-5 w-5" /> Live Site Deployment
//         </h2>
//         <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider">
//           <span className="flex items-center gap-1 text-emerald-600"><div className="h-2 w-2 rounded-full bg-emerald-600"/> Completed</span>
//           <span className="flex items-center gap-1 text-orange-500"><div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"/> In-Progress</span>
//           <span className="flex items-center gap-1 text-slate-400"><div className="h-2 w-2 rounded-full bg-slate-400"/> Pending</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* INTERACTIVE MAP CONTAINER */}
//         <div className="lg:col-span-3 relative bg-slate-50 rounded-3xl border-2 border-slate-200 shadow-inner min-h-[500px] overflow-hidden group">
          
//           <img 
//             src={solapurMap} 
//             alt="Solapur Work Zones" 
//             className="absolute inset-0 w-full h-full object-contain opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
//           />

//           {workOrders.map((order) => (
//             <div
//               key={order.id}
//               style={{ top: order.top, left: order.left }}
//               className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
//               onClick={() => setSelectedOrder(order)}
//             >
//               {/* Pulse effect for In-Progress */}
//               {order.status === 'in-progress' && (
//                 <div className="absolute inset-0 rounded-full animate-ping bg-orange-400 opacity-40 h-10 w-10 -ml-2 -mt-2" />
//               )}
              
//               <div className={cn(
//                 "p-2 rounded-full border-2 border-white shadow-xl transition-transform hover:scale-125",
//                 order.status === 'completed' ? "bg-emerald-500" : 
//                 order.status === 'in-progress' ? "bg-orange-500" : "bg-slate-500"
//               )}>
//                 {order.status === 'completed' ? <CheckCircle2 className="h-4 w-4 text-white" /> : 
//                  order.status === 'in-progress' ? <Clock className="h-4 w-4 text-white" /> : 
//                  <MapPin className="h-4 w-4 text-white" />}
//               </div>
//             </div>
//           ))}

//           {/* FLOATING LEGEND */}
//           <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border shadow-lg">
//             <p className="text-[10px] font-black text-slate-400 mb-1 uppercase">Active Coverage</p>
//             <p className="text-sm font-bold">Solapur North & Central</p>
//           </div>
//         </div>

//         {/* SIDEBAR MINI-CARD */}
//         <div className="space-y-3">
//           <div className="bg-white p-5 rounded-2xl border-2 border-primary/10 shadow-md">
//             <span className="text-[10px] font-bold text-primary uppercase">Site Details</span>
//             <h3 className="text-lg font-bold mt-1">{selectedOrder.location}</h3>
            
//             <div className="mt-4 space-y-3">
//               <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border">
//                 <span className="text-xs text-slate-500 font-medium">Assigned Team</span>
//                 <span className="text-xs font-bold">{selectedOrder.team}</span>
//               </div>
//               <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border">
//                 <span className="text-xs text-slate-500 font-medium">Timeline</span>
//                 <span className={cn(
//                   "text-xs font-bold",
//                   selectedOrder.status === 'in-progress' ? "text-orange-600" : "text-slate-600"
//                 )}>{selectedOrder.eta}</span>
//               </div>
//             </div>

//             <button className="w-full mt-6 bg-[#25304F] text-white py-3 rounded-xl text-xs font-bold hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2">
//               <Navigation className="h-3 w-3" /> Get Directions
//             </button>
//           </div>
          
//           <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
//             <p className="text-[10px] font-bold text-emerald-700 uppercase">Daily Quote</p>
//             <p className="text-[11px] text-emerald-900 leading-tight mt-1">
//               "Quality repairs reduce future maintenance costs by 30%."
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { MapPin, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const workSites = [
  { id: "S1", ward: "North Solapur", location: "Saat Rasta", status: "In-Progress", workers: 4, health: "Critical" },
  { id: "S2", ward: "Central Solapur", location: "Navi Peth", status: "Pending", workers: 0, health: "Stable" },
  { id: "S3", ward: "South Solapur", location: "Vijapur Road", status: "Completed", workers: 6, health: "Fixed" },
  { id: "S4", ward: "East Solapur", location: "Akkalkot Road", status: "In-Progress", workers: 3, health: "Urgent" },
];

export default function WorkZoneMap() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#25304F] flex items-center gap-2">
          <MapPin className="text-orange-600 h-5 w-5" /> Active Site Tracker
        </h2>
        <span className="text-xs font-bold text-slate-400">SOLAPUR MUNICIPAL CORP.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {workSites.map((site) => (
          <div key={site.id} className="relative group bg-white border-2 border-slate-100 p-5 rounded-2xl hover:border-orange-200 transition-all shadow-sm hover:shadow-md">
            {/* Status Indicator */}
            <div className={cn(
              "absolute top-4 right-4 h-3 w-3 rounded-full",
              site.status === "In-Progress" ? "bg-orange-500 animate-pulse" : 
              site.status === "Completed" ? "bg-emerald-500" : "bg-slate-300"
            )} />

            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{site.ward}</p>
                <h3 className="text-lg font-bold text-slate-800">{site.location}</h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                {site.status === "In-Progress" ? <Clock className="h-3 w-3" /> : 
                 site.status === "Completed" ? <CheckCircle2 className="h-3 w-3" /> : 
                 <AlertTriangle className="h-3 w-3" />}
                {site.status}
              </div>

              <div className="pt-2 border-t flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold">{site.workers} Workers On-Site</span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-orange-500 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Logic for PICT Judges */}
      <div className="bg-[#25304F] p-4 rounded-xl text-white flex justify-between items-center">
        <div>
          <p className="text-[10px] opacity-70 font-bold uppercase">Deployment Status</p>
          <p className="text-sm font-medium">Currently fixing 2 major road failures in North & East Solapur.</p>
        </div>
        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-xs font-bold transition-all">
          View Full Route
        </button>
      </div>
    </div>
  );
}