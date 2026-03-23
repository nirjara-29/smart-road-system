// /**
//  * Login Page Component
//  * Role selection with login form for Admin/Contractor access
//  */

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Construction, User, Building2, Mail, Phone, ArrowRight } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import type { UserRole } from '@/types';

// export default function Login() {
//   const navigate = useNavigate();
  
//   // Form state
//   const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
//   const [fullName, setFullName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Validate form inputs
//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!selectedRole) {
//       newErrors.role = 'Please select a role';
//     }

//     if (!fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     }

//     if (!mobile.trim()) {
//       newErrors.mobile = 'Mobile number is required';
//     } else if (!/^\+?[\d\s-]{10,}$/.test(mobile)) {
//       newErrors.mobile = 'Enter a valid mobile number';
//     }

//     if (!email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = 'Enter a valid email address';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle login submission
//   const handleLogin = () => {
//     if (validateForm()) {
//       // Navigate to appropriate dashboard based on role
//       if (selectedRole === 'admin') {
//         navigate('/admin');
//       } else {
//         navigate('/contractor');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

//       <div className="w-full max-w-lg">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary mb-4">
//             <Construction className="h-8 w-8 text-primary-foreground" />
//           </div>
//           <h1 className="text-2xl font-bold text-foreground">
//             Smart Road Damage Management
//           </h1>
//           <p className="text-muted-foreground mt-2">
//             Municipal Corporation Portal
//           </p>
//         </div>

//         {/* Login Card */}
//         <div className="login-card animate-fade-in">
//           {/* Role Selection */}
//           <div className="mb-6">
//             <Label className="text-sm font-medium mb-3 block">
//               Select Your Role
//             </Label>
//             <div className="grid grid-cols-2 gap-4">
//               {/* Admin Role */}
//               <button
//                 onClick={() => setSelectedRole('admin')}
//                 className={cn(
//                   'flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200',
//                   selectedRole === 'admin'
//                     ? 'border-primary bg-primary/5'
//                     : 'border-border hover:border-muted-foreground/50'
//                 )}
//               >
//                 <div
//                   className={cn(
//                     'flex h-12 w-12 items-center justify-center rounded-full transition-colors',
//                     selectedRole === 'admin'
//                       ? 'bg-primary text-primary-foreground'
//                       : 'bg-muted text-muted-foreground'
//                   )}
//                 >
//                   <User className="h-6 w-6" />
//                 </div>
//                 <div className="text-center">
//                   <p className="font-medium text-foreground">Administrator</p>
//                   <p className="text-xs text-muted-foreground">
//                     Manage contractors & complaints
//                   </p>
//                 </div>
//               </button>

//               {/* Contractor Role */}
//               <button
//                 onClick={() => setSelectedRole('contractor')}
//                 className={cn(
//                   'flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200',
//                   selectedRole === 'contractor'
//                     ? 'border-primary bg-primary/5'
//                     : 'border-border hover:border-muted-foreground/50'
//                 )}
//               >
//                 <div
//                   className={cn(
//                     'flex h-12 w-12 items-center justify-center rounded-full transition-colors',
//                     selectedRole === 'contractor'
//                       ? 'bg-primary text-primary-foreground'
//                       : 'bg-muted text-muted-foreground'
//                   )}
//                 >
//                   <Building2 className="h-6 w-6" />
//                 </div>
//                 <div className="text-center">
//                   <p className="font-medium text-foreground">Contractor</p>
//                   <p className="text-xs text-muted-foreground">
//                     Manage teams & repairs
//                   </p>
//                 </div>
//               </button>
//             </div>
//             {errors.role && (
//               <p className="text-sm text-destructive mt-2">{errors.role}</p>
//             )}
//           </div>

//           {/* Form Fields */}
//           <div className="space-y-4">
//             {/* Full Name */}
//             <div className="space-y-2">
//               <Label htmlFor="fullName">Full Name</Label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   id="fullName"
//                   placeholder="Enter your full name"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   className={cn('pl-10', errors.fullName && 'border-destructive')}
//                 />
//               </div>
//               {errors.fullName && (
//                 <p className="text-sm text-destructive">{errors.fullName}</p>
//               )}
//             </div>

