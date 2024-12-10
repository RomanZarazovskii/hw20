const API_KEY = '47286351-e716f5558799522fb527bbff6';
const BASE_URL = 'https://pixabay.com/api/';

export default {
  query: '',
  page: 1,
  async fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${API_KEY}`;
    try {
      const r = await fetch(url);
      if (!r.ok) {
        throw new Error('Error');
      }
      const data = await r.json();
      this.page += 1;
      return data.hits;
    } catch (error) {
      console.log('Error');
      throw error;
    }
  },
  resetPage() {
    this.page = 1;
  },
};
