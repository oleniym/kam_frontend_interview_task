const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error when requesting a server:', error);
      throw error;
    }
  };
  
export const getData = async () => {
    try {
      const [sites, tests] = await Promise.all([
        fetchData('http://localhost:3100/sites'),
        fetchData('http://localhost:3100/tests'),
      ]);
      if (Array.isArray(sites) && sites.length > 0 &&
          Array.isArray(tests) && tests.length > 0) {
        return [sites, tests];
      } else {
        console.error('Invalid data received. Sites or tests data is empty or not an array.');
        throw new Error('Invalid data received.');
      }
    } catch (error) {
      console.error('Error in data retrieval:', error);
      throw error;
    }
};