//             {/* Mobile Number */}
//             <div className="space-y-2">
//               <Label htmlFor="mobile">Mobile Number</Label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   id="mobile"
//                   type="tel"
//                   placeholder="+91 98765 43210"
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value)}
//                   className={cn('pl-10', errors.mobile && 'border-destructive')}
//                 />
//               </div>
//               {errors.mobile && (
//                 <p className="text-sm text-destructive">{errors.mobile}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email Address</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={cn('pl-10', errors.email && 'border-destructive')}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-sm text-destructive">{errors.email}</p>
//               )}
//             </div>
//           </div>

//           {/* Login Button */}
//           <Button
//             onClick={handleLogin}
//             className="w-full mt-6 gap-2"
//             size="lg"
//           >
//             Login to Dashboard
//             <ArrowRight className="h-4 w-4" />
//           </Button>

//           {/* Footer */}
//           <p className="text-center text-xs text-muted-foreground mt-6">
//             By logging in, you agree to the terms and conditions of the Municipal Corporation portal.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


/**
 * Login Page Component
 * Role selection with SMC credentials login
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Construction, Building2, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UserRole } from '@/types';

export default function Login() {
  const navigate = useNavigate();
  
  // Form state
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate form inputs
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedRole) {
      newErrors.role = 'Please select a role';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.toLowerCase().endsWith('@smc.com')) {
      newErrors.email = 'Email must end with @smc.com';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login submission
  const handleLogin = () => {
    if (validateForm()) {
      // For Demo: Redirect based on role
      if (selectedRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/contractor');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary mb-4 shadow-lg shadow-primary/20">
            <Construction className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            SMC Smart Road Portal
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Municipal Corporation Secure Access
          </p>
        </div>

        {/* Login Card */}
        <div className="login-card animate-fade-in bg-card border rounded-xl p-6 shadow-xl">
          {/* Role Selection */}
          <div className="mb-8">
            <Label className="text-sm font-semibold mb-4 block text-center">
              Account Type
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {/* Admin Role */}
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={cn(
                  'flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200',
                  selectedRole === 'admin'
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border hover:border-muted-foreground/30'
                )}
              >
                <div className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full transition-colors',
                  selectedRole === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}>
                  <User className="h-6 w-6" />
                </div>
                <p className="font-bold text-sm text-foreground uppercase tracking-tight">Admin</p>
              </button>

              {/* Contractor Role */}
              <button
                type="button"
                onClick={() => setSelectedRole('contractor')}
                className={cn(
                  'flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200',
                  selectedRole === 'contractor'
                    ? 'border-orange-500 bg-orange-500/5 ring-2 ring-orange-500/20'
                    : 'border-border hover:border-muted-foreground/30'
                )}
              >
                <div className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full transition-colors',
                  selectedRole === 'contractor' ? 'bg-orange-500 text-white' : 'bg-muted text-muted-foreground'
                )}>
                  <Building2 className="h-6 w-6" />
                </div>
                <p className="font-bold text-sm text-foreground uppercase tracking-tight">Contractor</p>
              </button>
            </div>
            {errors.role && <p className="text-xs text-destructive text-center mt-3 font-medium">{errors.role}</p>}
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">SMC Email ID</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="username@smc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn('pl-10 h-11', errors.email && 'border-destructive focus-visible:ring-destructive')}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive font-medium">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                <button type="button" className="text-[11px] text-primary hover:underline font-medium">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn('pl-10 h-11', errors.password && 'border-destructive focus-visible:ring-destructive')}
                />
              </div>
              {errors.password && <p className="text-xs text-destructive font-medium">{errors.password}</p>}
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full mt-8 h-12 gap-2 text-md font-bold transition-transform active:scale-[0.98]"
            size="lg"
          >
            Log In to Portal
            <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="mt-8 pt-6 border-t text-center">
             <p className="text-xs text-muted-foreground leading-relaxed">
              Secure Municipal Gateway. <br/> 
              Unauthorized access is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}