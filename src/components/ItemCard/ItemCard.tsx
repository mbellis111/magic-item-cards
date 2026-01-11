import cardTemplateUrl from '../../assets/card_template_medium.png';
import genericImageUrl from '../../assets/backpack.png';
import armorImageUrl from '../../assets/armor.png';
import weaponImageUrl from '../../assets/weapons.png';
import wondrousImageUrl from '../../assets/wondrous.png';
import { Textfit } from 'react-textfit';
import {
  PRINT_FONT_MAX_DESCRIPTION,
  VIEW_FONT_MAX_DESCRIPTION,
  PRINT_FONT_MAX_DETAILS,
  VIEW_FONT_MAX_DETAILS,
  PRINT_FONT_MAX_NAME,
  VIEW_FONT_MAX_NAME,
  IMAGE_GENERIC,
  IMAGE_WONDROUS,
  IMAGE_ARMOR,
  IMAGE_WEAPON,
  IMAGE_NONE,
} from '../../constants.ts';
import ReactMarkdown from 'react-markdown';
import './ItemCard.css';

interface ItemCardProps {
  name: string;
  details: string;
  description: string;
  useMarkdown: boolean;
  imageType: string;
  printMode?: boolean;
}

const ItemCard = (props: Readonly<ItemCardProps>) => {
  const { name, details, description, useMarkdown, imageType, printMode } = props;

  let maxNameFont: number;
  let maxDetailsFont: number;
  let maxDescriptionFont: number;

  if (printMode) {
    maxNameFont = PRINT_FONT_MAX_NAME;
    maxDetailsFont = PRINT_FONT_MAX_DETAILS;
    maxDescriptionFont = PRINT_FONT_MAX_DESCRIPTION;
  } else {
    maxNameFont = VIEW_FONT_MAX_NAME;
    maxDetailsFont = VIEW_FONT_MAX_DETAILS;
    maxDescriptionFont = VIEW_FONT_MAX_DESCRIPTION;
  }

  function getItemImage(imageType: string): string {
    if (imageType === IMAGE_GENERIC) {
      return genericImageUrl;
    } else if (imageType === IMAGE_WONDROUS) {
      return wondrousImageUrl;
    } else if (imageType === IMAGE_ARMOR) {
      return armorImageUrl;
    } else if (imageType === IMAGE_WEAPON) {
      return weaponImageUrl;
    }
    // fall back to generic image if not recognized
    return IMAGE_GENERIC;
  }

  return (
    <div className={'item-card-component'}>
      <div className={'image-container'}>
        <img className={'template-image'} src={cardTemplateUrl} alt={'item_card'} />
        <div>
          {imageType !== IMAGE_NONE && (
            <img className={'overlay-image'} src={getItemImage(imageType)} alt={'item_image'} />
          )}
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
          {useMarkdown ? (
            <ReactMarkdown>{description}</ReactMarkdown>
          ) : (
            <div className={'description-text-inner'}>{description}</div>
          )}
        </Textfit>
      </div>
    </div>
  );
};

export default ItemCard;
