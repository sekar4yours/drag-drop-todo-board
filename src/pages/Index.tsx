
import { TaskBoard } from '../components/TaskBoard';
import { TaskProvider } from '../context/TaskContext';
import { NavBar } from '../components/NavBar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto py-6 px-4">
        <TaskProvider>
          <TaskBoard />
        </TaskProvider>
      </div>
    </div>
  );
};

export default Index;
