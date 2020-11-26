import Yang from './yang';
import { Carousel } from './carousel';
import { Timeline, Animation} from './animation';

const d = [
  'https://static001.geekbang.org/resource/image/66/46/66286c54890672415a14b9fa669ba746.jpg',
  'https://static001.geekbang.org/resource/image/1d/6b/1d57a4fde1c266da2e6a8e90808f5b6b.jpg',
  'https://static001.geekbang.org/resource/image/ee/70/ee7627bac9defb7621c2489fbacb3a70.jpg',
  'https://static001.geekbang.org/resource/image/6f/29/6f1f05eade56923b829571ed9ce27329.jpg',
];

let a = <Carousel src={d} />;

a.mountTo(document.body);

