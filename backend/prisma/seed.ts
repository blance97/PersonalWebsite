import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const profileData = {
  id: 'singleton',
  name: 'Lance Dinh',
  title: 'Software Developer',
  birthDate: '1997-01-01',
  major: 'Computer Science',
  education: 'Rose-Hulman Institute of Technology',
  currentEmployment: 'Software Developer at American Express',
  bio: 'Hello! I am a software developer!',
  interests: ['Programming', 'F1', 'Pickleball', 'Basketball', 'Games', 'Swimming'],
  notableProjects: ['Digital Receipt', 'Food Poll', 'EchoFlow', 'Off'],
  resumeLink: 'https://drive.google.com/file/d/1hkNspL6MU_tQzh7mdCTbAg2ifno8SeM4/view?usp=sharing',
  schoolLink: 'http://www.rose-hulman.edu/',
  email: 'lancedinh7@gmail.com',
  github: 'https://github.com/blance97',
  linkedin: 'https://www.linkedin.com/in/lance-dinh/',
};

const experienceData = [
  {
    id: 'amex',
    company: 'American Express',
    position: 'Software Developer',
    description: 'Building enterprise software solutions.',
    startDate: '2020',
    endDate: 'Present',
    location: 'Phoenix, AZ',
    skills: ['Java', 'React', 'TypeScript', 'AWS', 'Microservices'],
    logo: '',
    website: 'https://www.americanexpress.com/',
    sortOrder: 0,
  },
  {
    id: 'verizon',
    company: 'Verizon Connect',
    position: 'Software Developer',
    description:
      '● Automated deployment to Octopus Deploy via python.\n● Created docker image and deployed and ran on Kubernetes engine.\n● Built and ran test cases on TeamCity.',
    startDate: 'Summer 2018',
    endDate: '',
    location: 'Austin, TX',
    skills: ['Python', 'Pytest', 'Octopus Deploy', 'Docker', 'Kubernetes', 'Team City'],
    logo: '',
    website: 'https://www.verizonconnect.com/',
    sortOrder: 1,
  },
  {
    id: 'linbeck',
    company: 'Linbeck LLC',
    position: 'Software Developer',
    description:
      '● Developed a company specific mobile expense report application.\n● Worked react native and redux and made REST calls to company internal endpoints.',
    startDate: 'Summer 2017',
    endDate: '',
    location: 'Houston, TX',
    skills: ['React Native', 'JavaScript', 'HTML', 'CSS', 'Google OCR'],
    logo: '',
    website: 'https://www.linbeck.com/',
    sortOrder: 2,
  },
  {
    id: 'rhventures',
    company: 'Rose-Hulman Ventures',
    position: 'Software Engineer',
    description:
      "● Worked with an informed prescribing company to develop a web application to help medical personnel obtain reports about patient's blood status.\n● Use Python with tornado framework with a Postgres database hosted with a Nginx server.",
    startDate: 'Fall 2016',
    endDate: 'Spring 2017',
    location: 'Terre Haute, IN',
    skills: ['Python', 'Tornado Framework', 'JavaScript/jQuery', 'HTML', 'CSS', 'PostgreSQL'],
    logo: '',
    website: 'http://www.rhventures.org/',
    sortOrder: 3,
  },
  {
    id: 'r1soft',
    company: 'R1soft',
    position: 'Software Engineer',
    description:
      '● Create custom Web server using the Go programming language to add security and functionality of internal tools.\n● Handle REST calls with the Golang.\n● Generated databases to store users, roles, and their respective permissions in SQLite3.\n● Created HTML pages to display login screen, user management, and internal tools.',
    startDate: 'Summer 2016',
    endDate: '',
    location: 'Houston, TX',
    skills: ['Golang', 'JavaScript', 'REST API', 'SQLite', 'HTML', 'CSS'],
    logo: '',
    website: 'https://www.r1soft.com/',
    sortOrder: 4,
  },
];

