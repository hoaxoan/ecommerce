import { ref } from '@vue/composition-api'

export const useFiltersSortingAndPagination = () => {
  const filters = ref({
    q: '',
    categories: [],
    page: 1,
    perPage: 5,
  })

  const filterOptions = {
    categories: [
      'Appliances',
      'Audio',
      'Cameras & Camcorders',
      'Car Electronics & GPS',
      'Cell Phones',
      'Computers & Tablets',
      'Health, Fitness & Beauty',
      'Office & School Supplies',
      'TV & Home Theater',
      'Video Games',
    ],
  }

  // Sorting
  const sortBy = ref({ text: 'Featured', value: 'featured' })
  const sortByOptions = [
    { text: 'Featured', value: 'featured' },
    { text: 'Lowest', value: 'price-asc' },
    { text: 'Highest', value: 'price-desc' },
  ]

  return {
    // Filter
    filters,
    filterOptions,

    // Sort
    sortBy,
    sortByOptions,
  }
}
