import { BASE_URL } from "./constants";

async function checkApiResponse(response) {
  if (response.ok) {
    return response.json();
  }

  const errorDetails = {
    code: response.status,
    description: response.statusText
  }

  if (response.headers.get('content-type').includes('application/json')) {
    const responseContent = await response?.json();
    errorDetails.message = responseContent.message;
  }

  return Promise.reject(errorDetails);
}

function logError(error) {
  console.log(`Error ${error.code}: ${error.description}\n${error.message ?? ''}`);
}

function request(urlPath, options) {
  return fetch(`${BASE_URL}${urlPath}`, options)
    .then(checkApiResponse);
}

function addProperty(ingredientsData, propertyName, initialValue) {
  return ingredientsData.map(item => ({ ...item, [propertyName]: initialValue }))
}

function groupByType(dataArray) {
  return dataArray.reduce((processedData, currentItem) => {
    const itemType = currentItem.type;
    const updatedGroup = itemType in processedData
      ? [...processedData[itemType], currentItem]
      : [currentItem];
    return { ...processedData, [itemType]: updatedGroup }
  }, {})
}

function changePageTitle(title) {
  document.title = `Stellar Burgers | ${title}`;
}

function setCookie(name, value, maxAge) {
  document.cookie = `${name}=${value};max-age=${maxAge};path=/;samesite=strict`;
}

function getCookie(name) {
  const cookieString = document.cookie.split(';').find(cookieString => cookieString.trim().startsWith(name));
  return cookieString?.split('=')[1];
}

function removeCookie(name) {
  setCookie(name, '', 0);
}

export { request, checkApiResponse, logError, addProperty, groupByType, changePageTitle, setCookie, getCookie, removeCookie };