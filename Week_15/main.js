import Yang from './yang';
import Carousel from './Carousel';
import Button from './Button';
import List from './List';

const d = [
  {
    img:
      'https://static001.geekbang.org/resource/image/66/46/66286c54890672415a14b9fa669ba746.jpg',
    url: 'https://u.geekbang.org/schedule',
    name: '猫',
  },
  {
    img:
      'https://static001.geekbang.org/resource/image/1d/6b/1d57a4fde1c266da2e6a8e90808f5b6b.jpg',
    url: 'https://u.geekbang.org/schedule',
    name: '猫',
  },
  {
    img:
      'https://static001.geekbang.org/resource/image/ee/70/ee7627bac9defb7621c2489fbacb3a70.jpg',
    url: 'https://u.geekbang.org/schedule',
    name: '猫',
  },
  {
    img:
      'https://static001.geekbang.org/resource/image/6f/29/6f1f05eade56923b829571ed9ce27329.jpg',
    url: 'https://u.geekbang.org/schedule',
    name: '猫',
  },
];

const carousel = (
  <Carousel
    src={d}
    onChange={event => {
      console.log(event.detail.position);
    }}
    onClick={event => {
      location.href = event.detail.data.url;
    }}
  />
);

const button = <Button>content</Button>;

const list = (
  <List data={d}>
    {record => (
      <div>
        <img src={record.img} />
        <a href={record.url}>{record.name}</a>
      </div>
    )}
  </List>
);

carousel.mountTo(document.getElementById('carousel'));

button.mountTo(document.getElementById('button'));

list.mountTo(document.getElementById('list'));
