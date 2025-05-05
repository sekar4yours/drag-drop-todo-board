
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const NavBar = () => {
  // This is a placeholder for actual authentication state
  const isAuthenticated = false;
  
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Task Manager</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button 
                variant="outline"
                onClick={() => {
                  // Placeholder for logout logic
                  console.log("Logout clicked");
                }}
              >
                Sign out
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
