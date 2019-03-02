let filter = {
    searchText: "",
    sortBy: "byEdited"
};

const getFilter = () => filter;

const updateFilter = (updates) => {
    if (typeof updates.searchText === "string") {
        filter.searchText = updates.searchText;
    }
    if (typeof updates.sortBy === "string") {
        filter.sortBy = updates.sortBy;
    }  
};

export {getFilter, updateFilter};