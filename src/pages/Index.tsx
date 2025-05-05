
import { TaskBoard } from '../components/TaskBoard';
import { TaskProvider } from '../context/TaskContext';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TaskProvider>
        <TaskBoard />
      </TaskProvider>
    </div>
  );
};

export default Index;
