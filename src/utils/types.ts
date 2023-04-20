import PropTypes from 'prop-types';

interface IErrorDetails {
  code: number | undefined,
  description: string | undefined,
  message?: string
}

interface IIngredient {
  readonly __v: number;
  readonly _id: string;
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  quantity?: number;
}

const ingredientType = PropTypes.exact({
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
});

export type { IIngredient, IErrorDetails };

export { ingredientType };