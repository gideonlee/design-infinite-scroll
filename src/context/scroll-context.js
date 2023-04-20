import * as React from 'react'

const ScrollContext = React.createContext(null)
ScrollContext.displayname = 'ScrollContext'

const useScroll = () => {
  const context = React.useContext(ScrollContext)
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider")
  }
  return context
}

export {useScroll}