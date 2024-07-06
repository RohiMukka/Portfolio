import React, { useState, useEffect, useCallback } from 'react';
import { motion} from 'framer-motion';
import { Github, Linkedin, Mail, Moon, Sun, Download, ExternalLink } from 'lucide-react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import rohiImage from './images/rohi.png';
import p1Image from './images/p1.png';
import p2Image from './images/p2.png';
import p3Image from './images/p3.png';


interface NavBarProps {
  activeSection: string;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, toggleDarkMode, darkMode }) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-4"
        >
          <img src={rohiImage} alt="Rohi Mukka" className="w-12 h-12 rounded-full" />
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Rohi Mukka</span>
        </motion.div>
        <ul className="flex space-x-6 p-4">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => ( // ... (Removed 'Experience' from this array)
            <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`text-lg font-semibold ${
                  activeSection === item.toLowerCase() ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
                } hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200`}
              >
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
        </motion.button>
      </div>
    </motion.nav>
  );
};

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
  >
    {title}
  </motion.h2>
);
interface SkillCloudProps {
  skills: { skill: string; level: number }[];
}

const SkillCloud: React.FC<SkillCloudProps> = ({ skills }) => (
  <div className="flex flex-wrap justify-center">
    {skills.map((skill, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: Math.random() * 1.5 }} // Random delay between 0 and 1.5 seconds
        className={`m-2 px-4 py-2 ${getBackgroundColorClass(skill.level)} text-white rounded-full ${getFontSizeClass(skill.level)} font-semibold`}
      >
        {skill.skill}
      </motion.div>
    ))}
  </div>
);

const getBackgroundColorClass = (level: number): string => {
  const intensity = Math.floor(level / 10) * 100;
  return `bg-blue-600 dark:bg-blue-${intensity}`;
};

const getFontSizeClass = (level: number): string => {
  const size = Math.floor(level / 20);
  if (size >= 3) return 'text-lg'; // Reduced from xl
  if (size >= 2) return 'text-base'; // Reduced from lg
  if (size >= 1) return 'text-sm';
  return 'text-xs';
};

interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoLink: string;
  githubLink: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
  >
    <img src={project.image || "/api/placeholder/400/200"} alt={project.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded dark:bg-blue-200 dark:text-blue-800">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <a href={project.demoLink} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors duration-200 flex items-center">
          Live Demo <ExternalLink size={16} className="ml-1" />
        </a>
        <a href={project.githubLink} className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
          <Github size={20} />
        </a>
      </div>
    </div>
  </motion.div>
);

// interface Experience {
//   role: string;
//   company: string;
//   duration: string;
// }

// interface ExperienceTimelineProps {
//   experiences: Experience[];
// }


