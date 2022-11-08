import React, { createContext, useReducer } from 'react';

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'JOIN':
      return { user: action.payload.user, channel: action.payload.channel };

    default: return state;
  }
};

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, {
    user: '',
    channel: '',

    // TODO: user color pick
  });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
