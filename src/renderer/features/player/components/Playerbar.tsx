import { useRef } from 'react';
import styled from 'styled-components';
import { AudioPlayer } from 'renderer/components';
import { usePlayerStore } from 'renderer/store';
import { PlaybackType } from 'types';
import { CenterControls } from './CenterControls';
import { LeftControls } from './LeftControls';

const PlayerbarContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PlayerbarControlsGrid = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
`;

const RightGridItem = styled.div`
  align-self: center;
  width: calc(100vw / 3);
`;

const LeftGridItem = styled.div`
  height: 100%;
  width: calc(100vw / 3);
`;

const CenterGridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100vw / 3);
  height: 100%;
`;

export const Playerbar = () => {
  const playersRef = useRef<any>();
  const settings = usePlayerStore((state) => state.settings);
  const volume = usePlayerStore((state) => state.settings.volume);
  const player1 = usePlayerStore((state) => state.player1());
  const player2 = usePlayerStore((state) => state.player2());
  const status = usePlayerStore((state) => state.current.status);
  const player = usePlayerStore((state) => state.current.player);
  const autoNext = usePlayerStore((state) => state.autoNext);

  return (
    <PlayerbarContainer>
      <PlayerbarControlsGrid>
        <LeftGridItem>
          <LeftControls />
        </LeftGridItem>
        <CenterGridItem>
          <CenterControls playersRef={playersRef} />
        </CenterGridItem>
        <RightGridItem>
          {/* <RightControls controls={{ handleVolumeSlider }} /> */}
        </RightGridItem>
      </PlayerbarControlsGrid>
      {settings.type === PlaybackType.Web && (
        <AudioPlayer
          ref={playersRef}
          autoNext={autoNext}
          crossfadeDuration={settings.crossfadeDuration}
          crossfadeStyle={settings.crossfadeStyle}
          currentPlayer={player}
          muted={settings.muted}
          player1={player1}
          player2={player2}
          status={status}
          style={settings.style}
          volume={volume}
        />
      )}
    </PlayerbarContainer>
  );
};