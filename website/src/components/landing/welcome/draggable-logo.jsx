// @flow
import React from 'react';
import styled, { keyframes } from 'react-emotion';
import Logo from '../../logo';
import { DragDropContext, Droppable, Draggable } from '../../../../../src';
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DropAnimation,
} from '../../../../../src';

const rotation: number = 10;

const animations = {
  rest: keyframes`


  `,
  shake: keyframes`
    0% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(${rotation}deg) scale(0.9);
    }

    50% {
      transform: rotate(0deg) scale(1.2);
    }

    75% {
      transform: rotate(-${rotation}deg) scale(0.9);
    }

    100% {
      transform: rotate(0deg);
    }
  `,
  spin: keyframes`
    100% {
      transform: rotate(359deg);
    }
  `,
};

const shake = `${animations.shake} 0.5s linear infinite`;
const spin = (duration: number) => `${animations.spin} ${duration}s ease 1`;

const getAnimation = (
  isDragging: boolean,
  dropAnimation: DropAnimation,
): string => {
  if (dropAnimation) {
    return spin(dropAnimation.duration);
  }
  if (isDragging) {
    return shake;
  }
  return 'none';
};

const Wobble = styled('div')`
  animation: ${props => getAnimation(props.isDragging, props.dropAnimation)};
`;

export default class DraggableLogo extends React.Component<*> {
  render() {
    return (
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="logo">
          {(droppableProvided: DroppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              <Draggable draggableId="logo" index={0}>
                {(
                  provided: DraggableProvided,
                  snapshot: DraggableStateSnapshot,
                ) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <Wobble
                      isDragging={snapshot.isDragging}
                      dropAnimation={snapshot.dropAnimation}
                    >
                      <Logo width={90} />
                    </Wobble>
                  </div>
                )}
              </Draggable>
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
