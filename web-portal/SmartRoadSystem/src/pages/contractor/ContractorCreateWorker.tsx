// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Copy, ArrowLeft, Loader2, ShieldCheck, Phone, User, HardHat } from 'lucide-react';
// import { toast } from 'sonner';

// const ContractorCreateWorker = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isCreated, setIsCreated] = useState(false);
//   const [workerDetails, setWorkerDetails] = useState({ name: '', mobile: '', id: '', username: '' });

//   const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const name = formData.get('workerName') as string;
//     const mobile = formData.get('mobileNumber') as string;

//     // Simulate "Registering" for the Demo
//     setTimeout(() => {
//       const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
//       const lastFour = mobile.slice(-4);
      
//       // Generate Demo Data
//       const generatedId = `WRK-${initials}-${lastFour}`;
//       const generatedUsername = name.toLowerCase().replace(/\s+/g, '.') + lastFour;

//       setWorkerDetails({ name, mobile, id: generatedId, username: generatedUsername });
//       setIsLoading(false);
//       setIsCreated(true);
//       toast.success("Worker Registered Successfully!");
//     }, 1200);
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     toast.info("Copied!");
//   };

//   if (isCreated) {
//     return (
//       <div className="p-6 max-w-md mx-auto animate-in zoom-in-95 duration-300">
//         <Card className="border-2 border-orange-200 shadow-2xl">
//           <CardHeader className="text-center pb-2">
//             <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//               <HardHat className="w-10 h-10 text-orange-600" />
//             </div>
//             <CardTitle className="text-2xl font-bold">Worker Registered</CardTitle>
//             <CardDescription>Official credentials for {workerDetails.name}</CardDescription>
//           </CardHeader>
          
//           <CardContent className="space-y-4 text-left">
//             <div className="space-y-3">
//               <div className="p-3 bg-muted/50 rounded-lg border">
//                 <Label className="text-[10px] uppercase text-muted-foreground">Worker ID</Label>
//                 <div className="flex justify-between items-center">
//                   <code className="text-md font-bold">{workerDetails.id}</code>
//                   <Button variant="ghost" size="sm" onClick={() => copyToClipboard(workerDetails.id)}><Copy className="h-4 w-4" /></Button>
//                 </div>
//               </div>

//               <div className="p-3 bg-muted/50 rounded-lg border">
//                 <Label className="text-[10px] uppercase text-muted-foreground">Username</Label>
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">{workerDetails.username}</span>
//                   <Button variant="ghost" size="sm" onClick={() => copyToClipboard(workerDetails.username)}><Copy className="h-4 w-4" /></Button>
//                 </div>
//               </div>

//               <div className="p-3 bg-muted/50 rounded-lg border">
//                 <Label className="text-[10px] uppercase text-muted-foreground">Mobile (Login)</Label>
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">{workerDetails.mobile}</span>
//                 </div>
//               </div>
//             </div>

//             <Button onClick={() => navigate('/contractor/teams')} className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
//               Return to Teams
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-xl mx-auto space-y-6">
//       <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2 text-muted-foreground">
//         <ArrowLeft className="h-4 w-4" /> Back to Teams
//       </Button>

//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-xl">Register New Worker</CardTitle>
//           <CardDescription>Enter field worker details to generate their system identity.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleCreate} className="space-y-6">
//             <div className="space-y-2 text-left">
//               <Label htmlFor="workerName">Worker Full Name</Label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input id="workerName" name="workerName" placeholder="e.g. Amit Sharma" className="pl-10" required />
//               </div>
//             </div>

//             <div className="space-y-2 text-left">
//               <Label htmlFor="mobileNumber">Mobile Number</Label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input id="mobileNumber" name="mobileNumber" type="tel" placeholder="+91 98XXX XXXXX" className="pl-10" required />
//               </div>
//             </div>
            
//             <Button type="submit" className="w-full h-12 text-lg bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   Generating ID...
//                 </>
//               ) : (
//                 "Register & Generate ID"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ContractorCreateWorker;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, ArrowLeft, Loader2, Phone, User, HardHat, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

const ContractorCreateWorker = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [workerDetails, setWorkerDetails] = useState({ email: '', password: '', name: '' });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('workerName') as string;

    // Simulate "Registering" for the Demo
    setTimeout(() => {
      // 1. Generate Email: name(no spaces)@smc.com
      const cleanName = name.toLowerCase().replace(/\s+/g, '');
      const generatedEmail = `${cleanName}@smc.com`;
      
      // 2. Generate a temporary password
      const generatedPassword = "WRK" + Math.floor(1000 + Math.random() * 9000);

      setWorkerDetails({ 
        name, 
        email: generatedEmail, 
        password: generatedPassword 
      });
      
      setIsLoading(false);
      setIsCreated(true);
      toast.success("Worker Registered Successfully!");
    }, 1200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied!");
  };

  if (isCreated) {
    return (
      <div className="p-6 max-w-md mx-auto animate-in zoom-in-95 duration-300">
        <Card className="border-2 border-slate-200 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <HardHat className="w-10 h-10 text-[#25304F]" />
            </div>
            <CardTitle className="text-2xl font-bold">Worker Created</CardTitle>
            <CardDescription>Credentials for {workerDetails.name}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 text-left">
            <div className="space-y-3">
              {/* Generated Email Block */}
              <div className="p-3 bg-muted/50 rounded-lg border">
                <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Email ID</Label>
                <div className="flex justify-between items-center">
                  <code className="text-sm font-bold text-slate-700">{workerDetails.email}</code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(workerDetails.email)}><Copy className="h-4 w-4" /></Button>
                </div>
              </div>

              {/* Password Block */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <Label className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Password</Label>
                <div className="flex justify-between items-center">
                  <code className="text-lg font-bold text-[#25304F]">{workerDetails.password}</code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(workerDetails.password)}><Copy className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>

            {/* Custom Hex Color Button */}
            <Button 
              onClick={() => navigate('/contractor/teams')} 
              className="w-full mt-4 text-white"
              style={{ backgroundColor: '#25304F' }}
            >
              Return to Teams
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2 text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Teams
      </Button>

      <Card className="shadow-lg border-t-4" style={{ borderTopColor: '#25304F' }}>
        <CardHeader>
          <CardTitle className="text-xl">Register New Worker</CardTitle>
          <CardDescription>Generate official SMC credentials for repair staff.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-2 text-left">
              <Label htmlFor="workerName">Worker Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="workerName" name="workerName" placeholder="e.g. Amit Sharma" className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="mobileNumber" name="mobileNumber" type="tel" placeholder="+91 98XXX XXXXX" className="pl-10" required />
              </div>
            </div>
            
            {/* Custom Hex Color Button */}
            <Button 
              type="submit" 
              className="w-full h-12 text-lg text-white" 
              disabled={isLoading}
              style={{ backgroundColor: '#25304F' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Account...
                </>
              ) : (
                "Register & Generate Email"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractorCreateWorker;