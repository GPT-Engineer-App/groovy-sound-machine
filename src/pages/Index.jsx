import { useState, useRef, useEffect } from "react";
import { Container, VStack, Text, IconButton, HStack, Box, Image, Progress, Center } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const tracks = [
  { title: "Track 1", src: "path/to/track1.mp3", albumArt: "path/to/albumArt1.jpg" },
  { title: "Track 2", src: "path/to/track2.mp3", albumArt: "path/to/albumArt2.jpg" },
  { title: "Track 3", src: "path/to/track3.mp3", albumArt: "path/to/albumArt3.jpg" },
];

const Index = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

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
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">Music Player</Text>
        <Box boxSize="200px">
          <Image src={tracks[currentTrackIndex].albumArt} alt={tracks[currentTrackIndex].title} boxSize="100%" objectFit="cover" borderRadius="md" />
        </Box>
        <Text fontSize="lg" fontWeight="medium">{tracks[currentTrackIndex].title}</Text>
        <audio ref={audioRef} src={tracks[currentTrackIndex].src} onEnded={handleNext} />
        <Box width="100%">
          <Progress value={progress} size="xs" colorScheme="teal" />
        </Box>
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