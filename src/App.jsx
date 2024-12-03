import MusicAnalysis from './components/MusicAnalysis';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-white bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Music Genre Analysis Dashboard
        </h1>
        <p className="text-gray-300 mb-8">
          Explore the relationships between high-level music features and detailed audio characteristics across different genres
        </p>
        <MusicAnalysis />
      </div>
    </div>
  );
};

export default App;