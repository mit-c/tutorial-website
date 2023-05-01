import { faPython } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition, faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import PythonTutorialOne from "../pages/tutorial-python-1";
import Pictionary from "../games/pictionary/pictionary";
interface PageData {
    title: string;
    icon: IconDefinition;
    link: string;
    component: JSX.Element;
  };

// todo considerr how this could be stored on be service
const pagesData: Array<PageData> = [
    {
      title: 'Python Tutorial',
      icon: faPython,
      link: 'python-tutorial-1',
      component: <PythonTutorialOne />
    },
    {
      title: 'Pictionary',
      icon: faPaintBrush,
      link: 'pictionary',
      component: <Pictionary />
    }
];

export default pagesData;