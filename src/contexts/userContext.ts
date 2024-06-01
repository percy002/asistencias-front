import React, { Dispatch, SetStateAction } from 'react';
interface MyContextType {
    globalVariable: string;
    setGlobalVariable: Dispatch<SetStateAction<string>>;
  }
  const MyContext = React.createContext<MyContextType | null>(null);

export default MyContext;