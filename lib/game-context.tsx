'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Player {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
}

export interface GameRoom {
  id: string;
  players: Player[];
  currentPlayer: string | null;
  gameStarted: boolean;
  currentQuestion: string | null;
  questionType: 'truth' | 'dare' | null;
  theme: 'funny' | 'flirty' | 'deep' | 'naughty';
}

interface GameState {
  room: GameRoom | null;
  currentUserId: string | null;
}

type GameAction =
  | { type: 'CREATE_ROOM'; payload: { roomId: string; hostName: string; hostId: string } }
  | { type: 'JOIN_ROOM'; payload: { room: GameRoom; playerId: string } }
  | { type: 'ADD_PLAYER'; payload: Player }
  | { type: 'START_GAME' }
  | { type: 'SET_CURRENT_PLAYER'; payload: string }
  | { type: 'SET_QUESTION'; payload: { question: string; type: 'truth' | 'dare' } }
  | { type: 'NEXT_TURN' }
  | { type: 'SET_THEME'; payload: 'funny' | 'flirty' | 'deep' | 'naughty' }
  | { type: 'LEAVE_ROOM' };

const initialState: GameState = {
  room: null,
  currentUserId: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CREATE_ROOM':
      const newRoom: GameRoom = {
        id: action.payload.roomId,
        players: [{
          id: action.payload.hostId,
          name: action.payload.hostName,
          avatar: '💕',
          isHost: true,
        }],
        currentPlayer: null,
        gameStarted: false,
        currentQuestion: null,
        questionType: null,
        theme: 'flirty',
      };
      return {
        ...state,
        room: newRoom,
        currentUserId: action.payload.hostId,
      };

    case 'JOIN_ROOM':
      return {
        ...state,
        room: action.payload.room,
        currentUserId: action.payload.playerId,
      };

    case 'ADD_PLAYER':
      if (!state.room) return state;
      return {
        ...state,
        room: {
          ...state.room,
          players: [...state.room.players, action.payload],
        },
      };

    case 'START_GAME':
      if (!state.room) return state;
      const randomPlayer = state.room.players[Math.floor(Math.random() * state.room.players.length)];
      return {
        ...state,
        room: {
          ...state.room,
          gameStarted: true,
          currentPlayer: randomPlayer.id,
        },
      };

    case 'SET_CURRENT_PLAYER':
      if (!state.room) return state;
      return {
        ...state,
        room: {
          ...state.room,
          currentPlayer: action.payload,
        },
      };

    case 'SET_QUESTION':
      if (!state.room) return state;
      return {
        ...state,
        room: {
          ...state.room,
          currentQuestion: action.payload.question,
          questionType: action.payload.type,
        },
      };

    case 'NEXT_TURN':
      if (!state.room) return state;
      const currentIndex = state.room.players.findIndex(p => p.id === state.room.currentPlayer);
      const nextIndex = (currentIndex + 1) % state.room.players.length;
      return {
        ...state,
        room: {
          ...state.room,
          currentPlayer: state.room.players[nextIndex].id,
          currentQuestion: null,
          questionType: null,
        },
      };

    case 'SET_THEME':
      if (!state.room) return state;
      return {
        ...state,
        room: {
          ...state.room,
          theme: action.payload,
        },
      };

    case 'LEAVE_ROOM':
      return initialState;

    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}