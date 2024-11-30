export const templates = [
  {
    id: "template1",
    name: "Corporate Training Template",
    description:
      "This template is used for organizing corporate training sessions.",
    weekdays: ["Monday", "Wednesday", "Friday"],
    notSameDay: true,
    private: true,
    lim_attend: true,
    fixed_price: false,
    free: false,
    waitinglist: true,
  },
  {
    id: "template2",
    name: "Health and Wellness Events",
    description: "A template designed for wellness and fitness sessions.",
    weekdays: ["Tuesday", "Thursday"],
    notSameDay: false,
    private: false,
    lim_attend: false,
    fixed_price: true,
    free: false,
    waitinglist: false,
  },
  {
    id: "template3",
    name: "Weekend Workshops",
    description: "Ideal for hands-on learning events on weekends.",
    weekdays: ["Saturday", "Sunday"],
    notSameDay: false,
    private: false,
    lim_attend: true,
    fixed_price: true,
    free: false,
    waitinglist: true,
  },
  {
    id: "template4",
    name: "Exclusive Member Events",
    description: "Special events exclusively for members.",
    weekdays: ["Friday", "Saturday"],
    notSameDay: true,
    private: true,
    lim_attend: true,
    fixed_price: false,
    free: true,
    waitinglist: true,
  },
];

export const events = [
  {
    id: "event1",
    title: "Leadership Training Program",
    createdAt: "2024-01-15T09:00:00Z",
    capacity: 18,
    currentCapacity: 18,
    location: "Oslo",
    category: "Corporate",
    price: 1500,
    description: "A program designed to enhance leadership skills.",
    private: true,
    waitinglist: true,
    template_id: "template1",
  },
  {
    id: "event2",
    title: "Yoga and Meditation Retreat",
    createdAt: "2024-02-10T07:00:00Z",
    capacity: 14,
    currentCapacity: 14,
    location: "Bergen",
    category: "Wellness",
    price: 200,
    description: "A rejuvenating retreat for your mind and body.",
    private: false,
    waitinglist: false,
    template_id: "template2",
  },
  {
    id: "event3",
    title: "Advanced Photography Workshop",
    createdAt: "2024-03-05T10:00:00Z",
    capacity: 20,
    currentCapacity: 5,
    location: "Trondheim",
    category: "Creative",
    price: 500,
    description: "Learn advanced photography techniques.",
    private: false,
    waitinglist: true,
    template_id: "template3",
  },
  {
    id: "event4",
    title: "Exclusive Wine Tasting Evening",
    createdAt: "2024-04-20T19:00:00Z",
    capacity: 25,
    currentCapacity: 5,
    location: "Stavanger",
    category: "Lifestyle",
    price: 100,
    description: "An exclusive wine tasting event for members.",
    private: true,
    waitinglist: true,
    template_id: "template4",
  },
  {
    id: "event5",
    title: "Personal Development Seminar",
    createdAt: "2024-05-12T14:00:00Z",
    capacity: 100,
    currentCapacity: 5,
    location: "Oslo",
    category: "Corporate",
    price: 800,
    description: "A seminar on personal growth and development.",
    private: false,
    waitinglist: true,
    template_id: "template1",
  },
  {
    id: "event6",
    title: "Weekend Fitness Bootcamp",
    createdAt: "2024-06-01T08:00:00Z",
    capacity: 40,
    currentCapacity: 7,
    location: "Kristiansand",
    category: "Fitness",
    price: 300,
    description: "A weekend fitness bootcamp for all levels.",
    private: false,
    waitinglist: false,
    template_id: "template2",
  },
  {
    id: "event7",
    title: "Art and Creativity Workshop",
    createdAt: "2024-07-08T11:00:00Z",
    capacity: 30,
    currentCapacity: 7,
    location: "Bergen",
    category: "Creative",
    price: 400,
    description: "Explore your creativity with hands-on art sessions.",
    private: false,
    waitinglist: true,
    template_id: "template3",
  },
  {
    id: "event8",
    title: "Exclusive Networking Dinner",
    createdAt: "2024-08-15T18:00:00Z",
    capacity: 50,
    currentCapacity: 7,
    location: "Trondheim",
    category: "Networking",
    price: 0,
    description: "A networking event for members only.",
    private: true,
    waitinglist: true,
    template_id: "template4",
  },
];

export const registrations = [
  {
    id: "registration1",
    event_id: "event1",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phoneNumber: "1234567890",
    status: "confirmed",
    createdAt: "2024-01-15T10:30:00Z",
    participants: ["Astrid", "Bjørn", "Cecilia", "David", "Elise", "Fredrik", "Gunnhild", "Henrik"]
  },
  {
    id: "registration2",
    event_id: "event1",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phoneNumber: "9876543210",
    status: "pending",
    createdAt: "2024-01-15T11:45:00Z",
    participants: ["Ingrid", "Jonas", "Kari", "Lars", "Maria", "Nikolai", "Olivia", "Petter"]
  },
  {
    id: "registration3",
    event_id: "event2",
    name: "Cathy Lee",
    email: "cathy.lee@example.com",
    phoneNumber: "2345678901",
    status: "confirmed",
    createdAt: "2024-02-10T08:20:00Z",
    participants: ["Sara", "Thomas", "Unn", "Victor", "Wenche", "Xander", "Ylva", "Zackarias"]
  },
  {
    id: "registration4",
    event_id: "event2",
    name: "Daniel Green",
    email: "daniel.green@example.com",
    phoneNumber: "8765432190",
    status: "pending",
    createdAt: "2024-02-10T09:10:00Z",
    participants: ["Aurora", "Felix", "Hannah", "Isak"]
  },
  {
    id: "registration5",
    event_id: "event3",
    name: "Ella White",
    email: "ella.white@example.com",
    phoneNumber: "3456789012",
    status: "confirmed",
    createdAt: "2024-03-05T11:30:00Z",
    participants: ["Filip", "Ida", "Ludvig", "Thea"]
  },
  {
    id: "registration6",
    event_id: "event4",
    name: "Frank Harris",
    email: "frank.harris@example.com",
    phoneNumber: "7654321098",
    status: "confirmed",
    createdAt: "2024-04-20T20:00:00Z",
    participants: ["Elias", "Ella", "Jonathan", "Stella"]
  },
  {
    id: "registration7",
    event_id: "event5",
    name: "Grace Kim",
    email: "grace.kim@example.com",
    phoneNumber: "4567890123",
    status: "pending",
    createdAt: "2024-05-12T15:45:00Z",
    participants: ["Adam", "Leah", "Oskar", "Pia"]
  },
  {
    id: "registration8",
    event_id: "event6",
    name: "Henry Moore",
    email: "henry.moore@example.com",
    phoneNumber: "6543210987",
    status: "confirmed",
    createdAt: "2024-06-01T09:00:00Z",
    participants: ["Amalie", "Magnus", "Nora", "Sander", "Tiril", "Vetle"]
  },
  {
    id: "registration9",
    event_id: "event7",
    name: "Ivy Scott",
    email: "ivy.scott@example.com",
    phoneNumber: "5678901234",
    status: "confirmed",
    createdAt: "2024-07-08T12:15:00Z",
    participants: ["David", "Emma", "Fredrik", "Julie", "Kristoffer", "Lisa"]
  },
  {
    id: "registration10",
    event_id: "event8",
    name: "Jack Taylor",
    email: "jack.taylor@example.com",
    phoneNumber: "5432109876",
    status: "pending",
    createdAt: "2024-08-15T19:30:00Z",
    participants: ["Henrik", "Ingrid", "Jonas", "Karianne", "Lars", "Mia"]
  },
];
