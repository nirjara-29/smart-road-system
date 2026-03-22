// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Copy, ArrowLeft, Loader2, ShieldCheck, Phone, User } from 'lucide-react';
// import { toast } from 'sonner';

// const AdminCreateContractors = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isCreated, setIsCreated] = useState(false);
//   const [credentials, setCredentials] = useState({ email: '', password: '' });

//   const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const name = formData.get('contractorName') as string;

//     // Simulate "Processing" for the Hackathon Demo
//     setTimeout(() => {
//       // 1. Generate Email ID: name(no spaces)@smc
//       const cleanName = name.toLowerCase().replace(/\s+/g, '');
//       const generatedEmail = `${cleanName}@smc.com`;
      
//       // 2. Generate a temporary password
//       const generatedPassword = "PASS" + Math.floor(1000 + Math.random() * 9000);

//       setCredentials({ email: generatedEmail, password: generatedPassword });
//       setIsLoading(false);
//       setIsCreated(true);
//       toast.success("Contractor Registered!");
//     }, 1200);
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     toast.info("Copied to clipboard");
//   };

//   if (isCreated) {
//     return (
//       <div className="p-6 max-w-md mx-auto animate-in zoom-in-95 duration-300">
//         <Card className="border-2 border-primary/20 shadow-2xl">
//           <CardHeader className="text-center pb-2">
//             <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//               <ShieldCheck className="w-10 h-10 text-green-600" />
//             </div>
//             <CardTitle className="text-2xl font-bold">Registration Successful</CardTitle>
//             <CardDescription>Official contractor account generated</CardDescription>
//           </CardHeader>
          
//           <CardContent className="space-y-4">
//             <div className="space-y-3">
//               {/* Email ID Display */}
//               <div className="p-3 bg-muted/50 rounded-lg border">
//                 <Label className="text-[10px] uppercase text-muted-foreground">Generated Email ID</Label>
//                 <div className="flex justify-between items-center">
//                   <code className="text-md font-bold text-foreground">{credentials.email}</code>
//                   <Button variant="ghost" size="sm" onClick={() => copyToClipboard(credentials.email)}>
//                     <Copy className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>

//               {/* Password Display */}
//               <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
//                 <Label className="text-[10px] uppercase text-primary/70">Password</Label>
//                 <div className="flex justify-between items-center">
//                   <code className="text-lg font-bold text-primary">{credentials.password}</code>
//                   <Button variant="ghost" size="sm" className="text-primary" onClick={() => copyToClipboard(credentials.password)}>
//                     <Copy className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             <Button onClick={() => navigate('/admin')} className="w-full mt-4">
//               Finish
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-xl mx-auto space-y-6">
//       <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2 text-muted-foreground hover:bg-transparent">
//         <ArrowLeft className="h-4 w-4" /> Back
//       </Button>

//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-xl">Quick Contractor Setup</CardTitle>
//           <CardDescription>Register a contractor to generate their SMC credentials.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleCreate} className="space-y-6 text-left">
//             <div className="space-y-2">
//               <Label htmlFor="contractorName">Contractor Full Name</Label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input 
//                   id="contractorName" 
//                   name="contractorName" 
//                   placeholder="e.g. Rajesh Patil" 
//                   className="pl-10"
//                   required 
//                 />
//               </div>
//             </div>

//             <div className="space-y-2 text-left">
//               <Label htmlFor="mobileNumber">Mobile Number</Label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input 
//                   id="mobileNumber" 
//                   name="mobileNumber" 
//                   type="tel"
//                   placeholder="+91 98XXX XXXXX" 
//                   className="pl-10"
//                   required 
//                 />
//               </div>
//             </div>
            
//             <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   Generating Credentials...
//                 </>
//               ) : (
//                 "Generate SMC Account"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminCreateContractors;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, ArrowLeft, Loader2, ShieldCheck, Phone, User, Building2 } from 'lucide-react';
import { toast } from 'sonner';

// Define the SMC Departments
const departments = [
  "Engineering (Public Works)",
  "Water Supply & Drainage",
  "Traffic Management",
  "Disaster Management",
  "Ward Administration"
];

const AdminCreateContractors = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('contractorName') as string;

    // Simulate "Processing" for the Hackathon Demo
    setTimeout(() => {
      // 1. Generate Email ID: name(no spaces)@smc
      const cleanName = name.toLowerCase().replace(/\s+/g, '');
      const generatedEmail = `${cleanName}@smc.com`;
      
      // 2. Generate a temporary password
      const generatedPassword = "PASS" + Math.floor(1000 + Math.random() * 9000);

      setCredentials({ email: generatedEmail, password: generatedPassword });
      setIsLoading(false);
      setIsCreated(true);
      toast.success("Contractor Registered!");
    }, 1200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard");
  };

  if (isCreated) {
    return (
      <div className="p-6 max-w-md mx-auto animate-in zoom-in-95 duration-300">
        <Card className="border-2 border-primary/20 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Registration Successful</CardTitle>
            <CardDescription>Official contractor account generated</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* Email ID Display */}
              <div className="p-3 bg-muted/50 rounded-lg border">
                <Label className="text-[10px] uppercase text-muted-foreground">Generated Email ID</Label>
                <div className="flex justify-between items-center">
                  <code className="text-md font-bold text-foreground">{credentials.email}</code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(credentials.email)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Password Display */}
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <Label className="text-[10px] uppercase text-primary/70">Password</Label>
                <div className="flex justify-between items-center">
                  <code className="text-lg font-bold text-primary">{credentials.password}</code>
                  <Button variant="ghost" size="sm" className="text-primary" onClick={() => copyToClipboard(credentials.password)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={() => navigate('/admin')} className="w-full mt-4">
              Finish
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2 text-muted-foreground hover:bg-transparent">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Quick Contractor Setup</CardTitle>
          <CardDescription>Register a contractor to generate their SMC credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-6 text-left">
            {/* Contractor Name */}
            <div className="space-y-2">
              <Label htmlFor="contractorName">Contractor Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="contractorName" 
                  name="contractorName" 
                  placeholder="e.g. Rajesh Patil" 
                  className="pl-10"
                  required 
                />
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="department">Select Department</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <select 
                  id="department" 
                  name="department" 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="" disabled selected>Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-2 text-left">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="mobileNumber" 
                  name="mobileNumber" 
                  type="tel"
                  placeholder="+91 98XXX XXXXX" 
                  className="pl-10"
                  required 
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Credentials...
                </>
              ) : (
                "Generate SMC Account"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCreateContractors;