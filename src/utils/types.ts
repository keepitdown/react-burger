type TIngredient = {
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
  quantity: number;
};

type TRawIngredient = Omit<TIngredient, 'quantity'>;

type TAvaliableIngredients = {
  [groupName: string]: TIngredient[];
}

type TConstructorIngredient = TIngredient & { readonly constructorId: number };

type TAddedIngredients = {
  bun: TIngredient | null;
  middle: TConstructorIngredient[];
};

type TErrorDetails = {
  code: number | undefined,
  description: string | undefined,
  message?: string
};

type TLocationState = {
  readonly background?: Location;
  readonly originalPath?: string;
  readonly ingredientNotFound?: boolean;
} | null;

type TAuthData = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
};

type TProfile = Omit<TAuthData, 'password'>;

type TProfileChanges = Partial<TAuthData>;

type TSignInForm = Omit<TAuthData, 'name'>;

type TRecoveryForm = Pick<TAuthData, 'email'>;

type TResetForm = Pick<TAuthData, 'password'> & { token: string };

type TConstructorItemDragData = {
  readonly constructorId: number;
  readonly originalIndex: number;
};

type TIngredientsItemDragData = {
  id: string;
}

type TItemDragData = TIngredientsItemDragData | TConstructorItemDragData;

type TResponseBody = {
  readonly success: boolean;
};

type TResponseBodyWithMessage = TResponseBody & {
  readonly message: string;
};

type TUpdateTokensResponseBody = TResponseBody & {
  readonly accessToken: string;
  readonly refreshToken: string;
};

export type {
  TIngredient, TRawIngredient, TAvaliableIngredients, TConstructorIngredient, TAddedIngredients,
  TErrorDetails, TLocationState, TProfile, TAuthData, TProfileChanges, TSignInForm, TRecoveryForm,
  TResetForm, TConstructorItemDragData, TIngredientsItemDragData, TItemDragData, TResponseBody,
  TResponseBodyWithMessage, TUpdateTokensResponseBody
};