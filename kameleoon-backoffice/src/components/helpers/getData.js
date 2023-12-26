const API_BASE_URL = 'http://localhost:3100';
const SITES_URL = `${API_BASE_URL}/sites`;
const TESTS_URL = `${API_BASE_URL}/tests`;

const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

export const getData = async () => {
  try {
    const [sites, tests] = await Promise.all([
      fetchData(SITES_URL),
      fetchData(TESTS_URL),
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
