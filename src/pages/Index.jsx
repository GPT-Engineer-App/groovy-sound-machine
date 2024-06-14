import { useState, useRef } from "react";
import { Container, VStack, Text, IconButton, HStack, Box } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const tracks = [
  { title: "Track 1", src: "path/to/track1.mp3" },
  { title: "Track 2", src: "path/to/track2.mp3" },
  { title: "Track 3", src: "path/to/track3.mp3" },
];

const Index = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Music Player</Text>
        <Text>{tracks[currentTrackIndex].title}</Text>
        <audio ref={audioRef} src={tracks[currentTrackIndex].src} onEnded={handleNext} />
        <HStack spacing={4}>
          <IconButton aria-label="Previous" icon={<FaBackward />} onClick={handlePrev} />
          <IconButton aria-label={isPlaying ? "Pause" : "Play"} icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={handlePlayPause} />
          <IconButton aria-label="Next" icon={<FaForward />} onClick={handleNext} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;