// const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => (
//   <div className="relative">
//     {experiences.map((exp, index) => (
//       <motion.div
//         key={index}
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.2 }}
//         className="mb-8 flex justify-between items-center w-full right-timeline"
//       >
//         <div className="order-1 w-5/12"></div>
//         <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
//           <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
//         </div>
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="order-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4"
//         >
//           <h3 className="mb-3 font-bold text-gray-800 dark:text-white text-xl">{exp.role}</h3>
//           <p className="text-sm leading-snug tracking-wide text-gray-600 dark:text-gray-400 text-opacity-100">{exp.company}</p>
//           <p className="text-xs text-gray-500 dark:text-gray-500">{exp.duration}</p>
//         </motion.div>
//       </motion.div>
//     ))}
//   </div>
// );

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  const handleScroll = useCallback(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact']; // ... (Removed 'Experience' from this array)
    const scrollPosition = window.scrollY;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && scrollPosition >= section.offsetTop - 100) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const skillsData = [
    { skill: 'Python', level: 90 },
    { skill: 'JavaScript', level: 80 },
    { skill: 'React', level: 80 },
    { skill: 'Machine Learning', level: 85 },
    { skill: 'SQL', level: 70 },
    { skill: 'Node.js', level: 75 },
    { skill: 'TypeScript', level: 60 },
    { skill: 'Git', level: 85 },
    { skill: 'AWS', level: 50 },
    { skill: 'MongoDB', level: 60 },
    { skill: 'Express.js', level: 70 },
    { skill: 'HTML/CSS', level: 90 },
    { skill: 'Data Analysis', level: 65 },
    { skill: 'TensorFlow', level: 70 },
    { skill: 'PyTorch', level: 65 },
    { skill: 'Scikit-learn', level: 70 },
    { skill: 'Pandas', level: 85 },
    { skill: 'NumPy', level: 85 },
    { skill: 'RESTful APIs', level: 75 },
    { skill: 'GraphQL', level: 50 },
    { skill: 'Java', level: 70 },
    { skill: 'C++', level: 55 },
    { skill: 'Vue.js', level: 45 },
    { skill: 'Angular', level: 40 },
    { skill: 'Flask', level: 70 },
    { skill: 'Django', level: 60 },
    { skill: 'Data Visualization', level: 80 },
    { skill: 'Natural Language Processing', level: 65 },
    { skill: 'Computer Vision', level: 70 },
    { skill: 'Deep Learning', level: 75 },
    { skill: 'Reinforcement Learning', level: 50 },
    { skill: 'Feature Engineering', level: 70 },
    { skill: 'Data Preprocessing', level: 85 },
    { skill: 'Linux', level: 90 },
    { skill: 'Bash Scripting', level: 75 },
    { skill: 'PostgreSQL', level: 65 },
    { skill: 'Responsive Design', level: 55 }
  ];

  const projectsData = [
    {
      title: 'Image Caption Generator',
      description: 'Developed an intelligent system using Google\'s Efficient Net to generate image captions, achieving a 30% improvement in BLEU scores compared to other models.',
      technologies: ['Python', 'TensorFlow', 'NLP'],
      demoLink: '#',
      githubLink: '#',
      image: p1Image // Include this if you have an image
    },
    {
      title: 'Jurassic World Visualization',
      description: 'Created an interactive web-based visualization using the Jurassic Park Exhaustive Dinosaur Dataset, praised for creativity and interactivity.',
      technologies: ['D3.js', 'JavaScript', 'HTML/CSS'],
      demoLink: '#',
      githubLink: '#',
      image: p2Image
    },
    {
      title: 'Laptop Marketplace',
      description: 'Designed and implemented an online marketplace for new and used laptops, handling over 200 interactions during testing.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      demoLink: '#',
      githubLink: '#',
      image: p3Image
    }
  ];

  // const experienceData = [
  //   {
  //     role: 'Software Engineering Intern',
  //     company: 'Tech Giant Corp',
  //     duration: 'Summer 2023'
  //   },
  //   {
  //     role: 'Research Assistant',
  //     company: 'Arizona State University',
  //     duration: 'Jan 2023 - May 2023'
  //   },
  //   {
  //     role: 'Web Development Freelancer',
  //     company: 'Self-employed',
  //     duration: '2021 - Present'
  //   }
  // ];

  return (
    <div className={`font-sans ${darkMode ? 'dark' : ''}`}>
      <NavBar activeSection={activeSection} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <motion.section
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-800 dark:to-purple-900"
      >
        <div className="text-center text-white">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-4"
          >
            Hello, I'm Rohi Mukka
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl mb-8"
          >
            A passionate Software Engineer specializing in Full-Stack Development
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-100 transition-colors duration-200"
          >
            View My Work
          </motion.button>
        </div>
      </motion.section>

      <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <SectionTitle title="About Me" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            <p className="mb-4">
              I'm a recent graduate with a Master's in Computer Science from Arizona State University. My passion lies in developing innovative solutions using cutting-edge technologies, particularly in the fields of machine learning and full-stack development.
            </p>
            <p className="mb-4">
              With a strong foundation in computer science principles and hands-on experience in various projects, I'm eager to contribute to meaningful projects that push the boundaries of technology.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <Download className="mr-2" /> Download CV
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <SectionTitle title="Technical Skills" />
          <div className="max-w-4xl mx-auto">
            <SkillCloud skills={skillsData} />
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <SectionTitle title="Featured Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* <section id="experience" className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <SectionTitle title="Professional Experience" />
          <ExperienceTimeline experiences={experienceData} />
        </div>
      </section> */}

      <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <SectionTitle title="Get In Touch" />
        <div className="max-w-3xl mx-auto">
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Send Message
            </motion.button>
          </motion.form>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex justify-center space-x-6"
          >
            <a href="https://github.com/RohiMukka" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/rohi-mukka/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="mailto:rohi.mukka35@gmail.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>

    <footer className="bg-gray-800 text-white py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 Rohi Mukka. All rights reserved.</p>
      </div>
    </footer>
    <SpeedInsights />
  </div>
);
};

export default App;