const projectsData = [
  {
    id: 'foodphoria',
    name: 'FoodPhoria (MHacks)',
    description:
      'This is a web application that allows users to create shareable polls that survey the food preferences of link holders and displays the running results, using these results to eventually drive an AI that provides recommendations on where to eat. These results are only displayed with context to the group, not with details about individuals, thereby avoiding the aforementioned social balancing act. In doing so, Foodphoria looks to bring the joy back to eating out with your friends.',
    date: 'Fall 2017',
    skills: ['React JS', 'JavaScript', 'Firebase', 'Google Places API', 'Python', 'Heroku', 'TensorFlow'],
    githubLink: 'https://github.com/blance97/MHacks-X',
    liveLink: 'https://foodphoria.herokuapp.com/',
    image: '',
    isPrivate: false,
    source: 'manual',
    sortOrder: 0,
  },
  {
    id: 'digital-receipt',
    name: 'Digital Receipt',
    description:
      'Web app to create receipt while managing inventory. It will also send an email to the customer, if the customer is specified.',
    date: 'Summer 2017',
    skills: ['React JS', 'Redux', 'Node.js', 'Express', 'JavaScript', 'Webpack', 'MySQL', 'CSS', 'HTML', 'Heroku'],
    githubLink: 'https://github.com/blance97/DigitalReceipt',
    liveLink: 'https://digitalreceipt.herokuapp.com/',
    image: '',
    isPrivate: false,
    source: 'manual',
    sortOrder: 1,
  },
  {
    id: 'food-poll',
    name: 'Food Poll',
    description:
      'A poll app that will gather info from people on their food preferences and suggest places based off the results.',
    date: 'Summer 2017',
    skills: ['React JS', 'JavaScript', 'Firebase', 'Google Places API'],
    githubLink: 'https://github.com/blance97/foodpoll',
    liveLink: 'https://foodpoll.herokuapp.com',
    image: '',
    isPrivate: false,
    source: 'manual',
    sortOrder: 2,
  },
  {
    id: 'food-poll-mobile',
    name: 'Food Poll (Mobile)',
    description: 'A mobile version of Food Poll built with React Native.',
    date: 'Summer 2017',
    skills: ['React Native', 'React JS', 'JavaScript', 'Firebase', 'Google Places API'],
    githubLink: 'https://github.com/blance97/FoodPollNative',
    liveLink: '',
    image: '',
    isPrivate: false,
    source: 'manual',
    sortOrder: 3,
  },
  {
    id: 'echo-flow',
    name: 'Echo Flow',
    description:
      "An ongoing project where we attempt to get Google's TensorFlow to detect faces and have an Amazon Echo speak that person's name.",
    date: 'Summer 2017',
    skills: ['React JS', 'JavaScript', 'Amazon S3', 'TensorFlow', 'Python'],
    githubLink: 'https://github.com/blance97/EchoFlow',
    liveLink: '',
    image: '',
    isPrivate: false,
    source: 'manual',
    sortOrder: 4,
  },
];

const skillsData = {
  id: 'singleton',
  languages: [
    'JavaScript',
    'TypeScript',
    'Node.js',
    'React/Redux',
    'React Native',
    'Python',
    'Golang',
    'Java',
    'C',
  ],
  tools: [
    'Git',
    'SVN',
    'Docker',
    'Team City',
    'MySQL',
    'Firebase',
    'PostgreSQL',
    'SQLite',
    'Heroku',
    'AWS',
  ],
  coursework: [
    'Introduction to Databases',
    'Data Structures and Algorithms',
    'Object Oriented Design',
    'Computer Architecture',
    'Operating Systems',
    'Computer Security',
    'Internet of Things',
  ],
};

const githubConfigData = {
  id: 'singleton',
  username: 'blance97',
  includePrivate: false,
  includeForks: false,
  excludeRepos: [],
  pinnedRepos: ['MHacks-X', 'DigitalReceipt', 'foodpoll', 'FoodPollNative', 'EchoFlow'],
};

async function main() {
  console.log('Seeding database...');

  // Upsert profile
  await prisma.profile.upsert({
    where: { id: 'singleton' },
    update: profileData,
    create: profileData,
  });
  console.log('✓ Profile seeded');

  // Upsert experience (delete all first, then create)
  await prisma.experience.deleteMany();
  for (const exp of experienceData) {
    await prisma.experience.create({ data: exp });
  }
  console.log('✓ Experience seeded');

  // Upsert projects (delete all first, then create)
  await prisma.project.deleteMany();
  for (const proj of projectsData) {
    await prisma.project.create({ data: proj });
  }
  console.log('✓ Projects seeded');

  // Upsert skills
  await prisma.skills.upsert({
    where: { id: 'singleton' },
    update: skillsData,
    create: skillsData,
  });
  console.log('✓ Skills seeded');

  // Upsert GitHub config
  await prisma.gitHubConfig.upsert({
    where: { id: 'singleton' },
    update: githubConfigData,
    create: githubConfigData,
  });
  console.log('✓ GitHub config seeded');

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
