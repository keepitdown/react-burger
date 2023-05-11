import { BASE_URL, REFRESH_TOKEN_URL, accessToken, refreshToken, accessTokenMaxAge, refreshTokenMaxAge } from "./constants";
import { TIngredient, TErrorDetails, TAvaliableIngredients, TRawIngredient, TUpdateTokensResponseBody } from "./types";

async function checkApiResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }

  const errorDetails: TErrorDetails = {
    code: response.status,
    description: response.statusText
  }

  if (response?.headers.get('content-type')?.includes('application/json')) {
    const responseContent = await response.json();
    errorDetails.message = responseContent.message;
  }

  return Promise.reject(errorDetails);
}

function logError(error: TErrorDetails): void {
  console.log(`Error${error.code ? (' ' + error.code) : ''}: ${error.description ? (error.description + '\n') : ''}${error.message ?? ''}`);
}

function request<T>(urlPath: string, options?: RequestInit): Promise<T> {
  return fetch(`${BASE_URL}${urlPath}`, options)
    .then(checkApiResponse<T>);
}

function addProperty<T>(ingredientsData: TRawIngredient[], propertyName: string, initialValue: T): object {
  return ingredientsData.map(item => ({ ...item, [propertyName]: initialValue }))
}

function groupByPropValue<T>(dataArray: T[], propKey: keyof T): Record<string, T[]> {
  return dataArray.reduce<Record<string, T[]>>((processedData: Record<string, T[]>, currentItem: T) => {
    const itemType = currentItem[propKey as keyof T];
    const updatedGroup = (itemType as string) in processedData
      ? [...processedData[itemType as string], currentItem]
      : [currentItem];
    return { ...processedData, [itemType as keyof T]: updatedGroup }
  }, {} as Record<string, T[]>);
}

function getIngredientById(availableIngredients: TAvaliableIngredients, ingredientId: string): TIngredient | undefined {
  return Object.values(availableIngredients).flat().find(item => item._id === ingredientId);
}

function changePageTitle(title: string): void {
  document.title = `Stellar Burgers | ${title}`;
}

function setCookie(name: string, value: string, maxAge: string): void {
  document.cookie = `${name}=${value};max-age=${maxAge};path=/;samesite=strict`;
}

function getCookie(name: string): string | undefined {
  const cookieString = document.cookie.split(';').find(cookieString => cookieString.trim().startsWith(name));
  return cookieString?.split('=')[1];
}

function removeCookie(name: string): void {
  setCookie(name, '', '0');
}

function requestWithToken<T>(urlPath: string, options: RequestInit): Promise<T> {
  const retryFetch = (): Promise<T> => requestWithToken(urlPath, options);
  const storedAccessToken = getCookie(accessToken);
  if (!storedAccessToken) {
    return updateTokens().then(retryFetch);
  }

  return request<T>(urlPath, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${storedAccessToken}`
    }
  })
    .catch(error => {
      if (error?.message === 'jwt expired') {
        return (updateTokens()).then(retryFetch);
      } else {
        return Promise.reject(error);
      }
    });
};

function updateTokens(): Promise<void> {
  const storedRefreshToken = getCookie(refreshToken);
  if (!storedRefreshToken) {
    return Promise.reject({ message: 'tokens not found' });
  }
  return request<TUpdateTokensResponseBody>(REFRESH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: storedRefreshToken })
  })
    .then((response: TUpdateTokensResponseBody): void => {
      setCookie(accessToken, response.accessToken.split('Bearer ')[1], accessTokenMaxAge);
      setCookie(refreshToken, response.refreshToken, refreshTokenMaxAge);
    });
}

export {
  request, checkApiResponse, logError, addProperty, groupByPropValue,
  getIngredientById, changePageTitle, setCookie, getCookie, removeCookie, requestWithToken, updateTokens
};