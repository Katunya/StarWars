import React from "react";

const {
  Provider: SwapiServiceProvider,
  Consumer : SwapiServiceConsumer
} = React.createContext(); // создание контекста


export {
  SwapiServiceProvider,
  SwapiServiceConsumer
};
