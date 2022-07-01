import React, { useState } from "react"

const SearchContext = React.createContext({
    search: '' as string,
    pullSearch: (query: string) => {},
})



export const SearchContextProvider: React.FC<React.ReactNode> = (props) => {

    const [query, setQuery] = useState('' as string);

    
    const searchHandle = (query: string) => {
        setQuery(query)
    }

    const contextValue = {
        search: query as string,
        pullSearch: searchHandle as () => {},
    }

    return (
        <SearchContext.Provider value={contextValue}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchContext;