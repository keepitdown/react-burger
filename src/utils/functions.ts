import { BASE_URL } from "./constants";
import { IIngredient, IErrorDetails } from "./types";

async function checkApiResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }

  const errorDetails: IErrorDetails = {
    code: response.status,
    description: response.statusText
  }

  if (response?.headers.get('content-type')?.includes('application/json')) {
    const responseContent = await response.json();
    errorDetails.message = responseContent.message;
  }

  return Promise.reject(errorDetails);
}

function logError(error: IErrorDetails): void {
  console.log(`Error${error.code ? (' ' + error.code) : ''}: ${error.description ? (error.description + '\n') : ''}${error.message ?? ''}`);
}

function request(urlPath: string, options: RequestInit | undefined) {
  return fetch(`${BASE_URL}${urlPath}`, options)
    .then(checkApiResponse);
}

function addProperty<T>(ingredientsData: IIngredient[], propertyName: string, initialValue: T): object {
  return ingredientsData.map(item => ({ ...item, [propertyName]: initialValue }))
}

function groupByType(dataArray: IIngredient[]): { [groupName: string]: IIngredient[] } {
  return dataArray.reduce((processedData: { [groupName: string]: IIngredient[] }, currentItem: IIngredient): { [groupName: string]: IIngredient[] } => {
    const itemType = currentItem.type;
    const updatedGroup = itemType in processedData
      ? [...processedData[itemType], currentItem]
      : [currentItem];
    return { ...processedData, [itemType]: updatedGroup }
  }, {});
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

export { request, checkApiResponse, logError, addProperty, groupByType, changePageTitle, setCookie, getCookie, removeCookie };