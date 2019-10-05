import axios from 'axios';

export const fetchData = async () => {
  try {
    const query = `query {
      ants {
        name
        length
        color
        weight
      }
    }`;
    const {data} = await axios.post(
      'https://antserver-blocjgjbpw.now.sh/graphql',
      {query: query},
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
