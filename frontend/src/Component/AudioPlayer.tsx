import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { AiOutlineFastForward, AiOutlineFastBackward } from 'react-icons/ai';

interface AudioPlayerProps {
    src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [speed, setSpeed] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateProgress);
            audioRef.current.addEventListener('ended', () => setIsPlaying(false));
            audioRef.current.volume = volume;
            audioRef.current.playbackRate = speed;
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateProgress);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
            cancelAnimationFrame(animationRef.current);
        };
    }, [volume, speed]);

    const updateProgress = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setProgress((currentTime / duration) * 100);
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeed = parseFloat(event.target.value);
        setSpeed(newSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = newSpeed;
        }
    };

    return (
        <div className="audio-player">
            <div className="controls">
                <button onClick={togglePlayPause} className="play-pause-btn">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className={`oscillations ${isPlaying ? 'playing' : ''}`}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <div className="volume-speed-controls">
                <div className='control'>
                    <label className="volume-label">Volume</label>
                    <div className="volume-control">
                        <FaVolumeMute />
                        <input
                            type="range"
                            title='Volume'
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                        <FaVolumeUp />
                    </div>
                </div>
                <div className='control'>
                    <label className="speed-label">Speed</label>
                    <div className="speed-control">
                        <AiOutlineFastBackward />
                        <input
                            type="range"
                            title='speed'
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={speed}
                            onChange={handleSpeedChange}
                        />
                        <AiOutlineFastForward />
                    </div>
                </div>
            </div>
            <audio ref={audioRef} src={src}></audio>
        </div>
    );
};

export default AudioPlayer;