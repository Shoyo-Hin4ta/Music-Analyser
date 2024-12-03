// src/data/musicDataGenerator.js

// Genre-based feature ranges for more realistic data
const GENRE_CHARACTERISTICS = {
    'Pop': {
      energy: { min: 0.6, max: 0.8 },
      danceability: { min: 0.6, max: 0.8 },
      valence: { min: 0.5, max: 0.8 },
      acousticness: { min: 0.1, max: 0.4 },
      instrumentalness: { min: 0, max: 0.2 }
    },
    'Hip Hop': {
      energy: { min: 0.6, max: 0.9 },
      danceability: { min: 0.7, max: 0.9 },
      valence: { min: 0.4, max: 0.7 },
      acousticness: { min: 0.05, max: 0.3 },
      instrumentalness: { min: 0, max: 0.1 }
    },
    'R&B': {
      energy: { min: 0.4, max: 0.7 },
      danceability: { min: 0.5, max: 0.8 },
      valence: { min: 0.3, max: 0.6 },
      acousticness: { min: 0.2, max: 0.5 },
      instrumentalness: { min: 0, max: 0.3 }
    },
    'Electronic': {
      energy: { min: 0.7, max: 1.0 },
      danceability: { min: 0.7, max: 0.9 },
      valence: { min: 0.5, max: 0.8 },
      acousticness: { min: 0, max: 0.2 },
      instrumentalness: { min: 0.4, max: 0.8 }
    }
  };
  
  // Real artists with their actual songs
  const ARTISTS_WITH_SONGS = {
    'Drake': {
      genre: 'Hip Hop',
      songs: [
        "Hotline Bling", "God's Plan", "In My Feelings", "One Dance", "Started From the Bottom",
        "Nice For What", "Nonstop", "Headlines", "Best I Ever Had", "Hold On, We're Going Home",
        "Take Care", "Laugh Now Cry Later", "Toosie Slide", "Fake Love", "Passionfruit"
      ]
    },
    'Taylor Swift': {
      genre: 'Pop',
      songs: [
        "Shake It Off", "Blank Space", "Love Story", "Bad Blood", "You Belong with Me",
        "Wildest Dreams", "Anti-Hero", "cardigan", "All Too Well", "Style",
        "Red", "Look What You Made Me Do", "ME!", "Delicate", "Cruel Summer"
      ]
    },
    'The Weeknd': {
      genre: 'R&B',
      songs: [
        "Blinding Lights", "Starboy", "The Hills", "Can't Feel My Face", "Save Your Tears",
        "Often", "Die For You", "Earned It", "In Your Eyes", "Heartless",
        "Call Out My Name", "I Feel It Coming", "Take My Breath", "After Hours", "Sacrifice"
      ]
    },
    'Calvin Harris': {
      genre: 'Electronic',
      songs: [
        "Summer", "This Is What You Came For", "Feel So Close", "We Found Love", "Sweet Nothing",
        "Outside", "How Deep Is Your Love", "One Kiss", "Promises", "Giant",
        "Slide", "Feels", "Stay With Me", "By Your Side", "Thinking About You"
      ]
    }
  };
  
  const generateFeatureInRange = (min, max) => {
    return min + Math.random() * (max - min);
  };
  
  const generateHighLevelFeatures = (genre) => {
    const characteristics = GENRE_CHARACTERISTICS[genre];
    
    return {
      energy: generateFeatureInRange(characteristics.energy.min, characteristics.energy.max),
      danceability: generateFeatureInRange(characteristics.danceability.min, characteristics.danceability.max),
      valence: generateFeatureInRange(characteristics.valence.min, characteristics.valence.max),
      acousticness: generateFeatureInRange(characteristics.acousticness.min, characteristics.acousticness.max),
      instrumentalness: generateFeatureInRange(characteristics.instrumentalness.min, characteristics.instrumentalness.max)
    };
  };
  
  const generateLowLevelFeatures = (highLevelFeatures, genre) => {
    const numFrames = 120;
    const frames = [];
    
    for (let i = 0; i < numFrames; i++) {
      const timePoint = i;
      frames.push({
        timePoint,
        // Spectral features reflect genre characteristics
        spectralCentroid: (genre === 'Electronic' ? 3000 : 2000) + 
          (highLevelFeatures.energy * 4000) * (1 + Math.sin(i/10) * 0.3),
        spectralRolloff: (genre === 'Hip Hop' ? 4000 : 3000) + 
          (highLevelFeatures.energy * 4000) * (1 + Math.cos(i/8) * 0.2),
        beatStrength: highLevelFeatures.danceability * 
          (1 + Math.sin(i/4) * (genre === 'Electronic' ? 0.4 : 0.2))
      });
    }
    
    return frames;
  };
  
  const generateDataset = () => {
    const dataset = [];
    let id = 0;
  
    for (const [artist, info] of Object.entries(ARTISTS_WITH_SONGS)) {
      info.songs.forEach(songName => {
        const highLevelFeatures = generateHighLevelFeatures(info.genre);
        dataset.push({
          id: `song_${id++}`,
          name: songName,
          artist: artist,
          genre: info.genre,
          highLevelFeatures,
          lowLevelFeatures: generateLowLevelFeatures(highLevelFeatures, info.genre)
        });
      });
    }
  
    return dataset;
  };
  
  export const musicDataset = generateDataset();