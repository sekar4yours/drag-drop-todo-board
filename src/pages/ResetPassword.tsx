
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a placeholder for actual password reset logic
    setTimeout(() => {
      if (email) {
        setIsSubmitted(true);
        toast({
          title: "Reset link sent",
          description: "Check your email for password reset instructions.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a valid email.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            {!isSubmitted 
              ? "Enter your email to receive a password reset link" 
              : "Check your email for reset instructions"}
          </CardDescription>
        </CardHeader>
        {!isSubmitted ? (
          <form onSubmit={handleResetRequest}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-green-50 p-4 text-center text-green-800">
              Reset link sent! Check your email inbox.
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setIsSubmitted(false)}
            >
              Send another link
            </Button>
            <div className="text-center text-sm mt-4">
              <Link to="/login" className="text-blue-600 hover:underline">
                Back to login
              </Link>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;
