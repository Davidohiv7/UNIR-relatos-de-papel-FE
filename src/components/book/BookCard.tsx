import { Button } from '../ui';

type Props = {
  title: string;
  author: string;
  price: number;
  image: string;
};

function BookCard({ title, author, price, image }: Props) {
  return (
    <div>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{author}</p>
      <p>{price}</p>
      <Button label="Add to Cart" onClick={() => {}} />
    </div>
  );
}

export default BookCard;
