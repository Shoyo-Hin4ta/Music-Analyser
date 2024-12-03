// src/components/MusicAnalysis.jsx
import { useState } from 'react';
import { ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { musicDataset } from '../data/musicDataGenerator';

// Vibrant colors for each genre
const GENRE_COLORS = {
  'Pop': '#FF47B3',      // Bright Pink
  'Hip Hop': '#7C3AED',  // Violet
  'R&B': '#06B6D4',      // Cyan
  'Electronic': '#10B981' // Emerald
};

const MusicAnalysis = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [features, setFeatures] = useState({
    x: 'energy',
    y: 'danceability'
  });

  // Group songs by genre
  const groupedData = musicDataset.reduce((acc, song) => {
    if (!acc[song.genre]) acc[song.genre] = [];
    acc[song.genre].push({
      id: song.id,
      x: song.highLevelFeatures[features.x],
      y: song.highLevelFeatures[features.y],
      name: song.name,
      artist: song.artist,
      genre: song.genre,
      ...song.highLevelFeatures
    });
    return acc;
  }, {});

  const handleSongSelect = (data) => {
    if (data) {
      const song = musicDataset.find(s => s.id === data.id);
      setSelectedSong(song);
    }
  };

  return (
    <div className="grid gap-6">
      {/* High-Level Features Plot */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Genre Distribution by Music Features</CardTitle>
          <div className="flex gap-4 mt-2">
            <select 
              className="bg-gray-700 text-white border border-gray-600 p-2 rounded"
              value={features.x}
              onChange={(e) => setFeatures(prev => ({ ...prev, x: e.target.value }))}
            >
              <option value="energy">Energy</option>
              <option value="danceability">Danceability</option>
              <option value="valence">Valence</option>
              <option value="acousticness">Acousticness</option>
              <option value="instrumentalness">Instrumentalness</option>
            </select>
            <select 
              className="bg-gray-700 text-white border border-gray-600 p-2 rounded"
              value={features.y}
              onChange={(e) => setFeatures(prev => ({ ...prev, y: e.target.value }))}
            >
              <option value="danceability">Danceability</option>
              <option value="energy">Energy</option>
              <option value="valence">Valence</option>
              <option value="acousticness">Acousticness</option>
              <option value="instrumentalness">Instrumentalness</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="x" 
                  name={features.x}
                  label={{ value: features.x, position: "bottom", fill: "#9CA3AF" }}
                  tick={{ fill: '#9CA3AF' }}
                  domain={[0, 1]}
                />
                <YAxis 
                  dataKey="y" 
                  name={features.y}
                  label={{ value: features.y, angle: -90, position: "left", fill: "#9CA3AF" }}
                  tick={{ fill: '#9CA3AF' }}
                  domain={[0, 1]}
                />
                <Tooltip 
                  content={({ payload }) => {
                    if (!payload?.[0]) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-lg text-white">
                        <p className="font-bold text-lg">{data.name}</p>
                        <p>Artist: {data.artist}</p>
                        <p>Genre: <span style={{ color: GENRE_COLORS[data.genre] }}>{data.genre}</span></p>
                        <p>{features.x}: {data.x.toFixed(2)}</p>
                        <p>{features.y}: {data.y.toFixed(2)}</p>
                      </div>
                    );
                  }}
                />
                <Legend formatter={(value) => <span className="text-white">{value}</span>} />
                {Object.entries(groupedData).map(([genre, data]) => (
                  <Scatter
                    key={genre}
                    name={genre}
                    data={data}
                    fill={GENRE_COLORS[genre]}
                    onClick={handleSongSelect}
                    cursor="pointer"
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-gray-300 text-sm">
            Click on any point to see detailed audio analysis
          </div>
        </CardContent>
      </Card>

      {/* Low-Level Features Plot */}
      {selectedSong && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              Detailed Audio Analysis: {selectedSong.name}
            </CardTitle>
            <p className="text-gray-400">
              Artist: {selectedSong.artist} | Genre: {selectedSong.genre}
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedSong.lowLevelFeatures}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="timePoint"
                    label={{ value: "Time (seconds)", position: "bottom", fill: "#9CA3AF" }}
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Legend formatter={(value) => <span className="text-white">{value}</span>} />
                  <Line 
                    type="monotone"
                    dataKey="spectralCentroid"
                    stroke={GENRE_COLORS[selectedSong.genre]}
                    name="Spectral Centroid"
                    dot={false}
                  />
                  <Line 
                    type="monotone"
                    dataKey="spectralRolloff"
                    stroke="#60A5FA"
                    name="Spectral Rolloff"
                    dot={false}
                  />
                  <Line 
                    type="monotone"
                    dataKey="beatStrength"
                    stroke="#34D399"
                    name="Beat Strength"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-gray-300 text-sm">
              This graph shows how audio characteristics change over time in the song
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MusicAnalysis;