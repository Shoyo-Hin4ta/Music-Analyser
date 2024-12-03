# Music Genre Analysis Visualization

An interactive visualization dashboard that explores relationships between high-level musical features and low-level audio characteristics across different genres and artists.

## Features
- Interactive scatter plot showing relationships between musical features
- Genre-based color coding for easy pattern recognition
- Detailed temporal analysis of individual songs
- Real songs from popular artists across different genres
- Dark mode interface with vibrant visualizations

## Technologies Used
- React
- Vite
- Recharts for data visualization
- Tailwind CSS for styling

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/music-genre-analysis.git
cd music-genre-analysis
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Project Structure
```
music-analysis/
├── src/
│   ├── data/
│   │   └── musicDataGenerator.js    # Data generation logic
│   ├── components/
│   │   ├── MusicAnalysis.jsx        # Main visualization component
│   │   └── ui/
│   │       └── card.jsx             # UI components
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
└── package.json
```

## Usage
- The main scatter plot shows songs plotted by their musical features
- Click on any point to see detailed audio analysis
- Use the dropdowns to change which features are displayed
- Hover over points for detailed information

## Presentation Guide (10 Minutes)

### 1. Introduction (1 minute)
This visualization explores relationships between musical characteristics across genres, analyzing songs from artists like Drake, Taylor Swift, The Weeknd, and Calvin Harris. It examines both high-level features like energy and danceability, and low-level audio characteristics.

### 2. High-Level Feature Relationships (2-3 minutes)
Looking at the scatter plot:
- Electronic music (green) clusters in high energy/danceability
- Hip Hop (purple) shows high danceability with varying energy
- R&B (cyan) maintains moderate energy with good danceability
- Pop (pink) shows versatility across the spectrum

### 3. Artist-Specific Patterns (2 minutes)
- Calvin Harris: Consistent high energy and danceability
- The Weeknd: Moderate energy with complex audio features
- Taylor Swift: Varied patterns showing style evolution

### 4. Low-Level Features Explanation (2 minutes)
Clicking on songs reveals:
- Spectral Centroid indicates sound brightness
- Beat Strength shows rhythmic patterns
- Genre-specific audio characteristics

### 5. Key Insights (1 minute)
- Energy and danceability often correlate
- Genres occupy characteristic spaces
- Artists maintain consistent features

### 6. Conclusion (1 minute)
This visualization demonstrates how musical elements combine to create distinct genres and styles, providing insights into music production and classification.
