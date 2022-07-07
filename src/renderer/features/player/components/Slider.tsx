import { useMemo, useState } from 'react';
import format from 'format-duration';
import ReactSlider, { ReactSliderProps } from 'react-slider';
import styled from 'styled-components';

interface SliderProps extends ReactSliderProps {
  hasToolTip?: boolean;
  toolTipType?: 'text' | 'time';
}

const StyledSlider = styled(ReactSlider)<SliderProps | any>`
  width: 100%;
  outline: none;

  .thumb {
    opacity: 0;
    top: 37%;

    &:after {
      content: attr(data-tooltip);
      top: -25px;
      left: -18px;
      color: var(--tooltip-text-color);
      background: var(--tooltip-bg);
      border-radius: 4px;
      padding: 2px 6px;
      white-space: nowrap;
      position: absolute;
      display: ${(props) =>
        props.$isDragging && props.$hasToolTip ? 'block' : 'none'};
    }

    &:focus-visible {
      opacity: 1;
      outline: none;
      height: 13px;
      width: 13px;
      border: 1px var(--primary-color) solid;
      border-radius: 100%;
      text-align: center;
      background-color: #ffffff;
      transform: translate(-12px, -4px);
    }
  }

  .track-0 {
    transition: background 0.2s ease-in-out;
    background: ${(props) => props.$isDragging && 'var(--primary-color)'};
  }

  .track {
    top: 37%;
  }

  &:hover {
    .track-0 {
      background: var(--primary-color);
    }
  }
`;

const MemoizedThumb = ({ props, state, toolTipType }: any) => {
  const { value } = state;
  const formattedValue = useMemo(() => {
    if (toolTipType === 'text') {
      return value;
    }

    return format(value * 1000);
  }, [toolTipType, value]);

  return <div {...props} data-tooltip={formattedValue} />;
};

const StyledTrack = styled.div<any>`
  top: 0;
  bottom: 0;
  height: 5px;
  background: ${(props) =>
    props.index === 1
      ? 'var(--playerbar-slider-track-bg)'
      : 'var(--playerbar-slider-track-progress-bg)'};
`;

const Track = (props: any, state: any) => (
  // eslint-disable-next-line react/destructuring-assignment
  <StyledTrack {...props} index={state.index} />
);
const Thumb = (props: any, state: any, toolTipType: any) => (
  <MemoizedThumb
    key="slider"
    props={props}
    state={state}
    tabIndex={0}
    toolTipType={toolTipType}
  />
);

export const Slider = ({ toolTipType, hasToolTip, ...rest }: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <StyledSlider
      {...rest}
      $hasToolTip={hasToolTip}
      $isDragging={isDragging}
      className="player-slider"
      defaultValue={0}
      renderThumb={(props: any, state: any) => {
        return Thumb(props, state, toolTipType);
      }}
      renderTrack={Track}
      onAfterChange={(e: number, index: number) => {
        if (rest.onAfterChange) {
          rest.onAfterChange(e, index);
        }
        setIsDragging(false);
      }}
      onBeforeChange={(e: number, index: number) => {
        if (rest.onBeforeChange) {
          rest.onBeforeChange(e, index);
        }
        setIsDragging(true);
      }}
    />
  );
};

Slider.defaultProps = {
  hasToolTip: true,
  toolTipType: 'text',
};