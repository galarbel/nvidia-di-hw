const searchService = async (term: unknown): Promise<unknown[]> => {
  // Replace with actual API call
  const response = await fetch(`https://api.example.com/search?q=${term}`);
  const data = await response.json();
  return data.results;
};


export default searchService;
