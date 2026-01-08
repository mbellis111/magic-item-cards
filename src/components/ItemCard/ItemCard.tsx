import cardTemplateUrl from '../../assets/card_template_medium.png';
import exampleImageUrl from '../../assets/backpack.png';
import { Textfit } from 'react-textfit';
import { maxDescriptionFont, maxDetailsFont, maxNameFont } from '../../constants.ts';
import ReactMarkdown from 'react-markdown';
import './ItemCard.css';

interface ItemCardProps {
  name: string;
  details: string;
  description: string;
  useMarkdown: boolean;
  image?: string;
}

const ItemCard = (props: Readonly<ItemCardProps>) => {
  const { name, details, description, useMarkdown, image } = props;

  return (
    <div className={'item-card-component'}>
      <div className={'image-container'}>
        <img className={'template-image'} src={cardTemplateUrl} alt={'item_card'} />
        <div>
          <img className={'overlay-image'} src={image ?? exampleImageUrl} alt={'item_image'} />
        </div>
        <Textfit className={'overlay-text overlay-text-name'} mode={'single'} max={maxNameFont}>
          {name}
        </Textfit>
        <Textfit
          className={'overlay-text overlay-text-details'}
          mode={'single'}
          max={maxDetailsFont}
        >
          {details}
        </Textfit>
        <Textfit
          className={'overlay-text overlay-text-description'}
          mode={'multi'}
          max={maxDescriptionFont}
        >
          {useMarkdown ? <ReactMarkdown>{description}</ReactMarkdown> : description}
        </Textfit>
      </div>
    </div>
  );
};

export default ItemCard;
