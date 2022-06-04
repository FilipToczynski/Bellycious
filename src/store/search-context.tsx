import React, { useState } from "react"

const SearchContext = React.createContext({
    search: '' as any,
    pullSearch: (query: any) => {}
})



export const SearchContextProvider: React.FC<React.ReactNode> = (props: any) => {

    const [query, setQuery] = useState('');

    
    const searchHandle = (query: '') => {
        setQuery(query)
    }

    const contextValue = {
        search: query,
        pullSearch: searchHandle,
    }

    return (
        <SearchContext.Provider value={contextValue}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchContext;