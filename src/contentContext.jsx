import React, { createContext, useReducer } from "react";
export const ContentContext = createContext();

const initialState = {
  rooms: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SETROOM":
      const existingRoom = state.rooms.find((rooms) => rooms.position === action.payload.position)
      if (existingRoom) {
        // Update the item in the array
        const updatedItems = [...state?.rooms];
        updatedItems[action.payload.position] = { position: action.payload.position, value: action.payload.value };
        return {
          ...state,

          rooms: updatedItems,
        };
      } else {
        return {
          ...state,
          rooms: [...state?.rooms, action.payload],
        };
      }
    default:
      return state;
  }
};

const ContentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContentContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
