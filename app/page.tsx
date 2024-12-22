import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import React from "react";
import LoginButton from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const page = () => {
  return (
    <main className=" flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-400 to-gray-800">
      <div className=" space-x-6 text-center ">
        <h1
          className={cn(
            "text-6xl font-semibold text-slate-300 drop-shadow-md",
            font.className
          )}
        >
          🔐Authentication
        </h1>
        <p className="text-white text-lg mt-6 mb-6">A simple authentication services</p>

        <div>
          <LoginButton asChild>
            <Button variant="secondary" size="lg"  className="font-bold">
              Sign In       
            </Button>     
          </LoginButton>
        </div>
      </div>
    </main>
  );
};

export default page;
