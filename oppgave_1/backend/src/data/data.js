export const courses = [
  {
    id: '1',
    title: 'JavaScript 101',
    slug: 'javascript-101',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
    lessons: [
      {
        id: '1',
        title: 'Variabler',
        slug: 'variabler',
        preAmble:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        text: [
          {
            id: '1',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
          },
          {
            id: '2',
            text: 'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          },
        ],
      },
      {
        id: '2',
        title: 'Løkker',
        slug: 'lokker',
        preAmble:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        text: [],
      },
      {
        id: '3',
        title: 'Deconstruction',
        slug: 'deconstruction',
        preAmble:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        text: [],
      },
    ],
    category: 'code',
  },
  {
    id: '2',
    title: 'Python 101',
    slug: 'python-101',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
    lessons: [],
    category: 'code',
  },
  {
    id: '3',
    title: 'Layers 101',
    slug: 'layers-101',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
    lessons: [],
    category: 'photoshop',
  },
  {
    id: '4',
    title: 'SEO',
    slug: 'seo',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
    lessons: [],
    category: 'marketing',
  },
  {
    id: '5',
    title: 'Intro til tegning',
    slug: 'intro-tegning',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
    lessons: [],
    category: 'design',
  },
  {
    id: '6',
    title: 'Videoproduksjon 101',
    slug: 'videoproduksjon-101',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
    lessons: [],
    category: 'video',
  },
  {
    id: '7',
    title: 'UI Design 101',
    slug: 'ui-design-101',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
    lessons: [],
    category: 'web',
  },
  {
    id: '8',
    title: 'CRO',
    slug: 'cro',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
    lessons: [],
    category: 'analytics',
  },
]

export const users = [
  { id: '1', name: 'Ole Hansen', email: 'ole@email.no' },
  { id: '2', name: 'Sara Olsen', email: 'sara@email.no' },
  { id: '3', name: 'Finn Finnsen', email: 'finn@email.no' },
  { id: '4', name: 'Kari Guttormsen', email: 'kari@email.no' },
  { id: '5', name: 'Sturla Simensen', email: 'sturla@email.no' },
]

export const comments = [
  {
    id: '1',
    createdBy: { id: '2', name: 'Sara Olsen' },
    comment:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    lesson: { slug: 'variabler' },
  },
  {
    id: '2',
    createdBy: { id: '3', name: 'Finn Finnsen' },
    comment:
      'Dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    lesson: { slug: 'variabler' },
  },
]

export const courseCreateSteps = [
  { id: '1', name: 'Kurs' },
  { id: '2', name: 'Leksjoner' },
]

export const categories = [
  'Marketing',
  'Photoshop',
  'Code',
  'Video',
  'Analytics',
  'Web',
  'Design',
  'Empty',
]
